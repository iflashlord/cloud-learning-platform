/**
 * Leaderboard Tabs Component
 * 
 * Tab navigation for switching between general and course leaderboards
 */

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardTabsProps {
  activeTab: "general" | "course";
  onTabChange: (tab: "general" | "course") => void;
}

export const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex rounded-xl bg-muted p-1.5 mb-8 shadow-sm">
      <Button
        variant={activeTab === "general" ? "secondary" : "ghost"}
        className={cn(
          "flex-1 h-12 text-sm font-medium transition-all rounded-lg",
          activeTab === "general"
            ? "bg-background text-orange-600 dark:text-orange-400 shadow-sm border border-orange-200 dark:border-orange-600"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        onClick={() => onTabChange("general")}
      >
        <Trophy className="w-4 h-4 mr-2" />
        Global Ranking
      </Button>
      <Button
        variant={activeTab === "course" ? "secondary" : "ghost"}
        className={cn(
          "flex-1 h-12 text-sm font-medium transition-all rounded-lg",
          activeTab === "course"
            ? "bg-background text-orange-600 dark:text-orange-400 shadow-sm border border-orange-200 dark:border-orange-600"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        onClick={() => onTabChange("course")}
      >
        <Award className="w-4 h-4 mr-2" />
        Course Rankings
      </Button>
    </div>
  );
};