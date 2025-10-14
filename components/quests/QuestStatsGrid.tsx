import React from 'react';
import { CheckCircle, Clock, Target, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { statusStyles } from '@/lib/style-utils';
import type { QuestStatsProps } from './types';

export const QuestStatsGrid: React.FC<QuestStatsProps> = ({
  completedCount,
  activeCount,
  upcomingCount,
  totalXp
}) => {
  const stats = [
    {
      icon: CheckCircle,
      value: completedCount,
      label: "Completed",
      style: statusStyles.success
    },
    {
      icon: Clock,
      value: activeCount,
      label: "Active",
      style: statusStyles.info
    },
    {
      icon: Target,
      value: upcomingCount,
      label: "Upcoming",
      style: statusStyles.neutral
    },
    {
      icon: Star,
      value: totalXp,
      label: "Total XP",
      style: statusStyles.warning
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div 
            key={index}
            className={cn(
              "text-center p-3 rounded-lg border",
              stat.style.bg,
              stat.style.border
            )}
          >
            <Icon className={cn("w-5 h-5 mx-auto mb-1", stat.style.text)} />
            <div className={cn("text-lg font-bold", stat.style.text)}>
              {stat.value}
            </div>
            <div className={cn("text-xs", stat.style.text)}>
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};