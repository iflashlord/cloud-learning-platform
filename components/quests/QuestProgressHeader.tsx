import React from 'react';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { statusStyles } from '@/lib/style-utils';

interface QuestProgressHeaderProps {
  completedQuests: number;
  totalQuests: number;
}

export const QuestProgressHeader: React.FC<QuestProgressHeaderProps> = ({
  completedQuests,
  totalQuests
}) => {
  const completionPercentage = Math.round((completedQuests / totalQuests) * 100);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Quest Progress Tracker</h2>
          <p className="text-sm text-muted-foreground">Track your learning journey across all quests</p>
        </div>
      </div>
      
      {/* Overall Progress Ring */}
      <div className="relative">
        <div className="w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray={`${completionPercentage}, 100`}
              className="transition-all duration-300 ease-out"
            />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={cn("text-sm font-bold", statusStyles.info.text)}>
              {completionPercentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};