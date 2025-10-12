import { useState } from "react";
import { HelpCircle, Lightbulb, GraduationCap } from "lucide-react";

type Props = {
  question: string;
  hint?: string;
};

export const QuestionBubble = ({ question, hint }: Props) => {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <GraduationCap className="hidden lg:block h-15 w-15 text-primary" />
      <GraduationCap className="block lg:hidden h-10 w-10 text-primary" />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        <div className="flex items-center justify-between">
          <span>{question}</span>
          {hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="ml-2 p-1 text-blue-500 hover:text-blue-700 transition-colors"
              title="Show hint"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          )}
        </div>
        {showHint && hint && (
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
            <div className="text-xs lg:text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 p-2 rounded flex items-start gap-2">
              <Lightbulb className="w-4 h-4 mt-0.5" />
              <span>
                <strong>Hint:</strong> {hint}
              </span>
            </div>
          </div>
        )}
        <div
          className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90"
        />
      </div>
    </div>
  );
};
