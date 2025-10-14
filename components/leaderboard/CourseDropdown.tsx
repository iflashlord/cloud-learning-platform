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
      className="w-full px-4 py-2 border rounded-lg bg-white text-gray-900 flex items-center justify-between"
      onClick={onToggle}
      type="button"
    >
      <span>{selectedCourse.name}</span>
      <svg className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
    {isOpen && (
      <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
        <input
          type="text"
          className="w-full px-3 py-2 border-b outline-none"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
        <ul>
          {courses.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(course => (
            <li key={course.id}>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${course.id === selectedCourse.id ? "bg-blue-100 font-semibold" : ""}`}
                onClick={() => onCourseChange(course.id)}
                type="button"
              >
                {course.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export type { CourseDropdownProps };
