import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

    const certificationsButton = screen.getByRole("button", { name: /Learning Content/i });
    expect(certificationsButton.className).not.toContain("bg-orange-100");
    expect(container).toHaveTextContent("Admin Panel");
  });

  it("allows expanding the certifications menu and shows submenu items", async () => {
    pathnameState.current = "/admin/courses/123";

    render(<AdminSidebar />);

    const triggerButton = await screen.findByRole("button", { name: /Learning Content/i });
    expect(triggerButton.className).toContain("bg-orange-100");

    await userEvent.click(triggerButton);

    expect(await screen.findByRole("link", { name: "Courses" })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: "Lessons" })).toBeInTheDocument();
  });

  it("marks the matching submenu item as active", async () => {
    pathnameState.current = "/admin/units";

    render(<AdminSidebar />);

    const triggerButton = await screen.findByRole("button", { name: /Learning Content/i });
    expect(triggerButton.className).toContain("bg-orange-100");

    await waitFor(() => {
      const unitLink = screen.getByRole("link", { name: "Units" });
      expect(unitLink.className).toContain("border-orange-500");
    });
  });
});
