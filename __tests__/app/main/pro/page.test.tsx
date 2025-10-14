import React from "react";
import { render, screen } from "@testing-library/react";

describe("Pro Page", () => {
  let ProPageComponent: React.ComponentType;

  beforeEach(async () => {
    vi.resetModules();
    const pageModule = await import("@/app/(main)/pro/page");
    ProPageComponent = pageModule.default;
  });

  it("renders the hero section with upgrade messaging", async () => {
    render(<ProPageComponent />);

    expect(
      screen.getByRole("heading", { name: /Upgrade to Pro/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Pro Membership/i)).toBeInTheDocument();
  });

  it("displays pro features and benefits", async () => {
    render(<ProPageComponent />);

    expect(
      screen.getByRole("heading", { name: /Unlimited Hearts/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Premium Content/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Progress Insights/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Achievement Badges/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Priority Support/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Offline Learning/i })
    ).toBeInTheDocument();
  });

  it("shows pricing information", async () => {
    render(<ProPageComponent />);

    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText(/per month/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Free Trial/i)).toBeInTheDocument();
  });

  it("includes testimonials section", async () => {
    render(<ProPageComponent />);

    expect(
      screen.getByText(/What Our Pro Users Say/i)
    ).toBeInTheDocument();
  });

  it("has a final call-to-action section", async () => {
    render(<ProPageComponent />);

    expect(
      screen.getByText(/Ready to Accelerate Your Learning/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Start Free Trial/i)).toBeInTheDocument();
    expect(screen.getByText(/View All Plans/i)).toBeInTheDocument();
  });

  it("displays feature comparison", async () => {
    render(<ProPageComponent />);

    expect(
      screen.getByText(/Feature Comparison/i)
    ).toBeInTheDocument();

    const freeLabels = screen.getAllByText("Free");
    const proLabels = screen.getAllByText("Pro");

    expect(freeLabels.length).toBeGreaterThan(0);
    expect(proLabels.length).toBeGreaterThan(0);
  });

  it("displays testimonials section", async () => {
    render(<ProPageComponent />);

    expect(
      screen.getByText(/What Our Pro Users Say/i)
    ).toBeInTheDocument();
  });

  it("does not redirect when user is not pro", async () => {
    render(<ProPageComponent />);

    const { redirect } = await import("next/navigation");
    expect(redirect).not.toHaveBeenCalled();
  });
});
