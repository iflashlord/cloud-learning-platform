"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Trophy,
  Clock,
  Target,
  ChevronRight,
  MessageSquare,
  Star,
  Calendar,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"
import { triggerBackfillLessons } from "@/actions/backfill-lessons"
import { debugUserProgress } from "@/actions/debug-progress"

interface ReviewDashboardProps {
  completedLessons: any[]
  stats: {
    totalCompleted: number
    perfectLessons: number
    averageScore: number
    totalTimeSpent: number
  }
  isPro: boolean
  userProgress: any
}

export const ReviewDashboard = ({
  completedLessons,
  stats,
  isPro,
  userProgress,
}: ReviewDashboardProps) => {
  const [filter, setFilter] = useState<"all" | "perfect" | "recent">("all")
  const [isBackfilling, setIsBackfilling] = useState(false)
  const [isDebugging, setIsDebugging] = useState(false)

  const handleDebug = async () => {
    setIsDebugging(true)
    try {
      const result = await debugUserProgress()
      console.log("Debug result:", result)
      alert(
        `Found ${
          result.lessonProgress?.length || 0
        } lessons with progress. Check console for details.`,
      )
    } catch (error) {
      console.error("Debug error:", error)
    } finally {
      setIsDebugging(false)
    }
  }

  const handleBackfill = async () => {
    setIsBackfilling(true)
    try {
      const result = await triggerBackfillLessons()
      if (result.success) {
        // Page will revalidate automatically, just show success
        console.log(result.message)
        alert(result.message)
      }
    } catch (error) {
      console.error("Backfill error:", error)
    } finally {
      setIsBackfilling(false)
    }
  }

  const filteredLessons = completedLessons.filter((completion) => {
    switch (filter) {
      case "perfect":
        return completion.wasPerfect
      case "recent":
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        return new Date(completion.completedAt) > oneWeekAgo
      default:
        return true
    }
  })

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diffInMs = now.getTime() - past.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else {
      return "Less than an hour ago"
    }
  }

  return (
    <div className='space-y-6'>
      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center space-x-2'>
              <BookOpen className='h-4 w-4 text-blue-600' />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>Lessons Completed</p>
                <p className='text-2xl font-bold'>{stats.totalCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center space-x-2'>
              <Trophy className='h-4 w-4 text-yellow-600' />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>Perfect Lessons</p>
                <p className='text-2xl font-bold'>{stats.perfectLessons}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center space-x-2'>
              <Target className='h-4 w-4 text-green-600' />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>Average Score</p>
                <p className='text-2xl font-bold'>{stats.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center space-x-2'>
              <Clock className='h-4 w-4 text-purple-600' />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>Time Spent</p>
                <p className='text-2xl font-bold'>{formatTime(stats.totalTimeSpent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className='flex flex-wrap gap-2'>
        <Button
          variant={filter === "all" ? "primary" : "outline"}
          size='sm'
          onClick={() => setFilter("all")}
        >
          All Lessons ({completedLessons.length})
        </Button>
        <Button
          variant={filter === "perfect" ? "primary" : "outline"}
          size='sm'
          onClick={() => setFilter("perfect")}
        >
          Perfect Scores ({completedLessons.filter((c) => c.wasPerfect).length})
        </Button>
        <Button
          variant={filter === "recent" ? "primary" : "outline"}
          size='sm'
          onClick={() => setFilter("recent")}
        >
          This Week
        </Button>
      </div>

      {/* Lessons List */}
      <div className='space-y-4'>
        {filteredLessons.length === 0 ? (
          <Card>
            <CardContent className='p-8 text-center'>
              <BookOpen className='h-12 w-12 mx-auto mb-4 text-gray-400' />
              <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-2'>
                No completed lessons found
              </h3>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                {completedLessons.length === 0
                  ? "If you've completed lessons before, try syncing your progress below."
                  : "Try changing the filter to see more lessons."}
              </p>
              <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                {completedLessons.length === 0 && (
                  <>
                    <Button
                      onClick={handleDebug}
                      disabled={isDebugging}
                      variant='secondary'
                      size='sm'
                    >
                      {isDebugging ? "Checking..." : "Debug Progress"}
                    </Button>
                    <Button onClick={handleBackfill} disabled={isBackfilling} variant='outline'>
                      <RotateCcw
                        className={`h-4 w-4 mr-2 ${isBackfilling ? "animate-spin" : ""}`}
                      />
                      {isBackfilling ? "Syncing..." : "Sync Completed Lessons"}
                    </Button>
                  </>
                )}
                <Link href='/learn'>
                  <Button>Start Learning</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredLessons.map((completion) => (
            <Card key={completion.id} className='hover:shadow-md transition-shadow'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                        {completion.lesson.title}
                      </h3>
                      {completion.wasPerfect && (
                        <Badge variant='warning' className='bg-yellow-100 text-yellow-800'>
                          <Star className='h-3 w-3 mr-1' />
                          Perfect
                        </Badge>
                      )}
                      {isPro && (
                        <Badge variant='info' className='bg-blue-50 text-blue-600 border-blue-200'>
                          <MessageSquare className='h-3 w-3 mr-1' />
                          AI Available
                        </Badge>
                      )}
                    </div>

                    <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3'>
                      <span className='flex items-center gap-1'>
                        <BookOpen className='h-3 w-3' />
                        {completion.lesson.unit.course.title}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Calendar className='h-3 w-3' />
                        {getTimeAgo(completion.completedAt)}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Target className='h-3 w-3' />
                        {completion.score}% ({completion.correctAnswers}/
                        {completion.totalChallenges})
                      </span>
                      {completion.timeSpent && (
                        <span className='flex items-center gap-1'>
                          <Clock className='h-3 w-3' />
                          {formatTime(completion.timeSpent)}
                        </span>
                      )}
                    </div>

                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {completion.lesson.unit.title} • {completion.totalChallenges} questions
                    </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Link href={`/review/${completion.lessonId}`}>
                      <Button variant='outline' size='sm'>
                        Review
                        <ChevronRight className='h-4 w-4 ml-1' />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
