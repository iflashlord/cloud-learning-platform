"use client";

import { useMount } from "react-use";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import { Quiz as ModularQuiz } from "@/components/quiz";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
  userSubscription: typeof userSubscription.$inferSelect & {
    isActive: boolean;
  } | null;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  return (
    <ModularQuiz
      initialLessonId={initialLessonId}
      initialLessonChallenges={initialLessonChallenges}
      initialHearts={initialHearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription || undefined}
    />
  );
};
