'use client';

import { redirect } from "next/navigation";
import { useQuizState } from "./QuizState";
import { useQuizAudio } from "./QuizAudio";
import { useQuizValidator } from "./QuizValidator";
import { QuizLayout } from "./QuizLayout";
import { QuizCompletion } from "./QuizCompletion";
import { QuizChallenge, UserSubscription } from "./types";

interface QuizProps {
  initialLessonId: number;
  initialLessonChallenges: QuizChallenge[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription: UserSubscription;
}

export const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscription,
}: QuizProps) => {
  // Detect if this is a practice lesson (already completed)
  const isPractice = initialPercentage === 100;
  
  const {
    lessonId,
    activeIndex,
    selectedOption,
    status,
    hearts,
    percentage,
    challenge,
    options,
    isCompleted,
    onSelect,
    onContinue,
    setStatus,
    setHearts,
    setSelectedOption,
  } = useQuizState({
    initialChallenges: initialLessonChallenges,
    initialHearts,
    initialPercentage,
  });

  const {
    correctAudio,
    incorrectAudio,
    finishAudio,
    playCorrect,
    playIncorrect,
    playFinish,
  } = useQuizAudio();

  const { validateAnswer, pending } = useQuizValidator({
    challengeId: challenge?.id ?? 0,
    hearts,
    userSubscription,
    isPractice,
    onHeartUpdate: setHearts,
    onIncorrectAudio: playIncorrect,
    onCorrectAudio: playCorrect,
  });

  const onCheck = () => {
    if (!selectedOption) return;

    const selectedChallengeOption = options.find(
      (option: any) => option.id === selectedOption
    );

    if (!selectedChallengeOption) return;

    if (selectedChallengeOption.correct) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }

    validateAnswer(selectedChallengeOption);
  };

  const handleComplete = () => {
    redirect("/learn");
  };

  // Show completion screen if quiz is completed
  if (isCompleted) {
    return (
      <QuizCompletion
        challenges={initialLessonChallenges}
        hearts={hearts}
        lessonId={lessonId!}
        onComplete={handleComplete}
        finishAudio={finishAudio}
      />
    );
  }

  // Main quiz interface
  return (
    <>
      {correctAudio}
      {incorrectAudio}
      
      <QuizLayout
        percentage={percentage}
        hearts={hearts}
        hasActiveSubscription={!!userSubscription?.isActive}
        challenge={challenge}
        options={options}
        selectedOption={selectedOption}
        status={status}
        disabled={pending}
        lessonId={lessonId}
        onSelect={onSelect}
        onContinue={onContinue}
        onCheck={status === "none" ? onCheck : onContinue}
      />
    </>
  );
};