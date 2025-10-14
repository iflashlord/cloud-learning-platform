"use client";

import { QuestProgressTracker } from '@/components/quests/QuestProgressTracker';
import type { Quest } from '@/components/quests/types';

type Props = {
  quests: Quest[];
  userPoints: number;
  className?: string;
};

export const QuestProgressTrackerComponent = ({ quests, userPoints, className }: Props) => {
  return (
    <QuestProgressTracker 
      quests={quests} 
      userPoints={userPoints} 
      className={className} 
    />
  );
};