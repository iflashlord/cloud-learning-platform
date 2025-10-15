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
}

export const useQuizValidator = ({
  challengeId,
  hearts,
  userSubscription,
  isPractice = false,
  onHeartUpdate,
  onIncorrectAudio,
  onCorrectAudio,
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
        if (isPractice) {
          // Visual heart animation - temporarily show reduced hearts
          const visualHearts = Math.max(0, hearts - 1);
          onHeartUpdate(visualHearts);
          
          // After a brief delay, restore hearts to show it was just visual
          setTimeout(() => {
            onHeartUpdate(hearts);
            toast.success("Hearts restored - this is practice!", {
              duration: 2000,
              style: { width: '100%', maxWidth: '100%' }
            });
          }, 1500);
          
        } else if (!userSubscription?.isActive) {
          if (hearts === 1) {
            // Will redirect to hearts page
            reduceHearts(challengeId);
            return;
          }
          
          const newHearts = Math.max(0, hearts - 1);
          onHeartUpdate(newHearts);
          reduceHearts(challengeId);
        } else {
          toast.error("Wrong answer! But you have unlimited hearts.");
        }
        
        onIncorrectAudio();
      });
    }
  };

  return {
    validateAnswer,
    pending
  };
};