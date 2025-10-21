import React from "react";
import { render, screen } from "@testing-library/react";

const {
  mockGetUserProgress,
  mockGetUserSubscription,
  mockGetCourses,
  redirectMock,
  createStripeUrlMock,
} = vi.hoisted(() => ({
  mockGetUserProgress: vi.fn(),
  mockGetUserSubscription: vi.fn(),
  mockGetCourses: vi.fn(),
  redirectMock: vi.fn(),
  createStripeUrlMock: vi.fn(),
}));

vi.mock("@/db/queries", () => ({
  getUserProgress: mockGetUserProgress,
  getUserSubscription: mockGetUserSubscription,
  getCourses: mockGetCourses,
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/lib/css-grid-system", () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
  ContentGrid: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="content-grid">{children}</div>
  ),
}));

vi.mock("@/actions/user-subscription", () => ({
  createStripeUrl: createStripeUrlMock,
}));

describe("Pro Page", () => {
  let ProPageComponent: React.ComponentType;

  beforeEach(async () => {
    vi.resetModules();
    mockGetUserProgress.mockReset();
    mockGetUserSubscription.mockReset();
    mockGetCourses.mockReset();
    redirectMock.mockReset();
    createStripeUrlMock.mockReset();

    mockGetUserProgress.mockResolvedValue({
      hearts: 4,
      points: 320,
      userName: "Ada",
      userImageSrc: "/avatar.png",
      activeCourse: { id: 1 },
    });
    mockGetUserSubscription.mockResolvedValue({ isActive: false });
    mockGetCourses.mockResolvedValue([
      { id: 1, title: "Cloud Foundations", imageSrc: "/course.png" },
    ]);
    createStripeUrlMock.mockResolvedValue({ data: null });

    const pageModule = await import("@/app/(main)/pro/page");
    ProPageComponent = pageModule.default;
  });

  const renderProPage = async () => {
    const element = await ProPageComponent();
    return render(element);
  };

  it("renders the hero section with upgrade messaging", async () => {
    await renderProPage();

    expect(
      screen.getByRole("heading", { name: /Upgrade to Pro/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Unlock unlimited learning potential/i)
    ).toBeInTheDocument();
  });

  it("displays pro features and benefits", async () => {
    await renderProPage();

    expect(
      screen.getByRole("heading", { name: /Unlimited Hearts/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Ad-Free Experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Exclusive Pro Content/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Priority Support/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Advanced Analytics/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Pro-Only Features/i })
    ).toBeInTheDocument();
  });

  it("shows pricing information", async () => {
    await renderProPage();

    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText(/per month/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Free Trial/i)).toBeInTheDocument();
    expect(screen.getByText(/7-day free trial/i)).toBeInTheDocument();
  });

  it("includes testimonials section", async () => {
    await renderProPage();

    expect(screen.getByText(/Join thousands of successful learners/i)).toBeInTheDocument();
  });

  it("has a final call-to-action section", async () => {
    await renderProPage();

    expect(
      screen.getByText(/Ready to Accelerate Your Learning/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Start Your Pro Journey/i)).toBeInTheDocument();
  });

  it("displays feature comparison", async () => {
    await renderProPage();

    expect(screen.getByText(/Free vs Pro Comparison/i)).toBeInTheDocument();

    const freeLabel = screen.getByText(/Free Account/i);
    const proLabels = screen.getAllByText(/Pro Membership/i);

    expect(freeLabel).toBeInTheDocument();
    expect(proLabels.length).toBeGreaterThan(0);
  });

  it("does not redirect when user is not pro", async () => {
    await renderProPage();

    expect(redirectMock).not.toHaveBeenCalled();
  });
});
