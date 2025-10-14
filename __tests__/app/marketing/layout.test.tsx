import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("@/app/(marketing)/header", () => ({
  Header: () => <header data-testid="marketing-header">Header</header>,
}));

vi.mock("@/app/(marketing)/footer", () => ({
  Footer: () => <footer data-testid="marketing-footer">Footer</footer>,
}));

describe("Marketing Layout", () => {
  let MarketingLayout: any;

  beforeEach(async () => {
    vi.resetModules();
    const layoutModule = await import("@/app/(marketing)/layout");
    MarketingLayout = layoutModule.default;
  });

  it("renders header, main content, and footer", () => {
    const TestContent = () => <div data-testid="test-content">Test Content</div>;
    
    render(
      <MarketingLayout>
        <TestContent />
      </MarketingLayout>
    );

    expect(screen.getByTestId("marketing-header")).toBeInTheDocument();
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByTestId("marketing-footer")).toBeInTheDocument();
  });

  it("has correct layout structure", () => {
    const { container } = render(
      <MarketingLayout>
        <div>Content</div>
      </MarketingLayout>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv).toHaveClass("min-h-screen", "flex", "flex-col");
    
    const main = container.querySelector("main");
    expect(main).toHaveClass("flex-1", "flex", "flex-col", "items-center", "justify-center");
  });

  it("renders children correctly", () => {
    const children = <div data-testid="children-content">Children Content</div>;
    
    render(
      <MarketingLayout>
        {children}
      </MarketingLayout>
    );

    expect(screen.getByTestId("children-content")).toBeInTheDocument();
  });
});
