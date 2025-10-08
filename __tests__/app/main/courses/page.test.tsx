import React from "react";
import { render, screen } from "@testing-library/react";

const {
  mockGetCourses,
  mockGetUserProgress,
  mockCatalog,
  mockAuth,
} = vi.hoisted(() => ({
  mockGetCourses: vi.fn(),
  mockGetUserProgress: vi.fn(),
  mockCatalog: vi.fn(),
  mockAuth: vi.fn(),
}));

vi.mock("@/db/queries", () => ({
  getCourses: mockGetCourses,
  getUserProgress: mockGetUserProgress,
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

vi.mock("@/app/(main)/courses/courses-catalog", () => ({
  CoursesCatalog: (props: any) => {
    mockCatalog(props);
    return <div data-testid="courses-catalog-mock" />;
  },
}));

describe("CoursesPage server component", () => {
  beforeEach(() => {
    mockGetCourses.mockReset();
    mockGetUserProgress.mockReset();
    mockCatalog.mockClear();
    mockAuth.mockReset();
  });

  it("fetches courses and passes them to the catalog with the active course id when authenticated", async () => {
    const courses = [
      { id: 1, title: "Cloud Practitioner", imageSrc: "/cloud.png" },
      { id: 2, title: "Solutions Architect", imageSrc: "/architect.png" },
    ];

    mockGetCourses.mockResolvedValueOnce(courses);
    mockGetUserProgress.mockResolvedValueOnce({ activeCourseId: 2 });
    mockAuth.mockResolvedValueOnce({ userId: "user_1" });

    const { default: CoursesPage } = await import("@/app/(main)/courses/page");
    const element = await CoursesPage();

    render(element);

    expect(screen.getByRole("heading", { name: "Course Catalog" })).toBeInTheDocument();
    expect(mockCatalog).toHaveBeenCalledWith({
      courses,
      activeCourseId: 2,
      isAuthenticated: true,
    });
  });

  it("passes unauthenticated state when no user session exists", async () => {
    mockGetCourses.mockResolvedValueOnce([]);
    mockGetUserProgress.mockResolvedValueOnce(null);
    mockAuth.mockResolvedValueOnce({ userId: null });

    const { default: CoursesPage } = await import("@/app/(main)/courses/page");
    const element = await CoursesPage();

    render(element);

    expect(mockCatalog).toHaveBeenCalledWith({
      courses: [],
      activeCourseId: undefined,
      isAuthenticated: false,
    });
  });
});
