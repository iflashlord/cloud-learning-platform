export type LessonAiPromptId = "concept" | "steps" | "analogy" | "practice" | "pitfalls"

type LessonAiPrompt = {
  id: LessonAiPromptId
  title: string
  description: string
  instruction: string
  preferredEngine?: "assistant" | "prompt"
}

export const LESSON_AI_PROMPTS: LessonAiPrompt[] = [
  {
    id: "concept",
    title: "Explain the concept",
    description: "Get a clear explanation of the core idea behind this question.",
    instruction:
      "Explain the correct answer in plain language. Break down the core concept, reference the question context, and keep the tone encouraging.",
    preferredEngine: "assistant",
  },
  {
    id: "steps",
    title: "Show step-by-step reasoning",
    description: "Walk through the logic needed to answer correctly.",
    instruction:
      "Guide me step-by-step through the reasoning that leads to the correct answer. Mention critical checkpoints where learners often slip up.",
    preferredEngine: "assistant",
  },
  {
    id: "analogy",
    title: "Give me an analogy",
    description: "Use an analogy or real-world story to make this stick.",
    instruction:
      "Create a relatable analogy (cloud/real world) that makes this concept easier to remember. Keep it concise and vivid.",
    preferredEngine: "assistant",
  },
  {
    id: "practice",
    title: "More practice",
    description: "Get a couple of similar practice questions with answers.",
    instruction:
      "Create two fresh practice questions of similar difficulty. Provide the answer and a quick explanation for each.",
    preferredEngine: "prompt",
  },
  {
    id: "pitfalls",
    title: "Why other options are wrong",
    description: "Understand the traps and why distractors fail.",
    instruction:
      "Briefly explain why each incorrect answer choice is wrong. Highlight the misunderstanding it might reveal and give the correct takeaway.",
    preferredEngine: "assistant",
  },
]

export const getLessonPromptById = (id: LessonAiPromptId) =>
  LESSON_AI_PROMPTS.find((prompt) => prompt.id === id)
