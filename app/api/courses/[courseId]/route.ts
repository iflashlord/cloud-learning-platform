import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: { courseId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, parseInt(params.courseId)),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
            with: {
              challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                  challengeOptions: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!data) {
    return new NextResponse("Course not found", { status: 404 });
  }

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { courseId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();
  const data = await db.update(courses).set({
    title: body.title,
    imageSrc: body.imageSrc,
  }).where(eq(courses.id, parseInt(params.courseId))).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { courseId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.delete(courses)
    .where(eq(courses.id, parseInt(params.courseId))).returning();

  return NextResponse.json(data[0]);
};
