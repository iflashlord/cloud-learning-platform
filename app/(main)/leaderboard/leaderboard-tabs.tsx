"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LoadingState } from "@/components/ui/common";
import {
  LeaderboardTabs,
  LeaderboardHeader,
  LeaderboardList,
  CourseSelector,
  CourseGrid,
  type LeaderboardUser,
  type Course,
} from "@/components/leaderboard";

type Props = {
  courses: Course[];
  generalLeaderboard: LeaderboardUser[];
  courseLeaderboard: LeaderboardUser[] | null;
  selectedCourse: Course | null;
  selectedCourseId: number | null;
};

export const LeaderboardTabsContainer = ({
  courses,
  generalLeaderboard,
  courseLeaderboard,
  selectedCourse,
  selectedCourseId,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"general" | "course">("course");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCourseChange = (courseId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("course", courseId.toString());
    router.push(`/leaderboard?${params.toString()}`);
    setCourseDropdownOpen(false);
    setSearchQuery("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCourseDropdownOpen(false);
      }
    };

    if (courseDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [courseDropdownOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCourseDropdownOpen(false);
        setSearchQuery("");
      }
    };

    if (courseDropdownOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [courseDropdownOpen]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <LeaderboardTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* General Leaderboard Tab */}
      {activeTab === "general" && (
        <div className="w-full">
          <LeaderboardHeader
            type="general"
            users={generalLeaderboard}
            courses={courses}
          />
          
          <LeaderboardList 
            users={generalLeaderboard} 
            showCourseInfo={true}
            emptyMessage="No learners found"
          />
        </div>
      )}

      {/* Course Leaderboard Tab */}
      {activeTab === "course" && (
        <div className="w-full">
          <LeaderboardHeader
            type="course"
            users={courseLeaderboard || []}
            courses={courses}
          />
          
          {selectedCourse ? (
            <>
              <CourseSelector
                courses={courses}
                selectedCourse={selectedCourse}
                onCourseChange={handleCourseChange}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isOpen={courseDropdownOpen}
                onToggle={() => setCourseDropdownOpen(!courseDropdownOpen)}
                dropdownRef={dropdownRef}
              />

              {courseLeaderboard ? (
                <LeaderboardList 
                  users={courseLeaderboard}
                  showCourseInfo={false}
                  emptyMessage="No learners in this course yet"
                />
              ) : selectedCourseId ? (
                <LoadingState loading={true} size="lg" label="Loading course leaderboard...">
                  <div />
                </LoadingState>
              ) : null}
            </>
          ) : (
            <CourseGrid 
              courses={courses}
              onCourseSelect={handleCourseChange}
            />
          )}
        </div>
      )}
    </div>
  );
};