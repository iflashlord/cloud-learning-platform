import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import { AdminDashboard } from "@/app/admin/components/admin-dashboard";

describe("AdminDashboard", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fetches stats and displays the resulting counts", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ json: async () => [{ id: 1 }, { id: 2 }] }) // courses
      .mockResolvedValueOnce({ json: async () => [{ id: 10 }] }) // units
      .mockResolvedValueOnce({ json: async () => [{ id: 20 }, { id: 21 }, { id: 22 }] }) // lessons
      .mockResolvedValueOnce({ json: async () => [{ id: 30 }, { id: 31 }] }) // challenges
      .mockResolvedValueOnce({ json: async () => [{ id: 40 }, { id: 41 }, { id: 42 }] }) // challenge options
      .mockResolvedValueOnce({
        json: async () => ({
          activeUsers: 1200,
          completionRate: 67,
          activeSubscriptions: 45,
          monthlyRevenue: 3200,
        }),
      }); // admin stats

    global.fetch = fetchMock as unknown as typeof fetch;

    render(<AdminDashboard />);

    expect(screen.getByRole("heading", { name: "Learning Platform" })).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(6);
    });

    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/courses");
    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/units");
    expect(fetchMock).toHaveBeenNthCalledWith(3, "/api/lessons");
    expect(fetchMock).toHaveBeenNthCalledWith(4, "/api/challenges");
    expect(fetchMock).toHaveBeenNthCalledWith(5, "/api/challengeOptions");
    expect(fetchMock).toHaveBeenNthCalledWith(6, "/api/admin/stats");

    await waitFor(() => {
      const value = getStatValue("Courses");
      expect(value).toBe("2");
    });

    expect(getStatValue("Units")).toBe("1");
    expect(getStatValue("Answer Options")).toBe("3");
    expect(getStatValue("Registered Users")).toBe("1,200");
    expect(getStatValue("Completion Rate")).toBe("67%");

    expect(screen.getByText("Quick Actions")).toBeInTheDocument();
    expect(screen.getByText("Add Course")).toBeInTheDocument();
  });

  const getStatValue = (label: string): string | undefined => {
    const labelNode = screen.getByText(label);
    const valueNode = labelNode.parentElement?.querySelector("p.text-3xl");
    expect(valueNode).not.toBeNull();
    return valueNode!.textContent?.trim();
  };
});
