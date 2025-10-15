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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useIsAdmin } from "@/hooks/useIsAdmin"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

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
  const [showResetDialog, setShowResetDialog] = React.useState(false)
  const [selectedCourses, setSelectedCourses] = React.useState<number[]>([])
  const [resetAll, setResetAll] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
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

  const handleOpenResetDialog = () => {
    setShowResetDialog(true)
    setIsOpen(false)
    loadCourses()
  }

  const handleResetProgress = async () => {
    try {
      if (resetAll) {
        // Reset all progress
        if (onResetProgress) {
          onResetProgress()
        } else {
          const response = await fetch("/api/progress/reset", {
            method: "POST",
          })
          if (response.ok) {
            toast.success("All progress reset successfully!")
            window.location.reload()
          } else {
            toast.error("Failed to reset progress")
          }
        }
      } else if (selectedCourses.length > 0) {
        // Reset selected courses
        for (const courseId of selectedCourses) {
          const response = await fetch("/api/progress/reset", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ courseId }),
          })
          if (!response.ok) {
            toast.error(`Failed to reset course ${courseId}`)
            return
          }
        }
        toast.success(`Successfully reset ${selectedCourses.length} course(s)!`)
        window.location.reload()
      }
    } catch (error) {
      console.error("Error resetting progress:", error)
      toast.error("Failed to reset progress")
    }
    setShowResetDialog(false)
    setSelectedCourses([])
    setResetAll(false)
  }

  const toggleCourseSelection = (courseId: number) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    )
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
            <Button
              variant='ghost'
              className='w-full justify-start text-left h-auto py-2 px-2'
              onClick={handleOpenResetDialog}
            >
              <RotateCcw className='mr-2 h-4 w-4' />
              <span>Reset Progress</span>
            </Button>

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

      {/* Reset Progress Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className='max-w-md'>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Progress</AlertDialogTitle>
            <AlertDialogDescription>
              Choose what progress you want to reset. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className='space-y-4'>
            {/* Reset All Option */}
            <div className='flex items-center space-x-2'>
              <Button
                variant={resetAll ? "secondary" : "ghost"}
                size='sm'
                onClick={() => {
                  setResetAll(!resetAll)
                  if (!resetAll) setSelectedCourses([])
                }}
                className={cn(
                  "w-full justify-start",
                  resetAll && "bg-primary text-primary-foreground"
                )}
              >
                <BookOpen className='mr-2 h-4 w-4' />
                Reset All Courses
              </Button>
            </div>

            {/* Individual Courses */}
            {!resetAll && (
              <div className='space-y-2'>
                <p className='text-sm font-medium'>
                  Or select specific courses:
                </p>
                {loadingCourses ? (
                  <div className='text-sm text-muted-foreground'>
                    Loading courses...
                  </div>
                ) : (
                  <div className='space-y-2 max-h-48 overflow-y-auto'>
                    {courses.map((course) => (
                      <Button
                        key={course.id}
                        variant='ghost'
                        size='sm'
                        onClick={() => toggleCourseSelection(course.id)}
                        className={cn(
                          "w-full justify-start text-left",
                          selectedCourses.includes(course.id) &&
                            "bg-primary text-primary-foreground"
                        )}
                      >
                        <span className='truncate'>{course.title}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Warning */}
            {(resetAll || selectedCourses.length > 0) && (
              <div className='bg-destructive/10 border border-destructive/20 rounded-lg p-3'>
                <p className='text-sm text-destructive font-medium'>
                  ⚠️ Warning
                </p>
                <p className='text-sm text-destructive/80 mt-1'>
                  This will permanently delete:
                </p>
                <ul className='text-sm text-destructive/80 mt-1 ml-4 list-disc'>
                  <li>All completed lessons and units</li>
                  <li>Your current points and hearts</li>
                  <li>All quest completions</li>
                  <li>Your leaderboard progress</li>
                </ul>
              </div>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetProgress}
              disabled={!resetAll && selectedCourses.length === 0}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {resetAll
                ? "Reset All Progress"
                : `Reset ${selectedCourses.length} Course${
                    selectedCourses.length !== 1 ? "s" : ""
                  }`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
