import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const {
  mockGetUserProgress,
  mockGetCourses,
  mockGetUserSubscription,
} = vi.hoisted(() => ({
  mockGetUserProgress: vi.fn(),
  mockGetCourses: vi.fn(),
  mockGetUserSubscription: vi.fn(),
}));

vi.mock("@/db/queries", () => ({
  getUserProgress: mockGetUserProgress,
  getCourses: mockGetCourses,
  getUserSubscription: mockGetUserSubscription,
}));

vi.mock("@/components/sidebar-item", () => ({
  SidebarItem: ({ label, href, iconSrc, isActive }: any) => (
    <div data-testid={`sidebar-item-${label.toLowerCase()}`}>
      <a href={href} className={isActive ? "active" : ""}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt={label} />
        {label}
      </a>
    </div>
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("Sidebar", () => {
  let Sidebar: any;

  beforeEach(async () => {
    vi.resetModules();
    mockGetUserProgress.mockClear();
    mockGetCourses.mockClear();
    mockGetUserSubscription.mockClear();
    
    const sidebarModule = await import("@/components/sidebar");
    Sidebar = sidebarModule.Sidebar;
  });

  it("renders main navigation items", async () => {
    mockGetUserProgress.mockResolvedValue({
      activeCourse: { id: 1, title: "AWS Fundamentals" },
      points: 100,
      hearts: 5,
    });
    mockGetCourses.mockResolvedValue([]);
    mockGetUserSubscription.mockResolvedValue(null);

    render(await Sidebar());

    expect(screen.getByTestId("sidebar-item-learn")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-item-leaderboard")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-item-quests")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-item-shop")).toBeInTheDocument();
  });

  it("displays branding section", async () => {
    mockGetUserProgress.mockResolvedValue(null);
    mockGetCourses.mockResolvedValue([]);
    mockGetUserSubscription.mockResolvedValue(null);

    render(await Sidebar());

    expect(screen.getByText(/AWS Cloud Academy/i)).toBeInTheDocument();
  });

  it("shows course selection when courses are available", async () => {
    mockGetUserProgress.mockResolvedValue({
      activeCourse: { id: 1, title: "AWS Fundamentals" },
    });
    mockGetCourses.mockResolvedValue([
      { id: 1, title: "AWS Fundamentals" },
      { id: 2, title: "AWS Advanced" },
    ]);
    mockGetUserSubscription.mockResolvedValue(null);

    render(await Sidebar());

    expect(screen.getByText("AWS Fundamentals")).toBeInTheDocument();
  });

  it("handles empty user progress gracefully", async () => {
    mockGetUserProgress.mockResolvedValue(null);
    mockGetCourses.mockResolvedValue([]);
    mockGetUserSubscription.mockResolvedValue(null);

    render(await Sidebar());

    expect(screen.getByTestId("sidebar-item-learn")).toBeInTheDocument();
  });
});