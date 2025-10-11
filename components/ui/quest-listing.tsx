"use client";

import { QuestCard } from "@/components/ui/quest-card";
import { QuestSection } from "@/components/ui/quest-section";
import { QUEST_ICON_MAP, type QuestIconKey } from "@/constants";
import { Zap, Award } from "lucide-react";
import { statusStyles } from "@/lib/style-utils";
import { cn } from "@/lib/utils";

type Quest = {
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

type Props = {
  quests: Quest[];
  userPoints: number;
  className?: string;
};

export const QuestListing = ({ quests, userPoints, className }: Props) => {
  const completedQuests = quests.filter(quest => userPoints >= quest.value);
  const availableQuests = quests.filter(quest => userPoints < quest.value);

  return (
    <div className={cn("w-full space-y-8", className)}>
      {/* Available Quests */}
      {availableQuests.length > 0 && (
        <QuestSection
          title="Available Quests"
          icon={Zap}
          iconBgClass={cn("bg-gradient-to-br", statusStyles.warning.button)}
        >
          {availableQuests.map((quest) => {
            const progress = Math.min((userPoints / quest.value) * 100, 100);
            const isNextQuest = availableQuests[0].title === quest.title;
            
            return (
              <QuestCard
                key={quest.title}
                quest={{
                  ...quest,
                  icon: QUEST_ICON_MAP[quest.icon]
                }}
                progress={progress}
                userPoints={userPoints}
                isCompleted={false}
                isNext={isNextQuest}
              />
            );
          })}
        </QuestSection>
      )}

      {/* Completed Quests */}
      {completedQuests.length > 0 && (
        <QuestSection
          title="Completed Quests"
          icon={Award}
          iconBgClass={cn("bg-gradient-to-br", statusStyles.success.button)}
        >
          {completedQuests.map((quest) => (
            <QuestCard
              key={quest.title}
              quest={{
                ...quest,
                icon: QUEST_ICON_MAP[quest.icon]
              }}
              progress={100}
              userPoints={userPoints}
              isCompleted={true}
              isNext={false}
            />
          ))}
        </QuestSection>
      )}
    </div>
  );
};