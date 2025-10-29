import { redirect } from "next/navigation"
import { DashboardLayout, ContentGrid } from "@/lib/css-grid-system"
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries"
import { ProUpgradeMain } from "./pro-upgrade-main"

export const dynamic = "force-dynamic"

const ProPage = async () => {
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
  const isCouponUser = userSubscription?.proType === "coupon"

  // Only redirect paid Pro users, allow coupon users to upgrade
  if (isPro && !isCouponUser) {
    redirect("/learn")
  }

  const activeCourseData = courses.find((course) => course.id === userProgress.activeCourse?.id)

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full max-w-[1200px] mx-auto px-4 pt-6'>
        <DashboardLayout>
          <ContentGrid cols={1} gap='xl' className='max-w-5xl mx-auto py-8'>
            <ProUpgradeMain
              userProgress={userProgress}
              isProActive={isPro}
              subscription={userSubscription}
            />
          </ContentGrid>
        </DashboardLayout>
      </div>
    </div>
  )
}

export default ProPage
