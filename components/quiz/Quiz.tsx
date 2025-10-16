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

  // Detect if this is a practice lesson (already completed)
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

  // Show toast notification when correct answer is revealed
  useEffect(() => {
    if (showCorrectAnswer) {
      toast.success("💡 Correct answer revealed to help you learn!", {
        duration: 4000,
        position: "bottom-left",
        icon: "👁️",
      })
    }
  }, [showCorrectAnswer])

  // Universal heart handler for all question types
  const handleWrongAnswer = (skipServerAction = false) => {
    if (isPractice) {
      // In practice mode, just show visual feedback
      const visualHearts = Math.max(0, hearts - 1)
      setHearts(visualHearts)
      setTimeout(() => {
        setHearts(hearts) // Restore hearts after visual feedback
      }, 1500)
    } else if (!userSubscription?.isActive) {
      const newHearts = Math.max(0, hearts - 1)
      setHearts(newHearts)

      // Show modal when hearts reach 0
      if (newHearts === 0) {
        setShowHeartsModal(true)
      }

      // Call server action to update database (unless it's already being handled elsewhere)
      if (!skipServerAction) {
        import("../../actions/user-progress").then(({ reduceHearts }) => {
          reduceHearts(challenge?.id ?? 0).catch((error) => {
            console.error("Failed to reduce hearts:", error)
          })
        })
      }
    }
    // For subscription users, unlimited hearts - no action needed
  }

  const onCheck = () => {
    // Handle drag and drop questions
    if (challenge?.type === "DRAG_DROP") {
      // Call the exposed drag drop checker function
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
          handleWrongAnswer() // Handle heart depletion

          // Show correct answer after 3 wrong attempts
          if (newAttempts >= 3) {
            setShowCorrectAnswer(true)
          }
        }
      }
      return
    }

    // Handle text input questions
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
        handleWrongAnswer() // Handle heart depletion for text input

        // Show correct answer after 3 wrong attempts
        if (newAttempts >= 3) {
          setShowCorrectAnswer(true)
        }
      }
      return
    }

    // Handle option-based questions
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
      handleWrongAnswer(true) // Handle heart depletion - skip server action since validateAnswer will handle it

      // Show correct answer after 3 wrong attempts
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
    // Reset the quiz to the beginning
    router.refresh()
  }

  const handleChallengeComplete = async (challengeId: number) => {
    try {
      await upsertChallengeProgress(challengeId)
    } catch (error) {
      console.error("Failed to update challenge progress:", error)
    }
  }

  // Show completion screen if quiz is completed
  if (isCompleted) {
    return (
      <QuizCompletion
        challenges={initialLessonChallenges}
        hearts={hearts}
        lessonId={lessonId!}
        onComplete={handleComplete}
        onRedo={handleRedo}
        finishAudio={finishAudio}
        userSubscription={userSubscription}
      />
    )
  }

  // Main quiz interface
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
