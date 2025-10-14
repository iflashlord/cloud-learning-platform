import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { QuestProgressHeader } from './QuestProgressHeader';
import { QuestStatsGrid } from './QuestStatsGrid';
import { QuestCategoryFilter } from './QuestCategoryFilter';
import { QuestList } from './QuestList';
import type { QuestProgressTrackerProps } from './types';

export const QuestProgressTracker: React.FC<QuestProgressTrackerProps> = ({ 
  quests, 
  userPoints, 
  className 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Calculate quest statistics
  const completedQuests = quests.filter(quest => userPoints >= quest.value);
  const activeQuests = quests.filter(quest => userPoints < quest.value && userPoints > (quest.value * 0.1));
  const upcomingQuests = quests.filter(quest => userPoints < (quest.value * 0.1));
  
  // Get categories
  const categories = ["all", ...Array.from(new Set(quests.map(quest => quest.category)))];
  
  // Filter quests based on selected category
  const filteredQuests = selectedCategory === "all" 
    ? quests 
    : quests.filter(quest => quest.category === selectedCategory);

  return (
    <div className={cn("bg-card rounded-xl border-2 border-blue-200 dark:border-blue-700 shadow-lg p-6", className)}>
      <QuestProgressHeader 
        completedQuests={completedQuests.length}
        totalQuests={quests.length}
      />

      <QuestStatsGrid
        completedCount={completedQuests.length}
        activeCount={activeQuests.length}
        upcomingCount={upcomingQuests.length}
        totalXp={userPoints}
        totalQuests={quests.length}
      />

      <QuestCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <QuestList
        quests={filteredQuests}
        userPoints={userPoints}
      />
    </div>
  );
};