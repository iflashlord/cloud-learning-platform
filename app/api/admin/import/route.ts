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

    // Import each course with its nested data
    for (const courseData of importData) {
      // Insert course
      const [newCourse] = await db.insert(courses).values({
        title: courseData.title,
        imageSrc: courseData.imageSrc,
      }).returning();
      
      results.coursesImported++;

      // Import units
      for (const unitData of courseData.units || []) {
        const [newUnit] = await db.insert(units).values({
          title: unitData.title,
          description: unitData.description,
          courseId: newCourse.id,
          order: unitData.order,
        }).returning();
        
        results.unitsImported++;

        // Import lessons
        for (const lessonData of unitData.lessons || []) {
          const [newLesson] = await db.insert(lessons).values({
            title: lessonData.title,
            unitId: newUnit.id,
            order: lessonData.order,
          }).returning();
          
          results.lessonsImported++;

          // Import challenges
          for (const challengeData of lessonData.challenges || []) {
            const [newChallenge] = await db.insert(challenges).values({
              lessonId: newLesson.id,
              type: challengeData.type,
              question: challengeData.question,
              order: challengeData.order,
            }).returning();
            
            results.challengesImported++;

            // Import challenge options
            for (const optionData of challengeData.challengeOptions || []) {
              await db.insert(challengeOptions).values({
                challengeId: newChallenge.id,
                text: optionData.text,
                correct: optionData.correct,
                imageSrc: optionData.imageSrc,
                audioSrc: optionData.audioSrc,
              });
              
              results.optionsImported++;
            }
          }
        }
      }
    }

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