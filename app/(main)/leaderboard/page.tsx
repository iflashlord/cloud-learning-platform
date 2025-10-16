import { redirect } from "next/navigation"
import { Trophy } from "lucide-react"

import {
  getTopTenUsers,
  getTopTenUsersByCourse,
  getAllCoursesForLeaderboard,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries"
import { DashboardLayout, ContentGrid } from "@/lib/css-grid-system"
import { ProUpgradeCard } from "@/components/pro-upgrade-card"
import { Quests } from "@/components/quests"
import { CONFIG } from "@/lib/config"
import { LeaderboardTabsContainer } from "./leaderboard-tabs"
import { LeaderboardHeader } from "@/components/ui/leaderboard-header"

type Props = {
  searchParams: {
    course?: string
  }
}

const LeaderboardPage = async ({ searchParams }: Props) => {
  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()
  const leaderboardData = getTopTenUsers()
  const coursesData = getAllCoursesForLeaderboard()

  const [userProgress, userSubscription, generalLeaderboard, courses] =
    await Promise.all([
      userProgressData,
      userSubscriptionData,
      leaderboardData,
      coursesData,
    ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }

  const isPro = !!userSubscription?.isActive

  const defaultCourseId = userProgress.activeCourse?.id || null
  const selectedCourseId = searchParams.course
    ? parseInt(searchParams.course)
    : defaultCourseId

  let courseLeaderboard = null
  let selectedCourse = null
  if (selectedCourseId) {
    courseLeaderboard = await getTopTenUsersByCourse(selectedCourseId)
    selectedCourse =
      courses.find((course) => course.id === selectedCourseId) || null
  }

  return (
    <div className='w-full min-h-screen'>
      <div className='flex w-full max-w-[1200px] mx-auto px-4 gap-8 pt-6'>
        <div className='flex-1'>
          <DashboardLayout
            header={
              <LeaderboardHeader
                title={`${CONFIG.PLATFORM_NAME} Champions`}
                description='Compete with fellow learners, track your progress, and celebrate achievements in our community of technology enthusiasts. Every challenge completed brings you closer to the top!'
                icon={<Trophy className='w-10 h-10 text-current' />}
                stats={[
                  { label: "Live Rankings", color: "green", animated: true },
                  { label: "Real-time Updates", color: "blue" },
                  { label: "Fair Competition", color: "purple" },
                ]}
                isPro={isPro}
                userPoints={userProgress.points}
              />
            }
          >
            <ContentGrid cols={1} gap='lg' align='center' className='w-full'>
              <LeaderboardTabsContainer
                courses={courses}
                generalLeaderboard={generalLeaderboard}
                courseLeaderboard={courseLeaderboard}
                selectedCourse={selectedCourse}
                selectedCourseId={selectedCourseId}
              />
            </ContentGrid>
          </DashboardLayout>
        </div>

        <div className='hidden lg:block w-80 space-y-4'>
          {!isPro && <ProUpgradeCard />}
          <Quests points={userProgress.points} />
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
