import { describe, expect, it } from "vitest"

import { synthesizeChallengeSuggestion } from "@/app/api/ai/challenge-builder/synthesizer"

describe("synthesizeChallengeSuggestion", () => {
  it("infers a cost optimization scenario from prompt keywords", () => {
    const suggestion = synthesizeChallengeSuggestion({
      prompt: "Need better cost visibility for finance leadership",
      challengeType: "SELECT",
      difficulty: "Intermediate",
    })

    expect(suggestion.question).toContain("cost")
    expect(suggestion.hint.toLowerCase()).toContain("aws")
    expect(suggestion.challengeOptions.some((option) => option.correct)).toBe(true)
  })

  it("creates TRUE_FALSE responses with dedicated guides", () => {
    const suggestion = synthesizeChallengeSuggestion({
      prompt: "Ensure zero downtime during AZ failures",
      challengeType: "TRUE_FALSE",
      difficulty: "Beginner",
    })

    const optionLabels = suggestion.challengeOptions.map((option) => option.text)
    expect(optionLabels).toEqual(["True", "False"])
    expect(suggestion.challengeOptions.some((option) => option.correct)).toBe(true)
  })

  it("returns ordered steps for drag and drop challenges", () => {
    const suggestion = synthesizeChallengeSuggestion({
      prompt: "Large scale IoT ingestion serverless pipeline",
      challengeType: "DRAG_DROP",
      difficulty: "Advanced",
    })

    suggestion.challengeOptions.forEach((option, index) => {
      expect(option.order).toBe(index + 1)
      expect(option.correct).toBe(false)
    })
  })

  it("references lesson breadcrumb in writing tips when provided", () => {
    const suggestion = synthesizeChallengeSuggestion({
      prompt: "",
      challengeType: "SELECT",
      difficulty: "Intermediate",
      lesson: {
        courseTitle: "AWS Solutions Architect",
        unitTitle: "Network Foundations",
        title: "Building Resilient VPCs",
      },
    })

    expect(
      suggestion.writingTips.some((tip) => tip.includes("AWS Solutions Architect › Network Foundations")),
    ).toBe(true)
  })

  it("uses question context when generating answers only", () => {
    const question =
      "How should finance teams detect unexpected AWS spend while still giving owners autonomy?"
    const suggestion = synthesizeChallengeSuggestion({
      mode: "answers",
      prompt: "",
      challengeType: "SELECT",
      difficulty: "Advanced",
      questionContext: {
        question,
        hint: "Lean on AWS-native billing visibility features.",
      },
      answerCount: 6,
    })

    expect(suggestion.challengeOptions).toHaveLength(6)
    const correctCount = suggestion.challengeOptions.filter((option) => option.correct).length
    expect(correctCount).toBe(1)
    expect(suggestion.writingTips.some((tip) => tip.includes("finance teams detect"))).toBe(true)
  })
})
