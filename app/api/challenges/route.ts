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
  const courseId = searchParams.get("courseId");

  let data;
  
  if (courseId) {
    // Get challenges for a specific course by joining with lessons and units
    data = await db
      .select({
        id: challenges.id,
        lessonId: challenges.lessonId,
        type: challenges.type,
        question: challenges.question,
        order: challenges.order,
      })
      .from(challenges)
      .innerJoin(lessons, eq(challenges.lessonId, lessons.id))
      .innerJoin(units, eq(lessons.unitId, units.id))
      .where(eq(units.courseId, parseInt(courseId)));
  } else {
    data = await db.query.challenges.findMany();
  }

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db.insert(challenges).values({
    ...body,
  }).returning();

  return NextResponse.json(data[0]);
};
