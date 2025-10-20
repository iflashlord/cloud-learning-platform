import { redirect } from "next/navigation"
import { DashboardLayout, ContentGrid } from "@/lib/css-grid-system"
import { ProUpgradeCard } from "@/components/pro-upgrade-card"
import { Quests } from "@/components/quests"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getUserProgress, getUserSubscription, getCourses } from "@/db/queries"
import { BRAND_CONFIG } from "@/lib/config"
import { GAMIFICATION, GAME_ELEMENT_COLORS } from "@/constants"
import { Zap, Heart, Crown, Target, Lightbulb, Gem, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

// Import new gamification components
import { CurrencyHeader, GameShop } from "@/components/gamification"

const EnhancedShopPage = async () => {
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
    <div className='w-full min-h-screen'>
      <div className='flex w-full max-w-[1200px] mx-auto px-4 gap-8 pt-6'>
        <div className='flex-1'>
          <DashboardLayout
            header={
              <div className='space-y-4'>
                <PageHeader
                  variant='gradient'
                  title={`${BRAND_CONFIG.PLATFORM_NAME} Marketplace`}
                  description='Spend your gems and XP on power-ups, heart refills, and exclusive items to supercharge your learning!'
                  badge={
                    <Badge variant={isPro ? "success" : "warning"}>
                      {isPro ? "PRO Member" : "Free Account"}
                    </Badge>
                  }
                />

                {/* Enhanced Currency Display */}
                <div className='flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 border'>
                  <CurrencyHeader
                    hearts={userProgress.hearts || 5}
                    maxHearts={GAMIFICATION.MAX_HEARTS}
                    xp={userProgress.points || 0}
                    gems={userProgress.gems || GAMIFICATION.GEMS_STARTING_AMOUNT}
                    streak={userProgress.streak || 0}
                    isPro={isPro}
                    className='flex-wrap gap-3'
                  />

                  {isPro && (
                    <Badge variant='success' className='flex items-center gap-1'>
                      <Crown className='h-3 w-3' />
                      Unlimited Hearts
                    </Badge>
                  )}
                </div>
              </div>
            }
          >
            <ContentGrid cols={1} gap='lg' className='max-w-6xl mx-auto'>
              {/* Enhanced Stats Grid */}
              <ContentGrid cols={4} gap='md' className='w-full'>
                <StatCard
                  variant='warning'
                  icon={<Zap className={cn("w-6 h-6", GAME_ELEMENT_COLORS.XP.text)} />}
                  title='XP Points'
                  value={userProgress.points?.toString() || "0"}
                  subtitle='Available to spend'
                />
                <div
                  className={cn(
                    "flex items-center justify-between p-6 transition-all duration-200 hover:shadow-md rounded-lg",
                    "bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
                    "border border-purple-200 dark:border-purple-700",
                  )}
                >
                  <div className='flex items-center gap-4'>
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        "bg-gradient-to-br",
                        GAME_ELEMENT_COLORS.GEMS.gradient,
                      )}
                    >
                      <Gem className={cn("w-6 h-6 text-white")} />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>Gems</p>
                      <p className={cn("text-2xl font-bold", GAME_ELEMENT_COLORS.GEMS.text)}>
                        {userProgress.gems?.toString() ||
                          GAMIFICATION.GEMS_STARTING_AMOUNT.toString()}
                      </p>
                      <p className='text-sm text-muted-foreground'>Premium currency</p>
                    </div>
                  </div>
                </div>
                <StatCard
                  variant='danger'
                  icon={<Heart className='w-6 h-6' />}
                  title='Hearts'
                  value={isPro ? "∞" : userProgress.hearts?.toString() || "5"}
                  subtitle={isPro ? "Unlimited" : "Health remaining"}
                />
                <StatCard
                  variant='warning'
                  icon={<Flame className='w-6 h-6' />}
                  title='Streak'
                  value={userProgress.streak?.toString() || "0"}
                  subtitle='Daily learning streak'
                />
              </ContentGrid>

              {/* Enhanced Shopping Tips */}
              <Alert className='w-full'>
                <Lightbulb className='h-4 w-4' />
                <AlertDescription>
                  <div className='space-y-1'>
                    <div className='font-semibold'>💎 Shopping Guide:</div>
                    <div>
                      • <strong>Gems</strong> are premium currency - use them for powerful items
                    </div>
                    <div>
                      • <strong>XP</strong> can be spent on heart refills and gem packs
                    </div>
                    <div>
                      • <strong>Hearts</strong> are consumed when you make mistakes
                    </div>
                    <div>
                      • <strong>Pro users</strong> get unlimited hearts and daily gem bonuses
                    </div>
                    <div>
                      • <strong>Streak freezes</strong> protect your learning streak for missed days
                    </div>
                    <div>
                      • <strong>XP boosts</strong> give you double experience for limited time
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              {/* Enhanced Game Shop */}
              <GameShop
                userGems={userProgress.gems || GAMIFICATION.GEMS_STARTING_AMOUNT}
                userXP={userProgress.points || 0}
                userHearts={userProgress.hearts || 5}
                maxHearts={GAMIFICATION.MAX_HEARTS}
                isPro={isPro}
                onGemsChange={(newGems) => {
                  // Handle optimistic updates if needed
                  console.log("Gems updated:", newGems)
                }}
                onXPChange={(newXP) => {
                  // Handle optimistic updates if needed
                  console.log("XP updated:", newXP)
                }}
                onHeartsChange={(newHearts) => {
                  // Handle optimistic updates if needed
                  console.log("Hearts updated:", newHearts)
                }}
              />
            </ContentGrid>
          </DashboardLayout>
        </div>

        <div className='hidden lg:block w-80 space-y-4'>
          {/* Pro Upgrade Card */}
          {!isPro && <ProUpgradeCard />}

          {/* Daily Quests */}
          <Quests points={userProgress.points || 0} />

          {/* Quick Stats */}
          <div className='bg-white dark:bg-gray-800 rounded-lg border p-4'>
            <h3 className='font-semibold mb-3 flex items-center gap-2'>
              <Target className='h-4 w-4 text-blue-500' />
              Quick Stats
            </h3>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Total XP Earned:</span>
                <span className='font-medium'>{userProgress.totalXpEarned || 0}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Lessons Completed:</span>
                <span className='font-medium'>{userProgress.lessonsCompleted || 0}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Perfect Lessons:</span>
                <span className='font-medium'>{userProgress.perfectLessons || 0}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Best Streak:</span>
                <span className='font-medium'>{userProgress.streak || 0} days</span>
              </div>
            </div>
          </div>

          {/* Hearts Refill Timer (for non-Pro users) */}
          {!isPro && userProgress.hearts < GAMIFICATION.MAX_HEARTS && (
            <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
              <h3 className='font-semibold mb-2 flex items-center gap-2 text-red-700 dark:text-red-400'>
                <Heart className='h-4 w-4' />
                Heart Refill Timer
              </h3>
              <p className='text-sm text-red-600 dark:text-red-400 mb-2'>
                Hearts refill automatically every hour
              </p>
              <div className='text-xs text-red-500 dark:text-red-500'>
                Next heart: {GAMIFICATION.HEART_REFILL_INTERVAL_HOURS} hour
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnhancedShopPage
