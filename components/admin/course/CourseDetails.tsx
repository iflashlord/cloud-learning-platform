'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageLoading } from "@/components/ui/loading";
import { EmptyState } from "@/components/ui/empty-state";
import { BookOpen } from "lucide-react";
import { Course } from "./course-types";
import { CourseHeader } from "./CourseHeader";
import { CourseStats } from "./CourseStats";
import { CourseThemeSection } from "./CourseThemeSection";
import { UnitsList } from "./UnitsList";

export interface CourseDetailsProps {
  courseId: string;
}

export const CourseDetails = ({ courseId }: CourseDetailsProps) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCourse = useCallback(async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else {
        console.error('Failed to fetch course');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (loading) {
    return <PageLoading text="Loading course details..." />;
  }

  if (!course) {
    return (
      <EmptyState
        variant="full"
        icon={<BookOpen className="w-12 h-12" />}
        title="Course not found"
        description="The course you're looking for doesn't exist or may have been deleted."
        action={{
          label: "Back to Courses",
          onClick: () => router.push("/admin/courses"),
          variant: "primary"
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <CourseHeader course={course} />

      {/* Course Statistics */}
      <CourseStats course={course} />

      {/* Course Theme Configuration */}
      <CourseThemeSection course={course} />

      {/* Units and Lessons */}
      <UnitsList course={course} />
    </div>
  );
};