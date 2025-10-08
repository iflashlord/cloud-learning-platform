import { challengeProgress, userProgress } from "@/db/schema";
import { POINTS_TO_REFILL } from "@/constants";

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
} = vi.hoisted(() => {
  const updateCalls: Array<{ table: unknown; values: Record<string, unknown> }> = [];
  const insertCalls: Array<{ table: unknown; values: Record<string, unknown> }> = [];

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
        updateCalls.push({ table, values });
        return {
          where: vi.fn().mockResolvedValue(undefined),
        };
      },
    })),
    insertCalls,
    insertMock: vi.fn((table: unknown) => ({
      values: (values: Record<string, unknown>) => {
        insertCalls.push({ table, values });
        return Promise.resolve();
      },
    })),
  };
});

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  currentUser: mockCurrentUser,
}));

vi.mock("@/db/queries", () => ({
  getCourseById: mockGetCourseById,
  getUserProgress: mockGetUserProgress,
  getUserSubscription: mockGetUserSubscription,
}));

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
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

const { upsertUserProgress, reduceHearts, refillHearts } = await import("@/actions/user-progress");

describe("upsertUserProgress", () => {
  beforeEach(() => {
    mockAuth.mockReset().mockResolvedValue({ userId: "user_1" });
    mockCurrentUser.mockReset().mockResolvedValue({
      firstName: "Ada",
      imageUrl: "/avatar.png",
      emailAddresses: [{ emailAddress: "ada@example.com" }],
    });
    mockGetCourseById.mockReset();
    mockGetUserProgress.mockReset();
    revalidatePathMock.mockClear();
    redirectMock.mockReset();
    updateMock.mockClear();
    insertMock.mockClear();
    updateCalls.length = 0;
    insertCalls.length = 0;
  });

  it("throws when the user is not authenticated", async () => {
    mockAuth.mockResolvedValueOnce({ userId: null });

    await expect(upsertUserProgress(1)).rejects.toThrow("Unauthorized");
  });

  it("throws when the course cannot be found", async () => {
    mockGetCourseById.mockResolvedValue(null);

    await expect(upsertUserProgress(1)).rejects.toThrow("Course not found");
  });

  it("throws when the course has no lessons", async () => {
    mockGetCourseById.mockResolvedValue({
      units: [{ lessons: [] }],
    });

    await expect(upsertUserProgress(1)).rejects.toThrow("Course is empty");
  });

  it("updates existing progress and redirects to the learn page", async () => {
    mockGetCourseById.mockResolvedValue({
      units: [{ lessons: [{}] }],
    });
    mockGetUserProgress.mockResolvedValue({ activeCourseId: 2 });

    redirectMock.mockImplementation(() => {
      throw new Error("redirect");
    });

    await expect(upsertUserProgress(3)).rejects.toThrow("redirect");

    expect(updateCalls).toHaveLength(1);
    expect(updateCalls[0]).toMatchObject({
      table: userProgress,
      values: {
        activeCourseId: 3,
        userName: "Ada",
        userImageSrc: "/avatar.png",
      },
    });
    expect(insertCalls).toHaveLength(0);
    expect(redirectMock).toHaveBeenCalledWith("/learn");
    expect(revalidatePathMock).toHaveBeenCalledWith("/courses");
    expect(revalidatePathMock).toHaveBeenCalledWith("/learn");
  });

  it("creates new progress records when none exist", async () => {
    mockGetCourseById.mockResolvedValue({
      units: [{ lessons: [{}] }],
    });
    mockGetUserProgress.mockResolvedValue(null);

    redirectMock.mockImplementation(() => {
      throw new Error("redirect");
    });

    await expect(upsertUserProgress(5)).rejects.toThrow("redirect");

    expect(insertCalls).toHaveLength(1);
    expect(insertCalls[0]).toMatchObject({
      table: userProgress,
      values: {
        userId: "user_1",
        activeCourseId: 5,
        userName: "Ada",
        userImageSrc: "/avatar.png",
      },
    });
    expect(updateCalls).toHaveLength(0);
    expect(redirectMock).toHaveBeenCalledWith("/learn");
  });
});

describe("reduceHearts", () => {
  beforeEach(() => {
    mockAuth.mockReset().mockResolvedValue({ userId: "user_1" });
    mockGetUserProgress.mockReset();
    mockGetUserSubscription.mockReset();
    challengeFindFirstMock.mockReset();
    challengeProgressFindFirstMock.mockReset();
    revalidatePathMock.mockClear();
    updateMock.mockClear();
    updateCalls.length = 0;
  });

  it("throws when the user is not authenticated", async () => {
    mockAuth.mockResolvedValueOnce({ userId: null });
    await expect(reduceHearts(1)).rejects.toThrow("Unauthorized");
  });

  it("returns a practice error when the challenge was already completed", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 3 });
    mockGetUserSubscription.mockResolvedValue(null);
    challengeFindFirstMock.mockResolvedValue({ id: 1, lessonId: 22 });
    challengeProgressFindFirstMock.mockResolvedValue({ id: 8, completed: true });

    const result = await reduceHearts(1);

    expect(result).toEqual({ error: "practice" });
    expect(updateCalls).toHaveLength(0);
  });

  it("returns a hearts error when the learner is out of hearts", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 0 });
    mockGetUserSubscription.mockResolvedValue({ isActive: false });
    challengeFindFirstMock.mockResolvedValue({ id: 1, lessonId: 22 });
    challengeProgressFindFirstMock.mockResolvedValue(null);

    const result = await reduceHearts(1);

    expect(result).toEqual({ error: "hearts" });
  });

  it("decrements hearts and triggers revalidation on success", async () => {
    mockGetUserProgress.mockResolvedValue({
      hearts: 4,
      userId: "user_1",
    });
    mockGetUserSubscription.mockResolvedValue({ isActive: false });
    challengeFindFirstMock.mockResolvedValue({ id: 2, lessonId: 33 });
    challengeProgressFindFirstMock.mockResolvedValue(null);

    await reduceHearts(2);

    expect(updateCalls).toHaveLength(1);
    expect(updateCalls[0]).toMatchObject({
      table: userProgress,
      values: { hearts: 3 },
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/lesson/33");
    expect(revalidatePathMock).toHaveBeenCalledWith("/shop");
  });
});

describe("refillHearts", () => {
  beforeEach(() => {
    mockGetUserProgress.mockReset();
    revalidatePathMock.mockClear();
    updateMock.mockClear();
    updateCalls.length = 0;
  });

  it("throws when progress cannot be found", async () => {
    mockGetUserProgress.mockResolvedValue(null);
    await expect(refillHearts()).rejects.toThrow("User progress not found");
  });

  it("throws when hearts are already full", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 5, points: 100 });
    await expect(refillHearts()).rejects.toThrow("Hearts are already full");
  });

  it("throws when there are not enough points", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 2, points: POINTS_TO_REFILL - 10 });
    await expect(refillHearts()).rejects.toThrow("Not enough points");
  });

  it("refills hearts and deducts points", async () => {
    mockGetUserProgress.mockResolvedValue({
      hearts: 2,
      points: POINTS_TO_REFILL + 15,
      userId: "user_9",
    });

    await refillHearts();

    expect(updateCalls).toHaveLength(1);
    expect(updateCalls[0]).toMatchObject({
      table: userProgress,
      values: {
        hearts: 5,
        points: 15,
      },
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/leaderboard");
  });
});
