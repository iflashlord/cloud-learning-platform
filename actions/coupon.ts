"use server"

import { auth } from "@clerk/nextjs/server"
import { eq, and, gte, lte } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import db from "@/db/drizzle"
import { isAdmin } from "@/lib/admin"
import { couponCodes, userCouponRedemptions } from "@/db/schema"

/**
 * User Action: Redeem a coupon code for pro access
 */
export const redeemCoupon = async (couponCode: string) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const code = couponCode.toUpperCase().trim()

  if (!code) {
    throw new Error("Coupon code is required")
  }

  // Find the coupon
  const coupon = await db.query.couponCodes.findFirst({
    where: eq(couponCodes.code, code),
  })

  if (!coupon) {
    throw new Error("Invalid coupon code")
  }

  // Check if coupon is active
  if (!coupon.isActive) {
    throw new Error("This coupon code is no longer valid")
  }

  // Check if coupon has expired
  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) {
    throw new Error("This coupon code has expired")
  }

  // Check usage limit
  if (coupon.currentUsages >= coupon.maxUsages) {
    throw new Error("This coupon code has reached its usage limit")
  }

  // Check if user has an active redemption for this coupon
  const activeCouponRedemption = await db.query.userCouponRedemptions.findFirst({
    where: and(
      eq(userCouponRedemptions.userId, userId),
      eq(userCouponRedemptions.couponId, coupon.id),
      eq(userCouponRedemptions.isActive, true),
      gte(userCouponRedemptions.proEndsAt, new Date()),
    ),
  })

  if (activeCouponRedemption) {
    throw new Error("You have already redeemed this coupon code")
  }

  // Check if user has any active coupon redemption
  const activeRedemption = await db.query.userCouponRedemptions.findFirst({
    where: and(
      eq(userCouponRedemptions.userId, userId),
      eq(userCouponRedemptions.isActive, true),
      gte(userCouponRedemptions.proEndsAt, new Date()),
    ),
  })

  if (activeRedemption) {
    throw new Error("You already have an active coupon subscription")
  }

  // Calculate pro period
  const proStartsAt = new Date()
  const proEndsAt = new Date(Date.now() + coupon.durationDays * 24 * 60 * 60 * 1000)

  // Create redemption record
  await db.insert(userCouponRedemptions).values({
    userId,
    couponId: coupon.id,
    proStartsAt,
    proEndsAt,
  })

  // Update coupon usage count
  await db
    .update(couponCodes)
    .set({
      currentUsages: coupon.currentUsages + 1,
      updatedAt: new Date(),
    })
    .where(eq(couponCodes.id, coupon.id))

  // Revalidate paths to update UI
  revalidatePath("/learn")
  revalidatePath("/shop")
  revalidatePath("/pro")
  revalidatePath("/subscription")

  return {
    success: true,
    message: `Congratulations! You now have ${coupon.durationDays} days of Pro access!`,
    proEndsAt,
  }
}

/**
 * Admin Action: Create a new coupon code
 */
export const createCoupon = async (data: {
  code: string
  description?: string
  maxUsages: number
  durationDays: number
  expiresAt?: Date
}) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  const code = data.code.toUpperCase().trim()

  if (!code) {
    throw new Error("Coupon code is required")
  }

  if (code.length < 3) {
    throw new Error("Coupon code must be at least 3 characters")
  }

  if (data.maxUsages <= 0) {
    throw new Error("Max usages must be greater than 0")
  }

  if (data.durationDays <= 0) {
    throw new Error("Duration must be greater than 0 days")
  }

  // Check if coupon code already exists
  const existingCoupon = await db.query.couponCodes.findFirst({
    where: eq(couponCodes.code, code),
  })

  if (existingCoupon) {
    throw new Error("This coupon code already exists")
  }

  // Create the coupon
  const newCoupon = await db
    .insert(couponCodes)
    .values({
      code,
      description: data.description || null,
      maxUsages: data.maxUsages,
      durationDays: data.durationDays,
      expiresAt: data.expiresAt || null,
      createdBy: userId,
    })
    .returning()

  return {
    success: true,
    message: "Coupon created successfully",
    coupon: newCoupon[0],
  }
}

/**
 * Admin Action: Update coupon status (activate/deactivate)
 */
export const updateCouponStatus = async (couponId: number, isActive: boolean) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  await db
    .update(couponCodes)
    .set({
      isActive,
      updatedAt: new Date(),
    })
    .where(eq(couponCodes.id, couponId))

  return {
    success: true,
    message: `Coupon ${isActive ? "activated" : "deactivated"} successfully`,
  }
}

/**
 * Admin Action: Disable a user's coupon redemption
 */
export const disableUserCouponRedemption = async (redemptionId: number) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  await db
    .update(userCouponRedemptions)
    .set({
      isActive: false,
    })
    .where(eq(userCouponRedemptions.id, redemptionId))

  return {
    success: true,
    message: "User coupon access disabled successfully",
  }
}

/**
 * Admin Action: Enable a user's coupon redemption
 */
export const enableUserCouponRedemption = async (redemptionId: number) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  await db
    .update(userCouponRedemptions)
    .set({
      isActive: true,
    })
    .where(eq(userCouponRedemptions.id, redemptionId))

  return {
    success: true,
    message: "User coupon access enabled successfully",
  }
}

/**
 * Admin Action: Get all coupons with usage statistics
 */
export const getAllCoupons = async () => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  const coupons = await db.query.couponCodes.findMany({
    with: {
      userCouponRedemptions: {
        with: {
          user: {
            columns: {
              userId: true,
              userName: true,
              userImageSrc: true,
            },
          },
        },
      },
    },
    orderBy: (couponCodes, { desc }) => [desc(couponCodes.createdAt)],
  })

  return coupons
}

/**
 * Admin Action: Update coupon details
 */
export const updateCoupon = async (
  couponId: number,
  data: {
    code?: string
    description?: string
    maxUsages?: number
    durationDays?: number
    expiresAt?: Date | null
    isActive?: boolean
  },
) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  // If updating code, check for conflicts
  if (data.code) {
    const code = data.code.toUpperCase().trim()

    if (code.length < 3) {
      throw new Error("Coupon code must be at least 3 characters")
    }

    const existingCoupon = await db.query.couponCodes.findFirst({
      where: and(
        eq(couponCodes.code, code),
        // Make sure it's not the same coupon we're updating
        eq(couponCodes.id, couponId),
      ),
    })

    // Check if another coupon has this code
    const conflictingCoupon = await db.query.couponCodes.findFirst({
      where: and(
        eq(couponCodes.code, code),
        // Different ID
      ),
    })

    if (conflictingCoupon && conflictingCoupon.id !== couponId) {
      throw new Error("This coupon code is already in use")
    }

    data.code = code
  }

  if (data.maxUsages !== undefined && data.maxUsages <= 0) {
    throw new Error("Max usages must be greater than 0")
  }

  if (data.durationDays !== undefined && data.durationDays <= 0) {
    throw new Error("Duration must be greater than 0 days")
  }

  const updateData: any = {
    ...data,
    updatedAt: new Date(),
  }

  await db.update(couponCodes).set(updateData).where(eq(couponCodes.id, couponId))

  return {
    success: true,
    message: "Coupon updated successfully",
  }
}

/**
 * Admin Action: Delete a coupon (soft delete by deactivating)
 */
export const deleteCoupon = async (couponId: number) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  // Check if coupon has redemptions
  const redemptions = await db.query.userCouponRedemptions.findMany({
    where: eq(userCouponRedemptions.couponId, couponId),
  })

  if (redemptions.length > 0) {
    // If there are redemptions, just deactivate the coupon
    await db
      .update(couponCodes)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(couponCodes.id, couponId))

    return {
      success: true,
      message: "Coupon deactivated (cannot delete due to existing redemptions)",
    }
  } else {
    // If no redemptions, actually delete the coupon
    await db.delete(couponCodes).where(eq(couponCodes.id, couponId))

    return {
      success: true,
      message: "Coupon deleted successfully",
    }
  }
}

/**
 * Admin Action: Get a single coupon by ID
 */
export const getCouponById = async (couponId: number) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  const coupon = await db.query.couponCodes.findFirst({
    where: eq(couponCodes.id, couponId),
    with: {
      userCouponRedemptions: {
        with: {
          user: {
            columns: {
              userId: true,
              userName: true,
              userImageSrc: true,
            },
          },
        },
      },
    },
  })

  if (!coupon) {
    throw new Error("Coupon not found")
  }

  return coupon
}

/**
 * User Action: Cancel their own coupon redemption
 */
export const cancelMyCouponRedemption = async () => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  // Find the user's active coupon redemption
  const activeRedemption = await db.query.userCouponRedemptions.findFirst({
    where: and(
      eq(userCouponRedemptions.userId, userId),
      eq(userCouponRedemptions.isActive, true),
      gte(userCouponRedemptions.proEndsAt, new Date()),
    ),
  })

  if (!activeRedemption) {
    throw new Error("No active coupon redemption found")
  }

  // Deactivate the redemption
  await db
    .update(userCouponRedemptions)
    .set({
      isActive: false,
    })
    .where(eq(userCouponRedemptions.id, activeRedemption.id))

  // Revalidate paths to update UI
  revalidatePath("/learn")
  revalidatePath("/subscription")
  revalidatePath("/pro")

  return {
    success: true,
    message: "Coupon trial cancelled successfully. You're back to free tier.",
  }
}

/**
 * Admin Action: Get all coupon redemptions
 */
export const getAllCouponRedemptions = async () => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!(await isAdmin())) {
    throw new Error("Admin access required")
  }

  const redemptions = await db.query.userCouponRedemptions.findMany({
    with: {
      coupon: true,
      user: {
        columns: {
          userId: true,
          userName: true,
          userImageSrc: true,
        },
      },
    },
    orderBy: (userCouponRedemptions, { desc }) => [desc(userCouponRedemptions.redeemedAt)],
  })

  return redemptions
}
