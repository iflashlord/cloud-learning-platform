import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { mockTriggerBackfillLessons, mockDebugUserProgress } = vi.hoisted(() => ({
  mockTriggerBackfillLessons: vi.fn(),
  mockDebugUserProgress: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/actions/backfill-lessons", () => ({
  triggerBackfillLessons: mockTriggerBackfillLessons,
}));

vi.mock("@/actions/debug-progress", () => ({
  debugUserProgress: mockDebugUserProgress,
}));

import { ReviewDashboard } from "@/app/(main)/review/components/review-dashboard";

describe("ReviewDashboard", () => {
  const originalAlert = (globalThis as any).alert;

  beforeAll(() => {
    (globalThis as any).alert = vi.fn();
  });

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-03-22T12:00:00Z"));
    mockTriggerBackfillLessons.mockReset();
    mockTriggerBackfillLessons.mockResolvedValue({ success: true, message: "Synced" });
    mockDebugUserProgress.mockReset();
    mockDebugUserProgress.mockResolvedValue({ lessonProgress: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  afterAll(() => {
    (globalThis as any).alert = originalAlert;
  });

  const defaultLessons = [
    {
      id: "completion-1",
      lessonId: "lesson-1",
      completedAt: "2024-03-18T10:00:00Z",
      wasPerfect: true,
      score: 95,
      correctAnswers: 19,
      totalChallenges: 20,
      timeSpent: 1800,
      lesson: {
        title: "Intro to AWS",
        unit: {
          title: "Foundations Unit",
          course: { title: "AWS Fundamentals" },
        },
      },
    },
    {
      id: "completion-2",
      lessonId: "lesson-2",
      completedAt: "2024-03-01T15:00:00Z",
      wasPerfect: false,
      score: 80,
      correctAnswers: 16,
      totalChallenges: 20,
      timeSpent: 3600,
      lesson: {
        title: "Scaling on AWS",
        unit: {
          title: "Growth Unit",
          course: { title: "AWS Advanced" },
        },
      },
    },
  ];

  const renderComponent = (overrideProps: Partial<React.ComponentProps<typeof ReviewDashboard>> = {}) =>
    render(
      <ReviewDashboard
        completedLessons={defaultLessons}
        stats={{
          totalCompleted: 8,
          perfectLessons: 3,
          averageScore: 88,
          totalTimeSpent: 5400,
        }}
        isPro
        userProgress={{}}
        {...overrideProps}
      />,
    );

  it("renders stats overview and lesson details", () => {
    renderComponent();

    expect(screen.getByText("Lessons Completed")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("Perfect Lessons")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Average Score")).toBeInTheDocument();
    expect(screen.getByText("88%")).toBeInTheDocument();
    expect(screen.getByText("Time Spent")).toBeInTheDocument();
    expect(screen.getByText("1h 30m")).toBeInTheDocument();

    expect(screen.getByText("Intro to AWS")).toBeInTheDocument();
    expect(screen.getByText("AWS Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("Perfect")).toBeInTheDocument();
    expect(screen.getByText("AI Available")).toBeInTheDocument();
    expect(screen.getByText("Scaling on AWS")).toBeInTheDocument();
  });

  it("filters completed lessons by perfect score", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: /Perfect Scores/i }));

    expect(screen.getByText("Intro to AWS")).toBeInTheDocument();
    expect(screen.queryByText("Scaling on AWS")).not.toBeInTheDocument();
  });

  it("filters lessons completed this week", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: /This Week/i }));

    expect(screen.getByText("Intro to AWS")).toBeInTheDocument();
    expect(screen.queryByText("Scaling on AWS")).not.toBeInTheDocument();
  });

  it("shows the empty state with sync actions when no lessons are available", () => {
    renderComponent({ completedLessons: [] });

    expect(screen.getByText("No completed lessons found")).toBeInTheDocument();
    expect(
      screen.getByText("If you've completed lessons before, try syncing your progress below."),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Debug Progress" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sync Completed Lessons" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start Learning" })).toBeInTheDocument();
  });
});
