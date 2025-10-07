import React from "react";
import { render, screen } from "@testing-library/react";

const {
  mockIsAdmin,
  mockRedirect,
} = vi.hoisted(() => ({
  mockIsAdmin: vi.fn(),
  mockRedirect: vi.fn(),
}));

vi.mock("@/lib/admin", () => ({
  isAdmin: mockIsAdmin,
}));

vi.mock("@/app/admin/components/admin-header", () => ({
  AdminHeader: () => <div data-testid="admin-header" />,
}));

vi.mock("@/app/admin/components/admin-sidebar", () => ({
  AdminSidebar: () => <div data-testid="admin-sidebar" />,
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

describe("AdminLayout", () => {
  beforeEach(() => {
    vi.resetModules();
    mockIsAdmin.mockReset();
    mockRedirect.mockReset();
  });

  it("redirects to the homepage when the user is not an admin", async () => {
    mockIsAdmin.mockReturnValue(false);
    mockRedirect.mockImplementation(() => {
      throw new Error("redirected");
    });

    const { default: AdminLayout } = await import("@/app/admin/layout");

    expect(() => AdminLayout({ children: <div /> })).toThrow("redirected");
    expect(mockIsAdmin).toHaveBeenCalled();
    expect(mockRedirect).toHaveBeenCalledWith("/");
  });

  it("renders header, sidebar, and children for admin users", async () => {
    mockIsAdmin.mockReturnValue(true);
    mockRedirect.mockImplementation(() => {});

    const { default: AdminLayout } = await import("@/app/admin/layout");
    render(
      <AdminLayout>
        <div>Admin Content</div>
      </AdminLayout>,
    );

    expect(screen.getByTestId("admin-header")).toBeInTheDocument();
    expect(screen.getByTestId("admin-sidebar")).toBeInTheDocument();
    expect(screen.getByText("Admin Content")).toBeInTheDocument();
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});
