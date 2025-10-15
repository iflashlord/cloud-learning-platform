import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("Lesson Button", () => {
  let LessonButton: any;

  beforeEach(async () => {
    vi.resetModules();
    
    const buttonModule = await import("@/app/(main)/learn/lesson-button");
    LessonButton = buttonModule.LessonButton;
  });

  it("renders progress card for the current lesson", () => {
    render(
      <LessonButton
        id={1}
        index={0}
        totalCount={5}
        current
        locked={false}
        percentage={0}
      />
    );

    expect(screen.getByText(/Start/i)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/lesson");
  });

  it("shows continue state with percentage when progress exists", () => {
    render(
      <LessonButton
        id={1}
        index={0}
        totalCount={5}
        current
        locked={false}
        percentage={42}
      />
    );

    expect(screen.getByText(/Continue/i)).toBeInTheDocument();
    expect(screen.getByText("42%"));
  });

  it("disables navigation for locked lessons", () => {
    render(
      <LessonButton
        id={1}
        index={2}
        totalCount={5}
        current={false}
        locked
        percentage={0}
      />
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveStyle("pointer-events: none");
  });

  it("links to the lesson when completed", () => {
    render(
      <LessonButton
        id={123}
        index={0}
        totalCount={5}
        current={false}
        locked={false}
        percentage={0}
      />
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/lesson/123");
  });

  it("renders crown icon for the final milestone", () => {
    render(
      <LessonButton
        id={5}
        index={5}
        totalCount={5}
        current
        locked={false}
        percentage={0}
      />
    );

    expect(document.querySelector(".lucide-crown")).not.toBeNull();
  });

  it("shows check icon for completed lessons", () => {
    render(
      <LessonButton
        id={1}
        index={1}
        totalCount={5}
        current={false}
        locked={false}
        percentage={0}
      />
    );

    expect(document.querySelector(".lucide-check")).not.toBeNull();
  });
});
