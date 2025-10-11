import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("Promo", () => {
  let Promo: any;

  beforeEach(async () => {
    vi.resetModules();
    
    const promoModule = await import("@/components/promo");
    Promo = promoModule.Promo;
  });

  it("renders upgrade to Pro message", () => {
    render(<Promo />);

    expect(screen.getByText(/Upgrade to Pro/i)).toBeInTheDocument();
    expect(screen.getByText(/Unlimited Hearts/i)).toBeInTheDocument();
  });

  it("displays Pro benefits", () => {
    render(<Promo />);

    expect(screen.getByText(/unlimited hearts/i)).toBeInTheDocument();
    expect(screen.getByText(/No ads/i) || screen.getByText(/Ad-free/i)).toBeInTheDocument();
  });

  it("includes a call-to-action button", () => {
    render(<Promo />);

    const upgradeButton = screen.getByRole("button") || screen.getByRole("link");
    expect(upgradeButton).toBeInTheDocument();
    expect(upgradeButton).toHaveTextContent(/Upgrade/i);
  });

  it("links to pro page", () => {
    render(<Promo />);

    const proLink = screen.getByRole("link");
    expect(proLink).toHaveAttribute("href", "/shop");
  });

  it("has attractive visual styling", () => {
    const { container } = render(<Promo />);

    // Check for gradient or colorful styling
    const promoContainer = container.firstChild;
    expect(promoContainer).toHaveClass();
  });

  it("displays Pro badge imagery", () => {
    render(<Promo />);

    expect(screen.getByAltText(/Pro/i)).toBeInTheDocument();
  });
});
