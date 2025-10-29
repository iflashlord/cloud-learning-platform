import type { ConversationEntry } from "./types"

export const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export const formatInlineMarkdown = (value: string) => {
  let result = escapeHtml(value)

  result = result.replace(
    /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  )
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>")
  result = result.replace(/`([^`]+)`/g, "<code>$1</code>")

  return result
}

export const renderMarkdownToHtml = (markdown: string) => {
  if (!markdown) {
    return ""
  }

  const trimmed = markdown.trim()
  if (!trimmed) {
    return ""
  }

  const blocks = trimmed.split(/\n{2,}/)

  const htmlBlocks = blocks.map((block) => {
    const trimmedBlock = block.trim()

    if (/^```/.test(trimmedBlock) && /```$/.test(trimmedBlock)) {
      const codeContent = trimmedBlock.replace(/^```[\w-]*\n?/, "").replace(/```$/, "")
      return `<pre><code>${escapeHtml(codeContent)}</code></pre>`
    }

    const lines = trimmedBlock.split("\n")
    if (lines.every((line) => /^[-*+]\s+/.test(line.trim()))) {
      const items = lines
        .map((line) => line.replace(/^[-*+]\s+/, ""))
        .map((item) => `<li>${formatInlineMarkdown(item)}</li>`)
        .join("")
      return `<ul>${items}</ul>`
    }

    if (lines.every((line) => /^\d+\.\s+/.test(line.trim()))) {
      const items = lines
        .map((line) => line.replace(/^\d+\.\s+/, ""))
        .map((item) => `<li>${formatInlineMarkdown(item)}</li>`)
        .join("")
      return `<ol>${items}</ol>`
    }

    const paragraph = lines.map((line) => formatInlineMarkdown(line)).join("<br />")

    return `<p>${paragraph}</p>`
  })

  return htmlBlocks.join("")
}

export const formatTimestamp = (isoDate: string) => {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

export const getConversationId = () => {
  if (typeof crypto !== "undefined" && crypto?.randomUUID) {
    return crypto.randomUUID()
  }

  return `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

type Challenge = {
  question?: string
  correctAnswer?: string
}

type LessonLike = {
  title?: string
  objectives?: string[]
  unit?: {
    title?: string
    course?: {
      title?: string
    }
  }
  challenges?: Challenge[]
}

type CompletionLike = {
  score?: number
}

interface BuildSystemPromptParams {
  lessonData: LessonLike | null | undefined
  completionData: CompletionLike | null | undefined
  summaryText?: string | null
}

export const buildSystemPrompt = ({
  lessonData,
  completionData,
  summaryText,
}: BuildSystemPromptParams) => {
  const challenges: Challenge[] = Array.isArray(lessonData?.challenges)
    ? (lessonData?.challenges as Challenge[])
    : []
  const snippetLimit = summaryText ? 5 : Math.min(challenges.length, 8)
  const challengeSnippets = challenges
    .slice(0, snippetLimit)
    .map((challenge, index) => {
      const answer = challenge?.correctAnswer ? ` — Correct answer: ${challenge.correctAnswer}` : ""
      return `${index + 1}. ${challenge?.question ?? ""}${answer}`
    })
    .join("\n")

  const summarySection = summaryText ? `Lesson summary:\n${summaryText}\n\n` : ""

  const lessonTitle = lessonData?.title ?? "Lesson"
  const courseTitle = lessonData?.unit?.course?.title ?? "Course"
  const unitTitle = lessonData?.unit?.title ?? "Unit"
  const scoreValue = typeof completionData?.score === "number" ? completionData.score : 0

  return `You are an expert AI tutor helping students review and understand lesson content. 
      
Lesson: "${lessonTitle}"
Course: ${courseTitle}
Unit: ${unitTitle}
Student Score: ${scoreValue}%

${summarySection}Important context:
${challengeSnippets}

If the student asks for more depth, you can request specific challenge details. Provide concise, helpful, and educational responses. Focus on helping the student understand concepts better.`
}

export const buildPlaintextExport = (entry: ConversationEntry) => {
  return [
    `=== Lesson Review Assistant Entry ===`,
    `Generated: ${formatTimestamp(entry.createdAt)}`,
    ``,
    `Prompt:`,
    entry.prompt,
    ``,
    `Response:`,
    entry.answer,
    ``,
    `Engine: ${entry.engine === "prompt" ? "Chrome Prompt API" : "Chrome Gemini Nano"}`,
  ].join("\n")
}
