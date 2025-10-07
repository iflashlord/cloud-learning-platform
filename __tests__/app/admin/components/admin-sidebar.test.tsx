import React from "react";
import { render, screen } from "@testing-library/react";

const { pathnameState } = vi.hoisted(() => ({
  pathnameState: { current: "/admin" },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => pathnameState.current,
}));

import { AdminSidebar } from "@/app/admin/components/admin-sidebar";

describe("AdminSidebar", () => {
  beforeEach(() => {
    pathnameState.current = "/admin";
  });

  it("marks the dashboard link as active on the admin home path", () => {
    const { container } = render(<AdminSidebar />);

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    expect(dashboardLink.className).toContain("bg-orange-100");

    const coursesLink = screen.getByRole("link", { name: "AWS Certifications" });
    expect(coursesLink.className).not.toContain("bg-orange-100");
    expect(container).toHaveTextContent("Admin Panel");
  });

  it("highlights nested routes for non-root sections", () => {
    pathnameState.current = "/admin/courses/123";

    render(<AdminSidebar />);

    const coursesLink = screen.getByRole("link", { name: "AWS Certifications" });
    expect(coursesLink.className).toContain("bg-orange-100");

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    expect(dashboardLink.className).not.toContain("bg-orange-100");
  });
});
