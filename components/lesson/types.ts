// Lesson Component Types
export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface LessonState {
  currentQuestion: number;
  status: 'none' | 'correct' | 'wrong' | 'completed';
  selectedAnswer: number | null;
  score: number;
  attempts: number;
  showExplanation: boolean;
}

export interface FooterButton {
  variant: 'success' | 'danger' | 'info';
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  animate: boolean;
}

export interface FooterContent {
  message: string;
  button: FooterButton;
  bgClass: string;
  textClass: string;
}

export interface LessonProgress {
  current: number;
  total: number;
  percentage: number;
}