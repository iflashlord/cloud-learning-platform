import React, { type ComponentProps } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const {
  mockRouterPush,
  mockUpsertUserProgress,
  mockToastError,
} = vi.hoisted(() => ({
  mockRouterPush: vi.fn(),
  mockUpsertUserProgress: vi.fn(),
  mockToastError: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

vi.mock("@/actions/user-progress", () => ({
  upsertUserProgress: mockUpsertUserProgress,
}));

vi.mock("sonner", () => ({
  toast: {
    error: mockToastError,
  },
}));

const { CoursesCatalog } = await import("@/app/(main)/courses/courses-catalog");

const sampleCourses = [
  {
    id: 1,
    title: "AWS Foundations",
    description: "Learn the basics of AWS services.",
    category: "AWS",
    level: "Beginner",
    duration: "4h 30m",
    imageSrc: "/aws.png",
  },
  {
    id: 2,
    title: "DevOps Toolkit",
    description: "CI/CD pipelines and automation.",
    category: "DevOps",
    level: "Intermediate",
    duration: "6h 00m",
    imageSrc: "/devops.png",
  },
  {
    id: 3,
    title: "Architecture Patterns",
    description: "Design scalable cloud systems.",
    category: "Architecture",
    level: "Advanced",
    duration: "8h 15m",
    imageSrc: "/architecture.png",
  },
];

describe("CoursesCatalog", () => {
  beforeEach(() => {
    mockRouterPush.mockReset();
    mockUpsertUserProgress.mockReset();
    mockToastError.mockReset();
    mockUpsertUserProgress.mockResolvedValue(undefined);
  });

  const renderCatalog = (override: Partial<ComponentProps<typeof CoursesCatalog>> = {}) => {
    return render(
      <CoursesCatalog
        courses={sampleCourses}
        activeCourseId={undefined}
        isAuthenticated={true}
        {...override}
      />,
    );
  };

  it("filters courses by search query across titles and descriptions", async () => {
    renderCatalog();

    const searchInput = screen.getByLabelText("Search courses");
    await userEvent.type(searchInput, "automation");

    expect(await screen.findByText("DevOps Toolkit")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("AWS Foundations")).not.toBeInTheDocument();
      expect(screen.queryByText("Architecture Patterns")).not.toBeInTheDocument();
    });
  });

  it("switches between list and grid view layouts", async () => {
    renderCatalog();

    const awsHeading = await screen.findByRole("heading", { name: "AWS" });
    const categoryWrapper = awsHeading.parentElement?.parentElement as HTMLElement;
    const cardsContainer = categoryWrapper.children[1] as HTMLElement;

    // default view is list
    expect(cardsContainer.className).toContain("space-y-3");

    await userEvent.click(screen.getByLabelText("Grid view"));

    await waitFor(() => {
      expect(cardsContainer.className).toContain("grid-cols-1");
    });

    await userEvent.click(screen.getByLabelText("List view"));

    await waitFor(() => {
      expect(cardsContainer.className).toContain("space-y-3");
    });
  });

  it("navigates to sign-in when the user is unauthenticated", async () => {
    renderCatalog({ isAuthenticated: false });

    await userEvent.click(screen.getByRole("button", { name: /Start AWS Foundations course/i }));

    expect(mockRouterPush).toHaveBeenCalledWith("/sign-in");
    expect(mockUpsertUserProgress).not.toHaveBeenCalled();
  });

  it("navigates to the learn page when selecting the active course", async () => {
    renderCatalog({ activeCourseId: 2 });

    await userEvent.click(screen.getByRole("button", { name: /Continue DevOps Toolkit course/i }));

    expect(mockRouterPush).toHaveBeenCalledWith("/learn");
    expect(mockUpsertUserProgress).not.toHaveBeenCalled();
  });

  it("starts progress mutation for a new course selection", async () => {
    renderCatalog({ activeCourseId: 1 });

    await userEvent.click(screen.getByRole("button", { name: /Start DevOps Toolkit course/i }));

    expect(mockUpsertUserProgress).toHaveBeenCalledWith(2);
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it("narrows results to the selected category", async () => {
    renderCatalog();

    await userEvent.click(screen.getByRole("button", { name: "Architecture" }));

    expect(await screen.findByRole("heading", { name: "Architecture" })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("AWS Foundations")).not.toBeInTheDocument();
      expect(screen.queryByText("DevOps Toolkit")).not.toBeInTheDocument();
    });
  });

  it("shows an empty state when filters remove all courses", async () => {
    renderCatalog();

    await userEvent.type(screen.getByLabelText("Search courses"), "nonexistent");

    expect(await screen.findByText("No courses found")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your search or filters")).toBeInTheDocument();
  });
});
