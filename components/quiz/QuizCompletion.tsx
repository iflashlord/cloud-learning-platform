'use client';

import Confetti from "react-confetti";
import { CheckCircle } from "lucide-react";
import { useWindowSize } from "react-use";
import { ResultCard } from "../../app/lesson/result-card";
import { Footer } from "../../app/lesson/footer";

interface QuizCompletionProps {
  challenges: any[];
  hearts: number;
  lessonId: number;
  onComplete: () => void;
  finishAudio?: React.ReactElement;
}

export const QuizCompletion = ({ 
  challenges, 
  hearts, 
  lessonId, 
  onComplete,
  finishAudio 
}: QuizCompletionProps) => {
  const { width, height } = useWindowSize();

  return (
    <div className="flex flex-col h-screen">
      {finishAudio}
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />
      
      {/* Scrollable Content Area for Completion */}
      <div className="flex-1 overflow-y-auto pb-32 lg:pb-44">
        <div className="min-h-full flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center p-4">
          <CheckCircle className="hidden lg:block h-24 w-24 text-green-500 fill-current" />
          <CheckCircle className="block lg:hidden h-12 w-12 text-green-500 fill-current" />
          <h1 className="text-xl lg:text-3xl font-bold text-foreground">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard
              variant="points"
              value={challenges.length * 10}
            />
            <ResultCard
              variant="hearts"
              value={hearts}
            />
          </div>
        </div>
      </div>

      {/* Fixed Footer for Completion */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={onComplete}
        />
      </div>
    </div>
  );
};