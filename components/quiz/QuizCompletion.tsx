"use client"

import Confetti from "react-confetti"
import { CheckCircle, PartyPopper, RotateCcw } from "lucide-react"
import { useWindowSize } from "react-use"
import { ResultCard } from "../../app/lesson/result-card"
import { GAMIFICATION } from "@/constants"
import { Button } from "@/components/ui/button"
import { LessonRecapButton } from "./LessonRecapButton"

interface QuizCompletionProps {
  challenges: any[]
  hearts: number
  lessonId: number
  onComplete: () => void
  onRedo: () => void
  finishAudio?: React.ReactElement
  userSubscription?: {
    isActive: boolean
  } | null
  isPractice?: boolean
  lessonTitle: string
  unitTitle?: string | null
  courseTitle?: string | null
}

export const QuizCompletion = ({
  challenges,
  hearts,
  lessonId,
  onComplete,
  onRedo,
  finishAudio,
  userSubscription,
  isPractice = false,
  lessonTitle,
  unitTitle,
  courseTitle,
}: QuizCompletionProps) => {
  const { width, height } = useWindowSize()

  const questionXPPer = isPractice
    ? GAMIFICATION.XP_PER_PRACTICE_QUESTION
    : GAMIFICATION.XP_PER_QUESTION
  const questionXP = questionXPPer * challenges.length

  const lessonXP = isPractice
    ? userSubscription?.isActive
      ? GAMIFICATION.XP_PER_PRACTICE_LESSON_PRO
      : GAMIFICATION.XP_PER_PRACTICE_LESSON
    : GAMIFICATION.XP_PER_LESSON

  const totalXP = lessonXP + questionXP

  const practiceProBonus =
    isPractice && userSubscription?.isActive
      ? GAMIFICATION.XP_PER_PRACTICE_LESSON_PRO - GAMIFICATION.XP_PER_PRACTICE_LESSON
      : 0

  return (
    <div className='flex flex-col h-screen'>
      {finishAudio}
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />

      <div className='flex-1 overflow-y-auto pb-32 lg:pb-44'>
        <div className='min-h-full flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center p-4'>
          <CheckCircle className='hidden lg:block h-24 w-24 text-green-500' />
          <CheckCircle className='block lg:hidden h-12 w-12 text-green-500' />
          <h1 className='text-xl lg:text-3xl font-bold text-foreground'>
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <LessonRecapButton
            lessonId={lessonId}
            lessonTitle={lessonTitle}
            unitTitle={unitTitle}
            courseTitle={courseTitle}
            label='Get AI recap'
            fullWidth
          />
          <div className='flex items-center gap-x-4 w-full'>
            <ResultCard variant='points' value={totalXP} />
            <ResultCard variant='hearts' value={hearts} />
          </div>

          <div className='text-sm text-muted-foreground space-y-1'>
            <p>
              {isPractice ? "Practice lesson" : "Lesson"} reward: <strong>{lessonXP} XP</strong>
            </p>
            {questionXPPer > 0 && (
              <p>
                Questions: {challenges.length} × {questionXPPer} XP = <strong>{questionXP} XP</strong>
              </p>
            )}
          </div>

          {practiceProBonus > 0 && (
            <div className='mt-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold align-middle'>
              <PartyPopper className='inline align-middle' /> Pro Practice Bonus: +
              {practiceProBonus} XP
            </div>
          )}
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-t dark:border-gray-700 p-4'>
        <div className='max-w-4xl mx-auto flex justify-center gap-4'>
          <Button
            onClick={onRedo}
            size='lg'
            variant='secondary'
            className='min-w-[150px] font-extrabold tracking-wide'
          >
            <RotateCcw className='w-4 h-4 mr-2' />
            REDO
          </Button>
          <Button
            onClick={onComplete}
            size='lg'
            variant='success'
            className='min-w-[200px] font-extrabold tracking-wide'
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  )
}
