'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loading, PageLoading } from "@/components/ui/loading";
import { EmptyState } from "@/components/ui/empty-state";
import { BookOpen } from "lucide-react";
import { Course } from "./types";
import { CourseDetailsHeader } from "./CourseDetailsHeader";
import { CourseStats } from "./CourseStats";
import { UnitsAndLessons } from "./UnitsAndLessons";

interface CourseDetailsProps {
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

  const handleBack = () => {
    router.push("/admin/courses");
  };

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
          onClick: handleBack,
          variant: "primary"
        }}
      />
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      <CourseDetailsHeader course={course} onBack={handleBack} />
      
      <CourseStats course={course} />
      
      <UnitsAndLessons units={course.units} courseId={course.id} />
    </div>
  );
};