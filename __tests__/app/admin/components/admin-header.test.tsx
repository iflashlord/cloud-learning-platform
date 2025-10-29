import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { AdminHeader } from "@/app/admin/components/admin-header";

const mockSignOut = vi.fn();

vi.mock("@clerk/nextjs", () => ({
  useClerk: () => ({
    signOut: mockSignOut,
  }),
}));

describe("AdminHeader", () => {
  beforeAll(() => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renders site branding and navigation actions", () => {
    render(<AdminHeader />);

    const homeLink = screen.getByRole("link", { name: /Learning Platform/i });
    expect(homeLink).toHaveAttribute("href", "/admin");

    const viewSiteButton = screen.getByRole("button", { name: /View Site/i });
    expect(viewSiteButton.closest("a")).toHaveAttribute("href", "/");

    expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Current:/i)).toBeInTheDocument();
  });

  it("signs the user out when clicking logout", () => {
    mockSignOut.mockReset();

    render(<AdminHeader />);

    const logoutButton = screen.getByRole("button", { name: /Logout/i });
    fireEvent.click(logoutButton);

    expect(mockSignOut).toHaveBeenCalledWith({ redirectUrl: "/" });
  });
});
