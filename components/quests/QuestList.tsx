import React from 'react';
import { QuestItem } from './QuestItem';
import type { QuestListProps, Quest, QuestStatus } from './types';

export const QuestList: React.FC<QuestListProps> = ({ quests, userPoints }) => {
  const getQuestStatus = (quest: Quest): QuestStatus => {
    if (userPoints >= quest.value) return "completed";
    if (userPoints > (quest.value * 0.1)) return "active";
    return "upcoming";
  };

  const getProgressPercentage = (quest: Quest) => {
    return Math.min((userPoints / quest.value) * 100, 100);
  };

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {quests.map((quest, index) => (
        <QuestItem
          key={`${quest.title}-${index}`}
          quest={quest}
          status={getQuestStatus(quest)}
          progress={getProgressPercentage(quest)}
          userPoints={userPoints}
        />
      ))}
    </div>
  );
};