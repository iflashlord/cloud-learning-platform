import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

import db from "@/db/drizzle"
import { challengeOptions, challenges, lessons, units } from "@/db/schema"
import { getUserProgress } from "@/db/queries"

export const GET = async (
  _req: Request,
  { params }: { params: { unitId: string } },
) => {
  const unitId = Number.parseInt(params.unitId, 10)

  if (Number.isNaN(unitId)) {
    return NextResponse.json(
      { error: "Invalid unit id" },
      { status: 400 },
    )
  }

  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    )
  }

  const userProgress = await getUserProgress()

  if (!userProgress?.activeCourseId) {
    return NextResponse.json(
      { error: "No active course" },
      { status: 403 },
    )
  }

  const unit = await db.query.units.findFirst({
    where: eq(units.id, unitId),
    columns: {
      id: true,
      title: true,
      description: true,
      courseId: true,
    },
    with: {
      lessons: {
        columns: {
          id: true,
          title: true,
          order: true,
        },
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            columns: {
              id: true,
              type: true,
              question: true,
              hint: true,
              order: true,
              correctAnswer: true,
            },
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeOptions: {
                columns: {
                  id: true,
                  text: true,
                  correct: true,
                  order: true,
                  value: true,
                },
                orderBy: (challengeOptions, { asc }) => [asc(challengeOptions.order)],
              },
            },
          },
        },
      },
    },
  })

  if (!unit || unit.courseId !== userProgress.activeCourseId) {
    return NextResponse.json(
      { error: "Unit not found" },
      { status: 404 },
    )
  }

  const payload = {
    id: unit.id,
    title: unit.title,
    description: unit.description,
    lessons: unit.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      order: lesson.order,
      challenges: lesson.challenges.map((challenge) => {
        const options = challenge.challengeOptions ?? []

        const derivedAnswers = options
          .filter((option) => option.correct)
          .map((option) => option.text?.trim() || option.value?.trim())
          .filter((answer): answer is string => Boolean(answer && answer.length > 0))

        const fallbackAnswers = challenge.correctAnswer
          ? [challenge.correctAnswer.trim()]
          : []

        return {
          id: challenge.id,
          type: challenge.type,
          question: challenge.question,
          hint: challenge.hint,
          order: challenge.order,
          answers: [...derivedAnswers, ...fallbackAnswers],
          options: options.map((option) => ({
            id: option.id,
            text: option.text,
            correct: option.correct,
            order: option.order,
            value: option.value,
          })),
        }
      }),
    })),
  }

  return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } })
}
