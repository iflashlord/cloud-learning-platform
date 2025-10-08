import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challengeOptions } from "@/db/schema";

export const GET = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.challengeOptions.findMany({
    with: {
      challenge: {
        columns: {
          id: true,
          question: true,
        },
        with: {
          lesson: {
            columns: {
              id: true,
              title: true,
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

  const data = await db.insert(challengeOptions).values({
    challengeId: body.challengeId,
    text: body.text,
    correct: body.correct,
    imageSrc: body.imageSrc || null,
    audioSrc: body.audioSrc || null,
    guide: body.guide || null,
    order: body.order || null,
    value: body.value || null,
  }).returning();

  return NextResponse.json(data[0]);
};
