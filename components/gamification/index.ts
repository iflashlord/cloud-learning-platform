// Gamification System Components
// A comprehensive set of components for implementing Duolingo-style gamification

export {
  CurrencyDisplay,
  HeartsDisplay,
  XPDisplay,
  GemsDisplay,
  StreakDisplay,
  CurrencyHeader,
} from "./currency-display"

export { QuestCard, QuestList } from "./quest-system"

export { AchievementCard, AchievementGrid } from "./achievement-system"

export { Leaderboard, LeaderboardEntry } from "./leaderboard"

export { GameShop, ShopItemCard } from "./game-shop"

export { AdWatchSection } from "./ad-watch-section"

export { ProBonusSection } from "./pro-bonus-section"

export { GamificationDashboard } from "./gamification-dashboard"

// Re-export commonly used types
export type {
  CurrencyType,
  LeaderboardType,
  ShopItemType,
  AchievementCategory,
  QuestType,
} from "./types"
