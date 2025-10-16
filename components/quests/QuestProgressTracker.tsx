import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Trophy,
  Target,
  CheckCircle,
  Clock,
  Star,
  Filter,
} from "lucide-react"
import type { QuestProgressTrackerProps } from "./types"

export const QuestProgressTracker: React.FC<QuestProgressTrackerProps> = ({
  quests,
  userPoints,
  className,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Calculate quest statistics
  const completedQuests = quests.filter((quest) => userPoints >= quest.value)
  const availableQuests = quests.filter((quest) => userPoints < quest.value)
  const nextQuest = availableQuests[0] // Next quest to complete

  // Get categories
  const categories = [
    "all",
    ...Array.from(new Set(quests.map((quest) => quest.category))),
  ]

  // Overall progress
  const totalProgress = (completedQuests.length / quests.length) * 100

  // Next milestone calculation
  const nextMilestone = availableQuests.find(
    (quest) => quest.value > userPoints
  )
  const nextMilestoneProgress = nextMilestone
    ? Math.min((userPoints / nextMilestone.value) * 100, 100)
    : 100

  return (
    <div
      className={cn(
        "bg-card rounded-lg border p-4 sm:p-6 space-y-4 sm:space-y-6",
        className
      )}
    >
      {/* Header */}
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center'>
          <TrendingUp className='w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground' />
        </div>
        <div>
          <h2 className='text-lg sm:text-xl font-semibold'>Quest Progress</h2>
          <p className='text-xs sm:text-sm text-muted-foreground'>
            Your learning journey overview
          </p>
        </div>
      </div>

      {/* Overall Progress Card */}
      <div className='bg-muted/30 rounded-lg p-4 space-y-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Trophy className='w-4 h-4 text-yellow-500' />
            <span className='font-medium text-sm sm:text-base'>
              Overall Progress
            </span>
          </div>
          <span className='text-lg sm:text-xl font-bold text-primary'>
            {Math.round(totalProgress)}%
          </span>
        </div>
        <Progress value={totalProgress} className='h-2 sm:h-3' />
        <div className='flex items-center justify-between text-xs sm:text-sm text-muted-foreground'>
          <span>
            {completedQuests.length} of {quests.length} quests completed
          </span>
          <span>{userPoints} XP earned</span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>
        <div className='bg-green-50 dark:bg-green-950/30 rounded-lg p-3 text-center'>
          <CheckCircle className='w-5 h-5 text-green-600 mx-auto mb-1' />
          <div className='text-lg sm:text-xl font-bold text-green-700 dark:text-green-300'>
            {completedQuests.length}
          </div>
          <div className='text-xs text-green-600 dark:text-green-400'>
            Completed
          </div>
        </div>

        <div className='bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 text-center'>
          <Clock className='w-5 h-5 text-blue-600 mx-auto mb-1' />
          <div className='text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-300'>
            {availableQuests.length}
          </div>
          <div className='text-xs text-blue-600 dark:text-blue-400'>
            Remaining
          </div>
        </div>

        <div className='bg-purple-50 dark:bg-purple-950/30 rounded-lg p-3 text-center'>
          <Star className='w-5 h-5 text-purple-600 mx-auto mb-1' />
          <div className='text-lg sm:text-xl font-bold text-purple-700 dark:text-purple-300'>
            {userPoints}
          </div>
          <div className='text-xs text-purple-600 dark:text-purple-400'>
            Total XP
          </div>
        </div>

        <div className='bg-orange-50 dark:bg-orange-950/30 rounded-lg p-3 text-center'>
          <Target className='w-5 h-5 text-orange-600 mx-auto mb-1' />
          <div className='text-lg sm:text-xl font-bold text-orange-700 dark:text-orange-300'>
            {nextMilestone ? nextMilestone.value : "Max"}
          </div>
          <div className='text-xs text-orange-600 dark:text-orange-400'>
            Next Goal
          </div>
        </div>
      </div>

      {/* Next Quest Highlight */}
      {nextQuest && (
        <div className='bg-primary/5 border border-primary/20 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0'>
              <Target className='w-4 h-4 text-primary-foreground' />
            </div>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 mb-2'>
                <h3 className='font-medium text-sm sm:text-base truncate'>
                  Next: {nextQuest.title}
                </h3>
                <Badge variant='warning' className='text-xs'>
                  {nextQuest.difficulty}
                </Badge>
              </div>
              <p className='text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2'>
                {nextQuest.description}
              </p>

              {/* Progress to next quest */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-xs sm:text-sm'>
                  <span className='font-medium'>Progress to this quest</span>
                  <span>{Math.round(nextMilestoneProgress)}%</span>
                </div>
                <Progress value={nextMilestoneProgress} className='h-2' />
                <div className='flex items-center justify-between text-xs text-muted-foreground'>
                  <span>
                    {userPoints} / {nextQuest.value} XP
                  </span>
                  <div className='flex items-center gap-1'>
                    <Star className='w-3 h-3 text-yellow-500' />
                    <span>+{nextQuest.reward.xp} XP reward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter - Simplified */}
      <div className='flex flex-wrap items-center gap-2'>
        <Filter className='w-4 h-4 text-muted-foreground' />
        <span className='text-sm font-medium text-muted-foreground'>
          Filter:
        </span>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "primary" : "ghost"}
            size='sm'
            onClick={() => setSelectedCategory(category)}
            className='text-xs capitalize'
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Quick Quest Overview */}
      <div className='space-y-2'>
        <h4 className='font-medium text-sm'>Quest Categories Overview</h4>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs'>
          {categories
            .filter((cat) => cat !== "all")
            .map((category) => {
              const categoryQuests = quests.filter(
                (q) => q.category === category
              )
              const completedInCategory = categoryQuests.filter(
                (q) => userPoints >= q.value
              ).length
              const progressInCategory =
                (completedInCategory / categoryQuests.length) * 100

              return (
                <div
                  key={category}
                  className='flex items-center justify-between p-2 bg-muted/30 rounded'
                >
                  <span className='capitalize font-medium'>{category}</span>
                  <div className='flex items-center gap-2'>
                    <span className='text-muted-foreground'>
                      {completedInCategory}/{categoryQuests.length}
                    </span>
                    <div className='w-16 h-1.5 bg-background rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-primary transition-all duration-300'
                        style={{ width: `${progressInCategory}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
