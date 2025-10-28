import { CONFIG } from "@/lib/config"
import {
  Sprout,
  Search,
  Flame,
  Zap,
  Crown,
  Trophy,
  Sparkles,
  Wind,
  Heart,
  Coins,
  GraduationCap,
  Trophy as LeaderboardIcon,
  Target,
  ShoppingCart,
  Infinity,
  BookOpen,
  User,
  Users,
  Baby,
  Bot,
  Skull,
  CheckCircle,
  Lightbulb,
  PartyPopper,
  Flag,
  Globe,
  Building,
  Code,
  Wrench,
  Award,
  CloudSnow,
  Smile,
  Frown,
} from "lucide-react"

// Gamification Constants
export const GAMIFICATION = {
  // Hearts System
  MAX_HEARTS: 5,
  HEART_REFILL_INTERVAL_HOURS: 1,
  HEARTS_REFILL_COST_GEMS: 5,
  HEARTS_REFILL_COST_XP: 10,

  // XP System
  XP_PER_LESSON: 40,
  XP_PER_LESSON_PRO: 40, // kept aligned with base to maintain flat rewards
  XP_PER_QUESTION: 1,
  XP_PER_PRACTICE_QUESTION: 1,
  XP_PER_PRACTICE_LESSON: 20,
  XP_PER_PRACTICE_LESSON_PRO: 25,
  XP_PERFECT_LESSON_BONUS: 5, // Bonus for no mistakes
  XP_STREAK_BONUS: 5, // Daily streak bonus

  // Gems System
  GEMS_STARTING_AMOUNT: 50,
  GEMS_PER_LESSON_FIRST_TIME: 2,
  GEMS_PER_PERFECT_LESSON: 3,
  GEMS_PER_STREAK_DAY: 1, // Daily login bonus
  GEMS_FROM_AD_WATCH: 5,
  GEMS_PRO_DAILY_BONUS: 10, // Pro users get daily gems
  GEMS_CHEST_BRONZE: 5,
  GEMS_CHEST_SILVER: 10,
  GEMS_CHEST_GOLD: 20,

  // Streak System
  STREAK_XP_MULTIPLIER: 1.1, // 10% bonus XP per day (up to 7 days)
  MAX_STREAK_BONUS_DAYS: 7,
  STREAK_FREEZE_COST_GEMS: 15, // Cost to protect streak

  // Shop Costs
  DOUBLE_XP_DURATION_HOURS: 2,
  DOUBLE_XP_COST_GEMS: 20,

  // Quest Rewards
  DAILY_QUEST_XP_RANGE: [15, 50],
  DAILY_QUEST_GEMS_RANGE: [2, 8],
  WEEKLY_QUEST_MULTIPLIER: 3,

  // Achievement Rewards
  ACHIEVEMENT_XP_RANGE: [25, 100],
  ACHIEVEMENT_GEMS_RANGE: [5, 25],

  // Leaderboard Rewards (weekly)
  LEADERBOARD_TOP_1_GEMS: 100,
  LEADERBOARD_TOP_3_GEMS: 50,
  LEADERBOARD_TOP_10_GEMS: 25,
  LEADERBOARD_TOP_50_GEMS: 10,
} as const

// Design System Colors for Game Elements - Vibrant & Accessible
export const GAME_ELEMENT_COLORS = {
  // XP/Points Colors - Golden/Amber theme (more vibrant)
  XP: {
    text: "text-amber-500 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950/50",
    border: "border-amber-200 dark:border-amber-800",
    icon: "text-amber-500 dark:text-amber-300",
    gradient: "from-amber-500 to-yellow-500",
  },

  // Gems Colors - Bright Purple theme (more vibrant and visible)
  GEMS: {
    text: "text-purple-500 dark:text-purple-300",
    bg: "bg-purple-50 dark:bg-purple-950/50",
    border: "border-purple-200 dark:border-purple-800",
    icon: "text-purple-500 dark:text-purple-300",
    gradient: "from-purple-500 to-violet-500",
  },

  // Hearts Colors - Red theme (existing)
  HEARTS: {
    text: "text-red-500 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/50",
    border: "border-red-200 dark:border-red-800",
    icon: "text-red-500 dark:text-red-400",
    gradient: "from-red-500 to-rose-500",
  },
} as const

export const QUEST_ICON_MAP = {
  sprout: Sprout,
  search: Search,
  flame: Flame,
  zap: Zap,
  crown: Crown,
  trophy: Trophy,
  sparkles: Sparkles,
  wind: Wind,
} as const

export type QuestIconKey = keyof typeof QUEST_ICON_MAP

// SVG to Lucide Icon mappings
export const ICON_MAP = {
  heart: Heart,
  points: Coins,
  mascot: GraduationCap,
  learn: BookOpen,
  leaderboard: LeaderboardIcon,
  quests: Target,
  shop: ShoppingCart,
  unlimited: Infinity,
  finish: CheckCircle,
  man: User,
  woman: Users,
  boy: Baby,
  robot: Bot,
  zombie: Skull,
  hero: Lightbulb,
  mascot_bad: Frown,
  mascot_sad: Frown,
  "aws-cloud-practitioner": CloudSnow,
  "aws-solutions-architect": Building,
  "aws-developer": Code,
  "aws-sysops": Wrench,
  es: Globe,
  hr: Flag,
  it: Flag,
} as const

export type IconKey = keyof typeof ICON_MAP

type QuestDefinition = {
  title: string
  description: string
  value: number
  reward: {
    xp: number
    hearts: number
    badge: string
  }
  icon: QuestIconKey
  color: string
  difficulty: string
  category: string
  type: string
}

export const quests: QuestDefinition[] = [
  {
    title: "First Steps",
    description: "Begin your technology journey",
    value: 20,
    reward: {
      xp: 5,
      hearts: 1,
      badge: "novice",
    },
    icon: "sprout",
    color: "green",
    difficulty: "Beginner",
    category: "Getting Started",
    type: "milestone",
  },
  {
    title: "Knowledge Seeker",
    description: "Complete 5 challenges in a single session",
    value: 50,
    reward: {
      xp: 10,
      hearts: 1,
      badge: "explorer",
    },
    icon: "search",
    color: "blue",
    difficulty: "Beginner",
    category: "Learning",
    type: "milestone",
  },
  {
    title: "Consistent Learner",
    description: "Study for 3 consecutive days",
    value: 100,
    reward: {
      xp: 25,
      hearts: 2,
      badge: "consistent",
    },
    icon: "flame",
    color: "orange",
    difficulty: "Intermediate",
    category: "Consistency",
    type: "streak",
  },
  {
    title: "Challenge Champion",
    description: "Complete 50 challenges across any course",
    value: 200,
    reward: {
      xp: 50,
      hearts: 3,
      badge: "champion",
    },
    icon: "zap",
    color: "purple",
    difficulty: "Intermediate",
    category: "Achievement",
    type: "milestone",
  },
  {
    title: "Course Conqueror",
    description: "Complete an entire course perfectly",
    value: 500,
    reward: {
      xp: 100,
      hearts: 5,
      badge: "conqueror",
    },
    icon: "crown",
    color: "gold",
    difficulty: "Advanced",
    category: "Mastery",
    type: "completion",
  },
  {
    title: "Technology Master",
    description: "Reach 1000 total XP across all courses",
    value: 1000,
    reward: {
      xp: 200,
      hearts: 10,
      badge: "master",
    },
    icon: "trophy",
    color: "platinum",
    difficulty: "Expert",
    category: "Mastery",
    type: "milestone",
  },
  {
    title: "Perfect Week",
    description: "Complete daily goals for 7 consecutive days",
    value: 300,
    reward: {
      xp: 75,
      hearts: 4,
      badge: "perfectionist",
    },
    icon: "sparkles",
    color: "rainbow",
    difficulty: "Advanced",
    category: "Consistency",
    type: "streak",
  },
  {
    title: "Speed Demon",
    description: "Complete 10 challenges in under 30 minutes",
    value: 150,
    reward: {
      xp: 35,
      hearts: 2,
      badge: "speedster",
    },
    icon: "wind",
    color: "cyan",
    difficulty: "Intermediate",
    category: "Performance",
    type: "challenge",
  },
]

// Platform branding constants
export const PLATFORM_NAME = CONFIG.PLATFORM_NAME
export const PLATFORM_DESCRIPTION = CONFIG.PLATFORM_DESCRIPTION
export const FULL_TITLE = CONFIG.FULL_TITLE
