export type ChallengeType =
  | "SELECT"
  | "ASSIST"
  | "TRUE_FALSE"
  | "DRAG_DROP"
  | "TEXT_INPUT"
  | "IMAGE_SELECT"
  | "LISTENING"
  | "SPEECH_INPUT"
  | "VIDEO"

export interface ChallengeOption {
  id: number
  challengeId: number
  text: string
  correct: boolean
  imageSrc: string | null
  audioSrc: string | null
  guide: string | null
  order: number | null
  value: string | null
}

export interface QuizChallenge {
  id: number;
  lessonId: number | null;
  question: string;
  type: ChallengeType;
  order: number;
  completed: boolean;
  challengeOptions: ChallengeOption[];
  correctAnswer: string | null;
  imageSrc: string | null;
  audioSrc: string | null;
  videoSrc: string | null;
  hint: string | null;
  chestId: number | null;
}

export interface UserSubscription {
  isActive: boolean;
}

export interface LessonMeta {
  id: number;
  title: string;
  objectives?: string[] | null;
  unit?: {
    title?: string | null;
    course?: {
      title?: string | null;
    } | null;
  } | null;
  challenges: any[];
}

export interface QuizProps {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: QuizChallenge[];
  userSubscription: UserSubscription | null;
  lesson: LessonMeta;
}

export interface QuizState {
  lessonId: number;
  hearts: number;
  percentage: number;
  challenges: QuizChallenge[];
  activeIndex: number;
  selectedOption?: number;
  status: "correct" | "wrong" | "none";
  textInput: string;
  wrongAttempts: number;
  showCorrectAnswer: boolean;
}

export interface QuizActions {
  onNext: () => void;
  onSelect: (id: number) => void;
  onContinue: () => void;
  onTextChange: (text: string) => void;
}
