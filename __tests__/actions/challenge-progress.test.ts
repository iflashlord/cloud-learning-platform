import { challengeProgress, userProgress } from "@/db/schema";

const {
  mockAuth,
  mockGetUserProgress,
  mockGetUserSubscription,
  revalidatePathMock,
  challengeFindFirstMock,
  challengeFindManyMock,
  challengeProgressFindFirstMock,
  challengeProgressFindManyMock,
  updateCalls,
  updateMock,
  insertCalls,
  insertMock,
  mockAwardXP,
  mockProcessLessonCompletion,
  mockUpdateMonthlyQuestProgress,
} = vi.hoisted(() => {
  const updateCalls: Array<{ table: unknown; values: Record<string, unknown> }> = [];
  const insertCalls: Array<{ table: unknown; values: Record<string, unknown> }> = [];

  return {
    mockAuth: vi.fn(),
    mockGetUserProgress: vi.fn(),
    mockGetUserSubscription: vi.fn(),
    revalidatePathMock: vi.fn(),
    challengeFindFirstMock: vi.fn(),
    challengeFindManyMock: vi.fn(),
    challengeProgressFindFirstMock: vi.fn(),
    challengeProgressFindManyMock: vi.fn(),
    updateCalls,
    updateMock: vi.fn((table: unknown) => ({
      set: (values: Record<string, unknown>) => {
        updateCalls.push({ table, values });
        return {
          where: vi.fn(),
        };
      },
    })),
    insertCalls,
    insertMock: vi.fn((table: unknown) => ({
      values: async (values: Record<string, unknown>) => {
        insertCalls.push({ table, values });
      },
    })),
    mockAwardXP: vi.fn(),
    mockProcessLessonCompletion: vi.fn(),
    mockUpdateMonthlyQuestProgress: vi.fn(),
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
        findMany: challengeFindManyMock,
      },
      challengeProgress: {
        findFirst: challengeProgressFindFirstMock,
        findMany: challengeProgressFindManyMock,
      },
    },
    update: updateMock,
    insert: insertMock,
  },
}));

vi.mock("@/actions/gamification", () => ({
  __esModule: true,
  awardXP: mockAwardXP,
  processLessonCompletion: mockProcessLessonCompletion,
  updateMonthlyQuestProgress: mockUpdateMonthlyQuestProgress,
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
    challengeFindManyMock.mockReset();
    challengeProgressFindFirstMock.mockReset();
    challengeProgressFindManyMock.mockReset();
    updateMock.mockClear();
    insertMock.mockClear();
    updateCalls.length = 0;
    insertCalls.length = 0;
    mockAwardXP.mockReset();
    mockProcessLessonCompletion.mockReset();
    mockUpdateMonthlyQuestProgress.mockReset();
  });

  it("throws when the user is not authenticated", async () => {
    mockAuth.mockResolvedValueOnce({ userId: null });

    await expect(upsertChallengeProgress(1)).rejects.toThrow("Unauthorized");
    expect(challengeFindFirstMock).not.toHaveBeenCalled();
  });

  it("returns a hearts error when the learner has no hearts and no subscription", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 0 });
    mockGetUserSubscription.mockResolvedValue(null);
    challengeFindFirstMock.mockResolvedValue({ id: 1, lessonId: 10 });
    challengeProgressFindFirstMock.mockResolvedValue(null);

    const result = await upsertChallengeProgress(1);

    expect(result).toEqual({ error: "hearts" });
    expect(insertCalls).toHaveLength(0);
    expect(mockAwardXP).not.toHaveBeenCalled();
  });

  it("treats completed challenges as practice and awards practice xp with heart refill", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 3, points: 40 });
    mockGetUserSubscription.mockResolvedValue({ isActive: false });
    challengeFindFirstMock.mockResolvedValue({ id: 1, lessonId: 12 });
    challengeProgressFindFirstMock.mockResolvedValue({ id: 99, completed: false });
    mockAwardXP.mockResolvedValue({ xpEarned: 5 });

    await upsertChallengeProgress(1);

    expect(insertCalls).toHaveLength(0);
    expect(updateCalls).toHaveLength(2);
    expect(updateCalls[0]).toMatchObject({ table: challengeProgress, values: { completed: true } });
    expect(updateCalls[1]).toMatchObject({ table: userProgress, values: { hearts: 4 } });
    expect(mockAwardXP).toHaveBeenCalledWith(5, "practice_lesson", "12");
    expect(mockUpdateMonthlyQuestProgress).toHaveBeenCalledWith("complete_monthly_lessons", 1);
    expect(revalidatePathMock).toHaveBeenCalledWith("/lesson/12");
  });

  it("inserts new progress and awards xp for first-time completion", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 2, points: 70 });
    mockGetUserSubscription.mockResolvedValue({ isActive: false });
    challengeFindFirstMock.mockResolvedValue({ id: 3, lessonId: 15 });
    challengeProgressFindFirstMock.mockResolvedValue(null);
    challengeFindManyMock.mockResolvedValue([
      { id: 3, lessonId: 15 },
      { id: 4, lessonId: 15 },
      { id: 5, lessonId: 15 },
    ]);
    challengeProgressFindManyMock.mockResolvedValue([
      {
        challengeId: 4,
        completed: true,
        challenge: { lessonId: 15 },
      },
    ]);
    mockAwardXP.mockResolvedValue({ xpEarned: 10 });

    const result = await upsertChallengeProgress(3);

    expect(result).toEqual({ lessonComplete: false });
    expect(insertCalls).toHaveLength(1);
    expect(insertCalls[0]).toMatchObject({
      table: challengeProgress,
      values: { challengeId: 3, userId: "user_1", completed: true },
    });
    expect(mockAwardXP).toHaveBeenCalledWith(10, "challenge_complete", "3");
    expect(mockProcessLessonCompletion).not.toHaveBeenCalled();
    expect(revalidatePathMock).toHaveBeenCalledWith("/lesson/15");
  });

  it("returns rewards when completing the final challenge in a lesson", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 4, points: 120 });
    mockGetUserSubscription.mockResolvedValue({ isActive: true });
    challengeFindFirstMock.mockResolvedValue({ id: 6, lessonId: 20 });
    challengeProgressFindFirstMock.mockResolvedValue(null);
    challengeFindManyMock.mockResolvedValue([{ id: 6, lessonId: 20 }]);
    challengeProgressFindManyMock.mockResolvedValue([]);
    mockProcessLessonCompletion.mockResolvedValue({
      xp: 45,
      gems: 8,
      newStreak: 3,
      achievements: ["perfect-lesson"],
    });

    const result = await upsertChallengeProgress(6);

    expect(result).toEqual({
      lessonComplete: true,
      rewards: { xp: 45, gems: 8, streak: 3, achievements: ["perfect-lesson"] },
    });
    expect(mockProcessLessonCompletion).toHaveBeenCalledWith(20, true, false);
    expect(mockAwardXP).not.toHaveBeenCalled();
    expect(insertCalls[0]).toMatchObject({
      table: challengeProgress,
      values: { challengeId: 6, userId: "user_1", completed: true },
    });
  });
});
