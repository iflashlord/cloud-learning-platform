'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Edit, Plus, ListChecks } from "lucide-react";
import { Unit } from "./course-types";
import { LessonSection } from "./LessonSection";

export interface UnitCardProps {
  unit: Unit;
}

export const UnitCard = ({ unit }: UnitCardProps) => {
  const router = useRouter();

  return (
    <Card className="dark:bg-gray-800/70 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="dark:text-gray-200">{unit.title}</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{unit.description}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/units/${unit.id}/edit`}>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/admin/lessons/new?unitId=${unit.id}`}>
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Lesson
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {unit.lessons.length === 0 ? (
          <EmptyState
            variant="minimal"
            icon={<ListChecks className="w-8 h-8" />}
            title="No lessons"
            description="Add lessons to this unit"
            action={{
              label: "Add Lesson",
              onClick: () => router.push(`/admin/lessons/new?unitId=${unit.id}`),
              variant: "primary"
            }}
          />
        ) : (
          <div className="space-y-4">
            {unit.lessons.map((lesson) => (
              <LessonSection key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};