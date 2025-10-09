import React from "react";
import { render, screen } from "@testing-library/react";

describe("Unit Banner", () => {
  let UnitBanner: any;

  beforeEach(async () => {
    vi.resetModules();
    
    const bannerModule = await import("@/app/(main)/learn/unit-banner");
    UnitBanner = bannerModule.UnitBanner;
  });

  it("renders unit title and description", () => {
    render(
      <UnitBanner
        title="AWS Fundamentals"
        description="Learn the basics of Amazon Web Services"
        isCompleted={false}
      />
    );

    expect(screen.getByText("AWS Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("Learn the basics of Amazon Web Services")).toBeInTheDocument();
  });

  it("displays completion status for completed units", () => {
    render(
      <UnitBanner
        title="AWS Fundamentals"
        description="Learn the basics of Amazon Web Services"
        isCompleted={true}
        lessonCount={5}
        completedLessons={5}
      />
    );

    expect(screen.getByText(/100%/i) || screen.getByText(/Complete/i)).toBeInTheDocument();
  });

  it("shows continue button for incomplete units", () => {
    render(
      <UnitBanner
        title="AWS Fundamentals"
        description="Learn the basics of Amazon Web Services"
        isCompleted={false}
        lessonCount={5}
        completedLessons={2}
      />
    );

    expect(screen.getByText(/Continue/)).toBeInTheDocument();
  });

  it("shows completion message for completed units", () => {
    render(
      <UnitBanner
        title="Test Unit"
        description="Test Description"
        isCompleted={true}
        lessonCount={5}
        completedLessons={5}
      />
    );

    expect(screen.getByText("Unit Completed!")).toBeInTheDocument();
  });

  it("displays progress information correctly", () => {
    render(
      <UnitBanner
        title="AWS Security"
        description="Learn AWS security best practices"
        isCompleted={false}
        lessonCount={8}
        completedLessons={3}
      />
    );

    expect(screen.getByText("38%")).toBeInTheDocument();
    expect(screen.getByText("3/8")).toBeInTheDocument();
    expect(screen.getByText("Progress")).toBeInTheDocument();
    expect(screen.getByText("Lessons")).toBeInTheDocument();
  });

  it("has proper styling for completed vs incomplete states", () => {
    const { container, rerender } = render(
      <UnitBanner
        title="Test Unit"
        description="Test Description"
        isCompleted={false}
      />
    );

    let banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("from-blue-500");

    rerender(
      <UnitBanner
        title="Test Unit"
        description="Test Description"
        isCompleted={true}
      />
    );

    banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("from-green-500");
  });
});