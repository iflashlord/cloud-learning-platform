import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SettingsPage from "@/app/admin/settings/page";

describe("Admin SettingsPage", () => {
  const originalFetch = global.fetch;
  const originalAlert = window.alert;
  const originalURL = { ...URL };
  const originalCreateElement = document.createElement.bind(document);
  const originalLocation = window.location;

  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch;
    window.alert = originalAlert;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  afterEach(() => {
    global.fetch = originalFetch;
    window.alert = originalAlert;
    (URL as unknown as { createObjectURL?: unknown }).createObjectURL = originalURL.createObjectURL;
    (URL as unknown as { revokeObjectURL?: unknown }).revokeObjectURL = originalURL.revokeObjectURL;
    document.createElement = originalCreateElement;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  it("exports data as JSON and triggers a download", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      blob: async () => new Blob(["data"], { type: "application/json" }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const createObjectURLMock = vi.fn().mockReturnValue("blob:mock");
    const revokeObjectURLMock = vi.fn();
    (URL as unknown as { createObjectURL: () => string }).createObjectURL = createObjectURLMock;
    (URL as unknown as { revokeObjectURL: () => void }).revokeObjectURL = revokeObjectURLMock;

    const clickSpy = vi.fn();
    vi.spyOn(document, "createElement").mockImplementation((tagName: string) => {
      const element = originalCreateElement(tagName);
      if (tagName === "a") {
        Object.assign(element, { click: clickSpy });
      }
      return element;
    });

    render(<SettingsPage />);
    const exportButton = screen.getByRole("button", { name: "Export as JSON" });

    await userEvent.click(exportButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/admin/export?format=json");
    });

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();
    expect(exportButton).not.toBeDisabled();
  });

  it("alerts when export fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    global.fetch = fetchMock as unknown as typeof fetch;
    window.alert = vi.fn();

    render(<SettingsPage />);

    await userEvent.click(screen.getByRole("button", { name: "Export as JSON" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Export failed");
    });
  });

  it("imports data from a JSON file and reloads the page", async () => {
    const importResult = {
      results: {
        coursesImported: 3,
        unitsImported: 7,
        lessonsImported: 21,
        challengesImported: 42,
        optionsImported: 168,
      },
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => importResult,
    });
    global.fetch = fetchMock as unknown as typeof fetch;
    window.alert = vi.fn();

    const reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, reload: reloadMock },
    });

    render(<SettingsPage />);

    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
    expect(fileInput).not.toBeNull();

    const mockFile = {
      name: "import.json",
      text: vi.fn().mockResolvedValue(JSON.stringify(importResult)),
    } as unknown as File;

    fireEvent.change(fileInput as HTMLInputElement, {
      target: { files: [mockFile] },
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/admin/import", expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }));
    });

    expect(window.alert).toHaveBeenCalledWith(
      [
        "Import successful!",
        "Courses: 3",
        "Units: 7",
        "Lessons: 21",
        "Challenges: 42",
        "Options: 168",
      ].join("\n"),
    );
    expect(reloadMock).toHaveBeenCalled();
    expect(mockFile.text).toHaveBeenCalled();
  });
});
