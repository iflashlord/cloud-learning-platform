// Course Details Components
export { CourseDetails } from './CourseDetails';
export { CourseDetailsHeader } from './CourseDetailsHeader';
export { CourseStats } from './CourseStats';
export { UnitsAndLessons } from './UnitsAndLessons';

// Utils
export { 
  getQuestionTypeIcon, 
  getQuestionTypeColor, 
  getQuestionTypeLabel 
} from './utils';

// Types
export type {
  Course,
  Unit,
  Lesson,
  Challenge,
  ChallengeOption,
  CourseStats as CourseStatsType,
  QuestionType
} from './types';

/**
 * Course Details Component System
 * 
 * A comprehensive modular system for displaying and managing course details
 * in the admin panel.
 * 
 * Components:
 * - CourseDetails: Main container that orchestrates the course details view
 * - CourseDetailsHeader: Course header with title, image, and edit controls
 * - CourseStats: Statistics overview showing units, lessons, and challenges count
 * - UnitsAndLessons: Hierarchical display of course content structure
 * 
 * Features:
 * - Responsive design with mobile-optimized layouts
 * - Real-time data fetching and loading states
 * - Comprehensive error handling and empty states
 * - Question type visualization with color coding and icons
 * - Interactive navigation to nested content (units, lessons, challenges)
 * - Statistics dashboard showing content overview
 * 
 * Usage:
 * ```tsx
 * import { CourseDetails } from '@/components/admin/course-details';
 * 
 * <CourseDetails courseId="123" />
 * ```
 */