import Image from "next/image"
import { redirect } from "next/navigation"

import { DashboardLayout, ContentGrid } from "@/lib/css-grid-system"
import { ProUpgradeCard } from "@/components/pro-upgrade-card"
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries"
import { QuestCard } from "@/components/ui/quest-card"
import { PageHeader } from "@/components/ui/page-header"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/ui/stat-card"
import { QuestAchievements } from "./quest-achievements"
import { QuestProgressTrackerComponent } from "./quest-progress-tracker"
import { QuestPageHeader } from "@/components/ui/quest-page-header"
import { QuestStats } from "@/components/ui/quest-stats"
import { QuestListing } from "@/components/ui/quest-listing"
import { quests } from "@/constants"

const QuestsPage = async () => {
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

  const completedQuests = quests.filter(
    (quest) => userProgress.points >= quest.value
  )
  const totalQuests = quests.length

  return (
    <div className='w-full min-h-screen'>

      <div className='flex w-full max-w-[1200px] mx-auto px-4 gap-8 pt-6'>
        <div className='flex-1'>
          <DashboardLayout header={<QuestPageHeader />}>
            <ContentGrid cols={1} gap='lg' className='max-w-6xl mx-auto'>
              <QuestStats
                completedQuests={completedQuests.length}
                availableQuests={
                  quests.filter((quest) => userProgress.points < quest.value)
                    .length
                }
                totalPoints={userProgress.points}
              />

              <QuestProgressTrackerComponent
                quests={quests}
                userPoints={userProgress.points}
              />

              <QuestAchievements
                userPoints={userProgress.points}
                completedQuests={completedQuests.length}
                totalQuests={totalQuests}
              />

              <QuestListing quests={quests} userPoints={userProgress.points} />
            </ContentGrid>
          </DashboardLayout>
        </div>

        <div className='hidden lg:block w-80 space-y-4'>
          {!isPro && <ProUpgradeCard />}
        </div>
      </div>
    </div>
  )
}

export default QuestsPage
