import { QuestIconKey } from "@/constants";

export type Quest = {
  title: string;
  description: string;
  value: number;
  reward: {
    xp: number;
    hearts: number;
    badge: string;
  };
  icon: QuestIconKey;
  color: string;
  difficulty: string;
  category: string;
  type: string;
};

export type QuestStatus = "completed" | "active" | "upcoming";

export interface QuestProgressTrackerProps {
  quests: Quest[];
  userPoints: number;
  className?: string;
}

export interface QuestStatsProps {
  completedCount: number;
  activeCount: number;
  upcomingCount: number;
  totalXp: number;
  totalQuests: number;
}

export interface QuestCategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface QuestItemProps {
  quest: Quest;
  status: QuestStatus;
  progress: number;
  userPoints: number;
}

export interface QuestListProps {
  quests: Quest[];
  userPoints: number;
}