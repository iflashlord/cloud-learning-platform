'use client';

import { useState, useTransition } from 'react';
import { toast } from "sonner";
import { reduceHearts } from "../../actions/user-progress";
import { challengeOptions, challenges } from "../../db/schema";

interface QuizValidatorProps {
  challengeId: number;
  hearts: number;
  userSubscription: any;
  isPractice?: boolean;
  onHeartUpdate: (newHearts: number) => void;
  onIncorrectAudio: () => void;
  onCorrectAudio: () => void;
  onHeartsDeplete?: () => void;
}

export const useQuizValidator = ({
  challengeId,
  hearts,
  userSubscription,
  isPractice = false,
  onHeartUpdate,
  onIncorrectAudio,
  onCorrectAudio,
  onHeartsDeplete,
}: QuizValidatorProps) => {
  const [pending, startTransition] = useTransition();

  const validateAnswer = (selectedOption: typeof challengeOptions.$inferSelect) => {
    if (pending) return;

    if (selectedOption.correct) {
      startTransition(() => {
        onCorrectAudio();
      });
    } else {
      startTransition(() => {
        // Call server action to reduce hearts in database for non-subscription users
        if (!isPractice && !userSubscription?.isActive) {
          reduceHearts(challengeId).catch((error) => {
            console.error("Failed to reduce hearts:", error);
          });
        }
        
        // Handle audio feedback
        onIncorrectAudio();
        
        // For subscription users, show a message
        if (userSubscription?.isActive) {
          toast.error("Wrong answer! But you have unlimited hearts.");
        }
      });
    }
  };

  return {
    validateAnswer,
    pending
  };
};