"use server"

import { auth } from "@clerk/nextjs/server"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import db from "@/db/drizzle"
import { getUserProgress, getUserSubscription } from "@/db/queries"
import { userProgress } from "@/db/schema"

/**
 * Add XP points from watching ads
 */
export const addAdRewardPoints = async (points: number) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const userSubscription = await getUserSubscription()

  // Calculate final points with Pro bonus
  let finalPoints = points
  if (userSubscription?.isActive) {
    finalPoints = points + Math.round(points * 0.5) // 50% bonus for Pro users
  }

  // Update user's points in the database
  const updated = await db
    .update(userProgress)
    .set({
      points: sql`${userProgress.points} + ${finalPoints}`,
    })
    .where(eq(userProgress.userId, userId))
    .returning({ points: userProgress.points })

  // Revalidate paths to update UI
  revalidatePath("/shop")
  revalidatePath("/learn")
  revalidatePath("/quests")
  revalidatePath("/leaderboard")

  return {
    success: true,
    newPoints: updated[0]?.points ?? 0,
    earnedPoints: finalPoints,
    bonusPoints: userSubscription?.isActive ? Math.round(points * 0.5) : 0,
  }
}
