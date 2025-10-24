import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "../db/schema"
import { courseSeeds } from "./seeds/courses"

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

const resetTables = async () => {
  await db.delete(schema.challengeOptions)
  await db.delete(schema.challengeProgress)
  await db.delete(schema.challenges)
  await db.delete(schema.lessons)
  await db.delete(schema.units)
  await db.delete(schema.userSubscription)
  await db.delete(schema.userProgress)
  await db.delete(schema.courses)
}

const seed = async () => {
  try {
    console.log("Seeding database")
    await resetTables()

    for (const course of courseSeeds) {
      await db.insert(schema.courses).values({
        id: course.id,
        title: course.title,
        imageSrc: course.imageSrc,
        category: course.category,
        description: course.description,
        level: course.level,
        duration: course.duration,
      })

      for (const unit of course.units) {
        const [unitRecord] = await db
          .insert(schema.units)
          .values({
            title: unit.title,
            description: unit.description,
            order: unit.order,
            courseId: course.id,
          })
          .returning({ id: schema.units.id })

        for (const lesson of unit.lessons) {
          const [lessonRecord] = await db
            .insert(schema.lessons)
            .values({
              title: lesson.title,
              order: lesson.order,
              unitId: unitRecord.id,
            })
            .returning({ id: schema.lessons.id })

          for (const challenge of lesson.challenges) {
            const { options = [], ...challengeData } = challenge
            const [challengeRecord] = await db
              .insert(schema.challenges)
              .values({
                lessonId: lessonRecord.id,
                type: challengeData.type,
                order: challengeData.order,
                question: challengeData.question,
                hint: challengeData.hint ?? null,
                audioSrc: challengeData.audioSrc ?? null,
                videoSrc: challengeData.videoSrc ?? null,
                correctAnswer: challengeData.correctAnswer ?? null,
              })
              .returning({ id: schema.challenges.id })

            if (options.length > 0) {
              await db.insert(schema.challengeOptions).values(
                options.map((option, index) => ({
                  challengeId: challengeRecord.id,
                  text: option.text,
                  correct: option.correct ?? false,
                  imageSrc: option.imageSrc ?? null,
                  audioSrc: option.audioSrc ?? null,
                  guide: option.guide ?? null,
                  order: option.order ?? index + 1,
                  value: option.value ?? null,
                })),
              )
            }
          }
        }
      }
    }

    console.log("Seeding finished")
  } catch (error) {
    console.error(error)
    throw new Error("Failed to seed the database")
  }
}

seed()
