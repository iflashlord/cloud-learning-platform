import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DuolingoLesson } from "@/components/lesson/DuolingoLesson";

const sampleQuestions = [
  {
    id: "q1",
    question: "What does EC2 provide?",
    options: ["Object storage", "Virtual servers", "Event streaming"],
    correctAnswer: 1,
    explanation: "Amazon EC2 offers resizable compute capacity in the cloud.",
  },
  {
    id: "q2",
    question: "Which AWS service stores objects?",
    options: ["S3", "RDS", "Lambda"],
    correctAnswer: 0,
    explanation: "Amazon S3 stores objects up to 5 TB.",
  },
];

describe("DuolingoLesson", () => {
  it("walks through answer selection, checking, retrying, and completion", async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();

    render(<DuolingoLesson questions={sampleQuestions} onComplete={onComplete} hearts={3} streak={7} />);

    // Initial state
    expect(screen.getByText(/Question 1 of 2/i)).toBeInTheDocument();
    const getCheckButton = () => screen.getByRole("button", { name: "CHECK" });
    expect(getCheckButton()).toBeDisabled();

    // Select correct answer for first question
    await user.click(screen.getByText("Virtual servers"));
    expect(getCheckButton()).toBeEnabled();

    await user.click(getCheckButton());
    expect(screen.getByText(/Excellent work!/i)).toBeInTheDocument();
    const nextButton = screen.getByRole("button", { name: "NEXT" });
    await user.click(nextButton);

    // Second question should display
    await waitFor(() => expect(screen.getByText(/Question 2 of 2/i)).toBeInTheDocument());

    // Pick wrong answer to trigger retry state
    await user.click(screen.getByText("RDS"));
    await user.click(getCheckButton());
    await screen.findByText(/Try again/i);
    const retryButton = screen.getByRole("button", { name: "RETRY" });
    await user.click(retryButton);

    // After retry we should be able to choose again and check disabled until selection
    expect(getCheckButton()).toBeDisabled();
    await user.click(screen.getByText("S3"));
    expect(getCheckButton()).toBeEnabled();

    await user.click(getCheckButton());
    const finishButton = screen.getByRole("button", { name: "FINISH" });
    await user.click(finishButton);

    expect(onComplete).toHaveBeenCalled();
    expect(screen.getByText(/Lesson Complete!/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /CONTINUE LEARNING/i })).toBeInTheDocument();
  });
});
