"use client"

import { useState, useEffect, useCallback } from "react"

type UserProgressData = {
  activeCourse: {
    id: number
    title: string
    imageSrc: string
  }
  hearts: number
  points: number
  gems: number
  streak: number
  totalXpEarned: number
}

export const useUserProgress = (initialData?: Partial<UserProgressData>) => {
  const [data, setData] = useState<UserProgressData | null>(
    initialData
      ? {
          activeCourse: {
            id: initialData.activeCourse?.id || 0,
            title: initialData.activeCourse?.title || "No Course",
            imageSrc: initialData.activeCourse?.imageSrc || "/placeholder.svg",
          },
          hearts: initialData.hearts || 0,
          points: initialData.points || 0,
          gems: initialData.gems || 0,
          streak: initialData.streak || 0,
          totalXpEarned: initialData.totalXpEarned || 0,
        }
      : null,
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUserProgress = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/user/progress")

      if (!response.ok) {
        throw new Error(`Failed to fetch user progress: ${response.status}`)
      }

      const userData = await response.json()
      setData(userData)
    } catch (err) {
      console.error("Error fetching user progress:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch user progress")
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshUserProgress = useCallback(() => {
    fetchUserProgress()
  }, [fetchUserProgress])

  // Fetch data on mount if no initial data provided
  useEffect(() => {
    if (!initialData) {
      fetchUserProgress()
    }
  }, [initialData, fetchUserProgress])

  return {
    data,
    loading,
    error,
    refresh: refreshUserProgress,
  }
}
