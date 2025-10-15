/**
 * Course Queries Module
 * 
 * Database queries related to courses, course progress, and course management.
 * Handles course data retrieval with progress calculations.
 */

import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import db from "@/db/drizzle";
import { 
  challengeProgress,
  courses, 
  units,
} from "@/db/schema";

// Import user queries for progress calculations
import { getUserProgress } from "./user-queries";

/**
 * Get all courses with progress information for authenticated users
 */
export const getCourses = cache(async () => {
  try {
    const { userId } = await auth();
    
    const data = await db.query.courses.findMany({
      orderBy: (courses, { asc }) => [asc(courses.title)],
    });

    if (!userId) {
      return data.map(course => ({ 
        ...course, 
        progress: null, 
        isActive: false 
      }));
    }

    const userProgressData = await getUserProgress();
    
    // Calculate progress for each course
    const coursesWithProgress = await Promise.all(
      data.map(async (course) => {
        try {
          // Get all challenges for this course
          const courseUnits = await db.query.units.findMany({
            where: eq(units.courseId, course.id),
            with: {
              lessons: {
                with: {
                  challenges: {
                    with: {
                      challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                      },
                    },
                  },
                },
              },
            },
          });

          const allChallenges = courseUnits.flatMap((unit: any) => 
            unit.lessons.flatMap((lesson: any) => lesson.challenges)
          );

          const completedChallenges = allChallenges.filter((challenge: any) =>
            challenge.challengeProgress.some((progress: any) => progress.completed === true)
          );

          const totalChallenges = allChallenges.length;
          const completedCount = completedChallenges.length;
          const percentage = totalChallenges > 0 ? Math.round((completedCount / totalChallenges) * 100) : 0;

          return {
            ...course,
            progress: {
              percentage,
              totalChallenges,
              completedChallenges: completedCount,
            },
            isActive: course.id === userProgressData?.activeCourseId,
          };
        } catch (error) {
          console.error(`Error calculating progress for course ${course.id}:`, error);
          return {
            ...course,
            progress: {
              percentage: 0,
              totalChallenges: 0,
              completedChallenges: 0,
            },
            isActive: course.id === userProgressData?.activeCourseId,
          };
        }
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
});

/**
 * Get a specific course by ID with full unit/lesson structure
 */
export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });

  return data;
});

/**
 * Get course progress for the current user's active course
 */
export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return !challenge.challengeProgress 
          || challenge.challengeProgress.length === 0 
          || challenge.challengeProgress.some((progress) => progress.completed === false)
      });
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

/**
 * Get all courses for leaderboard display (minimal data)
 */
export const getAllCoursesForLeaderboard = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const data = await db.query.courses.findMany({
    columns: {
      id: true,
      title: true,
      imageSrc: true,
    },
    orderBy: (courses, { asc }) => [asc(courses.id)],
  });

  return data;
});

/**
 * Get course by ID with full admin structure (all nested data)
 */
export const getAdminCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
            with: {
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
      },
    },
  });

  return data;
});