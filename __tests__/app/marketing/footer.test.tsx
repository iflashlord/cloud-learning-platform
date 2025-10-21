import React from "react";
import { render, screen } from "@testing-library/react";

describe("Marketing Footer", () => {
  let Footer: React.ComponentType;

  beforeEach(async () => {
    vi.resetModules();
    const footerModule = await import("@/app/(marketing)/footer");
    Footer = footerModule.Footer;
  });

  it("renders the footer link sections", () => {
    render(<Footer />);

    expect(screen.getByRole("heading", { name: /^Learning$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Platform$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Support$/i })).toBeInTheDocument();
  });

  it("exposes primary navigation links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: /Courses/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Leaderboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Pro Membership/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Help Center/i })).toBeInTheDocument();
  });

  it("applies the marketing footer layout styles", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");

    expect(footer).toHaveClass("w-full", "border-t");
    expect(footer?.className).toContain("backdrop-blur-md");
  });
});
