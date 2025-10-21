"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useQuizState } from "./QuizState"
import { useQuizAudio } from "./QuizAudio"
import { useQuizValidator } from "./QuizValidator"
import { QuizLayout } from "./QuizLayout"
import { QuizCompletion } from "./QuizCompletion"
import { HeartsDepleteModal } from "./HeartsDepleteModal"
import { QuizChallenge, UserSubscription } from "./types"
import { upsertChallengeProgress } from "@/actions/challenge-progress"

interface QuizProps {
  initialLessonId: number
  initialLessonChallenges: QuizChallenge[]
  initialHearts: number
  initialPercentage: number
  userSubscription: UserSubscription
}

export const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscription,
}: QuizProps) => {
  const router = useRouter()

  const isPractice = initialPercentage === 100
  const [showHeartsModal, setShowHeartsModal] = useState(false)

  const {
    lessonId,
    activeIndex,
    selectedOption,
    textInput,
    status,
    hearts,
    percentage,
    challenge,
    options,
    isCompleted,
    wrongAttempts,
    showCorrectAnswer,
    onSelect,
    onContinue,
    setStatus,
    setHearts,
    setSelectedOption,
    setTextInput,
    setWrongAttempts,
    setShowCorrectAnswer,
  } = useQuizState({
    initialChallenges: initialLessonChallenges,
    initialHearts,
    initialPercentage,
  })

  const {
    correctAudio,
    incorrectAudio,
    finishAudio,
    playCorrect,
    playIncorrect,
    playFinish,
  } = useQuizAudio()

  const { validateAnswer, pending } = useQuizValidator({
    challengeId: challenge?.id ?? 0,
    hearts,
    userSubscription,
    isPractice,
    onHeartUpdate: setHearts,
    onIncorrectAudio: playIncorrect,
    onCorrectAudio: playCorrect,
    onHeartsDeplete: () => setShowHeartsModal(true),
  })

  useEffect(() => {
    if (showCorrectAnswer) {
      toast.success("💡 Correct answer revealed to help you learn!", {
        duration: 4000,
        position: "bottom-left",
        icon: "👁️",
      })
    }
  }, [showCorrectAnswer])

  const handleWrongAnswer = (skipServerUpdate = false) => {
    if (isPractice) {
      const visualHearts = Math.max(0, hearts - 1)
      setHearts(visualHearts)
      setTimeout(() => {
        setHearts(hearts)
      }, 1500)
    } else if (!userSubscription?.isActive) {
      const newHearts = Math.max(0, hearts - 1)
      setHearts(newHearts)

      if (newHearts === 0) {
        setShowHeartsModal(true)
      }

      if (!skipServerUpdate) {
        import("../../actions/user-progress").then(({ reduceHearts }) => {
          reduceHearts(challenge?.id ?? 0).catch((error) => {
            console.error("Failed to reduce hearts:", error)
          })
        })
      }
    }
  }

  const onCheck = () => {
    if (challenge?.type === "DRAG_DROP") {
      if (typeof (window as any).checkCurrentDragOrder === "function") {
        const isCorrect = (window as any).checkCurrentDragOrder()
        if (isCorrect) {
          setStatus("correct")
          playCorrect()
          handleChallengeComplete(challenge?.id ?? 0)
        } else {
          const newAttempts = wrongAttempts + 1
          setWrongAttempts(newAttempts)
          setStatus("wrong")
          playIncorrect()
          handleWrongAnswer()

          if (newAttempts >= 3) {
            setShowCorrectAnswer(true)
          }
        }
      }
      return
    }

    if (
      challenge?.type === "TEXT_INPUT" ||
      challenge?.type === "SPEECH_INPUT"
    ) {
      if (!textInput.trim()) return

      const isCorrect =
        textInput.trim().toLowerCase() ===
        challenge.correctAnswer?.toLowerCase()

      if (isCorrect) {
        setStatus("correct")
        playCorrect()
        handleChallengeComplete(challenge?.id ?? 0)
      } else {
        const newAttempts = wrongAttempts + 1
        setWrongAttempts(newAttempts)
        setStatus("wrong")
        playIncorrect()
        handleWrongAnswer()

        if (newAttempts >= 3) {
          setShowCorrectAnswer(true)
        }
      }
      return
    }

    if (!selectedOption) return

    const selectedChallengeOption = options.find(
      (option: any) => option.id === selectedOption
    )

    if (!selectedChallengeOption) return

    if (selectedChallengeOption.correct) {
      setStatus("correct")
      playCorrect()
      handleChallengeComplete(challenge?.id ?? 0)
    } else {
      const newAttempts = wrongAttempts + 1
      setWrongAttempts(newAttempts)
      setStatus("wrong")
      playIncorrect()
      handleWrongAnswer(true)

      if (newAttempts >= 3) {
        setShowCorrectAnswer(true)
      }
    }

    validateAnswer(selectedChallengeOption)
  }

  const handleComplete = () => {
    router.push("/learn")
  }

  const handleRedo = () => {
    router.refresh()
  }

  const handleChallengeComplete = async (challengeId: number) => {
    try {
      await upsertChallengeProgress(challengeId)
    } catch (error) {
      console.error("Failed to update challenge progress:", error)
    }
  }

  if (isCompleted) {
    return (
      <QuizCompletion
        challenges={initialLessonChallenges}
        hearts={hearts}
        lessonId={lessonId!}
        onComplete={handleComplete}
        onRedo={handleRedo}
        finishAudio={finishAudio || undefined}
        userSubscription={userSubscription}
      />
    )
  }

  return (
    <>
      {correctAudio}
      {incorrectAudio}

      <QuizLayout
        percentage={percentage}
        hearts={hearts}
        hasActiveSubscription={!!userSubscription?.isActive}
        challenge={challenge}
        options={options}
        selectedOption={selectedOption}
        textInput={textInput}
        status={status}
        disabled={pending}
        lessonId={lessonId}
        wrongAttempts={wrongAttempts}
        showCorrectAnswer={showCorrectAnswer}
        onSelect={onSelect}
        onContinue={onContinue}
        onCheck={status === "none" ? onCheck : onContinue}
        onTextChange={setTextInput}
      />

      <HeartsDepleteModal
        isOpen={showHeartsModal}
        onClose={() => setShowHeartsModal(false)}
      />
    </>
  )
}
