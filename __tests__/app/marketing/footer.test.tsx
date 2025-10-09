import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

describe("Marketing Footer", () => {
  let Footer: any;

  beforeEach(async () => {
    vi.resetModules();
    
    const footerModule = await import("@/app/(marketing)/footer");
    Footer = footerModule.Footer;
  });

  it("renders AWS certification badges", () => {
    render(<Footer />);

    expect(screen.getByText(/Master AWS Certifications/i)).toBeInTheDocument();
    expect(screen.getByAltText("AWS Cloud Practitioner")).toBeInTheDocument();
    expect(screen.getByAltText("AWS Solutions Architect")).toBeInTheDocument();
    expect(screen.getByAltText("AWS Developer")).toBeInTheDocument();
    expect(screen.getByAltText("AWS SysOps Administrator")).toBeInTheDocument();
  });

  it("displays footer links and information", () => {
    render(<Footer />);

    expect(screen.getByText(/AWS Cloud Academy/i)).toBeInTheDocument();
    expect(screen.getByText(/Professional cloud certification training/i)).toBeInTheDocument();
  });

  it("shows contact and legal information", () => {
    render(<Footer />);

    // Look for common footer links
    expect(screen.getByText(/Privacy Policy/i) || screen.getByText(/Terms of Service/i)).toBeInTheDocument();
  });

  it("has proper footer structure", () => {
    const { container } = render(<Footer />);
    
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("displays certification badges in a grid layout", () => {
    const { container } = render(<Footer />);
    
    // Check for grid or flex layout containing certification images
    const images = container.querySelectorAll('img[alt*="AWS"]');
    expect(images.length).toBeGreaterThanOrEqual(4); // At least 4 AWS certification badges
  });
});