import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DialogCloseButton } from "@/components/ui/dialog-close-button";

describe("DialogCloseButton", () => {
  it("renders with default accessibility attributes and forwards clicks", () => {
    const handleClick = vi.fn();

    render(<DialogCloseButton onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toHaveAttribute("aria-label", "Close");
    expect(button).toHaveAttribute("title", "Close dialog");
    expect(screen.getByText("Close (Press Escape)")).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows tooltip and hover animation when enabled", () => {
    render(<DialogCloseButton />);

    const button = screen.getByRole("button", { name: "Close" });
    const icon = button.querySelector("svg");
    expect(icon).toBeTruthy();

    // Tooltip should appear after hover and icon should rotate
    fireEvent.mouseEnter(button);
    expect(screen.getByText("Close dialog")).toBeInTheDocument();
    expect(icon).toHaveClass("rotate-90");

    // Tooltip should disappear after mouse leave
    fireEvent.mouseLeave(button);
    expect(screen.queryByText("Close dialog")).not.toBeInTheDocument();
  });

  it("disables tooltip and animation when configured", () => {
    render(
      <DialogCloseButton
        ariaLabel="Dismiss"
        tooltipText="Dismiss dialog"
        showTooltip={false}
        animated={false}
      />,
    );

    const button = screen.getByRole("button", { name: "Dismiss" });
    const icon = button.querySelector("svg");
    expect(icon).toBeTruthy();

    // Tooltip should not be rendered or set on the button
    expect(button).not.toHaveAttribute("title");

    fireEvent.mouseEnter(button);
    expect(screen.queryByText("Dismiss dialog")).not.toBeInTheDocument();
    expect(icon).not.toHaveClass("rotate-90");

    // Screen reader text should respect the custom aria label
    expect(screen.getByText("Dismiss (Press Escape)")).toBeInTheDocument();
  });
});
