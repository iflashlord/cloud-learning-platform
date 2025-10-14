import React from "react";

interface LeaderboardTabNavigationProps {
  activeTab: "general" | "course";
  onTabChange: (tab: "general" | "course") => void;
}

export const LeaderboardTabNavigation = ({ activeTab, onTabChange }: LeaderboardTabNavigationProps) => (
  <div className="flex space-x-2 mb-4">
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${activeTab === "general" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
      onClick={() => onTabChange("general")}
      type="button"
    >
      General
    </button>
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${activeTab === "course" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
      onClick={() => onTabChange("course")}
      type="button"
    >
      By Course
    </button>
  </div>
);

export type { LeaderboardTabNavigationProps };
