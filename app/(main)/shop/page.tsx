import { redirect } from "next/navigation"
import { DashboardLayout, ContentGrid } from "@/lib/css-grid-system"
import { ProUpgradeCard } from "@/components/pro-upgrade-card"
import { Quests } from "@/components/quests"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries"
import { Items } from "./items"
import { BRAND_CONFIG } from "@/lib/config"
import { Zap, Heart, Crown, Target, Lightbulb } from "lucide-react"

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

  const activeCourseData = courses.find(
    (course) => course.id === userProgress.activeCourse?.id
  )

  return (
    <div className='w-full min-h-screen'>
      <div className='flex w-full max-w-[1200px] mx-auto px-4 gap-8 pt-6'>
        <div className='flex-1'>
          <DashboardLayout
            header={
              <PageHeader
                variant='gradient'
                title={`${BRAND_CONFIG.PLATFORM_NAME} Marketplace`}
                description='Spend your hard-earned XP points on useful items and power-ups to enhance your learning journey.'
                badge={
                  <Badge variant={isPro ? "success" : "warning"}>
                    {isPro ? "PRO Member" : "Free Account"}
                  </Badge>
                }
              />
            }
          >
            <ContentGrid cols={1} gap='lg' className='max-w-4xl mx-auto'>
              <ContentGrid cols={3} gap='md' className='w-full'>
                <StatCard
                  variant='info'
                  icon={<Zap className='w-6 h-6' />}
                  title='XP Points'
                  value={userProgress.points.toString()}
                  subtitle='Available to spend'
                />
                <StatCard
                  variant='danger'
                  icon={<Heart className='w-6 h-6' />}
                  title='Hearts'
                  value={userProgress.hearts.toString()}
                  subtitle='Health remaining'
                />
                <StatCard
                  variant={isPro ? "success" : "warning"}
                  icon={
                    isPro ? (
                      <Crown className='w-6 h-6' />
                    ) : (
                      <Target className='w-6 h-6' />
                    )
                  }
                  title='Status'
                  value={isPro ? "PRO" : "FREE"}
                  subtitle={isPro ? "Premium member" : "Basic account"}
                />
              </ContentGrid>

              <Alert className='w-full'>
                <Lightbulb className='h-4 w-4' />
                <AlertDescription>
                  <div className='space-y-1'>
                    <div className='font-semibold'>Shopping Tips:</div>
                    <div>• Earn XP by completing lessons and quests</div>
                    <div>
                      • Hearts are used when you make mistakes during lessons
                    </div>
                    <div>
                      • Pro membership gives you unlimited hearts and exclusive
                      features
                    </div>
                    <div>
                      • Check back regularly for new items and special offers!
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              <Items
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={isPro}
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

export default ShopPage
