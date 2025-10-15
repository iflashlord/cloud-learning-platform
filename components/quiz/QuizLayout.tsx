'use client';

import { Header } from "../../app/lesson/header";
import { QuestionBubble } from "../../app/lesson/question-bubble";
import { Challenge } from "../../app/lesson/challenge";
import { Footer } from "../../app/lesson/footer";

interface QuizLayoutProps {
  percentage: number;
  hearts: number;
  hasActiveSubscription: boolean;
  challenge: any;
  options: any[];
  selectedOption: number | undefined;
  status: "correct" | "wrong" | "none";
  disabled: boolean;
  lessonId: number | null;
  onSelect: (id: number) => void;
  onContinue: () => void;
  onCheck: () => void;
}

export const QuizLayout = ({
  percentage,
  hearts,
  hasActiveSubscription,
  challenge,
  options,
  selectedOption,
  status,
  disabled,
  lessonId,
  onSelect,
  onContinue,
  onCheck,
}: QuizLayoutProps) => {
  if (!challenge || !lessonId) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10">
        <Header
          hearts={hearts}
          percentage={percentage}
          hasActiveSubscription={hasActiveSubscription}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-32 lg:pb-44">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-foreground mb-4 lg:mb-8">
            Which one of these is the &quot;{challenge.question}&quot;?
          </h1>
          
          <div className="mb-8">
            <QuestionBubble question={challenge.question} />
          </div>
          
          <Challenge
            options={options}
            onSelect={onSelect}
            status={status}
            selectedOption={selectedOption}
            disabled={disabled}
            type={challenge.type}
            challenge={challenge}
          />
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
        <Footer
          disabled={disabled || !selectedOption}
          status={status}
          onCheck={onCheck}
          lessonId={lessonId}
        />
      </div>
    </div>
  );
};