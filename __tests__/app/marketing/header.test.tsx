import React from "react";
import { render, screen } from "@testing-library/react";

const {
  mockClerkLoading,
  mockClerkLoaded,
  mockSignedOut,
  mockSignedIn,
  mockUserButton,
} = vi.hoisted(() => ({
  mockClerkLoading: vi.fn(),
  mockClerkLoaded: vi.fn(),
  mockSignedOut: vi.fn(),
  mockSignedIn: vi.fn(),
  mockUserButton: vi.fn(),
}));

vi.mock("@clerk/nextjs", () => ({
  ClerkLoading: ({ children }: { children: React.ReactNode }) => {
    mockClerkLoading(children);
    return <div data-testid="clerk-loading">{children}</div>;
  },
  ClerkLoaded: ({ children }: { children: React.ReactNode }) => {
    mockClerkLoaded(children);
    return <div data-testid="clerk-loaded">{children}</div>;
  },
  SignedOut: ({ children }: { children: React.ReactNode }) => {
    mockSignedOut(children);
    return <div data-testid="signed-out">{children}</div>;
  },
  SignedIn: ({ children }: { children: React.ReactNode }) => {
    mockSignedIn(children);
    return <div data-testid="signed-in">{children}</div>;
  },
  SignInButton: () => <button data-testid="sign-in-button">Login</button>,
  UserButton: () => {
    mockUserButton();
    return <div data-testid="user-button">User Button</div>;
  },
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

describe("Marketing Header", () => {
  let Header: any;

  beforeEach(async () => {
    vi.resetModules();
    mockClerkLoading.mockClear();
    mockClerkLoaded.mockClear();
    mockSignedOut.mockClear();
    mockSignedIn.mockClear();
    mockUserButton.mockClear();
    
    const headerModule = await import("@/app/(marketing)/header");
    Header = headerModule.Header;
  });

  it("renders the platform logo and branding", () => {
    render(<Header />);

    expect(screen.getByAltText("Platform Logo")).toBeInTheDocument();
    expect(screen.getByText(/AWS Cloud Academy/i)).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<Header />);
    
    expect(screen.getByTestId("clerk-loading")).toBeInTheDocument();
  });

  it("displays sign in button for unauthenticated users", () => {
    render(<Header />);
    
    expect(screen.getByTestId("clerk-loaded")).toBeInTheDocument();
    expect(screen.getByTestId("signed-out")).toBeInTheDocument();
    expect(screen.getByTestId("sign-in-button")).toBeInTheDocument();
  });

  it("displays user button for authenticated users", () => {
    render(<Header />);
    
    expect(screen.getByTestId("signed-in")).toBeInTheDocument();
    expect(screen.getByTestId("user-button")).toBeInTheDocument();
  });

  it("has proper header structure", () => {
    const { container } = render(<Header />);
    
    const header = container.querySelector("header");
    expect(header).toHaveClass("h-20", "w-full");
  });
});