import { AlertCircle, BookOpen, HelpCircle, Lightbulb, Target, LucideIcon } from "lucide-react"

import type { AiEngine } from "./types"

export interface AiActionConfig {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  defaultPrompt: string
}

export const AI_ACTIONS: AiActionConfig[] = [
  {
    id: "explain",
    title: "Explain Concepts",
    description: "Get clear explanations of key concepts",
    icon: Lightbulb,
    color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    defaultPrompt:
      "Explain the key concepts from this lesson in simple terms. What are the main learning objectives?",
  },
  {
    id: "examples",
    title: "Real Examples",
    description: "See practical applications",
    icon: Target,
    color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    defaultPrompt:
      "Provide real-world examples that demonstrate the concepts taught in this lesson.",
  },
  {
    id: "tips",
    title: "Study Tips",
    description: "Get personalized study strategies",
    icon: BookOpen,
    color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
    defaultPrompt:
      "Give me study tips and strategies to better remember and apply what I learned in this lesson.",
  },
  {
    id: "mistakes",
    title: "Avoid Mistakes",
    description: "Learn common pitfalls",
    icon: AlertCircle,
    color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
    defaultPrompt:
      "What are common mistakes students make with these concepts? How can I avoid them?",
  },
  {
    id: "quiz",
    title: "Quick Quiz",
    description: "Test your understanding",
    icon: HelpCircle,
    color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
    defaultPrompt: "Create 3 quick practice questions to test my understanding of this lesson.",
  },
]

export const getActionById = (id: string) => AI_ACTIONS.find((action) => action.id === id)

export const resolveActionPrompt = (actionId: string, customPrompt: string) => {
  if (actionId === "custom") {
    return {
      prompt: customPrompt,
      label: "Custom Question",
    }
  }

  const action = getActionById(actionId)
  return {
    prompt: action?.defaultPrompt ?? "Help me understand this lesson better.",
    label: action?.title ?? "Lesson Helper",
  }
}
