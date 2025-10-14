"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useEffect } from "react";

// Import all challenge components
import { QuestionHeader } from "./QuestionHeader";
import { CorrectAnswerDisplay } from "./CorrectAnswerDisplay";
import { DragDropChallenge } from "./DragDropChallenge";
import { TextInputChallenge } from "./TextInputChallenge";
import { ListeningChallenge } from "./ListeningChallenge";
import { SelectChallenge } from "./SelectChallenge";
import { VideoChallenge } from "./VideoChallenge";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
  challenge: typeof challenges.$inferSelect;
  onTextSubmit?: (text: string) => void;
  onTextChange?: (text: string) => void;
  showCorrectAnswer?: boolean;
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
  challenge,
  onTextSubmit,
  onTextChange,
  showCorrectAnswer,
}: Props) => {
  const [textInput, setTextInput] = useState("");

  // Clear text input when status resets to "none" (retry)
  useEffect(() => {
    if (status === "none") {
      setTextInput("");
      onTextChange?.("");
    }
  }, [status, onTextChange]);

  // Get correct answer text for display
  const getCorrectAnswerText = () => {
    if (challenge?.correctAnswer) return challenge.correctAnswer;
    const correctOption = options.find(option => option.correct);
    return correctOption?.text;
  };

  // Render challenge based on type
  const renderChallenge = () => {
    const baseProps = {
      options,
      selectedOption,
      onSelect,
      status,
      disabled,
      challenge
    };

    switch (type) {
      case "TEXT_INPUT":
      case "SPEECH_INPUT":
        return (
          <TextInputChallenge
            status={status}
            onTextSubmit={onTextSubmit}
            onTextChange={onTextChange}
            disabled={disabled}
          />
        );

      case "DRAG_DROP":
        return (
          <DragDropChallenge
            options={options}
            disabled={disabled}
            status={status}
            onSelect={onSelect}
          />
        );

      case "LISTENING":
        return (
          <ListeningChallenge {...baseProps} />
        );

      case "VIDEO":
        return (
          <div className="space-y-4">
            <VideoChallenge challenge={challenge} />
            <SelectChallenge {...baseProps} type={type} />
          </div>
        );

      case "IMAGE_SELECT":
      case "TRUE_FALSE":
      case "SELECT":
      case "ASSIST":
      default:
        return <SelectChallenge {...baseProps} type={type} />;
    }
  };

  return (
    <div className="space-y-4">
      <QuestionHeader
        challenge={challenge}
        questionType={type}
        status={status}
      >
        {type === "VIDEO" && <VideoChallenge challenge={challenge} />}
      </QuestionHeader>
      
      <CorrectAnswerDisplay
        showCorrectAnswer={showCorrectAnswer}
        status={status}
        options={options}
        correctAnswerText={getCorrectAnswerText()}
      />
      
      {renderChallenge()}
    </div>
  );
};