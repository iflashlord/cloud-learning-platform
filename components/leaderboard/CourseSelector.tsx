/**
 * Course Selector Component
 * 
 * Dropdown selector for choosing courses in leaderboard
 */

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Filter, ChevronDown, Search, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type Course = {
  id: number;
  title: string;
  imageSrc: string;
};

interface CourseSelectorProps {
  courses: Course[];
  selectedCourse: Course | null;
  onCourseChange: (courseId: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({
  courses,
  selectedCourse,
  onCourseChange,
  searchQuery,
  onSearchChange,
  isOpen,
  onToggle,
  dropdownRef,
}) => {
  const filteredCourses = React.useMemo(() => {
    if (!searchQuery) return courses;
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  return (
    <div className="w-full max-w-md">
      {selectedCourse && (
        <div className="bg-card rounded-xl border shadow-sm p-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4">
              <div className="relative">
                <Image
                  src={selectedCourse.imageSrc}
                  alt={selectedCourse.title}
                  width={48}
                  height={48}
                  className="rounded-lg shadow-md"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-xl font-bold text-foreground">
                  {selectedCourse.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Course Leaderboard
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative" ref={dropdownRef}>
        <Button
          variant="secondary"
          onClick={onToggle}
          className="w-full justify-between h-12 border-2 hover:border-orange-300 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            {selectedCourse ? "Switch Course" : "Select Course"}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-xl shadow-lg z-20 max-h-80 overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-background text-foreground"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Course List */}
            <div className="max-h-60 overflow-y-auto p-2">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  <p>No courses found</p>
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <Button
                    key={course.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start p-3 h-auto mb-1 hover:bg-orange-50 dark:hover:bg-orange-900/20",
                      course.id === selectedCourse?.id &&
                        "bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-600"
                    )}
                    onClick={() => onCourseChange(course.id)}
                  >
                    <Image
                      src={course.imageSrc}
                      alt={course.title}
                      width={32}
                      height={32}
                      className="rounded-sm mr-3"
                    />
                    <span className="text-sm font-medium text-left">
                      {course.title}
                    </span>
                    {course.id === selectedCourse?.id && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                    )}
                  </Button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};