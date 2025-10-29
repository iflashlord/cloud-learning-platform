import { NextRequest, NextResponse } from "next/server"

import { synthesizeChallengeSuggestion } from "@/app/api/ai/challenge-builder/synthesizer"
import { isAdmin } from "@/lib/admin"

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()
    const { prompt, challengeType, difficulty, lesson, mode, questionContext, answerCount } = body

    const suggestion = synthesizeChallengeSuggestion({
      prompt,
      challengeType,
      difficulty,
      lesson,
      mode,
      questionContext,
      answerCount,
    })

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error("Challenge builder error:", error)
    return NextResponse.json({ error: "Failed to generate suggestion" }, { status: 500 })
  }
}
