import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getUserProgress } from "@/db/queries"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const userProgress = await getUserProgress()

    if (!userProgress) {
      return new NextResponse("User progress not found", { status: 404 })
    }

    return NextResponse.json({
      activeCourse: {
        id: userProgress.activeCourse?.id || 0,
        title: userProgress.activeCourse?.title || "No Course",
        imageSrc: userProgress.activeCourse?.imageSrc || "/placeholder.svg",
      },
      hearts: userProgress.hearts,
      points: userProgress.points,
    })
  } catch (error) {
    console.error("[USER_PROGRESS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
