import { CheckSquare, MousePointer, FileQuestion, ArrowUpDown, Type, ImageIcon, Volume2, Mic } from "lucide-react";

export type ChallengeType = "SELECT" | "ASSIST" | "TRUE_FALSE" | "DRAG_DROP" | "TEXT_INPUT" | "IMAGE_SELECT" | "LISTENING" | "SPEECH_INPUT";

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
  type: ChallengeType;
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

export const getQuestionTypeIcon = (type: ChallengeType) => {
  switch (type) {
    case "SELECT":
      return CheckSquare;
    case "ASSIST":
      return MousePointer;
    case "TRUE_FALSE":
      return FileQuestion;
    case "DRAG_DROP":
      return ArrowUpDown;
    case "TEXT_INPUT":
      return Type;
    case "IMAGE_SELECT":
      return ImageIcon;
    case "LISTENING":
      return Volume2;
    case "SPEECH_INPUT":
      return Mic;
    default:
      return FileQuestion;
  }
};

export const getQuestionTypeColor = (type: ChallengeType) => {
  switch (type) {
    case "SELECT":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200";
    case "ASSIST":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
    case "TRUE_FALSE":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200";
    case "DRAG_DROP":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200";
    case "TEXT_INPUT":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200";
    case "IMAGE_SELECT":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200";
    case "LISTENING":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200";
    case "SPEECH_INPUT":
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200";
  }
};