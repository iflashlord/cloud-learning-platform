"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Sparkles,
  Crown,
  Zap,
  WifiOff,
  Lightbulb,
  BookOpen,
  Target,
  HelpCircle,
  Loader2,
  AlertCircle,
  SlidersHorizontal,
  Activity,
  Gauge,
  Hash,
  Save,
  Copy,
  Download,
  Info,
  Trash2,
} from "lucide-react"
import {
  resolveAssistantApi,
  resolveLanguageModelApi,
  resolveSummarizerApi,
} from "@/lib/ai/chrome-ai-utils"

type ConversationEntry = {
  id: string
  prompt: string
  answer: string
  origin: string
  originLabel: string
  engine: "assistant" | "prompt"
  createdAt: string
}

type ExternalPromptRequest = {
  id: string
  label: string
  prompt: string
  preferredEngine?: "assistant" | "prompt"
}

type PromptExecutionRequest = {
  prompt: string
  label: string
  origin: string
  preferredEngine?: "assistant" | "prompt"
  trackActionId?: string | null
  requestId?: string
  isExternal?: boolean
  onComplete?: (entry: ConversationEntry) => void
}

type SavedConversationEntry = ConversationEntry & { savedAt?: string }

const SAVED_STORAGE_KEY = "aws-learning-ai-assistant-saved"


const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const formatInlineMarkdown = (value: string) => {
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

const renderMarkdownToHtml = (markdown: string) => {
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

const formatTimestamp = (isoDate: string) => {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

const getConversationId = () => {
  if (typeof crypto !== "undefined" && crypto?.randomUUID) {
    return crypto.randomUUID()
  }

  return `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

interface AILearningAssistantProps {
  lessonData: any
  completionData: any
  isPro?: boolean
  isFullWidth?: boolean
  externalRequest?: ExternalPromptRequest | null
  onExternalRequestConsumed?: (id: string) => void
}

export const AILearningAssistant = ({
  lessonData,
  completionData,
  isPro = false,
  isFullWidth = false,
  externalRequest = null,
  onExternalRequestConsumed,
}: AILearningAssistantProps) => {
  const [chromeAISupported, setChromeAISupported] = useState(false)
  const [aiCapabilities, setAiCapabilities] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState("")
  const [aiSession, setAiSession] = useState<any>(null)
  const [lessonSummary, setLessonSummary] = useState<string | null>(null)
  const [promptSession, setPromptSession] = useState<any>(null)
  const [promptConfig, setPromptConfig] = useState({ temperature: 0.7, topK: 8 })
  const [promptConfigLimits, setPromptConfigLimits] = useState({ maxTemperature: 2, maxTopK: 64 })
  const [promptStats, setPromptStats] = useState<{
    maxTokens?: number
    tokensUsed?: number
    tokensLeft?: number
  } | null>(null)
  const [promptInputCost, setPromptInputCost] = useState<number | null>(null)
  const [engineMode, setEngineMode] = useState<"assistant" | "prompt">("assistant")
  const [promptApiAvailable, setPromptApiAvailable] = useState(false)
  const [conversation, setConversation] = useState<ConversationEntry[]>([])
  const [liveEntry, setLiveEntry] = useState<ConversationEntry | null>(null)
  const [savedHistory, setSavedHistory] = useState<SavedConversationEntry[]>([])
  const [savedEntries, setSavedEntries] = useState<Set<string>>(new Set())
  const [actionNotice, setActionNotice] = useState<string | null>(null)
  const summaryPromiseRef = useRef<Promise<string | null> | null>(null)
  const engineInitializedRef = useRef(false)
  const promptDefaultsLoadedRef = useRef(false)
  const lastExternalRequestIdRef = useRef<string | null>(null)
  const actionNoticeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const checkChromeAI = useCallback(async () => {
    try {
      if (typeof window === "undefined") return

      const assistantApi = resolveAssistantApi()
      const summarizerApi = resolveSummarizerApi()
      const languageModelApi = resolveLanguageModelApi()

      const hasAssistant = Boolean(assistantApi)
      const hasSummarizer = Boolean(summarizerApi)
      const hasLanguageModel = Boolean(languageModelApi)

      if (hasLanguageModel && !promptDefaultsLoadedRef.current) {
        await loadPromptDefaults()
      }

      setChromeAISupported(hasAssistant || hasLanguageModel)
      setPromptApiAvailable(hasLanguageModel)
      setAiCapabilities({
        assistant: hasAssistant ? "available" : "unavailable",
        summarizer: hasSummarizer ? "available" : "unavailable",
        prompt: hasLanguageModel ? "available" : "unavailable",
      })
    } catch (error) {
      console.log("Chrome AI not available:", error)
      setChromeAISupported(false)
      setPromptApiAvailable(false)
      setAiCapabilities(null)
    }
  }, [])

  useEffect(() => {
    void checkChromeAI()
  }, [checkChromeAI])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    try {
      const stored = window.localStorage.getItem(SAVED_STORAGE_KEY)
      if (!stored) {
        return
      }
      const parsed: SavedConversationEntry[] = JSON.parse(stored)
      setSavedHistory(parsed)
      setSavedEntries(new Set(parsed.map((entry) => entry.id)))
    } catch (error) {
      console.error("Failed to load saved AI history:", error)
    }
  }, [])

  useEffect(() => {
    return () => {
      aiSession?.destroy?.()
    }
  }, [aiSession])

  useEffect(() => {
    return () => {
      promptSession?.destroy?.()
    }
  }, [promptSession])

  useEffect(() => {
    if (!aiCapabilities || engineInitializedRef.current) {
      return
    }
    if (aiCapabilities.assistant === "available") {
      setEngineMode("assistant")
      engineInitializedRef.current = true
    } else if (aiCapabilities.prompt === "available") {
      setEngineMode("prompt")
      engineInitializedRef.current = true
    }
  }, [aiCapabilities])

  useEffect(() => {
    if (!promptSession) {
      return
    }

    promptSession.destroy?.()
    setPromptSession(null)
    setPromptStats(null)
    setPromptInputCost(null)
  }, [promptConfig.temperature, promptConfig.topK, promptSession])

  useEffect(() => {
    return () => {
      if (actionNoticeTimeoutRef.current) {
        clearTimeout(actionNoticeTimeoutRef.current)
      }
    }
  }, [])

  const loadPromptDefaults = async () => {
    try {
      if (typeof window === "undefined") return
      const languageModelApi = resolveLanguageModelApi()
      if (!languageModelApi?.params || promptDefaultsLoadedRef.current) {
        return
      }

      const params = await languageModelApi.params()

      setPromptConfig({
        temperature: params?.defaultTemperature ?? 0.7,
        topK: params?.defaultTopK ?? 8,
      })
      setPromptConfigLimits({
        maxTemperature: params?.maxTemperature ?? 2,
        maxTopK: params?.maxTopK ?? 128,
      })
    } catch (error) {
      console.error("Failed to load prompt defaults:", error)
    } finally {
      promptDefaultsLoadedRef.current = true
    }
  }

  const getLessonSummary = async () => {
    if (lessonSummary) {
      return lessonSummary
    }

    if (summaryPromiseRef.current) {
      return summaryPromiseRef.current
    }

    if (typeof window === "undefined") {
      return null
    }

    const globalScope = window as any
    const summarizerApi = globalScope.Summarizer || globalScope.ai?.summarizer

    if (!summarizerApi?.create) {
      return null
    }

    const summaryPromise = (async () => {
      try {
        if (globalScope.Summarizer?.availability) {
          const availability = await globalScope.Summarizer.availability()
          if (availability === "unavailable") {
            return null
          }
        }

        const summarizer = await summarizerApi.create({
          type: "key-points",
          length: "short",
          format: "plain-text",
          sharedContext: `Lesson review material for ${
            lessonData?.unit?.course?.title ?? "Course"
          } / ${lessonData?.unit?.title ?? "Unit"}.`,
        })

        const objectives: string[] = Array.isArray(lessonData?.objectives)
          ? lessonData.objectives
          : []
        const challenges: any[] = Array.isArray(lessonData?.challenges)
          ? lessonData.challenges
          : []

        const lessonContent = [
          `Lesson title: ${lessonData?.title ?? "Lesson"}`,
          `Unit: ${lessonData?.unit?.title ?? "Unit"}`,
          `Course: ${lessonData?.unit?.course?.title ?? "Course"}`,
          `Score: ${completionData?.score ?? 0}%`,
          ``,
          `Learning objectives:`,
          ...objectives.map(
            (objective: string, index: number) => `${index + 1}. ${objective}`,
          ),
          ``,
          `Challenge highlights:`,
          ...challenges.map(
            (challenge: any, index: number) =>
              `${index + 1}. ${challenge.question}${
                challenge.explanation ? ` Explanation: ${challenge.explanation}` : ""
              }`,
          ),
        ]
          .filter(Boolean)
          .join("\n")

        const summaryResult = await summarizer.summarize(lessonContent, {
          context:
            "Create a concise teaching summary to brief an AI tutor before answering student follow-up questions.",
        })

        const summaryText =
          typeof summaryResult === "string"
            ? summaryResult
            : summaryResult?.summary || summaryResult?.summaries?.join("\n")

        summarizer.destroy?.()

        if (summaryText) {
          setLessonSummary(summaryText)
          return summaryText
        }

        return null
      } catch (error) {
        console.error("Failed to summarize lesson content:", error)
        return null
      } finally {
        summaryPromiseRef.current = null
      }
    })()

    summaryPromiseRef.current = summaryPromise
    return summaryPromise
  }

  const buildSystemPrompt = (summaryText?: string | null) => {
    const challenges: any[] = Array.isArray(lessonData?.challenges)
      ? lessonData.challenges
      : []
    const snippetLimit = summaryText ? 5 : Math.min(challenges.length, 8)
    const challengeSnippets = challenges
      .slice(0, snippetLimit)
      .map((challenge: any, index: number) => {
        const answer = challenge.correctAnswer
          ? ` — Correct answer: ${challenge.correctAnswer}`
          : ""
        return `${index + 1}. ${challenge.question}${answer}`
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

  const initializeAI = async () => {
    if (!(window as any).ai?.assistant) return null

    try {
      const summary = await getLessonSummary()

      const systemPrompt = buildSystemPrompt(summary)

      const session = await (window as any).ai.assistant.create({
        systemPrompt,
        temperature: 0.7,
        topK: 8,
      })

      setAiSession(session)
      return session
    } catch (error) {
      console.error("Failed to initialize AI:", error)
      return null
    }
  }

  const updatePromptStats = (session: any) => {
    if (!session) return

    const maxTokens = session.inputQuota ?? session.maxTokens
    const tokensUsed = session.inputUsage ?? session.tokensSoFar
    const tokensLeft =
      typeof maxTokens === "number" && typeof tokensUsed === "number"
        ? Math.max(maxTokens - tokensUsed, 0)
        : undefined

    setPromptStats({
      maxTokens,
      tokensUsed,
      tokensLeft,
    })
  }

  const measurePromptTokens = async (session: any, value: string) => {
    if (!session || !value.trim()) {
      setPromptInputCost(null)
      return
    }

    try {
      if (session.countPromptTokens) {
        const tokens = await session.countPromptTokens(value)
        setPromptInputCost(tokens)
      } else if (session.measureInputUsage) {
        const usage = await session.measureInputUsage(value)
        const numericUsage = typeof usage === "number" ? usage : usage?.tokens ?? usage?.inputTokens
        if (typeof numericUsage === "number") {
          setPromptInputCost(numericUsage)
        } else {
          setPromptInputCost(null)
        }
      }
    } catch (error) {
      console.error("Failed to measure prompt tokens:", error)
      setPromptInputCost(null)
    }
  }

  const ensurePromptSession = async () => {
    if (promptSession) {
      return promptSession
    }

    if (typeof window === "undefined") {
      return null
    }

    const languageModelApi = resolveLanguageModelApi()
    if (!languageModelApi?.create) {
      return null
    }

    try {
      const summary = await getLessonSummary()
      const session = await languageModelApi.create({
        temperature: Number(promptConfig.temperature),
        topK: Number(promptConfig.topK),
        initialPrompts: [
          {
            role: "system",
            content: buildSystemPrompt(summary),
          },
        ],
      })

      setPromptSession(session)
      updatePromptStats(session)
      if (customPrompt.trim()) {
        measurePromptTokens(session, customPrompt.trim())
      }
      return session
    } catch (error) {
      console.error("Failed to initialize prompt playground session:", error)
      return null
    }
  }

  const runPromptWithLanguageModel = async (aiPrompt: string, entry: ConversationEntry) => {
    const session = await ensurePromptSession()
    if (!session) {
      setLiveEntry({
        ...entry,
        answer:
          "Chrome Prompt API is unavailable. Make sure Chrome's built-in AI flags are enabled.",
      })
      return "Chrome Prompt API is unavailable. Make sure Chrome's built-in AI flags are enabled."
    }

    try {
      if (session.promptStreaming) {
        let combined = ""
        const stream = await session.promptStreaming(aiPrompt)
        for await (const chunk of stream) {
          const chunkText =
            typeof chunk === "string"
              ? chunk
              : chunk?.output ?? chunk?.outputText ?? JSON.stringify(chunk)
          if (!chunkText) continue
          combined += chunkText
          setLiveEntry((prev) =>
            prev && prev.id === entry.id ? { ...prev, answer: combined } : prev,
          )
        }
        updatePromptStats(session)
        return combined
      }

      const response = await session.prompt(aiPrompt)
      const output =
        typeof response === "string"
          ? response
          : response?.output ?? response?.outputText ?? JSON.stringify(response)
      setLiveEntry((prev) => (prev && prev.id === entry.id ? { ...prev, answer: output } : prev))
      updatePromptStats(session)
      return output
    } catch (error) {
      console.error("Chrome Prompt API call failed:", error)
      setLiveEntry({
        ...entry,
        answer: "Sorry, the Chrome Prompt API call failed. Please try again.",
      })
      return "Sorry, the Chrome Prompt API call failed. Please try again."
    }
  }

  const processPrompt = async ({
    prompt,
    label,
    origin,
    preferredEngine,
    trackActionId,
    requestId,
    isExternal = false,
    onComplete,
  }: PromptExecutionRequest) => {
    const actionId = trackActionId ?? null
    if (actionId) {
      setSelectedAction(actionId)
    } else {
      setSelectedAction(null)
    }
    setIsLoading(true)

    let entry: ConversationEntry = {
      id: requestId || getConversationId(),
      prompt: prompt.trim(),
      answer: "",
      origin,
      originLabel: label,
      engine: "assistant",
      createdAt: new Date().toISOString(),
    }

    let finalAnswer: string | null = null

    try {
      const assistantAvailable = aiCapabilities?.assistant === "available"
      let engine: "assistant" | "prompt" = "assistant"

      if (preferredEngine === "prompt" && promptApiAvailable) {
        engine = "prompt"
      } else if (preferredEngine === "assistant") {
        engine = "assistant"
      } else if (promptApiAvailable && (engineMode === "prompt" || !assistantAvailable)) {
        engine = "prompt"
      }

      if (engine === "assistant" && !assistantAvailable && promptApiAvailable) {
        engine = "prompt"
      }

      if (engine === "assistant" && !assistantAvailable && !promptApiAvailable) {
        finalAnswer = "AI assistant is unavailable in this browser."
        entry = { ...entry, engine, answer: finalAnswer }
        setLiveEntry(entry)
      } else if (engine === "prompt") {
        entry = { ...entry, engine: "prompt" }
        setLiveEntry(entry)
        const promptAnswer = await runPromptWithLanguageModel(prompt, entry)
        finalAnswer = promptAnswer
        entry = { ...entry, answer: promptAnswer ?? "", engine: "prompt" }
        setLiveEntry(entry)
      } else {
        if (promptStats) {
          setPromptStats(null)
        }
        entry = { ...entry, engine: "assistant" }
        setLiveEntry(entry)
        let session = aiSession
        if (!session) {
          session = await initializeAI()
        }
        if (!session) {
          finalAnswer = "Failed to initialize AI assistant. Please try again."
          entry = { ...entry, answer: finalAnswer }
          setLiveEntry(entry)
        } else {
          const response = await session.prompt(prompt)
          const assistantAnswer = typeof response === "string" ? response : JSON.stringify(response)
          finalAnswer = assistantAnswer
          entry = { ...entry, answer: assistantAnswer ?? "" }
          setLiveEntry(entry)
        }
      }
    } catch (error) {
      console.error("AI request failed:", error)
      finalAnswer = "Sorry, I couldn't process your request. Please try again."
      entry = { ...entry, answer: finalAnswer }
      setLiveEntry(entry)
    } finally {
      const hasAnswer = entry.answer && entry.answer.toString().trim().length > 0
      if (hasAnswer) {
        setConversation((prev) => [entry, ...prev])
      }
      if (isExternal && requestId) {
        onExternalRequestConsumed?.(requestId)
      }
      if (onComplete) {
        onComplete(entry)
      }
      setIsLoading(false)
      setSelectedAction(null)
      setPromptInputCost(null)
      setLiveEntry(null)
    }
  }

  const showActionNotice = (message: string) => {
    if (actionNoticeTimeoutRef.current) {
      clearTimeout(actionNoticeTimeoutRef.current)
    }
    setActionNotice(message)
    actionNoticeTimeoutRef.current = setTimeout(() => {
      setActionNotice(null)
    }, 4000)
  }

  const syncSavedHistory = (entries: SavedConversationEntry[]) => {
    if (typeof window === "undefined") {
      return
    }
    window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(entries))
  }

  useEffect(() => {
    if (!externalRequest) {
      return
    }
    if (externalRequest.id === lastExternalRequestIdRef.current) {
      return
    }
    lastExternalRequestIdRef.current = externalRequest.id

    void processPrompt({
      prompt: externalRequest.prompt,
      label: externalRequest.label,
      origin: "external",
      preferredEngine: externalRequest.preferredEngine,
      requestId: externalRequest.id,
      isExternal: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalRequest])

  const handleCustomPromptChange = (value: string) => {
    setCustomPrompt(value)

    if (!promptApiAvailable) {
      setPromptInputCost(null)
      return
    }

    if (!value.trim()) {
      setPromptInputCost(null)
      return
    }

    if (promptSession) {
      measurePromptTokens(promptSession, value)
    }
  }

  const buildPlaintextExport = (entry: ConversationEntry) => {
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

  const handleSaveEntry = (entry: ConversationEntry) => {
    try {
      const entryWithTimestamp: SavedConversationEntry = {
        ...entry,
        savedAt: new Date().toISOString(),
      }
      const filtered = savedHistory.filter((item) => item.id !== entry.id)
      const updated = [entryWithTimestamp, ...filtered].slice(0, 100)
      setSavedHistory(updated)
      syncSavedHistory(updated)
      setSavedEntries(new Set(updated.map((item) => item.id)))
      showActionNotice("Saved locally in this browser.")
    } catch (error) {
      console.error("Failed to save entry locally:", error)
      showActionNotice("Unable to save locally (storage may be disabled).")
    }
  }

  const handleCopyEntry = async (entry: ConversationEntry) => {
    try {
      await navigator.clipboard.writeText(buildPlaintextExport(entry))
      showActionNotice("Copied response to clipboard.")
    } catch (error) {
      console.error("Failed to copy entry:", error)
      showActionNotice("Clipboard copy failed.")
    }
  }

  const handleExportEntry = (entry: ConversationEntry) => {
    try {
      const text = buildPlaintextExport(entry)
      const blob = new Blob([text], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `lesson-ai-response-${entry.id.slice(0, 8)}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      showActionNotice("Downloaded response as text file.")
    } catch (error) {
      console.error("Failed to export entry:", error)
      showActionNotice("Export failed. Please try again.")
    }
  }

  const handleDeleteSavedEntry = (entryId: string) => {
    setSavedHistory((prev) => {
      const updated = prev.filter((item) => item.id !== entryId)
      syncSavedHistory(updated)
      setSavedEntries((prevSet) => {
        const next = new Set(prevSet)
        next.delete(entryId)
        return next
      })
      return updated
    })
    showActionNotice("Removed from saved history.")
  }

  const handleAIAction = async (action: string, prompt?: string) => {
    let aiPrompt = ""

    switch (action) {
      case "explain":
        aiPrompt =
          "Explain the key concepts from this lesson in simple terms. What are the main learning objectives?"
        break
      case "examples":
        aiPrompt =
          "Provide real-world examples that demonstrate the concepts taught in this lesson."
        break
      case "tips":
        aiPrompt =
          "Give me study tips and strategies to better remember and apply what I learned in this lesson."
        break
      case "mistakes":
        aiPrompt =
          "What are common mistakes students make with these concepts? How can I avoid them?"
        break
      case "quiz":
        aiPrompt = "Create 3 quick practice questions to test my understanding of this lesson."
        break
      case "custom":
        aiPrompt = prompt || customPrompt
        break
      default:
        aiPrompt = "Help me understand this lesson better."
    }

    const originLabel =
      action === "custom"
        ? "Custom Question"
        : aiActions.find((item) => item.id === action)?.title || "Lesson Helper"

    await processPrompt({
      prompt: aiPrompt,
      label: originLabel,
      origin: action,
      trackActionId: action,
    })

    if (action === "custom") {
      setCustomPrompt("")
    }
  }

  const aiActions = [
    {
      id: "explain",
      title: "Explain Concepts",
      description: "Get clear explanations of key concepts",
      icon: Lightbulb,
      color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    },
    {
      id: "examples",
      title: "Real Examples",
      description: "See practical applications",
      icon: Target,
      color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    },
    {
      id: "tips",
      title: "Study Tips",
      description: "Get personalized study strategies",
      icon: BookOpen,
      color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
    },
    {
      id: "mistakes",
      title: "Avoid Mistakes",
      description: "Learn common pitfalls",
      icon: AlertCircle,
      color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
    },
    {
      id: "quiz",
      title: "Quick Quiz",
      description: "Test your understanding",
      icon: HelpCircle,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
    },
  ]

  const renderConversationEntry = (
    entry: ConversationEntry,
    options: {
      isLive?: boolean
      hideSave?: boolean
      showRemove?: boolean
      onRemove?: () => void
    } = {},
  ) => {
    const { isLive = false, hideSave = false, showRemove = false, onRemove } = options
    const answerText = entry.answer?.toString() ?? ""
    const hasAnswer = answerText.trim().length > 0
    const isSaved = savedEntries.has(entry.id)
    const showSaveButton = !hideSave && !isLive && !isSaved
    const canUseActions = hasAnswer && !isLive

    return (
      <div className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-4 space-y-3 shadow-sm'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge variant='outline' className='text-xs'>
              {entry.originLabel}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {entry.engine === "prompt" ? "Chrome Prompt API" : "Chrome Gemini Nano"}
            </Badge>
            {isSaved && (
              <Badge className='text-xs bg-emerald-100 text-emerald-700 border-emerald-200'>
                Saved
              </Badge>
            )}
            {isLive && (
              <Badge className='text-xs bg-blue-100 text-blue-700 border-blue-200'>
                In progress
              </Badge>
            )}
          </div>
          <div className='flex items-center gap-1'>
            {isLive && (
              <Loader2 className='h-4 w-4 animate-spin text-blue-600 dark:text-blue-300' />
            )}
            {showSaveButton && (
              <Button
                type='button'
                size='sm'
                variant='ghost'
                className='h-8 gap-1 text-emerald-600 font-semibold disabled:text-gray-400'
                title='Save locally (stored in this browser only)'
                onClick={(event) => {
                  event.preventDefault()
                  handleSaveEntry(entry)
                }}
                disabled={!canUseActions}
              >
                <Save className='h-4 w-4' />
                <span className='text-xs font-semibold uppercase tracking-wide'>Save</span>
              </Button>
            )}
            <Button
              type='button'
              size='icon'
              variant='ghost'
              className='text-gray-600 dark:text-gray-300 disabled:text-gray-400'
              title='Copy response'
              onClick={(event) => {
                event.preventDefault()
                handleCopyEntry(entry)
              }}
              disabled={!hasAnswer}
            >
              <Copy className='h-4 w-4' />
            </Button>
            <Button
              type='button'
              size='icon'
              variant='ghost'
              className='text-gray-600 dark:text-gray-300 disabled:text-gray-400'
              title='Download response (.txt)'
              onClick={(event) => {
                event.preventDefault()
                handleExportEntry(entry)
              }}
              disabled={!hasAnswer}
            >
              <Download className='h-4 w-4' />
            </Button>
            {showRemove && (
              <Button
                type='button'
                size='icon'
                variant='ghost'
                className='text-gray-600 dark:text-gray-300'
                title='Remove from saved history'
                onClick={(event) => {
                  event.preventDefault()
                  onRemove?.()
                }}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            )}
          </div>
        </div>

        <div className='space-y-3 text-sm'>
          <div>
            <p className='uppercase text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1 tracking-wide'>
              Prompt
            </p>
            <pre className='whitespace-pre-wrap rounded-md bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 text-sm'>
              {entry.prompt}
            </pre>
          </div>
          <div>
            <p className='uppercase text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1 tracking-wide'>
              Response
            </p>
            <div className='rounded-md bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 px-3 py-3'>
              {isLive && !hasAnswer ? (
                <div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Generating locally...
                </div>
              ) : (
                <div
                  className='prose prose-sm max-w-none text-gray-900 dark:text-gray-100 dark:prose-invert'
                  dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(entry.answer) }}
                />
              )}
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400'>
          <span>{formatTimestamp(entry.createdAt)}</span>
          {isLive && !hasAnswer && <span>Working…</span>}
        </div>
      </div>
    )
  }

  if (!chromeAISupported) {
    return (
      <Card className={`p-4 ${isFullWidth ? "w-full" : ""}`}>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Bot className='h-5 w-5' />
            AI Learning Assistant
            <Badge variant='neutral' className='text-xs'>
              Chrome AI Required
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8'>
            <WifiOff className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-2'>
              Chrome AI Not Available
            </h3>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>
              This feature requires Chrome&apos;s Built-in AI APIs. Please use Chrome Canary with AI
              features enabled.
            </p>
            <Button variant='outline' asChild>
              <a
                href='https://developer.chrome.com/docs/ai/built-in-apis'
                target='_blank'
                rel='noopener noreferrer'
              >
                Learn More
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={isFullWidth ? "w-full" : ""}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Bot className='h-5 w-5' />
          AI Learning Assistant
          <div className='flex items-center gap-2'>
            <Badge className='bg-green-100 text-green-800 border-green-300'>
              <Activity className='h-3 w-3 mr-1' />
              Chrome Gemini Nano
            </Badge>
            {promptApiAvailable && (
              <Badge className='bg-blue-100 text-blue-800 border-blue-300'>
                <Sparkles className='h-3 w-3 mr-1' />
                Chrome Prompt API
              </Badge>
            )}
            {isPro && (
              <Badge className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0'>
                <Crown className='h-3 w-3 mr-1' />
                PRO
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {/* AI Capabilities Info */}
          {aiCapabilities && (
            <div className='text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg space-y-2'>
              <div className='flex items-center gap-2'>
                <Zap className='h-4 w-4 text-blue-600 dark:text-blue-300' />
                <span className='font-medium'>Chrome Built-in AI Modes (runs locally)</span>
              </div>
              <div className='grid gap-2 sm:grid-cols-2'>
                {[
                  { label: "Chrome Prompt API", status: aiCapabilities.prompt },
                  { label: "Chrome Summarizer API", status: aiCapabilities.summarizer },
                ].map(({ label, status }) => (
                  <div
                    key={label}
                    className='flex items-center justify-between rounded-md border border-blue-100 dark:border-blue-800 bg-white/70 dark:bg-blue-900/40 px-3 py-2 text-xs capitalize'
                  >
                    <span>{label}</span>
                    <span
                      className={`font-semibold ${
                        status === "available"
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-500"
                      }`}
                    >
                      {status === "available" ? "ready" : status ?? "unknown"}
                    </span>
                  </div>
                ))}
              </div>
              {aiCapabilities.prompt === "unavailable" && (
                <p className='text-xs text-blue-700 dark:text-blue-200'>
                  Enable Chrome&apos;s prompt playground flags in Chrome Canary to try the
                  adjustable settings.
                </p>
              )}
            </div>
          )}

          <div className='flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3'>
            <Info className='h-4 w-4 mt-0.5 text-blue-500 dark:text-blue-300 shrink-0' />
            <div>
              Responses are generated locally using Chrome&apos;s built-in AI. Prompts and saved
              notes stay on this device.
            </div>
          </div>

          {promptApiAvailable && aiCapabilities?.assistant === "available" && (
            <div>
              <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-2'>
                Choose Response Engine
              </h3>
              <div className='flex flex-wrap gap-2'>
                <Button
                  variant='outline'
                  onClick={() => setEngineMode("assistant")}
                  className={`text-xs uppercase tracking-wide ${
                    engineMode === "assistant"
                      ? "border-blue-500 text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30"
                      : ""
                  }`}
                >
                  Chrome Gemini Nano
                </Button>
                <Button
                  variant='outline'
                  onClick={() => setEngineMode("prompt")}
                  className={`text-xs uppercase tracking-wide ${
                    engineMode === "prompt"
                      ? "border-blue-500 text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30"
                      : ""
                  }`}
                >
                  Chrome Prompt API
                </Button>
              </div>
            </div>
          )}

          {promptApiAvailable && aiCapabilities?.assistant !== "available" && (
            <div className='text-xs text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md px-3 py-2'>
              Chrome Gemini Nano mode is unavailable, so responses will be generated through the
              Chrome Prompt API experience.
            </div>
          )}

          {promptApiAvailable &&
            (engineMode === "prompt" || aiCapabilities?.assistant !== "available") && (
              <details className='bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg'>
                <summary className='flex items-center gap-2 px-4 py-3 cursor-pointer select-none text-sm font-medium text-gray-900 dark:text-gray-100'>
                  <SlidersHorizontal className='h-4 w-4 text-blue-600 dark:text-blue-300' />
                  Advanced prompt settings
                </summary>
                <div className='px-4 pb-4 space-y-4 text-sm text-gray-600 dark:text-gray-300'>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div>
                      <label className='flex items-center justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-1'>
                        <span>Temperature</span>
                        <span className='text-gray-900 dark:text-gray-100'>
                          {promptConfig.temperature.toFixed(1)}
                        </span>
                      </label>
                      <input
                        type='range'
                        min={0}
                        max={promptConfigLimits.maxTemperature}
                        step={0.1}
                        value={promptConfig.temperature}
                        onChange={(event) =>
                          setPromptConfig((prev) => ({
                            ...prev,
                            temperature: Number(event.target.value),
                          }))
                        }
                        className='w-full accent-blue-500'
                      />
                    </div>
                    <div>
                      <label className='flex items-center justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-1'>
                        <span>Top-K</span>
                        <span className='text-gray-900 dark:text-gray-100'>
                          {promptConfig.topK}
                        </span>
                      </label>
                      <input
                        type='range'
                        min={1}
                        max={promptConfigLimits.maxTopK}
                        step={1}
                        value={promptConfig.topK}
                        onChange={(event) =>
                          setPromptConfig((prev) => ({
                            ...prev,
                            topK: Number(event.target.value),
                          }))
                        }
                        className='w-full accent-blue-500'
                      />
                    </div>
                  </div>
                  {promptStats && (
                    <div className='flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400'>
                      {typeof promptStats.tokensLeft === "number" && (
                        <span className='flex items-center gap-1'>
                          <Gauge className='h-3 w-3' />
                          Tokens left: {promptStats.tokensLeft}
                        </span>
                      )}
                      {typeof promptStats.tokensUsed === "number" && (
                        <span className='flex items-center gap-1'>
                          <Activity className='h-3 w-3' />
                          Tokens used: {promptStats.tokensUsed}
                        </span>
                      )}
                      {typeof promptStats.maxTokens === "number" && (
                        <span className='flex items-center gap-1'>
                          <Hash className='h-3 w-3' />
                          Max input: {promptStats.maxTokens}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </details>
            )}

          {/* Quick AI Actions */}
          <div>
            <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-3'>
              Quick AI Assistance
            </h3>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-3'>
              {aiActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.id}
                    variant='outline'
                    onClick={() => handleAIAction(action.id)}
                    disabled={isLoading}
                    className={`h-auto p-3 flex flex-col items-center gap-2 text-center ${action.color}`}
                  >
                    {isLoading && selectedAction === action.id ? (
                      <Loader2 className='h-5 w-5 animate-spin' />
                    ) : (
                      <Icon className='h-5 w-5' />
                    )}
                    <div>
                      <div className='font-medium text-xs'>{action.title}</div>
                      <div className='text-xs opacity-75'>{action.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Custom Question */}
          <div>
            <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-3'>
              Ask a Custom Question
            </h3>
            <div className='space-y-3'>
              <textarea
                placeholder='Ask me anything about this lesson...'
                value={customPrompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleCustomPromptChange(e.target.value)
                }
                rows={3}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100'
              />
              {promptApiAvailable && (
                <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
                  <span className='flex items-center gap-1'>
                    <Hash className='h-3 w-3' />
                    {promptInputCost != null
                      ? `${promptInputCost} token${promptInputCost === 1 ? "" : "s"}`
                      : promptSession
                      ? "Tokens calculated after typing"
                      : "Run a prompt to activate session & token counter"}
                  </span>
                  {promptStats?.tokensLeft != null && (
                    <span>Remaining quota: {promptStats.tokensLeft}</span>
                  )}
                </div>
              )}
              <Button
                onClick={() => handleAIAction("custom")}
                disabled={isLoading || !customPrompt.trim()}
                className='w-full'
              >
                {isLoading && selectedAction === "custom" ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className='h-4 w-4 mr-2' />
                    Ask AI
                  </>
                )}
              </Button>
            </div>
          </div>

          {actionNotice && (
            <div className='flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-md px-3 py-2'>
              <Info className='h-4 w-4 text-emerald-600 dark:text-emerald-300' />
              <span>{actionNotice}</span>
            </div>
          )}

          {savedHistory.length > 0 && (
            <details className='border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/40 rounded-lg shadow-sm'>
              <summary className='cursor-pointer select-none flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200'>
                <span>Saved history ({savedHistory.length})</span>
                <span className='text-xs text-gray-500 dark:text-gray-400'>Click to expand</span>
              </summary>
              <div className='px-4 pb-4 space-y-3 text-sm'>
                {savedHistory.map((entry) => (
                  <div key={entry.id}>
                    {renderConversationEntry(entry, {
                      hideSave: true,
                      showRemove: true,
                      onRemove: () => handleDeleteSavedEntry(entry.id),
                    })}
                  </div>
                ))}
              </div>
            </details>
          )}

          {/* AI Conversation */}
          <div className='space-y-3'>
            <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100'>
              AI Conversation
            </h3>

            {liveEntry && (
              <div key={`live-${liveEntry.id}`}>
                {renderConversationEntry(liveEntry, { isLive: true })}
              </div>
            )}

            {!liveEntry && conversation.length === 0 && (
              <div className='border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center text-sm text-gray-500 dark:text-gray-400'>
                Trigger a quick action or ask a custom question to see tailored answers with lesson
                context.
              </div>
            )}

            {conversation.length > 0 && (
              <div className='space-y-3'>
                {conversation.map((entry) => (
                  <div key={entry.id}>{renderConversationEntry(entry)}</div>
                ))}
              </div>
            )}
          </div>

          {/* Pro Features Info */}
          {!isPro && (
            <div className='bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Crown className='h-5 w-5 text-yellow-600' />
                <span className='font-medium text-yellow-800 dark:text-yellow-200'>
                  Upgrade to PRO
                </span>
              </div>
              <p className='text-sm text-yellow-700 dark:text-yellow-300 mb-3'>
                Get unlimited AI assistance, detailed explanations, and advanced study tools.
              </p>
              <Button
                size='sm'
                className='bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white border-0'
              >
                Upgrade Now
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
