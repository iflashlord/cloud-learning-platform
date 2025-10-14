'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Challenge, getQuestionTypeIcon, getQuestionTypeColor } from "./course-types";

export interface ChallengeItemProps {
  challenge: Challenge;
}

export const ChallengeItem = ({ challenge }: ChallengeItemProps) => {
  const IconComponent = getQuestionTypeIcon(challenge.type);
  const colorClasses = getQuestionTypeColor(challenge.type);

  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-md ${colorClasses}`}>
          <IconComponent className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {challenge.question}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {challenge.type.replace('_', ' ')} • {challenge.challengeOptions.length} options
          </p>
        </div>
      </div>
      <Link href={`/admin/challenges/${challenge.id}/edit`}>
        <Button variant="ghost" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
};