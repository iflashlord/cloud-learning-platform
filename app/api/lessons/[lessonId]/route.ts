import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: { lessonId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, parseInt(params.lessonId)),
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
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
        },
      },
    },
  });

  if (!data) {
    return new NextResponse("Lesson not found", { status: 404 });
  }

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { lessonId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();
  const data = await db.update(lessons).set({
    title: body.title,
    unitId: body.unitId,
    order: body.order,
  }).where(eq(lessons.id, parseInt(params.lessonId))).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { lessonId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.delete(lessons)
    .where(eq(lessons.id, parseInt(params.lessonId))).returning();

  return NextResponse.json(data[0]);
};
