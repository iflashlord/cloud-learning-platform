/**
 * Seed data for the Gamification System
 * Run this to populate the database with initial achievements, shop items, and daily quests
 */

import db from "@/db/drizzle"
import { achievements, shopItems, dailyQuests } from "@/db/schema"

// Achievement Seed Data
const achievementSeedData = [
  // Learning Achievements
  {
    key: "first_lesson",
    title: "First Steps",
    description: "Complete your very first lesson",
    category: "learning" as const,
    badgeColor: "bronze",
    xpReward: 25,
    gemsReward: 5,
    isSecret: false,
    sortOrder: 1,
  },
  {
    key: "10_lessons",
    title: "Getting Started",
    description: "Complete 10 lessons",
    category: "learning" as const,
    badgeColor: "bronze",
    xpReward: 50,
    gemsReward: 10,
    isSecret: false,
    sortOrder: 2,
  },
  {
    key: "50_lessons",
    title: "Dedicated Learner",
    description: "Complete 50 lessons",
    category: "learning" as const,
    badgeColor: "silver",
    xpReward: 100,
    gemsReward: 20,
    isSecret: false,
    sortOrder: 3,
  },
  {
    key: "100_lessons",
    title: "Knowledge Seeker",
    description: "Complete 100 lessons",
    category: "learning" as const,
    badgeColor: "gold",
    xpReward: 200,
    gemsReward: 50,
    isSecret: false,
    sortOrder: 4,
  },

  // Streak Achievements
  {
    key: "first_streak",
    title: "Consistency",
    description: "Maintain a 3-day learning streak",
    category: "streak" as const,
    badgeColor: "bronze",
    xpReward: 30,
    gemsReward: 8,
    isSecret: false,
    sortOrder: 10,
  },
  {
    key: "week_streak",
    title: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    category: "streak" as const,
    badgeColor: "silver",
    xpReward: 75,
    gemsReward: 15,
    isSecret: false,
    sortOrder: 11,
  },
  {
    key: "month_streak",
    title: "Unstoppable",
    description: "Maintain a 30-day learning streak",
    category: "streak" as const,
    badgeColor: "gold",
    xpReward: 300,
    gemsReward: 100,
    isSecret: false,
    sortOrder: 12,
  },

  // XP Milestones
  {
    key: "1000_xp",
    title: "XP Collector",
    description: "Earn 1,000 total XP",
    category: "mastery" as const,
    badgeColor: "bronze",
    xpReward: 50,
    gemsReward: 10,
    isSecret: false,
    sortOrder: 20,
  },
  {
    key: "5000_xp",
    title: "XP Master",
    description: "Earn 5,000 total XP",
    category: "mastery" as const,
    badgeColor: "silver",
    xpReward: 100,
    gemsReward: 25,
    isSecret: false,
    sortOrder: 21,
  },
  {
    key: "10000_xp",
    title: "XP Legend",
    description: "Earn 10,000 total XP",
    category: "mastery" as const,
    badgeColor: "gold",
    xpReward: 250,
    gemsReward: 75,
    isSecret: false,
    sortOrder: 22,
  },

  // Perfect Lesson Achievements
  {
    key: "perfect_10",
    title: "Perfectionist",
    description: "Complete 10 lessons without any mistakes",
    category: "mastery" as const,
    badgeColor: "silver",
    xpReward: 75,
    gemsReward: 20,
    isSecret: false,
    sortOrder: 30,
  },
  {
    key: "perfect_50",
    title: "Flawless",
    description: "Complete 50 lessons without any mistakes",
    category: "mastery" as const,
    badgeColor: "gold",
    xpReward: 200,
    gemsReward: 60,
    isSecret: false,
    sortOrder: 31,
  },

  // Social Achievements
  {
    key: "top_10",
    title: "Rising Star",
    description: "Reach the top 10 on the leaderboard",
    category: "social" as const,
    badgeColor: "silver",
    xpReward: 100,
    gemsReward: 30,
    isSecret: false,
    sortOrder: 40,
  },
  {
    key: "top_3",
    title: "Champion",
    description: "Reach the top 3 on the leaderboard",
    category: "social" as const,
    badgeColor: "gold",
    xpReward: 200,
    gemsReward: 75,
    isSecret: false,
    sortOrder: 41,
  },
  {
    key: "number_1",
    title: "Leaderboard King",
    description: "Reach #1 on the leaderboard",
    category: "social" as const,
    badgeColor: "platinum",
    xpReward: 500,
    gemsReward: 150,
    isSecret: false,
    sortOrder: 42,
  },

  // Secret Achievements
  {
    key: "midnight_learner",
    title: "Night Owl",
    description: "Complete a lesson between midnight and 6 AM",
    category: "collection" as const,
    badgeColor: "diamond",
    xpReward: 50,
    gemsReward: 15,
    isSecret: true,
    sortOrder: 100,
  },
  {
    key: "speed_demon",
    title: "Speed Demon",
    description: "Complete a lesson in under 30 seconds",
    category: "collection" as const,
    badgeColor: "diamond",
    xpReward: 75,
    gemsReward: 25,
    isSecret: true,
    sortOrder: 101,
  },
]

// Shop Items Seed Data
const shopItemSeedData = [
  {
    key: "hearts_refill",
    type: "hearts_refill" as const,
    title: "Refill Hearts",
    description: "Instantly restore all hearts to full",
    gemCost: 5,
    xpCost: 10,
    isActive: true,
    isLimited: false,
    sortOrder: 1,
  },
  {
    key: "streak_freeze",
    type: "streak_freeze" as const,
    title: "Streak Freeze",
    description: "Protect your streak for one day if you miss a lesson",
    gemCost: 15,
    xpCost: 0,
    isActive: true,
    isLimited: false,
    sortOrder: 2,
  },
  {
    key: "double_xp_2h",
    type: "double_xp" as const,
    title: "2-Hour XP Boost",
    description: "Earn double XP for all activities for 2 hours",
    gemCost: 20,
    xpCost: 0,
    isActive: true,
    isLimited: true,
    sortOrder: 3,
  },
  {
    key: "double_xp_24h",
    type: "double_xp" as const,
    title: "24-Hour XP Boost",
    description: "Earn double XP for all activities for a full day",
    gemCost: 75,
    xpCost: 0,
    isActive: true,
    isLimited: true,
    sortOrder: 4,
  },
  {
    key: "gem_pack_small",
    type: "gem_pack" as const,
    title: "Small Gem Pack",
    description: "Get 50 gems instantly",
    gemCost: 0,
    xpCost: 100,
    isActive: true,
    isLimited: false,
    sortOrder: 10,
  },
  {
    key: "gem_pack_medium",
    type: "gem_pack" as const,
    title: "Medium Gem Pack",
    description: "Get 125 gems instantly (25% bonus)",
    gemCost: 0,
    xpCost: 200,
    isActive: true,
    isLimited: false,
    sortOrder: 11,
  },
  {
    key: "gem_pack_large",
    type: "gem_pack" as const,
    title: "Large Gem Pack",
    description: "Get 275 gems instantly (37% bonus)",
    gemCost: 0,
    xpCost: 400,
    isActive: true,
    isLimited: false,
    sortOrder: 12,
  },
]

// Daily Quest Templates (these would be generated daily)
const questTemplates = [
  {
    type: "complete_lessons" as const,
    title: "Daily Learner",
    description: "Complete 3 lessons today",
    targetValue: 3,
    xpReward: 30,
    gemsReward: 5,
    heartsReward: 0,
    isActive: true,
  },
  {
    type: "earn_xp" as const,
    title: "XP Hunter",
    description: "Earn 50 XP today",
    targetValue: 50,
    xpReward: 25,
    gemsReward: 3,
    heartsReward: 0,
    isActive: true,
  },
  {
    type: "perfect_lesson" as const,
    title: "Perfectionist",
    description: "Complete a lesson without any mistakes",
    targetValue: 1,
    xpReward: 40,
    gemsReward: 8,
    heartsReward: 0,
    isActive: true,
  },
  {
    type: "streak" as const,
    title: "Consistency King",
    description: "Maintain your daily streak",
    targetValue: 1,
    xpReward: 20,
    gemsReward: 5,
    heartsReward: 1,
    isActive: true,
  },
  {
    type: "practice_old" as const,
    title: "Review Master",
    description: "Practice 2 previously completed lessons",
    targetValue: 2,
    xpReward: 25,
    gemsReward: 4,
    heartsReward: 0,
    isActive: true,
  },
  {
    type: "no_hearts_lost" as const,
    title: "Careful Learner",
    description: "Don't lose any hearts today",
    targetValue: 1,
    xpReward: 35,
    gemsReward: 7,
    heartsReward: 2,
    isActive: true,
  },
]

/**
 * Seed the achievements table
 */
export const seedAchievements = async () => {
  try {
    console.log("Seeding achievements...")

    // Clear existing achievements (optional - remove in production)
    // await db.delete(achievements)

    // Insert new achievements
    await db.insert(achievements).values(achievementSeedData)

    console.log(`✅ Seeded ${achievementSeedData.length} achievements`)
  } catch (error) {
    console.error("❌ Error seeding achievements:", error)
    throw error
  }
}

/**
 * Seed the shop items table
 */
export const seedShopItems = async () => {
  try {
    console.log("Seeding shop items...")

    // Clear existing shop items (optional - remove in production)
    // await db.delete(shopItems)

    // Insert new shop items
    await db.insert(shopItems).values(shopItemSeedData)

    console.log(`✅ Seeded ${shopItemSeedData.length} shop items`)
  } catch (error) {
    console.error("❌ Error seeding shop items:", error)
    throw error
  }
}

/**
 * Generate daily quests for today
 * This should be run daily via a cron job
 */
export const generateDailyQuests = async () => {
  try {
    console.log("Generating daily quests...")

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Select 3-4 random quests for today
    const selectedQuests = questTemplates
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 2) + 3) // 3-4 quests
      .map((template) => ({
        ...template,
        date: today,
      }))

    await db.insert(dailyQuests).values(selectedQuests)

    console.log(`✅ Generated ${selectedQuests.length} daily quests`)
  } catch (error) {
    console.error("❌ Error generating daily quests:", error)
    throw error
  }
}

/**
 * Seed all gamification data
 */
export const seedGamificationData = async () => {
  try {
    console.log("🎮 Starting gamification data seeding...")

    await seedAchievements()
    await seedShopItems()
    await generateDailyQuests()

    console.log("🎉 Gamification data seeding completed!")
  } catch (error) {
    console.error("💥 Gamification data seeding failed:", error)
    throw error
  }
}

// Export individual seed functions and data for flexibility
export { achievementSeedData, shopItemSeedData, questTemplates }
