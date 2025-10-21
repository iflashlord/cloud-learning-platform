"use server"

import { auth } from "@clerk/nextjs/server"
import { and, eq, desc, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import db from "@/db/drizzle"
import { GAMIFICATION } from "@/constants"
import { getUserProgress, getUserSubscription } from "@/db/queries"
import {
  userProgress,
  xpTransactions,
  gemTransactions,
  userQuestProgress,
  dailyQuests,
  monthlyQuests,
  userMonthlyQuestProgress,
  userAchievements,
  achievements,
  shopItems,
  userPurchases,
  leaderboards,
  lessonCompletions,
  challenges,
} from "@/db/schema"

// XP System Actions
export const awardXP = async (
  amount: number,
  source: string,
  sourceId?: string,
  description?: string,
) => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentUserProgress = await getUserProgress()
  const userSubscription = await getUserSubscription()

  if (!currentUserProgress) throw new Error("User progress not found")

  // Apply Pro bonus if applicable
  let finalAmount = amount
  if (userSubscription?.isActive && (source.includes("lesson") || source.includes("practice"))) {
    finalAmount = Math.floor(amount * 1.5) // 50% bonus for Pro users
  }

  // Apply streak bonus
  if (currentUserProgress.streak > 0 && source.includes("lesson")) {
    const streakMultiplier = Math.min(
      1 + currentUserProgress.streak * 0.1,
      1 + GAMIFICATION.MAX_STREAK_BONUS_DAYS * 0.1,
    )
    finalAmount = Math.floor(finalAmount * streakMultiplier)
  }

  // Update user progress
  await db.transaction(async (tx) => {
    await tx
      .update(userProgress)
      .set({
        points: currentUserProgress.points + finalAmount,
        totalXpEarned: currentUserProgress.totalXpEarned + finalAmount,
      })
      .where(eq(userProgress.userId, userId))

    // Log transaction
    await tx.insert(xpTransactions).values({
      userId,
      type: "earned",
      amount: finalAmount,
      source,
      sourceId,
      description: description || `Earned ${finalAmount} XP from ${source}`,
    })
  })

  return { xpEarned: finalAmount, newTotal: currentUserProgress.points + finalAmount }
}

export const spendXP = async (
  amount: number,
  source: string,
  sourceId?: string,
  description?: string,
) => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentUserProgress = await getUserProgress()
  if (!currentUserProgress) throw new Error("User progress not found")

  if (currentUserProgress.points < amount) {
    throw new Error("Insufficient XP")
  }

  await db.transaction(async (tx) => {
    await tx
      .update(userProgress)
      .set({
        points: currentUserProgress.points - amount,
      })
      .where(eq(userProgress.userId, userId))

    await tx.insert(xpTransactions).values({
      userId,
      type: "spent",
      amount: -amount,
      source,
      sourceId,
      description: description || `Spent ${amount} XP on ${source}`,
    })
  })

  return { xpSpent: amount, newTotal: currentUserProgress.points - amount }
}

// Gems System Actions
export const awardGems = async (
  amount: number,
  source: string,
  sourceId?: string,
  description?: string,
) => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentUserProgress = await getUserProgress()
  if (!currentUserProgress) throw new Error("User progress not found")

  try {
    // Update user gems
    await db
      .update(userProgress)
      .set({
        gems: currentUserProgress.gems + amount,
      })
      .where(eq(userProgress.userId, userId))

    // Log the gem transaction
    await db.insert(gemTransactions).values({
      userId,
      type: "earned",
      amount,
      source,
      sourceId,
      description: description || `Earned ${amount} gems from ${source}`,
    })

    return { gemsEarned: amount, newTotal: currentUserProgress.gems + amount }
  } catch (error) {
    console.error("Failed to award gems:", error)
    throw new Error(
      `Failed to award gems: ${error instanceof Error ? error.message : "Unknown error"}`,
    )
  }
}

export const spendGems = async (
  amount: number,
  source: string,
  sourceId?: string,
  description?: string,
) => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentUserProgress = await getUserProgress()
  if (!currentUserProgress) throw new Error("User progress not found")

  if (currentUserProgress.gems < amount) {
    throw new Error("Insufficient gems")
  }

  // Update user gems
  await db
    .update(userProgress)
    .set({
      gems: currentUserProgress.gems - amount,
    })
    .where(eq(userProgress.userId, userId))

  // Log the gem transaction
  await db.insert(gemTransactions).values({
    userId,
    type: "spent",
    amount: -amount,
    source,
    sourceId,
    description: description || `Spent ${amount} gems on ${source}`,
  })

  return { gemsSpent: amount, newTotal: currentUserProgress.gems - amount }
}

// Hearts System Actions
export const refillHeartsWithGems = async () => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentUserProgress = await getUserProgress()
  const userSubscription = await getUserSubscription()

  if (!currentUserProgress) throw new Error("User progress not found")

  // Pro users have unlimited hearts
  if (userSubscription?.isActive) {
    throw new Error("Pro users have unlimited hearts")
  }

  if (currentUserProgress.hearts === GAMIFICATION.MAX_HEARTS) {
    throw new Error("Hearts are already full")
  }

  if (currentUserProgress.gems < GAMIFICATION.HEARTS_REFILL_COST_GEMS) {
    throw new Error("Insufficient gems")
  }

  // Update user progress (hearts and gems)
  await db
    .update(userProgress)
    .set({
      hearts: GAMIFICATION.MAX_HEARTS,
      gems: currentUserProgress.gems - GAMIFICATION.HEARTS_REFILL_COST_GEMS,
      heartsRefillAt: null, // Reset refill timer
    })
    .where(eq(userProgress.userId, userId))

  // Log the gem transaction
  await db.insert(gemTransactions).values({
    userId,
    type: "spent",
    amount: -GAMIFICATION.HEARTS_REFILL_COST_GEMS,
    source: "hearts_refill",
    description: `Refilled hearts for ${GAMIFICATION.HEARTS_REFILL_COST_GEMS} gems`,
  })

  revalidatePath("/shop")
  revalidatePath("/learn")
  return { success: true }
}

// Streak System Actions
export const updateStreak = async (isLessonCompleted: boolean = true) => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentUserProgress = await getUserProgress()
  if (!currentUserProgress) throw new Error("User progress not found")

  const today = new Date()
  const lastActive = currentUserProgress.lastActiveDate
  const isToday = lastActive && lastActive.toDateString() === today.toDateString()

  if (isToday) {
    // Already active today, no streak update needed
    return { streak: currentUserProgress.streak }
  }

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const wasActiveYesterday = lastActive && lastActive.toDateString() === yesterday.toDateString()

  let newStreak = 1
  if (wasActiveYesterday && isLessonCompleted) {
    newStreak = currentUserProgress.streak + 1
  } else if (!isLessonCompleted) {
    newStreak = 0 // Streak broken
  }

  // Award streak bonus gems and XP
  if (newStreak > 0 && isLessonCompleted) {
    await awardGems(
      GAMIFICATION.GEMS_PER_STREAK_DAY,
      "daily_streak",
      undefined,
      `Daily streak bonus: Day ${newStreak}`,
    )

    if (newStreak >= 7) {
      await awardXP(
        GAMIFICATION.XP_STREAK_BONUS,
        "streak_bonus",
        undefined,
        `Weekly streak bonus: ${newStreak} days`,
      )
    }
  }

  await db
    .update(userProgress)
    .set({
      streak: newStreak,
      lastActiveDate: today,
    })
    .where(eq(userProgress.userId, userId))

  return { streak: newStreak }
}

// Quest System Actions
export const updateQuestProgress = async (questType: string, incrementBy: number = 1) => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Find active quests of this type for today
  const activeQuests = await db.query.dailyQuests.findMany({
    where: and(
      eq(dailyQuests.type, questType as any),
      eq(dailyQuests.isActive, true),
      sql`DATE(${dailyQuests.date}) = DATE(${today})`,
    ),
  })

  for (const quest of activeQuests) {
    // Check existing progress
    const existingProgress = await db.query.userQuestProgress.findFirst({
      where: and(eq(userQuestProgress.userId, userId), eq(userQuestProgress.questId, quest.id)),
    })

    if (existingProgress && existingProgress.completed) {
      continue // Quest already completed
    }

    const currentValue = existingProgress?.currentValue || 0
    const newValue = currentValue + incrementBy
    const isCompleted = newValue >= quest.targetValue

    if (existingProgress) {
      await db
        .update(userQuestProgress)
        .set({
          currentValue: newValue,
          completed: isCompleted,
          completedAt: isCompleted ? new Date() : null,
        })
        .where(eq(userQuestProgress.id, existingProgress.id))
    } else {
      await db.insert(userQuestProgress).values({
        userId,
        questId: quest.id,
        currentValue: newValue,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : null,
      })
    }

    // If quest completed, award rewards
    if (isCompleted && !existingProgress?.completed) {
      if (quest.xpReward > 0) {
        await awardXP(quest.xpReward, "quest_reward", quest.id.toString())
      }
      if (quest.gemsReward > 0) {
        await awardGems(quest.gemsReward, "quest_reward", quest.id.toString())
      }
    }
  }
}

// Monthly Quest System Actions
export const updateMonthlyQuestProgress = async (questType: string, incrementBy: number = 1) => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentDate = new Date()
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
    2,
    "0",
  )}`
  const currentYear = currentDate.getFullYear()

  // Find active monthly quests of this type for current month
  const activeMonthlyQuests = await db.query.monthlyQuests.findMany({
    where: and(
      eq(monthlyQuests.type, questType as any),
      eq(monthlyQuests.isActive, true),
      eq(monthlyQuests.month, currentMonth),
      eq(monthlyQuests.year, currentYear),
    ),
  })

  for (const quest of activeMonthlyQuests) {
    // Check existing progress
    const existingProgress = await db.query.userMonthlyQuestProgress.findFirst({
      where: and(
        eq(userMonthlyQuestProgress.userId, userId),
        eq(userMonthlyQuestProgress.questId, quest.id),
      ),
    })

    if (existingProgress && existingProgress.completed) {
      continue // Quest already completed
    }

    const currentValue = existingProgress?.currentValue || 0
    const newValue = currentValue + incrementBy
    const isCompleted = newValue >= quest.targetValue

    if (existingProgress) {
      await db
        .update(userMonthlyQuestProgress)
        .set({
          currentValue: newValue,
          completed: isCompleted,
          completedAt: isCompleted ? new Date() : null,
        })
        .where(eq(userMonthlyQuestProgress.id, existingProgress.id))
    } else {
      await db.insert(userMonthlyQuestProgress).values({
        userId,
        questId: quest.id,
        currentValue: newValue,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : null,
      })
    }

    // If quest completed, award rewards
    if (isCompleted && !existingProgress?.completed) {
      if (quest.xpReward > 0) {
        await awardXP(quest.xpReward, "monthly_quest_reward", quest.id.toString())
      }
      if (quest.gemsReward > 0) {
        await awardGems(quest.gemsReward, "monthly_quest_reward", quest.id.toString())
      }
    }
  }
}

export const createMonthlyQuest = async () => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentDate = new Date()
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
    2,
    "0",
  )}`
  const currentYear = currentDate.getFullYear()

  // Check if monthly quest already exists for this month
  const existingQuest = await db.query.monthlyQuests.findFirst({
    where: and(
      eq(monthlyQuests.type, "complete_monthly_lessons"),
      eq(monthlyQuests.month, currentMonth),
      eq(monthlyQuests.year, currentYear),
      eq(monthlyQuests.isActive, true),
    ),
  })

  if (existingQuest) {
    return existingQuest
  }

  // Create new monthly quest
  const monthName = new Date(currentYear, currentDate.getMonth()).toLocaleString("default", {
    month: "long",
  })
  const newQuest = await db
    .insert(monthlyQuests)
    .values({
      type: "complete_monthly_lessons",
      title: `${monthName} Learning Champion`,
      description: "Complete 15 lessons or practice sessions this month",
      targetValue: 15,
      xpReward: 500,
      gemsReward: 50,
      heartsReward: 0,
      month: currentMonth,
      year: currentYear,
      isActive: true,
    })
    .returning()

  return newQuest[0]
}

export const getMonthlyQuestProgress = async () => {
  const { userId } = await auth()
  if (!userId) return null

  const currentDate = new Date()
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
    2,
    "0",
  )}`
  const currentYear = currentDate.getFullYear()

  // Get current month's quest
  const monthlyQuest = await db.query.monthlyQuests.findFirst({
    where: and(
      eq(monthlyQuests.type, "complete_monthly_lessons"),
      eq(monthlyQuests.month, currentMonth),
      eq(monthlyQuests.year, currentYear),
      eq(monthlyQuests.isActive, true),
    ),
  })

  if (!monthlyQuest) return null

  // Get user's progress
  const progress = await db.query.userMonthlyQuestProgress.findFirst({
    where: and(
      eq(userMonthlyQuestProgress.userId, userId),
      eq(userMonthlyQuestProgress.questId, monthlyQuest.id),
    ),
  })

  return {
    quest: monthlyQuest,
    progress: progress || {
      currentValue: 0,
      completed: false,
      completedAt: null,
      rewardClaimed: false,
    },
  }
}

// Admin function to fake complete monthly quest for testing
export const adminFakeCompleteMonthlyQuest = async () => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  // For demo purposes, you might want to add role checking here
  // const isAdmin = await checkAdminRole(userId)
  // if (!isAdmin) throw new Error("Admin access required")

  const currentDate = new Date()
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
    2,
    "0",
  )}`
  const currentYear = currentDate.getFullYear()

  // Ensure monthly quest exists
  await createMonthlyQuest()

  // Update quest progress to completion for testing
  await updateMonthlyQuestProgress("complete_monthly_lessons", 15)

  return { success: true, message: "Monthly quest completed for testing!" }
}

// Shop System Actions
export const purchaseShopItem = async (shopItemKey: string) => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const shopItem = await db.query.shopItems.findFirst({
    where: and(eq(shopItems.key, shopItemKey), eq(shopItems.isActive, true)),
  })

  if (!shopItem) throw new Error("Shop item not found")

  const currentUserProgress = await getUserProgress()
  if (!currentUserProgress) throw new Error("User progress not found")

  // Check if user can afford the item
  if (shopItem.gemCost > 0 && currentUserProgress.gems < shopItem.gemCost) {
    throw new Error("Insufficient gems")
  }
  if (shopItem.xpCost > 0 && currentUserProgress.points < shopItem.xpCost) {
    throw new Error("Insufficient XP")
  }

  await db.transaction(async (tx) => {
    // Deduct costs
    const updates: any = {}
    if (shopItem.gemCost > 0) {
      updates.gems = currentUserProgress.gems - shopItem.gemCost
    }
    if (shopItem.xpCost > 0) {
      updates.points = currentUserProgress.points - shopItem.xpCost
    }

    // Apply item effects
    switch (shopItem.type) {
      case "hearts_refill":
        updates.hearts = GAMIFICATION.MAX_HEARTS
        updates.heartsRefillAt = null
        break
      // Add other item types as needed
    }

    await tx.update(userProgress).set(updates).where(eq(userProgress.userId, userId))

    // Record purchase
    await tx.insert(userPurchases).values({
      userId,
      shopItemId: shopItem.id,
      gemCost: shopItem.gemCost,
      xpCost: shopItem.xpCost,
    })

    // Log transactions
    if (shopItem.gemCost > 0) {
      await tx.insert(gemTransactions).values({
        userId,
        type: "spent",
        amount: -shopItem.gemCost,
        source: "shop_purchase",
        sourceId: shopItem.id.toString(),
        description: `Purchased ${shopItem.title}`,
      })
    }
    if (shopItem.xpCost > 0) {
      await tx.insert(xpTransactions).values({
        userId,
        type: "spent",
        amount: -shopItem.xpCost,
        source: "shop_purchase",
        sourceId: shopItem.id.toString(),
        description: `Purchased ${shopItem.title}`,
      })
    }
  })

  revalidatePath("/shop")
  revalidatePath("/learn")
  return { success: true }
}

// Achievement System Actions
export const checkAndUnlockAchievements = async (
  context: "lesson_complete" | "streak" | "xp_milestone" | "perfect_lesson" | "course_complete",
  value?: number,
) => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentUserProgress = await getUserProgress()
  if (!currentUserProgress) throw new Error("User progress not found")

  // Get user's existing achievements
  const userAchievementsList = await db.query.userAchievements.findMany({
    where: eq(userAchievements.userId, userId),
  })

  const unlockedAchievementIds = new Set(userAchievementsList.map((ua) => ua.achievementId))

  // Define achievement unlock conditions
  const achievementChecks: { [key: string]: boolean } = {
    first_lesson: context === "lesson_complete" && currentUserProgress.lessonsCompleted === 1,
    "10_lessons": context === "lesson_complete" && currentUserProgress.lessonsCompleted === 10,
    "50_lessons": context === "lesson_complete" && currentUserProgress.lessonsCompleted === 50,
    "100_lessons": context === "lesson_complete" && currentUserProgress.lessonsCompleted === 100,
    first_streak: context === "streak" && value === 3,
    week_streak: context === "streak" && value === 7,
    month_streak: context === "streak" && value === 30,
    "1000_xp": context === "xp_milestone" && currentUserProgress.totalXpEarned >= 1000,
    "5000_xp": context === "xp_milestone" && currentUserProgress.totalXpEarned >= 5000,
    "10000_xp": context === "xp_milestone" && currentUserProgress.totalXpEarned >= 10000,
    perfect_10: context === "perfect_lesson" && currentUserProgress.perfectLessons >= 10,
    perfect_50: context === "perfect_lesson" && currentUserProgress.perfectLessons >= 50,
  }

  const newlyUnlockedAchievements = []

  // Get all achievements
  const allAchievements = await db.query.achievements.findMany()

  for (const achievement of allAchievements) {
    if (unlockedAchievementIds.has(achievement.id)) continue

    if (achievementChecks[achievement.key]) {
      // Unlock achievement
      await db.insert(userAchievements).values({
        userId,
        achievementId: achievement.id,
      })

      // Award rewards
      if (achievement.xpReward > 0) {
        await awardXP(
          achievement.xpReward,
          "achievement_unlock",
          achievement.id.toString(),
          `Achievement unlocked: ${achievement.title}`,
        )
      }
      if (achievement.gemsReward > 0) {
        await awardGems(
          achievement.gemsReward,
          "achievement_unlock",
          achievement.id.toString(),
          `Achievement unlocked: ${achievement.title}`,
        )
      }

      newlyUnlockedAchievements.push(achievement)
    }
  }

  return { newAchievements: newlyUnlockedAchievements }
}

// Helper function to process lesson completion with all gamification rewards
export const processLessonCompletion = async (
  lessonId: number,
  wasFirstAttempt: boolean,
  wasPerfect: boolean,
) => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentUserProgress = await getUserProgress()
  if (!currentUserProgress) throw new Error("User progress not found")

  const rewards = {
    xp: 0,
    gems: 0,
    newStreak: 0,
    achievements: [] as any[],
  }

  // Base XP reward
  let xpAmount = GAMIFICATION.XP_PER_LESSON
  if (wasPerfect) {
    xpAmount += GAMIFICATION.XP_PERFECT_LESSON_BONUS
  }

  const xpResult = await awardXP(xpAmount, "lesson_complete", lessonId.toString())
  rewards.xp = xpResult.xpEarned

  // Gems for first-time completion
  if (wasFirstAttempt) {
    let gemsAmount = GAMIFICATION.GEMS_PER_LESSON_FIRST_TIME
    if (wasPerfect) {
      gemsAmount += GAMIFICATION.GEMS_PER_PERFECT_LESSON
    }
    const gemsResult = await awardGems(gemsAmount, "lesson_complete", lessonId.toString())
    rewards.gems = gemsResult.gemsEarned
  }

  // Get lesson challenge count for completion record
  const lessonChallenges = await db.query.challenges.findMany({
    where: eq(challenges.lessonId, lessonId),
  })
  const totalChallenges = lessonChallenges.length
  const correctAnswers = wasPerfect ? totalChallenges : Math.floor(totalChallenges * 0.85)

  // Create lesson completion record for review system
  // Note: We allow multiple completions for the same lesson (practice)
  await db.insert(lessonCompletions).values({
    userId,
    lessonId,
    score: wasPerfect ? 100 : 85, // Perfect score or good score
    totalChallenges,
    correctAnswers,
    completedAt: new Date(),
    timeSpent: 0, // TODO: Track actual time spent
    wasPerfect,
    attemptsCount: wasFirstAttempt ? 1 : 2, // Differentiate first vs repeat attempts
  })

  // Update progress counters
  const updates: any = {
    lessonsCompleted: currentUserProgress.lessonsCompleted + 1,
  }
  if (wasPerfect) {
    updates.perfectLessons = currentUserProgress.perfectLessons + 1
  }

  await db.update(userProgress).set(updates).where(eq(userProgress.userId, userId))

  // Update streak
  const streakResult = await updateStreak(true)
  rewards.newStreak = streakResult.streak

  // Update quest progress
  await updateQuestProgress("complete_lessons", 1)
  await updateQuestProgress("earn_xp", rewards.xp)
  if (wasPerfect) {
    await updateQuestProgress("perfect_lesson", 1)
  }

  // Update monthly quest progress
  await updateMonthlyQuestProgress("complete_monthly_lessons", 1)

  // Check achievements
  const achievementResult = await checkAndUnlockAchievements("lesson_complete")
  if (wasPerfect) {
    const perfectAchievementResult = await checkAndUnlockAchievements("perfect_lesson")
    achievementResult.newAchievements.push(...perfectAchievementResult.newAchievements)
  }
  if (rewards.xp > 0) {
    const xpAchievementResult = await checkAndUnlockAchievements("xp_milestone")
    achievementResult.newAchievements.push(...xpAchievementResult.newAchievements)
  }
  if (rewards.newStreak > 0) {
    const streakAchievementResult = await checkAndUnlockAchievements("streak", rewards.newStreak)
    achievementResult.newAchievements.push(...streakAchievementResult.newAchievements)
  }

  rewards.achievements = achievementResult.newAchievements

  revalidatePath("/learn")
  revalidatePath("/lesson")
  revalidatePath("/quests")
  revalidatePath("/leaderboard")
  revalidatePath("/review")

  return rewards
}

// Watch Ad Action - Awards gems for watching advertisements
export const watchAdForGems = async () => {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    console.log(`[watchAdForGems] Starting gem award for user: ${userId}`)

    const result = await awardGems(
      GAMIFICATION.GEMS_FROM_AD_WATCH,
      "advertisement",
      undefined,
      "Watched advertisement for gems",
    )

    console.log(`[watchAdForGems] Successfully awarded gems:`, result)

    // Update quest progress for watching ads (if such quest exists)
    try {
      await updateQuestProgress("watch_ads", 1)
      console.log(`[watchAdForGems] Quest progress updated successfully`)
    } catch (error) {
      console.warn("Failed to update quest progress for watch_ads:", error)
      // Don't fail the entire operation if quest update fails
    }

    revalidatePath("/shop")
    revalidatePath("/learn")

    return result
  } catch (error) {
    console.error("[watchAdForGems] Failed to award gems:", error)
    throw error
  }
}

// Refill Hearts with Gems - Integrated action
export const buyHeartsWithGems = async () => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const currentUserProgress = await getUserProgress()
  const userSubscription = await getUserSubscription()

  if (!currentUserProgress) throw new Error("User progress not found")

  // Pro users have unlimited hearts
  if (userSubscription?.isActive) {
    throw new Error("Pro users have unlimited hearts")
  }

  if (currentUserProgress.hearts >= GAMIFICATION.MAX_HEARTS) {
    throw new Error("Hearts are already full")
  }

  if (currentUserProgress.gems < GAMIFICATION.HEARTS_REFILL_COST_GEMS) {
    throw new Error("Insufficient gems")
  }

  await db.transaction(async (tx) => {
    // Spend gems
    await tx
      .update(userProgress)
      .set({
        gems: currentUserProgress.gems - GAMIFICATION.HEARTS_REFILL_COST_GEMS,
        hearts: GAMIFICATION.MAX_HEARTS,
        heartsRefillAt: null, // Reset the refill timer since hearts are full
      })
      .where(eq(userProgress.userId, userId))

    // Record gem transaction
    await tx.insert(gemTransactions).values({
      userId,
      type: "spent",
      amount: -GAMIFICATION.HEARTS_REFILL_COST_GEMS,
      source: "hearts_refill",
      description: `Spent ${GAMIFICATION.HEARTS_REFILL_COST_GEMS} gems to refill hearts`,
    })
  })

  revalidatePath("/shop")
  revalidatePath("/learn")
  revalidatePath("/lesson")

  return {
    gemsSpent: GAMIFICATION.HEARTS_REFILL_COST_GEMS,
    newGems: currentUserProgress.gems - GAMIFICATION.HEARTS_REFILL_COST_GEMS,
    newHearts: GAMIFICATION.MAX_HEARTS,
  }
}

// Pro User Daily Bonus - Awards daily gems to Pro users
export const claimProDailyBonus = async () => {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const userSubscription = await getUserSubscription()
  if (!userSubscription?.isActive) {
    throw new Error("Pro subscription required")
  }

  const currentUserProgress = await getUserProgress()
  if (!currentUserProgress) throw new Error("User progress not found")

  // Check if user already claimed today's bonus
  const today = new Date().toDateString()
  const lastClaimDate = currentUserProgress.lastActiveDate?.toDateString()

  if (lastClaimDate === today && currentUserProgress.gems >= GAMIFICATION.GEMS_PRO_DAILY_BONUS) {
    // Check if they've already received today's bonus by looking at gem transactions
    const todayTransactions = await db.query.gemTransactions.findMany({
      where: and(
        eq(gemTransactions.userId, userId),
        eq(gemTransactions.source, "pro_daily_bonus"),
        sql`DATE(${gemTransactions.createdAt}) = CURRENT_DATE`,
      ),
      limit: 1,
    })

    if (todayTransactions.length > 0) {
      throw new Error("Daily Pro bonus already claimed today")
    }
  }

  const result = await awardGems(
    GAMIFICATION.GEMS_PRO_DAILY_BONUS,
    "pro_daily_bonus",
    undefined,
    "Pro user daily gem bonus",
  )

  // Update last active date
  await db
    .update(userProgress)
    .set({
      lastActiveDate: new Date(),
    })
    .where(eq(userProgress.userId, userId))

  revalidatePath("/shop")
  revalidatePath("/learn")

  return result
}
