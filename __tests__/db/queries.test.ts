import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const {
  authMock,
  userProgressFindFirstMock,
  userProgressFindManyMock,
  unitsFindManyMock,
  coursesFindManyMock,
  coursesFindFirstMock,
  lessonsFindFirstMock,
  userSubscriptionFindFirstMock,
} = vi.hoisted(() => ({
  authMock: vi.fn(),
  userProgressFindFirstMock: vi.fn(),
  userProgressFindManyMock: vi.fn(),
  unitsFindManyMock: vi.fn(),
  coursesFindManyMock: vi.fn(),
  coursesFindFirstMock: vi.fn(),
  lessonsFindFirstMock: vi.fn(),
  userSubscriptionFindFirstMock: vi.fn(),
}));

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    cache: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
  };
});

vi.mock("@clerk/nextjs/server", () => ({
  auth: authMock,
}));

vi.mock("@/db/drizzle", () => ({
  __esModule: true,
  default: {
    query: {
      userProgress: {
        findFirst: userProgressFindFirstMock,
        findMany: userProgressFindManyMock,
      },
      units: {
        findMany: unitsFindManyMock,
      },
      courses: {
        findMany: coursesFindManyMock,
        findFirst: coursesFindFirstMock,
      },
      lessons: {
        findFirst: lessonsFindFirstMock,
      },
      userSubscription: {
        findFirst: userSubscriptionFindFirstMock,
      },
    },
  },
}));

const queries = await import("@/db/queries");

const {
  getUserProgress,
  getUnits,
  getCourses,
  getCourseById,
  getCourseProgress,
  getLesson,
  getLessonPercentage,
  getUserSubscription,
  getTopTenUsers,
  getAdminCourseById,
} = queries;

beforeEach(() => {
  authMock.mockReset().mockResolvedValue({ userId: "user_123" });
  userProgressFindFirstMock.mockReset();
  userProgressFindManyMock.mockReset();
  unitsFindManyMock.mockReset();
  coursesFindManyMock.mockReset();
  coursesFindFirstMock.mockReset();
  lessonsFindFirstMock.mockReset();
  userSubscriptionFindFirstMock.mockReset();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getUserProgress", () => {
  it("returns null when the user is not authenticated", async () => {
    authMock.mockResolvedValueOnce({ userId: null });

    const result = await getUserProgress();

    expect(result).toBeNull();
    expect(userProgressFindFirstMock).not.toHaveBeenCalled();
  });

  it("returns the active course progress for the current user", async () => {
    const progressRecord = {
      userId: "user_123",
      hearts: 3,
      activeCourseId: 9,
      activeCourse: { id: 9, title: "Cloud Foundations" },
    };
    userProgressFindFirstMock.mockResolvedValue(progressRecord);

    const result = await getUserProgress();

    expect(result).toEqual(progressRecord);
    expect(userProgressFindFirstMock).toHaveBeenCalledWith(
      expect.objectContaining({
        with: { activeCourse: true },
      }),
    );
  });
});

describe("getUnits", () => {
  it("returns an empty array when the user is not authenticated", async () => {
    authMock
      .mockResolvedValueOnce({ userId: null })
      .mockResolvedValueOnce({ userId: null });
    userProgressFindFirstMock.mockResolvedValue(null);

    const result = await getUnits();

    expect(result).toEqual([]);
    expect(unitsFindManyMock).not.toHaveBeenCalled();
  });

  it("marks lessons as completed only when every challenge is finished", async () => {
    userProgressFindFirstMock.mockResolvedValue({
      userId: "user_123",
      activeCourseId: 42,
    });

    unitsFindManyMock.mockResolvedValue([
      {
        id: 1,
        title: "Unit 1",
        lessons: [
          {
            id: 10,
            title: "Lesson 1",
            challenges: [
              { id: 100, challengeProgress: [{ completed: true }] },
              { id: 101, challengeProgress: [{ completed: true }] },
            ],
          },
          {
            id: 11,
            title: "Lesson 2",
            challenges: [
              { id: 200, challengeProgress: [{ completed: true }] },
              { id: 201, challengeProgress: [{ completed: false }] },
            ],
          },
          {
            id: 12,
            title: "Lesson 3",
            challenges: [],
          },
        ],
      },
    ]);

    const result = await getUnits();

    expect(result).toHaveLength(1);
    const [unit] = result;
    const lessonStatuses = unit.lessons.reduce<Record<number, boolean>>(
      (acc, lesson) => {
        acc[lesson.id] = lesson.completed ?? false;
        return acc;
      },
      {},
    );

    expect(lessonStatuses[10]).toBe(true);
    expect(lessonStatuses[11]).toBe(false);
    expect(lessonStatuses[12]).toBe(false);
  });
});

describe("getCourses", () => {
  it("returns every course without additional processing", async () => {
    const coursesList = [
      { id: 1, title: "Cloud Computing" },
      { id: 2, title: "Azure" },
    ];
    coursesFindManyMock.mockResolvedValue(coursesList);

    const result = await getCourses();

    expect(result).toEqual(coursesList);
    expect(coursesFindManyMock).toHaveBeenCalledWith();
  });
});

describe("getCourseById", () => {
  it("returns the course hierarchy for the requested id", async () => {
    const courseRecord = {
      id: 7,
      title: "Cloud Deep Dive",
      units: [{ id: 1, lessons: [{ id: 9 }, { id: 10 }] }],
    };
    coursesFindFirstMock.mockResolvedValue(courseRecord);

    const result = await getCourseById(7);

    expect(result).toEqual(courseRecord);
    expect(coursesFindFirstMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.anything(),
      }),
    );
  });
});

describe("getCourseProgress", () => {
  it("returns null when there is no active course", async () => {
    userProgressFindFirstMock.mockResolvedValue(null);

    const result = await getCourseProgress();

    expect(result).toBeNull();
    expect(unitsFindManyMock).not.toHaveBeenCalled();
  });

  it("locates the first lesson with an incomplete challenge", async () => {
    userProgressFindFirstMock.mockResolvedValue({
      userId: "user_123",
      activeCourseId: 4,
    });

    unitsFindManyMock.mockResolvedValue([
      {
        id: 1,
        lessons: [
          {
            id: 25,
            title: "Completed lesson",
            challenges: [
              { id: 1, challengeProgress: [{ completed: true }] },
              { id: 2, challengeProgress: [{ completed: true }] },
            ],
          },
          {
            id: 26,
            title: "In progress lesson",
            challenges: [
              { id: 3, challengeProgress: [] },
              { id: 4, challengeProgress: [{ completed: false }] },
            ],
          },
        ],
      },
    ]);

    const result = await getCourseProgress();

    expect(result?.activeLesson?.id).toBe(26);
    expect(result?.activeLessonId).toBe(26);
  });
});

describe("getLesson", () => {
  it("returns null for unauthenticated users", async () => {
    authMock.mockResolvedValueOnce({ userId: null });

    const result = await getLesson();

    expect(result).toBeNull();
    expect(lessonsFindFirstMock).not.toHaveBeenCalled();
  });

  it("returns null when the lesson cannot be found", async () => {
    userProgressFindFirstMock.mockResolvedValue({
      userId: "user_123",
      activeCourseId: 7,
    });
    unitsFindManyMock.mockResolvedValue([]);
    lessonsFindFirstMock.mockResolvedValue(null);

    const result = await getLesson(41);

    expect(result).toBeNull();
  });

  it("annotates challenge completion state", async () => {
    userProgressFindFirstMock.mockResolvedValue({
      userId: "user_123",
      activeCourseId: 7,
    });
    unitsFindManyMock.mockResolvedValue([]);
    lessonsFindFirstMock.mockResolvedValue({
      id: 99,
      title: "Serverless Basics",
      challenges: [
        {
          id: 1,
          challengeProgress: [{ completed: true }],
        },
        {
          id: 2,
          challengeProgress: [{ completed: true }, { completed: false }],
        },
        {
          id: 3,
          challengeProgress: [],
        },
      ],
    });

    const lesson = await getLesson(99);

    expect(lesson?.challenges.find((challenge) => challenge.id === 1)?.completed).toBe(true);
    expect(lesson?.challenges.find((challenge) => challenge.id === 2)?.completed).toBe(false);
    expect(lesson?.challenges.find((challenge) => challenge.id === 3)?.completed).toBe(false);
  });
});

describe("getLessonPercentage", () => {
  it("returns 0 when there is no active lesson", async () => {
    userProgressFindFirstMock.mockResolvedValue(null);

    const percentage = await getLessonPercentage();

    expect(percentage).toBe(0);
  });

  it("returns the rounded completion percentage of the active lesson", async () => {
    userProgressFindFirstMock.mockResolvedValue({
      userId: "user_123",
      activeCourseId: 6,
    });
    const unitsPayload = [
      {
        id: 1,
        lessons: [
          {
            id: 54,
            challenges: [
              { id: 1, challengeProgress: [{ completed: true }] },
            ],
          },
          {
            id: 55,
            challenges: [
              { id: 2, challengeProgress: [{ completed: true }] },
              { id: 3, challengeProgress: [{ completed: true }] },
              { id: 4, challengeProgress: [{ completed: false }] },
            ],
          },
        ],
      },
    ];
    unitsFindManyMock.mockResolvedValue(unitsPayload);
    lessonsFindFirstMock.mockResolvedValue({
      id: 55,
      challenges: [
        { id: 2, challengeProgress: [{ completed: true }] },
        { id: 3, challengeProgress: [{ completed: true }] },
        { id: 4, challengeProgress: [{ completed: false }] },
      ],
    });

    const percentage = await getLessonPercentage();

    expect(percentage).toBe(67);
  });
});

describe("getUserSubscription", () => {
  it("returns null when the user is not authenticated", async () => {
    authMock.mockResolvedValueOnce({ userId: null });

    const result = await getUserSubscription();

    expect(result).toBeNull();
    expect(userSubscriptionFindFirstMock).not.toHaveBeenCalled();
  });

  it("returns null when there is no subscription record", async () => {
    userSubscriptionFindFirstMock.mockResolvedValue(null);

    const result = await getUserSubscription();

    expect(result).toBeNull();
  });

  it("flags subscriptions as active when the grace period has not elapsed", async () => {
    const now = Date.UTC(2024, 0, 1);
    const dateNowSpy = vi.spyOn(Date, "now").mockReturnValue(now);
    userSubscriptionFindFirstMock.mockResolvedValue({
      userId: "user_123",
      stripePriceId: "price_123",
      stripeCurrentPeriodEnd: new Date(now - 1_000),
    });

    const result = await getUserSubscription();

    expect(result?.isActive).toBe(true);
    dateNowSpy.mockRestore();
  });

  it("marks subscriptions as inactive after the grace period", async () => {
    const now = Date.UTC(2024, 0, 1);
    const dateNowSpy = vi.spyOn(Date, "now").mockReturnValue(now);
    userSubscriptionFindFirstMock.mockResolvedValue({
      userId: "user_123",
      stripePriceId: "price_123",
      stripeCurrentPeriodEnd: new Date(now - 172_800_000), // 2 days ago
    });

    const result = await getUserSubscription();

    expect(result?.isActive).toBe(false);
    dateNowSpy.mockRestore();
  });
});

describe("getTopTenUsers", () => {
  it("returns an empty array for anonymous users", async () => {
    authMock.mockResolvedValueOnce({ userId: null });

    const result = await getTopTenUsers();

    expect(result).toEqual([]);
    expect(userProgressFindManyMock).not.toHaveBeenCalled();
  });

  it("returns the leaderboard of top users", async () => {
    const leaderboard = [
      { userId: "user_1", points: 50 },
      { userId: "user_2", points: 40 },
    ];
    userProgressFindManyMock.mockResolvedValue(leaderboard);

    const result = await getTopTenUsers();

    expect(result).toEqual(leaderboard);
    expect(userProgressFindManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: 10,
      }),
    );
  });
});

describe("getAdminCourseById", () => {
  it("returns the full course graph for admins", async () => {
    const adminCourse = {
      id: 3,
      title: "Admin Course",
      units: [
        {
          id: 1,
          lessons: [
            {
              id: 8,
              challenges: [
                { id: 1, challengeOptions: [{ id: 4 }, { id: 5 }] },
              ],
            },
          ],
        },
      ],
    };
    coursesFindFirstMock.mockResolvedValue(adminCourse);

    const result = await getAdminCourseById(3);

    expect(result).toEqual(adminCourse);
    expect(coursesFindFirstMock).toHaveBeenCalledWith(
      expect.objectContaining({
        with: expect.objectContaining({
          units: expect.anything(),
        }),
      }),
    );
  });
});
