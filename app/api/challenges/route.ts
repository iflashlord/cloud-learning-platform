import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challenges, lessons, units } from "@/db/schema";

export const GET = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.challenges.findMany({
    orderBy: (challenges, { asc }) => [asc(challenges.order)],
    with: {
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

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db.insert(challenges).values({
    lessonId: body.lessonId,
    type: body.type,
    question: body.question,
    hint: body.hint || null,
    order: body.order,
  }).returning();

  return NextResponse.json(data[0]);
};
