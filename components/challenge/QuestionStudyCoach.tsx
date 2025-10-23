"use client"

import { useEffect, useMemo, useState } from "react"
import { Loader2, AlertTriangle, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LESSON_AI_PROMPTS, LessonAiPromptId } from "@/lib/ai/lesson-prompts"
import { resolveAssistantApi, resolveLanguageModelApi } from "@/lib/ai/chrome-ai-utils"

interface QuestionStudyCoachProps {
  lesson: {
    lessonTitle: string
    unitTitle?: string | null
    courseTitle?: string | null
    percentage: number
    totalChallenges: number
  }
  challenge: any
  options: any[]
  lastMessageId: string | null
  onMessagesChange: (latestId: string) => void
}

interface CoachMessage {
  id: string
  label: string
  prompt: string
  answer: string
  engine: "assistant" | "prompt"
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

const formatInlineMarkdown = (value: string) => {
  let result = escapeHtml(value)
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>")
  result = result.replace(/`([^`]+)`/g, "<code>$1</code>")
  result = result.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  return result
}

const renderMarkdownToHtml = (markdown: string) => {
  const trimmed = markdown.trim()
  if (!trimmed) return ""

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

const buildPrompt = (
  instruction: string,
  lesson: QuestionStudyCoachProps["lesson"],
  challenge: any,
  options: any[],
) => {
  const optionLines = options
    ?.map((option: any, index: number) => {
      const label = String.fromCharCode(65 + index)
      const correctness = option.correct ? " (correct)" : ""
      const guide = option?.guide ? ` | guide: ${option.guide}` : ""
      return `${label}. ${option.text}${correctness}${guide}`
    })
    .join("\n")

  const baseLines = [
    `Lesson title: ${lesson.lessonTitle}`,
    `Unit: ${lesson.unitTitle ?? "Not specified"}`,
    `Course: ${lesson.courseTitle ?? "Not specified"}`,
    `Current learner progress: ${Math.round(lesson.percentage)}% across ${lesson.totalChallenges} questions.`,
    ``,
    `Challenge order: ${
      typeof challenge?.order === "number" ? challenge.order + 1 : "Unknown"
    }`,
    `Question type: ${challenge?.type}`,
    `Question: ${challenge?.question}`,
    optionLines ? `Answer options:\n${optionLines}` : "This question has no multiple-choice options.",
    challenge?.correctAnswer
      ? `Correct answer text (if applicable): ${challenge.correctAnswer}`
      : null,
    challenge?.hint ? `Lesson hint: ${challenge.hint}` : null,
    challenge?.explanation ? `Lesson explanation: ${challenge.explanation}` : null,
  ]
    .filter(Boolean)
    .join("\n")

  return `${baseLines}\n\n${instruction}\nKeep the tone supportive and help the learner grow their AWS understanding.`
}

const normalizeResponse = (response: any) => {
  if (!response) return ""
  if (typeof response === "string") return response
  if (typeof response === "object") {
    if (response.outputText) return response.outputText
    if (response.output) return response.output
    if (Array.isArray(response.summaries)) return response.summaries.join("\n")
    return JSON.stringify(response)
  }
  return String(response)
}

export const QuestionStudyCoach = ({
  lesson,
  challenge,
  options,
  lastMessageId,
  onMessagesChange,
}: QuestionStudyCoachProps) => {
  const [isSupported, setIsSupported] = useState(false)
  const [supportChecked, setSupportChecked] = useState(false)
  const [session, setSession] = useState<any>(null)
  const [messages, setMessages] = useState<CoachMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const hasAssistant = Boolean(resolveAssistantApi())
      const hasPrompt = Boolean(resolveLanguageModelApi())
      setIsSupported(hasAssistant || hasPrompt)
    } catch (err) {
      console.error("Failed to detect Chrome AI support:", err)
      setIsSupported(false)
    } finally {
      setSupportChecked(true)
    }
  }, [])

  useEffect(() => {
    if (!messages.length) return
    const latest = messages[0].id
    onMessagesChange(latest)
    setOpenItems((prev) => (prev.includes(latest) ? prev : [latest, ...prev]))
  }, [messages, onMessagesChange])

  useEffect(() => {
    if (!lastMessageId) return
    setOpenItems((prev) => (prev.includes(lastMessageId) ? prev : [lastMessageId, ...prev]))
  }, [lastMessageId])

  const ensureSession = useMemo(
    () =>
      async () => {
        const api = resolveLanguageModelApi()
        if (!api?.create) {
          throw new Error("Chrome Prompt API is unavailable in this browser.")
        }
        if (session) {
          return session
        }
        const created = await api.create({
          temperature: 1,
          topK: 8,
          initialPrompts: [],
        })
        setSession(created)
        return created
      },
    [session],
  )

  const runPrompt = async (promptId: LessonAiPromptId | "custom", instruction: string) => {
    if (!isSupported) {
      setError("Chrome AI features are not available in this browser.")
      return
    }
    setError(null)
    setIsLoading(true)

    const engine: "assistant" | "prompt" = promptId === "custom" ? "prompt" : "assistant"
    const label =
      promptId === "custom"
        ? "Custom discussion"
        : LESSON_AI_PROMPTS.find((prompt) => prompt.id === promptId)?.title ?? "AI guidance"

    const entryId = crypto.randomUUID ? crypto.randomUUID() : `coach-${Date.now()}`
    const pendingMessage: CoachMessage = {
      id: entryId,
      label,
      prompt: instruction,
      answer: "",
      engine,
    }
    setMessages((prev) => [pendingMessage, ...prev])

    try {
      const finalPrompt = buildPrompt(instruction, lesson, challenge, options)
      const lmSession = await ensureSession()
      if (!lmSession?.prompt) {
        throw new Error("Chrome Prompt API session could not be created.")
      }
      const result = await lmSession.prompt(finalPrompt)
      const normalized = normalizeResponse(result)
      setMessages((prev) =>
        prev.map((message) =>
          message.id === entryId ? { ...message, answer: normalized || "No response returned." } : message,
        ),
      )
    } catch (err: any) {
      console.error("Study coach prompt failed:", err)
      const errorText = err?.message || "Failed to generate a response."
      setMessages((prev) =>
        prev.map((message) =>
          message.id === entryId ? { ...message, answer: `⚠️ ${errorText}` } : message,
        ),
      )
      setError(errorText)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = (promptId: LessonAiPromptId) => {
    const template = LESSON_AI_PROMPTS.find((prompt) => prompt.id === promptId)
    if (!template) return
    runPrompt(promptId, template.instruction)
  }

  const handleCustomPrompt = () => {
    const trimmed = customPrompt.trim()
    if (!trimmed) return
    runPrompt("custom", trimmed)
    setCustomPrompt("")
  }

  return (
    <div className='space-y-6 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50/40 dark:bg-blue-900/20 px-4 py-4'>
      {!supportChecked ? (
        <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
          <Loader2 className='h-4 w-4 animate-spin' /> Checking Chrome AI capabilities...
        </div>
      ) : !isSupported ? (
        <div className='rounded-lg border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-200 px-3 py-3 text-sm'>
          Chrome&apos;s built-in AI APIs are not available in this browser. Try Chrome Canary with the Web AI preview flags enabled to use Study Coach.
        </div>
      ) : null}

      <div>
        <p className='text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2 uppercase tracking-wide flex items-center gap-2'>
          <Sparkles className='h-4 w-4' /> Try a quick prompt
        </p>
        <div className='grid gap-2 sm:grid-cols-2'>
          {LESSON_AI_PROMPTS.map((prompt) => (
            <button
              key={prompt.id}
              type='button'
              onClick={() => handleQuickPrompt(prompt.id)}
              disabled={isLoading}
              className='text-left rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-blue-900/40 px-3 py-2 hover:border-blue-400 hover:shadow-sm transition disabled:opacity-60'
            >
              <div className='text-sm font-semibold text-gray-900 dark:text-gray-100'>{prompt.title}</div>
              <p className='text-xs text-gray-600 dark:text-gray-400 mt-1'>{prompt.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className='space-y-3'>
        <p className='text-sm font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wide'>Start your own discussion</p>
        <textarea
          value={customPrompt}
          onChange={(event) => setCustomPrompt(event.target.value)}
          rows={3}
          className='w-full rounded-md border border-blue-200 dark:border-blue-700 bg-white dark:bg-blue-900/40 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Ask Chrome AI anything about this question...'
        />
        <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
          <span>Context, hints, and answer data are included automatically.</span>
          <Button type='button' size='sm' onClick={handleCustomPrompt} disabled={!customPrompt.trim() || isLoading}>
            Send
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className='flex items-center gap-2 text-sm text-blue-600 dark:text-blue-300'>
          <Loader2 className='h-4 w-4 animate-spin' /> Generating response...
        </div>
      )}

      {error && (
        <div className='flex items-center gap-2 text-sm text-red-600 dark:text-red-300'>
          <AlertTriangle className='h-4 w-4' /> {error}
        </div>
      )}

      {messages.length > 0 && (
        <div className='space-y-2'>
          {messages.map((message) => {
            const isOpen = openItems.includes(message.id)
            return (
              <div
                key={message.id}
                className='border border-blue-200 dark:border-blue-700 rounded-lg bg-white dark:bg-blue-900/40'
              >
                <button
                  type='button'
                  className='w-full px-3 py-2 text-left text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center justify-between gap-2'
                  onClick={() =>
                    setOpenItems((prev) =>
                      prev.includes(message.id)
                        ? prev.filter((id) => id !== message.id)
                        : [message.id, ...prev],
                    )
                  }
                >
                  <span className='flex items-center gap-2'>
                    <Sparkles className='h-3 w-3 text-blue-600 dark:text-blue-300' />
                    {message.label} • {message.engine === "prompt" ? "Chrome Prompt API" : "Chrome Gemini Nano"}
                  </span>
                  <svg
                    aria-hidden
                    className={cn(
                      "h-4 w-4 text-blue-600 dark:text-blue-300 transition-transform",
                      isOpen ? "rotate-180" : "rotate-0",
                    )}
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M6 9l6 6 6-6' />
                  </svg>
                </button>
                {isOpen && (
                  <div className='px-3 pb-3'>
                    <div
                      className='prose prose-sm max-w-none text-gray-700 dark:text-gray-200 dark:prose-invert'
                      dangerouslySetInnerHTML={{
                        __html: message.answer
                          ? renderMarkdownToHtml(message.answer)
                          : "<p>Still waiting for a response.</p>",
                      }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
