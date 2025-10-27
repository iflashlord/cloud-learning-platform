"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Loader2, Sparkles, X } from "lucide-react"
import { toast } from "sonner"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { renderMarkdownToHtml } from "@/lib/markdown"

type ChallengeSummary = {
  id: number
  type: string
  question: string
  hint: string | null
  order: number
  answers: string[]
  options: {
    id: number
    text: string | null
    value: string | null
    correct: boolean
    order: number | null
  }[]
}

type LessonSummary = {
  id: number
  title: string
  order: number
  challenges: ChallengeSummary[]
}

type UnitSummaryPayload = {
  id: number
  title: string
  description: string | null
  lessons: LessonSummary[]
}

type UnitSummaryButtonProps = {
  unitId: number
  unitTitle: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  className?: string
  fullWidth?: boolean
  label?: string
  ariaLabel?: string
}

type SummarizerLike = {
  summarize: (input: { text: string }) => Promise<any>
}

declare global {
  interface Navigator {
    ai?: any
  }

  interface Window {
    ai?: any
  }
}

const buildPromptFromPayload = (payload: UnitSummaryPayload) => {
  const headerParts = [
    `AWS Course Unit: ${payload.title}`,
    payload.description ? `Overview: ${payload.description}` : "",
  ].filter(Boolean)

  const lessonsText = payload.lessons
    .sort((a, b) => a.order - b.order)
    .map((lesson, index) => {
      const lessonHeader = `Lesson ${index + 1}: ${lesson.title}`

      if (!lesson.challenges.length) {
        return `${lessonHeader}\nQuestions:\n- (No assessment questions yet)`
      }

      const questions = lesson.challenges
        .sort((a, b) => a.order - b.order)
        .map((challenge) => `- ${challenge.question}`)
        .join("\n")

      return `${lessonHeader}\nQuestions:\n${questions}`
    })

  return [...headerParts, ...lessonsText].join("\n\n")
}

const parseSummaryResult = (result: any): string => {
  if (!result) {
    return "Chrome AI did not return a summary."
  }

  if (typeof result === "string") {
    return result
  }

  if (typeof result.summary === "string") {
    return result.summary
  }

  if (Array.isArray(result.summaries)) {
    return result.summaries
      .map((item) => (typeof item === "string" ? item : item?.summary))
      .filter(Boolean)
      .join("\n")
  }

  if (typeof result.result === "string") {
    return result.result
  }

  try {
    return JSON.stringify(result)
  } catch {
    return "Unable to interpret summary output."
  }
}

const ensureDialogElement = (dialog: HTMLDialogElement | null) => {
  if (!dialog) {
    return
  }

  if (typeof dialog.showModal !== "function") {
    console.warn("HTMLDialogElement.showModal is not available in this environment.")
    return
  }

  if (!dialog.open) {
    dialog.showModal()
  }
}

const getChromeSummarizer = async (): Promise<SummarizerLike | null> => {
  if (typeof window === "undefined") {
    return null
  }

  const aiNamespace =
    (navigator as any)?.ai?.summarizer ??
    (window as any)?.ai?.summarizer ??
    (globalThis as any)?.Summarizer ??
    null

  if (!aiNamespace) {
    return null
  }

  const availabilityFn =
    typeof aiNamespace.availability === "function"
      ? aiNamespace.availability.bind(aiNamespace)
      : typeof aiNamespace.capabilities === "function"
      ? aiNamespace.capabilities.bind(aiNamespace)
      : undefined

  if (availabilityFn) {
    try {
      const availability = await availabilityFn()
      const status =
        typeof availability === "string"
          ? availability
          : availability?.available ?? availability?.status

      if (["no", "unavailable"].includes(status)) {
        return null
      }

      if (["after-download", "downloadable"].includes(status)) {
        throw new Error(
          "Chrome is still downloading the on-device Gemini Nano model. Please keep this tab open and try again shortly.",
        )
      }
    } catch (error) {
      console.warn("Failed to check Chrome summarizer availability", error)
    }
  }

  if (
    typeof navigator !== "undefined" &&
    navigator.userActivation &&
    !navigator.userActivation.isActive
  ) {
    throw new Error(
      "Chrome needs a fresh user gesture to launch the summarizer. Click the button again to retry.",
    )
  }

  const createFn =
    typeof aiNamespace.create === "function"
      ? aiNamespace.create.bind(aiNamespace)
      : typeof aiNamespace.summarizer?.create === "function"
      ? aiNamespace.summarizer.create.bind(aiNamespace.summarizer)
      : undefined

  if (!createFn) {
    return null
  }

  try {
    const summarizer = await createFn({
      sharedContext:
        "Summarize AWS certification course content into key bullet points describing what learners will cover, using only the supplied assessment questions.",
      type: "key-points",
      format: "markdown",
      length: "medium",
    })

    if (summarizer?.summarize) {
      return summarizer
    }
  } catch (error: any) {
    if (error?.name === "NotAllowedError") {
      throw new Error(
        "Chrome blocked the summarizer because it requires a current user interaction. Please click the button again without switching tabs.",
      )
    }

    if (error?.name === "InvalidStateError") {
      throw new Error(
        "Chrome is preparing the on-device model. Wait for the download to finish, then try again.",
      )
    }

    console.warn("Chrome summarizer creation failed", error)
  }

  return null
}

export const UnitSummaryButton = ({
  unitId,
  unitTitle,
  variant = "ai",
  size = "sm",
  className,
  fullWidth = false,
  label,
  ariaLabel,
}: UnitSummaryButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [summaryText, setSummaryText] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    const handleCancel = () => {
      setSummaryText(null)
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
    setSummaryText(null)
    setErrorMessage(null)
  }, [])

  const handleSummarize = useCallback(async () => {
    setLoading(true)
    setSummaryText(null)
    setErrorMessage(null)

    try {
      const summarizer = await getChromeSummarizer()

      if (!summarizer) {
        toast.error(
          "Chrome's on-device summarizer isn't available in this build. Please update Chrome Canary and enable chrome://flags/#prompt-api-for-gemini-nano.",
        )
        return
      }

      ensureDialogElement(dialogRef.current)

      const response = await fetch(`/api/units/${unitId}/summary`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        const message = await response.json().catch(() => ({}))
        throw new Error(message?.error || "Failed to load unit content for summary.")
      }

      const payload = (await response.json()) as UnitSummaryPayload

      const prompt = buildPromptFromPayload(payload)
      const result = await summarizer.summarize(prompt, {
        context:
          "Summarize these AWS certification assessment questions into bullet points describing what the learner will cover, key concepts, and expected skills. Avoid repeating the questions verbatim.",
      })
      const summary = parseSummaryResult(result)

      setSummaryText(summary)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to generate a summary at this time."

      setErrorMessage(message)
      ensureDialogElement(dialogRef.current)
    } finally {
      setLoading(false)
    }
  }, [unitId])

  const buttonLabel = useMemo(() => {
    if (loading) {
      return label === "" ? "" : "Summarizing..."
    }

    if (label !== undefined) {
      return label
    }

    return "Summarize"
  }, [label, loading])

  const summaryHtml = useMemo(
    () => (summaryText ? renderMarkdownToHtml(summaryText) : ""),
    [summaryText],
  )

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleSummarize}
        disabled={loading}
        className={cn("flex items-center gap-2", fullWidth && "w-full", className)}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : <Sparkles className='h-4 w-4' />}
        {buttonLabel}
      </Button>

      <dialog
        ref={dialogRef}
        className='backdrop:bg-black/50 rounded-xl p-0 border border-border shadow-2xl max-w-2xl w-[min(90vw,640px)]'
      >
        <div className='p-6 space-y-4'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <h2 className='text-lg font-semibold text-foreground'>{unitTitle} — AI Summary</h2>
              <p className='text-sm text-muted-foreground'>
                Generated with Chrome&apos;s built-in summarizer.
              </p>
            </div>
            <Button variant='ghost' size='icon' className='h-8 w-8' onClick={closeDialog}>
              <X className='h-4 w-4' />
            </Button>
          </div>

          {summaryHtml && (
            <div
              className='rounded-lg border bg-muted/60 p-4 text-sm leading-relaxed text-foreground [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mt-1.5 [&>p]:mb-2 [&>ol]:list-decimal [&>ol]:pl-5'
              dangerouslySetInnerHTML={{ __html: summaryHtml }}
            />
          )}

          {summaryText && !summaryHtml && (
            <div className='rounded-lg border bg-muted/60 p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap'>
              {summaryText}
            </div>
          )}

          {errorMessage && (
            <div className='rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm leading-relaxed text-destructive'>
              {errorMessage}
            </div>
          )}

          {!summaryText && !errorMessage && (
            <div className='flex items-center gap-3 text-sm text-muted-foreground'>
              <Loader2 className='h-4 w-4 animate-spin' />
              Gathering unit content…
            </div>
          )}

          <div className='flex justify-end gap-2'>
            <Button variant='outline' size='sm' onClick={closeDialog}>
              Close
            </Button>
          </div>
        </div>
      </dialog>
    </>
  )
}
