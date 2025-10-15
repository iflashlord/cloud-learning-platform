import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { userProgress, challengeProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Reset user progress
    await db
      .update(userProgress)
      .set({
        hearts: 5,
        points: 0,
      })
      .where(eq(userProgress.userId, userId));

    // Delete all challenge progress
    await db
      .delete(challengeProgress)
      .where(eq(challengeProgress.userId, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to reset progress:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}