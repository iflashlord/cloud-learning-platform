import React from "react";
import { render, screen } from "@testing-library/react";

import { AdminHeader } from "@/app/admin/components/admin-header";

describe("AdminHeader", () => {
  it("renders site branding and navigation actions", () => {
    render(<AdminHeader />);

    const homeLink = screen.getByRole("link", { name: "Learning Platform" });
    expect(homeLink).toHaveAttribute("href", "/admin");

    const viewSiteLink = screen.getByRole("link", { name: "View Site" });
    expect(viewSiteLink).toHaveAttribute("href", "/");

    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });
});
