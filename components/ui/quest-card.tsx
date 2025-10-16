import React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, Lock, Star } from "lucide-react"
import { Badge } from "./badge"
import { Progress } from "./progress"

export interface QuestCardProps {
  quest: {
    title: string
    description: string
    value: number
    reward: {
      xp: number
      hearts: number
      badge: string
    }
    icon: React.ComponentType<{ className?: string }>
    color: string
    difficulty: string
    category: string
    type: string
  }
  progress: number
  userPoints: number
  isCompleted?: boolean
  isNext?: boolean
  isLocked?: boolean
  className?: string
  onClick?: () => void
}

export const QuestCard = React.forwardRef<HTMLDivElement, QuestCardProps>(
  (
    {
      quest,
      progress,
      userPoints,
      isCompleted = false,
      isNext = false,
      isLocked = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const Icon = quest.icon

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg border p-4 sm:p-6 transition-all duration-200 hover:shadow-md",
          isCompleted
            ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
            : isLocked
            ? "bg-muted/30 border-muted opacity-60 cursor-not-allowed"
            : "bg-card hover:bg-muted/30",
          isNext && !isCompleted && "ring-2 ring-primary ring-offset-1",
          className
        )}
        onClick={!isLocked ? onClick : undefined}
        {...props}
      >
        {/* Header - Responsive */}
        <div className='flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4'>
          {/* Icon - Compact */}
          <div
            className={cn(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0",
              isCompleted
                ? "bg-green-500 text-white"
                : isLocked
                ? "bg-muted text-muted-foreground"
                : "bg-primary text-primary-foreground"
            )}
          >
            {isCompleted ? (
              <CheckCircle className='w-5 h-5 sm:w-6 sm:h-6' />
            ) : isLocked ? (
              <Lock className='w-5 h-5 sm:w-6 sm:h-6' />
            ) : (
              <Icon className='w-5 h-5 sm:w-6 sm:h-6' />
            )}
          </div>

          {/* Quest Info - Responsive */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between gap-2 mb-2'>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 mb-1'>
                  <h3
                    className={cn(
                      "font-semibold text-sm sm:text-base truncate",
                      isCompleted && "text-green-700 dark:text-green-300"
                    )}
                  >
                    {quest.title}
                  </h3>
                  {isNext && !isCompleted && (
                    <Badge variant='warning' className='text-xs px-2 py-0.5'>
                      Next
                    </Badge>
                  )}
                </div>
                <p className='text-xs sm:text-sm text-muted-foreground line-clamp-2'>
                  {quest.description}
                </p>
              </div>

              {/* Badges - Responsive */}
              <div className='flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0'>
                <Badge
                  variant={
                    quest.difficulty === "Beginner"
                      ? "success"
                      : quest.difficulty === "Intermediate"
                      ? "warning"
                      : quest.difficulty === "Advanced"
                      ? "error"
                      : "info"
                  }
                  className='text-xs'
                >
                  {quest.difficulty}
                </Badge>
                <Badge
                  variant='neutral'
                  className='text-xs hidden sm:inline-flex'
                >
                  {quest.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Progress - Only show for incomplete quests */}
        {!isCompleted && !isLocked && (
          <div className='mb-3 sm:mb-4'>
            <div className='flex justify-between items-center mb-2 text-xs sm:text-sm'>
              <span className='font-medium'>
                {userPoints} / {quest.value} XP
              </span>
              <span className='text-muted-foreground'>
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className='h-2' />
          </div>
        )}

        {/* Rewards - Simplified */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div className='flex items-center gap-1'>
              <Star className='w-4 h-4 text-yellow-500' />
              <span className='text-sm font-medium'>+{quest.reward.xp} XP</span>
            </div>

            <div className='flex items-center gap-1'>
              <div className='w-4 h-4 bg-red-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-xs'>♥</span>
              </div>
              <span className='text-sm font-medium'>
                +{quest.reward.hearts}
              </span>
            </div>
          </div>

          {isCompleted && (
            <Badge variant='success' className='text-sm'>
              ✓ Completed
            </Badge>
          )}
        </div>
      </div>
    )
  }
)

QuestCard.displayName = "QuestCard"
