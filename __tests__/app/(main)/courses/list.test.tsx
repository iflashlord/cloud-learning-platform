import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { List } from "@/app/(main)/courses/list";

const {
  mockRouterPush,
  mockUpsertUserProgress,
  mockStartTransition,
} = vi.hoisted(() => ({
  mockRouterPush: vi.fn(),
  mockUpsertUserProgress: vi.fn(),
  mockStartTransition: vi.fn(),
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

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useTransition: () => [
      isPending,
      (callback: () => void) => {
        mockStartTransition(callback);
        callback();
      },
    ],
  };
});

describe("Courses List", () => {
  beforeEach(() => {
    isPending = false;
    mockRouterPush.mockReset();
    mockUpsertUserProgress.mockReset();
    mockStartTransition.mockReset();
    mockUpsertUserProgress.mockResolvedValue(undefined);
  });

  const courses = [
    { id: 1, title: "Course A", imageSrc: "/a.png" },
    { id: 2, title: "Course B", imageSrc: "/b.png" },
  ];

  it("navigates to the learn page when selecting the active course", async () => {
    render(<List courses={courses} activeCourseId={1} />);

    await userEvent.click(screen.getByText("Course A"));

    expect(mockRouterPush).toHaveBeenCalledWith("/learn");
    expect(mockUpsertUserProgress).not.toHaveBeenCalled();
  });

  it("starts the progress mutation when selecting a new course", async () => {
    render(<List courses={courses} activeCourseId={2} />);

    await userEvent.click(screen.getByText("Course A"));

    expect(mockStartTransition).toHaveBeenCalled();
    expect(mockUpsertUserProgress).toHaveBeenCalledWith(1);
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it("ignores clicks while a transition is pending", async () => {
    isPending = true;
    render(<List courses={courses} />);

    await userEvent.click(screen.getByText("Course A"));

    expect(mockStartTransition).not.toHaveBeenCalled();
    expect(mockUpsertUserProgress).not.toHaveBeenCalled();
  });
});
