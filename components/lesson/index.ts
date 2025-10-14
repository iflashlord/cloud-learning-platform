// Duolingo-Style Lesson Components
export { DuolingoLesson } from './DuolingoLesson';
export { LessonHeader } from './LessonHeader';
export { LessonQuestionCard } from './LessonQuestionCard';
export { LessonFooter } from './LessonFooter';
export { useLessonLogic } from './useLessonLogic';

// Data
export { sampleQuestions } from './data';

// Types
export type {
  LessonQuestion,
  LessonState,
  FooterButton,
  FooterContent,
  LessonProgress
} from './types';

/**
 * Duolingo-Style Lesson Component System
 * 
 * A comprehensive interactive learning system inspired by Duolingo's 
 * question-and-answer format for educational content.
 * 
 * Components:
 * - DuolingoLesson: Main lesson container with state management
 * - LessonHeader: Progress bar, hearts system, and streak tracking
 * - LessonQuestionCard: Interactive question display with multiple choice
 * - LessonFooter: Dynamic footer with feedback and navigation controls
 * 
 * Hooks:
 * - useLessonLogic: Business logic for lesson flow and validation
 * 
 * Features:
 * - Progressive question flow with state tracking
 * - Hearts system for gamification 
 * - Streak tracking for engagement
 * - Real-time feedback with explanations
 * - Responsive design optimized for learning
 * - Accessibility-focused interactions
 * - Smooth animations and transitions
 * 
 * Question Types:
 * - Multiple choice with visual feedback
 * - Explanations for correct answers
 * - Audio support (integration ready)
 * - Hint system (integration ready)
 * 
 * Usage:
 * ```tsx
 * import { DuolingoLesson, sampleQuestions } from '@/components/lesson';
 * 
 * <DuolingoLesson
 *   questions={sampleQuestions}
 *   hearts={5}
 *   streak={12}
 *   onComplete={() => console.log('Lesson completed!')}
 * />
 * ```
 * 
 * Customization:
 * - Provide your own question data matching the LessonQuestion interface
 * - Customize hearts and streak values
 * - Handle lesson completion with onComplete callback
 * - Style components using Tailwind CSS classes
 */