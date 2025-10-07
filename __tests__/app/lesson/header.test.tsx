import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Header } from "@/app/lesson/header";

const { mockOpen } = vi.hoisted(() => ({
  mockOpen: vi.fn(),
}));

vi.mock("@/store/use-exit-modal", () => ({
  useExitModal: () => ({ open: mockOpen }),
}));

describe("Lesson Header", () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  it("renders the remaining hearts count when the user is not subscribed", () => {
    const { container } = render(
      <Header
        hearts={3}
        percentage={40}
        hasActiveSubscription={false}
      />,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(container.querySelector('svg[data-lucide="infinity"]')).toBeNull();
  });

  it("shows the infinity icon and triggers the exit modal when clicking close", () => {
    const { container } = render(
      <Header
        hearts={5}
        percentage={90}
        hasActiveSubscription
      />,
    );

    expect(screen.queryByText("5")).toBeNull();
    const closeIcon = container.querySelector(".lucide-x");
    expect(closeIcon).not.toBeNull();

    fireEvent.click(closeIcon as SVGElement);
    expect(mockOpen).toHaveBeenCalledTimes(1);
  });
});
