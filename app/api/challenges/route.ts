import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challenges, lessons, units } from "@/db/schema";

export const GET = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");

  let whereClause = undefined;
  if (lessonId) {
    whereClause = eq(challenges.lessonId, parseInt(lessonId));
  }

  const data = await db.query.challenges.findMany({
    where: whereClause,
    orderBy: (challenges, { asc }) => [asc(challenges.order)],
    with: {
      lesson: {
        columns: {
          id: true,
          title: true,
        },
        with: {
          unit: {
            columns: {
              id: true,
              title: true,
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
        },
      },
    },
  });

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  // Create the challenge first
  const challengeData = await db.insert(challenges).values({
    lessonId: body.lessonId,
    type: body.type,
    question: body.question,
    hint: body.hint || null,
    order: body.order,
    audioSrc: body.audioSrc || null,
    imageSrc: body.imageSrc || null,
    correctAnswer: body.correctAnswer || null,
  }).returning();

  const newChallenge = challengeData[0];

  // Create challenge options if provided
  if (body.challengeOptions && body.challengeOptions.length > 0) {
    const { challengeOptions } = await import("@/db/schema");
    
    const optionsToInsert = body.challengeOptions.map((option: any) => ({
      challengeId: newChallenge.id,
      text: option.text,
      correct: option.correct || false,
      imageSrc: option.imageSrc || null,
      audioSrc: option.audioSrc || null,
      guide: option.guide || null,
      order: option.order || null,
      value: option.value || null,
    }));

    await db.insert(challengeOptions).values(optionsToInsert);
  }

  return NextResponse.json(newChallenge);
};
