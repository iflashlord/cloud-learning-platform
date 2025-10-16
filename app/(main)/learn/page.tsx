import { redirect } from "next/navigation"
import { ContentGrid } from "@/lib/css-grid-system"
import { lessons, units as unitsSchema } from "@/db/schema"
import { ProUpgradeCard } from "@/components/pro-upgrade-card"
import { Quests } from "@/components/quests"
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
  getCourses,
} from "@/db/queries"
import { Unit } from "./unit"
import { EnhancedLearnHeader } from "@/components/enhanced-learn-header"

const LearnPage = async () => {
  const userProgressData = getUserProgress()
  const courseProgressData = getCourseProgress()
  const lessonPercentageData = getLessonPercentage()
  const unitsData = getUnits()
  const userSubscriptionData = getUserSubscription()
  const coursesData = getCourses()

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
    courses,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
    coursesData,
  ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }

  if (!courseProgress) {
    redirect("/courses")
  }

  const isPro = !!userSubscription?.isActive

  const activeCourseData = courses.find(
    (course) => course.id === userProgress.activeCourse?.id
  )

  const totalUnits = units.length
  const completedUnits = units.filter((unit) =>
    unit.lessons.every((lesson) => lesson.completed)
  ).length

  const totalLessons = units.reduce(
    (total, unit) => total + unit.lessons.length,
    0
  )
  const completedLessons = units.reduce(
    (total, unit) =>
      total + unit.lessons.filter((lesson) => lesson.completed).length,
    0
  )

  return (
    <div className='w-full min-h-screen'>
      <div className='flex w-full max-w-[1200px] mx-auto px-4 gap-8 pt-6'>
        <div className='flex-1'>
          <EnhancedLearnHeader
            title={userProgress.activeCourse.title}
            totalUnits={totalUnits}
            completedUnits={completedUnits}
            totalLessons={totalLessons}
            completedLessons={completedLessons}
          />

          <ContentGrid cols={1} gap='lg' className='mt-6'>
            {units.map((unit) => (
              <Unit
                key={unit.id}
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={
                  courseProgress.activeLesson as
                    | (typeof lessons.$inferSelect & {
                        unit: typeof unitsSchema.$inferSelect
                      })
                    | undefined
                }
                activeLessonPercentage={lessonPercentage}
                isPro={isPro}
              />
            ))}
          </ContentGrid>
        </div>

        <div className='hidden lg:block w-80 space-y-4'>
          {!isPro && <ProUpgradeCard />}
          <Quests points={userProgress.points} />
        </div>
      </div>
    </div>
  )
}

export default LearnPage
