'use client';

import { StatCard } from "@/components/ui/stat-card";
import { BookOpen, ListChecks, FileQuestion } from "lucide-react";
import { Course } from "./types";

interface CourseStatsProps {
  course: Course;
}

export const CourseStats = ({ course }: CourseStatsProps) => {
  const totalLessons = course.units.reduce((total, unit) => total + unit.lessons.length, 0);
  const totalChallenges = course.units.reduce(
    (total, unit) => 
      total + unit.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.challenges.length, 0), 
    0
  );

  const stats = [
    {
      label: "Units",
      value: course.units.length,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/50",
    },
    {
      label: "Lessons",
      value: totalLessons,
      icon: ListChecks,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/50",
    },
    {
      label: "Questions",
      value: totalChallenges,
      icon: FileQuestion,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          title={stat.label}
          value={stat.value}
          icon={<stat.icon className="w-5 h-5" />}
        />
      ))}
    </div>
  );
};