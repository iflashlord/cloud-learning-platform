import React from "react";
import { render, screen } from "@testing-library/react";

const {
  mockClerkLoading,
  mockClerkLoaded,
  mockSignedOut,
  mockSignedIn,
} = vi.hoisted(() => ({
  mockClerkLoading: vi.fn(),
  mockClerkLoaded: vi.fn(),
  mockSignedOut: vi.fn(),
  mockSignedIn: vi.fn(),
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
  SignInButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sign-in-button">{children}</div>
  ),
  SignUpButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sign-up-button">{children}</div>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("Marketing Homepage", () => {
  let HomePage: any;

  beforeEach(async () => {
    vi.resetModules();
    mockClerkLoading.mockClear();
    mockClerkLoaded.mockClear();
    mockSignedOut.mockClear();
    mockSignedIn.mockClear();
    
    const pageModule = await import("@/app/(marketing)/page");
    HomePage = pageModule.default;
  });

  it("renders hero section with correct title and description", () => {
    render(<HomePage />);
    
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Learn, Practice/i)).toBeInTheDocument();
    expect(screen.getByText(/Transform your learning journey/i)).toBeInTheDocument();
  });

  it("displays clerk loading state", () => {
    render(<HomePage />);
    
    expect(screen.getByTestId("clerk-loading")).toBeInTheDocument();
  });

  it("shows sign up and sign in buttons when signed out", () => {
    render(<HomePage />);
    
    expect(screen.getByText(/Start Learning Free/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it("displays continue learning button for authenticated users", () => {
    render(<HomePage />);
    
    expect(screen.getByTestId("signed-in")).toBeInTheDocument();
  });

  it("has proper layout structure", () => {
    const { container } = render(<HomePage />);
    
    expect(container.firstChild).toHaveClass("w-full");
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
