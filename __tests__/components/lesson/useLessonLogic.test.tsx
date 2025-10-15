import { describe, expect, it, vi } from "vitest";

import { useLessonLogic } from "@/components/lesson/useLessonLogic";

const sampleQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    prompt: "What is AWS?",
    correctAnswer: 2,
    answers: ["Database", "Infrastructure", "Cloud", "Storage"],
    explanation: "AWS is Amazon's cloud platform.",
  },
];

describe("useLessonLogic", () => {
  const {
    getFooterContent,
    calculateProgress,
    checkAnswer,
  } = useLessonLogic(sampleQuestions);

  it("returns success footer content for a correct answer", () => {
    const onNext = vi.fn();
    const footer = getFooterContent(
      {
        currentQuestion: 0,
        status: "correct",
        score: 1,
        attempts: 1,
        selectedAnswer: 2,
        showExplanation: true,
      },
      sampleQuestions[0],
      false,
      onNext,
      vi.fn(),
      vi.fn(),
    );

    expect(footer).not.toBeNull();
    expect(footer?.message).toBe("Excellent work!");
    expect(footer?.button.text).toBe("NEXT");
    footer?.button.onClick();
    expect(onNext).toHaveBeenCalled();
  });

  it("uses finish label on the last question", () => {
    const footer = getFooterContent(
      {
        currentQuestion: 0,
        status: "correct",
        score: 1,
        attempts: 1,
        selectedAnswer: 2,
        showExplanation: true,
      },
      sampleQuestions[0],
      true,
      vi.fn(),
      vi.fn(),
      vi.fn(),
    );

    expect(footer?.button.text).toBe("FINISH");
  });

  it("returns retry instructions for wrong answers", () => {
    const footer = getFooterContent(
      {
        currentQuestion: 0,
        status: "wrong",
        score: 0,
        attempts: 1,
        selectedAnswer: 0,
        showExplanation: false,
      },
      sampleQuestions[0],
      false,
      vi.fn(),
      vi.fn(),
      vi.fn(),
    );

    expect(footer?.button.text).toBe("RETRY");
    expect(footer?.message).toContain("Try again");
  });

  it("returns continue content when lesson is completed", () => {
    const footer = getFooterContent(
      {
        currentQuestion: 0,
        status: "completed",
        score: 1,
        attempts: 1,
        selectedAnswer: 2,
        showExplanation: false,
      },
      sampleQuestions[0],
      true,
      vi.fn(),
      vi.fn(),
      vi.fn(),
    );

    expect(footer?.button.text).toBe("CONTINUE LEARNING");
  });

  it("returns null footer content when status is none", () => {
    const footer = getFooterContent(
      {
        currentQuestion: 0,
        status: "none",
        score: 0,
        attempts: 0,
        selectedAnswer: null,
        showExplanation: false,
      },
      sampleQuestions[0],
      false,
      vi.fn(),
      vi.fn(),
      vi.fn(),
    );

    expect(footer).toBeNull();
  });

  it("calculates linear progress and rounds percentages", () => {
    const progress = calculateProgress(1, 3);
    expect(progress).toEqual({ current: 2, total: 3, percentage: 67 });
  });

  it("checks answers for equality", () => {
    expect(checkAnswer(2, 2)).toBe(true);
    expect(checkAnswer(1, 2)).toBe(false);
  });
});
