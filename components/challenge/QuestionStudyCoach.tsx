"use client"

import { useEffect, useMemo, useState } from "react"
import { Loader2, AlertTriangle, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LESSON_AI_PROMPTS, LessonAiPromptId } from "@/lib/ai/lesson-prompts"
import { resolveAssistantApi, resolveLanguageModelApi } from "@/lib/ai/chrome-ai-utils"
import { renderMarkdownToHtml } from "@/lib/markdown"

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

interface SavedCoachMessage extends CoachMessage {
  savedAt?: string
  lessonTitle?: string
  challengeId?: number
}

const STORAGE_KEY = "aws-learning-study-coach-saved"


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
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [notice, setNotice] = useState<string | null>(null)

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

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: SavedCoachMessage[] = JSON.parse(raw)
        setSavedIds(new Set(parsed.map((entry) => entry.id)))
      }
    } catch (err) {
      console.error("Failed to read study coach saved entries:", err)
    }

    const handleSavedUpdate = (event: Event) => {
      const detail = (event as CustomEvent<SavedCoachMessage[]>).detail
      if (detail) {
        setSavedIds(new Set(detail.map((entry) => entry.id)))
      } else if (typeof window !== "undefined") {
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY)
          if (raw) {
            const parsed: SavedCoachMessage[] = JSON.parse(raw)
            setSavedIds(new Set(parsed.map((entry) => entry.id)))
          } else {
            setSavedIds(new Set())
          }
        } catch (err) {
          console.error("Failed to sync study coach saved entries:", err)
        }
      }
    }

    window.addEventListener("study-coach-saved-updated", handleSavedUpdate as EventListener)
    return () => {
      window.removeEventListener("study-coach-saved-updated", handleSavedUpdate as EventListener)
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

  const syncSavedEntries = (entries: SavedCoachMessage[], broadcast = true) => {
    if (typeof window === "undefined") return
    const normalized = entries.slice(0, 200)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
    setSavedIds(new Set(normalized.map((entry) => entry.id)))
    if (broadcast && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("study-coach-saved-updated", { detail: normalized }))
    }
  }

  const handleSaveEntry = (entry: CoachMessage) => {
    try {
      const savedEntry: SavedCoachMessage = {
        ...entry,
        savedAt: new Date().toISOString(),
        lessonTitle: lesson.lessonTitle,
        challengeId: challenge?.id ?? undefined,
      }
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
      let saved: SavedCoachMessage[] = []
      if (raw) {
        try {
          saved = JSON.parse(raw)
        } catch (err) {
          console.error("Failed to parse saved study coach entries:", err)
        }
      }
      const filtered = saved.filter((item) => item.id !== savedEntry.id)
      const updated = [savedEntry, ...filtered]
      syncSavedEntries(updated)
      setNotice("Saved locally.")
    } catch (err) {
      console.error("Failed to save study coach response:", err)
      setNotice("Unable to save locally.")
    }
  }

  const handleCopyEntry = async (entry: CoachMessage) => {
    try {
      await navigator.clipboard.writeText(entry.answer || "")
      setNotice("Copied to clipboard.")
    } catch (err) {
      console.error("Copy failed:", err)
      setNotice("Copy failed.")
    }
  }

  const handleExportEntry = (entry: CoachMessage) => {
    try {
      const blob = new Blob([
        `=== Study Coach Response ===\n`,
        `Lesson: ${lesson.lessonTitle}\n`,
        `Prompt: ${entry.prompt}\n`,
        `Engine: ${entry.engine}\n`,
        `---\n`,
        entry.answer,
      ])
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `study-coach-${entry.id.slice(0, 8)}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setNotice("Downloaded response.")
    } catch (err) {
      console.error("Download failed:", err)
      setNotice("Download failed.")
    }
  }

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 3000)
    return () => clearTimeout(timer)
  }, [notice])

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

      {notice && (
        <div className='rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'>
          {notice}
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
                    <div className='flex items-center justify-end gap-2 pb-2 text-xs text-gray-500 dark:text-gray-400'>
                      <button
                        type='button'
                        className='px-2 py-1 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800'
                        onClick={() => handleCopyEntry(message)}
                      >
                        Copy
                      </button>
                      <button
                        type='button'
                        className='px-2 py-1 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800'
                        onClick={() => handleExportEntry(message)}
                      >
                        Download
                      </button>
                      <button
                        type='button'
                        className={cn(
                          "px-2 py-1 border rounded-md",
                          savedIds.has(message.id)
                            ? "border-emerald-300 text-emerald-600 bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200 dark:bg-emerald-900/30"
                            : "border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-200",
                        )}
                        onClick={() => handleSaveEntry(message)}
                      >
                        {savedIds.has(message.id) ? "Saved" : "Save"}
                      </button>
                    </div>
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
