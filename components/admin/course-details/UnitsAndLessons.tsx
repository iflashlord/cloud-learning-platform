'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LessonCard } from "@/components/ui/lesson-card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Unit, Challenge } from "./types";
import { getQuestionTypeIcon, getQuestionTypeColor } from "./utils";

interface UnitsAndLessonsProps {
  units: Unit[];
  courseId: number;
}

export const UnitsAndLessons = ({ units, courseId }: UnitsAndLessonsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Course Content
        </h2>
        <Link href={`/admin/units/new?courseId=${courseId}`}>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Unit</span>
          </Button>
        </Link>
      </div>

      {units.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              <h3 className="font-medium mb-2">No units yet</h3>
              <p className="text-sm mb-4">Start building your course by adding the first unit.</p>
              <Link href={`/admin/units/new?courseId=${courseId}`}>
                <Button>Add First Unit</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} courseId={courseId} />
          ))}
        </div>
      )}
    </div>
  );
};

interface UnitCardProps {
  unit: Unit;
  courseId: number;
}

const UnitCard = ({ unit, courseId }: UnitCardProps) => {
  const totalChallenges = unit.lessons.reduce(
    (total, lesson) => total + lesson.challenges.length,
    0
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{unit.title}</CardTitle>
            {unit.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {unit.description}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="neutral">
              {unit.lessons.length} lesson{unit.lessons.length !== 1 ? 's' : ''}
            </Badge>
            <Badge variant="neutral">
              {totalChallenges} question{totalChallenges !== 1 ? 's' : ''}
            </Badge>
            <Link href={`/admin/lessons/new?unitId=${unit.id}`}>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {unit.lessons.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-sm">No lessons in this unit yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unit.lessons.map((lesson) => (
              <LessonCardComponent key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface LessonCardComponentProps {
  lesson: Unit['lessons'][0];
}

const LessonCardComponent = ({ lesson }: LessonCardComponentProps) => {
  const challengeTypes = lesson.challenges.reduce((acc, challenge) => {
    acc[challenge.type] = (acc[challenge.type] || 0) + 1;
    return acc;
  }, {} as Record<Challenge['type'], number>);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            {lesson.title}
          </h4>
          <Badge variant="neutral" className="text-xs">
            {lesson.challenges.length} questions
          </Badge>
        </div>

        {lesson.challenges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {Object.entries(challengeTypes).map(([type, count]) => (
              <Badge
                key={type}
                variant="neutral"
                className={`text-xs ${getQuestionTypeColor(type as Challenge['type'])}`}
              >
                <span className="flex items-center space-x-1">
                  {getQuestionTypeIcon(type as Challenge['type'])}
                  <span>{count}</span>
                </span>
              </Badge>
            ))}
          </div>
        )}

        <Link
          href={`/admin/lessons/${lesson.id}`}
          className="inline-block text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          View Details →
        </Link>
      </div>
    </Card>
  );
};
