export interface ChallengeOption {
  id: number;
  text: string;
  correct: boolean;
  imageSrc?: string | null;
  audioSrc?: string | null;
}

export interface QuizChallenge {
  id: number;
  lessonId: number;
  question: string;
  type: string;
  order: number;
  completed: boolean;
  challengeOptions: ChallengeOption[];
  correctAnswer?: string | null;
  imageSrc?: string | null;
  audioSrc?: string | null;
  hint?: string | null;
}

export interface UserSubscription {
  isActive: boolean;
}

export interface QuizProps {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: QuizChallenge[];
  userSubscription: UserSubscription | null;
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