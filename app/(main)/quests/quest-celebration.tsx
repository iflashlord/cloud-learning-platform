"use client";

import { useEffect, useState } from "react";
import { Trophy, Star, Sparkles, Crown, Medal, Zap, Heart, PartyPopper, Rocket, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  isVisible: boolean;
  questTitle: string;
  questIcon: LucideIcon;
  reward: {
    xp: number;
    hearts: number;
    badge: string;
  };
  onComplete?: () => void;
};

export const QuestCelebration = ({ 
  isVisible, 
  questTitle, 
  questIcon, 
  reward, 
  onComplete 
}: Props) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const QuestIcon = questIcon;

  useEffect(() => {
    if (isVisible) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
        if (onComplete) {
          onComplete();
        }
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!showCelebration) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Confetti Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-3 h-3 rounded-full animate-pulse",
              i % 5 === 0 ? "bg-yellow-400" :
              i % 5 === 1 ? "bg-blue-400" :
              i % 5 === 2 ? "bg-green-400" :
              i % 5 === 3 ? "bg-purple-400" :
              "bg-pink-400"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating Sparkles */}
      <div className="absolute top-20 left-20 animate-spin">
        <Sparkles className="w-8 h-8 text-yellow-500" />
      </div>
      <div className="absolute top-32 right-24 animate-bounce">
        <Star className="w-6 h-6 text-blue-400" />
      </div>
      <div className="absolute bottom-32 left-32 animate-pulse">
        <Crown className="w-7 h-7 text-purple-400" />
      </div>
      <div className="absolute bottom-24 right-20 animate-ping">
        <Medal className="w-5 h-5 text-pink-400" />
      </div>

      {/* Main Celebration Card */}
      <div className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 text-center overflow-hidden animate-in zoom-in duration-500 slide-in-from-bottom-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-pink-100/30 to-yellow-100/30"></div>
        
        {/* Sparkles */}
        <div className="absolute top-4 left-4 animate-spin">
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="absolute top-6 right-6 animate-bounce">
          <Sparkles className="w-4 h-4 text-purple-500" />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Trophy Animation */}
          <div className="relative inline-block mb-6 animate-in zoom-in duration-700 delay-300">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent"></div>
              <QuestIcon className="w-14 h-14 relative drop-shadow-lg text-white" />
            </div>
            
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Crown className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="animate-in slide-in-from-bottom-4 duration-500 delay-500">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-pulse flex items-center justify-center gap-3">
              <PartyPopper className="w-8 h-8 text-purple-500" />
              <span>Quest Complete!</span>
              <PartyPopper className="w-8 h-8 text-pink-500 hidden sm:inline" />
            </h1>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {questTitle}
            </h2>
          </div>

          {/* Rewards Display */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 mb-6 border border-purple-200 animate-in slide-in-from-bottom-4 duration-500 delay-700">
            <h3 className="text-sm font-bold text-purple-800 mb-3 flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4 animate-bounce" />
              Rewards Earned
            </h3>
            
            <div className="flex justify-center gap-4">
              {reward.xp > 0 && (
                <div className="text-center animate-in zoom-in duration-500 delay-1000">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-md hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-lg font-bold text-blue-700">+{reward.xp}</div>
                  <div className="text-xs text-blue-600">XP</div>
                </div>
              )}

              {reward.hearts > 0 && (
                <div className="text-center animate-in zoom-in duration-500 delay-1200">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-md hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
                  </div>
                  <div className="text-lg font-bold text-red-700">+{reward.hearts}</div>
                  <div className="text-xs text-red-600">Hearts</div>
                </div>
              )}

              {reward.badge && (
                <div className="text-center animate-in zoom-in duration-500 delay-1400">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-md hover:scale-110 transition-transform">
                    <Medal className="w-5 h-5 text-white animate-spin" />
                  </div>
                  <div className="text-xs font-bold text-amber-700">{reward.badge}</div>
                  <div className="text-xs text-amber-600">Badge</div>
                </div>
              )}
            </div>
          </div>

          {/* Encouragement */}
          <p className="text-gray-600 text-sm font-medium animate-in fade-in duration-500 delay-1600 flex items-center justify-center gap-2">
            <span>Outstanding work! Keep learning to unlock more achievements!</span>
            <Rocket className="w-5 h-5 text-indigo-500" />
          </p>
        </div>
      </div>
    </div>
  );
};
