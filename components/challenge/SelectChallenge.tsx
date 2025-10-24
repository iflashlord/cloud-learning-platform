"use client"

import { cn } from "@/lib/utils"
import { ChallengeCard } from "./ChallengeCard"
import { challengeOptions, challenges } from "@/db/schema"

interface SelectChallengeProps {
  options: (typeof challengeOptions.$inferSelect)[]
  selectedOption?: number
  onSelect: (id: number) => void
  status: "correct" | "wrong" | "none"
  disabled?: boolean
  type: (typeof challenges.$inferSelect)["type"]
  showCorrectAnswer?: boolean
}

export const SelectChallenge = ({
  options,
  selectedOption,
  onSelect,
  status,
  disabled,
  type,
  showCorrectAnswer,
}: SelectChallengeProps) => {
  const getGridClasses = () => {
    switch (type) {
      case "ASSIST":
        return "grid-cols-1"
      case "SELECT":
        return "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      case "IMAGE_SELECT":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      case "TRUE_FALSE":
        return "grid-cols-2"
      default:
        return "grid-cols-1"
    }
  }

  return (
    <div className='px-6'>
      <div className={cn("grid gap-3", getGridClasses())}>
        {options.map((option, i) => (
          <ChallengeCard
            key={option.id}
            id={option.id}
            text={option.text}
            imageSrc={option.imageSrc}
            shortcut={
              type === "TRUE_FALSE" ? (i === 0 ? "t" : "f") : `${i + 1}`
            }
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
            status={status}
            audioSrc={option.audioSrc}
            disabled={disabled}
            type={type}
          />
        ))}
      </div>
      {(() => {
        const selectedData = options.find(
          (option) => option.id === selectedOption
        )
        const shouldShowGuide =
          !!selectedData?.guide &&
          (status !== "none" || (!!showCorrectAnswer && selectedData.correct))

        if (!shouldShowGuide) return null

        return (
          <div
            className={cn(
              "mt-4 rounded-lg border px-4 py-3 text-sm leading-relaxed",
              selectedData?.correct
                ? "border-green-200 bg-green-50 text-green-800 dark:border-green-700/60 dark:bg-green-900/20 dark:text-green-200"
                : "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-700/60 dark:bg-rose-900/20 dark:text-rose-200"
            )}
          >
            {selectedData?.guide}
          </div>
        )
      })()}
    </div>
  )
}
