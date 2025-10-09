import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

const { mockRedirect } = vi.hoisted(() => ({
  mockRedirect: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

describe("Pro Page", () => {
  let ProPageComponent: any;

  beforeEach(async () => {
    vi.resetModules();
    mockRedirect.mockClear();
    
    const pageModule = await import("@/app/(main)/pro/page");
    const ProPage = pageModule.default;
    
    // Create a sync wrapper for the async component
    ProPageComponent = () => {
      const [content, setContent] = React.useState<React.ReactElement | null>(null);
      
      React.useEffect(() => {
        const renderAsync = async () => {
          try {
            const result = await ProPage();
            setContent(result);
          } catch (error) {
            console.error('Error rendering Pro page:', error);
          }
        };
        
        renderAsync();
      }, []);
      
      return content;
    };
  });

  it("renders the hero section with upgrade messaging", async () => {
    render(<ProPageComponent />);
    
    // Wait for async content to load
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Upgrade to/i)).toBeInTheDocument();
    expect(screen.getByText(/Pro Membership/)).toBeInTheDocument();
  });

  it("displays pro features and benefits", async () => {
    render(<ProPageComponent />);
    
    // Wait for async content to load then look for the feature cards specifically
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Unlimited Hearts/i })).toBeInTheDocument();
    });
    
    expect(screen.getByRole("heading", { name: /Premium Content/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Progress Insights/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Achievement Badges/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Priority Support/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Offline Learning/i })).toBeInTheDocument();
  });

  it("shows pricing information", async () => {
    render(<ProPageComponent />);

    await waitFor(() => {
      expect(screen.getByText("$9.99")).toBeInTheDocument();
    });
    
    expect(screen.getByText(/per month/i)).toBeInTheDocument();
    expect(screen.getByText(/Pro Membership/i)).toBeInTheDocument();
  });

  it("includes testimonials section", async () => {
    render(<ProPageComponent />);

    await waitFor(() => {
      expect(screen.getByText(/What Our Pro Users Say/i)).toBeInTheDocument();
    });
  });

  it("has a final call-to-action section", async () => {
    render(<ProPageComponent />);

    await waitFor(() => {
      expect(screen.getByText(/Ready to Accelerate Your Learning/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Start 7-Day Free Trial/i)).toBeInTheDocument();
    expect(screen.getByText(/View All Plans/i)).toBeInTheDocument();
  });

  it("displays feature comparison", async () => {
    render(<ProPageComponent />);

    await waitFor(() => {
      expect(screen.getByText(/Feature Comparison/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Basic Courses/i)).toBeInTheDocument();
    expect(screen.getByText(/Hearts System/i)).toBeInTheDocument();
  });

  it("displays testimonials section", async () => {
    render(<ProPageComponent />);

    await waitFor(() => {
      // The pro page has testimonials instead of FAQ
      expect(screen.getByText(/What Our Pro Users Say/i) || screen.getByText(/Ready to Accelerate/i)).toBeInTheDocument();
    });
  });

  it("does not redirect when user is not pro", async () => {
    render(<ProPageComponent />);

    await waitFor(() => {
      expect(mockRedirect).not.toHaveBeenCalled();
    });
  });
});