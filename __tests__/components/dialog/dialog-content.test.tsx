import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

describe("DialogContent", () => {
  const renderDialog = (ui: React.ReactNode) =>
    render(
      <Dialog open onOpenChange={vi.fn()}>
        {ui}
      </Dialog>,
    );

  it("renders children and close button by default", () => {
    renderDialog(
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test dialog</DialogTitle>
          <DialogDescription>dialog description</DialogDescription>
        </DialogHeader>
        <p>body</p>
      </DialogContent>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test dialog")).toBeInTheDocument();
    expect(screen.getByText("dialog description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("can hide the close button when showCloseButton is false", () => {
    renderDialog(
      <DialogContent showCloseButton={false}>
        <p>body</p>
      </DialogContent>,
    );

    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("passes close button props and triggers onOpenChange when clicked", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <Dialog open onOpenChange={handleOpenChange}>
        <DialogContent closeButtonVariant="destructive">
          <p>body</p>
        </DialogContent>
      </Dialog>,
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toHaveAttribute("title", "Close dialog");
    expect(closeButton).toHaveClass("bg-red-50");

    await user.click(closeButton);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
