import { redirect } from "next/navigation"
import { getLessonReviewData, getUserProgress, getUserSubscription } from "@/db/queries"
import { LessonReviewContent } from "../components/lesson-review-content"

interface ReviewLessonPageProps {
  params: {
    lessonId: string
  }
}

const ReviewLessonPage = async ({ params }: ReviewLessonPageProps) => {
  const lessonId = parseInt(params.lessonId)

  if (isNaN(lessonId)) {
    redirect("/review")
  }

  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()
  const reviewData = getLessonReviewData(lessonId)

  const [userProgress, userSubscription, lessonReview] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    reviewData,
  ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }

  if (!lessonReview) {
    redirect("/review")
  }

  const isPro = !!userSubscription?.isActive

  return (
    <LessonReviewContent lessonReview={lessonReview} isPro={isPro} userProgress={userProgress} />
  )
}

export default ReviewLessonPage
