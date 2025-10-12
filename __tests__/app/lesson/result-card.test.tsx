import React from "react";
import { render, screen } from "@testing-library/react";

import { ResultCard } from "@/app/lesson/result-card";

describe("ResultCard", () => {
  it("renders total XP variant correctly", () => {
    const { container } = render(<ResultCard value={120} variant="points" />);

    expect(screen.getByText("Total XP")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("renders hearts variant correctly", () => {
    const { container } = render(<ResultCard value={4} variant="hearts" />);

    expect(screen.getByText("Hearts Left")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
