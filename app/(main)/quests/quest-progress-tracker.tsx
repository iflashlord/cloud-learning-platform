"use client";

import { useState } from "react";
import { CheckCircle, Clock, Star, Trophy, Target, TrendingUp, Zap, Award, Crown, Medal, Heart } from "lucide-react";
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
      case "completed": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "active": return <Clock className="w-5 h-5 text-blue-600" />;
      case "upcoming": return <Target className="w-5 h-5 text-gray-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-300";
      case "active": return "bg-blue-100 text-blue-800 border-blue-300";
      case "upcoming": return "bg-gray-100 text-gray-600 border-gray-300";
      default: return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return (
    <div className={cn("bg-white rounded-xl border-2 border-blue-200 shadow-lg p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Quest Progress Tracker</h2>
            <p className="text-sm text-gray-600">Track your learning journey across all quests</p>
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
              <div className="text-sm font-bold text-blue-600">
                {Math.round((completedQuests.length / quests.length) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-green-700">{completedQuests.length}</div>
          <div className="text-xs text-green-600">Completed</div>
        </div>
        
        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-blue-700">{activeQuests.length}</div>
          <div className="text-xs text-blue-600">Active</div>
        </div>
        
        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-200">
          <Target className="w-5 h-5 text-gray-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-gray-700">{upcomingQuests.length}</div>
          <div className="text-xs text-gray-600">Upcoming</div>
        </div>
        
        <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
          <Star className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-yellow-700">{userPoints}</div>
          <div className="text-xs text-yellow-600">Total XP</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "primaryOutline"}
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
                status === "completed" ? "bg-green-50 border-green-200" :
                status === "active" ? "bg-blue-50 border-blue-200" :
                "bg-gray-50 border-gray-200"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm",
                    status === "completed" ? "bg-green-500 text-white" :
                    status === "active" ? "bg-blue-500 text-white" :
                    "bg-gray-300 text-gray-600"
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
                      status === "completed" ? "text-green-700" : "text-gray-800"
                    )}>
                      {quest.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">{quest.description}</p>
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
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Progress: {Math.min(userPoints, quest.value)} / {quest.value} XP</span>
                  <span className="font-bold">{Math.round(progress)}%</span>
                </div>
                <Progress 
                  value={progress} 
                  className={cn(
                    "h-2",
                    status === "completed" ? "[&>div]:bg-green-500" :
                    status === "active" ? "[&>div]:bg-blue-500" :
                    "[&>div]:bg-gray-400"
                  )}
                />
              </div>

              {/* Rewards */}
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs">
                  {quest.reward.xp && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <Zap className="w-3 h-3" />
                      +{quest.reward.xp} XP
                    </span>
                  )}
                  {quest.reward.hearts && (
                    <span className="flex items-center gap-1 text-red-600">
                      <Heart className="w-3 h-3 fill-red-600" />
                      +{quest.reward.hearts}
                    </span>
                  )}
                  {quest.reward.badge && (
                    <span className="flex items-center gap-1 text-purple-600">
                      <Medal className="w-3 h-3" />
                      {quest.reward.badge}
                    </span>
                  )}
                </div>
                
                <div className="text-xs text-gray-500">
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
