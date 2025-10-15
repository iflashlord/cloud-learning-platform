import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { mockCard } = vi.hoisted(() => ({
  mockCard: vi.fn(),
}));

vi.mock("@/components/challenge/ChallengeCard", () => ({
  ChallengeCard: (props: any) => {
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

vi.mock("@/components/Character", () => ({
  Character: () => <div data-testid="character" />,
}));

import { Challenge } from "@/app/lesson/challenge";

const baseOption = {
  challengeId: 1,
  imageSrc: null,
  audioSrc: null,
  correct: false,
  order: 0,
  guide: null,
  value: null,
};

const baseChallenge = {
  id: 1,
  lessonId: 1,
  type: "SELECT" as const,
  question: "What service fits?",
  hint: null,
  order: 1,
  audioSrc: null,
  imageSrc: null,
  videoSrc: null,
  correctAnswer: null,
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
        challenge={{ ...baseChallenge, type: "ASSIST", question: "Assist question" }}
        options={[
          { ...baseOption, id: 1, text: "Option A" },
        ]}
      />,
    );

    const grid = container.querySelector(".grid");
    expect(grid).not.toBeNull();
    expect(grid).toHaveClass("grid-cols-1");
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
        challenge={{ ...baseChallenge, type: "SELECT", question: "Select question" }}
        options={[
          { ...baseOption, id: 1, text: "Compute" },
          { ...baseOption, id: 2, text: "Storage" },
        ]}
      />,
    );

    const grid = container.querySelector(".grid");
    expect(grid).not.toBeNull();
    expect(grid).toHaveClass("grid-cols-2");
    expect(mockCard).toHaveBeenCalledTimes(2);

    await userEvent.click(screen.getByTestId("challenge-card-2"));
    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
