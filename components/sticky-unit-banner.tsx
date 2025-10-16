"use client"

import React, { useEffect, useState, useRef } from "react"
import { BookOpen, Target, Award, NotebookText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Global state to track the currently active sticky unit
let currentActiveUnit: number | null = null
let stickyUpdateCallbacks: Array<(unitId: number | null) => void> = []

const registerStickyCallback = (callback: (unitId: number | null) => void) => {
  stickyUpdateCallbacks.push(callback)
  return () => {
    stickyUpdateCallbacks = stickyUpdateCallbacks.filter(
      (cb) => cb !== callback
    )
  }
}

const updateActiveUnit = (unitId: number | null) => {
  if (currentActiveUnit !== unitId) {
    currentActiveUnit = unitId
    stickyUpdateCallbacks.forEach((callback) => callback(unitId))
  }
}

type Props = {
  unitId: number
  title: string
  description: string
  lessonCount?: number
  completedLessons?: number
  isCompleted?: boolean
}

export const StickyUnitBanner = ({
  unitId,
  title,
  description,
  lessonCount = 0,
  completedLessons = 0,
  isCompleted = false,
}: Props) => {
  const [activeUnitId, setActiveUnitId] = useState<number | null>(null)
  const [isUnitVisible, setIsUnitVisible] = useState(true)
  const originalBannerRef = useRef<HTMLDivElement>(null)
  const unitContainerRef = useRef<HTMLDivElement>(null)

  const progress =
    lessonCount > 0 ? Math.round((completedLessons / lessonCount) * 100) : 0
  const isCurrentUnitSticky = activeUnitId === unitId

  useEffect(() => {
    const unregister = registerStickyCallback(setActiveUnitId)

    const bannerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsUnitVisible(entry.isIntersecting)

        if (!entry.isIntersecting && currentActiveUnit === null) {
          updateActiveUnit(unitId)
        } else if (entry.isIntersecting && currentActiveUnit === unitId) {
          updateActiveUnit(null)
        }
      },
      {
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px", // Account for top navigation
      }
    )

    const unitObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          if (!isUnitVisible) {
            updateActiveUnit(unitId)
          }
        }
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: "-80px 0px -20% 0px",
      }
    )

    if (originalBannerRef.current) {
      bannerObserver.observe(originalBannerRef.current)
    }

    if (unitContainerRef.current) {
      unitObserver.observe(unitContainerRef.current)
    }

    return () => {
      bannerObserver.disconnect()
      unitObserver.disconnect()
      unregister()
    }
  }, [unitId, isUnitVisible])

  const BannerContent = ({ isCompact = false }: { isCompact?: boolean }) => (
    <div
      className={cn(
        "w-full rounded-xl text-white flex items-center justify-between relative overflow-hidden transition-all duration-300",
        isCompact ? "p-3" : "p-6 hover:shadow-lg",
        isCompleted
          ? "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500"
          : "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
      )}
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent'></div>

      {/* Decorative Elements */}
      {!isCompact && (
        <div className='absolute top-4 right-4 opacity-20'>
          {isCompleted ? (
            <Award className='w-8 h-8' />
          ) : (
            <Target className='w-8 h-8' />
          )}
        </div>
      )}

      <div
        className={cn(
          "flex-1 relative z-10",
          isCompact ? "space-y-1" : "space-y-3"
        )}
      >
        <div className='flex items-center gap-3'>
          <div
            className={cn(
              "rounded-xl flex items-center justify-center shadow-lg",
              isCompact ? "w-8 h-8" : "w-12 h-12",
              isCompleted ? "bg-green-600" : "bg-blue-600"
            )}
          >
            <BookOpen className={cn(isCompact ? "w-4 h-4" : "w-6 h-6")} />
          </div>
          <div>
            <h3
              className={cn(
                "font-bold mb-1",
                isCompact ? "text-lg" : "text-2xl"
              )}
            >
              {title}
            </h3>
            {isCompleted && !isCompact && (
              <div className='flex items-center gap-2 text-green-200'>
                <Award className='w-4 h-4' />
                <span className='text-sm font-medium'>Unit Completed!</span>
              </div>
            )}
          </div>
        </div>

        {!isCompact && (
          <p className='text-lg opacity-90 leading-relaxed'>{description}</p>
        )}

        {/* Progress Info */}
        {lessonCount > 0 && (
          <div
            className={cn(
              "flex items-center gap-4",
              isCompact ? "mt-1" : "mt-4"
            )}
          >
            <div className='bg-white/20 rounded-lg px-2 py-1 backdrop-blur-sm'>
              <div
                className={cn("font-medium", isCompact ? "text-xs" : "text-sm")}
              >
                Progress
              </div>
              <div
                className={cn("font-bold", isCompact ? "text-sm" : "text-lg")}
              >
                {progress}%
              </div>
            </div>
            <div className='bg-white/20 rounded-lg px-2 py-1 backdrop-blur-sm'>
              <div
                className={cn("font-medium", isCompact ? "text-xs" : "text-sm")}
              >
                Lessons
              </div>
              <div
                className={cn("font-bold", isCompact ? "text-sm" : "text-lg")}
              >
                {completedLessons}/{lessonCount}
              </div>
            </div>
            <div className='flex-1 bg-white/20 rounded-full h-2 backdrop-blur-sm'>
              <div
                className='bg-white h-2 rounded-full transition-all duration-500'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {!isCompact && (
        <Link href='/lesson'>
          <Button
            size='lg'
            variant='secondary'
            className='flex border-2 border-b-4 active:border-b-2 bg-card text-foreground hover:bg-muted font-bold shadow-lg hover:shadow-xl transition-all duration-200 relative z-10'
          >
            <NotebookText className='mr-2' />
            {isCompleted ? "Review" : "Continue"}
          </Button>
        </Link>
      )}
    </div>
  )

  return (
    <div ref={unitContainerRef}>
      <div ref={originalBannerRef}>
        <BannerContent />
      </div>

      {isCurrentUnitSticky && (
        <div
          className={cn(
            "fixed top-[60px] left-0 right-0 z-40 mx-4 transition-all duration-300 ease-in-out",
            "translate-y-0 opacity-100"
          )}
          style={{
            maxWidth: "calc(100vw - 2rem)",
            left: "1rem",
            right: "1rem",
          }}
        >
          <div className='backdrop-blur-lg bg-background/80 rounded-xl p-2 border border-border/50 shadow-lg'>
            <BannerContent isCompact />
          </div>
        </div>
      )}
    </div>
  )
}
