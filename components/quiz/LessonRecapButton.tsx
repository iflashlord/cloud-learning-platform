"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { renderMarkdownToHtml } from "@/lib/markdown"
import { resolveLanguageModelApi } from "@/lib/ai/chrome-ai-utils"
import { AiDialog } from "@/components/ai/ai-dialog"

type LessonRecapChallenge = {
  id: number
  order: number
  type: string
  question: string
  hint: string | null
  answers: string[]
}

type LessonRecapPayload = {
  id: number
  title: string
  order: number
  unit: {
    id: number
    title?: string | null
    course: {
      id: number
      title?: string | null
    } | null
  } | null
  challenges: LessonRecapChallenge[]
}

export type LessonRecapButtonProps = {
  lessonId: number
  lessonTitle: string
  unitTitle?: string | null
  courseTitle?: string | null
  className?: string
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
  fullWidth?: boolean
  label?: string
  ariaLabel?: string
}

const ensureDialogElement = (dialog: HTMLDialogElement | null) => {
  if (!dialog) {
    return null
  }

  if (typeof dialog.showModal !== "function") {
    console.warn("HTMLDialogElement.showModal is not available in this environment.")
    return dialog
  }

  if (!dialog.open) {
    dialog.showModal()
  }

  return dialog
}

const buildPromptFromPayload = (payload: LessonRecapPayload) => {
  const headerLines = [
    `Course: ${payload.unit?.course?.title ?? "Unknown Course"}`,
    `Unit: ${payload.unit?.title ?? "Unknown Unit"}`,
    `Lesson: ${payload.title}`,
    `Question count: ${payload.challenges.length}`,
  ]

  const challengeLines = payload.challenges
    .sort((a, b) => a.order - b.order)
    .map((challenge, index) => {
      const answers =
        challenge.answers.length > 0 ? challenge.answers.join("; ") : "No correct answer recorded"

      const hintLine = challenge.hint ? `Hint: ${challenge.hint}` : null

      const segments = [
        `Question ${index + 1}: ${challenge.question}`,
        `Correct answer(s): ${answers}`,
        hintLine,
      ].filter(Boolean)

      return segments.join("\n")
    })

  return [
    headerLines.join("\n"),
    "Use the assessment items below to extract the key knowledge this lesson reinforces for AWS learners. Focus on concepts, AWS services, and skills implied by the correct answers.",
    challengeLines.join("\n\n"),
    "Create a concise recap covering:",
    "- 3-5 bullet points summarizing the main takeaways.",
    "- A short paragraph connecting those takeaways into a narrative.",
    "- One actionable practice suggestion the learner can try next.",
    "Keep the tone motivating and learner-friendly.",
  ].join("\n\n")
}

const parsePromptResult = (result: unknown) => {
  if (!result) {
    return "Chrome Prompt API did not return any output."
  }

  if (typeof result === "string") {
    return result
  }

  if (typeof result === "object") {
    const candidate =
      (result as { output?: string; outputText?: string }).output ??
      (result as { output?: string; outputText?: string }).outputText

    if (candidate) {
      return candidate
    }

    try {
      return JSON.stringify(result)
    } catch {
      return "Unable to interpret prompt output."
    }
  }

  return String(result)
}

export const LessonRecapButton = ({
  lessonId,
  lessonTitle,
  unitTitle,
  courseTitle,
  className,
  variant = "ai",
  size = "sm",
  fullWidth = false,
  label,
  ariaLabel,
}: LessonRecapButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [recapText, setRecapText] = useState<string | null>(null)
  const [recapHtml, setRecapHtml] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    const handleCancel = () => {
      setRecapText(null)
      setRecapHtml(null)
      setErrorMessage(null)
    }

    dialog.addEventListener("cancel", handleCancel)
    return () => {
      dialog.removeEventListener("cancel", handleCancel)
    }
  }, [])

  const closeDialog = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }
    dialog.close()
    setRecapText(null)
    setRecapHtml(null)
    setErrorMessage(null)
  }, [])

  const handleRecap = useCallback(async () => {
    setLoading(true)
    setRecapText(null)
    setRecapHtml(null)
    setErrorMessage(null)

    let session: any = null

    try {
      const languageModelApi = resolveLanguageModelApi()
      if (!languageModelApi?.create) {
        toast.error(
          "Chrome Prompt API is unavailable. Please use Chrome Canary with chrome://flags/#prompt-api-for-gemini-nano enabled.",
        )
        return
      }

      const response = await fetch(`/api/lessons/${lessonId}/recap`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(
          data?.error ||
            "Failed to load lesson data. Complete the lesson before requesting a recap.",
        )
      }

      const payload = (await response.json()) as LessonRecapPayload

      session = await languageModelApi.create({
        temperature: 0.4,
        topK: 8,
        initialPrompts: [
          {
            role: "system",
            content: [
              "You are an AWS certification mentor.",
              "Create motivating recaps that reinforce knowledge using only the supplied lesson data.",
              "Avoid fabricating AWS services or features that were not implied by the questions or answers.",
            ].join(" "),
          },
        ],
      })

      if (!session?.prompt) {
        throw new Error("Chrome Prompt API session could not be created.")
      }

      ensureDialogElement(dialogRef.current)

      const prompt = buildPromptFromPayload({
        ...payload,
        unit: payload.unit ?? {
          id: -1,
          title: unitTitle ?? null,
          course: courseTitle
            ? {
                id: -1,
                title: courseTitle,
              }
            : null,
        },
      })

      const result = await session.prompt(prompt)
      const formatted = parsePromptResult(result)
      setRecapText(formatted)
      setRecapHtml(renderMarkdownToHtml(formatted))
    } catch (error) {
      console.error("Failed to generate lesson recap:", error)
      const message =
        error instanceof Error ? error.message : "Unable to generate the lesson recap right now."
      setErrorMessage(message)
      ensureDialogElement(dialogRef.current)
    } finally {
      setLoading(false)
      session?.destroy?.()
    }
  }, [courseTitle, lessonId, unitTitle])

  const buttonLabel = useMemo(() => {
    if (loading) {
      return label === "" ? "" : "Preparing recap..."
    }

    if (label !== undefined) {
      return label
    }

    return "Lesson recap"
  }, [label, loading])

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-blue-200 bg-blue-50/60 dark:border-blue-700/60 dark:bg-blue-900/20 p-4",
          fullWidth && "w-full",
        )}
      >
        <div className='flex flex-col gap-3'>
          <div className='flex items-start gap-2 text-sm text-blue-900 dark:text-blue-200'>
            <Sparkles className='mt-0.5 h-4 w-4 shrink-0' />
            <p>
              Chrome AI can recap the key takeaways using the questions you just mastered, open it
              anytime to refresh your memory.
            </p>
          </div>
          <Button
            variant={variant}
            size={size}
            onClick={handleRecap}
            disabled={loading}
            className={cn("flex items-center gap-2 self-start", className)}
            aria-label={ariaLabel ?? `Recap ${lessonTitle}`}
            title={ariaLabel ?? `Recap ${lessonTitle}`}
          >
            {loading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Sparkles className='h-4 w-4' />
            )}
            {buttonLabel}
          </Button>
        </div>
      </div>

      <AiDialog
        ref={dialogRef}
        title={`${lessonTitle} — Chrome AI Recap`}
        subtitle="Generated with Chrome's Prompt API on your device."
        onClose={closeDialog}
        footer={
          <Button variant='outline' size='sm' onClick={closeDialog}>
            Close
          </Button>
        }
      >
        {recapHtml && (
          <div
            className='rounded-lg border bg-muted/60 p-4 text-sm leading-relaxed text-foreground [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mt-1.5 [&>p]:mb-2 [&>ol]:list-decimal [&>ol]:pl-5'
            dangerouslySetInnerHTML={{ __html: recapHtml }}
          />
        )}

        {recapText && !recapHtml && (
          <div className='rounded-lg border bg-muted/60 p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap'>
            {recapText}
          </div>
        )}

        {errorMessage && (
          <div className='rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm leading-relaxed text-destructive'>
            {errorMessage}
          </div>
        )}

        {!recapText && !errorMessage && (
          <div className='flex items-center gap-3 text-sm text-muted-foreground'>
            <Loader2 className='h-4 w-4 animate-spin' />
            Gathering lesson insights…
          </div>
        )}
      </AiDialog>
    </>
  )
}
