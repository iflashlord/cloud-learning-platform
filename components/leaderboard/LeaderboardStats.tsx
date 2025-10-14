/**
 * Leaderboard Stats Component
 * 
 * Statistics cards for leaderboard overview
 */

"use client";

import * as React from "react";
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

type Course = {
  id: number;
  title: string;
  imageSrc: string;
};

interface LeaderboardStatsProps {
  users: LeaderboardUser[];
  courses: Course[];
  type: "general" | "course";
}

export const LeaderboardStats: React.FC<LeaderboardStatsProps> = ({
  users,
  courses,
  type,
}) => {
  const totalXP = users.reduce((sum, user) => sum + user.points, 0);

  const stats = [
    {
      value: users.length,
      label: "Active Learners",
      variant: "warning" as const,
    },
    {
      value: type === "general" ? courses.length : 1,
      label: type === "general" ? "Available Courses" : "Course",
      variant: "info" as const,
    },
    {
      value: totalXP.toLocaleString(),
      label: "Total XP Earned",
      variant: "success" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 max-w-2xl mx-auto">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            "p-4 rounded-xl border",
            statusStyles[stat.variant].bg,
            statusStyles[stat.variant].border
          )}
        >
          <div className={cn("text-2xl font-bold", statusStyles[stat.variant].text)}>
            {stat.value}
          </div>
          <div className={cn("text-sm", statusStyles[stat.variant].text)}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};