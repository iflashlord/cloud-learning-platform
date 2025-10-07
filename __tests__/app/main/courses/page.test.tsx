import React from "react";
import { render, screen } from "@testing-library/react";

const {
  mockGetCourses,
  mockGetUserProgress,
  mockList,
} = vi.hoisted(() => ({
  mockGetCourses: vi.fn(),
  mockGetUserProgress: vi.fn(),
  mockList: vi.fn(),
}));

vi.mock("@/db/queries", () => ({
  getCourses: mockGetCourses,
  getUserProgress: mockGetUserProgress,
}));

vi.mock("@/app/(main)/courses/list", () => ({
  List: (props: any) => {
    mockList(props);
    return <div data-testid="courses-list-mock" />;
  },
}));

describe("CoursesPage server component", () => {
  beforeEach(() => {
    mockGetCourses.mockReset();
    mockGetUserProgress.mockReset();
    mockList.mockClear();
  });

  it("fetches courses and passes them to the list with the active course id", async () => {
    const courses = [
      { id: 1, title: "Cloud Practitioner", imageSrc: "/cloud.png" },
      { id: 2, title: "Solutions Architect", imageSrc: "/architect.png" },
    ];

    mockGetCourses.mockResolvedValueOnce(courses);
    mockGetUserProgress.mockResolvedValueOnce({ activeCourseId: 2 });

    const { default: CoursesPage } = await import("@/app/(main)/courses/page");
    const element = await CoursesPage();

    render(element);

    expect(screen.getByRole("heading", { name: "AWS Certification Paths" })).toBeInTheDocument();
    expect(mockList).toHaveBeenCalledWith({
      courses,
      activeCourseId: 2,
    });
  });
});
