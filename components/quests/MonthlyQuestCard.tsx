"use client";

import React from "react";
import { Calendar, CheckCircle, Clock, Star, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface MonthlyQuestProps {
  quest: {
    id: number;
    title: string;
    description: string;
    targetValue: number;
    xpReward: number;
    gemsReward: number;
    month: string;
    year: number;
  };
  progress: {
    currentValue: number;
    completed: boolean;
    completedAt: Date | null;
    rewardClaimed: boolean;
  };
  className?: string;
}

export const MonthlyQuestCard: React.FC<MonthlyQuestProps> = ({
  quest,
  progress,
  className = "",
}) => {
  const progressPercentage = Math.min((progress.currentValue / quest.targetValue) * 100, 100);
  const isCompleted = progress.completed;
  const daysRemaining = getDaysRemainingInMonth();

  const formatMonth = (month: string, year: number) => {
    const date = new Date(year, parseInt(month.split('-')[1]) - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className={`
      relative bg-gradient-to-br from-purple-600 to-blue-600 
      rounded-xl p-6 text-white overflow-hidden 
      transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
      ${className}
    `}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4">
          <Calendar className="w-16 h-16" />
        </div>
      </div>

      {/* Completion Badge */}
      {isCompleted && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-green-500 text-white border-none">
            <Trophy className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">{quest.title}</h3>
            <p className="text-purple-100 text-sm">
              {formatMonth(quest.month, quest.year)}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-purple-100 text-sm mb-4">
          {quest.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Progress: {progress.currentValue} / {quest.targetValue}
            </span>
            <span className="text-sm text-purple-100">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-white/20"
          />
        </div>

        {/* Time Remaining */}
        {!isCompleted && (
          <div className="flex items-center gap-2 mb-4 text-purple-100">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {daysRemaining} days remaining this month
            </span>
          </div>
        )}

        {/* Rewards */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">+{quest.xpReward} XP</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              <span className="text-sm font-medium">+{quest.gemsReward} Gems</span>
            </div>
          </div>

          {isCompleted && (
            <div className="flex items-center gap-1 text-green-300">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {progress.completedAt 
                  ? `Completed ${new Date(progress.completedAt).toLocaleDateString()}`
                  : "Completed"
                }
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function getDaysRemainingInMonth(): number {
  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysRemaining = lastDayOfMonth.getDate() - now.getDate();
  return Math.max(0, daysRemaining);
}