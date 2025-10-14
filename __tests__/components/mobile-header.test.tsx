import React from "react";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/components/sidebar", () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar Content</div>,
}));

describe("Mobile Header", () => {
  let MobileHeader: React.ComponentType;

  beforeEach(async () => {
    vi.resetModules();
    const headerModule = await import("@/components/mobile-header");
    MobileHeader = headerModule.MobileHeader;
  });

  it("renders the menu button", () => {
    render(<MobileHeader />);

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();
  });

  it("reveals the sidebar when the menu button is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileHeader />);

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    expect(await screen.findByTestId("sidebar")).toBeInTheDocument();
  });

  it("closes the sidebar when the close button is pressed", async () => {
    const user = userEvent.setup();
    render(<MobileHeader />);

    await user.click(screen.getByRole("button"));

    const closeButton = await screen.findByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
  });
});
