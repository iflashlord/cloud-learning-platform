"use server"

import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import db from "@/db/drizzle"
import { getUserProgress, getUserSubscription } from "@/db/queries"
import { challengeProgress, challenges, userProgress } from "@/db/schema"

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

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  })

  const isPractice = !!existingChallengeProgress

  if (
    currentUserProgress.hearts === 0 &&
    !isPractice &&
    !userSubscription?.isActive
  ) {
    return { error: "hearts" }
  }

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id))

    // Pro users get unlimited hearts and enhanced XP
    const heartsUpdate = userSubscription?.isActive
      ? currentUserProgress.hearts // Keep current hearts for pro (unlimited display)
      : Math.min(currentUserProgress.hearts + 1, 5) // Cap at 5 for free users

    const xpBonus = userSubscription?.isActive ? 15 : 10 // Pro users get 50% more XP

    await db
      .update(userProgress)
      .set({
        hearts: heartsUpdate,
        points: currentUserProgress.points + xpBonus,
      })
      .where(eq(userProgress.userId, userId))

    revalidatePath("/learn")
    revalidatePath("/lesson")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)
    return
  }

  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  })

  // Pro users get enhanced XP rewards
  const xpBonus = userSubscription?.isActive ? 15 : 10 // Pro users get 50% more XP

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + xpBonus,
    })
    .where(eq(userProgress.userId, userId))

  revalidatePath("/learn")
  revalidatePath("/lesson")
  revalidatePath("/quests")
  revalidatePath("/leaderboard")
  revalidatePath(`/lesson/${lessonId}`)
}
