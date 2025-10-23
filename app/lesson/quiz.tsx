"use client"

import { useMount } from "react-use"
import { useHeartsModal } from "@/store/use-hearts-modal"
import { usePracticeModal } from "@/store/use-practice-modal"
import { challengeOptions, challenges, userSubscription } from "@/db/schema"
import { Quiz as ModularQuiz } from "@/components/quiz"
import { LessonMeta } from "@/components/quiz/types"

type Props = {
  initialPercentage: number
  initialHearts: number
  initialLessonId: number
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: (typeof challengeOptions.$inferSelect)[]
  })[]
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean
      })
    | null
  lesson: LessonMeta
}

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
  lesson,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal()
  const { open: openPracticeModal } = usePracticeModal()

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal()
    }
  })

  const normalizedChallenges = initialLessonChallenges.map((challenge) => ({
    ...challenge,
    lessonId: challenge.lessonId ?? initialLessonId, // Use current lesson ID as fallback
  }))

  const lessonForAssistant: LessonMeta = {
    ...lesson,
    challenges: normalizedChallenges,
  }

  return (
    <ModularQuiz
      initialLessonId={initialLessonId}
      initialLessonChallenges={normalizedChallenges}
      initialHearts={initialHearts}
      initialPercentage={initialPercentage}
      userSubscription={
        userSubscription ? { isActive: userSubscription.isActive } : { isActive: false }
      }
      lesson={lessonForAssistant}
    />
  )
}
