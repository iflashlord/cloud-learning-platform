import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: { challengeId: string } },
) => {
  if (!isAdmin()) {
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
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();
  const data = await db.update(challenges).set({
    lessonId: body.lessonId,
    type: body.type,
    question: body.question,
    hint: body.hint || null,
    order: body.order,
  }).where(eq(challenges.id, parseInt(params.challengeId))).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { challengeId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.delete(challenges)
    .where(eq(challenges.id, parseInt(params.challengeId))).returning();

  return NextResponse.json(data[0]);
};
