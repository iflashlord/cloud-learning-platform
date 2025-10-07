import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { lessons, units } from "@/db/schema";

export const GET = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  let data;
  
  if (courseId) {
    // Get lessons for a specific course by joining with units
    data = await db
      .select({
        id: lessons.id,
        title: lessons.title,
        unitId: lessons.unitId,
        order: lessons.order,
      })
      .from(lessons)
      .innerJoin(units, eq(lessons.unitId, units.id))
      .where(eq(units.courseId, parseInt(courseId)));
  } else {
    data = await db.query.lessons.findMany();
  }

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db.insert(lessons).values({
    ...body,
  }).returning();

  return NextResponse.json(data[0]);
};
