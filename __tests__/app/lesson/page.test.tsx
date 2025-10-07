const {
  mockRedirect,
  mockGetLesson,
  mockGetUserProgress,
  mockGetUserSubscription,
} = vi.hoisted(() => ({
  mockRedirect: vi.fn(),
  mockGetLesson: vi.fn(),
  mockGetUserProgress: vi.fn(),
  mockGetUserSubscription: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("@/db/queries", () => ({
  getLesson: mockGetLesson,
  getUserProgress: mockGetUserProgress,
  getUserSubscription: mockGetUserSubscription,
}));

const loadLessonPage = () => import("@/app/lesson/page");

describe("LessonPage server component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to /learn when lesson or user progress data is missing", async () => {
    mockGetLesson.mockResolvedValueOnce(null);
    mockGetUserProgress.mockResolvedValueOnce(null);
    mockGetUserSubscription.mockResolvedValueOnce(null);

    mockRedirect.mockImplementationOnce(() => {
      throw new Error("redirect");
    });

    const { default: LessonPage } = await loadLessonPage();

    await expect(LessonPage()).rejects.toThrow("redirect");
    expect(mockRedirect).toHaveBeenCalledWith("/learn");
  });

  it("returns the quiz component with expected props when data is available", async () => {
    const lesson = {
      id: 7,
      challenges: [
        {
          id: 1,
          type: "SELECT",
          completed: true,
          challengeOptions: [],
        },
        {
          id: 2,
          type: "ASSIST",
          completed: false,
          challengeOptions: [],
        },
      ],
    };

    mockGetLesson.mockResolvedValueOnce(lesson);
    mockGetUserProgress.mockResolvedValueOnce({ hearts: 4 });
    mockGetUserSubscription.mockResolvedValueOnce({ isActive: false });

    const { default: LessonPage } = await loadLessonPage();
    const element = await LessonPage();

    expect(mockRedirect).not.toHaveBeenCalled();
    expect(element).toBeTruthy();
    expect(element?.props.initialLessonId).toBe(lesson.id);
    expect(element?.props.initialLessonChallenges).toEqual(lesson.challenges);
    expect(element?.props.initialHearts).toBe(4);
    expect(element?.props.initialPercentage).toBe(50);
    expect(element?.props.userSubscription).toEqual({ isActive: false });
  });
});
