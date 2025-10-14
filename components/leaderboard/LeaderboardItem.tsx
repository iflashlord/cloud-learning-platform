/**
 * Leaderboard Item Component
 * 
 * Individual user row in the leaderboard
 */

"use client";

import * as React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { StatusIndicator } from "@/components/ui/common";
import Image from "next/image";
import { Crown, Trophy, Medal, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusStyles } from "@/lib/style-utils";

type LeaderboardUser = {
  userId: string;
  userName: string;
  userImageSrc: string;
  points: number;
  activeCourseId?: number | null;
  activeCourse?: {
    id: number;
    title: string;
    imageSrc: string;
  } | null;
};

interface LeaderboardItemProps {
  user: LeaderboardUser;
  position: number;
  showCourseInfo?: boolean;
}

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  user,
  position,
  showCourseInfo = false,
}) => {
  const getRankIcon = (pos: number) => {
    switch (pos) {
      case 1:
        return <Crown className={cn("w-5 h-5", statusStyles.warning.text)} />;
      case 2:
        return <Trophy className={cn("w-5 h-5", statusStyles.neutral.text)} />;
      case 3:
        return <Medal className={cn("w-5 h-5", "text-orange-500 dark:text-orange-400")} />;
      default:
        return null;
    }
  };

  const getRankStyling = (pos: number) => {
    switch (pos) {
      case 1:
        return cn("bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-600 shadow-md");
      case 2:
        return cn(statusStyles.neutral.bg, statusStyles.neutral.border, "shadow-sm");
      case 3:
        return cn("bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 border-orange-200 dark:border-orange-600 shadow-sm");
      default:
        return "hover:bg-muted";
    }
  };

  const rankIcon = getRankIcon(position);
  const isTopThree = position <= 3;

  return (
    <div 
      className={cn(
        "flex items-center w-full p-4 rounded-xl border transition-all duration-200",
        getRankStyling(position),
        isTopThree ? "border-2" : "border hover:shadow-sm"
      )}
    >
      {/* Rank Number/Icon */}
      <div className="flex items-center justify-center w-12 h-12 mr-4">
        {rankIcon ? (
          <div className="flex flex-col items-center">
            {rankIcon}
            <span className="text-xs font-bold mt-1">#{position}</span>
          </div>
        ) : (
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
            position <= 10 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" : cn(statusStyles.neutral.bg, statusStyles.neutral.text)
          )}>
            {position}
          </div>
        )}
      </div>

      {/* User Avatar */}
      <div className="relative">
        <Avatar className={cn(
          "border-2 h-14 w-14 mr-4",
          position === 1 ? "border-yellow-400 shadow-lg" :
          position === 2 ? "border-muted-foreground shadow-md" :
          position === 3 ? "border-orange-300 dark:border-orange-600 shadow-md" :
          "border-border"
        )}>
          <AvatarImage
            className="object-cover"
            src={user.userImageSrc}
            alt={`${user.userName}'s avatar`}
          />
        </Avatar>
        {isTopThree && (
          <div className={cn(
            "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
            position === 1 ? "bg-yellow-500 text-white" :
            position === 2 ? cn(statusStyles.neutral.button, "text-white") :
            "bg-orange-500 text-white"
          )}>
            {position}
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className={cn(
            "font-semibold truncate",
            position === 1 ? "text-yellow-800 dark:text-yellow-400 text-lg" :
            position <= 3 ? "text-foreground" :
            "text-foreground"
          )}>
            {user.userName}
          </h4>
          {position === 1 && <Star className={cn("w-4 h-4 fill-current", statusStyles.warning.text)} />}
        </div>
        
        {showCourseInfo && user.activeCourse && (
          <div className="flex items-center mt-1">
            <Image
              src={user.activeCourse.imageSrc}
              alt={user.activeCourse.title}
              width={20}
              height={20}
              className="rounded-sm mr-2"
            />
            <p className="text-sm text-muted-foreground truncate">
              {user.activeCourse.title}
            </p>
          </div>
        )}
      </div>

      {/* Points Display */}
      <div className="flex flex-col items-end">
        <div className={cn(
          "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold",
          position === 1 ? "bg-yellow-500 text-white" :
          position === 2 ? cn(statusStyles.neutral.button, "text-white") :
          position === 3 ? "bg-orange-500 text-white" :
          cn(statusStyles.neutral.bg, statusStyles.neutral.text)
        )}>
          <Award className="w-4 h-4" />
          <span>{user.points.toLocaleString()}</span>
        </div>
        <span className="text-xs text-muted-foreground mt-1">XP</span>
      </div>
    </div>
  );
};