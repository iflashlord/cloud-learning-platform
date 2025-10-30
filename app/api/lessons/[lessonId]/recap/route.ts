import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

import db from "@/db/drizzle"
import { lessons } from "@/db/schema"
import { getUserProgress, hasCompletedLesson } from "@/db/queries"

export const GET = async (
  _req: Request,
  { params }: { params: { lessonId: string } },
) => {
    const lessonId = Number.parseInt(params.lessonId, 10)

    if (Number.isNaN(lessonId)) {
      return NextResponse.json({ error: "Invalid lesson id" }, { status: 400 })
    }

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userProgress = await getUserProgress()

    if (!userProgress?.activeCourseId) {
      return NextResponse.json({ error: "No active course" }, { status: 403 })
    }

    const lesson = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonId),
      columns: {
        id: true,
        title: true,
        order: true,
        unitId: true,
      },
      with: {
        unit: {
          columns: {
            id: true,
            title: true,
            courseId: true,
          },
          with: {
            course: {
              columns: {
                id: true,
                title: true,
              },
            },
          },
        },
        challenges: {
          columns: {
            id: true,
            order: true,
            type: true,
            question: true,
            hint: true,
            correctAnswer: true,
          },
          orderBy: (tbl, { asc }) => [asc(tbl.order)],
          with: {
            challengeOptions: {
              columns: {
                id: true,
                text: true,
                value: true,
                correct: true,
                order: true,
              },
              orderBy: (tbl, { asc }) => [asc(tbl.order)],
            },
          },
        },
      },
    })

    if (!lesson || lesson.unit?.courseId !== userProgress.activeCourseId) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 })
    }

    // Ensure the learner has completed this lesson at least once
    const completedLesson = await hasCompletedLesson(lessonId)

    if (!completedLesson) {
      return NextResponse.json(
        { error: "Lesson recap is available after completing the lesson once." },
        { status: 403 },
      )
    }

    const lessonChallenges = lesson.challenges.map((challenge) => {
      const options = challenge.challengeOptions ?? []

      const optionAnswers = options
        .filter((option) => option.correct)
        .map((option) => option.text?.trim() || option.value?.trim())
        .filter((answer): answer is string => Boolean(answer && answer.length > 0))

      const fallbackAnswers = challenge.correctAnswer?.trim()
        ? [challenge.correctAnswer.trim()]
        : []

      return {
        id: challenge.id,
        order: challenge.order,
        type: challenge.type,
        question: challenge.question,
        hint: challenge.hint,
        answers: [...optionAnswers, ...fallbackAnswers],
      }
    })

    const payload = {
      id: lesson.id,
      title: lesson.title,
      order: lesson.order,
      unit: lesson.unit
        ? {
            id: lesson.unit.id,
            title: lesson.unit.title,
            course: lesson.unit.course
              ? {
                  id: lesson.unit.course.id,
                  title: lesson.unit.course.title,
                }
              : null,
          }
        : null,
      challenges: lessonChallenges,
    }

    return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } })
}
