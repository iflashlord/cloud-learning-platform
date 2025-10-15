import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import db from "@/db/drizzle"
import {
  userProgress,
  challengeProgress,
  challenges,
  lessons,
  units,
} from "@/db/schema"
import { eq, and, inArray } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const { courseId } = body

    if (courseId) {
      // Reset progress for specific course

      // Get all challenge IDs for this course
      const courseUnits = await db.query.units.findMany({
        where: eq(units.courseId, courseId),
        with: {
          lessons: {
            with: {
              challenges: {
                columns: {
                  id: true,
                },
              },
            },
          },
        },
      })

      const challengeIds = courseUnits.flatMap((unit) =>
        unit.lessons.flatMap((lesson) =>
          lesson.challenges.map((challenge) => challenge.id)
        )
      )

      if (challengeIds.length > 0) {
        // Delete challenge progress for this course only
        await db
          .delete(challengeProgress)
          .where(
            and(
              eq(challengeProgress.userId, userId),
              inArray(challengeProgress.challengeId, challengeIds)
            )
          )
      }

      return NextResponse.json({
        success: true,
        message: `Reset progress for course (${challengeIds.length} challenges)`,
      })
    } else {
      // Reset all progress (original behavior)

      // Reset user progress (hearts and points)
      await db
        .update(userProgress)
        .set({
          hearts: 5,
          points: 0,
        })
        .where(eq(userProgress.userId, userId))

      // Delete all challenge progress
      await db
        .delete(challengeProgress)
        .where(eq(challengeProgress.userId, userId))

      return NextResponse.json({
        success: true,
        message: "Reset all progress",
      })
    }
  } catch (error) {
    console.error("Failed to reset progress:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
