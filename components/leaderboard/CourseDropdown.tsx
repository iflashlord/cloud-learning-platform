import React, { RefObject } from "react";
import { Course } from "./types";

interface CourseDropdownProps {
  courses: Course[];
  selectedCourse: Course;
  onCourseChange: (courseId: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: RefObject<HTMLDivElement>;
}

export const CourseDropdown = ({
  courses,
  selectedCourse,
  onCourseChange,
  searchQuery,
  onSearchChange,
  isOpen,
  onToggle,
  dropdownRef,
}: CourseDropdownProps) => (
  <div className="relative w-full max-w-xs" ref={dropdownRef}>
    <button
      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground flex items-center justify-between hover:bg-muted transition-colors"
      onClick={onToggle}
      type="button"
    >
      <span>{selectedCourse.title}</span>
      <svg className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
    {isOpen && (
      <div className="absolute z-10 mt-2 w-full bg-background border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
        <input
          type="text"
          className="w-full px-3 py-2 border-b border-border outline-none bg-background text-foreground placeholder:text-muted-foreground"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
        <ul>
          {courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())).map(course => (
            <li key={course.id}>
              <button
                className={`w-full text-left px-4 py-2 text-foreground hover:bg-muted transition-colors ${course.id === selectedCourse.id ? "bg-primary/10 font-semibold text-primary" : ""}`}
                onClick={() => onCourseChange(course.id)}
                type="button"
              >
                {course.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export type { CourseDropdownProps };
