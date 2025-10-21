"use server"

import { revalidatePath } from "next/cache"
import { backfillLessonCompletions } from "@/db/queries"

export const triggerBackfillLessons = async () => {
  try {
    const result = await backfillLessonCompletions()

    // Revalidate the review page to show updated data
    revalidatePath("/review")

    return {
      success: true,
      backfilled: result.backfilled,
      message: `Successfully backfilled ${result.backfilled} lesson completions`,
    }
  } catch (error) {
    console.error("Error backfilling lessons:", error)
    return {
      success: false,
      error: "Failed to backfill lessons",
      backfilled: 0,
    }
  }
}
