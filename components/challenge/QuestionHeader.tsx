"use client"

import { useState, ReactNode } from "react"
import { HelpCircle, Lightbulb, Sparkles } from "lucide-react"

import { Character } from "@/components/Character"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { statusStyles } from "@/lib/style-utils"
import { challenges } from "@/db/schema"

interface QuestionHeaderProps {
  challenge: typeof challenges.$inferSelect
  questionType: typeof challenges.$inferSelect["type"]
  status: "correct" | "wrong" | "none"
  children?: ReactNode
  isStudyCoachOpen: boolean
  onToggleStudyCoach: () => void
}

export const QuestionHeader = ({
  challenge,
  questionType,
  status,
  children,
  isStudyCoachOpen,
  onToggleStudyCoach,
}: QuestionHeaderProps) => {
  const [showHint, setShowHint] = useState(false)

  return (
    <div className={cn("bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border rounded-xl p-6 mb-6 shadow-sm", statusStyles.info.border)}>
      <div className="flex items-start space-x-4">
        <Character 
          questionType={questionType} 
          challengeId={challenge?.id || 0}
          state={status === "correct" ? "correct" : status === "wrong" ? "wrong" : "default"}
        />
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-neutral-200 dark:border-gray-600">
            <div className="flex items-start justify-between gap-3">
              <p className="text-neutral-800 dark:text-gray-100 font-medium leading-relaxed flex-1">
                {challenge?.question}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={onToggleStudyCoach}
                  className='flex items-center gap-2 border border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-200'
                >
                  <Sparkles className='w-4 h-4' />
                  {isStudyCoachOpen ? "Close Study Coach" : "Open Study Coach"}
                </Button>
                {challenge?.hint && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className={cn("ml-1 flex items-center space-x-1 transition-colors", statusStyles.info.text, "hover:opacity-80")}
                    title={showHint ? "Hide hint" : "Show hint"}
                  >
                    <HelpCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Hint</span>
                  </button>
                )}
              </div>
            </div>
            {challenge?.hint && showHint && (
              <div className={cn("mt-3 p-3 rounded-lg border transition-all duration-300 ease-in-out", statusStyles.warning.bg, statusStyles.warning.border)}>
                <p className={cn("text-sm flex items-start gap-2", statusStyles.warning.text)}>
                  <Lightbulb className="w-4 h-4 mt-0.5" />
                  <span>
                    <strong>Hint:</strong> {challenge.hint}
                  </span>
                </p>
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
