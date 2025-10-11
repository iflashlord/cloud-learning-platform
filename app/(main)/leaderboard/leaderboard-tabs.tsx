"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useRef, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Crown, Trophy, Medal, Award, TrendingUp, Users, Search, Filter, ChevronDown, Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCourseChange = (courseId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("course", courseId.toString());
    router.push(`/leaderboard?${params.toString()}`);
    setCourseDropdownOpen(false);
    setSearchQuery(""); // Clear search when changing course
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

  // Filter courses by search query
  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses;
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  // Get ranking icon based on position
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  // Get rank styling based on position
  const getRankStyling = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-200 shadow-md";
      case 2:
        return "bg-gradient-to-r from-gray-100 to-gray-50 border-gray-200 shadow-sm";
      case 3:
        return "bg-gradient-to-r from-orange-100 to-orange-50 border-orange-200 shadow-sm";
      default:
        return "hover:bg-gray-50";
    }
  };

  const renderLeaderboardList = (leaderboard: LeaderboardUser[], showCourseInfo = false) => (
    <>
      <div className="mb-6">
        <Separator className="mb-4 h-0.5 rounded-full" />
        
        {/* Leaderboard Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{leaderboard.length} {leaderboard.length === 1 ? 'learner' : 'learners'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Ranked by XP</span>
          </div>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No learners found</h3>
          <p className="text-muted-foreground mb-4">No one has started learning this course yet.</p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>Be the first to join and claim the top spot!</span>
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((userProgress, index) => {
            const position = index + 1;
            const rankIcon = getRankIcon(position);
            const isTopThree = position <= 3;
            
            return (
              <div 
                key={userProgress.userId}
                className={cn(
                  "flex items-center w-full p-4 rounded-xl border transition-all duration-200",
                  getRankStyling(position),
                  isTopThree ? "border-2" : "border hover:shadow-sm"
                )}
              >
                {/* Rank Number/Icon */}
                <div className="flex items-center justify-center w-12 h-12 mr-4">
                  {rankIcon ? (
                    <div className="flex flex-col items-center">
                      {rankIcon}
                      <span className="text-xs font-bold mt-1">#{position}</span>
                    </div>
                  ) : (
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                      position <= 10 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"
                    )}>
                      {position}
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                <div className="relative">
                  <Avatar className={cn(
                    "border-2 h-14 w-14 mr-4",
                    position === 1 ? "border-yellow-400 shadow-lg" :
                    position === 2 ? "border-gray-300 shadow-md" :
                    position === 3 ? "border-orange-300 shadow-md" :
                    "border-gray-200"
                  )}>
                    <AvatarImage
                      className="object-cover"
                      src={userProgress.userImageSrc}
                      alt={`${userProgress.userName}'s avatar`}
                    />
                  </Avatar>
                  {isTopThree && (
                    <div className={cn(
                      "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      position === 1 ? "bg-yellow-500 text-white" :
                      position === 2 ? "bg-gray-400 text-white" :
                      "bg-orange-500 text-white"
                    )}>
                      {position}
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={cn(
                      "font-semibold truncate",
                      position === 1 ? "text-yellow-800 text-lg" :
                      position <= 3 ? "text-gray-800" :
                      "text-neutral-800"
                    )}>
                      {userProgress.userName}
                    </h4>
                    {position === 1 && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  
                  {showCourseInfo && userProgress.activeCourse && (
                    <div className="flex items-center mt-1">
                      <Image
                        src={userProgress.activeCourse.imageSrc}
                        alt={userProgress.activeCourse.title}
                        width={20}
                        height={20}
                        className="rounded-sm mr-2"
                      />
                      <p className="text-sm text-muted-foreground truncate">
                        {userProgress.activeCourse.title}
                      </p>
                    </div>
                  )}
                </div>

                {/* Points Display */}
                <div className="flex flex-col items-end">
                  <div className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold",
                    position === 1 ? "bg-yellow-500 text-white" :
                    position === 2 ? "bg-gray-400 text-white" :
                    position === 3 ? "bg-orange-500 text-white" :
                    "bg-gray-100 text-gray-700"
                  )}>
                    <Award className="w-4 h-4" />
                    <span>{userProgress.points.toLocaleString()}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">XP</span>
                </div>
              </div>
            );
          })}
          
          {/* Show motivation message for fewer than 10 users */}
          {leaderboard.length < 10 && (
            <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <p className="text-sm text-muted-foreground mb-2">
                {10 - leaderboard.length} more spots available in the top 10!
              </p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>Keep learning to climb the rankings</span>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Enhanced Tab Navigation */}
      <div className="flex rounded-xl bg-gray-100 p-1.5 mb-8 shadow-sm">
        <Button
          variant={activeTab === "general" ? "default" : "ghost"}
          className={cn(
            "flex-1 h-12 text-sm font-medium transition-all rounded-lg",
            activeTab === "general" 
              ? "bg-white text-orange-600 shadow-sm border border-orange-200" 
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          )}
          onClick={() => setActiveTab("general")}
        >
          <Trophy className="w-4 h-4 mr-2" />
          Global Ranking
        </Button>
        <Button
          variant={activeTab === "course" ? "default" : "ghost"}
          className={cn(
            "flex-1 h-12 text-sm font-medium transition-all rounded-lg",
            activeTab === "course" 
              ? "bg-white text-orange-600 shadow-sm border border-orange-200" 
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          )}
          onClick={() => setActiveTab("course")}
        >
          <Award className="w-4 h-4 mr-2" />
          Course Rankings
        </Button>
      </div>

      {/* Enhanced General Leaderboard Tab */}
      {activeTab === "general" && (
        <div className="w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Global Hall of Fame
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              Top performers across all courses. These champions have earned the most XP 
              by completing challenges and mastering various technologies.
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-700">
                  {generalLeaderboard.length}
                </div>
                <div className="text-sm text-yellow-600">Active Learners</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">
                  {courses.length}
                </div>
                <div className="text-sm text-blue-600">Available Courses</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="text-2xl font-bold text-green-700">
                  {generalLeaderboard.reduce((sum, user) => sum + user.points, 0).toLocaleString()}
                </div>
                <div className="text-sm text-green-600">Total XP Earned</div>
              </div>
            </div>
          </div>
          {renderLeaderboardList(generalLeaderboard, true)}
        </div>
      )}

      {/* Enhanced Course Leaderboard Tab */}
      {activeTab === "course" && (
        <div className="w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Course Championships
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
              Compete with learners in the same course and track your progress 
              against others mastering the same technology.
            </p>
          </div>
            
          {/* Course Selection and Display */}
          {selectedCourse ? (
            <>
              {/* Enhanced Selected Course Header */}
              <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
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
                      <h3 className="text-xl font-bold text-gray-800">
                        {selectedCourse.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Course Leaderboard
                      </p>
                    </div>
                  </div>
                  
                  {/* Enhanced Course Switcher */}
                  <div className="w-full max-w-md">
                    <div className="relative" ref={dropdownRef}>
                      <Button
                        variant="secondary"
                        onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                        className="w-full justify-between h-12 border-2 hover:border-orange-300 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          Switch Course
                        </span>
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform",
                          courseDropdownOpen && "rotate-180"
                        )} />
                      </Button>
                      
                      {courseDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-80 overflow-hidden">
                          {/* Search Bar */}
                          <div className="p-4 border-b">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
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
                                    "w-full justify-start p-3 h-auto mb-1 hover:bg-orange-50",
                                    course.id === selectedCourse.id && "bg-orange-100 border border-orange-200"
                                  )}
                                  onClick={() => handleCourseChange(course.id)}
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
                                  {course.id === selectedCourse.id && (
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
                </div>
              </div>
            </>
          ) : (
            /* Course Selection Grid */
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Choose a Course to View Rankings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {courses.map((course) => (
                  <Button
                    key={course.id}
                    variant="secondaryOutline"
                    className="flex items-center p-6 h-auto hover:border-orange-300 hover:bg-orange-50 transition-all group"
                    onClick={() => handleCourseChange(course.id)}
                  >
                    <Image
                      src={course.imageSrc}
                      alt={course.title}
                      width={40}
                      height={40}
                      className="rounded-lg mr-4 group-hover:scale-105 transition-transform"
                    />
                    <div className="text-left">
                      <span className="font-medium text-gray-800 block">
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
          )}

          {/* Leaderboard Display */}
          {selectedCourse && courseLeaderboard ? (
            <div>
              {renderLeaderboardList(courseLeaderboard)}
            </div>
          ) : selectedCourseId ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading course leaderboard...</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
