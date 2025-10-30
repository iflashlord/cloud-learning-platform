// Quiz Components Barrel Export
// Main Quiz System Components

export { Quiz } from "./Quiz";
export { QuizLayout } from "./QuizLayout";
export { QuizCompletion } from "./QuizCompletion";
export { CorrectAnswerDisplay } from "./CorrectAnswerDisplay";
export { HeartsDepleteModal } from "./HeartsDepleteModal";
export { LessonRecapButton } from "./LessonRecapButton";
export { useQuizState } from "./QuizState";
export { useQuizAudio } from "./QuizAudio";
export { useQuizValidator } from "./QuizValidator";

// Types
export type {
  QuizChallenge,
  ChallengeOption,
  QuizProps,
  UserSubscription,
  LessonMeta,
} from "./types";

/**
 * Quiz Component System
 * 
 * A comprehensive modular system for managing interactive quizzes and lessons.
 * 
 * Components:
 * - Quiz: Main quiz container that orchestrates the entire quiz experience
 * - QuizLayout: Renders the quiz interface with header, content, and footer
 * - QuizCompletion: Celebration screen shown when quiz is completed
 * 
 * Hooks:
 * - useQuizState: Manages quiz state, progression, and challenge tracking
 * - useQuizAudio: Handles audio feedback for correct/incorrect/completion sounds
 * - useQuizValidator: Validates answers and manages hearts/subscription logic
 * 
 * Features:
 * - Multi-challenge progression with percentage tracking
 * - Audio feedback system with correct/incorrect/finish sounds
 * - Hearts system with subscription-based unlimited hearts
 * - Confetti celebration on completion
 * - Responsive design with mobile-optimized layouts
 * - Integration with progress tracking and user subscriptions
 * 
 * Usage:
 * ```tsx
 * import { Quiz } from '@/components/quiz';
 * 
 * <Quiz
 *   initialLessonId={lessonId}
 *   initialLessonChallenges={challenges}
 *   initialHearts={userProgress.hearts}
 *   initialPercentage={lessonPercentage}
 *   userSubscription={userSubscription}
 * />
 * ```
 */
