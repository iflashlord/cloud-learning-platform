import Image from "next/image";
import { useState } from "react";
import { HelpCircle, Lightbulb } from "lucide-react";

type Props = {
  question: string;
  hint?: string;
};

export const QuestionBubble = ({ question, hint }: Props) => {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src="/mascot.svg"
        alt="Mascot"
        height={60}
        width={60}
        className="hidden lg:block"
      />
      <Image
        src="/mascot.svg"
        alt="Mascot"
        height={40}
        width={40}
        className="block lg:hidden"
      />
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
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-xs lg:text-sm text-blue-600 bg-blue-50 p-2 rounded flex items-start gap-2">
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
