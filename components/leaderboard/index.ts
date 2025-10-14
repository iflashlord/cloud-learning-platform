/**
 * Leaderboard Components
 * 
 * Modular components for leaderboard functionality
 */

export { LeaderboardItem } from "./LeaderboardItem";
export { LeaderboardStats } from "./LeaderboardStats";
export { LeaderboardHeader } from "./LeaderboardHeader";
export { LeaderboardList } from "./LeaderboardList";
export { LeaderboardTabs } from "./LeaderboardTabs";
export { CourseSelector } from "./CourseSelector";
export { CourseGrid } from "./CourseGrid";

// Types for leaderboard data
export type LeaderboardUser = {
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

export type Course = {
  id: number;
  title: string;
  imageSrc: string;
};