'use client';

import { Heart, Star } from 'lucide-react';
import { LessonProgress } from './types';

interface LessonHeaderProps {
  progress: LessonProgress;
  hearts?: number;
  streak?: number;
}

export const LessonHeader = ({ 
  progress, 
  hearts = 5, 
  streak = 0 
}: LessonHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      {/* Progress Bar */}
      <div className="flex-1 mx-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Question {progress.current} of {progress.total}</span>
          <span>{progress.percentage}%</span>
        </div>
      </div>

      {/* Hearts and Streak */}
      <div className="flex items-center space-x-4">
        {/* Hearts */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 ${
                i < hearts 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center space-x-1 text-orange-500">
            <Star className="w-5 h-5 fill-orange-500" />
            <span className="text-sm font-semibold">{streak}</span>
          </div>
        )}
      </div>
    </div>
  );
};