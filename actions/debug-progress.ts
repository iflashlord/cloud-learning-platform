"use server"

import { auth } from "@clerk/nextjs/server"
import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { challengeProgress, challenges, lessons } from "@/db/schema"

export const debugUserProgress = async () => {
  const { userId } = await auth()

  if (!userId) {
    return { error: "No user logged in" }
  }

  // Get all challenge progress for this user
  const userChallengeProgress = await db.query.challengeProgress.findMany({
    where: eq(challengeProgress.userId, userId),
    with: {
      challenge: {
        with: {
          lesson: {
            columns: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  })

  // Group by lesson
  const lessonProgress: Record<number, any> = {}

  for (const progress of userChallengeProgress) {
    const lessonId = progress.challenge.lessonId
    if (!lessonId) continue // Skip if no lesson ID

    if (!lessonProgress[lessonId]) {
      lessonProgress[lessonId] = {
        lessonId,
        lessonTitle: progress.challenge.lesson?.title || "Unknown",
        totalChallenges: 0,
        completedChallenges: 0,
        challenges: [],
      }
    }

    lessonProgress[lessonId].totalChallenges++
    if (progress.completed) {
      lessonProgress[lessonId].completedChallenges++
    }
    lessonProgress[lessonId].challenges.push({
      challengeId: progress.challengeId,
      completed: progress.completed,
    })
  }

  return {
    userId,
    totalChallengeProgress: userChallengeProgress.length,
    lessonProgress: Object.values(lessonProgress),
  }
}
