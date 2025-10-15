"use server"

import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import db from "@/db/drizzle"
import { isAdmin } from "@/lib/admin"
import { userSubscription } from "@/db/schema"

/**
 * Admin-only: Toggle between pro and free mode for current user
 */
export const toggleManualProMode = async () => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  // Check if user has an existing subscription record
  const existingSubscription = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  })

  const currentDate = new Date()

  if (existingSubscription) {
    // Toggle the subscription status by adjusting the end date
    const isCurrentlyActive =
      existingSubscription.stripeCurrentPeriodEnd?.getTime()! + 86_400_000 >
      Date.now()

    const newEndDate = isCurrentlyActive
      ? new Date(Date.now() - 86_400_000 * 2) // Set to 2 days ago (expired)
      : new Date(Date.now() + 86_400_000 * 30) // Set to 30 days from now (active)

    await db
      .update(userSubscription)
      .set({
        stripeCurrentPeriodEnd: newEndDate,
      })
      .where(eq(userSubscription.userId, userId))

    // Revalidate paths to update UI
    revalidatePath("/learn")
    revalidatePath("/shop")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")

    return {
      success: true,
      isProMode: !isCurrentlyActive,
      message: `Switched to ${!isCurrentlyActive ? "Pro" : "Free"} mode`,
    }
  } else {
    // Create new subscription record for Pro mode
    await db.insert(userSubscription).values({
      userId,
      stripeCustomerId: `manual_admin_${userId}`,
      stripeSubscriptionId: `manual_admin_sub_${userId}`,
      stripePriceId: "manual_admin_price",
      stripeCurrentPeriodEnd: new Date(Date.now() + 86_400_000 * 30), // 30 days from now
    })

    // Revalidate paths to update UI
    revalidatePath("/learn")
    revalidatePath("/shop")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")

    return {
      success: true,
      isProMode: true,
      message: "Switched to Pro mode",
    }
  }
}

/**
 * Admin-only: Get current pro mode status for manual switching
 */
export const getManualProModeStatus = async () => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  const subscription = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  })

  if (!subscription) {
    return { isProMode: false }
  }

  const isActive =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime()! + 86_400_000 > Date.now()

  return { isProMode: !!isActive }
}
