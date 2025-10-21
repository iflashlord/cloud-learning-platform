/**
 * Review Queries Module
 *
 * Database queries related to lesson review, completion tracking, and AI conversations.
 * Handles fetching completed lessons for review and managing AI chat history.
 */

import { cache } from "react"
import { desc, eq, and, sql } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

import db from "@/db/drizzle"
import {
  lessonCompletions,
  aiConversations,
  aiMessages,
  lessons,
  units,
  courses,
  challenges,
  challengeOptions,
  challengeProgress,
} from "@/db/schema"

/**
 * Backfill lesson completions for lessons that were completed before tracking was added
 * This identifies lessons where all challenges are completed but no lessonCompletion record exists
 */
export const backfillLessonCompletions = cache(async () => {
  const { userId } = await auth()

  if (!userId) {
    return { backfilled: 0 }
  }

  // Get all lessons with their challenges and user's progress
  const lessonsWithProgress = await db.query.lessons.findMany({
    with: {
      challenges: {
        with: {
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
      unit: {
        with: {
          course: true,
        },
      },
    },
  })

  const completedLessonsToBackfill = []

  for (const lesson of lessonsWithProgress) {
    // Check if this lesson already has a completion record
    const existingCompletion = await db.query.lessonCompletions.findFirst({
      where: and(eq(lessonCompletions.userId, userId), eq(lessonCompletions.lessonId, lesson.id)),
    })

    if (existingCompletion) {
      continue // Already tracked
    }

    // Check if all challenges in this lesson are completed
    const allChallengesCompleted =
      lesson.challenges.length > 0 &&
      lesson.challenges.every(
        (challenge) =>
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed),
      )

    if (allChallengesCompleted) {
      const totalChallenges = lesson.challenges.length
      const correctAnswers = totalChallenges // Assume all correct for backfill

      completedLessonsToBackfill.push({
        userId,
        lessonId: lesson.id,
        score: 100, // Assume perfect for backfilled lessons
        totalChallenges,
        correctAnswers,
        completedAt: new Date(), // Use current time for backfill
        timeSpent: 0,
        wasPerfect: true, // Assume perfect for backfilled lessons
        attemptsCount: 1,
      })
    }
  }

  // Insert all backfilled completions
  if (completedLessonsToBackfill.length > 0) {
    await db.insert(lessonCompletions).values(completedLessonsToBackfill)
  }

  return { backfilled: completedLessonsToBackfill.length }
})

/**
 * Get all completed lessons for the current user for review
 */
export const getCompletedLessonsForReview = cache(async () => {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  const data = await db.query.lessonCompletions.findMany({
    where: eq(lessonCompletions.userId, userId),
    orderBy: desc(lessonCompletions.completedAt),
    with: {
      lesson: {
        with: {
          unit: {
            with: {
              course: {
                columns: {
                  id: true,
                  title: true,
                  imageSrc: true,
                },
              },
            },
          },
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeOptions: {
                orderBy: (challengeOptions, { asc }) => [asc(challengeOptions.order)],
              },
            },
          },
        },
      },
    },
  })

  return data
})

/**
 * Get detailed lesson review data with all challenges and user's answers
 */
export const getLessonReviewData = cache(async (lessonId: number) => {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  // Get lesson completion data
  const completion = await db.query.lessonCompletions.findFirst({
    where: and(eq(lessonCompletions.userId, userId), eq(lessonCompletions.lessonId, lessonId)),
    orderBy: desc(lessonCompletions.completedAt), // Get most recent completion
  })

  if (!completion) {
    return null
  }

  // Get full lesson data with challenges and user progress
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      unit: {
        with: {
          course: true,
        },
      },
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: {
            orderBy: (challengeOptions, { asc }) => [asc(challengeOptions.order)],
          },
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  })

  if (!lesson) {
    return null
  }

  return {
    completion,
    lesson,
  }
})

/**
 * Get AI conversations for a specific lesson completion
 */
export const getAIConversations = cache(async (lessonCompletionId: number) => {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  const conversations = await db.query.aiConversations.findMany({
    where: and(
      eq(aiConversations.userId, userId),
      eq(aiConversations.lessonCompletionId, lessonCompletionId),
    ),
    orderBy: desc(aiConversations.updatedAt),
    with: {
      messages: {
        orderBy: (messages, { asc }) => [asc(messages.createdAt)],
      },
    },
  })

  return conversations
})

/**
 * Get a specific AI conversation with all messages
 */
export const getAIConversation = cache(async (conversationId: number) => {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const conversation = await db.query.aiConversations.findFirst({
    where: and(eq(aiConversations.id, conversationId), eq(aiConversations.userId, userId)),
    with: {
      messages: {
        orderBy: (messages, { asc }) => [asc(messages.createdAt)],
      },
      lessonCompletion: {
        with: {
          lesson: {
            with: {
              unit: {
                with: {
                  course: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return conversation
})

/**
 * Get lesson completion statistics for the current user
 */
export const getLessonCompletionStats = cache(async () => {
  const { userId } = await auth()

  if (!userId) {
    return {
      totalCompleted: 0,
      perfectLessons: 0,
      averageScore: 0,
      totalTimeSpent: 0,
    }
  }

  const completions = await db.query.lessonCompletions.findMany({
    where: eq(lessonCompletions.userId, userId),
  })

  const totalCompleted = completions.length
  const perfectLessons = completions.filter((c) => c.wasPerfect).length
  const totalScore = completions.reduce((sum, c) => sum + c.score, 0)
  const averageScore = totalCompleted > 0 ? Math.round(totalScore / totalCompleted) : 0
  const totalTimeSpent = completions.reduce((sum, c) => sum + (c.timeSpent || 0), 0)

  return {
    totalCompleted,
    perfectLessons,
    averageScore,
    totalTimeSpent,
  }
})

/**
 * Check if user has completed a specific lesson
 */
export const hasCompletedLesson = cache(async (lessonId: number) => {
  const { userId } = await auth()

  if (!userId) {
    return false
  }

  const completion = await db.query.lessonCompletions.findFirst({
    where: and(eq(lessonCompletions.userId, userId), eq(lessonCompletions.lessonId, lessonId)),
  })

  return !!completion
})
