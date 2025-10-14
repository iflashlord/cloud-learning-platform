'use client';

import { StatCard } from "@/components/ui/stat-card";
import { BookOpen, ListChecks, FileQuestion, CheckSquare } from "lucide-react";
import { Course } from "./course-types";

export interface CourseStatsProps {
  course: Course;
}

export const CourseStats = ({ course }: CourseStatsProps) => {
  const totalLessons = course.units.reduce((acc, unit) => acc + unit.lessons.length, 0);
  const totalChallenges = course.units.reduce((acc, unit) => 
    acc + unit.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.challenges.length, 0), 0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        variant="primary"
        icon={<BookOpen className="w-6 h-6" />}
        title="Total Units"
        value={course.units.length.toString()}
      />
      <StatCard
        variant="default"
        icon={<ListChecks className="w-6 h-6" />}
        title="Total Lessons"
        value={totalLessons.toString()}
      />
      <StatCard
        variant="success"
        icon={<FileQuestion className="w-6 h-6" />}
        title="Total Challenges"
        value={totalChallenges.toString()}
      />
      <StatCard
        variant="warning"
        icon={<CheckSquare className="w-6 h-6" />}
        title="Completion Rate"
        value="85%"
        trend={{
          value: "12",
          positive: true
        }}
      />
    </div>
  );
};