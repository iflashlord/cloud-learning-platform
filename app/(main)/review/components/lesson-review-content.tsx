"use client"

import { useState } from "react"
import Image from "next/image"
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
  Volume2,
  Image as ImageIcon,
  Video,
  Mic,
  Move,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { QuestionStudyCoach } from "@/components/challenge/QuestionStudyCoach"

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
  const [studyCoachOpen, setStudyCoachOpen] = useState<Record<number, boolean>>({})
  const [studyCoachLastMessage, setStudyCoachLastMessage] = useState<Record<number, string | null>>(
    {},
  )

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
      case "TRUE_FALSE":
        return "True/False"
      case "DRAG_DROP":
        return "Drag & Drop"
      case "IMAGE_SELECT":
        return "Image Selection"
      case "LISTENING":
        return "Listening"
      case "SPEECH_INPUT":
        return "Speech Input"
      case "VIDEO":
        return "Video Question"
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
                <Badge className='bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700'>
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

          {/* Question Types Summary */}
          <Card className='p-4'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Target className='h-5 w-5' />
                Question Types Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {(() => {
                  const typeCount = lesson.challenges.reduce(
                    (acc: Record<string, number>, challenge: any) => {
                      acc[challenge.type] = (acc[challenge.type] || 0) + 1
                      return acc
                    },
                    {},
                  )

                  return Object.entries(typeCount).map(([type, count]) => (
                    <div
                      key={type}
                      className='text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
                    >
                      <div className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                        {count as number}
                      </div>
                      <div className='text-xs text-gray-600 dark:text-gray-400'>
                        {getChallengeTypeLabel(type)}
                      </div>
                    </div>
                  ))
                })()}
              </div>

              {/* Media Content Summary */}
              {(() => {
                const mediaCount = {
                  audio: lesson.challenges.filter((c: any) => c.audioSrc).length,
                  video: lesson.challenges.filter((c: any) => c.videoSrc).length,
                  image: lesson.challenges.filter((c: any) => c.imageSrc).length,
                }

                const hasMedia = mediaCount.audio + mediaCount.video + mediaCount.image > 0

                return hasMedia ? (
                  <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                    <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      Media Content:
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {mediaCount.audio > 0 && (
                        <div className='flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-xs text-blue-800 dark:text-blue-200'>
                          <Volume2 className='h-3 w-3' />
                          {mediaCount.audio} Audio
                        </div>
                      )}
                      {mediaCount.video > 0 && (
                        <div className='flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded text-xs text-purple-800 dark:text-purple-200'>
                          <Video className='h-3 w-3' />
                          {mediaCount.video} Video
                        </div>
                      )}
                      {mediaCount.image > 0 && (
                        <div className='flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs text-green-800 dark:text-green-200'>
                          <ImageIcon className='h-3 w-3' />
                          {mediaCount.image} Image
                        </div>
                      )}
                    </div>
                  </div>
                ) : null
              })()}
            </CardContent>
          </Card>

          {/* Questions and Answers */}
          <Card className='p-4'>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                <div className='flex items-center gap-2 p-2'>
                  <MessageSquare className='h-5 w-5' />
                  Questions & Answers Review
                  <Badge variant='neutral' className='text-xs'>
                    {expandedChallenges.size}/{lesson.challenges.length} expanded
                  </Badge>
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
                  const isCoachOpen = studyCoachOpen[challenge.id] ?? false
                  const lastMessageId = studyCoachLastMessage[challenge.id] ?? null
                  const lessonContext = {
                    lessonTitle: lesson.title,
                    unitTitle: lesson.unit?.title ?? null,
                    courseTitle: lesson.unit?.course?.title ?? null,
                    percentage: completion.score,
                    totalChallenges: lesson.challenges.length,
                  }

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
                            <div className='flex items-center gap-2'>
                              <Badge variant='neutral' className='text-xs'>
                                {getChallengeTypeLabel(challenge.type)}
                              </Badge>
                              {/* Visual indicators for media content */}
                              <div className='flex items-center gap-1'>
                                {challenge.audioSrc && (
                                  <div className='p-1 bg-blue-100 dark:bg-blue-900/30 rounded'>
                                    <Volume2 className='h-3 w-3 text-blue-600 dark:text-blue-400' />
                                  </div>
                                )}
                                {challenge.videoSrc && (
                                  <div className='p-1 bg-purple-100 dark:bg-purple-900/30 rounded'>
                                    <Video className='h-3 w-3 text-purple-600 dark:text-purple-400' />
                                  </div>
                                )}
                                {challenge.imageSrc && (
                                  <div className='p-1 bg-green-100 dark:bg-green-900/30 rounded'>
                                    <ImageIcon className='h-3 w-3 text-green-600 dark:text-green-400' />
                                  </div>
                                )}
                                {challenge.type === "SPEECH_INPUT" && (
                                  <div className='p-1 bg-orange-100 dark:bg-orange-900/30 rounded'>
                                    <Mic className='h-3 w-3 text-orange-600 dark:text-orange-400' />
                                  </div>
                                )}
                                {challenge.type === "DRAG_DROP" && (
                                  <div className='p-1 bg-amber-100 dark:bg-amber-900/30 rounded'>
                                    <Move className='h-3 w-3 text-amber-600 dark:text-amber-400' />
                                  </div>
                                )}
                              </div>
                            </div>
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
                            {/* Audio Content */}
                            {challenge.audioSrc && (
                              <div className='space-y-2'>
                                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                                  <Volume2 className='h-4 w-4' />
                                  Audio Content:
                                </h4>
                                <div className='p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800'>
                                  <audio controls className='w-full'>
                                    <source src={challenge.audioSrc} type='audio/mpeg' />
                                    Your browser does not support the audio element.
                                  </audio>
                                </div>
                              </div>
                            )}

                            {/* Video Content */}
                            {challenge.videoSrc && (
                              <div className='space-y-2'>
                                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                                  <Video className='h-4 w-4' />
                                  Video Content:
                                </h4>
                                <div className='p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800'>
                                  <video controls className='w-full max-h-64 rounded'>
                                    <source src={challenge.videoSrc} type='video/mp4' />
                                    Your browser does not support the video element.
                                  </video>
                                </div>
                              </div>
                            )}

                            {/* Image Content */}
                            {challenge.imageSrc && (
                              <div className='space-y-2'>
                                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                                  <ImageIcon className='h-4 w-4' />
                                  Image Content:
                                </h4>
                                <div className='p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800'>
                                  <div className='relative w-full h-64'>
                                    <Image
                                      src={challenge.imageSrc}
                                      alt='Question image'
                                      fill
                                      className='object-contain rounded'
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Challenge Options for Multiple Choice, True/False, Image Select, etc. */}
                            {challenge.challengeOptions &&
                              challenge.challengeOptions.length > 0 && (
                                <div className='space-y-2'>
                                  <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    {challenge.type === "TRUE_FALSE"
                                      ? "True/False Options:"
                                      : "Answer Options:"}
                                  </h4>
                                  {challenge.challengeOptions.map((option: any, index: number) => (
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
                                        <span className='font-medium text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>
                                          {String.fromCharCode(65 + index)}
                                        </span>
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
                                      {/* Show image for image select options */}
                                      {option.imageSrc && (
                                        <div className='mt-2'>
                                          <div className='relative w-20 h-20'>
                                            <Image
                                              src={option.imageSrc}
                                              alt={`Option ${String.fromCharCode(65 + index)}`}
                                              fill
                                              className='object-cover rounded border'
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                            {/* Text Input/Speech Input Answer */}
                            {(challenge.type === "TEXT_INPUT" ||
                              challenge.type === "SPEECH_INPUT") &&
                              challenge.correctAnswer && (
                                <div className='space-y-2'>
                                  <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                                    {challenge.type === "SPEECH_INPUT" && (
                                      <Mic className='h-4 w-4' />
                                    )}
                                    Correct Answer:
                                  </h4>
                                  <div className='p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'>
                                    {challenge.correctAnswer}
                                  </div>
                                </div>
                              )}

                            {/* Drag & Drop Instructions */}
                            {challenge.type === "DRAG_DROP" && (
                              <div className='space-y-2'>
                                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                                  <Move className='h-4 w-4' />
                                  Drag & Drop Question:
                                </h4>
                                <div className='p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200'>
                                  <p className='text-sm'>
                                    This question requires dragging and dropping items in the
                                    correct order.
                                    {challenge.challengeOptions?.length > 0 && (
                                      <span> Review the correct sequence above.</span>
                                    )}
                                  </p>
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

                            {/* Question Type Information */}
                            <div className='pt-2 border-t border-gray-200 dark:border-gray-700'>
                              {/* Show fallback message if no answer content is available */}
                              {!challenge.challengeOptions?.length &&
                                !challenge.correctAnswer &&
                                !challenge.audioSrc &&
                                !challenge.videoSrc &&
                                !challenge.imageSrc && (
                                  <div className='mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200'>
                                    <div className='flex items-center gap-2 text-sm'>
                                      <Lightbulb className='h-4 w-4' />
                                      <span>
                                        This question may require interaction during the lesson to
                                        see the full answer content.
                                      </span>
                                    </div>
                                  </div>
                                )}

                              <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400'>
                                <span>Question Type:</span>
                                <Badge variant='neutral' className='text-xs'>
                                  {getChallengeTypeLabel(challenge.type)}
                                </Badge>
                                {challenge.type === "LISTENING" && challenge.audioSrc && (
                                  <span className='flex items-center gap-1'>
                                    <Volume2 className='h-3 w-3' />
                                    Audio-based
                                  </span>
                                )}
                                {challenge.type === "VIDEO" && challenge.videoSrc && (
                                  <span className='flex items-center gap-1'>
                                    <Video className='h-3 w-3' />
                                    Video-based
                                  </span>
                                )}
                                {challenge.type === "IMAGE_SELECT" && (
                                  <span className='flex items-center gap-1'>
                                    <ImageIcon className='h-3 w-3' />
                                    Image-based
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className='pt-4 border-t border-dashed border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3'>
                              <div className='text-xs text-gray-500 dark:text-gray-400'>
                                Need a deeper explanation for this challenge?
                              </div>
                              <Button
                                size='sm'
                                variant='ai'
                                onClick={(event) => {
                                  event.stopPropagation()
                                  setStudyCoachOpen((prev) => ({
                                    ...prev,
                                    [challenge.id]: !isCoachOpen,
                                  }))
                                }}
                              >
                                <Sparkles className='h-4 w-4' />
                                {isCoachOpen ? "Close Study Coach" : "Open Study Coach"}
                              </Button>
                            </div>

                            {isCoachOpen && (
                              <div className='mt-3'>
                                <QuestionStudyCoach
                                  lesson={lessonContext}
                                  challenge={challenge}
                                  options={challenge.challengeOptions ?? []}
                                  lastMessageId={lastMessageId}
                                  onMessagesChange={(latestId) =>
                                    setStudyCoachLastMessage((prev) => ({
                                      ...prev,
                                      [challenge.id]: latestId,
                                    }))
                                  }
                                />
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
        </div>
      </div>
    </div>
  )
}
