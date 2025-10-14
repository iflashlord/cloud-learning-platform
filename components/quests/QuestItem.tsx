import React from 'react';
import { Trophy, Heart, Zap, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { statusStyles } from '@/lib/style-utils';
import { Progress } from '@/components/ui/progress';
import { QUEST_ICON_MAP } from '@/constants';
import type { QuestItemProps, QuestStatus } from './types';

export const QuestItem: React.FC<QuestItemProps> = ({ quest, status, progress, userPoints }) => {
  const Icon = QUEST_ICON_MAP[quest.icon] ?? Trophy;
  
  const getStatusIcon = (status: QuestStatus) => {
    switch (status) {
      case "completed": 
        return <Trophy className="w-4 h-4" />;
      case "active": 
        return <Icon className="w-5 h-5" />;
      case "upcoming": 
        return <Icon className="w-5 h-5" />;
      default: 
        return null;
    }
  };

  const getStatusColor = (status: QuestStatus) => {
    switch (status) {
      case "completed": 
        return statusStyles.success.bg + " " + statusStyles.success.text + " " + statusStyles.success.border;
      case "active": 
        return statusStyles.info.bg + " " + statusStyles.info.text + " " + statusStyles.info.border;
      case "upcoming": 
        return statusStyles.neutral.bg + " " + statusStyles.neutral.text + " " + statusStyles.neutral.border;
      default: 
        return statusStyles.neutral.bg + " " + statusStyles.neutral.text + " " + statusStyles.neutral.border;
    }
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md",
        status === "completed" ? cn(statusStyles.success.bg, statusStyles.success.border) :
        status === "active" ? cn(statusStyles.info.bg, statusStyles.info.border) :
        cn(statusStyles.neutral.bg, statusStyles.neutral.border)
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-sm",
            status === "completed" ? cn(statusStyles.success.button, "text-white") :
            status === "active" ? cn(statusStyles.info.button, "text-white") :
            cn(statusStyles.neutral.button, statusStyles.neutral.text)
          )}>
            {getStatusIcon(status)}
          </div>
          <div className="flex-1">
            <h4 className={cn(
              "font-bold text-sm",
              status === "completed" ? statusStyles.success.text : "text-foreground"
            )}>
              {quest.title}
            </h4>
            <p className="text-xs text-muted-foreground mb-1">{quest.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-2 py-1 text-xs font-bold rounded-full border",
            getStatusColor(status)
          )}>
            {status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress: {Math.min(userPoints, quest.value)} / {quest.value} XP</span>
          <span className="font-bold">{Math.round(progress)}%</span>
        </div>
        <Progress 
          value={progress} 
          className={cn(
            "h-2",
            status === "completed" ? "[&>div]:bg-green-500" :
            status === "active" ? "[&>div]:bg-blue-500" :
            "[&>div]:bg-muted-foreground"
          )}
        />
      </div>

      {/* Rewards */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs">
          {quest.reward.xp && (
            <span className={cn("flex items-center gap-1", statusStyles.info.text)}>
              <Zap className="w-3 h-3" />
              +{quest.reward.xp} XP
            </span>
          )}
          {quest.reward.hearts && (
            <span className={cn("flex items-center gap-1", statusStyles.error.text)}>
              <Heart className={cn("w-3 h-3", statusStyles.error.text)} style={{fill: 'currentColor'}} />
              +{quest.reward.hearts}
            </span>
          )}
          {quest.reward.badge && (
            <span className={cn("flex items-center gap-1", "text-purple-600 dark:text-purple-400")}>
              <Medal className="w-3 h-3" />
              {quest.reward.badge}
            </span>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {quest.difficulty} • {quest.category}
        </div>
      </div>
    </div>
  );
};