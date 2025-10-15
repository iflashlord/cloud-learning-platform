"use client"

import * as React from "react"
import {
  Settings,
  RotateCcw,
  Shield,
  Crown,
  BookOpen,
  ChevronDown,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useIsAdmin } from "@/hooks/useIsAdmin"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

interface SettingsDropdownProps {
  onResetProgress?: () => void
  onToggleProMode?: () => void
  isProMode?: boolean
}

export const SettingsDropdown = ({
  onResetProgress,
  onToggleProMode,
  isProMode = false,
}: SettingsDropdownProps) => {
  const { isAdmin, isLoggedIn } = useIsAdmin()
  const { user } = useUser()
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [courses, setCourses] = React.useState<
    Array<{ id: number; title: string }>
  >([])
  const [loadingCourses, setLoadingCourses] = React.useState(false)
  const [showResetSubmenu, setShowResetSubmenu] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setShowResetSubmenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Load courses when opening reset submenu
  const loadCourses = async () => {
    if (courses.length > 0) return // Already loaded

    setLoadingCourses(true)
    try {
      const response = await fetch("/api/courses")
      if (response.ok) {
        const data = await response.json()
        setCourses(
          data.map((course: any) => ({
            id: course.id,
            title: course.title,
          }))
        )
      }
    } catch (error) {
      console.error("Failed to load courses:", error)
    } finally {
      setLoadingCourses(false)
    }
  }

  const handleResetProgress = () => {
    if (onResetProgress) {
      onResetProgress()
    }
    setIsOpen(false)
    setShowResetSubmenu(false)
  }

  const handleResetSpecificCourse = async (courseId: number) => {
    try {
      const response = await fetch("/api/progress/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      })

      if (response.ok) {
        window.location.reload()
      } else {
        console.error("Failed to reset course progress")
      }
    } catch (error) {
      console.error("Error resetting course progress:", error)
    }
    setIsOpen(false)
    setShowResetSubmenu(false)
  }

  if (!isLoggedIn) {
    return null // Don't show settings for non-logged in users
  }

  return (
    <div className='relative' ref={dropdownRef}>
      <Button
        variant='ghost'
        size='sm'
        className='h-8 w-8 p-0 hover:bg-muted/80'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className='h-4 w-4' />
        <span className='sr-only'>Settings</span>
      </Button>

      {isOpen && (
        <Card className='absolute right-0 top-full mt-2 w-56 p-2 shadow-lg z-50 bg-background/95 backdrop-blur-sm border border-border/50'>
          <div className='space-y-1'>
            {/* Header */}
            <div className='px-2 py-1.5'>
              <p className='text-sm font-medium'>Settings</p>
              <p className='text-xs text-muted-foreground'>
                {user?.firstName || "User"}
              </p>
            </div>

            <div className='h-px bg-border my-1' />

            {/* Reset Progress */}
            <div className='relative'>
              <Button
                variant='ghost'
                className='w-full justify-between text-left h-auto py-2 px-2'
                onClick={() => {
                  setShowResetSubmenu(!showResetSubmenu)
                  if (!showResetSubmenu) loadCourses()
                }}
              >
                <div className='flex items-center'>
                  <RotateCcw className='mr-2 h-4 w-4' />
                  <span>Reset Progress</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    showResetSubmenu && "rotate-180"
                  )}
                />
              </Button>

              {showResetSubmenu && (
                <Card className='absolute left-full top-0 ml-2 w-48 p-2 shadow-lg bg-background/95 backdrop-blur-sm border border-border/50'>
                  <div className='space-y-1'>
                    <Button
                      variant='ghost'
                      className='w-full justify-start text-left h-auto py-2 px-2'
                      onClick={handleResetProgress}
                    >
                      <BookOpen className='mr-2 h-4 w-4' />
                      <span>All Courses</span>
                    </Button>

                    <div className='h-px bg-border my-1' />

                    {loadingCourses ? (
                      <div className='px-2 py-1 text-xs text-muted-foreground'>
                        Loading courses...
                      </div>
                    ) : (
                      courses.map((course) => (
                        <Button
                          key={course.id}
                          variant='ghost'
                          className='w-full justify-start text-left h-auto py-2 px-2'
                          onClick={() => handleResetSpecificCourse(course.id)}
                        >
                          <span className='text-sm truncate'>
                            {course.title}
                          </span>
                        </Button>
                      ))
                    )}
                  </div>
                </Card>
              )}
            </div>

            {/* Admin-only options */}
            {isAdmin && (
              <>
                <div className='h-px bg-border my-1' />

                <Button
                  variant='ghost'
                  className='w-full justify-start text-left h-auto py-2 px-2'
                  onClick={() => {
                    router.push("/admin")
                    setIsOpen(false)
                  }}
                >
                  <Shield className='mr-2 h-4 w-4' />
                  <span>Admin Panel</span>
                </Button>

                <Button
                  variant='ghost'
                  className='w-full justify-start text-left h-auto py-2 px-2'
                  onClick={() => {
                    if (onToggleProMode) onToggleProMode()
                    setIsOpen(false)
                  }}
                >
                  <Crown
                    className={cn(
                      "mr-2 h-4 w-4",
                      isProMode ? "text-yellow-500" : "text-muted-foreground"
                    )}
                  />
                  <span>Switch to {isProMode ? "Free" : "Pro"} Mode</span>
                </Button>
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
