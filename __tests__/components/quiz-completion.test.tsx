import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi, beforeEach } from "vitest"

import { QuizCompletion } from "@/components/quiz/QuizCompletion"
import { GAMIFICATION } from "@/constants"

vi.mock("react-use", () => ({
  useWindowSize: () => ({ width: 1024, height: 768 }),
}))

vi.mock("react-confetti", () => {
  return {
    default: () => null,
  }
})

const challenges = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
}))

describe("QuizCompletion", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("displays standard lesson XP breakdown", () => {
    render(
      <QuizCompletion
        challenges={challenges}
        hearts={4}
        lessonId={1}
        onComplete={vi.fn()}
        onRedo={vi.fn()}
        userSubscription={null}
        isPractice={false}
      />,
    )

    const lessonXP = GAMIFICATION.XP_PER_LESSON
    const questionXP = challenges.length * GAMIFICATION.XP_PER_QUESTION
    const totalXP = lessonXP + questionXP

    expect(screen.getByText(`${totalXP}`)).toBeInTheDocument()
    expect(screen.getByText(/Lesson reward:/i).textContent).toContain(
      `${lessonXP} XP`,
    )
    expect(screen.getByText(/Questions:/i).textContent).toContain(
      `${challenges.length} × ${GAMIFICATION.XP_PER_QUESTION} XP`,
    )
    expect(
      screen.queryByText(/Pro Practice Bonus/i),
    ).not.toBeInTheDocument()
  })

  it("shows practice lesson XP for non-pro users", () => {
    render(
      <QuizCompletion
        challenges={challenges}
        hearts={3}
        lessonId={2}
        onComplete={vi.fn()}
        onRedo={vi.fn()}
        userSubscription={null}
        isPractice
      />,
    )

    const lessonXP = GAMIFICATION.XP_PER_PRACTICE_LESSON
    const questionXP = challenges.length * GAMIFICATION.XP_PER_PRACTICE_QUESTION
    const totalXP = lessonXP + questionXP

    expect(screen.getByText(`${totalXP}`)).toBeInTheDocument()
    expect(screen.getByText(/Practice lesson reward:/i).textContent).toContain(
      `${lessonXP} XP`,
    )
    expect(
      screen.queryByText(/Pro Practice Bonus/i),
    ).not.toBeInTheDocument()
  })

  it("shows practice pro bonus for subscribers", () => {
    render(
      <QuizCompletion
        challenges={challenges}
        hearts={3}
        lessonId={3}
        onComplete={vi.fn()}
        onRedo={vi.fn()}
        userSubscription={{ isActive: true }}
        isPractice
      />,
    )

    const bonus =
      GAMIFICATION.XP_PER_PRACTICE_LESSON_PRO - GAMIFICATION.XP_PER_PRACTICE_LESSON
    expect(
      screen.getByText(`Pro Practice Bonus: +${bonus} XP`, { exact: false }),
    ).toBeInTheDocument()
  })
})
