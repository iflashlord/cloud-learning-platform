// Course Details Types
export interface ChallengeOption {
  id: number;
  text: string;
  correct: boolean;
  imageSrc?: string;
  audioSrc?: string;
}

export interface Challenge {
  id: number;
  question: string;
  type: "SELECT" | "ASSIST" | "TRUE_FALSE" | "DRAG_DROP" | "TEXT_INPUT" | "IMAGE_SELECT" | "LISTENING" | "SPEECH_INPUT";
  order: number;
  hint?: string;
  audioSrc?: string;
  imageSrc?: string;
  correctAnswer?: string;
  challengeOptions: ChallengeOption[];
}

export interface Lesson {
  id: number;
  title: string;
  order: number;
  challenges: Challenge[];
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  imageSrc: string;
  description?: string;
  units: Unit[];
}

export interface CourseStats {
  totalUnits: number;
  totalLessons: number;
  totalChallenges: number;
}

export type QuestionType = Challenge["type"];