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
          where: vi.fn().mockReturnThis(),
          returning: vi.fn().mockReturnValue([{ points: 11, gems: 51 }]),
        } as any;
      },
    })),
    insertCalls,
    insertMock: vi.fn((table: unknown) => ({
      values: async (values: Record<string, unknown>) => {
        insertCalls.push({ table, values });
        return [{ id: 1 }];
      },
      returning: vi.fn().mockReturnValue([{ id: 1 }]),
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

describe("upsertChallengeProgress first-try XP", () => {
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

  it("awards 1 XP for practice questions", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 3, points: 40, streak: 0 });
    mockGetUserSubscription.mockResolvedValue({ isActive: false });
    challengeFindFirstMock.mockResolvedValue({ id: 1, lessonId: 100 });
    // Existing progress means practice
    challengeProgressFindFirstMock.mockResolvedValue({ id: 999, completed: true });
    mockAwardXP.mockResolvedValue({ xpEarned: 1 });

    await upsertChallengeProgress(1, true, false);

    // No insert for challengeProgress in practice mode
    expect(insertCalls).toHaveLength(0);

    // Updated practice completion and hearts
    expect(updateCalls).toHaveLength(2);
    expect(updateCalls[0]).toMatchObject({ table: challengeProgress, values: { completed: true } });
    expect(updateCalls[1]).toMatchObject({ table: userProgress, values: { hearts: 4 } });

    expect(mockAwardXP).toHaveBeenCalledTimes(1);
    expect(mockAwardXP).toHaveBeenCalledWith(
      1,
      "practice_question",
      "1",
      undefined,
      { applySubscriptionBonus: false, applyStreakBonus: false },
    );

    expect(mockUpdateMonthlyQuestProgress).not.toHaveBeenCalled();
    expect(revalidatePathMock).toHaveBeenCalledWith("/lesson/100");
  });

  it("awards 1 XP on non-final first-time completion", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 3, points: 40, streak: 0 });
    mockGetUserSubscription.mockResolvedValue({ isActive: false });
    challengeFindFirstMock.mockResolvedValue({ id: 2, lessonId: 200 });
    // No existing progress = first-time completion
    challengeProgressFindFirstMock.mockResolvedValue(null);
    // Multiple challenges; include one more so current completion is NOT final
    challengeFindManyMock.mockResolvedValue([
      { id: 2, lessonId: 200 },
      { id: 3, lessonId: 200 },
      { id: 4, lessonId: 200 },
    ]);
    // Completed other challenge already
    challengeProgressFindManyMock.mockResolvedValue([
      { challengeId: 3, completed: true, challenge: { lessonId: 200 } },
    ]);
    mockAwardXP.mockResolvedValue({ xpEarned: 1 });

    const result = await upsertChallengeProgress(2, true, false);

    expect(result).toEqual({ lessonComplete: false });
    expect(insertCalls).toHaveLength(1);
    expect(mockAwardXP).toHaveBeenCalledTimes(1);
    expect(mockAwardXP).toHaveBeenCalledWith(
      1,
      "challenge_question",
      "2",
      undefined,
      { applySubscriptionBonus: false, applyStreakBonus: false },
    );
    expect(revalidatePathMock).toHaveBeenCalledWith("/lesson/200");
  });

  it("awards lesson rewards with per-question XP on final challenge", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 4, points: 120, streak: 0 });
    mockGetUserSubscription.mockResolvedValue({ isActive: true });
    challengeFindFirstMock.mockResolvedValue({ id: 10, lessonId: 300 });
    challengeProgressFindFirstMock.mockResolvedValue(null);
    // Only one challenge -> final
    challengeFindManyMock.mockResolvedValue([{ id: 10, lessonId: 300 }]);
    // No completed others
    challengeProgressFindManyMock.mockResolvedValue([]);
    mockProcessLessonCompletion.mockResolvedValue({
      xp: 45,
      gems: 8,
      newStreak: 3,
      achievements: ["perfect-lesson"],
    });

    const result = await upsertChallengeProgress(10, true, false);

    expect(result).toEqual({
      lessonComplete: true,
      rewards: { xp: 45, gems: 8, streak: 3, achievements: ["perfect-lesson"] },
    });
    // 1 XP for the question plus lesson rewards
    expect(mockAwardXP).toHaveBeenCalledWith(
      1,
      "challenge_question",
      "10",
      undefined,
      { applySubscriptionBonus: false, applyStreakBonus: false },
    );

    expect(revalidatePathMock).toHaveBeenCalledWith("/lesson/300");
  });

  it("awards practice lesson XP for pro users on final challenge", async () => {
    mockGetUserProgress.mockResolvedValue({ hearts: 3, points: 80, streak: 0 });
    mockGetUserSubscription.mockResolvedValue({ isActive: true });
    challengeFindFirstMock.mockResolvedValue({ id: 5, lessonId: 400 });
    challengeProgressFindFirstMock.mockResolvedValue({ id: 501, completed: true });
    mockAwardXP.mockResolvedValue({ xpEarned: 1 });

    await upsertChallengeProgress(5, false, true);

    expect(mockAwardXP).toHaveBeenCalledWith(
      1,
      "practice_question",
      "5",
      undefined,
      { applySubscriptionBonus: false, applyStreakBonus: false },
    );
    expect(mockAwardXP).toHaveBeenCalledWith(
      25,
      "practice_lesson",
      "400",
      undefined,
      { applySubscriptionBonus: false, applyStreakBonus: false },
    );
    expect(revalidatePathMock).toHaveBeenCalledWith("/lesson/400");
  });
});
