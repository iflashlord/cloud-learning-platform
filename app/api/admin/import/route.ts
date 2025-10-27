import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import db from "@/db/drizzle";
import { courses, units, lessons, challenges, challengeOptions } from "@/db/schema";

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    
    if (!body.data || !body.data.courses) {
      return new NextResponse("Invalid import format", { status: 400 });
    }

    const importData = body.data.courses;
    const results = {
      coursesImported: 0,
      unitsImported: 0,
      lessonsImported: 0,
      challengesImported: 0,
      optionsImported: 0,
    };

    await db.transaction(async (tx) => {
      // Import each course with its nested data
      for (const courseData of importData) {
        // Insert course
        const [newCourse] = await tx
          .insert(courses)
          .values({
            title: courseData.title,
            imageSrc: courseData.imageSrc,
            category: courseData.category ?? "General",
            description: courseData.description ?? null,
            level: courseData.level ?? "Beginner",
            duration: courseData.duration ?? null,
            themeConfig: courseData.themeConfig ?? null,
          })
          .returning();

        results.coursesImported++;

        // Import units
        for (const unitData of courseData.units || []) {
          const [newUnit] = await tx
            .insert(units)
            .values({
              title: unitData.title,
              description: unitData.description ?? "",
              courseId: newCourse.id,
              order: unitData.order ?? 0,
            })
            .returning();

          results.unitsImported++;

          // Import lessons
          for (const lessonData of unitData.lessons || []) {
            const [newLesson] = await tx
              .insert(lessons)
              .values({
                title: lessonData.title,
                unitId: newUnit.id,
                order: lessonData.order ?? 0,
              })
              .returning();

            results.lessonsImported++;

            // Import challenges
            for (const challengeData of lessonData.challenges || []) {
              const [newChallenge] = await tx
                .insert(challenges)
                .values({
                  lessonId: newLesson.id,
                  type: challengeData.type,
                  question: challengeData.question,
                  hint: challengeData.hint ?? null,
                  order: challengeData.order ?? 0,
                  audioSrc: challengeData.audioSrc ?? null,
                  imageSrc: challengeData.imageSrc ?? null,
                  videoSrc: challengeData.videoSrc ?? null,
                  correctAnswer: challengeData.correctAnswer ?? null,
                  chestId: null,
                })
                .returning();

              results.challengesImported++;

              // Import challenge options
              for (const optionData of challengeData.challengeOptions || []) {
                await tx.insert(challengeOptions).values({
                  challengeId: newChallenge.id,
                  text: optionData.text ?? "",
                  correct: Boolean(optionData.correct),
                  imageSrc: optionData.imageSrc ?? null,
                  audioSrc: optionData.audioSrc ?? null,
                  guide: optionData.guide ?? null,
                  order: optionData.order ?? 0,
                  value: optionData.value ?? null,
                });

                results.optionsImported++;
              }
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: "Import completed successfully",
      results,
    });
  } catch (error) {
    console.error("Import error:", error);
    return new NextResponse(`Import failed: ${error}`, { status: 500 });
  }
};
