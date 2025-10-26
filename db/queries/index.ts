/**
 * Database Queries - Modular Export System
 *
 * This is the main barrel export for the modular database queries system.
 * Previously a 427-line monolithic file, now organized into focused modules:
 *
 * - user-queries.ts: User progress, subscriptions, leaderboards
 * - course-queries.ts: Course data, progress calculations, admin queries
 * - lesson-queries.ts: Lesson data, completion tracking
 * - unit-queries.ts: Unit data with lesson completion status
 *
 * @example
 * ```typescript
 * // Import specific queries
 * import { getUserProgress, getCourses } from '@/db/queries';
 *
 * // Import from specific modules
 * import { getTopTenUsers } from '@/db/queries/user-queries';
 * import { getCourseById } from '@/db/queries/course-queries';
 * ```
 */

// User queries - authentication, progress, subscriptions, leaderboards
export {
  getUserProgress,
  getUserSubscription,
  getUserActiveCoupons,
  getTopTenUsers,
  getTopTenUsersByCourse,
} from "./user-queries"

// Course queries - course data, progress calculations, admin functionality
export {
  getCourses,
  getCourseById,
  getCourseProgress,
  getAllCoursesForLeaderboard,
  getAdminCourseById,
} from "./course-queries"

// Lesson queries - lesson data and completion tracking
export { getLesson, getLessonPercentage } from "./lesson-queries"

// Unit queries - unit data with lesson completion status
export { getUnits } from "./unit-queries"

// Review queries - lesson completions, AI conversations, and backfill
export {
  getCompletedLessonsForReview,
  getLessonReviewData,
  getAIConversations,
  getAIConversation,
  getLessonCompletionStats,
  backfillLessonCompletions,
  hasCompletedLesson,
} from "./review-queries"

/**
 * Query organization by domain:
 */
export const queryModules = {
  user: ["getUserProgress", "getUserSubscription", "getTopTenUsers", "getTopTenUsersByCourse"],
  course: [
    "getCourses",
    "getCourseById",
    "getCourseProgress",
    "getAllCoursesForLeaderboard",
    "getAdminCourseById",
  ],
  lesson: ["getLesson", "getLessonPercentage"],
  unit: ["getUnits"],
  review: [
    "getCompletedLessonsForReview",
    "getLessonReviewData",
    "getAIConversations",
    "getAIConversation",
    "getLessonCompletionStats",
    "hasCompletedLesson",
  ],
} as const
