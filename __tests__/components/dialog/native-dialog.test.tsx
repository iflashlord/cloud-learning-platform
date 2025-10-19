import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import {
  NativeDialog,
  NativeDialogContent,
  NativeDialogHeader,
  NativeDialogTitle,
} from "@/components/ui/native-dialog";

describe("NativeDialog", () => {
  const originalShowModal = (HTMLDialogElement.prototype as any).showModal;
  const originalClose = HTMLDialogElement.prototype.close;

  let showModalSpy: ReturnType<typeof vi.fn>;
  let closeSpy: ReturnType<typeof vi.fn>;

  beforeAll(() => {
    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });

    Object.defineProperty(HTMLDialogElement.prototype, "close", {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });
  });

  beforeEach(() => {
    showModalSpy = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    });
    closeSpy = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute("open");
    });
    (HTMLDialogElement.prototype as any).showModal = showModalSpy;
    (HTMLDialogElement.prototype as any).close = closeSpy;
  });

  afterAll(() => {
    if (originalShowModal) {
      (HTMLDialogElement.prototype as any).showModal = originalShowModal;
    } else {
      delete (HTMLDialogElement.prototype as any).showModal;
    }
    (HTMLDialogElement.prototype as any).close = originalClose;
  });

  it("invokes showModal and close based on the open prop", () => {
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <NativeDialog open={false} onOpenChange={onOpenChange}>
        <NativeDialogContent>Content</NativeDialogContent>
      </NativeDialog>,
    );

    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(showModalSpy).not.toHaveBeenCalled();

    rerender(
      <NativeDialog open={true} onOpenChange={onOpenChange}>
        <NativeDialogContent>Content</NativeDialogContent>
      </NativeDialog>,
    );
    expect(showModalSpy).toHaveBeenCalledTimes(1);

    rerender(
      <NativeDialog open={false} onOpenChange={onOpenChange}>
        <NativeDialogContent>Content</NativeDialogContent>
      </NativeDialog>,
    );
    expect(closeSpy).toHaveBeenCalledTimes(2);
  });

  it("dispatches onOpenChange(false) for close interactions", () => {
    const onOpenChange = vi.fn();
    const { container } = render(
      <NativeDialog
        open
        onOpenChange={onOpenChange}
        closeButtonVariant="ghost"
        closeButtonPosition="top-left"
        closeButtonTooltip="Dismiss dialog"
      >
        <NativeDialogHeader>
          <NativeDialogTitle>Title</NativeDialogTitle>
        </NativeDialogHeader>
        <NativeDialogContent>
          <button type="button">Inner action</button>
        </NativeDialogContent>
      </NativeDialog>,
    );

    const dialog = container.querySelector("dialog");
    expect(dialog).toBeTruthy();

    dialog!.getBoundingClientRect = () =>
      ({
        width: 200,
        height: 200,
        top: 100,
        left: 100,
        right: 300,
        bottom: 300,
        x: 100,
        y: 100,
        toJSON: () => ({}),
      }) as DOMRect;

    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toHaveAttribute("title", "Dismiss dialog");
    expect(closeButton).toHaveClass("top-4");
    expect(closeButton).toHaveClass("left-4");
    expect(closeButton).toHaveClass("hover:bg-gray-50");

    fireEvent.click(closeButton);
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();

    fireEvent.click(dialog!, { clientX: 150, clientY: 150 });
    expect(onOpenChange).not.toHaveBeenCalled();

    fireEvent.click(dialog!, { clientX: 10, clientY: 10 });
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();

    const cancelEvent = new Event("cancel", { cancelable: true });
    const preventSpy = vi.spyOn(cancelEvent, "preventDefault");
    dialog!.dispatchEvent(cancelEvent);
    expect(preventSpy).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();

    dialog!.dispatchEvent(new Event("close"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("can render without a close button when disabled", () => {
    const { queryByRole } = render(
      <NativeDialog open showCloseButton={false}>
        <NativeDialogContent>Content</NativeDialogContent>
      </NativeDialog>,
    );

    expect(queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });
});
