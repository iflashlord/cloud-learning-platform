"use client"

import { useState } from "react"
import { Trophy, CheckCircle, Clock, Zap, Gem, Heart, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CurrencyDisplay } from "./currency-display"

interface Quest {
  id: number
  title: string
  description: string
  type: string
  targetValue: number
  currentValue: number
  xpReward: number
  gemsReward: number
  heartsReward: number
  completed: boolean
  rewardClaimed: boolean
  expiresAt?: Date
}

interface QuestCardProps {
  quest: Quest
  onClaimReward?: (questId: number) => void
  isLoading?: boolean
}

const questTypeConfig = {
  complete_lessons: {
    icon: Target,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    description: "Complete lessons",
  },
  earn_xp: {
    icon: Zap,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    description: "Earn XP",
  },
  perfect_lesson: {
    icon: Trophy,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    description: "Perfect lessons",
  },
  streak: {
    icon: Clock,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    description: "Maintain streak",
  },
  practice_old: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    description: "Practice lessons",
  },
}

export const QuestCard = ({ quest, onClaimReward, isLoading }: QuestCardProps) => {
  const config = questTypeConfig[quest.type as keyof typeof questTypeConfig]
  const Icon = config?.icon || Target
  const progress = Math.min((quest.currentValue / quest.targetValue) * 100, 100)
  const isCompleted = quest.completed
  const canClaim = isCompleted && !quest.rewardClaimed

  const timeLeft = quest.expiresAt ? quest.expiresAt.getTime() - Date.now() : null
  const hoursLeft = timeLeft ? Math.floor(timeLeft / (1000 * 60 * 60)) : null

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        isCompleted && "ring-2 ring-green-500/20 bg-green-50/50 dark:bg-green-900/10",
        config?.bgColor,
      )}
    >
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-start gap-3 flex-1'>
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                config?.bgColor || "bg-gray-100 dark:bg-gray-800",
              )}
            >
              <Icon className={cn("h-5 w-5", config?.color || "text-gray-500")} />
            </div>
            <div className='flex-1 min-w-0'>
              <h3 className='font-semibold text-sm text-foreground truncate'>{quest.title}</h3>
              <p className='text-xs text-muted-foreground mt-1'>{quest.description}</p>
            </div>
          </div>
          {isCompleted && (
            <Badge
              variant='success'
              className='bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
            >
              Complete
            </Badge>
          )}
          {hoursLeft !== null && hoursLeft < 6 && !isCompleted && (
            <Badge variant='error' className='text-xs'>
              {hoursLeft}h left
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className='pt-0 space-y-3'>
        {/* Progress */}
        <div className='space-y-2'>
          <div className='flex justify-between items-center text-xs'>
            <span className='text-muted-foreground'>Progress</span>
            <span className='font-medium'>
              {quest.currentValue}/{quest.targetValue}
            </span>
          </div>
          <Progress value={progress} className='h-2' />
        </div>

        {/* Rewards */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 flex-wrap'>
            {quest.xpReward > 0 && <CurrencyDisplay type='xp' value={quest.xpReward} size='sm' />}
            {quest.gemsReward > 0 && (
              <CurrencyDisplay type='gems' value={quest.gemsReward} size='sm' />
            )}
            {quest.heartsReward > 0 && (
              <CurrencyDisplay type='hearts' value={quest.heartsReward} size='sm' />
            )}
          </div>

          {canClaim && onClaimReward && (
            <Button
              size='sm'
              onClick={() => onClaimReward(quest.id)}
              disabled={isLoading}
              className='bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
            >
              Claim
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface QuestListProps {
  quests: Quest[]
  onClaimReward?: (questId: number) => void
  isLoading?: boolean
  title?: string
  emptyMessage?: string
}

export const QuestList = ({
  quests,
  onClaimReward,
  isLoading,
  title = "Daily Quests",
  emptyMessage = "No quests available today. Check back tomorrow!",
}: QuestListProps) => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const filteredQuests = quests.filter((quest) => {
    switch (filter) {
      case "active":
        return !quest.completed
      case "completed":
        return quest.completed
      default:
        return true
    }
  })

  const completedCount = quests.filter((q) => q.completed).length
  const totalRewards = quests
    .filter((q) => q.completed && !q.rewardClaimed)
    .reduce(
      (acc, quest) => ({
        xp: acc.xp + quest.xpReward,
        gems: acc.gems + quest.gemsReward,
        hearts: acc.hearts + quest.heartsReward,
      }),
      { xp: 0, gems: 0, hearts: 0 },
    )

  return (
    <div className='space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-bold text-foreground'>{title}</h2>
          <p className='text-sm text-muted-foreground'>
            {completedCount}/{quests.length} completed
          </p>
        </div>

        {(totalRewards.xp > 0 || totalRewards.gems > 0 || totalRewards.hearts > 0) && (
          <div className='text-right'>
            <p className='text-xs text-muted-foreground mb-1'>Unclaimed rewards</p>
            <div className='flex gap-1'>
              {totalRewards.xp > 0 && (
                <CurrencyDisplay type='xp' value={totalRewards.xp} size='sm' />
              )}
              {totalRewards.gems > 0 && (
                <CurrencyDisplay type='gems' value={totalRewards.gems} size='sm' />
              )}
              {totalRewards.hearts > 0 && (
                <CurrencyDisplay type='hearts' value={totalRewards.hearts} size='sm' />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      {quests.length > 0 && (
        <div className='flex gap-1 p-1 bg-muted rounded-lg w-fit'>
          {[
            { key: "all", label: "All" },
            { key: "active", label: "Active" },
            { key: "completed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                filter === tab.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Quest Cards */}
      {filteredQuests.length > 0 ? (
        <div className='grid gap-3'>
          {filteredQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onClaimReward={onClaimReward}
              isLoading={isLoading}
            />
          ))}
        </div>
      ) : (
        <Card className='p-8 text-center'>
          <Trophy className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
          <p className='text-muted-foreground'>{emptyMessage}</p>
        </Card>
      )}
    </div>
  )
}
