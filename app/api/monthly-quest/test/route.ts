import { NextResponse } from "next/server"
import { adminFakeCompleteMonthlyQuest, updateMonthlyQuestProgress } from "@/actions/gamification"

export async function POST() {
  try {
    // Add 1 lesson completion to monthly quest
    await updateMonthlyQuestProgress("complete_monthly_lessons", 1)

    return NextResponse.json({
      success: true,
      message: "Added 1 lesson completion to monthly quest",
    })
  } catch (error) {
    console.error("Error updating monthly quest:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update monthly quest" },
      { status: 500 },
    )
  }
}

// Complete the quest for admin testing
export async function PUT() {
  try {
    const result = await adminFakeCompleteMonthlyQuest()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error completing monthly quest:", error)
    return NextResponse.json(
      { success: false, error: "Failed to complete monthly quest" },
      { status: 500 },
    )
  }
}
