"use client";

import { CheckCircle, Target, Star } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

type Props = {
  completedQuests: number;
  availableQuests: number;
  totalPoints: number;
  className?: string;
};

export const QuestStats = ({
  completedQuests,
  availableQuests,
  totalPoints,
  className
}: Props) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mx-auto">
        <StatCard
          variant="success"
          icon={<CheckCircle className="w-6 h-6" />}
          title="Completed"
          value={completedQuests.toString()}
          subtitle="Quests finished"
        />
        <StatCard
          variant="info"
          icon={<Target className="w-6 h-6" />}
          title="Available"
          value={availableQuests.toString()}
          subtitle="Quests to explore"
        />
        <StatCard
          variant="warning"
          icon={<Star className="w-6 h-6" />}
          title="Total XP"
          value={totalPoints.toString()}
          subtitle="Experience earned"
        />
      </div>
    </div>
  );
};