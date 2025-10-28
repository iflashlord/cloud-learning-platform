import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import db from "@/db/drizzle"
import { userProgress } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const progress = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
      with: {
        activeCourse: {
          columns: {
            id: true,
            title: true,
            imageSrc: true,
          },
        },
      },
    })

    if (!progress) {
      return new NextResponse("User progress not found", { status: 404 })
    }

    return NextResponse.json({
      activeCourse: {
        id: progress.activeCourse?.id || 0,
        title: progress.activeCourse?.title || "No Course",
        imageSrc: progress.activeCourse?.imageSrc || "/placeholder.svg",
      },
      hearts: progress.hearts,
      points: progress.points,
      gems: progress.gems,
      streak: progress.streak,
      totalXpEarned: progress.totalXpEarned,
    })
  } catch (error) {
    console.error("[USER_PROGRESS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
export const dynamic = "force-dynamic"
