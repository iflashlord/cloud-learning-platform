import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

const { mockUseMobileSidebar } = vi.hoisted(() => ({
  mockUseMobileSidebar: vi.fn().mockReturnValue({
    isOpen: false,
    open: vi.fn(),
    close: vi.fn(),
  }),
}));

vi.mock("@/store/use-mobile-sidebar", () => ({
  useMobileSidebar: mockUseMobileSidebar,
}));

vi.mock("@/components/sidebar", () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar Content</div>,
}));

describe("Mobile Header", () => {
  let MobileHeader: any;

  beforeEach(async () => {
    vi.resetModules();
    mockUseMobileSidebar.mockReturnValue({
      isOpen: false,
      open: vi.fn(),
      close: vi.fn(),
    });
    
    const headerModule = await import("@/components/mobile-header");
    MobileHeader = headerModule.MobileHeader;
  });

  it("renders the menu button", () => {
    render(<MobileHeader />);

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();
  });

  it("opens sidebar when menu button is clicked", () => {
    const mockOpen = vi.fn();
    mockUseMobileSidebar.mockReturnValue({
      isOpen: false,
      open: mockOpen,
      close: vi.fn(),
    });

    render(<MobileHeader />);

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    expect(mockOpen).toHaveBeenCalledTimes(1);
  });

  it("shows sidebar when isOpen is true", () => {
    mockUseMobileSidebar.mockReturnValue({
      isOpen: true,
      open: vi.fn(),
      close: vi.fn(),
    });

    render(<MobileHeader />);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("hides sidebar when isOpen is false", () => {
    mockUseMobileSidebar.mockReturnValue({
      isOpen: false,
      open: vi.fn(),
      close: vi.fn(),
    });

    render(<MobileHeader />);

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
  });

  it("closes sidebar when overlay is clicked", () => {
    const mockClose = vi.fn();
    mockUseMobileSidebar.mockReturnValue({
      isOpen: true,
      open: vi.fn(),
      close: mockClose,
    });

    render(<MobileHeader />);

    const overlay = screen.getByTestId("mobile-sidebar-overlay");
    fireEvent.click(overlay);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});