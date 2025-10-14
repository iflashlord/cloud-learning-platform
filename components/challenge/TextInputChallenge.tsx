"use client";

import { cn } from "@/lib/utils";
import { statusStyles } from "@/lib/style-utils";
import { Keyboard } from "lucide-react";
import { useState, useEffect } from "react";
import { SpeechInput } from "@/components/SpeechInput";

interface TextInputChallengeProps {
  status: "correct" | "wrong" | "none";
  onTextSubmit?: (text: string) => void;
  onTextChange?: (text: string) => void;
  disabled?: boolean;
}

export const TextInputChallenge = ({
  status,
  onTextSubmit,
  onTextChange,
  disabled
}: TextInputChallengeProps) => {
  const [textInput, setTextInput] = useState("");

  // Clear text input when status resets to "none" (retry)
  useEffect(() => {
    if (status === "none") {
      setTextInput("");
      onTextChange?.("");
    }
  }, [status, onTextChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextInput(value);
    onTextChange?.(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && textInput.trim() && !disabled) {
      onTextSubmit?.(textInput.trim());
    }
  };

  const handleSpeechResult = (transcript: string) => {
    setTextInput(transcript);
    onTextChange?.(transcript);
  };

  const handleSpeechSubmit = (transcript: string) => {
    if (transcript.trim() && !disabled) {
      onTextSubmit?.(transcript.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div className={cn("mt-3 p-3 rounded-lg border", statusStyles.info.bg, statusStyles.info.border)}>
        <p className={cn("text-sm flex items-center gap-2", statusStyles.info.text)}>
          <Keyboard className="w-4 h-4" />
          <span>Type or speak your answer. Press Enter to submit.</span>
        </p>
      </div>
      
      <div className="px-6">
        <div className="relative">
          <input
            type="text"
            value={textInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            disabled={disabled}
            className={cn(
              "w-full px-4 py-3 border-2 rounded-lg text-base",
              "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
              "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
              "border-neutral-300 dark:border-gray-600",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              disabled && "opacity-60 cursor-not-allowed",
              status === "correct" && cn(statusStyles.success.border, statusStyles.success.bg),
              status === "wrong" && cn(statusStyles.error.border, statusStyles.error.bg)
            )}
          />
          
          {/* Speech input button */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <SpeechInput
              value={textInput}
              onChange={handleSpeechResult}
              disabled={disabled}
              className="w-8 h-8"
            />
          </div>
        </div>
        
        {/* Submit button */}
        <button
          onClick={() => textInput.trim() && onTextSubmit?.(textInput.trim())}
          disabled={!textInput.trim() || disabled}
          className={cn(
            "mt-3 w-full px-4 py-2 rounded-lg font-medium transition-all",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "bg-blue-600 hover:bg-blue-700 text-white",
            "hover:opacity-90"
          )}
        >
          Submit Answer
        </button>
        
        {textInput && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Character count: {textInput.length}
          </p>
        )}
      </div>
    </div>
  );
};