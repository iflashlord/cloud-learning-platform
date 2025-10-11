"use client";

import { useState } from "react";
import { Trophy, Award, Star, Crown, Medal, Zap, Target, TrendingUp, Gem, Lock, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockedAt?: Date;
  progress?: {
    current: number;
    required: number;
  };
};

type Props = {
  userPoints: number;
  completedQuests: number;
  totalQuests: number;
};

export const QuestAchievements = ({ userPoints, completedQuests, totalQuests }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<"badges" | "milestones" | "streaks">("badges");

  // Define achievements based on user progress
  const achievements: Achievement[] = [
    {
      id: "first-quest",
      title: "Quest Starter",
      description: "Complete your first quest",
      icon: Star,
      color: "green",
      rarity: "common",
      unlockedAt: completedQuests >= 1 ? new Date() : undefined,
    },
    {
      id: "quest-enthusiast",
      title: "Quest Enthusiast", 
      description: "Complete 3 quests",
      icon: Zap,
      color: "blue",
      rarity: "common",
      unlockedAt: completedQuests >= 3 ? new Date() : undefined,
      progress: {
        current: Math.min(completedQuests, 3),
        required: 3,
      },
    },
    {
      id: "quest-master",
      title: "Quest Master",
      description: "Complete all available quests",
      icon: Crown,
      color: "gold",
      rarity: "legendary",
      unlockedAt: completedQuests >= totalQuests ? new Date() : undefined,
      progress: {
        current: completedQuests,
        required: totalQuests,
      },
    },
    {
      id: "point-collector",
      title: "Point Collector",
      description: "Earn 500 total XP",
      icon: Gem,
      color: "purple",
      rarity: "rare",
      unlockedAt: userPoints >= 500 ? new Date() : undefined,
      progress: {
        current: Math.min(userPoints, 500),
        required: 500,
      },
    },
    {
      id: "xp-legend",
      title: "XP Legend",
      description: "Reach 1000 XP milestone",
      icon: Trophy,
      color: "platinum",
      rarity: "epic",
      unlockedAt: userPoints >= 1000 ? new Date() : undefined,
      progress: {
        current: Math.min(userPoints, 1000),
        required: 1000,
      },
    },
  ];

  const getRarityColor = (rarity: string, unlocked: boolean) => {
    if (!unlocked) return "bg-gray-100 text-gray-400 border-gray-200";
    
    const rarityMap: Record<string, string> = {
      common: "bg-green-100 text-green-800 border-green-300",
      rare: "bg-blue-100 text-blue-800 border-blue-300", 
      epic: "bg-purple-100 text-purple-800 border-purple-300",
      legendary: "bg-gradient-to-br from-yellow-100 to-orange-100 text-orange-800 border-orange-300",
    };
    
    return rarityMap[rarity] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  const getAchievementIcon = (achievement: Achievement) => {
    if (achievement.unlockedAt) {
      const Icon = achievement.icon;
      return <Icon className="w-8 h-8 text-current" aria-hidden />;
    }

    return <Lock className="w-8 h-8 text-gray-400" aria-hidden />;
  };

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-200 dark:border-purple-700 shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-sm">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Achievement Gallery</h2>
          <p className="text-sm text-gray-600">Unlock badges by completing quests and milestones</p>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="text-lg font-bold text-purple-700">{unlockedAchievements.length}</div>
          <div className="text-xs text-purple-600">Unlocked</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-200">
          <div className="text-lg font-bold text-gray-700">{lockedAchievements.length}</div>
          <div className="text-xs text-gray-600">Locked</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <div className="text-lg font-bold text-blue-700">{Math.round((unlockedAchievements.length / achievements.length) * 100)}%</div>
          <div className="text-xs text-blue-600">Complete</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
          <div className="text-lg font-bold text-yellow-700">{achievements.filter(a => a.rarity === 'legendary' && a.unlockedAt).length}</div>
          <div className="text-xs text-yellow-600">Legendary</div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="space-y-4">
        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Unlocked Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unlockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md",
                    getRarityColor(achievement.rarity, true)
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getAchievementIcon(achievement)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{achievement.title}</h4>
                      <p className="text-xs opacity-75 mb-1">{achievement.description}</p>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-1 text-xs font-bold rounded-full uppercase tracking-wide",
                          achievement.rarity === 'legendary' ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white" :
                          achievement.rarity === 'epic' ? "bg-purple-200 text-purple-800" :
                          achievement.rarity === 'rare' ? "bg-blue-200 text-blue-800" :
                          "bg-green-200 text-green-800"
                        )}>
                          {achievement.rarity}
                        </span>
                        {achievement.unlockedAt && (
                          <span className="text-xs text-gray-600">
                            Unlocked!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              Locked Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 transition-all duration-200 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 grayscale">
                      {getAchievementIcon(achievement)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-700">{achievement.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">{achievement.description}</p>
                      
                      {achievement.progress && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Progress</span>
                            <span>{achievement.progress.current} / {achievement.progress.required}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-gray-400 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${(achievement.progress.current / achievement.progress.required) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 text-xs font-bold rounded-full uppercase tracking-wide bg-gray-200 text-gray-600">
                          {achievement.rarity}
                        </span>
                        <span className="text-xs text-gray-500">
                          Complete to unlock
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      {lockedAchievements.length > 0 && (
        <div className="mt-6 text-center">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200">
            <p className="text-sm text-purple-700 mb-3 font-medium flex items-center justify-center gap-2">
              <Target className="w-4 h-4" />
              <span>Keep completing quests to unlock more achievements!</span>
            </p>
            <Button 
              variant="primary" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              size="sm"
            >
              <Zap className="w-4 h-4 mr-2" />
              Continue Quest Journey
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
