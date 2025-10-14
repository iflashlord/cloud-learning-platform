import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("Promo", () => {
  let Promo: React.ComponentType;

  beforeEach(async () => {
    vi.resetModules();
    const promoModule = await import("@/components/promo");
    Promo = promoModule.Promo;
  });

  it("highlights the Pro upgrade", () => {
    render(<Promo />);

    expect(
      screen.getByRole("heading", { name: /Upgrade to .* Pro/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Get unlimited hearts and unlock all AWS certification paths!/i)
    ).toBeInTheDocument();
  });

  it("provides a call-to-action link", () => {
    render(<Promo />);

    const upgradeLink = screen.getByRole("link", { name: /Upgrade today/i });
    expect(upgradeLink).toHaveAttribute("href", "/shop");
  });

  it("applies card styling for visual emphasis", () => {
    const { container } = render(<Promo />);
    const promoContainer = container.firstChild as HTMLElement;

    expect(promoContainer.className).toContain("p-4");
    expect(promoContainer.className).toContain("space-y-4");
  });
});
