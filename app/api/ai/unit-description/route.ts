import { NextRequest, NextResponse } from "next/server"

import { synthesizeUnitDescription } from "@/app/api/ai/unit-description/synthesizer"
import { isAdmin } from "@/lib/admin"

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()
    const { prompt, unitTitle, courseTitle } = body

    if (!unitTitle) {
      return NextResponse.json({ error: "unitTitle is required" }, { status: 400 })
    }

    const suggestion = synthesizeUnitDescription({ prompt, unitTitle, courseTitle })

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error("Unit description AI error:", error)
    return NextResponse.json({ error: "Failed to generate description" }, { status: 500 })
  }
}
