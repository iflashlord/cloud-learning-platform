import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challengeOptions } from "@/db/schema";

export const GET = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Get query parameters from the URL
  const { searchParams } = new URL(req.url);
  const challengeId = searchParams.get("challengeId");

  // If challengeId is provided, filter by it
  let data;
  if (challengeId) {
    data = await db.query.challengeOptions.findMany({
      where: eq(challengeOptions.challengeId, parseInt(challengeId)),
    });
  } else {
    data = await db.query.challengeOptions.findMany();
  }

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db.insert(challengeOptions).values({
    ...body,
  }).returning();

  return NextResponse.json(data[0]);
};
