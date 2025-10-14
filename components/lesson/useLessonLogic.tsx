'use client';

import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { LessonQuestion, LessonState, FooterContent } from './types';

export const useLessonLogic = (questions: LessonQuestion[]) => {
  const getFooterContent = (
    lessonState: LessonState,
    currentQuestion: LessonQuestion,
    isLastQuestion: boolean,
    onNext: () => void,
    onRetry: () => void,
    onContinue: () => void
  ): FooterContent | null => {
    switch (lessonState.status) {
      case 'correct':
        return {
          message: 'Excellent work!',
          button: {
            variant: 'success',
            text: isLastQuestion ? 'FINISH' : 'NEXT',
            icon: <CheckCircle className="w-5 h-5" />,
            onClick: onNext,
            animate: true
          },
          bgClass: 'bg-green-50 border-green-200',
          textClass: 'text-green-600'
        };
      case 'wrong':
        return {
          message: 'Not quite right. Try again!',
          button: {
            variant: 'danger',
            text: 'RETRY',
            icon: <XCircle className="w-5 h-5" />,
            onClick: onRetry,
            animate: true
          },
          bgClass: 'bg-red-50 border-red-200',
          textClass: 'text-red-600'
        };
      case 'completed':
        return {
          message: 'Lesson Complete! Great job!',
          button: {
            variant: 'info',
            text: 'CONTINUE LEARNING',
            icon: <ArrowRight className="w-5 h-5" />,
            onClick: onContinue,
            animate: false
          },
          bgClass: 'bg-blue-50 border-blue-200',
          textClass: 'text-blue-600'
        };
      default:
        return null;
    }
  };

  const calculateProgress = (currentQuestion: number, totalQuestions: number) => {
    return {
      current: currentQuestion + 1,
      total: totalQuestions,
      percentage: Math.round(((currentQuestion + 1) / totalQuestions) * 100)
    };
  };

  const checkAnswer = (selectedAnswer: number, correctAnswer: number) => {
    return selectedAnswer === correctAnswer;
  };

  return {
    getFooterContent,
    calculateProgress,
    checkAnswer
  };
};