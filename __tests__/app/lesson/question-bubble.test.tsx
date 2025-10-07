import React from "react";
import { render, screen } from "@testing-library/react";

import { QuestionBubble } from "@/app/lesson/question-bubble";

describe("QuestionBubble", () => {
  it("renders the supplied question text", () => {
    render(<QuestionBubble question="What is EC2?" />);

    expect(screen.getByText("What is EC2?")).toBeInTheDocument();
  });
});
