import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { lessons, units } from "@/db/schema";

export const GET = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.lessons.findMany({
    orderBy: (lessons, { asc }) => [asc(lessons.order)],
    with: {
      unit: {
        columns: {
          id: true,
          title: true,
          order: true,
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
  });

  const sortedData = [...data].sort((a, b) => {
    const unitOrderA = a.unit?.order ?? Number.MAX_SAFE_INTEGER;
    const unitOrderB = b.unit?.order ?? Number.MAX_SAFE_INTEGER;

    if (unitOrderA !== unitOrderB) {
      return unitOrderA - unitOrderB;
    }

    return a.order - b.order;
  });

  return NextResponse.json(sortedData);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db.insert(lessons).values({
    title: body.title,
    unitId: body.unitId,
    order: body.order,
  }).returning();

  return NextResponse.json(data[0]);
};
