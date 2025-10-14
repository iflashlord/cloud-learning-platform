'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LessonCard } from "@/components/ui/lesson-card";
import { Edit, Plus } from "lucide-react";
import { Lesson } from "./course-types";
import { ChallengeItem } from "./ChallengeItem";

export interface LessonSectionProps {
  lesson: Lesson;
}

export const LessonSection = ({ lesson }: LessonSectionProps) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <LessonCard
            lesson={{
              id: lesson.id.toString(),
              title: lesson.title,
              order: lesson.order,
              challenges: lesson.challenges
            }}
            status="completed"
          />
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/lessons/${lesson.id}/edit`}>
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Link href={`/admin/challenges/new?lessonId=${lesson.id}`}>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Challenge
            </Button>
          </Link>
        </div>
      </div>
      
      {lesson.challenges.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Challenges:</h4>
          <div className="grid gap-2">
            {lesson.challenges.map((challenge) => (
              <ChallengeItem key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};