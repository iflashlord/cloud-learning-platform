'use client';

import React, { useState } from 'react';
import { LessonQuestion, LessonState } from './types';
import { useLessonLogic } from './useLessonLogic';
import { LessonHeader } from './LessonHeader';
import { LessonQuestionCard } from './LessonQuestionCard';
import { LessonFooter } from './LessonFooter';

interface DuolingoLessonProps {
  questions: LessonQuestion[];
  onComplete?: () => void;
  hearts?: number;
  streak?: number;
}

export const DuolingoLesson: React.FC<DuolingoLessonProps> = ({ 
  questions,
  onComplete,
  hearts = 5,
  streak = 0
}) => {
  const [lessonState, setLessonState] = useState<LessonState>({
    currentQuestion: 0,
    status: 'none',
    selectedAnswer: null,
    score: 0,
    attempts: 0,
    showExplanation: false
  });

  const { getFooterContent, calculateProgress, checkAnswer } = useLessonLogic(questions);
  
  const currentQuestion = questions[lessonState.currentQuestion];
  const isLastQuestion = lessonState.currentQuestion === questions.length - 1;
  const progress = calculateProgress(lessonState.currentQuestion, questions.length);

  const handleAnswerSelect = (answerIndex: number) => {
    if (lessonState.status === 'none') {
      setLessonState(prev => ({ ...prev, selectedAnswer: answerIndex }));
    }
  };

  const handleCheck = () => {
    if (lessonState.selectedAnswer === null) return;

    const isCorrect = checkAnswer(lessonState.selectedAnswer, currentQuestion.correctAnswer);
    
    setLessonState(prev => ({
      ...prev,
      status: isCorrect ? 'correct' : 'wrong',
      score: isCorrect ? prev.score + 1 : prev.score,
      attempts: prev.attempts + 1,
      showExplanation: isCorrect
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setLessonState(prev => ({ ...prev, status: 'completed' }));
      onComplete?.();
    } else {
      setLessonState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        status: 'none',
        selectedAnswer: null,
        showExplanation: false
      }));
    }
  };

  const handleRetry = () => {
    setLessonState(prev => ({
      ...prev,
      status: 'none',
      selectedAnswer: null,
      showExplanation: false
    }));
  };

  const handleContinue = () => {
    // Reset lesson or navigate to next lesson
    setLessonState({
      currentQuestion: 0,
      status: 'none',
      selectedAnswer: null,
      score: 0,
      attempts: 0,
      showExplanation: false
    });
    onComplete?.();
  };

  const footerContent = getFooterContent(
    lessonState,
    currentQuestion,
    isLastQuestion,
    handleNext,
    handleRetry,
    handleContinue
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <LessonHeader 
        progress={progress}
        hearts={hearts}
        streak={streak}
      />
      
      <LessonQuestionCard
        question={currentQuestion}
        selectedAnswer={lessonState.selectedAnswer}
        status={lessonState.status}
        showExplanation={lessonState.showExplanation}
        onAnswerSelect={handleAnswerSelect}
      />
      
      <div className="pb-20"> {/* Spacer for fixed footer */}</div>
      
      <LessonFooter
        footerContent={footerContent}
        onCheck={handleCheck}
        canCheck={lessonState.selectedAnswer !== null}
        status={lessonState.status}
      />
    </div>
  );
};