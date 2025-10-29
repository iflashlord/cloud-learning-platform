import { redirect } from "next/navigation"
import { DashboardLayout, ContentGrid } from "@/lib/css-grid-system"
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries"
import { SubscriptionManager } from "./subscription-manager"

export const dynamic = "force-dynamic"

const SubscriptionPage = async () => {
  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()
  const coursesData = getCourses()

  const [userProgress, userSubscription, courses] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    coursesData,
  ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }

  const isPro = !!userSubscription?.isActive

  const activeCourseData = courses.find(
    (course) => course.id === userProgress.activeCourse?.id
  )

  const normalizedSubscription = userSubscription
    ? {
        ...userSubscription,
        id: (
          userSubscription.id ??
          userSubscription.activeCouponRedemption?.id ??
          "coupon-access"
        ).toString(),
      }
    : null

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full max-w-[1200px] mx-auto px-4 pt-6'>
        <DashboardLayout>
          <ContentGrid cols={1} gap='xl' className='max-w-5xl mx-auto py-8'>
            <SubscriptionManager
              userProgress={userProgress}
              subscription={normalizedSubscription}
              isPro={isPro}
            />
          </ContentGrid>
        </DashboardLayout>
      </div>
    </div>
  )
}

export default SubscriptionPage
