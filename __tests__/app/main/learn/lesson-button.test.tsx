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

  it("renders lesson title and order correctly", () => {
    render(
      <LessonButton
        id={1}
        index={0}
        totalCount={5}
        current={false}
        locked={false}
        percentage={0}
        title="Introduction to AWS"
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument(); // Lesson number
    expect(screen.getByText("Introduction to AWS")).toBeInTheDocument();
  });

  it("displays completion percentage", () => {
    render(
      <LessonButton
        id={1}
        index={0}
        totalCount={5}
        current={false}
        locked={false}
        percentage={75}
        title="AWS Basics"
      />
    );

    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("shows locked state for locked lessons", () => {
    render(
      <LessonButton
        id={1}
        index={2}
        totalCount={5}
        current={false}
        locked={true}
        percentage={0}
        title="Advanced AWS"
      />
    );

    // Should have lock icon or disabled styling
    expect(screen.getByTestId("lock-icon") || document.querySelector("[data-lucide='lock']")).toBeInTheDocument();
  });

  it("highlights current lesson", () => {
    const { container } = render(
      <LessonButton
        id={1}
        index={1}
        totalCount={5}
        current={true}
        locked={false}
        percentage={50}
        title="Current Lesson"
      />
    );

    const button = container.querySelector("a");
    expect(button).toHaveClass("border-sky-300");
  });

  it("creates correct lesson link", () => {
    render(
      <LessonButton
        id={123}
        index={0}
        totalCount={5}
        current={false}
        locked={false}
        percentage={0}
        title="Test Lesson"
      />
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/lesson/123");
  });

  it("shows completion crown for 100% completed lessons", () => {
    render(
      <LessonButton
        id={1}
        index={0}
        totalCount={5}
        current={false}
        locked={false}
        percentage={100}
        title="Completed Lesson"
      />
    );

    expect(screen.getByTestId("crown-icon") || document.querySelector("[data-lucide='crown']")).toBeInTheDocument();
  });

  it("disables click for locked lessons", () => {
    const { container } = render(
      <LessonButton
        id={1}
        index={0}
        totalCount={5}
        current={false}
        locked={true}
        percentage={0}
        title="Locked Lesson"
      />
    );

    const link = container.querySelector("a");
    expect(link).toHaveClass("pointer-events-none", "opacity-50");
  });
});