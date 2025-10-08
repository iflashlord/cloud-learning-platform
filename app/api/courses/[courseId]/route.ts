import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { getAdminCourseById } from "@/db/queries";

export const GET = async (
  req: Request,
  { params }: { params: { courseId: string } },
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await getAdminCourseById(parseInt(params.courseId));

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
