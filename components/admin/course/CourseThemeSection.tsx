'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseThemeConfig } from "../../../app/admin/courses/components/course-theme-config";
import { Course } from "./course-types";

export interface CourseThemeSectionProps {
  course: Course;
}

export const CourseThemeSection = ({ course }: CourseThemeSectionProps) => {
  return (
    <Card className="dark:bg-gray-800/70 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-gray-200">Course Theme Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <CourseThemeConfig courseId={course.id} />
      </CardContent>
    </Card>
  );
};