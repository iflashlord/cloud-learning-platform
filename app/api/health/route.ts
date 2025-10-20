import { NextResponse } from "next/server"
import { sql } from "drizzle-orm"
import db from "@/db/drizzle"

export async function GET() {
  try {
    // Test database connection
    await db.execute(sql`SELECT 1`)

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 },
    )
  }
}
