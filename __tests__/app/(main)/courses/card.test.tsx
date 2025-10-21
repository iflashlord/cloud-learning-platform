import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Card } from "@/app/(main)/courses/card";

describe("Course Card", () => {
  it("calls onClick with the course id when selected", async () => {
    const handleClick = vi.fn();

    render(
      <Card
        id={5}
        title="Advanced AWS"
        imageSrc="/aws.png"
        onClick={handleClick}
      />,
    );

    await userEvent.click(screen.getByText("Advanced AWS"));
    expect(handleClick).toHaveBeenCalledWith(5);
  });

  it("applies the disabled styling when the card is disabled", () => {
    render(
      <Card
        id={6}
        title="Starter"
        imageSrc="/starter.png"
        onClick={vi.fn()}
        disabled
      />,
    );

    const card = screen.getByRole("button", { name: /Starter course/i });
    expect(card.className).toContain("pointer-events-none");
    expect(card.className).toContain("opacity-50");
  });

  it("shows the active checkmark when the course is active", () => {
    render(
      <Card
        id={1}
        title="Active Course"
        imageSrc="/active.png"
        onClick={vi.fn()}
        active
      />,
    );

    const card = screen.getByRole("button", { name: /Active Course course/i });
    expect(card.className).toContain("ring-2");
    expect(card.className).toContain("border-primary");
  });
});
