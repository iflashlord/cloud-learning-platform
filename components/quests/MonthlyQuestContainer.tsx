"use client"

import React from "react"
import { Calendar, Plus } from "lucide-react"
import { MonthlyQuestCard } from "./MonthlyQuestCard"
import { Button } from "@/components/ui/button"

interface MonthlyQuestContainerProps {
  monthlyQuestData: {
    quest: {
      id: number
      title: string
      description: string
      targetValue: number
      xpReward: number
      gemsReward: number
      month: string
      year: number
    }
    progress: {
      currentValue: number
      completed: boolean
      completedAt: Date | null
      rewardClaimed: boolean
    }
  } | null
  onCreateQuest?: () => void
  className?: string
}

export const MonthlyQuestContainer: React.FC<MonthlyQuestContainerProps> = ({
  monthlyQuestData,
  onCreateQuest,
  className = "",
}) => {
  if (!monthlyQuestData) {
    return (
      <div className={`bg-card rounded-lg border p-6 ${className}`}>
        <div className='text-center space-y-4'>
          <div className='w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto'>
            <Calendar className='w-6 h-6 text-muted-foreground' />
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2'>No Monthly Quest</h3>
            <p className='text-muted-foreground text-sm mb-4'>
              No monthly quest is currently active. Create one to start tracking your monthly
              progress!
            </p>
          </div>
          {onCreateQuest && (
            <Button onClick={onCreateQuest} variant='outline' className='w-full'>
              <Plus className='w-4 h-4 mr-2' />
              Create Monthly Quest
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className='mb-4'>
        <h2 className='text-xl font-semibold flex items-center gap-2'>
          <Calendar className='w-5 h-5' />
          Monthly Challenge
        </h2>
        <p className='text-muted-foreground text-sm'>Long-term goal to complete this month</p>
      </div>

      <MonthlyQuestCard quest={monthlyQuestData.quest} progress={monthlyQuestData.progress} />
    </div>
  )
}
