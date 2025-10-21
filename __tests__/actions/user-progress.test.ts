import { challengeProgress, userProgress } from "@/db/schema"

const {
  mockAuth,
  mockCurrentUser,
  mockGetCourseById,
  mockGetUserProgress,
  mockGetUserSubscription,
  challengeFindFirstMock,
  challengeProgressFindFirstMock,
  revalidatePathMock,
  redirectMock,
  updateCalls,
  updateMock,
  insertCalls,
  insertMock,
  mockRefillHeartsWithGems,
} = vi.hoisted(() => {
  const updateCalls: Array<{ table: unknown; values: Record<string, unknown> }> = []
  const insertCalls: Array<{ table: unknown; values: Record<string, unknown> }> = []

  return {
    mockAuth: vi.fn(),
    mockCurrentUser: vi.fn(),
    mockGetCourseById: vi.fn(),
    mockGetUserProgress: vi.fn(),
    mockGetUserSubscription: vi.fn(),
    challengeFindFirstMock: vi.fn(),
    challengeProgressFindFirstMock: vi.fn(),
    revalidatePathMock: vi.fn(),
    redirectMock: vi.fn(),
    updateCalls,
    updateMock: vi.fn((table: unknown) => ({
      set: (values: Record<string, unknown>) => {
        updateCalls.push({ table, values })
        return {
          where: vi.fn().mockResolvedValue(undefined),
        }
      },
    })),
    insertCalls,
    insertMock: vi.fn((table: unknown) => ({
      values: (values: Record<string, unknown>) => {
        insertCalls.push({ table, values })
        return Promise.resolve()
      },
    })),
    mockRefillHeartsWithGems: vi.fn(),
  }
})

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  currentUser: mockCurrentUser,
}))

vi.mock("@/db/queries", () => ({
  getCourseById: mockGetCourseById,
  getUserProgress: mockGetUserProgress,
  getUserSubscription: mockGetUserSubscription,
}))

vi.mock("@/db/drizzle", () => ({
  __esModule: true,
  default: {
    query: {
      challenges: {
        findFirst: challengeFindFirstMock,
      },
      challengeProgress: {
        findFirst: challengeProgressFindFirstMock,
      },
    },
    update: updateMock,
    insert: insertMock,
  },
}))

vi.mock("@/actions/gamification", () => ({
  __esModule: true,
  spendXP: vi.fn(),
  spendGems: vi.fn(),
  refillHeartsWithGems: mockRefillHeartsWithGems,
}))

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}))

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}))

const { upsertUserProgress, reduceHearts, refillHeartsWithGemsAction } = await import(
  "@/actions/user-progress"
)

describe("upsertUserProgress", () => {
  beforeEach(() => {
    mockAuth.mockReset().mockResolvedValue({ userId: "user_1" })
    mockCurrentUser.mockReset().mockResolvedValue({
      firstName: "Ada",
      imageUrl: "/avatar.png",
      emailAddresses: [{ emailAddress: "ada@example.com" }],
    })
    mockGetCourseById.mockReset()
    mockGetUserProgress.mockReset()
    revalidatePathMock.mockClear()
    redirectMock.mockReset()
    updateMock.mockClear()
    insertMock.mockClear()
    updateCalls.length = 0
    insertCalls.length = 0
  })

  it("throws when the user is not authenticated", async () => {
    mockAuth.mockResolvedValueOnce({ userId: null })

    await expect(upsertUserProgress(1)).rejects.toThrow("Unauthorized")
  })

  it("throws when the course cannot be found", async () => {
    mockGetCourseById.mockResolvedValue(null)

    await expect(upsertUserProgress(1)).rejects.toThrow("Course not found")
  })

  it("throws when the course has no lessons", async () => {
    mockGetCourseById.mockResolvedValue({
      units: [{ lessons: [] }],
    })

    await expect(upsertUserProgress(1)).rejects.toThrow("Course is empty")
  })

  it("updates existing progress and redirects to the learn page", async () => {
    mockGetCourseById.mockResolvedValue({
      units: [{ lessons: [{}] }],
    })
    mockGetUserProgress.mockResolvedValue({ activeCourseId: 2 })

    redirectMock.mockImplementation(() => {
      throw new Error("redirect")
    })

    await expect(upsertUserProgress(3)).rejects.toThrow("redirect")

    expect(updateCalls).toHaveLength(1)
    expect(updateCalls[0]).toMatchObject({
      table: userProgress,
      values: {
        activeCourseId: 3,
        userName: "Ada",
        userImageSrc: "/avatar.png",
      },
    })
    expect(insertCalls).toHaveLength(0)
    expect(redirectMock).toHaveBeenCalledWith("/learn")
    expect(revalidatePathMock).toHaveBeenCalledWith("/courses")
    expect(revalidatePathMock).toHaveBeenCalledWith("/learn")
  })

  it("creates new progress records when none exist", async () => {
    mockGetCourseById.mockResolvedValue({
      units: [{ lessons: [{}] }],
    })
    mockGetUserProgress.mockResolvedValue(null)

    redirectMock.mockImplementation(() => {
      throw new Error("redirect")
    })

    await expect(upsertUserProgress(5)).rejects.toThrow("redirect")

    expect(insertCalls).toHaveLength(1)
    expect(insertCalls[0]).toMatchObject({
      table: userProgress,
      values: {
        userId: "user_1",
        activeCourseId: 5,
        userName: "Ada",
        userImageSrc: "/avatar.png",
      },
    })
    expect(updateCalls).toHaveLength(0)
    expect(redirectMock).toHaveBeenCalledWith("/learn")
  })
})

describe("reduceHearts", () => {
  beforeEach(() => {
    mockAuth.mockReset().mockResolvedValue({ userId: "user_1" })
    mockGetUserProgress.mockReset()
    mockGetUserSubscription.mockReset()
    challengeFindFirstMock.mockReset()
    challengeProgressFindFirstMock.mockReset()
    revalidatePathMock.mockClear()
    updateMock.mockClear()
    updateCalls.length = 0
  })

  it("throws when the user is not authenticated", async () => {
    mockAuth.mockResolvedValueOnce({ userId: null })
    await expect(reduceHearts(1)).rejects.toThrow("Unauthorized")
  })

  it("returns a practice error when the challenge was already completed", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 3 })
    mockGetUserSubscription.mockResolvedValue(null)
    challengeFindFirstMock.mockResolvedValue({ id: 1, lessonId: 22 })
    challengeProgressFindFirstMock.mockResolvedValue({ id: 8, completed: true })

    const result = await reduceHearts(1)

    expect(result).toEqual({ error: "practice" })
    expect(updateCalls).toHaveLength(0)
  })

  it("returns a hearts error when the learner is out of hearts", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 0 })
    mockGetUserSubscription.mockResolvedValue({ isActive: false })
    challengeFindFirstMock.mockResolvedValue({ id: 1, lessonId: 22 })
    challengeProgressFindFirstMock.mockResolvedValue(null)

    const result = await reduceHearts(1)

    expect(result).toEqual({ error: "hearts" })
  })

  it("decrements hearts and triggers revalidation on success", async () => {
    mockGetUserProgress.mockResolvedValue({
      hearts: 4,
      userId: "user_1",
    })
    mockGetUserSubscription.mockResolvedValue({ isActive: false })
    challengeFindFirstMock.mockResolvedValue({ id: 2, lessonId: 33 })
    challengeProgressFindFirstMock.mockResolvedValue(null)

    await reduceHearts(2)

    expect(updateCalls).toHaveLength(1)
    expect(updateCalls[0]).toMatchObject({
      table: userProgress,
      values: { hearts: 3 },
    })
    expect(revalidatePathMock).toHaveBeenCalledWith("/lesson/33")
    expect(revalidatePathMock).toHaveBeenCalledWith("/shop")
  })
})

describe("refillHeartsWithGemsAction", () => {
  beforeEach(() => {
    revalidatePathMock.mockClear()
    mockRefillHeartsWithGems.mockReset()
  })

  it("revalidates and returns the underlying gamification result", async () => {
    mockRefillHeartsWithGems.mockResolvedValue({ success: true })

    await expect(refillHeartsWithGemsAction()).resolves.toEqual({ success: true })

    expect(mockRefillHeartsWithGems).toHaveBeenCalledTimes(1)
    expect(revalidatePathMock).toHaveBeenCalledWith("/shop")
    expect(revalidatePathMock).toHaveBeenCalledWith("/learn")
    expect(revalidatePathMock).toHaveBeenCalledWith("/quests")
    expect(revalidatePathMock).toHaveBeenCalledWith("/leaderboard")
  })

  it("rethrows errors from the gamification layer", async () => {
    const error = new Error("Insufficient gems")
    mockRefillHeartsWithGems.mockRejectedValue(error)

    await expect(refillHeartsWithGemsAction()).rejects.toThrow("Insufficient gems")
    expect(revalidatePathMock).not.toHaveBeenCalled()
  })
})
