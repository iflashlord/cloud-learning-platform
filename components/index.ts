/**
 * Main Components Barrel Export
 * 
 * Central export point for all modular components
 */

// Challenge System
export {
  Challenge,
  QuestionHeader,
  CorrectAnswerDisplay,
  DragDropChallenge,
  TextInputChallenge,
  ListeningChallenge,
  SelectChallenge,
  VideoChallenge
} from "./challenge";

// Form Components
export * from "./forms";

// Leaderboard System
export {
  LeaderboardItem,
  LeaderboardStats,
  LeaderboardHeader,
  LeaderboardList,
  LeaderboardTabs,
  CourseSelector,
  CourseGrid
} from "./leaderboard";

// Sidebar Components
export * from "./sidebar";

// Admin Components - Dashboard
export {
  DashboardStats,
  QuickActions,
  DashboardHeader,
  RecentActivity,
  PerformanceOverview
} from "./admin/dashboard";

// Admin Components - Payments
export {
  PaymentStatsCards,
  PaymentTable,
  SubscriptionTable,
  PaymentFilters,
  PaymentTabs,
  PaymentHeader,
  AnalyticsPlaceholder
} from "./admin/payments";

// Admin Components - Course Management
export {
  CourseDetails,
  CourseHeader,
  CourseStats,
  CourseThemeSection,
  UnitsList,
  UnitCard,
  LessonSection,
  ChallengeItem
} from "./admin/course";

// Common UI Components
export * from "./ui/common";

// Re-export commonly used UI components
export { Button } from "./ui/button";
export { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
export { Pagination } from "./ui/pagination";