import { NextResponse } from "next/server";
import { createMonthlyQuest, getMonthlyQuestProgress } from "@/actions/gamification";

export async function GET() {
  try {
    // Ensure monthly quest exists
    await createMonthlyQuest();
    
    // Get current progress
    const progress = await getMonthlyQuestProgress();
    
    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error("Error getting monthly quest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get monthly quest" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const quest = await createMonthlyQuest();
    return NextResponse.json({ success: true, quest });
  } catch (error) {
    console.error("Error creating monthly quest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create monthly quest" },
      { status: 500 }
    );
  }
}