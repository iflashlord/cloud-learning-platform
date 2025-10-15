"use client";

import { cn } from "@/lib/utils";
import { statusStyles } from "@/lib/style-utils";
import { Keyboard, Mic } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const [showSpeechInput, setShowSpeechInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when component mounts
  useEffect(() => {
    if (inputRef.current && status === "none") {
      inputRef.current.focus();
    }
  }, [status]);

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

  const handleSpeechChange = (speechText: string) => {
    setTextInput(speechText);
    onTextChange?.(speechText);
  };

  return (
    <div className="space-y-4">
      <div className={cn("mt-3 p-3 rounded-lg border", statusStyles.info.bg, statusStyles.info.border)}>
        <p className={cn("text-sm flex items-center gap-2", statusStyles.info.text)}>
          <Keyboard className="w-4 h-4" />
          <span>Type your answer or use speech recognition. Use the CHECK button below to submit.</span>
        </p>
      </div>
      
      <div className="px-6">
        {showSpeechInput ? (
          <div className="space-y-3">
            <SpeechInput
              value={textInput}
              onChange={handleSpeechChange}
              disabled={disabled}
              placeholder="Click the microphone and speak your answer..."
            />
            <button
              onClick={() => setShowSpeechInput(false)}
              className="text-sm text-blue-600 hover:text-blue-700 underline"
            >
              Switch to text input
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={textInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer here..."
              disabled={disabled}
              autoFocus
              className={cn(
                "w-full px-4 py-3 pr-12 border-2 rounded-lg text-base",
                "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
                "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                "border-neutral-300 dark:border-gray-600",
                "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                disabled && "opacity-60 cursor-not-allowed",
                status === "correct" && cn(statusStyles.success.border, statusStyles.success.bg),
                status === "wrong" && cn(statusStyles.error.border, statusStyles.error.bg)
              )}
            />
            
            {/* Speech input toggle button */}
            <button
              type="button"
              onClick={() => setShowSpeechInput(true)}
              disabled={disabled}
              className={cn(
                "absolute right-2 top-1/2 transform -translate-y-1/2",
                "p-2 rounded-lg transition-colors",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              title="Use speech input"
            >
              <Mic className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        )}
        
        {textInput && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Answer: {textInput}
          </p>
        )}
      </div>
    </div>
  );
};