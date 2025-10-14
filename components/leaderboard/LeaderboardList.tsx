/**
 * Leaderboard List Component
 * 
 * Container component for displaying list of leaderboard users
 */

"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { LeaderboardItem } from "./LeaderboardItem";
import { Users, TrendingUp, Trophy, BookOpen } from "lucide-react";

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

interface LeaderboardListProps {
  users: LeaderboardUser[];
  showCourseInfo?: boolean;
  emptyMessage?: string;
}

export const LeaderboardList: React.FC<LeaderboardListProps> = ({
  users,
  showCourseInfo = false,
  emptyMessage = "No learners found",
}) => {
  return (
    <>
      <div className="mb-6">
        <Separator className="mb-4 h-0.5 rounded-full" />
        
        {/* Leaderboard Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{users.length} {users.length === 1 ? 'learner' : 'learners'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Ranked by XP</span>
          </div>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-muted-foreground/60" />
          </div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">{emptyMessage}</h3>
          <p className="text-muted-foreground mb-4">No one has started learning this course yet.</p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>Be the first to join and claim the top spot!</span>
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {users.map((user, index) => (
            <LeaderboardItem
              key={user.userId}
              user={user}
              position={index + 1}
              showCourseInfo={showCourseInfo}
            />
          ))}
          
          {/* Show motivation message for fewer than 10 users */}
          {users.length < 10 && (
            <div className="text-center py-6 border-2 border-dashed border-border rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">
                {10 - users.length} more spots available in the top 10!
              </p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>Keep learning to climb the rankings</span>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};