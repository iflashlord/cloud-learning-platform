/**
 * Course Grid Component
 * 
 * Grid layout for selecting courses when none is selected
 */

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Course = {
  id: number;
  title: string;
  imageSrc: string;
};

interface CourseGridProps {
  courses: Course[];
  onCourseSelect: (courseId: number) => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  onCourseSelect,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
        Choose a Course to View Rankings
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {courses.map((course) => (
          <Button
            key={course.id}
            variant="outline"
            className="flex items-center p-6 h-auto hover:border-orange-300 hover:bg-orange-50 transition-all group"
            onClick={() => onCourseSelect(course.id)}
          >
            <Image
              src={course.imageSrc}
              alt={course.title}
              width={40}
              height={40}
              className="rounded-lg mr-4 group-hover:scale-105 transition-transform"
            />
            <div className="text-left">
              <span className="font-medium text-foreground block">
                {course.title}
              </span>
              <span className="text-sm text-muted-foreground">
                View rankings
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};