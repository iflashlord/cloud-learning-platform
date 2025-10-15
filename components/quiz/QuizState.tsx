'use client';

import { useState, useEffect } from 'react';

interface QuizStateProps {
  initialChallenges: any[];
  initialHearts: number;
  initialPercentage: number;
}

export const useQuizState = ({ 
  initialChallenges, 
  initialHearts, 
  initialPercentage 
}: QuizStateProps) => {
  const [lessonId] = useState(() => {
    if (initialChallenges.length === 0) {
      return null;
    }
    return initialChallenges[0].lessonId;
  });

  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = initialChallenges.findIndex((challenge) => !challenge.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [textInput, setTextInput] = useState("");
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });

  const challenge = initialChallenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;
    
    setSelectedOption(id);
  };

  const onContinue = () => {
    // For text input challenges, don't check selectedOption
    const isTextInput = challenge?.type === "TEXT_INPUT" || challenge?.type === "SPEECH_INPUT";
    if (!isTextInput && !selectedOption) return;

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
    }
  };

  // Update percentage based on active index
  useEffect(() => {
    const newPercentage = ((activeIndex) / initialChallenges.length) * 100;
    setPercentage(newPercentage);
  }, [activeIndex, initialChallenges.length]);

  return {
    lessonId,
    activeIndex,
    selectedOption,
    textInput,
    status,
    hearts,
    percentage,
    challenge,
    options,
    isCompleted: activeIndex >= initialChallenges.length,
    onNext,
    onSelect,
    onContinue,
    setStatus,
    setHearts,
    setSelectedOption,
    setTextInput,
  };
};