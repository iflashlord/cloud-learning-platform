import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { CONFIG } from "@/lib/config";
import db from "@/db/drizzle";

export const GET = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") || "json";

  try {
    // Export all data with relationships
    const courses = await db.query.courses.findMany({
      with: {
        units: {
          orderBy: (units, { asc }) => [asc(units.order)],
          with: {
            lessons: {
              orderBy: (lessons, { asc }) => [asc(lessons.order)],
              with: {
                challenges: {
                  orderBy: (challenges, { asc }) => [asc(challenges.order)],
                  with: {
                    challengeOptions: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const exportData = {
      exportDate: new Date().toISOString(),
      version: "1.0",
      data: {
        courses,
      },
    };

    if (format === "json") {
      const response = new NextResponse(JSON.stringify(exportData, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="${CONFIG.PLATFORM_SLUG}-export-${new Date().toISOString().split('T')[0]}.json"`,
        },
      });
      return response;
    }

    return new NextResponse("Unsupported format", { status: 400 });
  } catch (error) {
    console.error("Export error:", error);
    return new NextResponse("Export failed", { status: 500 });
  }
};