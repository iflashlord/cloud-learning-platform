// Course Management Components
export { CourseDetails } from './CourseDetails';
export { CourseHeader } from './CourseHeader';
export { CourseStats } from './CourseStats';
export { CourseThemeSection } from './CourseThemeSection';
export { UnitsList } from './UnitsList';
export { UnitCard } from './UnitCard';
export { LessonSection } from './LessonSection';
export { ChallengeItem } from './ChallengeItem';

// Types and utilities
export type {
  Course,
  Unit,
  Lesson,
  Challenge,
  ChallengeOption,
  ChallengeType
} from './course-types';

export {
  getQuestionTypeIcon,
  getQuestionTypeColor
} from './course-types';