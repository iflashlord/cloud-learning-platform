import { challengeProgress, userProgress } from "@/db/schema";

const {
  mockAuth,
  mockGetUserProgress,
  mockGetUserSubscription,
  revalidatePathMock,
  challengeFindFirstMock,
  challengeProgressFindFirstMock,
  updateCalls,
  updateMock,
  insertCalls,
  insertMock,
} = vi.hoisted(() => {
  const updateCalls: Array<{ table: unknown; values: Record<string, unknown> }> = [];
  const insertCalls: Array<{ table: unknown; values: Record<string, unknown> }> = [];

  return {
    mockAuth: vi.fn(),
    mockGetUserProgress: vi.fn(),
    mockGetUserSubscription: vi.fn(),
    revalidatePathMock: vi.fn(),
    challengeFindFirstMock: vi.fn(),
    challengeProgressFindFirstMock: vi.fn(),
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
}));

vi.mock("@/db/queries", () => ({
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

const { upsertChallengeProgress } = await import("@/actions/challenge-progress");

describe("upsertChallengeProgress", () => {
  beforeEach(() => {
    mockAuth.mockReset().mockResolvedValue({ userId: "user_1" });
    mockGetUserProgress.mockReset();
    mockGetUserSubscription.mockReset();
    revalidatePathMock.mockClear();
    challengeFindFirstMock.mockReset();
    challengeProgressFindFirstMock.mockReset();
    updateMock.mockClear();
    insertMock.mockClear();
    updateCalls.length = 0;
    insertCalls.length = 0;
  });

  it("throws when the user is not authenticated", async () => {
    mockAuth.mockResolvedValueOnce({ userId: null });

    await expect(upsertChallengeProgress(1)).rejects.toThrow("Unauthorized");
    expect(challengeFindFirstMock).not.toHaveBeenCalled();
  });

  it("returns a hearts error when the learner has no hearts and no subscription", async () => {
    mockGetUserProgress.mockResolvedValue({
      hearts: 0,
      points: 20,
    });
    mockGetUserSubscription.mockResolvedValue(null);
    challengeFindFirstMock.mockResolvedValue({ id: 1, lessonId: 10 });
    challengeProgressFindFirstMock.mockResolvedValue(null);

    const result = await upsertChallengeProgress(1);

    expect(result).toEqual({ error: "hearts" });
    expect(insertCalls).toHaveLength(0);
  });

  it("treats completed challenges as practice and awards bonus hearts and points", async () => {
    mockGetUserProgress.mockResolvedValue({
      hearts: 3,
      points: 40,
    });
    mockGetUserSubscription.mockResolvedValue({ isActive: false });
    challengeFindFirstMock.mockResolvedValue({ id: 1, lessonId: 12 });
    challengeProgressFindFirstMock.mockResolvedValue({ id: 99, completed: false });

    await upsertChallengeProgress(1);

    expect(insertCalls).toHaveLength(0);
    expect(updateCalls).toHaveLength(2);
    expect(updateCalls[0].values).toEqual({ completed: true });
    expect(updateCalls[1].values).toEqual({
      hearts: 4,
      points: 50,
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/lesson/12");
  });

  it("inserts new progress and increments points for first-time completion", async () => {
    mockGetUserProgress.mockResolvedValue({
      hearts: 2,
      points: 70,
    });
    mockGetUserSubscription.mockResolvedValue({ isActive: false });
    challengeFindFirstMock.mockResolvedValue({ id: 1, lessonId: 15 });
    challengeProgressFindFirstMock.mockResolvedValue(null);

    await upsertChallengeProgress(3);

    expect(insertCalls).toHaveLength(1);
    expect(insertCalls[0]).toMatchObject({
      table: challengeProgress,
      values: {
        challengeId: 3,
        userId: "user_1",
        completed: true,
      },
    });
    expect(updateCalls[0]).toMatchObject({
      table: userProgress,
      values: {
        points: 80,
      },
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/lesson/15");
  });
});
