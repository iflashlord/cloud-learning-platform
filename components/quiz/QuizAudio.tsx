'use client';

import { useAudio } from "react-use";

export const useQuizAudio = () => {
  const [correctAudio, , correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio, , incorrectControls] = useAudio({ src: "/incorrect.wav" });  
  const [finishAudio, , finishControls] = useAudio({ 
    src: "/finish.mp3",
    autoPlay: true,
  });

  const playCorrect = () => {
    correctControls.play();
  };

  const playIncorrect = () => {
    incorrectControls.play();
  };

  const playFinish = () => {
    finishControls.play();
  };

  return {
    correctAudio,
    incorrectAudio,
    finishAudio,
    playCorrect,
    playIncorrect,
    playFinish,
  };
};