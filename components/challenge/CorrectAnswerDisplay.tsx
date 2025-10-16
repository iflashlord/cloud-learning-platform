"use client"

import { cn } from "@/lib/utils"
import { statusStyles } from "@/lib/style-utils"
import { challengeOptions } from "@/db/schema"

interface CorrectAnswerDisplayProps {
  showCorrectAnswer?: boolean
  status: "correct" | "wrong" | "none"
  options: (typeof challengeOptions.$inferSelect)[]
  correctAnswerText?: string
}

export const CorrectAnswerDisplay = ({
  showCorrectAnswer,
  status,
  options,
  correctAnswerText,
}: CorrectAnswerDisplayProps) => {
  const getCorrectAnswerText = () => {
    if (correctAnswerText) return correctAnswerText

    const correctOption = options.find((option) => option.correct)
    return correctOption?.text
  }

  const answerText = getCorrectAnswerText()

  if (!showCorrectAnswer || !answerText || status !== "wrong") {
    return null
  }

  return (
    <div className='px-6 mb-4'>
      <div
        className={cn(
          "border-2 rounded-lg p-4",
          statusStyles.success.bg,
          statusStyles.success.border
        )}
      >
        <div className='flex items-center space-x-2'>
          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-white",
              statusStyles.success.button
                .split(" ")
                .find((c) => c.startsWith("bg-")) || "bg-green-500"
            )}
          >
            ✓
          </div>
          <div>
            <p className='text-sm font-medium text-green-800 dark:text-green-200'>
              Correct Answer:
            </p>
            <p className='text-green-700 dark:text-green-300 font-medium'>
              {answerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
