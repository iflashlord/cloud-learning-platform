/**
 * User Queries Module
 *
 * Database queries related to user data, progress, subscriptions, and leaderboards.
 * Handles user authentication and authorization checks.
 */

import { cache } from "react"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

import db from "@/db/drizzle"
import { userProgress, userSubscription, userCouponRedemptions } from "@/db/schema"

// Constants
const DAY_IN_MS = 86_400_000

/**
 * Get the current user's progress including active course info
 */
export const getUserProgress = cache(async () => {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: {
        columns: {
          id: true,
          title: true,
          imageSrc: true,
          // themeConfig: true, // TODO: Enable after migration
        },
      },
    },
  })

  return data
})

/**
 * Get the current user's subscription status (includes coupon-based pro access)
 */
export const getUserSubscription = cache(async () => {
  const { userId } = await auth()

  if (!userId) return null

  // Check for regular Stripe subscription
  const stripeSubscription = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  })

  // Check for active coupon redemptions
  const activeCouponRedemption = await db.query.userCouponRedemptions.findFirst({
    where: eq(userCouponRedemptions.userId, userId),
    orderBy: (userCouponRedemptions, { desc }) => [desc(userCouponRedemptions.redeemedAt)],
    with: {
      coupon: true,
    },
  })

  // Check if Stripe subscription is active
  const stripeIsActive =
    stripeSubscription &&
    stripeSubscription.stripePriceId &&
    stripeSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  // Check if coupon redemption is active
  const couponIsActive =
    activeCouponRedemption &&
    activeCouponRedemption.isActive &&
    new Date(activeCouponRedemption.proEndsAt).getTime() > Date.now()

  // Calculate remaining days for coupon subscriptions
  const couponRemainingDays =
    activeCouponRedemption && couponIsActive
      ? Math.ceil((new Date(activeCouponRedemption.proEndsAt).getTime() - Date.now()) / DAY_IN_MS)
      : 0

  // Calculate remaining days for Stripe subscriptions
  const stripeRemainingDays =
    stripeSubscription && stripeIsActive
      ? Math.ceil((stripeSubscription.stripeCurrentPeriodEnd?.getTime()! - Date.now()) / DAY_IN_MS)
      : 0

  // Return subscription data with combined pro status
  return {
    ...stripeSubscription,
    isActive: !!(stripeIsActive || couponIsActive),
    activeCouponRedemption: couponIsActive ? activeCouponRedemption : null,
    proType: stripeIsActive ? "stripe" : couponIsActive ? "coupon" : null,
    remainingDays: stripeIsActive ? stripeRemainingDays : couponRemainingDays,
    expiresAt: stripeIsActive
      ? stripeSubscription?.stripeCurrentPeriodEnd
      : activeCouponRedemption?.proEndsAt,
  }
})

/**
 * Get active coupon redemptions for the current user
 */
export const getUserActiveCoupons = cache(async () => {
  const { userId } = await auth()

  if (!userId) return []

  const activeCoupons = await db.query.userCouponRedemptions.findMany({
    where: eq(userCouponRedemptions.userId, userId),
    with: {
      coupon: true,
    },
    orderBy: (userCouponRedemptions, { desc }) => [desc(userCouponRedemptions.redeemedAt)],
  })

  // Filter for currently active coupons
  return activeCoupons.filter(
    (redemption) => redemption.isActive && new Date(redemption.proEndsAt).getTime() > Date.now(),
  )
})

/**
 * Get top 10 users by points (global leaderboard)
 */
export const getTopTenUsers = cache(async () => {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  })

  return data
})

/**
 * Get top 10 users by points for a specific course
 */
export const getTopTenUsersByCourse = cache(async (courseId: number) => {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  const data = await db.query.userProgress.findMany({
    where: eq(userProgress.activeCourseId, courseId),
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  })

  return data
})
