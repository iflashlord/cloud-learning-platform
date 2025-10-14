import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

const {
  mockUseKey,
  mockUseMedia,
  hrefSetter,
  mockUseThemeClasses,
} = vi.hoisted(() => ({
  mockUseKey: vi.fn(),
  mockUseMedia: vi.fn().mockReturnValue(false),
  hrefSetter: vi.fn(),
  mockUseThemeClasses: vi.fn().mockReturnValue({
    successBg: "bg-green-50",
    successText: "text-green-800",
    errorBg: "bg-red-50",
    errorText: "text-red-800",
  }),
}));

vi.mock("react-use", async () => {
  const actual = await vi.importActual<typeof import("react-use")>("react-use");
  return {
    ...actual,
    useKey: (
      event: string,
      handler: () => void,
      options?: unknown,
      deps?: unknown[],
    ) => {
      mockUseKey(event, handler, options, deps);
    },
    useMedia: (query: string) => mockUseMedia(query),
  };
});

vi.mock("@/lib/theme-utils", () => ({
  useThemeClasses: () => mockUseThemeClasses(),
}));

import { Footer } from "@/app/lesson/footer";

const originalLocation = window.location;
let currentHref = "";

beforeAll(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    value: {
      get href() {
        return currentHref;
      },
      set href(value: string) {
        currentHref = value;
        hrefSetter(value);
      },
    } as Location,
  });
});

afterAll(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    value: originalLocation,
  });
});

describe("Lesson Footer", () => {
  beforeEach(() => {
    mockUseKey.mockClear();
    mockUseMedia.mockReset();
    mockUseMedia.mockReturnValue(false);
    hrefSetter.mockClear();
    currentHref = "";
    mockUseThemeClasses.mockClear();
  });

  it("shows success feedback and wires the enter key handler", () => {
    const onCheck = vi.fn();

    render(
      <Footer
        status="correct"
        onCheck={onCheck}
      />,
    );

    expect(screen.getByText("Nicely done!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /NEXT/i })).toBeEnabled();
    expect(mockUseKey).toHaveBeenCalledWith(
      "Enter",
      expect.any(Function),
      {},
      [onCheck],
    );
    expect(mockUseMedia).toHaveBeenCalledWith("(max-width: 1024px)");
  });

  it("disables the action button and shows retry messaging when incorrect", () => {
    const onCheck = vi.fn();
    mockUseMedia.mockReturnValue(true);

    render(
      <Footer
        status="wrong"
        onCheck={onCheck}
        disabled
      />,
    );

    expect(screen.getByText("Try again.")).toBeInTheDocument();
    const retryButton = screen.getByRole("button", { name: /RETRY/i });
    expect(retryButton).toBeDisabled();
  });

  it("offers practice restart when a lesson is completed", () => {
    const onCheck = vi.fn();

    render(
      <Footer
        status="completed"
        lessonId={42}
        onCheck={onCheck}
      />,
    );

    expect(screen.getByRole("button", { name: /Practice again/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Practice again/i }));

    expect(hrefSetter).toHaveBeenCalledWith("/lesson/42");
    expect(screen.getByRole("button", { name: /CONTINUE/i })).toBeEnabled();
  });
});
