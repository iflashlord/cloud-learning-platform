"use client"

import { challengeOptions, challenges } from "@/db/schema"
import { useState, useEffect } from "react"

import { QuestionHeader } from "./QuestionHeader"
import { CorrectAnswerDisplay } from "./CorrectAnswerDisplay"
import { DragDropChallenge } from "./DragDropChallenge"
import { TextInputChallenge } from "./TextInputChallenge"
import { SpeechInputChallenge } from "./SpeechInputChallenge"
import { ListeningChallenge } from "./ListeningChallenge"
import { SelectChallenge } from "./SelectChallenge"
import { VideoChallenge } from "./VideoChallenge"

type Props = {
  options: (typeof challengeOptions.$inferSelect)[]
  onSelect: (id: number) => void
  status: "correct" | "wrong" | "none"
  selectedOption?: number
  disabled?: boolean
  type: (typeof challenges.$inferSelect)["type"]
  challenge: typeof challenges.$inferSelect
  onTextSubmit?: (text: string) => void
  onTextChange?: (text: string) => void
  showCorrectAnswer?: boolean
}

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
  const [textInput, setTextInput] = useState("")

  useEffect(() => {
    if (status === "none") {
      setTextInput("")
      onTextChange?.("")
    }
  }, [status, onTextChange])

  const getCorrectAnswerText = () => {
    if (challenge?.correctAnswer) return challenge.correctAnswer
    const correctOption = options.find((option) => option.correct)
    return correctOption?.text
  }

  const renderChallenge = () => {
    const optionsDisabled = disabled && status !== "none"

    const baseProps = {
      options,
      selectedOption,
      onSelect,
      status,
      disabled: optionsDisabled,
      challenge,
      showCorrectAnswer,
    }

    switch (type) {
      case "TEXT_INPUT":
        return (
          <TextInputChallenge
            status={status}
            onTextSubmit={onTextSubmit}
            onTextChange={onTextChange}
            disabled={disabled}
          />
        )

      case "SPEECH_INPUT":
        return (
          <SpeechInputChallenge
            status={status}
            onTextSubmit={onTextSubmit}
            onTextChange={onTextChange}
            disabled={disabled}
          />
        )

      case "DRAG_DROP":
        return (
          <DragDropChallenge
            options={options}
            disabled={disabled}
            status={status}
            onSelect={onSelect}
          />
        )

      case "VIDEO":
      case "LISTENING":
        return (
          <div className='space-y-4'>
            <SelectChallenge {...baseProps} type={type} />
          </div>
        )

      case "IMAGE_SELECT":
      case "TRUE_FALSE":
      case "SELECT":
      case "ASSIST":
      default:
        return <SelectChallenge {...baseProps} type={type} />
    }
  }

  const optionsDisabled = disabled && status !== "none"
  const baseProps = {
    options,
    selectedOption,
    onSelect,
    status,
    disabled: optionsDisabled,
    challenge,
  }
  return (
    <div className='space-y-4'>
      <QuestionHeader challenge={challenge} questionType={type} status={status}>
        {type === "VIDEO" && <VideoChallenge challenge={challenge} />}
        {type === "LISTENING" && <ListeningChallenge {...baseProps} />}
      </QuestionHeader>

      {renderChallenge()}
    </div>
  )
}
