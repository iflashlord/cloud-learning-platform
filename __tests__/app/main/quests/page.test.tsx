import React from "react";
import { render, screen } from "@testing-library/react";

const {
  mockGetUserProgress,
  mockGetUserSubscription,
  mockGetCourses,
  mockGetMonthlyQuestProgress,
  mockCreateMonthlyQuest,
  redirectMock,
  userProgressCalls,
  trackerCalls,
  achievementsCalls,
  questStatsCalls,
  questListingCalls,
  monthlyQuestCalls,
} = vi.hoisted(() => ({
  mockGetUserProgress: vi.fn(),
  mockGetUserSubscription: vi.fn(),
  mockGetCourses: vi.fn(),
  mockGetMonthlyQuestProgress: vi.fn(),
  mockCreateMonthlyQuest: vi.fn(),
  redirectMock: vi.fn(() => {
    throw new Error("redirect");
  }),
  userProgressCalls: [] as any[],
  trackerCalls: [] as any[],
  achievementsCalls: [] as any[],
  questStatsCalls: [] as any[],
  questListingCalls: [] as any[],
  monthlyQuestCalls: [] as any[],
}));

vi.mock("@/db/queries", () => ({
  getUserProgress: mockGetUserProgress,
  getUserSubscription: mockGetUserSubscription,
  getCourses: mockGetCourses,
}));

vi.mock("@/actions/gamification", () => ({
  getMonthlyQuestProgress: mockGetMonthlyQuestProgress,
  createMonthlyQuest: mockCreateMonthlyQuest,
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

vi.mock("@/lib/css-grid-system", () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
  ContentGrid: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="content-grid">{children}</div>
  ),
}));

vi.mock("@/components/pro-upgrade-card", () => ({
  ProUpgradeCard: () => <div data-testid="pro-upgrade-card" />,
}));

vi.mock("@/components/ui/quest-page-header", () => ({
  QuestPageHeader: () => <div data-testid="quest-page-header" />,
}));

vi.mock("@/components/ui/quest-stats", () => ({
  QuestStats: (props: any) => {
    questStatsCalls.push(props);
    return <div data-testid="quest-stats" />;
  },
}));

vi.mock("@/components/ui/quest-listing", () => ({
  QuestListing: (props: any) => {
    questListingCalls.push(props);
    return <div data-testid="quest-listing" />;
  },
}));

vi.mock("@/components/quests/MonthlyQuestContainer", () => ({
  MonthlyQuestContainer: (props: any) => {
    monthlyQuestCalls.push(props);
    return <div data-testid="monthly-quest" />;
  },
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
    mockGetMonthlyQuestProgress.mockReset();
    mockCreateMonthlyQuest.mockReset();
    redirectMock.mockReset();
    redirectMock.mockImplementation(() => {
      throw new Error("redirect");
    });
    userProgressCalls.length = 0;
    trackerCalls.length = 0;
    achievementsCalls.length = 0;
    questStatsCalls.length = 0;
    questListingCalls.length = 0;
    monthlyQuestCalls.length = 0;
  });

  it("redirects to courses when user progress is unavailable", async () => {
    mockGetUserProgress.mockResolvedValueOnce(null);
    mockGetUserSubscription.mockResolvedValueOnce(null);
    mockGetCourses.mockResolvedValueOnce([]);
    mockGetMonthlyQuestProgress.mockResolvedValueOnce({ id: 1 });

    await expect(QuestsPage()).rejects.toThrow("redirect");
    expect(redirectMock).toHaveBeenCalledWith("/courses");
    expect(mockCreateMonthlyQuest).not.toHaveBeenCalled();
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
    mockGetMonthlyQuestProgress.mockResolvedValueOnce({
      id: 1,
      title: "Consistency Champion",
      targetValue: 10,
      currentValue: 3,
    });

    const element = await QuestsPage();
    expect(React.isValidElement(element)).toBe(true);
    render(element);

    expect(screen.getByTestId("quest-progress-tracker")).toBeInTheDocument();
    expect(screen.getByTestId("quest-achievements")).toBeInTheDocument();
    expect(screen.getByTestId("quest-stats")).toBeInTheDocument();
    expect(screen.getByTestId("quest-listing")).toBeInTheDocument();
    expect(screen.getByTestId("monthly-quest")).toBeInTheDocument();

    const [trackerProps] = trackerCalls;
    expect(trackerProps.userPoints).toBe(120);
    expect(Array.isArray(trackerProps.quests)).toBe(true);

    const [achievementsProps] = achievementsCalls;
    expect(achievementsProps.userPoints).toBe(120);
    expect(achievementsProps.totalQuests).toBeGreaterThan(0);

    const [statsProps] = questStatsCalls;
    expect(statsProps).toMatchObject({
      completedQuests: expect.any(Number),
      availableQuests: expect.any(Number),
      totalPoints: 120,
    });
    expect(statsProps.completedQuests).toBeGreaterThan(0);

    const [listingProps] = questListingCalls;
    expect(listingProps.userPoints).toBe(120);
    expect(Array.isArray(listingProps.quests)).toBe(true);

    const [monthlyProps] = monthlyQuestCalls;
    expect(monthlyProps.monthlyQuestData).toMatchObject({
      id: 1,
      title: "Consistency Champion",
      currentValue: 3,
      targetValue: 10,
    });

    expect(redirectMock).not.toHaveBeenCalled();
    expect(mockCreateMonthlyQuest).not.toHaveBeenCalled();
  });
});
