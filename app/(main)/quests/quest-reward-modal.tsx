"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Heart, Medal, Crown, Zap, Gift, Sparkles, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type QuestReward = {
  xp: number;
  hearts: number;
  badge: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  questTitle: string;
  questIcon: string;
  reward: QuestReward;
  difficulty: string;
  onClaim?: () => void;
};

export const QuestRewardModal = ({
  isOpen,
  onClose,
  questTitle,
  questIcon,
  reward,
  difficulty,
  onClaim
}: Props) => {
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = () => {
    setIsClaimed(true);
    if (onClaim) {
      onClaim();
    }
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const getDifficultyConfig = (difficulty: string) => {
    const configs = {
      "Beginner": {
        color: "from-green-400 to-emerald-500",
        textColor: "text-green-700",
        bgColor: "bg-green-100",
        borderColor: "border-green-300"
      },
      "Intermediate": {
        color: "from-yellow-400 to-amber-500",
        textColor: "text-yellow-700",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-300"
      },
      "Advanced": {
        color: "from-orange-400 to-red-500",
        textColor: "text-orange-700",
        bgColor: "bg-orange-100",
        borderColor: "border-orange-300"
      },
      "Expert": {
        color: "from-red-400 to-pink-500",
        textColor: "text-red-700",
        bgColor: "bg-red-100",
        borderColor: "border-red-300"
      }
    };
    
    return configs[difficulty as keyof typeof configs] || configs["Beginner"];
  };

  const difficultyConfig = getDifficultyConfig(difficulty);

  if (isClaimed) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <div className="text-center py-8">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-green-700 mb-2">Rewards Claimed!</h2>
            <p className="text-green-600 mb-4">Great job completing the quest! Keep up the excellent work! 🎉</p>
            
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              Continue Learning
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎉 Quest Completed! 🎉
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Quest Achievement Header */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center shadow-xl text-3xl relative overflow-hidden",
                `bg-gradient-to-br ${difficultyConfig.color}`
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
                <span className="relative drop-shadow-lg">{questIcon}</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Crown className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-2">{questTitle}</h2>
            <div className={cn(
              "inline-block px-3 py-1 text-sm font-bold rounded-full border",
              difficultyConfig.bgColor,
              difficultyConfig.textColor,
              difficultyConfig.borderColor
            )}>
              {difficulty} Quest Mastered!
            </div>
          </div>

          {/* Rewards Showcase */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="text-lg font-bold text-purple-800 mb-4 text-center flex items-center justify-center gap-2">
              <Gift className="w-5 h-5" />
              Your Well-Earned Rewards
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* XP Reward */}
              {reward.xp > 0 && (
                <div className="text-center p-4 bg-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-700">+{reward.xp}</div>
                  <div className="text-sm text-blue-600 font-medium">Experience Points</div>
                </div>
              )}

              {/* Hearts Reward */}
              {reward.hearts > 0 && (
                <div className="text-center p-4 bg-red-100 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-red-700">+{reward.hearts}</div>
                  <div className="text-sm text-red-600 font-medium">Health Hearts</div>
                </div>
              )}

              {/* Badge Reward */}
              {reward.badge && (
                <div className="text-center p-4 bg-amber-100 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Medal className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-lg font-bold text-amber-700">{reward.badge}</div>
                  <div className="text-sm text-amber-600 font-medium">Achievement Badge</div>
                </div>
              )}
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-600" />
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Congratulations, Champion! 🏆</h4>
                <p className="text-sm text-gray-600">
                  You&apos;ve demonstrated excellent learning skills by completing this {difficulty.toLowerCase()} quest. 
                  Your dedication to continuous improvement is truly inspiring!
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={handleClaim}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Star className="w-5 h-5 mr-2" />
              Claim Rewards
            </Button>
            
            <Button 
              variant="secondary"
              onClick={onClose}
              className="px-6 py-3"
            >
              View Later
            </Button>
          </div>

          {/* Progress Hint */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Keep completing quests to unlock more achievements and climb the leaderboard! 🚀
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};