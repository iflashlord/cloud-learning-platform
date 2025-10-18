import { relations } from "drizzle-orm"
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core"

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
  category: text("category").notNull().default("General"),
  description: text("description"),
  level: text("level").default("Beginner"), // Beginner, Intermediate, Advanced
  duration: text("duration"), // e.g., "2-3 hours"
  themeConfig: jsonb("theme_config").$type<{
    themeName: string
    colors: {
      primary: Record<string, string>
      success: Record<string, string>
      error: Record<string, string>
      info: Record<string, string>
      neutral: Record<string, string>
    }
  }>(),
})

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}))

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Unit 1
  description: text("description").notNull(), // Learn the basics of spanish
  courseId: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
})

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}))

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
})

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}))

export const challengesEnum = pgEnum("type", [
  "SELECT", // Multiple choice question
  "ASSIST", // Fill in the blank/matching
  "TRUE_FALSE", // True/False question
  "DRAG_DROP", // Drag and drop ordering
  "TEXT_INPUT", // Free text input
  "IMAGE_SELECT", // Select from images
  "LISTENING", // Audio-based question
  "SPEECH_INPUT", // Speech recognition input
  "VIDEO", // Video-based question
])

// Legacy chests system - preserved for existing data
export const chestTypeEnum = pgEnum("chest_type", ["BRONZE", "SILVER", "GOLD", "SPECIAL"])

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  hint: text("hint"), // Optional hint for users
  order: integer("order").notNull(),
  audioSrc: text("audio_src"), // For listening comprehension questions
  imageSrc: text("image_src"), // For image-based questions
  videoSrc: text("video_src"), // For video-based questions
  correctAnswer: text("correct_answer"), // For text input questions
  chestId: integer("chest_id").references(() => chests.id, { onDelete: "cascade" }),
})

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  chest: one(chests, {
    fields: [challenges.chestId],
    references: [chests.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}))

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
  guide: text("guide"), // Optional explanation why this answer is correct/incorrect
  order: integer("order").default(0), // For drag-drop ordering
  value: text("value"), // For text input expected answers
})

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeOptions.challengeId],
    references: [challenges.id],
  }),
}))

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  completed: boolean("completed").notNull().default(false),
})

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeProgress.challengeId],
    references: [challenges.id],
  }),
}))

// Legacy chests system - preserved for existing data
export const chests = pgTable("chests", {
  id: serial("id").primaryKey(),
  unitId: integer("unit_id")
    .notNull()
    .references(() => units.id, { onDelete: "cascade" }),
  type: chestTypeEnum("type").notNull(),
  position: integer("position").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  xpReward: integer("xp_reward").notNull().default(50),
  heartsReward: integer("hearts_reward").default(0),
  hasChallenge: boolean("has_challenge").notNull().default(false),
  imageSrc: text("image_src"),
  unlockedAt: integer("unlocked_at"),
})

export const chestsRelations = relations(chests, ({ one, many }) => ({
  unit: one(units, {
    fields: [chests.unitId],
    references: [units.id],
  }),
  chestProgress: many(chestProgress),
  challenges: many(challenges),
}))

export const chestProgress = pgTable("chest_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  chestId: integer("chest_id")
    .notNull()
    .references(() => chests.id, { onDelete: "cascade" }),
  opened: boolean("opened").notNull().default(false),
  completedAt: timestamp("completed_at"),
})

export const chestProgressRelations = relations(chestProgress, ({ one }) => ({
  chest: one(chests, {
    fields: [chestProgress.chestId],
    references: [chests.id],
  }),
}))

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0), // XP for progression and leaderboard
  gems: integer("gems").notNull().default(50), // Premium currency for purchases
  streak: integer("streak").notNull().default(0), // Daily lesson streak
  lastActiveDate: timestamp("last_active_date").defaultNow(),
  heartsRefillAt: timestamp("hearts_refill_at"), // When hearts will be full
  totalXpEarned: integer("total_xp_earned").notNull().default(0), // Lifetime XP tracking
  lessonsCompleted: integer("lessons_completed").notNull().default(0),
  perfectLessons: integer("perfect_lessons").notNull().default(0), // Lessons completed without mistakes
})

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}))

export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
})

export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  audioEnabled: boolean("audio_enabled").notNull().default(true),
  masterVolume: integer("master_volume").notNull().default(75), // 0-100
  soundEffectsVolume: integer("sound_effects_volume").notNull().default(75), // 0-100
  lessonsAudioVolume: integer("lessons_audio_volume").notNull().default(75), // 0-100
  autoPlayAudio: boolean("auto_play_audio").notNull().default(true),
  autoPlayVideo: boolean("auto_play_video").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  userProgress: one(userProgress, {
    fields: [userSettings.userId],
    references: [userProgress.userId],
  }),
}))

// Leaderboard System
export const leaderboardEnum = pgEnum("leaderboard_type", ["global", "course", "weekly", "monthly"])

export const leaderboards = pgTable("leaderboards", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }),
  type: leaderboardEnum("type").notNull(),
  xp: integer("xp").notNull().default(0),
  rank: integer("rank").notNull().default(0),
  period: text("period").notNull(), // "2024-W12" for weekly, "2024-03" for monthly, "all-time" for global
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const leaderboardsRelations = relations(leaderboards, ({ one }) => ({
  user: one(userProgress, {
    fields: [leaderboards.userId],
    references: [userProgress.userId],
  }),
  course: one(courses, {
    fields: [leaderboards.courseId],
    references: [courses.id],
  }),
}))

// Daily Quests/Challenges System
export const questsEnum = pgEnum("quest_type", [
  "complete_lessons", // Complete X lessons
  "earn_xp", // Earn X XP
  "perfect_lesson", // Complete a lesson without mistakes
  "streak", // Maintain X day streak
  "practice_old", // Practice previous lessons
  "no_hearts_lost", // Don't lose any hearts today
  "speed_lesson", // Complete lesson under time limit
  "complete_monthly_lessons", // Complete X lessons in a month
])

export const dailyQuests = pgTable("daily_quests", {
  id: serial("id").primaryKey(),
  type: questsEnum("type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  targetValue: integer("target_value").notNull(), // Target amount to complete
  xpReward: integer("xp_reward").notNull().default(0),
  gemsReward: integer("gems_reward").notNull().default(0),
  heartsReward: integer("hearts_reward").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  date: timestamp("date").defaultNow().notNull(), // Date this quest is for
})

export const dailyQuestsRelations = relations(dailyQuests, ({ many }) => ({
  userQuestProgress: many(userQuestProgress),
}))

export const userQuestProgress = pgTable("user_quest_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  questId: integer("quest_id")
    .references(() => dailyQuests.id, { onDelete: "cascade" })
    .notNull(),
  currentValue: integer("current_value").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  rewardClaimed: boolean("reward_claimed").notNull().default(false),
  claimedAt: timestamp("claimed_at"),
})

export const userQuestProgressRelations = relations(userQuestProgress, ({ one }) => ({
  quest: one(dailyQuests, {
    fields: [userQuestProgress.questId],
    references: [dailyQuests.id],
  }),
  user: one(userProgress, {
    fields: [userQuestProgress.userId],
    references: [userProgress.userId],
  }),
}))

// Monthly Quests System
export const monthlyQuests = pgTable("monthly_quests", {
  id: serial("id").primaryKey(),
  type: questsEnum("type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  targetValue: integer("target_value").notNull(), // Target amount to complete
  xpReward: integer("xp_reward").notNull().default(0),
  gemsReward: integer("gems_reward").notNull().default(0),
  heartsReward: integer("hearts_reward").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  month: text("month").notNull(), // Format: "2024-10" for October 2024
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const monthlyQuestsRelations = relations(monthlyQuests, ({ many }) => ({
  userMonthlyQuestProgress: many(userMonthlyQuestProgress),
}))

export const userMonthlyQuestProgress = pgTable("user_monthly_quest_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  questId: integer("quest_id")
    .references(() => monthlyQuests.id, { onDelete: "cascade" })
    .notNull(),
  currentValue: integer("current_value").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  rewardClaimed: boolean("reward_claimed").notNull().default(false),
  claimedAt: timestamp("claimed_at"),
})

export const userMonthlyQuestProgressRelations = relations(userMonthlyQuestProgress, ({ one }) => ({
  quest: one(monthlyQuests, {
    fields: [userMonthlyQuestProgress.questId],
    references: [monthlyQuests.id],
  }),
  user: one(userProgress, {
    fields: [userMonthlyQuestProgress.userId],
    references: [userProgress.userId],
  }),
}))

// Achievements/Badges System
export const achievementEnum = pgEnum("achievement_type", [
  "learning", // Learning-related achievements
  "social", // Social/leaderboard achievements
  "streak", // Streak-related achievements
  "mastery", // Skill mastery achievements
  "collection", // Collection/completion achievements
])

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(), // Unique identifier for achievement
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: achievementEnum("category").notNull(),
  iconSrc: text("icon_src"),
  badgeColor: text("badge_color").default("blue"), // Color theme for badge
  xpReward: integer("xp_reward").notNull().default(0),
  gemsReward: integer("gems_reward").notNull().default(0),
  isSecret: boolean("is_secret").notNull().default(false), // Hidden until unlocked
  sortOrder: integer("sort_order").notNull().default(0),
})

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}))

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  achievementId: integer("achievement_id")
    .references(() => achievements.id, { onDelete: "cascade" })
    .notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
  progress: integer("progress").notNull().default(100), // For progressive achievements
})

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
  user: one(userProgress, {
    fields: [userAchievements.userId],
    references: [userProgress.userId],
  }),
}))

// Shop Items System
export const shopItemEnum = pgEnum("shop_item_type", [
  "hearts_refill", // Refill hearts
  "streak_freeze", // Protect streak for one day
  "double_xp", // Double XP for limited time
  "gem_pack", // Gem bundles
  "cosmetic", // Cosmetic items (avatars, themes, etc.)
])

export const shopItems = pgTable("shop_items", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  type: shopItemEnum("type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconSrc: text("icon_src"),
  gemCost: integer("gem_cost").notNull().default(0),
  xpCost: integer("xp_cost").notNull().default(0), // Alternative cost
  isActive: boolean("is_active").notNull().default(true),
  isLimited: boolean("is_limited").notNull().default(false), // Limited time offer
  sortOrder: integer("sort_order").notNull().default(0),
})

export const shopItemsRelations = relations(shopItems, ({ many }) => ({
  userPurchases: many(userPurchases),
}))

export const userPurchases = pgTable("user_purchases", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  shopItemId: integer("shop_item_id")
    .references(() => shopItems.id, { onDelete: "cascade" })
    .notNull(),
  gemCost: integer("gem_cost").notNull().default(0),
  xpCost: integer("xp_cost").notNull().default(0),
  purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
  usedAt: timestamp("used_at"), // For consumable items
  isActive: boolean("is_active").notNull().default(true), // For items with duration
  expiresAt: timestamp("expires_at"), // For temporary items
})

export const userPurchasesRelations = relations(userPurchases, ({ one }) => ({
  shopItem: one(shopItems, {
    fields: [userPurchases.shopItemId],
    references: [shopItems.id],
  }),
  user: one(userProgress, {
    fields: [userPurchases.userId],
    references: [userProgress.userId],
  }),
}))

// XP Transaction Log for Analytics
export const xpTransactions = pgTable("xp_transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(), // "earned", "spent", "bonus"
  amount: integer("amount").notNull(),
  source: text("source").notNull(), // "lesson_complete", "quest_reward", "practice", "shop_purchase", etc.
  sourceId: text("source_id"), // ID of the source (lesson id, quest id, etc.)
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const xpTransactionsRelations = relations(xpTransactions, ({ one }) => ({
  user: one(userProgress, {
    fields: [xpTransactions.userId],
    references: [userProgress.userId],
  }),
}))

// Gems Transaction Log for Analytics
export const gemTransactions = pgTable("gem_transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(), // "earned", "spent", "purchased", "bonus"
  amount: integer("amount").notNull(),
  source: text("source").notNull(), // "level_complete", "chest_open", "shop_purchase", "ad_watch", etc.
  sourceId: text("source_id"), // ID of the source
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const gemTransactionsRelations = relations(gemTransactions, ({ one }) => ({
  user: one(userProgress, {
    fields: [gemTransactions.userId],
    references: [userProgress.userId],
  }),
}))
