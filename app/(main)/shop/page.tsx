import { redirect } from "next/navigation"
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries"
import { ShopPageClient } from "./client-wrapper"

const ShopPage = async () => {
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

  const activeCourseData = courses.find((course) => course.id === userProgress.activeCourse?.id)

  return (
    <ShopPageClient
      initialUserProgress={{
        hearts: userProgress.hearts,
        points: userProgress.points,
        gems: userProgress.gems,
        activeCourse: {
          id: userProgress.activeCourse?.id || 0,
          title: userProgress.activeCourse?.title || "No Course",
          imageSrc: userProgress.activeCourse?.imageSrc || "/placeholder.svg",
        },
      }}
      isPro={isPro}
    />
  )
}

export default ShopPage
