"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type LeaderboardUser = {
  userId: string;
  userName: string;
  userImageSrc: string;
  points: number;
  activeCourseId?: number | null;
  activeCourse?: {
    id: number;
    title: string;
    imageSrc: string;
  } | null;
};

type Course = {
  id: number;
  title: string;
  imageSrc: string;
};

type Props = {
  courses: Course[];
  generalLeaderboard: LeaderboardUser[];
  courseLeaderboard: LeaderboardUser[] | null;
  selectedCourse: Course | null;
  selectedCourseId: number | null;
};

export const LeaderboardTabs = ({
  courses,
  generalLeaderboard,
  courseLeaderboard,
  selectedCourse,
  selectedCourseId,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"general" | "course">("course");

  const handleCourseChange = (courseId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("course", courseId.toString());
    router.push(`/leaderboard?${params.toString()}`);
  };

  const renderLeaderboardList = (leaderboard: LeaderboardUser[], showCourseInfo = false) => (
    <>
      <Separator className="mb-4 h-0.5 rounded-full" />
      {leaderboard.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          <p>No learners found for this course yet.</p>
          <p className="text-sm mt-2">Be the first to start learning!</p>
        </div>
      ) : (
        leaderboard.map((userProgress, index) => (
          <div 
            key={userProgress.userId}
            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
          >
            <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
            <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
              <AvatarImage
                className="object-cover"
                src={userProgress.userImageSrc}
              />
            </Avatar>
            <div className="flex-1">
              <p className="font-bold text-neutral-800">
                {userProgress.userName}
              </p>
              {showCourseInfo && userProgress.activeCourse && (
                <div className="flex items-center mt-1">
                  <Image
                    src={userProgress.activeCourse.imageSrc}
                    alt={userProgress.activeCourse.title}
                    width={16}
                    height={16}
                    className="rounded-sm mr-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {userProgress.activeCourse.title}
                  </p>
                </div>
              )}
            </div>
            <p className="text-muted-foreground">
              {userProgress.points} XP
            </p>
          </div>
        ))
      )}
    </>
  );

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex rounded-lg bg-muted p-1 mb-6">
        <Button
          variant={activeTab === "general" ? "default" : "ghost"}
          className="flex-1"
          onClick={() => setActiveTab("general")}
        >
          General Leaderboard
        </Button>
        <Button
          variant={activeTab === "course" ? "default" : "ghost"}
          className="flex-1"
          onClick={() => setActiveTab("course")}
        >
          Course Leaderboard
        </Button>
      </div>

      {/* General Leaderboard Tab */}
      {activeTab === "general" && (
        <div className="w-full">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-2">
              Top Performers Across All Courses
            </h2>
            <p className="text-muted-foreground text-sm">
              Global ranking of all learners by total XP earned
            </p>
          </div>
          {renderLeaderboardList(generalLeaderboard, true)}
        </div>
      )}

      {/* Course Leaderboard Tab */}
      {activeTab === "course" && (
        <div className="w-full">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-2">
              Course-Specific Leaderboard
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              See top performers in a specific course
            </p>
            
            {/* Course Selection and Display */}
            {selectedCourse ? (
              <>
                {/* Selected Course Header */}
                <div className="flex flex-col items-center mb-4">
                  <div className="flex items-center mb-3">
                    <Image
                      src={selectedCourse.imageSrc}
                      alt={selectedCourse.title}
                      width={32}
                      height={32}
                      className="rounded-sm mr-3"
                    />
                    <h3 className="text-xl font-semibold text-neutral-700">
                      {selectedCourse.title} Leaderboard
                    </h3>
                  </div>
                  
                  {/* Course Switcher */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Top learners currently studying this course
                    </p>
                    <details className="relative inline-block">
                      <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                        Switch to different course ▼
                      </summary>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 min-w-[300px]">
                        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                          {courses.map((course) => (
                            <Button
                              key={course.id}
                              variant={course.id === selectedCourse.id ? "default" : "ghost"}
                              className="flex items-center justify-start p-3 h-auto w-full"
                              onClick={() => {
                                handleCourseChange(course.id);
                                // Close the details dropdown
                                const details = document.querySelector('details[open]') as HTMLDetailsElement;
                                if (details) details.removeAttribute('open');
                              }}
                            >
                              <Image
                                src={course.imageSrc}
                                alt={course.title}
                                width={24}
                                height={24}
                                className="rounded-sm mr-3"
                              />
                              <span className="text-sm font-medium">{course.title}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {courses.map((course) => (
                  <Button
                    key={course.id}
                    variant="primaryOutline"
                    className="flex items-center p-4 h-auto"
                    onClick={() => handleCourseChange(course.id)}
                  >
                    <Image
                      src={course.imageSrc}
                      alt={course.title}
                      width={32}
                      height={32}
                      className="rounded-sm mr-3"
                    />
                    <span className="text-sm font-medium">{course.title}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {selectedCourse && courseLeaderboard ? (
            <div>
              {renderLeaderboardList(courseLeaderboard)}
            </div>
          ) : selectedCourseId ? (
            <div className="text-center text-muted-foreground py-8">
              <p>Loading course leaderboard...</p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>No active course selected. Please choose a course above to view its leaderboard.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};