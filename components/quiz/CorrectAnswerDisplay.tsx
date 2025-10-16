"use client";

import { cn } from "@/lib/utils";
import { statusStyles } from "@/lib/style-utils";
import { CheckCircle, Volume2, Eye } from "lucide-react";

interface CorrectAnswerDisplayProps {
  challenge: any;
  options: any[];
  className?: string;
}

export const CorrectAnswerDisplay = ({ 
  challenge, 
  options,
  className 
}: CorrectAnswerDisplayProps) => {
  if (!challenge) return null;

  const renderCorrectAnswer = () => {
    switch (challenge.type) {
      case "SELECT":
      case "ASSIST":
      case "TRUE_FALSE":
      case "IMAGE_SELECT":
      case "LISTENING":
      case "VIDEO": {
        const correctOption = options.find(option => option.correct);
        return correctOption ? (
          <div className="space-y-2">
            <div className="font-medium text-green-700 dark:text-green-400">Correct answer:</div>
            <div className={cn(
              "p-3 rounded-lg border-2 flex items-center gap-3",
              statusStyles.success.bg,
              statusStyles.success.border
            )}>
              <CheckCircle className={cn("w-5 h-5", statusStyles.success.text)} />
              <span className={cn("font-medium", statusStyles.success.text)}>
                {correctOption.text}
              </span>
            </div>
          </div>
        ) : null;
      }
      
      case "TEXT_INPUT":
      case "SPEECH_INPUT": {
        return challenge.correctAnswer ? (
          <div className="space-y-2">
            <div className="font-medium text-green-700 dark:text-green-400">Correct answer:</div>
            <div className={cn(
              "p-3 rounded-lg border-2 flex items-center gap-3",
              statusStyles.success.bg,
              statusStyles.success.border
            )}>
              <CheckCircle className={cn("w-5 h-5", statusStyles.success.text)} />
              <span className={cn("font-medium", statusStyles.success.text)}>
                {challenge.correctAnswer}
              </span>
            </div>
          </div>
        ) : null;
      }
      
      case "DRAG_DROP": {
        const sortedOptions = [...options].sort((a, b) => a.order - b.order);
        return (
          <div className="space-y-2">
            <div className="font-medium text-green-700 dark:text-green-400">Correct order:</div>
            <div className="space-y-2">
              {sortedOptions.map((option, index) => (
                <div 
                  key={option.id}
                  className={cn(
                    "p-3 rounded-lg border-2 flex items-center gap-3",
                    statusStyles.success.bg,
                    statusStyles.success.border
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold",
                    statusStyles.success.text,
                    "bg-green-100 dark:bg-green-800"
                  )}>
                    {index + 1}
                  </div>
                  <span className={cn("font-medium", statusStyles.success.text)}>
                    {option.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "mt-4 p-4 rounded-xl border-2",
      statusStyles.success.bg,
      statusStyles.success.border,
      className
    )}>
      <div className="flex items-center gap-2 mb-3">
        <Eye className={cn("w-5 h-5", statusStyles.success.text)} />
        <span className={cn("font-bold text-lg", statusStyles.success.text)}>
          Answer Revealed
        </span>
      </div>
      <div className="text-sm text-green-700 dark:text-green-400 mb-3">
        You've made 3 incorrect attempts. Here's the correct answer to help you learn:
      </div>
      {renderCorrectAnswer()}
    </div>
  );
};