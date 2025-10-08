import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId || !isAdmin()) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseId = parseInt(params.courseId);
    
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    return NextResponse.json(course.themeConfig);
  } catch (error) {
    console.error("[COURSE_THEME_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId || !isAdmin()) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseId = parseInt(params.courseId);
    const body = await request.json();

    // Validate the theme configuration structure
    const themeConfig = {
      themeName: body.themeName,
      colors: {
        primary: body.colors.primary,
        success: body.colors.success,
        error: body.colors.error,
        info: body.colors.info,
        neutral: body.colors.neutral,
      }
    };

    // Update the course with the new theme configuration
    await db.update(courses)
      .set({ themeConfig })
      .where(eq(courses.id, courseId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[COURSE_THEME_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}