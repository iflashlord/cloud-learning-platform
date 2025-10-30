"use server"

import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import db from "@/db/drizzle"
import { getUserProgress, getUserSubscription } from "@/db/queries"
import { challengeProgress, challenges, userProgress } from "@/db/schema"
import { GAMIFICATION } from "@/constants"
import { processLessonCompletion, awardXP } from "@/actions/gamification"

export const upsertChallengeProgress = async (
  challengeId: number,
  wasFirstTry: boolean = false,
  isFinalChallenge: boolean = false,
) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  let currentUserProgress = await getUserProgress()
  const userSubscription = await getUserSubscription()

  if (!currentUserProgress) {
    const defaultProgress = await db
      .insert(userProgress)
      .values({
        userId,
        hearts: 5,
        points: 0,
        gems: 50,
      })
      .returning()

    if (!defaultProgress[0]) {
      return { error: "progress_init_failed" }
    }

    // Re-fetch to include relations (activeCourse) expected downstream
    currentUserProgress =
      (await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
          activeCourse: {
            columns: {
              id: true,
              title: true,
              imageSrc: true,
            },
          },
        },
      })) ?? null

    if (!currentUserProgress) {
      return { error: "progress_init_failed" }
    }
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  })

  if (!challenge) {
    return { error: "challenge_not_found" }
  }

  const lessonId = challenge.lessonId

  if (!lessonId) {
    return { error: "lesson_missing" }
  }

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  })

  const isPractice = !!existingChallengeProgress

  if (currentUserProgress.hearts === 0 && !isPractice && !userSubscription?.isActive) {
    return { error: "hearts" }
  }

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id))

    // For practice lessons, award per-question XP (optional)
    if (GAMIFICATION.XP_PER_PRACTICE_QUESTION > 0) {
      await awardXP(
        GAMIFICATION.XP_PER_PRACTICE_QUESTION,
        "practice_question",
        challengeId.toString(),
        undefined,
        { applySubscriptionBonus: false, applyStreakBonus: false },
      )
    }

    if (isFinalChallenge) {
      const practiceLessonXP = userSubscription?.isActive
        ? GAMIFICATION.XP_PER_PRACTICE_LESSON_PRO
        : GAMIFICATION.XP_PER_PRACTICE_LESSON

      if (practiceLessonXP > 0) {
        await awardXP(
          practiceLessonXP,
          "practice_lesson",
          lessonId.toString(),
          undefined,
          { applySubscriptionBonus: false, applyStreakBonus: false },
        )
      }
    }

    // Pro users get unlimited hearts and enhanced XP. Free users should not auto-refill hearts from practice.
    if (!userSubscription?.isActive && currentUserProgress.hearts > 0) {
      const nextHearts = Math.min(currentUserProgress.hearts + 1, GAMIFICATION.MAX_HEARTS)

      if (nextHearts !== currentUserProgress.hearts) {
        await db
          .update(userProgress)
          .set({
            hearts: nextHearts,
          })
          .where(eq(userProgress.userId, userId))
      }
    }

    revalidatePath("/learn")
    revalidatePath("/lesson")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)
    return
  }

  // First time completing this challenge
  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  })

  await awardXP(
    GAMIFICATION.XP_PER_QUESTION,
    "challenge_question",
    challengeId.toString(),
    undefined,
    { applySubscriptionBonus: false, applyStreakBonus: false },
  )

  // Check if this is the last challenge in the lesson
  const allChallengesInLesson = await db.query.challenges.findMany({
    where: eq(challenges.lessonId, lessonId),
  })

  const completedChallengesInLesson = await db.query.challengeProgress.findMany({
    where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.completed, true)),
    with: {
      challenge: true,
    },
  })

  const completedChallengeIds = new Set(
    completedChallengesInLesson
      .filter((cp) => cp.challenge.lessonId === lessonId)
      .map((cp) => cp.challengeId),
  )

  // Add the current challenge that was just completed
  completedChallengeIds.add(challengeId)

  const isLessonComplete = allChallengesInLesson.length === completedChallengeIds.size

  if (isLessonComplete) {
    // Process full lesson completion with gamification rewards
    // TODO: Track if lesson was completed without mistakes (perfect)
    const wasPerfect = false // Implement perfect lesson tracking logic

    const rewards = await processLessonCompletion(lessonId, true, wasPerfect)

    revalidatePath("/learn")
    revalidatePath("/lesson")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)

    return {
      lessonComplete: true,
      rewards: {
        xp: rewards.xp,
        gems: rewards.gems,
        streak: rewards.newStreak,
        achievements: rewards.achievements,
      },
    }
  } else {
    // Just a challenge completion already awarded per-question XP above
    revalidatePath("/learn")
    revalidatePath("/lesson")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)

    return { lessonComplete: false }
  }
}
