"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";

/**
 * Add XP points from watching ads
 */
export const addAdRewardPoints = async (points: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  // Update user's points in the database
  await db.update(userProgress).set({
    points: currentUserProgress.points + points,
  }).where(eq(userProgress.userId, userId));

  // Revalidate paths to update UI
  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");

  return { success: true, newPoints: currentUserProgress.points + points };
};