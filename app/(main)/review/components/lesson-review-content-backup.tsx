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
  Lightbulb
} from "lucide-react"
import Link from "next/link"
import { AIChat } from "./ai-chat"

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
  userProgress 
}: LessonReviewContentProps) => {
  const [expandedChallenges, setExpandedChallenges] = useState<Set<number>>(new Set())
  
  const { completion, lesson } = lessonReview

  const toggleChallenge = (challengeId: number) => {
    const newExpanded = new Set(expandedChallenges)
    if (newExpanded.has(challengeId)) {
      newExpanded.delete(challengeId)
    } else {
      newExpanded.add(challengeId)
    }
    setExpandedChallenges(newExpanded)
  }

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diffInMs = now.getTime() - past.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)
    
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
      return 'Less than an hour ago'
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const getChallengeTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'SELECT': 'Multiple Choice',
      'ASSIST': 'Fill in the Blank',
      'TRUE_FALSE': 'True/False',
      'DRAG_DROP': 'Drag & Drop',
      'TEXT_INPUT': 'Text Input',
      'IMAGE_SELECT': 'Image Selection',
      'LISTENING': 'Listening',
      'SPEECH_INPUT': 'Speech',
      'VIDEO': 'Video'
    }
    return types[type] || type
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/review">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Review
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {lesson.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {lesson.unit.course.title} • {lesson.unit.title}
            </p>
          </div>
        </div>

        {/* Main Content - Full Width */}
        <div className="space-y-6">
          {/* Completion Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                Completion Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {completion.score}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Score
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {completion.correctAnswers}/{completion.totalChallenges}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Correct
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {completion.timeSpent ? formatTime(completion.timeSpent) : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Time
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {getTimeAgo(completion.completedAt)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Completed
                  </div>
                </div>
              </div>
              
              {completion.wasPerfect && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <Trophy className="h-4 w-4" />
                    <span className="font-medium">Perfect Score!</span>
                    <span className="text-sm">You answered all questions correctly on your first try.</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Questions Review - Full Width Grid */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Questions & Answers Review ({lesson.challenges.length} questions)
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    const allExpanded = lesson.challenges.every((c: any) => expandedChallenges.has(c.id))
                    if (allExpanded) {
                      setExpandedChallenges(new Set())
                    } else {
                      setExpandedChallenges(new Set(lesson.challenges.map((c: any) => c.id)))
                    }
                  }}
                >
                  {lesson.challenges.every((c: any) => expandedChallenges.has(c.id)) ? 'Collapse All' : 'Expand All'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.challenges.map((challenge: any, index: number) => {
                  const isExpanded = expandedChallenges.has(challenge.id)
                  const userProgress = challenge.challengeProgress?.[0]
                  const wasCompleted = userProgress?.completed
                  
                  return (
                    <div key={challenge.id} className="border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow">
                      <div 
                        className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => toggleChallenge(challenge.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-500">
                                Q{index + 1}
                              </span>
                              {wasCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                            <Badge variant="neutral" className="text-xs">
                              {getChallengeTypeLabel(challenge.type)}
                            </Badge>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="mt-2">
                          <p className="text-gray-900 dark:text-gray-100 font-medium text-sm">
                            {challenge.question}
                          </p>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="pt-4 space-y-3">
                            {/* Challenge Options */}
                            {challenge.challengeOptions && challenge.challengeOptions.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Answer Options:
                                </h4>
                                {challenge.challengeOptions.map((option: any) => (
                                  <div 
                                    key={option.id}
                                    className={`p-2 rounded-lg border text-sm ${
                                      option.correct 
                                        ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200' 
                                        : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {option.correct ? (
                                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                                      ) : (
                                        <div className="h-3 w-3 rounded-full border-2 border-gray-400" />
                                      )}
                                      <span>{option.text}</span>
                                    </div>
                                    {option.guide && (
                                      <div className="mt-1 text-xs opacity-80">
                                        <div className="flex items-center gap-1">
                                          <Lightbulb className="h-3 w-3" />
                                          {option.guide}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Text Input Answer */}
                            {challenge.type === 'TEXT_INPUT' && challenge.correctAnswer && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Correct Answer:
                                </h4>
                                <div className="p-2 bg-green-50 border border-green-200 rounded-lg text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200 text-sm">
                                  {challenge.correctAnswer}
                                </div>
                              </div>
                            )}

                            {/* Hint */}
                            {challenge.hint && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Hint:
                                </h4>
                                <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Lightbulb className="h-3 w-3" />
                                    {challenge.hint}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Explanation */}
                            {challenge.explanation && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Explanation:
                                </h4>
                                <div className="p-2 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-200 text-sm">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href={`/lesson/${lesson.id}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Retake Lesson
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/learn">
                    <Target className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/review">
                    <Clock className="h-4 w-4 mr-2" />
                    View All Reviews
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Learning Assistant - Full Width at Bottom */}
          <AIChat 
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-500">
                                Q{index + 1}
                              </span>
                              {wasCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                            <Badge variant="neutral" className="text-xs">
                              {getChallengeTypeLabel(challenge.type)}
                            </Badge>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="mt-2">
                          <p className="text-gray-900 dark:text-gray-100 font-medium">
                            {challenge.question}
                          </p>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="pt-4 space-y-3">
                            {/* Challenge Options */}
                            {challenge.challengeOptions && challenge.challengeOptions.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Answer Options:
                                </h4>
                                {challenge.challengeOptions.map((option: any) => (
                                  <div 
                                    key={option.id}
                                    className={`p-3 rounded-lg border ${
                                      option.correct 
                                        ? 'bg-green-50 border-green-200 text-green-800' 
                                        : 'bg-gray-50 border-gray-200 text-gray-700'
                                    } dark:${
                                      option.correct 
                                        ? 'bg-green-900/20 border-green-800 text-green-200' 
                                        : 'bg-gray-800 border-gray-700 text-gray-300'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {option.correct ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                      ) : (
                                        <div className="h-4 w-4 rounded-full border-2 border-gray-400" />
                                      )}
                                      <span>{option.text}</span>
                                    </div>
                                    {option.guide && (
                                      <div className="mt-2 text-sm opacity-80">
                                        <div className="flex items-center gap-1">
                                          <Lightbulb className="h-3 w-3" />
                                          {option.guide}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Text Input Answer */}
                            {challenge.type === 'TEXT_INPUT' && challenge.correctAnswer && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Correct Answer:
                                </h4>
                                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200">
                                  {challenge.correctAnswer}
                                </div>
                              </div>
                            )}

                            {/* Hint */}
                            {challenge.hint && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Hint:
                                </h4>
                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200">
                                  <div className="flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4" />
                                    {challenge.hint}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/lesson/${lesson.id}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Retake Lesson
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/learn">
                    <Target className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/review">
                    <Clock className="h-4 w-4 mr-2" />
                    View All Reviews
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* AI Chat Sidebar */}
            {showAIChat && (
              <AIChat 
                lessonData={lesson}
                completionData={completion}
                onClose={() => setShowAIChat(false)}
                isPro={isPro}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}