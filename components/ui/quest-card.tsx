import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CheckCircle, Lock } from 'lucide-react';
import { Badge } from './badge';
import { Progress } from './progress';

// QuestCard Variants
const questCardVariants = cva(
  "relative rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700",
        green: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-900 dark:to-emerald-900 dark:border-green-700",
        blue: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-900 dark:to-cyan-900 dark:border-blue-700",
        orange: "bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 dark:from-orange-900 dark:to-yellow-900 dark:border-orange-700",
        purple: "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 dark:from-purple-900 dark:to-pink-900 dark:border-purple-700",
        gold: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 dark:from-yellow-900 dark:to-amber-900 dark:border-yellow-600",
        platinum: "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300 dark:from-gray-800 dark:to-slate-800 dark:border-gray-600",
        rainbow: "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-pink-200 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900 dark:border-pink-700",
        cyan: "bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-200 dark:from-cyan-900 dark:to-teal-900 dark:border-cyan-700",
        completed: "bg-gradient-to-br from-green-100 to-green-50 border-green-300 dark:from-green-800 dark:to-green-900 dark:border-green-600 opacity-90"
      },
      state: {
        default: "",
        active: "ring-2 ring-orange-400 ring-offset-2 shadow-lg",
        locked: "opacity-60 cursor-not-allowed"
      }
    },
    defaultVariants: {
      variant: "default",
      state: "default"
    }
  }
);

const questIconVariants = cva(
  "w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm border-2 font-bold flex-shrink-0",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600",
        completed: "bg-green-500 border-green-600 text-white",
        gold: "bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-500 text-white",
        platinum: "bg-gradient-to-br from-gray-400 to-slate-500 border-gray-500 text-white",
        locked: "bg-gray-200 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const difficultyVariants = cva(
  "px-2 py-1 text-xs font-medium rounded-md border",
  {
    variants: {
      difficulty: {
        Beginner: "bg-green-100 text-green-800 border-green-300 dark:bg-green-800 dark:text-green-100 dark:border-green-600",
        Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-800 dark:text-yellow-100 dark:border-yellow-600",
        Advanced: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-800 dark:text-orange-100 dark:border-orange-600",
        Expert: "bg-red-100 text-red-800 border-red-300 dark:bg-red-800 dark:text-red-100 dark:border-red-600"
      }
    },
    defaultVariants: {
      difficulty: "Beginner"
    }
  }
);

export interface QuestCardProps extends VariantProps<typeof questCardVariants> {
  quest: {
    title: string;
    description: string;
    value: number;
    reward: {
      xp: number;
      hearts: number;
      badge: string;
    };
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    difficulty: string;
    category: string;
    type: string;
  };
  progress: number;
  userPoints: number;
  isCompleted?: boolean;
  isNext?: boolean;
  isLocked?: boolean;
  className?: string;
  onClick?: () => void;
}

export const QuestCard = React.forwardRef<HTMLDivElement, QuestCardProps>(
  ({ 
    quest, 
    progress, 
    userPoints, 
    isCompleted = false, 
    isNext = false, 
    isLocked = false,
    className,
    onClick,
    ...props 
  }, ref) => {
    const Icon = quest.icon;
    
    const getVariant = () => {
      if (isCompleted) return "completed";
      return quest.color as any;
    };
    
    const getState = () => {
      if (isLocked) return "locked";
      if (isNext) return "active";
      return "default";
    };
    
    const getIconVariant = () => {
      if (isLocked) return "locked";
      if (isCompleted) return "completed";
      if (quest.color === 'gold') return "gold";
      if (quest.color === 'platinum') return "platinum";
      return "default";
    };

    return (
      <div
        ref={ref}
        className={cn(questCardVariants({ variant: getVariant(), state: getState() }), className)}
        onClick={!isLocked ? onClick : undefined}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={questIconVariants({ variant: getIconVariant() })}>
              {isCompleted ? (
                <CheckCircle className="w-6 h-6" />
              ) : isLocked ? (
                <Lock className="w-6 h-6" />
              ) : (
                <Icon className="w-6 h-6" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn(
                  "font-bold text-lg leading-tight",
                  isCompleted ? "text-green-700 dark:text-green-300" : "text-gray-900 dark:text-gray-100"
                )}>
                  {quest.title}
                </h3>
                {isNext && (
                  <Badge variant="warning" className="text-xs">
                    Next
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {quest.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={difficultyVariants({ difficulty: quest.difficulty as any })}>
              {quest.difficulty}
            </div>
            <Badge variant="default" className="text-xs">
              {quest.category}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        {!isCompleted && !isLocked && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress: {progress}%
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {userPoints} / {quest.value} points
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-2"
            />
          </div>
        )}

        {/* Rewards */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">XP</span>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                +{quest.reward.xp}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">♥</span>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                +{quest.reward.hearts}
              </span>
            </div>
            
            {quest.reward.badge && (
              <Badge variant="info" className="text-xs">
                {quest.reward.badge}
              </Badge>
            )}
          </div>
          
          {isCompleted && (
            <Badge variant="success" className="text-sm font-semibold">
              Completed!
            </Badge>
          )}
        </div>
      </div>
    );
  }
);

QuestCard.displayName = "QuestCard";