"use client"

import { cn } from "@/lib/utils"
import { statusStyles } from "@/lib/style-utils"
import { Mic } from "lucide-react"
import { useState, useEffect } from "react"
import { SpeechInput } from "@/components/SpeechInput"

interface SpeechInputChallengeProps {
  status: "correct" | "wrong" | "none"
  onTextSubmit?: (text: string) => void
  onTextChange?: (text: string) => void
  disabled?: boolean
}

export const SpeechInputChallenge = ({
  status,
  onTextSubmit,
  onTextChange,
  disabled,
}: SpeechInputChallengeProps) => {
  const [textInput, setTextInput] = useState("")

  // Clear text input when status resets to "none" (retry)
  useEffect(() => {
    if (status === "none") {
      setTextInput("")
      onTextChange?.("")
    }
  }, [status, onTextChange])

  const handleSpeechChange = (text: string) => {
    setTextInput(text)
    onTextChange?.(text)
  }

  return (
    <div className='space-y-4'>
      <div
        className={cn(
          "mt-3 p-3 rounded-lg border",
          statusStyles.info.bg,
          statusStyles.info.border
        )}
      >
        <p
          className={cn(
            "text-sm font-medium flex items-center gap-2",
            statusStyles.info.text
          )}
        >
          <Mic className='w-4 h-4' />
          <span>
            Voice Input Mode - Click the microphone and speak your answer
            clearly. Press Enter or use the CHECK button below to submit.
          </span>
        </p>
      </div>

      <div className='px-6'>
        <SpeechInput
          value={textInput}
          onChange={handleSpeechChange}
          onSubmit={onTextSubmit}
          disabled={disabled}
          placeholder='Click the microphone button and speak your answer...'
        />

        {textInput && (
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Transcribed: {textInput}
          </p>
        )}
      </div>
    </div>
  )
}
