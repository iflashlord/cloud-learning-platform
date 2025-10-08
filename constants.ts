import { CONFIG } from "@/lib/config";

export const POINTS_TO_REFILL = 10;

export const quests = [
  {
    title: "First Steps",
    description: "Begin your technology journey",
    value: 20,
    reward: {
      xp: 5,
      hearts: 1,
      badge: "novice"
    },
    icon: "🌱",
    color: "green",
    difficulty: "Beginner",
    category: "Getting Started",
    type: "milestone"
  },
  {
    title: "Knowledge Seeker",
    description: "Complete 5 challenges in a single session",
    value: 50,
    reward: {
      xp: 10,
      hearts: 1,
      badge: "explorer"
    },
    icon: "🔍",
    color: "blue",
    difficulty: "Beginner",
    category: "Learning",
    type: "milestone"
  },
  {
    title: "Consistent Learner",
    description: "Study for 3 consecutive days",
    value: 100,
    reward: {
      xp: 25,
      hearts: 2,
      badge: "consistent"
    },
    icon: "🔥",
    color: "orange",
    difficulty: "Intermediate",
    category: "Consistency",
    type: "streak"
  },
  {
    title: "Challenge Champion",
    description: "Complete 50 challenges across any course",
    value: 200,
    reward: {
      xp: 50,
      hearts: 3,
      badge: "champion"
    },
    icon: "⚡",
    color: "purple",
    difficulty: "Intermediate",
    category: "Achievement",
    type: "milestone"
  },
  {
    title: "Course Conqueror",
    description: "Complete an entire course perfectly",
    value: 500,
    reward: {
      xp: 100,
      hearts: 5,
      badge: "conqueror"
    },
    icon: "👑",
    color: "gold",
    difficulty: "Advanced",
    category: "Mastery",
    type: "completion"
  },
  {
    title: "Technology Master",
    description: "Reach 1000 total XP across all courses",
    value: 1000,
    reward: {
      xp: 200,
      hearts: 10,
      badge: "master"
    },
    icon: "🏆",
    color: "platinum",
    difficulty: "Expert",
    category: "Mastery",
    type: "milestone"
  },
  {
    title: "Perfect Week",
    description: "Complete daily goals for 7 consecutive days",
    value: 300,
    reward: {
      xp: 75,
      hearts: 4,
      badge: "perfectionist"
    },
    icon: "✨",
    color: "rainbow",
    difficulty: "Advanced",
    category: "Consistency",
    type: "streak"
  },
  {
    title: "Speed Demon",
    description: "Complete 10 challenges in under 30 minutes",
    value: 150,
    reward: {
      xp: 35,
      hearts: 2,
      badge: "speedster"
    },
    icon: "💨",
    color: "cyan",
    difficulty: "Intermediate",
    category: "Performance",
    type: "challenge"
  }
];

// Platform branding constants
export const PLATFORM_NAME = CONFIG.PLATFORM_NAME;
export const PLATFORM_DESCRIPTION = CONFIG.PLATFORM_DESCRIPTION;
export const FULL_TITLE = CONFIG.FULL_TITLE;
