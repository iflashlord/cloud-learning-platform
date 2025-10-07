import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: { unitId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.units.findFirst({
    where: eq(units.id, parseInt(params.unitId)),
    with: {
      course: {
        columns: {
          id: true,
          title: true,
        },
      },
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
          },
        },
      },
    },
  });

  if (!data) {
    return new NextResponse("Unit not found", { status: 404 });
  }

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { unitId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();
  const data = await db.update(units).set({
    title: body.title,
    description: body.description,
    courseId: body.courseId,
    order: body.order,
  }).where(eq(units.id, parseInt(params.unitId))).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { unitId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.delete(units)
    .where(eq(units.id, parseInt(params.unitId))).returning();

  return NextResponse.json(data[0]);
};
