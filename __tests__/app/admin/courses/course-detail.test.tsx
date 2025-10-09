import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

const {
  mockGetAdminCourseById,
  mockRedirect,
} = vi.hoisted(() => ({
  mockGetAdminCourseById: vi.fn(),
  mockRedirect: vi.fn(),
}));

vi.mock("@/db/queries", () => ({
  getAdminCourseById: mockGetAdminCourseById,
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("Admin Course Detail Page", () => {
  let AdminCoursePage: any;

  beforeEach(async () => {
    vi.resetModules();
    mockGetAdminCourseById.mockClear();
    mockRedirect.mockClear();
    
    const pageModule = await import("@/app/admin/courses/[courseId]/page");
    AdminCoursePage = pageModule.default;
  });

  it("renders course information when course exists", async () => {
    const mockCourse = {
      id: 1,
      title: "AWS Fundamentals",
      imageSrc: "/course.png",
      units: [
        {
          id: 1,
          title: "Unit 1",
          description: "Introduction",
          order: 1,
          lessons: [
            { id: 1, title: "Lesson 1", order: 1 },
            { id: 2, title: "Lesson 2", order: 2 },
          ],
        },
      ],
    };

    mockGetAdminCourseById.mockResolvedValue(mockCourse);

    render(await AdminCoursePage({ params: { courseId: "1" } }));

    await waitFor(() => {
      expect(screen.getByText("AWS Fundamentals")).toBeInTheDocument();
    });

    expect(screen.getByAltText("AWS Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("Unit 1")).toBeInTheDocument();
    expect(screen.getByText("Lesson 1")).toBeInTheDocument();
    expect(screen.getByText("Lesson 2")).toBeInTheDocument();
  });

  it("redirects when course is not found", async () => {
    mockGetAdminCourseById.mockResolvedValue(null);

    await AdminCoursePage({ params: { courseId: "999" } });

    expect(mockRedirect).toHaveBeenCalledWith("/admin/courses");
  });

  it("displays course statistics", async () => {
    const mockCourse = {
      id: 1,
      title: "AWS Fundamentals",
      imageSrc: "/course.png",
      units: [
        {
          id: 1,
          title: "Unit 1",
          lessons: [
            { id: 1, title: "Lesson 1" },
            { id: 2, title: "Lesson 2" },
          ],
        },
      ],
    };

    mockGetAdminCourseById.mockResolvedValue(mockCourse);

    render(await AdminCoursePage({ params: { courseId: "1" } }));

    await waitFor(() => {
      expect(screen.getByText("1 units")).toBeInTheDocument();
    });
  });

  it("shows edit course button", async () => {
    const mockCourse = {
      id: 1,
      title: "AWS Fundamentals",
      imageSrc: "/course.png",
      units: [],
    };

    mockGetAdminCourseById.mockResolvedValue(mockCourse);

    render(await AdminCoursePage({ params: { courseId: "1" } }));

    await waitFor(() => {
      expect(screen.getByText(/Edit Course/i) || screen.getByText(/Manage/i)).toBeInTheDocument();
    });
  });

  it("displays back navigation", async () => {
    const mockCourse = {
      id: 1,
      title: "AWS Fundamentals",
      imageSrc: "/course.png",
      units: [],
    };

    mockGetAdminCourseById.mockResolvedValue(mockCourse);

    render(await AdminCoursePage({ params: { courseId: "1" } }));

    await waitFor(() => {
      const backLink = screen.getByRole("link");
      expect(backLink).toHaveAttribute("href", "/admin/courses");
    });
  });
});