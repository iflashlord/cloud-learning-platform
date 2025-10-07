import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Get all users with their progress
    const users = await db.query.userProgress.findMany({
      with: {
        activeCourse: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("[ADMIN_USERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { userId, active } = await request.json();

    // Update user status (this would depend on your user schema)
    // For now, we'll just return success
    // In a real app, you'd update the user's active status in your user table

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[ADMIN_USERS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}