/**
 * Leaderboard Header Component
 * 
 * Header section with title, description, and statistics
 */

"use client";

import * as React from "react";
import { LeaderboardStats } from "./LeaderboardStats";
import { Trophy, Award } from "lucide-react";

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

interface LeaderboardHeaderProps {
  type: "general" | "course";
  users: LeaderboardUser[];
  courses: Course[];
}

export const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({
  type,
  users,
  courses,
}) => {
  const isGeneral = type === "general";
  
  return (
    <div className="text-center mb-8">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${
        isGeneral 
          ? "bg-gradient-to-br from-yellow-400 to-orange-500"
          : "bg-gradient-to-br from-blue-400 to-purple-500"
      }`}>
        {isGeneral ? (
          <Trophy className="w-8 h-8 text-white" />
        ) : (
          <Award className="w-8 h-8 text-white" />
        )}
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-3">
        {isGeneral ? "Global Hall of Fame" : "Course Championships"}
      </h2>
      
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
        {isGeneral
          ? "Top performers across all courses. These champions have earned the most XP by completing challenges and mastering various technologies."
          : "Compete with learners in the same course and track your progress against others mastering the same technology."
        }
      </p>
      
      {/* Stats Cards */}
      <LeaderboardStats 
        users={users} 
        courses={courses} 
        type={type} 
      />
    </div>
  );
};