import React, { type ComponentProps } from "react";
import * as ReactModule from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const {
  mockRouterPush,
  mockUpsertUserProgress,
  mockStartTransition,
  mockToastError,
  mockCard,
} = vi.hoisted(() => ({
  mockRouterPush: vi.fn(),
  mockUpsertUserProgress: vi.fn(),
  mockStartTransition: vi.fn(),
  mockToastError: vi.fn(),
  mockCard: vi.fn(),
}));

let isPending = false;

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

vi.mock("@/app/(main)/courses/card", () => ({
  Card: (props: any) => {
    mockCard(props);
    return (
      <button
        type="button"
        role="button"
        data-testid={`course-card-${props.id}`}
        onClick={() => props.onClick(props.id)}
        disabled={props.disabled}
      >
        <span>{props.title}</span>
        <span data-testid={`view-mode-${props.id}`}>{props.viewMode}</span>
      </button>
    );
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
  let useTransitionSpy: ReturnType<typeof vi.spyOn> | undefined;

  beforeEach(() => {
    isPending = false;
    mockRouterPush.mockReset();
    mockUpsertUserProgress.mockReset();
    mockStartTransition.mockReset();
    mockToastError.mockReset();
    mockCard.mockClear();
    mockUpsertUserProgress.mockResolvedValue(undefined);
    useTransitionSpy = vi.spyOn(ReactModule, "useTransition").mockImplementation(() => [
      isPending,
      (callback: () => void) => {
        mockStartTransition(callback);
        callback();
      },
    ]);
  });

  afterEach(() => {
    useTransitionSpy?.mockRestore();
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

    expect(screen.getByText("DevOps Toolkit")).toBeInTheDocument();
    expect(screen.queryByText("AWS Foundations")).not.toBeInTheDocument();
    expect(screen.queryByText("Architecture Patterns")).not.toBeInTheDocument();
  });

  it("switches view modes and forwards the mode to rendered cards", async () => {
    renderCatalog();

    await userEvent.click(screen.getByLabelText("List view"));

    expect(mockCard).toHaveBeenCalled();
    const lastCall = mockCard.mock.calls.at(-1)?.[0];
    expect(lastCall?.viewMode).toBe("list");

    await userEvent.click(screen.getByLabelText("Grid view"));
    const latestCall = mockCard.mock.calls.at(-1)?.[0];
    expect(latestCall?.viewMode).toBe("grid");
  });

  it("navigates to sign-in when the user is unauthenticated", async () => {
    renderCatalog({ isAuthenticated: false });

    await userEvent.click(screen.getByTestId("course-card-1"));

    expect(mockRouterPush).toHaveBeenCalledWith("/sign-in");
    expect(mockUpsertUserProgress).not.toHaveBeenCalled();
  });

  it("navigates to the learn page when selecting the active course", async () => {
    renderCatalog({ activeCourseId: 2 });

    await userEvent.click(screen.getByTestId("course-card-2"));

    expect(mockRouterPush).toHaveBeenCalledWith("/learn");
    expect(mockUpsertUserProgress).not.toHaveBeenCalled();
  });

  it("starts progress mutation for a new course and handles transitions", async () => {
    renderCatalog({ activeCourseId: 1 });

    await userEvent.click(screen.getByTestId("course-card-2"));

    expect(mockStartTransition).toHaveBeenCalled();
    expect(mockUpsertUserProgress).toHaveBeenCalledWith(2);
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it("prevents duplicate actions while a transition is pending", async () => {
    isPending = true;
    renderCatalog();

    await userEvent.click(screen.getByTestId("course-card-1"));

    expect(mockStartTransition).not.toHaveBeenCalled();
    expect(mockUpsertUserProgress).not.toHaveBeenCalled();
  });

  it("narrows results to the selected category", async () => {
    renderCatalog();

    await userEvent.click(screen.getByRole("button", { name: /Filter by Architecture category/i }));

    expect(screen.getByRole("heading", { name: "Architecture" })).toBeInTheDocument();
    expect(screen.getByText("Architecture Patterns")).toBeInTheDocument();
    expect(screen.queryByText("AWS Foundations")).not.toBeInTheDocument();
    expect(screen.queryByText("DevOps Toolkit")).not.toBeInTheDocument();
  });

  it("shows an empty state when filters remove all courses", async () => {
    renderCatalog();

    await userEvent.type(screen.getByLabelText("Search courses"), "nonexistent");

    expect(screen.getByText("No courses found")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your search or filters")).toBeInTheDocument();
  });
});
