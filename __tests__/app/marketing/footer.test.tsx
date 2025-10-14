import React from "react";
import { render, screen } from "@testing-library/react";

describe("Marketing Footer", () => {
  let Footer: React.ComponentType;

  beforeEach(async () => {
    vi.resetModules();
    const footerModule = await import("@/app/(marketing)/footer");
    Footer = footerModule.Footer;
  });

  it("highlights featured learning tracks", () => {
    render(<Footer />);

    expect(screen.getByText(/Cloud Fundamentals/i)).toBeInTheDocument();
    expect(screen.getByText(/System Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/Development/i)).toBeInTheDocument();
    expect(screen.getByText(/DevOps & Ops/i)).toBeInTheDocument();
  });

  it("renders four call-to-action buttons", () => {
    render(<Footer />);

    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  it("applies the marketing footer layout styles", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");

    expect(footer).toHaveClass("border-t-2", "p-2");
  });
});
