"use client";

import { useState } from "react";
import { CheckCircle, Clock, Star, Trophy, Target, TrendingUp, Zap, Award, Crown, Medal, Heart } from "lucide-react";
import { statusStyles } from "@/lib/style-utils";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { QUEST_ICON_MAP, type QuestIconKey } from "@/constants";

type Quest = {
  title: string;
  description: string;
  value: number;
  reward: {
    xp: number;
    hearts: number;
    badge: string;
  };
  icon: QuestIconKey;
  color: string;
  difficulty: string;
  category: string;
  type: string;
};

type Props = {
  quests: Quest[];
  userPoints: number;
  className?: string;
};

export const QuestProgressTracker = ({ quests, userPoints, className }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Calculate quest statistics
  const completedQuests = quests.filter(quest => userPoints >= quest.value);
  const activeQuests = quests.filter(quest => userPoints < quest.value && userPoints > (quest.value * 0.1));
  const upcomingQuests = quests.filter(quest => userPoints < (quest.value * 0.1));
  
  // Get categories
  const categories = ["all", ...Array.from(new Set(quests.map(quest => quest.category)))];
  
  // Filter quests based on selected category
  const filteredQuests = selectedCategory === "all" 
    ? quests 
    : quests.filter(quest => quest.category === selectedCategory);

  const getQuestStatus = (quest: Quest) => {
    if (userPoints >= quest.value) return "completed";
    if (userPoints > (quest.value * 0.1)) return "active";
    return "upcoming";
  };

  const getProgressPercentage = (quest: Quest) => {
    return Math.min((userPoints / quest.value) * 100, 100);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className={cn("w-5 h-5", statusStyles.success.text)} />;
      case "active": return <Clock className={cn("w-5 h-5", statusStyles.info.text)} />;
      case "upcoming": return <Target className={cn("w-5 h-5", statusStyles.neutral.text)} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return statusStyles.success.bg + " " + statusStyles.success.text + " " + statusStyles.success.border;
      case "active": return statusStyles.info.bg + " " + statusStyles.info.text + " " + statusStyles.info.border;
      case "upcoming": return statusStyles.neutral.bg + " " + statusStyles.neutral.text + " " + statusStyles.neutral.border;
      default: return statusStyles.neutral.bg + " " + statusStyles.neutral.text + " " + statusStyles.neutral.border;
    }
  };

  return (
    <div className={cn("bg-card rounded-xl border-2 border-blue-200 dark:border-blue-700 shadow-lg p-6", className)}>
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
                strokeDasharray={`${(completedQuests.length / quests.length) * 100}, 100`}
                className="transition-all duration-300 ease-out"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={cn("text-sm font-bold", statusStyles.info.text)}>
                {Math.round((completedQuests.length / quests.length) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className={cn("text-center p-3 rounded-lg", statusStyles.success.bg, statusStyles.success.border, "border")}>
          <CheckCircle className={cn("w-5 h-5 mx-auto mb-1", statusStyles.success.text)} />
          <div className={cn("text-lg font-bold", statusStyles.success.text)}>{completedQuests.length}</div>
          <div className={cn("text-xs", statusStyles.success.text)}>Completed</div>
        </div>
        
        <div className={cn("text-center p-3 rounded-lg", statusStyles.info.bg, statusStyles.info.border, "border")}>
          <Clock className={cn("w-5 h-5 mx-auto mb-1", statusStyles.info.text)} />
          <div className={cn("text-lg font-bold", statusStyles.info.text)}>{activeQuests.length}</div>
          <div className={cn("text-xs", statusStyles.info.text)}>Active</div>
        </div>
        
        <div className={cn("text-center p-3 rounded-lg", statusStyles.neutral.bg, statusStyles.neutral.border, "border")}>
          <Target className={cn("w-5 h-5 mx-auto mb-1", statusStyles.neutral.text)} />
          <div className={cn("text-lg font-bold", statusStyles.neutral.text)}>{upcomingQuests.length}</div>
          <div className={cn("text-xs", statusStyles.neutral.text)}>Upcoming</div>
        </div>
        
        <div className={cn("text-center p-3 rounded-lg", statusStyles.warning.bg, statusStyles.warning.border, "border")}>
          <Star className={cn("w-5 h-5 mx-auto mb-1", statusStyles.warning.text)} />
          <div className={cn("text-lg font-bold", statusStyles.warning.text)}>{userPoints}</div>
          <div className={cn("text-xs", statusStyles.warning.text)}>Total XP</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "text-xs font-medium transition-colors",
                selectedCategory === category 
                  ? "bg-blue-500 text-white hover:bg-blue-600" 
                  : "hover:bg-blue-50 hover:border-blue-300"
              )}
            >
              {category === "all" ? "All Quests" : category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Quest List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredQuests.map((quest, index) => {
          const status = getQuestStatus(quest);
          const progress = getProgressPercentage(quest);
          const Icon = QUEST_ICON_MAP[quest.icon] ?? Trophy;
          
          return (
            <div
              key={`${quest.title}-${index}`}
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
                    {status === "completed" ? (
                      <Trophy className="w-4 h-4" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
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
                  {getStatusIcon(status)}
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
        })}
      </div>
    </div>
  );
};
