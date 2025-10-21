import { redirect } from "next/navigation"
import { DashboardLayout, ContentGrid } from "@/lib/css-grid-system"
import {
  getUserProgress,
  getUserSubscription,
  getCompletedLessonsForReview,
  getLessonCompletionStats,
  backfillLessonCompletions,
} from "@/db/queries"
import { ReviewDashboard } from "./components/review-dashboard"

const ReviewPage = async () => {
  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()
  const completedLessonsData = getCompletedLessonsForReview()
  const statsData = getLessonCompletionStats()

  const [userProgress, userSubscription, completedLessons, stats] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    completedLessonsData,
    statsData,
  ])

  // If no completed lessons found, try to backfill from existing progress
  if (completedLessons.length === 0) {
    console.log("No completed lessons found, attempting backfill...")
    const backfillResult = await backfillLessonCompletions()
    console.log(`Backfilled ${backfillResult.backfilled} lesson completions`)

    // If we backfilled any lessons, get the updated list
    if (backfillResult.backfilled > 0) {
      const updatedLessons = await getCompletedLessonsForReview()
      console.log(`Found ${updatedLessons.length} lessons after backfill`)
      // For now, just log it - the user will see them on next page load due to caching
    }
  }

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }

  const isPro = !!userSubscription?.isActive

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full max-w-[1200px] mx-auto px-4 pt-6'>
        <DashboardLayout
          header={
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
                    Lesson Review
                  </h1>
                  <p className='text-gray-600 dark:text-gray-400 mt-1'>
                    Review your completed lessons and practice with Q&A
                    {isPro && " • AI assistant available"}
                  </p>
                </div>
                {isPro && (
                  <div className='flex items-center gap-1 px-3 py-1.5 bg-yellow-500/20 rounded-full border border-yellow-400/30'>
                    <span className='text-xs font-medium text-yellow-600 dark:text-yellow-400'>
                      ✨ PRO
                    </span>
                  </div>
                )}
              </div>
            </div>
          }
        >
          <ContentGrid cols={1} gap='lg' className='mt-6'>
            <ReviewDashboard
              completedLessons={completedLessons}
              stats={stats}
              isPro={isPro}
              userProgress={userProgress}
            />
          </ContentGrid>
        </DashboardLayout>
      </div>
    </div>
  )
}

export default ReviewPage
