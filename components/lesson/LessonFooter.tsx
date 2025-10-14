'use client';

import { Button } from '@/components/ui/button';
import { FooterContent } from './types';

interface LessonFooterProps {
  footerContent: FooterContent | null;
  onCheck: () => void;
  canCheck: boolean;
  status: 'none' | 'correct' | 'wrong' | 'completed';
}

export const LessonFooter = ({ 
  footerContent, 
  onCheck, 
  canCheck, 
  status 
}: LessonFooterProps) => {
  if (status === 'completed') {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-400 to-blue-500 text-white p-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h2 className="text-3xl font-bold">Lesson Complete!</h2>
          <p className="text-lg opacity-90">
            Great job! You&apos;ve successfully completed this AWS fundamentals lesson.
          </p>
          {footerContent?.button && (
            <Button
              onClick={footerContent.button.onClick}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              {footerContent.button.icon}
              <span className="ml-2">{footerContent.button.text}</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (footerContent) {
    return (
      <div className={`fixed bottom-0 left-0 right-0 border-t-2 ${footerContent.bgClass} p-4`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {footerContent.button.icon}
            <span className={`text-lg font-semibold ${footerContent.textClass}`}>
              {footerContent.message}
            </span>
          </div>
          <Button
            onClick={footerContent.button.onClick}
            variant={footerContent.button.variant}
            size="lg"
            className={`min-w-[120px] ${footerContent.button.animate ? 'animate-pulse' : ''}`}
          >
            {footerContent.button.text}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 p-4">
      <div className="max-w-4xl mx-auto flex justify-end">
        <Button
          onClick={onCheck}
          disabled={!canCheck}
          size="lg"
          className="min-w-[120px]"
        >
          CHECK
        </Button>
      </div>
    </div>
  );
};