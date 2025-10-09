import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const {
  pushMock,
  refreshMock,
} = vi.hoisted(() => ({
  pushMock: vi.fn(),
  refreshMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: React.ComponentProps<"button">) => (
    <button {...props}>{children}</button>
  ),
}));

const { CourseForm } = await import("@/app/admin/courses/components/course-form");

describe("CourseForm", () => {
  const originalFetch = global.fetch;
  const originalAlert = window.alert;

  beforeEach(() => {
    vi.restoreAllMocks();
    pushMock.mockReset();
    refreshMock.mockReset();
    global.fetch = originalFetch;
    window.alert = originalAlert;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    window.alert = originalAlert;
  });

  it("creates a new course and navigates back to the courses list", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(<CourseForm mode="create" />);

    await userEvent.type(screen.getByLabelText("Course Title *"), "New Course");
    await userEvent.type(screen.getByLabelText("Image URL *"), "https://example.com/image.svg");

    await userEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/courses", expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Course",
          imageSrc: "https://example.com/image.svg",
        }),
      }));
    });

    expect(pushMock).toHaveBeenCalledWith("/admin/courses");
    expect(refreshMock).toHaveBeenCalled();
  });

  it("shows an alert when the API request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    global.fetch = fetchMock as unknown as typeof fetch;

    window.alert = vi.fn();

    render(<CourseForm mode="create" />);

    await userEvent.type(screen.getByLabelText("Course Title *"), "Bad Course");
    await userEvent.type(screen.getByLabelText("Image URL *"), "https://example.com/bad.svg");
    await userEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Failed to create course");
    });
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("updates an existing course", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(
      <CourseForm
        mode="edit"
        courseId={42}
        initialData={{
          title: "Existing Course",
          imageSrc: "https://example.com/old.svg",
        }}
      />,
    );

    const titleInput = screen.getByLabelText("Course Title *");
    expect(titleInput).toHaveValue("Existing Course");

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Updated Course");

    await userEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/courses/42", expect.objectContaining({
        method: "PUT",
        body: JSON.stringify({
          title: "Updated Course",
          imageSrc: "https://example.com/old.svg",
        }),
      }));
    });

    expect(pushMock).toHaveBeenCalledWith("/admin/courses");
    expect(refreshMock).toHaveBeenCalled();
  });
});
