import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { mockCard } = vi.hoisted(() => ({
  mockCard: vi.fn(),
}));

vi.mock("@/app/lesson/card", () => ({
  Card: (props: any) => {
    mockCard(props);
    return (
      <button
        data-testid={`challenge-card-${props.id}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.text}
      </button>
    );
  },
}));

import { Challenge } from "@/app/lesson/challenge";

const baseOption = {
  imageSrc: null,
  audioSrc: null,
  correct: false,
};

describe("Challenge component", () => {
  beforeEach(() => {
    mockCard.mockClear();
  });

  it("renders a single-column grid for ASSIST challenges", () => {
    const { container } = render(
      <Challenge
        type="ASSIST"
        status="none"
        onSelect={vi.fn()}
        options={[
          { ...baseOption, id: 1, text: "Option A" },
        ]}
      />,
    );

    expect(container.firstChild).toHaveClass("grid-cols-1");
    expect(mockCard).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      text: "Option A",
      type: "ASSIST",
    }));
  });

  it("renders a responsive two-column grid for SELECT challenges and forwards selection", async () => {
    const onSelect = vi.fn();

    const { container } = render(
      <Challenge
        type="SELECT"
        status="none"
        onSelect={onSelect}
        options={[
          { ...baseOption, id: 1, text: "Compute" },
          { ...baseOption, id: 2, text: "Storage" },
        ]}
      />,
    );

    expect(container.firstChild).toHaveClass("grid-cols-2");
    expect(mockCard).toHaveBeenCalledTimes(2);

    await userEvent.click(screen.getByTestId("challenge-card-2"));
    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
