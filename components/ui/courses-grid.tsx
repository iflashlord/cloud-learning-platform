"use client";

import { BookOpen } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CourseWithProgress = {
  id: number;
  title: string;
  imageSrc: string;
  description?: string | null;
  level?: string | null;
  duration?: string | null;
  category?: string | null;
  progress?: {
    percentage: number;
    totalChallenges: number;
    completedChallenges: number;
  } | null;
  isActive?: boolean;
};

type Props = {
  courses: CourseWithProgress[];
  viewMode: "grid" | "list";
  onCourseClick: (id: number) => void;
  pending: boolean;
  activeCourseId?: number | null;
  getCategoryIcon: (category: string) => React.ReactElement;
  className?: string;
};

export const CoursesGrid = ({
  courses,
  viewMode,
  onCourseClick,
  pending,
  activeCourseId,
  getCategoryIcon,
  className
}: Props) => {
  // Group courses by category
  const coursesByCategory = courses.reduce((acc: Record<string, CourseWithProgress[]>, course) => {
    const category = course.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(course);
    return acc;
  }, {});

  if (Object.keys(coursesByCategory).length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">No courses found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      {Object.entries(coursesByCategory).map(([category, categoryCourses]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-3">
            {getCategoryIcon(category)}
            <h2 className="text-2xl font-bold text-foreground">{category}</h2>
            <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
              {categoryCourses.length} {categoryCourses.length === 1 ? 'course' : 'courses'}
            </span>
          </div>
          
          <div className={cn(
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-3"
          )}>
            {categoryCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                imageSrc={course.imageSrc}
                description={course.description || undefined}
                level={course.level || undefined}
                duration={course.duration || undefined}
                progress={course.progress}
                onClick={onCourseClick}
                disabled={pending}
                active={course.id === activeCourseId}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Import the actual Card component
import { Card as CourseCard } from "@/app/(main)/courses/card";