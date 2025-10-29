"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Download,
  Copy,
  Trash2,
  Sparkles,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { renderMarkdownToHtml } from "@/lib/markdown"

interface SavedEntry {
  id: string
  label: string
  prompt: string
  answer: string
  engine?: string
  savedAt?: string
  lessonTitle?: string
  challengeId?: number
  sourceKey: string
  sourceLabel: string
}

const STORAGE_SOURCES = [
  {
    key: "aws-learning-ai-assistant-saved",
    label: "Review Assistant",
  },
  {
    key: "aws-learning-study-coach-saved",
    label: "Study Coach",
  },
]

const formatDate = (value?: string) => {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleString()
}

const buildPlainText = (entry: SavedEntry) =>
  [
    `=== ${entry.sourceLabel} Response ===`,
    entry.lessonTitle ? `Lesson: ${entry.lessonTitle}` : null,
    entry.engine ? `Engine: ${entry.engine}` : null,
    `Saved: ${formatDate(entry.savedAt)}`,
    "",
    `Prompt:`,
    entry.prompt,
    "",
    "Response:",
    entry.answer,
  ]
    .filter(Boolean)
    .join("\n")

const loadSavedEntries = (): SavedEntry[] => {
  const combined: SavedEntry[] = []

  if (typeof window === "undefined") {
    return combined
  }

  for (const source of STORAGE_SOURCES) {
    try {
      const raw = window.localStorage.getItem(source.key)
      if (!raw) continue
      const parsed = JSON.parse(raw)
      if (!Array.isArray(parsed)) continue
      parsed.forEach((entry: any) => {
        combined.push({
          id: entry.id,
          label: entry.label ?? "Saved response",
          prompt: entry.prompt ?? "",
          answer: typeof entry.answer === "string" ? entry.answer : JSON.stringify(entry.answer),
          engine: entry.engine,
          savedAt: entry.savedAt,
          lessonTitle: entry.lessonTitle,
          challengeId: entry.challengeId,
          sourceKey: source.key,
          sourceLabel: source.label,
        })
      })
    } catch (error) {
      console.error("Failed to parse saved entries for", source.key, error)
    }
  }

  return combined.sort((a, b) => {
    const aDate = a.savedAt ? new Date(a.savedAt).getTime() : 0
    const bDate = b.savedAt ? new Date(b.savedAt).getTime() : 0
    return bDate - aDate
  })
}

const SavedAiPage = () => {
  const [entries, setEntries] = useState<SavedEntry[]>([])
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    setEntries(loadSavedEntries())
  }, [])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 3000)
    return () => clearTimeout(timer)
  }, [notice])

  const updateStorage = (sourceKey: string, updated: SavedEntry[]) => {
    if (typeof window === "undefined") return

    const filtered = updated.filter((entry) => entry.sourceKey === sourceKey)
    const sanitized = filtered.map(({ sourceKey: _sk, sourceLabel: _sl, ...rest }) => rest)
    window.localStorage.setItem(sourceKey, JSON.stringify(sanitized))

    if (sourceKey === "aws-learning-study-coach-saved") {
      window.dispatchEvent(
        new CustomEvent("study-coach-saved-updated", { detail: sanitized }),
      )
    }
  }

  const handleRemove = (entry: SavedEntry) => {
    setEntries((prev) => {
      const updated = prev.filter((item) => !(item.id === entry.id && item.sourceKey === entry.sourceKey))
      updateStorage(entry.sourceKey, updated)
      setNotice("Removed saved response.")
      return updated
    })
  }

  const handleClearSource = (sourceKey: string) => {
    setEntries((prev) => {
      const remaining = prev.filter((entry) => entry.sourceKey !== sourceKey)
      updateStorage(sourceKey, [])
      setNotice("Cleared saved responses for this source.")
      return remaining
    })
  }

  const handleCopy = async (entry: SavedEntry) => {
    try {
      await navigator.clipboard.writeText(buildPlainText(entry))
      setNotice("Copied to clipboard.")
    } catch (error) {
      console.error("Copy failed:", error)
      setNotice("Copy failed.")
    }
  }

  const handleDownload = (entry: SavedEntry) => {
    try {
      const blob = new Blob([buildPlainText(entry)], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `saved-ai-response-${entry.id.slice(0, 8)}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setNotice("Downloaded response.")
    } catch (error) {
      console.error("Download failed:", error)
      setNotice("Download failed.")
    }
  }

  const entriesBySource = STORAGE_SOURCES.map((source) => ({
    source,
    entries: entries.filter((entry) => entry.sourceKey === source.key),
  }))

  return (
    <div className='min-h-screen bg-muted/10 py-10'>
      <div className='max-w-4xl mx-auto px-4 space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-semibold text-gray-900 dark:text-gray-100'>Saved AI Responses</h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Review, export, or delete responses you saved from Study Coach and the review assistant.</p>
          </div>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/'>
              <ArrowLeft className='mr-2 h-4 w-4' /> Back to dashboard
            </Link>
          </Button>
        </div>

        {notice && (
          <div className='rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-200'>
            {notice}
          </div>
        )}

        {entries.length === 0 ? (
          <Card>
            <CardContent className='py-12 text-center text-sm text-gray-500 dark:text-gray-400'>
              You don&apos;t have any saved AI responses yet. Use the Save buttons inside Study Coach or the review assistant to collect interesting explanations.
            </CardContent>
          </Card>
        ) : (
          entriesBySource.map(({ source, entries: sourceEntries }) => (
            <Card key={source.key}>
              <CardHeader className='flex flex-row items-center justify-between gap-4'>
                <div className='flex items-center gap-2'>
                  <Sparkles className='h-4 w-4 text-blue-500' />
                  <CardTitle className='text-base'>{source.label}</CardTitle>
                  <Badge variant='neutral'>{sourceEntries.length}</Badge>
                </div>
                {sourceEntries.length > 0 && (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='flex items-center gap-2 text-xs text-red-500 hover:text-red-600'
                    onClick={() => handleClearSource(source.key)}
                  >
                    <Trash2 className='h-4 w-4' /> Clear all
                  </Button>
                )}
              </CardHeader>
              <CardContent className='space-y-4'>
                {sourceEntries.length === 0 ? (
                  <p className='text-sm text-gray-500 dark:text-gray-400'>No saved responses from {source.label} yet.</p>
                ) : (
                  sourceEntries.map((entry) => (
                    <div
                      key={`${entry.sourceKey}-${entry.id}`}
                      className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3 shadow-sm'
                    >
                      <div className='flex items-center justify-between gap-2'>
                        <div>
                          <p className='text-sm font-semibold text-gray-800 dark:text-gray-100'>{entry.label}</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            {entry.engine ? `${entry.engine} • ` : ""}
                            {formatDate(entry.savedAt)}
                          </p>
                          {entry.lessonTitle && (
                            <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>Lesson: {entry.lessonTitle}</p>
                          )}
                        </div>
                        <div className='flex items-center gap-2'>
                          <Button variant='ghost' size='icon' className='h-8 w-8 text-gray-500' onClick={() => handleCopy(entry)}>
                            <Copy className='h-4 w-4' />
                          </Button>
                          <Button variant='ghost' size='icon' className='h-8 w-8 text-gray-500' onClick={() => handleDownload(entry)}>
                            <Download className='h-4 w-4' />
                          </Button>
                          <Button variant='ghost' size='icon' className='h-8 w-8 text-red-500' onClick={() => handleRemove(entry)}>
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                      <div
                        className='prose prose-sm max-w-none text-gray-700 dark:text-gray-200 dark:prose-invert'
                        dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(entry.answer) }}
                      />
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default SavedAiPage
