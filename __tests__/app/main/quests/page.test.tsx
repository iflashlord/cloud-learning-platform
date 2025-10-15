import React from "react";
import { render, screen } from "@testing-library/react";

const {
  mockGetUserProgress,
  mockGetUserSubscription,
  mockGetCourses,
  redirectMock,
  userProgressCalls,
  trackerCalls,
  achievementsCalls,
} = vi.hoisted(() => ({
  mockGetUserProgress: vi.fn(),
  mockGetUserSubscription: vi.fn(),
  mockGetCourses: vi.fn(),
  redirectMock: vi.fn(() => {
    throw new Error("redirect");
  }),
  userProgressCalls: [] as any[],
  trackerCalls: [] as any[],
  achievementsCalls: [] as any[],
}));

vi.mock("@/db/queries", () => ({
  getUserProgress: mockGetUserProgress,
  getUserSubscription: mockGetUserSubscription,
  getCourses: mockGetCourses,
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/components/sticky-wrapper", () => ({
  StickyWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sticky-wrapper">{children}</div>
  ),
}));

vi.mock("@/components/feed-wrapper", () => ({
  FeedWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="feed-wrapper">{children}</div>
  ),
}));

vi.mock("@/components/user-progress", () => ({
  UserProgress: (props: any) => {
    userProgressCalls.push(props);
    return <div data-testid="user-progress" />;
  },
}));

vi.mock("@/components/promo", () => ({
  Promo: () => <div data-testid="promo" />,
}));

vi.mock("@/app/(main)/quests/quest-progress-tracker", () => ({
  QuestProgressTracker: (props: any) => {
    trackerCalls.push(props);
    return <div data-testid="quest-progress-tracker" />;
  },
  QuestProgressTrackerComponent: (props: any) => {
    trackerCalls.push(props);
    return <div data-testid="quest-progress-tracker" />;
  },
}));

vi.mock("@/app/(main)/quests/quest-achievements", () => ({
  QuestAchievements: (props: any) => {
    achievementsCalls.push(props);
    return <div data-testid="quest-achievements" />;
  },
}));

const { default: QuestsPage } = await import("@/app/(main)/quests/page");

describe("QuestsPage server component", () => {
  beforeEach(() => {
    mockGetUserProgress.mockReset();
    mockGetUserSubscription.mockReset();
    mockGetCourses.mockReset();
    redirectMock.mockReset();
    redirectMock.mockImplementation(() => {
      throw new Error("redirect");
    });
    userProgressCalls.length = 0;
    trackerCalls.length = 0;
    achievementsCalls.length = 0;
  });

  it("redirects to courses when user progress is unavailable", async () => {
    mockGetUserProgress.mockResolvedValueOnce(null);
    mockGetUserSubscription.mockResolvedValueOnce(null);
    mockGetCourses.mockResolvedValueOnce([]);

    await expect(QuestsPage()).rejects.toThrow("redirect");
    expect(redirectMock).toHaveBeenCalledWith("/courses");
  });

  it("hydrates quest context for the active learner", async () => {
    mockGetUserProgress.mockResolvedValueOnce({
      userId: "user_1",
      points: 120,
      hearts: 4,
      activeCourse: {
        id: 7,
        title: "Cloud Foundations",
        imageSrc: "/course.png",
      },
    });
    mockGetUserSubscription.mockResolvedValueOnce({ isActive: false });
    mockGetCourses.mockResolvedValueOnce([
      {
        id: 7,
        title: "Cloud Foundations",
        imageSrc: "/course.png",
        progress: { percentage: 60, completedChallenges: 6, totalChallenges: 10 },
      },
      {
        id: 9,
        title: "Other Course",
        imageSrc: "/other.png",
      },
    ]);

    const element = await QuestsPage();
    render(element);

    expect(screen.getByTestId("user-progress")).toBeInTheDocument();
    expect(screen.getByTestId("quest-progress-tracker")).toBeInTheDocument();
    expect(screen.getByTestId("quest-achievements")).toBeInTheDocument();

    const [userProgressProps] = userProgressCalls;
    expect(userProgressProps.activeCourse.id).toBe(7);
    expect(userProgressProps.hearts).toBe(4);
    expect(userProgressProps.points).toBe(120);
    expect(userProgressProps.hasActiveSubscription).toBe(false);

    const [trackerProps] = trackerCalls;
    expect(trackerProps.userPoints).toBe(120);
    expect(Array.isArray(trackerProps.quests)).toBe(true);

    const [achievementsProps] = achievementsCalls;
    expect(achievementsProps.userPoints).toBe(120);
    expect(achievementsProps.totalQuests).toBeGreaterThan(0);

    expect(redirectMock).not.toHaveBeenCalled();
  });
});
