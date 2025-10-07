import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { units } from "@/db/schema";

export const GET = async () => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    with: {
      course: {
        columns: {
          id: true,
          title: true,
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

  const data = await db.insert(units).values({
    title: body.title,
    description: body.description,
    courseId: body.courseId,
    order: body.order,
  }).returning();

  return NextResponse.json(data[0]);
};
