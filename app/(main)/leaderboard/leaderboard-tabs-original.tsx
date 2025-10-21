"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { LoadingState } from "@/components/ui/common"
import { Button } from "@/components/ui/button"
import { Trophy, Award, Filter, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

// Status styles for the component
const statusStyles = {
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
  },
}
import {
  LeaderboardTabs,
  LeaderboardHeader,
  LeaderboardList,
  CourseSelector,
  CourseGrid,
  type LeaderboardUser,
  type Course,
} from "@/components/leaderboard"

type Props = {
  courses: Course[]
  generalLeaderboard: LeaderboardUser[]
  courseLeaderboard: LeaderboardUser[] | null
  selectedCourse: Course | null
  selectedCourseId: number | null
}

export const LeaderboardTabsContainer = ({
  courses,
  generalLeaderboard,
  courseLeaderboard,
  selectedCourse,
  selectedCourseId,
}: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"general" | "course">("course")
  const [searchQuery, setSearchQuery] = useState("")
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleCourseChange = (courseId: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("course", courseId.toString())
    router.push(`/leaderboard?${params.toString()}`)
    setCourseDropdownOpen(false)
    setSearchQuery("") // Clear search when changing course
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCourseDropdownOpen(false)
      }
    }

    if (courseDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [courseDropdownOpen])

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCourseDropdownOpen(false)
        setSearchQuery("")
      }
    }

    if (courseDropdownOpen) {
      document.addEventListener("keydown", handleEscapeKey)
      return () => document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [courseDropdownOpen])

  return (
    <div className='w-full max-w-4xl mx-auto'>
      {/* Enhanced Tab Navigation */}
      <div className='flex rounded-xl bg-muted p-1.5 mb-8 shadow-sm'>
        <Button
          variant={activeTab === "general" ? "secondary" : "ghost"}
          className={cn(
            "flex-1 h-12 text-sm font-medium transition-all rounded-lg",
            activeTab === "general"
              ? "bg-background text-orange-600 dark:text-orange-400 shadow-sm border border-orange-200 dark:border-orange-600"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
          onClick={() => setActiveTab("general")}
        >
          <Trophy className='w-4 h-4 mr-2' />
          Global Ranking
        </Button>
        <Button
          variant={activeTab === "course" ? "secondary" : "ghost"}
          className={cn(
            "flex-1 h-12 text-sm font-medium transition-all rounded-lg",
            activeTab === "course"
              ? "bg-background text-orange-600 dark:text-orange-400 shadow-sm border border-orange-200 dark:border-orange-600"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
          onClick={() => setActiveTab("course")}
        >
          <Award className='w-4 h-4 mr-2' />
          Course Rankings
        </Button>
      </div>

      {/* Enhanced General Leaderboard Tab */}
      {activeTab === "general" && (
        <div className='w-full'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <Trophy className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-2xl font-bold text-foreground mb-3'>Global Hall of Fame</h2>
            <p className='text-muted-foreground max-w-md mx-auto leading-relaxed'>
              Top performers across all courses. These champions have earned the most XP by
              completing challenges and mastering various technologies.
            </p>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 max-w-2xl mx-auto'>
              <div
                className={cn(
                  "p-4 rounded-xl border",
                  statusStyles.warning.bg,
                  statusStyles.warning.border,
                )}
              >
                <div className={cn("text-2xl font-bold", statusStyles.warning.text)}>
                  {generalLeaderboard.length}
                </div>
                <div className={cn("text-sm", statusStyles.warning.text)}>Active Learners</div>
              </div>
              <div
                className={cn(
                  "p-4 rounded-xl border",
                  statusStyles.info.bg,
                  statusStyles.info.border,
                )}
              >
                <div className={cn("text-2xl font-bold", statusStyles.info.text)}>
                  {courses.length}
                </div>
                <div className={cn("text-sm", statusStyles.info.text)}>Available Courses</div>
              </div>
              <div
                className={cn(
                  "p-4 rounded-xl border",
                  statusStyles.success.bg,
                  statusStyles.success.border,
                )}
              >
                <div className={cn("text-2xl font-bold", statusStyles.success.text)}>
                  {generalLeaderboard.reduce((sum, user) => sum + user.points, 0).toLocaleString()}
                </div>
                <div className={cn("text-sm", statusStyles.success.text)}>Total XP Earned</div>
              </div>
            </div>
          </div>
          <LeaderboardList users={generalLeaderboard} />
        </div>
      )}

      {/* Enhanced Course Leaderboard Tab */}
      {activeTab === "course" && (
        <div className='w-full'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <Award className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3'>
              Course Championships
            </h2>
            <p className='text-muted-foreground max-w-md mx-auto leading-relaxed mb-6'>
              Compete with learners in the same course and track your progress against others
              mastering the same technology.
            </p>
          </div>

          {/* Course Selection and Display */}
          {selectedCourse ? (
            <>
              {/* Enhanced Selected Course Header */}
              <div className='bg-card rounded-xl border shadow-sm p-6 mb-6'>
                <div className='flex flex-col items-center'>
                  <div className='flex items-center mb-4'>
                    <div className='relative'>
                      <Image
                        src={selectedCourse.imageSrc}
                        alt={selectedCourse.title}
                        width={48}
                        height={48}
                        className='rounded-lg shadow-md'
                      />
                      <div className='absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center'>
                        <Trophy className='w-3 h-3 text-white' />
                      </div>
                    </div>
                    <div className='ml-4 text-left'>
                      <h3 className='text-xl font-bold text-foreground'>{selectedCourse.title}</h3>
                      <p className='text-sm text-muted-foreground'>Course Leaderboard</p>
                    </div>
                  </div>

                  {/* Enhanced Course Switcher */}
                  <div className='w-full max-w-md'>
                    <div className='relative' ref={dropdownRef}>
                      <Button
                        variant='secondary'
                        onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                        className='w-full justify-between h-12 border-2 hover:border-orange-300 transition-colors'
                      >
                        <span className='flex items-center gap-2'>
                          <Filter className='w-4 h-4' />
                          Switch Course
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform",
                            courseDropdownOpen && "rotate-180",
                          )}
                        />
                      </Button>

                      {courseDropdownOpen && (
                        <div className='absolute top-full left-0 right-0 mt-2 bg-popover border rounded-xl shadow-lg z-20 max-h-80 overflow-hidden'>
                          {/* Search Bar */}
                          <div className='p-4 border-b border-border'>
                            <div className='relative'>
                              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 w-4 h-4' />
                              <input
                                type='text'
                                placeholder='Search courses...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-background text-foreground'
                                autoComplete='off'
                              />
                            </div>
                          </div>

                          {/* Course List */}
                          <div className='max-h-60 overflow-y-auto p-2'>
                            {filteredCourses.length === 0 ? (
                              <div className='text-center py-4 text-muted-foreground'>
                                <p>No courses found</p>
                              </div>
                            ) : (
                              filteredCourses.map((course) => (
                                <Button
                                  key={course.id}
                                  variant='ghost'
                                  className={cn(
                                    "w-full justify-start p-3 h-auto mb-1 hover:bg-orange-50 dark:hover:bg-orange-900/20",
                                    course.id === selectedCourse.id &&
                                      "bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-600",
                                  )}
                                  onClick={() => handleCourseChange(course.id)}
                                >
                                  <Image
                                    src={course.imageSrc}
                                    alt={course.title}
                                    width={32}
                                    height={32}
                                    className='rounded-sm mr-3'
                                  />
                                  <span className='text-sm font-medium text-left'>
                                    {course.title}
                                  </span>
                                  {course.id === selectedCourse.id && (
                                    <div className='ml-auto'>
                                      <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
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
            <div className='mb-8'>
              <h3 className='text-lg font-semibold text-foreground mb-4 text-center'>
                Choose a Course to View Rankings
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto'>
                {courses.map((course) => (
                  <Button
                    key={course.id}
                    variant='outline'
                    className='flex items-center p-6 h-auto hover:border-orange-300 hover:bg-orange-50 transition-all group'
                    onClick={() => handleCourseChange(course.id)}
                  >
                    <Image
                      src={course.imageSrc}
                      alt={course.title}
                      width={40}
                      height={40}
                      className='rounded-lg mr-4 group-hover:scale-105 transition-transform'
                    />
                    <div className='text-left'>
                      <span className='font-medium text-foreground block'>{course.title}</span>
                      <span className='text-sm text-muted-foreground'>View rankings</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Display */}
          {selectedCourse && courseLeaderboard ? (
            <div>
              <LeaderboardList users={courseLeaderboard} />
            </div>
          ) : selectedCourseId ? (
            <div className='text-center py-12'>
              <div className='w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
              <p className='text-muted-foreground'>Loading course leaderboard...</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
