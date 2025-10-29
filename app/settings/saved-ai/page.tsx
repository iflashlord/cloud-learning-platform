"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Download,
  Copy,
  Trash2,
  Sparkles,
  Search,
  FileText,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  const [searchTerm, setSearchTerm] = useState("")
  const [sourceFilter, setSourceFilter] = useState<"all" | string>("all")

  useEffect(() => {
    setEntries(loadSavedEntries())
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const refreshEntries = () => {
      setEntries(loadSavedEntries())
    }

    const handleStorage = (event: StorageEvent) => {
      if (!event.key) {
        return
      }

      if (STORAGE_SOURCES.some((source) => source.key === event.key)) {
        refreshEntries()
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshEntries()
      }
    }

    const handleFocus = () => {
      refreshEntries()
    }

    const handleStudyCoachUpdated: EventListener = () => {
      refreshEntries()
    }

    window.addEventListener("storage", handleStorage)
    window.addEventListener("focus", handleFocus)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("study-coach-saved-updated", handleStudyCoachUpdated)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("focus", handleFocus)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("study-coach-saved-updated", handleStudyCoachUpdated)
    }
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

  const countsBySource = useMemo(() => {
    const totals: Record<string, number> = {}
    STORAGE_SOURCES.forEach((source) => {
      totals[source.key] = 0
    })
    entries.forEach((entry) => {
      totals[entry.sourceKey] = (totals[entry.sourceKey] ?? 0) + 1
    })
    return totals
  }, [entries])

  const filteredEntries = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return entries.filter((entry) => {
      const matchesSource = sourceFilter === "all" || entry.sourceKey === sourceFilter
      if (!matchesSource) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      const haystacks = [
        entry.label,
        entry.prompt,
        entry.answer,
        entry.lessonTitle,
        entry.engine,
        entry.challengeId ? `challenge-${entry.challengeId}` : null,
        entry.sourceLabel,
      ]
        .filter(Boolean)
        .map((value) => String(value).toLowerCase())

      return haystacks.some((value) => value.includes(normalizedSearch))
    })
  }, [entries, searchTerm, sourceFilter])

  const activeSources =
    sourceFilter === "all"
      ? STORAGE_SOURCES
      : STORAGE_SOURCES.filter((source) => source.key === sourceFilter)

  const entriesBySource = activeSources.map((source) => ({
    source,
    entries: filteredEntries.filter((entry) => entry.sourceKey === source.key),
  }))

  const handleResetFilters = () => {
    setSearchTerm("")
    setSourceFilter("all")
  }

  const handleCopyPrompt = async (entry: SavedEntry) => {
    const prompt = entry.prompt?.trim()
    if (!prompt) {
      setNotice("No prompt saved for this entry.")
      return
    }

    try {
      await navigator.clipboard.writeText(prompt)
      setNotice("Prompt copied to clipboard.")
    } catch (error) {
      console.error("Copy prompt failed:", error)
      setNotice("Copy prompt failed.")
    }
  }

  const hasEntries = entries.length > 0
  const hasFilteredEntries = filteredEntries.length > 0

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

        <Card>
          <CardContent className='space-y-3 py-4'>
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
              <div className='relative w-full md:max-w-md'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder='Search saved responses...'
                  className='pl-10'
                  aria-label='Search saved responses'
                />
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                <Button
                  variant={sourceFilter === "all" ? "secondary" : "outline"}
                  size='sm'
                  onClick={() => setSourceFilter("all")}
                  aria-pressed={sourceFilter === "all"}
                >
                  All ({entries.length})
                </Button>
                {STORAGE_SOURCES.map((source) => (
                  <Button
                    key={source.key}
                    variant={sourceFilter === source.key ? "secondary" : "outline"}
                    size='sm'
                    onClick={() => setSourceFilter(source.key)}
                    aria-pressed={sourceFilter === source.key}
                  >
                    {source.label} ({countsBySource[source.key] ?? 0})
                  </Button>
                ))}
              </div>
            </div>
            <div className='flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground'>
              <span>
                Showing {filteredEntries.length} of {entries.length} saved responses
              </span>
              {(searchTerm || sourceFilter !== "all") && (
                <button
                  type='button'
                  className='text-xs font-medium text-primary underline-offset-4 hover:underline'
                  onClick={handleResetFilters}
                >
                  Reset filters
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {notice && (
          <div className='rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-200'>
            {notice}
          </div>
        )}

        {!hasEntries ? (
          <Card>
            <CardContent className='py-12 text-center text-sm text-gray-500 dark:text-gray-400'>
              You don&apos;t have any saved AI responses yet. Use the Save buttons inside Study Coach or the review assistant to collect interesting explanations.
            </CardContent>
          </Card>
        ) : !hasFilteredEntries ? (
          <Card>
            <CardContent className='py-12 text-center text-sm text-gray-500 dark:text-gray-400'>
              No saved responses match your current filters.
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
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {countsBySource[source.key] ? "No saved responses match your current filters." : `No saved responses from ${source.label} yet.`}
                  </p>
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
                          <Button variant='ghost' size='icon' className='h-8 w-8 text-gray-500' onClick={() => handleCopyPrompt(entry)}>
                            <FileText className='h-4 w-4' />
                          </Button>
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
                      {entry.prompt && entry.prompt.trim() && (
                        <details className='rounded-md border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-300'>
                          <summary className='cursor-pointer text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                            View saved prompt
                          </summary>
                          <div
                            className='prose prose-sm mt-2 max-w-none text-gray-700 dark:text-gray-200 dark:prose-invert'
                            dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(entry.prompt) }}
                          />
                        </details>
                      )}
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
