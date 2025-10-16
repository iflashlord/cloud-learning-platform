import Link from "next/link"
import { quests, QUEST_ICON_MAP } from "@/constants"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, CheckCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  points: number
}

export const Quests = ({ points }: Props) => {
  // Filter and prioritize quests for display
  const incompleteQuests = quests.filter((quest) => points < quest.value)
  const completedQuests = quests.filter((quest) => points >= quest.value)

  // Show next 2 incomplete quests for better UX
  const displayQuests = incompleteQuests.slice(0, 2)

  // Progress calculation
  const totalProgress = (completedQuests.length / quests.length) * 100

  return (
    <div className='border rounded-lg bg-card p-3 sm:p-4 space-y-3 shadow-sm'>
      {/* Header - Responsive */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-md flex items-center justify-center'>
            <Trophy className='w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground' />
          </div>
          <h3 className='font-semibold text-sm sm:text-base'>Daily Quests</h3>
        </div>
        <Link href='/quests'>
          <Button size='sm' variant='ghost' className='text-xs p-1 sm:p-2'>
            <span className='hidden sm:inline mr-1'>View All</span>
            <ArrowRight className='w-3 h-3' />
          </Button>
        </Link>
      </div>

      {/* Progress Summary - Compact */}
      <div className='bg-muted/50 rounded-md p-2 sm:p-3'>
        <div className='flex items-center justify-between text-xs sm:text-sm mb-2'>
          <span className='font-medium'>
            {completedQuests.length}/{quests.length} Complete
          </span>
          <span className='font-bold text-primary'>{points} XP</span>
        </div>
        <Progress value={totalProgress} className='h-1.5 sm:h-2' />
      </div>

      {/* Quest List - Simplified */}
      <div className='space-y-2'>
        {displayQuests.length > 0 ? (
          displayQuests.map((quest) => {
            const progress = Math.min((points / quest.value) * 100, 100)
            const isCompleted = points >= quest.value
            const Icon = QUEST_ICON_MAP[quest.icon]

            return (
              <div
                className={cn(
                  "rounded-md border p-2 sm:p-3 transition-colors",
                  isCompleted
                    ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                    : "bg-muted/30 hover:bg-muted/50"
                )}
                key={quest.title}
              >
                <div className='flex items-start gap-2 sm:gap-3'>
                  {/* Icon - Compact */}
                  <div
                    className={cn(
                      "w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center flex-shrink-0",
                      isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-background text-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle className='w-3 h-3 sm:w-4 sm:h-4' />
                    ) : (
                      <Icon className='w-3 h-3 sm:w-4 sm:h-4' />
                    )}
                  </div>

                  {/* Quest Info - Streamlined */}
                  <div className='flex-1 min-w-0'>
                    <h4
                      className={cn(
                        "font-medium text-xs sm:text-sm truncate mb-1",
                        isCompleted && "text-green-700 dark:text-green-300"
                      )}
                    >
                      {quest.title}
                    </h4>

                    <div className='flex items-center justify-between text-xs mb-1'>
                      <span className='text-muted-foreground'>
                        {Math.min(points, quest.value)}/{quest.value} XP
                      </span>
                      <span className='font-medium'>
                        {Math.round(progress)}%
                      </span>
                    </div>

                    <Progress value={progress} className='h-1 sm:h-1.5' />

                    {/* Reward - Compact */}
                    {!isCompleted && (
                      <div className='flex items-center gap-2 mt-1 text-xs text-muted-foreground'>
                        <Star className='w-3 h-3 text-yellow-500' />
                        <span>+{quest.reward.xp} XP</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className='text-center py-6 text-muted-foreground'>
            <Trophy className='w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2' />
            <p className='text-xs sm:text-sm font-medium'>
              All quests completed!
            </p>
          </div>
        )}
      </div>

      {/* Action Button - Responsive */}
      {incompleteQuests.length > 0 && (
        <Link href='/quests' className='block'>
          <Button variant='primary' className='w-full' size='sm'>
            <span className='text-xs sm:text-sm'>Continue Quests</span>
            <ArrowRight className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />
          </Button>
        </Link>
      )}
    </div>
  )
}
