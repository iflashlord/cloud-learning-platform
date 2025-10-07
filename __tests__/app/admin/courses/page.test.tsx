import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CoursesPage from "@/app/admin/courses/page";

describe("Admin CoursesPage", () => {
  const originalFetch = global.fetch;
  const originalConfirm = window.confirm;
  const originalAlert = window.alert;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    window.confirm = originalConfirm;
    window.alert = originalAlert;
  });

  it("shows a loading spinner and renders the empty state when no courses exist", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const { container } = render(<CoursesPage />);
    expect(container.querySelector(".animate-spin")).not.toBeNull();

    await waitFor(() => {
      expect(screen.getByText("No certifications yet")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/courses");
  });

  it("renders a grid of courses returned from the API", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ([
        { id: 1, title: "Cloud Practitioner", imageSrc: "/cloud.svg" },
        { id: 2, title: "Solutions Architect", imageSrc: "/architect.svg" },
      ]),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(<CoursesPage />);

    await waitFor(() => {
      expect(screen.getByText("Cloud Practitioner")).toBeInTheDocument();
      expect(screen.getByText("Solutions Architect")).toBeInTheDocument();
    });

    expect(screen.getAllByRole("link", { name: "Add Certification" }).length).toBeGreaterThan(0);
  });

  it("deletes a course after confirmation", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([
          { id: 1, title: "Developer Associate", imageSrc: "/dev.svg" },
        ]),
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    global.fetch = fetchMock as unknown as typeof fetch;
    window.confirm = vi.fn().mockReturnValue(true);
    window.alert = vi.fn();

    const { container } = render(<CoursesPage />);

    await waitFor(() => {
      expect(screen.getByText("Developer Associate")).toBeInTheDocument();
    });

    const courseCard = screen.getByText("Developer Associate").closest("div");
    expect(courseCard).toBeTruthy();

    const cardButtons = within(courseCard as HTMLElement).getAllByRole("button");
    const deleteButton = cardButtons[cardButtons.length - 1];
    expect(deleteButton).toBeTruthy();

    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Certification deleted successfully");
    });

    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/courses/1", { method: "DELETE" });
    expect(screen.queryByText("Developer Associate")).not.toBeInTheDocument();
  });
});
