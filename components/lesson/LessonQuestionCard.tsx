'use client';

import { Volume2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LessonQuestion } from './types';

interface LessonQuestionCardProps {
  question: LessonQuestion;
  selectedAnswer: number | null;
  status: 'none' | 'correct' | 'wrong' | 'completed';
  showExplanation: boolean;
  onAnswerSelect: (answerIndex: number) => void;
}

export const LessonQuestionCard = ({
  question,
  selectedAnswer,
  status,
  showExplanation,
  onAnswerSelect
}: LessonQuestionCardProps) => {
  const getOptionStyle = (index: number) => {
    if (status === 'none') {
      return selectedAnswer === index
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600';
    }
    
    if (index === question.correctAnswer) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
    }
    
    if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
    }
    
    return 'border-gray-200 dark:border-gray-700 opacity-60';
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Question */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {question.question}
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="p-2"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="p-2"
            >
              <Lightbulb className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={status !== 'none'}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${getOptionStyle(index)} ${
              status === 'none' ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-lg">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                Explanation
              </h3>
              <p className="text-blue-700 dark:text-blue-300">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};