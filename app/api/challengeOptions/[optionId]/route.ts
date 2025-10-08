import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challengeOptions } from "@/db/schema";

export const GET = async (
  req: Request,
  { params }: { params: { optionId: string } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const option = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, parseInt(params.optionId)),
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

  if (!option) {
    return new NextResponse("Challenge option not found", { status: 404 });
  }

  return NextResponse.json(option);
};

export const PUT = async (
  req: Request,
  { params }: { params: { optionId: string } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(challengeOptions)
    .set({
      challengeId: body.challengeId,
      text: body.text,
      correct: body.correct,
      imageSrc: body.imageSrc || null,
      audioSrc: body.audioSrc || null,
      guide: body.guide || null,
      order: body.order || null,
      value: body.value || null,
    })
    .where(eq(challengeOptions.id, parseInt(params.optionId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { optionId: string } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await db.delete(challengeOptions).where(eq(challengeOptions.id, parseInt(params.optionId)));

  return new NextResponse(null, { status: 204 });
};