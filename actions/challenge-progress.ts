"use server"

import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import db from "@/db/drizzle"
import { getUserProgress, getUserSubscription } from "@/db/queries"
import { challengeProgress, challenges, userProgress } from "@/db/schema"
import { processLessonCompletion, awardXP } from "@/actions/gamification"

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const currentUserProgress = await getUserProgress()
  const userSubscription = await getUserSubscription()

  if (!currentUserProgress) {
    throw new Error("User progress not found")
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  })

  if (!challenge) {
    throw new Error("Challenge not found")
  }

  const lessonId = challenge.lessonId

  if (!lessonId) {
    throw new Error("Challenge is not associated with a lesson")
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

    // For practice lessons, just award XP (no lesson completion processing)
    const xpAmount = userSubscription?.isActive ? 8 : 5 // Practice XP
    await awardXP(xpAmount, "practice_lesson", lessonId.toString())

    // Update monthly quest progress for practice lessons
    const { updateMonthlyQuestProgress } = await import("@/actions/gamification")
    await updateMonthlyQuestProgress("complete_monthly_lessons", 1)

    // Pro users get unlimited hearts and enhanced XP
    const heartsUpdate = userSubscription?.isActive
      ? currentUserProgress.hearts // Keep current hearts for pro (unlimited display)
      : Math.min(currentUserProgress.hearts + 1, 5) // Cap at 5 for free users

    await db
      .update(userProgress)
      .set({
        hearts: heartsUpdate,
      })
      .where(eq(userProgress.userId, userId))

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
    // Just a challenge completion, award basic XP
    const xpAmount = userSubscription?.isActive ? 15 : 10
    await awardXP(xpAmount, "challenge_complete", challengeId.toString())

    revalidatePath("/learn")
    revalidatePath("/lesson")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)

    return { lessonComplete: false }
  }
}
