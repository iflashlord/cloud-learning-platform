import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { challenges, challengeOptions } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: { challengeId: string } },
) => {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, parseInt(params.challengeId)),
    with: {
      challengeOptions: true,
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

  if (!data) {
    return new NextResponse("Challenge not found", { status: 404 });
  }

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { challengeId: string } },
) => {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();
  const challengeId = parseInt(params.challengeId);
  
  // Update the challenge
  const data = await db.update(challenges).set({
    lessonId: body.lessonId,
    type: body.type,
    question: body.question,
    hint: body.hint || null,
    order: body.order,
    audioSrc: body.audioSrc || null,
    imageSrc: body.imageSrc || null,
    videoSrc: body.videoSrc || null,
    correctAnswer: body.correctAnswer || null,
  }).where(eq(challenges.id, challengeId)).returning();

  // Update challenge options if provided
  if (body.challengeOptions && body.challengeOptions.length > 0) {
    // Delete existing options
    await db.delete(challengeOptions).where(eq(challengeOptions.challengeId, challengeId));
    
    // Insert new options
    const optionsToInsert = body.challengeOptions.map((option: any) => ({
      challengeId: challengeId,
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

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { challengeId: string } },
) => {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const challengeId = parseInt(params.challengeId);
  try {
    await db.delete(challengeOptions).where(eq(challengeOptions.challengeId, challengeId));

    const data = await db
      .delete(challenges)
      .where(eq(challenges.id, challengeId))
      .returning();

    if (!data.length) {
      return new NextResponse("Challenge not found", { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("[DELETE_CHALLENGE]", error);
    return new NextResponse("Failed to delete challenge", { status: 500 });
  }
};
