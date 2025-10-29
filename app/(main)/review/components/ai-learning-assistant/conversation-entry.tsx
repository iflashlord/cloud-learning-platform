import { Loader2, Save, Copy, Download, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { formatTimestamp, renderMarkdownToHtml } from "./ai-utils"
import type { ConversationEntry } from "./types"

interface ConversationEntryCardProps {
  entry: ConversationEntry
  isLive?: boolean
  isSaved?: boolean
  hideSave?: boolean
  showRemove?: boolean
  onSave?: (entry: ConversationEntry) => void
  onCopy?: (entry: ConversationEntry) => void
  onExport?: (entry: ConversationEntry) => void
  onRemove?: () => void
}

export const ConversationEntryCard = ({
  entry,
  isLive = false,
  isSaved = false,
  hideSave = false,
  showRemove = false,
  onSave,
  onCopy,
  onExport,
  onRemove,
}: ConversationEntryCardProps) => {
  const answerText = entry.answer?.toString() ?? ""
  const hasAnswer = answerText.trim().length > 0
  const showSaveButton = !hideSave && !isLive && !isSaved
  const canUseActions = hasAnswer && !isLive

  return (
    <div className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-4 space-y-3 shadow-sm'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex flex-wrap items-center gap-2'>
          <Badge variant='neutral' emphasis='outline' className='text-xs'>
            {entry.originLabel}
          </Badge>
          <Badge variant='neutral' emphasis='outline' className='text-xs'>
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
          {isLive && <Loader2 className='h-4 w-4 animate-spin text-blue-600 dark:text-blue-300' />}
          {showSaveButton && (
            <Button
              type='button'
              size='sm'
              variant='ghost'
              className='h-8 gap-1 text-emerald-600 font-semibold disabled:text-gray-400'
              title='Save locally (stored in this browser only)'
              onClick={(event) => {
                event.preventDefault()
                onSave?.(entry)
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
              onCopy?.(entry)
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
              onExport?.(entry)
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
