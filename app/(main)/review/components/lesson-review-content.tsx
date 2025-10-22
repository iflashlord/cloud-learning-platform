"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Clock,
  Target,
  Trophy,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { AILearningAssistant } from "./ai-learning-assistant"

interface LessonReviewContentProps {
  lessonReview: {
    completion: any
    lesson: any
  }
  isPro: boolean
  userProgress: any
}

export const LessonReviewContent = ({
  lessonReview,
  isPro,
  userProgress,
}: LessonReviewContentProps) => {
  const [expandedChallenges, setExpandedChallenges] = useState<Set<number>>(new Set())
  const [allExpanded, setAllExpanded] = useState(false)

  const { completion, lesson } = lessonReview

  const toggleChallenge = (challengeId: number) => {
    const newExpanded = new Set(expandedChallenges)
    if (newExpanded.has(challengeId)) {
      newExpanded.delete(challengeId)
    } else {
      newExpanded.add(challengeId)
    }
    setExpandedChallenges(newExpanded)

    // Update allExpanded state based on current state
    const totalChallenges = lesson.challenges.length
    setAllExpanded(newExpanded.size === totalChallenges)
  }

  const toggleAllChallenges = () => {
    if (allExpanded) {
      // Collapse all
      setExpandedChallenges(new Set<number>())
      setAllExpanded(false)
    } else {
      // Expand all
      const challengeIds: number[] = lesson.challenges.map(
        (challenge: { id: number }) => challenge.id,
      )
      setExpandedChallenges(new Set<number>(challengeIds))
      setAllExpanded(true)
    }
  }

  const getChallengeTypeLabel = (type: string) => {
    switch (type) {
      case "SELECT":
        return "Multiple Choice"
      case "ASSIST":
        return "Select Missing Word"
      case "TEXT_INPUT":
        return "Type Answer"
      default:
        return "Question"
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalChallenges = lesson.challenges.length
  const score = completion.score

  return (
    <div className='min-h-screen'>
      {/* Header */}
      <div className='border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Button variant='ghost' size='sm' asChild>
                <Link href='/review'>
                  <ArrowLeft className='h-4 w-4 mr-2' />
                  Back to Reviews
                </Link>
              </Button>
              <div>
                <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
                  Review: {lesson.title}
                </h1>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {lesson.unit.course.title} • {lesson.unit.title}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='text-center'>
                <div className='flex items-center gap-2'>
                  <Trophy className='h-5 w-5 text-yellow-500' />
                  <span className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
                    {score}%
                  </span>
                </div>
                <p className='text-xs text-gray-600 dark:text-gray-400'>Final Score</p>
              </div>
              {completion.wasPerfect && (
                <Badge className='bg-green-100 text-green-800 border-green-300'>
                  <Trophy className='h-3 w-3 mr-1' />
                  Perfect Score!
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='space-y-8'>
          {/* Lesson Summary */}
          <Card className='p-4'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BookOpen className='h-5 w-5' />
                Lesson Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                    {totalChallenges}
                  </div>
                  <div className='text-sm text-blue-800 dark:text-blue-200'>Total Questions</div>
                </div>
                <div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
                  <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                    {score}%
                  </div>
                  <div className='text-sm text-green-800 dark:text-green-200'>Your Score</div>
                </div>
                <div className='text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
                  <div className='text-sm font-medium text-purple-600 dark:text-purple-400'>
                    Completed
                  </div>
                  <div className='text-xs text-purple-800 dark:text-purple-200'>
                    {formatDate(completion.completedAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions and Answers */}
          <Card className='p-4'>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <MessageSquare className='h-5 w-5' />
                  Questions & Answers Review
                </div>
                <Button
                  onClick={toggleAllChallenges}
                  variant='outline'
                  size='sm'
                  className='text-sm'
                >
                  {allExpanded ? "Collapse All" : "Expand All"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {lesson.challenges.map((challenge: any, index: number) => {
                  const isExpanded = expandedChallenges.has(challenge.id)
                  const wasCompleted =
                    challenge.challengeProgress?.some((cp: any) => cp.completed) || false

                  return (
                    <div
                      key={challenge.id}
                      className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'
                    >
                      <div
                        className='p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0'
                        onClick={() => toggleChallenge(challenge.id)}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm font-medium text-gray-500'>
                                Q{index + 1}
                              </span>
                              {wasCompleted ? (
                                <CheckCircle2 className='h-4 w-4 text-green-600' />
                              ) : (
                                <XCircle className='h-4 w-4 text-red-600' />
                              )}
                            </div>
                            <Badge variant='neutral' className='text-xs'>
                              {getChallengeTypeLabel(challenge.type)}
                            </Badge>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className='h-4 w-4 text-gray-400' />
                          ) : (
                            <ChevronDown className='h-4 w-4 text-gray-400' />
                          )}
                        </div>
                        <div className='mt-2'>
                          <p className='text-gray-900 dark:text-gray-100 font-medium'>
                            {challenge.question}
                          </p>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className='px-6 pb-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30'>
                          <div className='pt-6 space-y-4'>
                            {/* Challenge Options */}
                            {challenge.challengeOptions &&
                              challenge.challengeOptions.length > 0 && (
                                <div className='space-y-2'>
                                  <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Answer Options:
                                  </h4>
                                  {challenge.challengeOptions.map((option: any) => (
                                    <div
                                      key={option.id}
                                      className={`p-3 rounded-lg border ${
                                        option.correct
                                          ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                                          : "bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                                      }`}
                                    >
                                      <div className='flex items-center gap-2'>
                                        {option.correct ? (
                                          <CheckCircle2 className='h-4 w-4 text-green-600' />
                                        ) : (
                                          <div className='h-4 w-4 rounded-full border-2 border-gray-400' />
                                        )}
                                        <span>{option.text}</span>
                                      </div>
                                      {option.guide && (
                                        <div className='mt-2 text-sm opacity-80'>
                                          <div className='flex items-center gap-1'>
                                            <Lightbulb className='h-3 w-3' />
                                            {option.guide}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                            {/* Text Input Answer */}
                            {challenge.type === "TEXT_INPUT" && challenge.correctAnswer && (
                              <div className='space-y-2'>
                                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                  Correct Answer:
                                </h4>
                                <div className='p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'>
                                  {challenge.correctAnswer}
                                </div>
                              </div>
                            )}

                            {/* Hint */}
                            {challenge.hint && (
                              <div className='space-y-2'>
                                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                  Hint:
                                </h4>
                                <div className='p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200'>
                                  <div className='flex items-center gap-2'>
                                    <Lightbulb className='h-4 w-4' />
                                    {challenge.hint}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Explanation */}
                            {challenge.explanation && (
                              <div className='space-y-2'>
                                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                  Explanation:
                                </h4>
                                <div className='p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-200 text-sm'>
                                  {challenge.explanation}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className='p-4'>
            <CardHeader>
              <CardTitle className='text-lg'>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Button variant='outline' className='justify-start' asChild>
                  <Link href={`/lesson/${lesson.id}`}>
                    <BookOpen className='h-4 w-4 mr-2' />
                    Retake Lesson
                  </Link>
                </Button>
                <Button variant='outline' className='justify-start' asChild>
                  <Link href='/learn'>
                    <Target className='h-4 w-4 mr-2' />
                    Continue Learning
                  </Link>
                </Button>
                <Button variant='outline' className='justify-start' asChild>
                  <Link href='/review'>
                    <Clock className='h-4 w-4 mr-2' />
                    View All Reviews
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Learning Assistant - Full Width at Bottom */}
          <AILearningAssistant
            lessonData={lesson}
            completionData={completion}
            isPro={isPro}
            isFullWidth={true}
          />
        </div>
      </div>
    </div>
  )
}
