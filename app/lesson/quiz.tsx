"use client";

import { toast } from "sonner";
import Image from "next/image";
import Confetti from "react-confetti";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useAudio, useWindowSize, useMount } from "react-use";

import { reduceHearts } from "@/actions/user-progress";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import { usePracticeModal } from "@/store/use-practice-modal";
import { upsertChallengeProgress } from "@/actions/challenge-progress";

import { Header } from "./header";
import { Footer } from "./footer";
import { Challenge } from "./challenge";
import { ResultCard } from "./result-card";

type Props ={
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
  userSubscription: typeof userSubscription.$inferSelect & {
    isActive: boolean;
  } | null;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const { width, height } = useWindowSize();

  const router = useRouter();

  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
  const [
    correctAudio,
    _c,
    correctControls,
  ] = useAudio({ src: "/correct.wav" });
  const [
    incorrectAudio,
    _i,
    incorrectControls,
  ] = useAudio({ src: "/incorrect.wav" });
  const [pending, startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [textInput, setTextInput] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
    setTextInput("");
    setWrongAttempts(0);
    setShowCorrectAnswer(false);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };

  const onContinue = () => {
    // Check if there's input for text/speech types or selectedOption for other types
    if (challenge.type === "TEXT_INPUT" || challenge.type === "SPEECH_INPUT") {
      if (!textInput.trim()) return;
    } else {
      if (!selectedOption) return;
    }

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      setTextInput("");
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      setTextInput("");
      return;
    }

    let isCorrect = false;

    // Handle different question types
    if (challenge.type === "DRAG_DROP") {
      // For drag-drop, trigger the validation by calling the stored function
      if (typeof (window as any).checkCurrentDragOrder === 'function') {
        isCorrect = (window as any).checkCurrentDragOrder();
      } else {
        // Fallback to previous method
        isCorrect = selectedOption === 999;
      }
    } else if (challenge.type === "TEXT_INPUT" || challenge.type === "SPEECH_INPUT") {
      // For text/speech input, check against correct answer
      if (challenge.correctAnswer) {
        isCorrect = textInput.toLowerCase().trim() === challenge.correctAnswer.toLowerCase().trim();
      }
    } else {
      // For other types (SELECT, ASSIST, TRUE_FALSE, IMAGE_SELECT, LISTENING), find correct option
      const correctOption = options.find((option) => option.correct);
      if (!correctOption) {
        return;
      }
      isCorrect = correctOption.id === selectedOption;
    }

    if (isCorrect) {
      setWrongAttempts(0);
      setShowCorrectAnswer(false);
      
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // This is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      });
    } else {
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      
      // Show correct answer after 3 wrong attempts
      if (newWrongAttempts >= 3) {
        setShowCorrectAnswer(true);
      }
      
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            incorrectControls.play();
            setStatus("wrong");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      });
    }
  };

  if (!challenge) {
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
            onCheck={() => router.push("/learn")}
          />
        </div>
      </div>
    );
  }

  const title = challenge.type === "ASSIST" 
    ? "Select the correct meaning"
    : challenge.question;

  return (
    <div className="flex flex-col h-screen">
      {incorrectAudio}
      {correctAudio}
      
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <Header
          hearts={hearts}
          percentage={percentage}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pt-20 pb-32 lg:pb-44">
        <div className="min-h-full flex items-center justify-center p-4">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full max-w-4xl flex flex-col gap-y-8 my-8">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-foreground">
              {title}
            </h1>
            <div className="space-y-6">
              {challenge.imageSrc && challenge.type === "IMAGE_SELECT" && (
                <div className="mb-4 flex justify-center">
                  <Image 
                    src={challenge.imageSrc} 
                    alt="Question image" 
                    width={400} 
                    height={300} 
                    className="rounded-lg"
                  />
                </div>
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
                challenge={challenge}
                onTextSubmit={(text) => {
                  // Handle text input submission
                  if (challenge.correctAnswer && text.toLowerCase().trim() === challenge.correctAnswer.toLowerCase().trim()) {
                    setStatus("correct");
                    setSelectedOption(1); // Dummy selection for correct answer
                  } else {
                    setStatus("wrong");
                    setSelectedOption(-1); // Use -1 for wrong answer (truthy value)
                  }
                }}
                onTextChange={setTextInput}
                showCorrectAnswer={showCorrectAnswer}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
        <Footer
          disabled={pending || (
            (challenge.type === "TEXT_INPUT" || challenge.type === "SPEECH_INPUT")
              ? !textInput.trim()
              : !selectedOption
          )}
          status={status}
          onCheck={onContinue}
        />
      </div>
    </div>
  );
};
