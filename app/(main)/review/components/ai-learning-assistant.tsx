"use client"

import {
  Activity,
  Bot,
  Crown,
  Gauge,
  Hash,
  Info,
  Loader2,
  SlidersHorizontal,
  Sparkles,
  WifiOff,
  Zap,
} from "lucide-react"
import { useMemo } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { ConversationEntryCard } from "./ai-learning-assistant/conversation-entry"
import { useAiLearningAssistant } from "./ai-learning-assistant/use-ai-learning-assistant"
import type { ExternalPromptRequest } from "./ai-learning-assistant/types"

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
  const {
    aiActions,
    actionNotice,
    aiCapabilities,
    chromeAISupported,
    conversation,
    customPrompt,
    engineMode,
    hasPromptSession,
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
    setEngineMode,
    setPromptConfig,
    handleAIAction,
    handleCopyEntry,
    handleCustomPromptChange,
    handleDeleteSavedEntry,
    handleExportEntry,
    handleSaveEntry,
  } = useAiLearningAssistant({
    lessonData,
    completionData,
    externalRequest,
    onExternalRequestConsumed,
  })

  const actionButtons = useMemo(
    () =>
      aiActions.map((action) => {
        const Icon = action.icon
        const isSelected = isLoading && selectedAction === action.id

        return (
          <Button
            key={action.id}
            variant='outline'
            onClick={() => handleAIAction(action.id)}
            disabled={isLoading}
            className={`h-auto p-3 flex flex-col items-center gap-2 text-center ${action.color}`}
          >
            {isSelected ? (
              <Loader2 className='h-5 w-5 animate-spin' />
            ) : (
              <Icon className='h-5 w-5' />
            )}
            <span className='text-xs font-semibold uppercase tracking-wide'>{action.title}</span>
            <span className='text-xs text-gray-600 dark:text-gray-300'>{action.description}</span>
          </Button>
        )
      }),
    [aiActions, handleAIAction, isLoading, selectedAction],
  )

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
            <Badge className='bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700'>
              <Activity className='h-3 w-3 mr-1' />
              Chrome Gemini Nano
            </Badge>
            {promptApiAvailable && (
              <Badge className='bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700'>
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

          <div>
            <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-3'>
              Quick AI Assistance
            </h3>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-3'>{actionButtons}</div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100'>Custom Prompt</h3>
            <textarea
              value={customPrompt}
              onChange={(event) => handleCustomPromptChange(event.target.value)}
              rows={4}
              placeholder='Ask anything about this lesson...'
              className='w-full border border-gray-200 dark:border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100'
            />
            {promptApiAvailable && (
              <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
                <span className='flex items-center gap-1'>
                  <Hash className='h-3 w-3' />
                  {promptInputCost != null
                    ? `${promptInputCost} token${promptInputCost === 1 ? "" : "s"}`
                    : hasPromptSession
                    ? "Tokens calculated after typing"
                    : "Run a prompt to activate session & token counter"}
                </span>
                {promptStats?.tokensLeft != null && (
                  <span>Remaining quota: {promptStats.tokensLeft}</span>
                )}
              </div>
            )}
            <Button
              onClick={() => handleAIAction("custom", customPrompt)}
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
                  <ConversationEntryCard
                    key={entry.id}
                    entry={entry}
                    isSaved
                    hideSave
                    showRemove
                    onRemove={() => handleDeleteSavedEntry(entry.id)}
                    onCopy={handleCopyEntry}
                    onExport={handleExportEntry}
                  />
                ))}
              </div>
            </details>
          )}

          <div className='space-y-3'>
            <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100'>
              AI Conversation
            </h3>

            {liveEntry && (
              <ConversationEntryCard
                key={`live-${liveEntry.id}`}
                entry={liveEntry}
                isLive
                isSaved={savedEntries.has(liveEntry.id)}
                onSave={handleSaveEntry}
                onCopy={handleCopyEntry}
                onExport={handleExportEntry}
              />
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
                  <ConversationEntryCard
                    key={entry.id}
                    entry={entry}
                    isSaved={savedEntries.has(entry.id)}
                    onSave={handleSaveEntry}
                    onCopy={handleCopyEntry}
                    onExport={handleExportEntry}
                  />
                ))}
              </div>
            )}
          </div>

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
