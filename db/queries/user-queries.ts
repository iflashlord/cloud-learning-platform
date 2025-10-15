/**
 * User Queries Module
 * 
 * Database queries related to user data, progress, subscriptions, and leaderboards.
 * Handles user authentication and authorization checks.
 */

import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import db from "@/db/drizzle";
import { 
  userProgress,
  userSubscription
} from "@/db/schema";

// Constants
const DAY_IN_MS = 86_400_000;

/**
 * Get the current user's progress including active course info
 */
export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
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
  });

  return data;
});

/**
 * Get the current user's subscription status
 */
export const getUserSubscription = cache(async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });

  if (!data) return null;

  const isActive = 
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});

/**
 * Get top 10 users by points (global leaderboard)
 */
export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return [];
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
  });

  return data;
});

/**
 * Get top 10 users by points for a specific course
 */
export const getTopTenUsersByCourse = cache(async (courseId: number) => {
  const { userId } = await auth();

  if (!userId) {
    return [];
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
  });

  return data;
});