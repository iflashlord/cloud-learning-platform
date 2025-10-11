import Link from "next/link";
import Image from "next/image";

import { quests, QUEST_ICON_MAP } from "@/constants";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap, Crown, CheckCircle, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  points: number;
};

export const Quests = ({ points }: Props) => {
  // Get color classes based on quest color
  const getColorClasses = (color: string, isCompleted: boolean = false) => {
    if (isCompleted) {
      return "bg-gradient-to-br from-green-100 to-green-50 border-green-300 text-green-800";
    }
    
    const colorMap: Record<string, string> = {
      green: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
      blue: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200",
      orange: "bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200",
      purple: "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200",
      gold: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300",
      platinum: "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300",
      rainbow: "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-pink-200",
      cyan: "bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-200",
    };
    
    return colorMap[color] || "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200";
  };

  // Show only next 3 incomplete quests to avoid clutter
  const incompleteQuests = quests.filter(quest => points < quest.value);
  const completedQuests = quests.filter(quest => points >= quest.value);
  const displayQuests = [...incompleteQuests.slice(0, 3)];
  
  // Add one completed quest if available
  if (completedQuests.length > 0 && displayQuests.length < 3) {
    displayQuests.unshift(completedQuests[completedQuests.length - 1]);
  }

  return (
    <div className="border-2 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 p-4 space-y-4 shadow-sm">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-sm">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-bold text-lg text-orange-800">
            Daily Quests
          </h3>
        </div>
        <Link href="/quests">
          <Button
            size="sm"
            variant="outline"
            className="text-xs hover:bg-orange-100 border-orange-300"
          >
            <Star className="w-3 h-3 mr-1" />
            View All
          </Button>
        </Link>
      </div>

      {/* Progress Summary */}
      <div className="bg-white/70 rounded-lg p-3 border border-orange-200/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-orange-700 font-medium">
            {completedQuests.length} of {quests.length} completed
          </span>
          <span className="text-orange-600 font-bold">
            {points} XP
          </span>
        </div>
        <Progress 
          value={(completedQuests.length / quests.length) * 100} 
          className="h-2 mt-2 bg-orange-100"
        />
      </div>
      
      <div className="space-y-3">
        {displayQuests.length > 0 ? displayQuests.map((quest, index) => {
          const progress = Math.min((points / quest.value) * 100, 100);
          const isCompleted = points >= quest.value;
          const isNext = !isCompleted && index === 0 && incompleteQuests[0]?.title === quest.title;
          const Icon = QUEST_ICON_MAP[quest.icon];

          return (
            <div
              className={cn(
                "relative rounded-xl border-2 p-3 transition-all duration-200",
                getColorClasses(quest.color, isCompleted),
                isNext && "ring-2 ring-orange-300 ring-offset-1",
                isCompleted ? "opacity-90" : "hover:shadow-sm"
              )}
              key={quest.title}
            >
              {/* Quest Content */}
              <div className="flex items-start gap-3">
                {/* Quest Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold shadow-sm border-2",
                  isCompleted 
                    ? "bg-green-500 border-green-600 text-white" 
                    : quest.color === 'gold' 
                      ? "bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-500 text-white"
                      : quest.color === 'platinum'
                        ? "bg-gradient-to-br from-gray-400 to-slate-500 border-gray-500 text-white"
                        : "bg-white border-gray-200"
                )}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Quest Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={cn(
                      "font-bold text-sm truncate",
                      isCompleted ? "text-green-700" : "text-foreground"
                    )}>
                      {quest.title}
                    </h4>
                    {isNext && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-orange-200 text-orange-800 text-xs font-bold rounded-full">
                        <Zap className="w-3 h-3" />
                        NEXT
                      </div>
                    )}
                  </div>
                  
                  <p className={cn(
                    "text-xs mb-2 line-clamp-1",
                    isCompleted ? "text-green-600" : "text-muted-foreground"
                  )}>
                    {quest.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className={cn(
                        "font-medium",
                        isCompleted ? "text-green-600" : "text-muted-foreground"
                      )}>
                        {Math.min(points, quest.value)} / {quest.value} XP
                      </span>
                      <span className={cn(
                        "font-bold",
                        isCompleted ? "text-green-700" : "text-foreground"
                      )}>
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress 
                      value={progress} 
                      className={cn(
                        "h-2",
                        isCompleted ? "bg-green-100" : "bg-white/50"
                      )}
                    />
                  </div>

                  {/* Rewards Preview */}
                  {!isCompleted && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="font-medium">Reward:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>+{quest.reward.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" fill="currentColor" />
                        <span>+{quest.reward.hearts}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Completion Badge */}
              {isCompleted && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          );
        }) : (
          <div className="text-center py-4 text-muted-foreground">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-muted-foreground/60" />
            <p className="text-sm">All quests completed!</p>
            <p className="text-xs">Keep learning for more challenges</p>
          </div>
        )}
      </div>
      
      {/* Quick Action */}
      {incompleteQuests.length > 0 && (
        <Link href="/quests" className="block">
          <Button 
            variant="primary" 
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 border-0 shadow-sm"
            size="sm"
          >
            <Crown className="w-4 h-4 mr-2" />
            Continue Quest Journey
          </Button>
        </Link>
      )}
    </div>
  );
};
