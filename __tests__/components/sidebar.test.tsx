import React from "react";
import { render, screen } from "@testing-library/react";

const { mockUsePathname } = vi.hoisted(() => ({
  mockUsePathname: vi.fn().mockReturnValue("/learn"),
}));

vi.mock("next/navigation", () => ({
  usePathname: mockUsePathname,
}));

vi.mock("@clerk/nextjs", () => ({
  ClerkLoaded: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  ClerkLoading: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  UserButton: () => <div data-testid="user-button" />,
}));

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

describe("Sidebar", () => {
  let Sidebar: React.ComponentType;

  beforeEach(async () => {
    vi.resetModules();
    mockUsePathname.mockReturnValue("/learn");
    const module = await import("@/components/sidebar");
    Sidebar = module.Sidebar;
  });

  it("renders primary navigation links", () => {
    render(<Sidebar />);

    expect(screen.getByRole("link", { name: /Learn/i })).toHaveAttribute("href", "/learn");
    expect(screen.getByRole("link", { name: /Leaderboard/i })).toHaveAttribute(
      "href",
      "/leaderboard"
    );
    expect(screen.getByRole("link", { name: /Quests/i })).toHaveAttribute("href", "/quests");
    expect(screen.getByRole("link", { name: /Shop/i })).toHaveAttribute("href", "/shop");
    expect(screen.getByRole("link", { name: /Courses/i })).toHaveAttribute("href", "/courses");
  });

  it("includes branding, upgrade link, theme switcher, and user button", () => {
    render(<Sidebar />);

    expect(screen.getByText(/CloudLingo/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Upgrade/i })).toHaveAttribute("href", "/pro");
    expect(screen.getByTitle(/Current:/i)).toBeInTheDocument();
    expect(screen.getByTestId("user-button")).toBeInTheDocument();
  });
});
