import { useCallback, useEffect, useRef, useState } from "react"

import {
  resolveAssistantApi,
  resolveLanguageModelApi,
  resolveSummarizerApi,
} from "@/lib/ai/chrome-ai-utils"

import { AI_ACTIONS, resolveActionPrompt } from "./ai-actions"
import { buildPlaintextExport, buildSystemPrompt, getConversationId } from "./ai-utils"
import type {
  ConversationEntry,
  ExternalPromptRequest,
  PromptExecutionRequest,
  PromptStats,
  SavedConversationEntry,
} from "./types"

const SAVED_STORAGE_KEY = "aws-learning-ai-assistant-saved"

interface UseAiLearningAssistantOptions {
  lessonData: any
  completionData: any
  externalRequest?: ExternalPromptRequest | null
  onExternalRequestConsumed?: (id: string) => void
}

export const useAiLearningAssistant = ({
  lessonData,
  completionData,
  externalRequest = null,
  onExternalRequestConsumed,
}: UseAiLearningAssistantOptions) => {
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
  const [promptStats, setPromptStats] = useState<PromptStats | null>(null)
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
        const challenges: any[] = Array.isArray(lessonData?.challenges) ? lessonData.challenges : []

        const lessonContent = [
          `Lesson title: ${lessonData?.title ?? "Lesson"}`,
          `Unit: ${lessonData?.unit?.title ?? "Unit"}`,
          `Course: ${lessonData?.unit?.course?.title ?? "Course"}`,
          `Score: ${completionData?.score ?? 0}%`,
          ``,
          `Learning objectives:`,
          ...objectives.map((objective: string, index: number) => `${index + 1}. ${objective}`),
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

  const initializeAI = async () => {
    if (!(window as any).ai?.assistant) return null

    try {
      const summary = await getLessonSummary()

      const systemPrompt = buildSystemPrompt({
        lessonData,
        completionData,
        summaryText: summary,
      })

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
            content: buildSystemPrompt({
              lessonData,
              completionData,
              summaryText: summary,
            }),
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
      const unavailableMessage =
        "Chrome Prompt API is unavailable. Make sure Chrome's built-in AI flags are enabled."
      setLiveEntry({
        ...entry,
        answer: unavailableMessage,
      })
      return unavailableMessage
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
      const failureMessage = "Sorry, the Chrome Prompt API call failed. Please try again."
      setLiveEntry({
        ...entry,
        answer: failureMessage,
      })
      return failureMessage
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
          const assistantAnswer =
            typeof response === "string" ? response : JSON.stringify(response)
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
      void measurePromptTokens(promptSession, value)
    }
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

  const handleAIAction = async (action: string, promptOverride?: string) => {
    const { prompt, label } = resolveActionPrompt(action, promptOverride ?? customPrompt)

    await processPrompt({
      prompt,
      label,
      origin: action,
      trackActionId: action,
    })

    if (action === "custom") {
      setCustomPrompt("")
    }
  }

  return {
    aiActions: AI_ACTIONS,
    hasPromptSession: Boolean(promptSession),
    actionNotice,
    aiCapabilities,
    chromeAISupported,
    conversation,
    customPrompt,
    engineMode,
    isLoading,
    liveEntry,
    promptApiAvailable,
    promptConfig,
    promptConfigLimits,
    promptInputCost,
    promptStats,
    savedEntries,
    savedHistory,
    selectedAction,
    setCustomPrompt,
    setEngineMode,
    setPromptConfig,
    setPromptStats,
    handleAIAction,
    handleCopyEntry,
    handleCustomPromptChange,
    handleDeleteSavedEntry,
    handleExportEntry,
    handleSaveEntry,
  }
}
