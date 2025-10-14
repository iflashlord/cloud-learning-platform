'use client';

import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/ui/empty-state";
import { BookOpen } from "lucide-react";
import { Course } from "./course-types";
import { UnitCard } from "./UnitCard";

export interface UnitsListProps {
  course: Course;
}

export const UnitsList = ({ course }: UnitsListProps) => {
  const router = useRouter();

  if (course.units.length === 0) {
    return (
      <EmptyState
        icon={<BookOpen className="w-12 h-12" />}
        title="No units found"
        description="This course doesn't have any units yet. Create your first unit to get started."
        action={{
          label: "Add First Unit",
          onClick: () => router.push(`/admin/units/new?courseId=${course.id}`),
          variant: "primary"
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {course.units.map((unit) => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
};