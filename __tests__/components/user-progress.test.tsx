import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

describe("User Progress", () => {
  let UserProgress: any;

  beforeEach(async () => {
    vi.resetModules();
    
    const progressModule = await import("@/components/user-progress");
    UserProgress = progressModule.UserProgress;
  });

  it("displays user points correctly", () => {
    render(
      <UserProgress
        activeCourse={{ title: "AWS Fundamentals", imageSrc: "/course.png" }}
        hearts={5}
        points={150}
        hasActiveSubscription={false}
      />
    );

    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("shows hearts count for non-subscribers", () => {
    render(
      <UserProgress
        activeCourse={{ title: "AWS Fundamentals", imageSrc: "/course.png" }}
        hearts={3}
        points={100}
        hasActiveSubscription={false}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays infinity symbol for subscribers", () => {
    const { container } = render(
      <UserProgress
        activeCourse={{ title: "AWS Fundamentals", imageSrc: "/course.png" }}
        hearts={5}
        points={100}
        hasActiveSubscription={true}
      />
    );

    const infinityIcon = container.querySelector(".lucide-infinity");
    expect(infinityIcon).not.toBeNull();
  });

  it("renders active course information", () => {
    render(
      <UserProgress
        activeCourse={{ title: "AWS Advanced", imageSrc: "/course2.png" }}
        hearts={5}
        points={100}
        hasActiveSubscription={false}
      />
    );

    expect(screen.getByAltText("AWS Advanced")).toBeInTheDocument();
    expect(screen.getByText("AWS Advanced")).toBeInTheDocument();
  });

  it("links to courses page when course is clicked", () => {
    render(
      <UserProgress
        activeCourse={{ title: "AWS Fundamentals", imageSrc: "/course.png" }}
        hearts={5}
        points={100}
        hasActiveSubscription={false}
      />
    );

    const courseLink = screen.getByText("Switch Course").closest("a");
    expect(courseLink).toHaveAttribute("href", "/courses");
  });

  it("shows shop link for points", () => {
    render(
      <UserProgress
        activeCourse={{ title: "AWS Fundamentals", imageSrc: "/course.png" }}
        hearts={5}
        points={100}
        hasActiveSubscription={false}
      />
    );

    const pointsSection = screen.getByText("100").closest("a");
    expect(pointsSection).toHaveAttribute("href", "/shop");
  });

  it("shows shop link for hearts when not subscribed", () => {
    render(
      <UserProgress
        activeCourse={{ title: "AWS Fundamentals", imageSrc: "/course.png" }}
        hearts={3}
        points={100}
        hasActiveSubscription={false}
      />
    );

    const heartsSection = screen.getByText("3").closest("a");
    expect(heartsSection).toHaveAttribute("href", "/shop");
  });
});
