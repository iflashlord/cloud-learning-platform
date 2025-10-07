import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";

import { AdminDashboard } from "@/app/admin/components/admin-dashboard";

describe("AdminDashboard", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fetches stats and displays the resulting counts", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        json: async () => [{ id: 1 }, { id: 2 }],
      })
      .mockResolvedValueOnce({
        json: async () => [{ id: 10 }],
      })
      .mockResolvedValueOnce({
        json: async () => [{ id: 20 }, { id: 21 }, { id: 22 }],
      })
      .mockResolvedValueOnce({
        json: async () => [{ id: 30 }, { id: 31 }],
      });

    global.fetch = fetchMock as unknown as typeof fetch;

    render(<AdminDashboard />);

    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getAllByText("...").length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(4);
    });

    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/courses");
    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/units");
    expect(fetchMock).toHaveBeenNthCalledWith(3, "/api/lessons");
    expect(fetchMock).toHaveBeenNthCalledWith(4, "/api/challenges");

    await waitFor(() => {
      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });

    const certificationsCard = screen.getByText("AWS Certifications").closest("div");
    expect(certificationsCard).not.toBeNull();
    expect(within(certificationsCard as HTMLElement).getByText("2")).toBeInTheDocument();

    const unitsCard = screen.getByText("Units").closest("div");
    expect(unitsCard).not.toBeNull();
    expect(within(unitsCard as HTMLElement).getByText("1")).toBeInTheDocument();

    expect(screen.getByText("Quick Actions")).toBeInTheDocument();
    expect(screen.getByText("Add Certification")).toBeInTheDocument();
  });
});
