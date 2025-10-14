import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

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
  let AdminCoursePage: React.ComponentType<{ params: { courseId: string } }>;
  let fetchSpy: ReturnType<typeof vi.spyOn>;
  const mockRouter = (globalThis as any).__mockRouter;

  beforeEach(async () => {
    vi.resetModules();
    Object.values(mockRouter).forEach((fn: any) => fn.mockReset?.());
    fetchSpy = vi.spyOn(global, "fetch");

    const pageModule = await import("@/app/admin/courses/[courseId]/page");
    AdminCoursePage = pageModule.default;
  });

  afterEach(() => {
    fetchSpy.mockRestore();
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
            { id: 1, title: "Lesson 1", order: 1, challenges: [] },
            { id: 2, title: "Lesson 2", order: 2, challenges: [] },
          ],
        },
      ],
    };

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourse,
    } as Response);

    render(<AdminCoursePage params={{ courseId: "1" }} />);

    expect(await screen.findByText("AWS Fundamentals")).toBeInTheDocument();

    expect(screen.getByAltText("AWS Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("Unit 1")).toBeInTheDocument();
    expect(screen.getByText("Lesson 1")).toBeInTheDocument();
    expect(screen.getByText("Lesson 2")).toBeInTheDocument();
  });

  it("shows empty state when course is not found and navigates back", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      json: async () => null,
    } as Response);

    render(<AdminCoursePage params={{ courseId: "999" }} />);

    expect(
      await screen.findByText("Course not found")
    ).toBeInTheDocument();

    const backButton = screen.getByRole("button", { name: /Back to Courses/i });
    fireEvent.click(backButton);

    expect(mockRouter.push).toHaveBeenCalledWith("/admin/courses");
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
            { id: 1, title: "Lesson 1", challenges: [] },
            { id: 2, title: "Lesson 2", challenges: [] },
          ],
        },
      ],
    };

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourse,
    } as Response);

    render(<AdminCoursePage params={{ courseId: "1" }} />);

    await waitFor(() => {
      expect(screen.getByText(/Units/i)).toBeInTheDocument();
    });

    expect(screen.getByText("Units")).toBeInTheDocument();
    expect(screen.getByText("Lessons")).toBeInTheDocument();
    expect(screen.getByText("Questions")).toBeInTheDocument();
  });

  it("shows edit course button", async () => {
    const mockCourse = {
      id: 1,
      title: "AWS Fundamentals",
      imageSrc: "/course.png",
      units: [],
    };

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourse,
    } as Response);

    render(<AdminCoursePage params={{ courseId: "1" }} />);

    await waitFor(() => {
      expect(screen.getByText(/Edit Course/i)).toBeInTheDocument();
    });
  });

  it("displays back navigation", async () => {
    const mockCourse = {
      id: 1,
      title: "AWS Fundamentals",
      imageSrc: "/course.png",
      units: [],
    };

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourse,
    } as Response);

    render(<AdminCoursePage params={{ courseId: "1" }} />);

    await waitFor(() => {
      const backButton = screen.getByRole("button", { name: /Back to Courses/i });
      fireEvent.click(backButton);
      expect(mockRouter.push).toHaveBeenCalledWith("/admin/courses");
    });
  });
});
