// Gamification System Types

export type CurrencyType = "hearts" | "xp" | "gems" | "streak"

export type LeaderboardType = "global" | "course" | "weekly" | "monthly"

export type ShopItemType = "hearts_refill" | "streak_freeze" | "double_xp" | "gem_pack" | "cosmetic"

export type AchievementCategory = "learning" | "social" | "streak" | "mastery" | "collection"

export type QuestType =
  | "complete_lessons"
  | "earn_xp"
  | "perfect_lesson"
  | "streak"
  | "practice_old"
  | "no_hearts_lost"
  | "speed_lesson"

export interface UserGameProgress {
  userId: string
  hearts: number
  maxHearts: number
  xp: number
  gems: number
  streak: number
  totalXpEarned: number
  lessonsCompleted: number
  perfectLessons: number
  lastActiveDate: Date
  heartsRefillAt?: Date
}

export interface Quest {
  id: number
  type: QuestType
  title: string
  description: string
  targetValue: number
  currentValue: number
  xpReward: number
  gemsReward: number
  heartsReward: number
  completed: boolean
  rewardClaimed: boolean
  expiresAt?: Date
}

export interface Achievement {
  id: number
  key: string
  title: string
  description: string
  category: AchievementCategory
  iconSrc?: string
  badgeColor: string
  xpReward: number
  gemsReward: number
  isSecret: boolean
  unlockedAt?: Date
  progress?: number
}

export interface LeaderboardEntry {
  userId: string
  userName: string
  userImageSrc: string
  rank: number
  xp: number
  streak?: number
  lessonsCompleted?: number
  courseTitle?: string
  isCurrentUser?: boolean
}

export interface ShopItem {
  id: string
  key: string
  type: ShopItemType
  title: string
  description: string
  iconSrc?: string
  gemCost: number
  xpCost: number
  isActive: boolean
  isLimited: boolean
  sortOrder: number
}

export interface GameStats {
  level: number
  totalXP: number
  xpToNextLevel: number
  currentLevelXP: number
  lessonsCompleted: number
  perfectLessons: number
  currentStreak: number
  bestStreak: number
  rank: number
  totalUsers: number
}

export interface XPTransaction {
  id: number
  userId: string
  type: "earned" | "spent" | "bonus"
  amount: number
  source: string
  sourceId?: string
  description?: string
  createdAt: Date
}

export interface GemTransaction {
  id: number
  userId: string
  type: "earned" | "spent" | "purchased" | "bonus"
  amount: number
  source: string
  sourceId?: string
  description?: string
  createdAt: Date
}
