"use client"

import { Header } from "../../app/lesson/header"
import { Challenge } from "../../app/lesson/challenge"
import { Footer } from "../../app/lesson/footer"
import { CorrectAnswerDisplay } from "./CorrectAnswerDisplay"
import { LessonMeta, QuizChallenge } from "./types"

interface QuizLayoutProps {
  percentage: number
  hearts: number
  hasActiveSubscription: boolean
  challenge: QuizChallenge | null
  options: QuizChallenge["challengeOptions"]
  selectedOption: number | undefined
  textInput: string
  status: "correct" | "wrong" | "none"
  disabled: boolean
  lessonId: number | null
  wrongAttempts: number
  showCorrectAnswer: boolean
  onSelect: (id: number) => void
  onContinue: () => void
  onCheck: () => void
  onTextChange: (text: string) => void
  lesson: LessonMeta
  totalChallenges: number
}

export const QuizLayout = ({
  percentage,
  hearts,
  hasActiveSubscription,
  challenge,
  options,
  selectedOption,
  textInput,
  status,
  disabled,
  lessonId,
  wrongAttempts,
  showCorrectAnswer,
  onSelect,
  onContinue,
  onCheck,
  onTextChange,
  lesson,
  totalChallenges,
}: QuizLayoutProps) => {
  if (!challenge || !lessonId) {
    return null
  }

  const lessonContext = {
    lessonTitle: lesson.title,
    unitTitle: lesson.unit?.title ?? null,
    courseTitle: lesson.unit?.course?.title ?? null,
    percentage,
    totalChallenges,
  }

  return (
    <div className='flex flex-col h-screen'>
      {/* Fixed Header */}
      <div className='sticky top-0 z-10'>
        <Header
          hearts={hearts}
          percentage={percentage}
          hasActiveSubscription={hasActiveSubscription}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className='flex-1 overflow-y-auto pb-32 lg:pb-44'>
        <div className='max-w-4xl mx-auto p-4 lg:p-8'>
          <Challenge
            options={options}
            onSelect={onSelect}
            status={status}
            selectedOption={selectedOption}
            disabled={disabled}
            type={challenge.type}
            challenge={challenge}
            onTextChange={onTextChange}
            showCorrectAnswer={showCorrectAnswer}
            lessonContext={lessonContext}
          />

          {/* Show correct answer after 3 wrong attempts */}
          {showCorrectAnswer && (
            <CorrectAnswerDisplay challenge={challenge} options={options} />
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className='fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-t dark:border-gray-700'>
        <Footer
          disabled={
            disabled ||
            (() => {
              // For text input questions, check if text is entered
              if (
                challenge?.type === "TEXT_INPUT" ||
                challenge?.type === "SPEECH_INPUT"
              ) {
                return !textInput.trim()
              }
              // For drag and drop questions, always enable (items are already loaded)
              if (challenge?.type === "DRAG_DROP") {
                return false
              }
              // For option-based questions, check if option is selected
              return !selectedOption
            })()
          }
          status={status}
          onCheck={onCheck}
          lessonId={lessonId}
        />
      </div>
    </div>
  )
}
