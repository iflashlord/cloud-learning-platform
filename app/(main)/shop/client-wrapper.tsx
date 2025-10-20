"use client"

import { DashboardLayout, ContentGrid } from "@/lib/css-grid-system"
import { ProUpgradeCard } from "@/components/pro-upgrade-card"
import { Quests } from "@/components/quests"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Items } from "./items"
import { BRAND_CONFIG } from "@/lib/config"
import { GAME_ELEMENT_COLORS } from "@/constants"
import { Zap, Heart, Crown, Target, Lightbulb, Gem } from "lucide-react"
import { useUserProgress } from "@/hooks/use-user-progress"
import { cn } from "@/lib/utils"

type Props = {
  initialUserProgress: {
    hearts: number
    points: number
    gems: number
    activeCourse: {
      id: number
      title: string
      imageSrc: string
    }
  }
  isPro: boolean
}

export const ShopPageClient = ({ initialUserProgress, isPro }: Props) => {
  const { data: userProgress, refresh } = useUserProgress(initialUserProgress)

  // Use current data or fall back to initial data
  const currentData = userProgress || initialUserProgress

  return (
    <div className='w-full min-h-screen'>
      <div className='flex w-full max-w-[1200px] mx-auto px-4 gap-8 pt-6'>
        <div className='flex-1'>
          <DashboardLayout
            header={
              <PageHeader
                variant='gradient'
                title={`${BRAND_CONFIG.PLATFORM_NAME} Marketplace`}
                description='Use your gems to purchase hearts and other power-ups to enhance your learning journey.'
                badge={
                  <Badge variant={isPro ? "success" : "warning"}>
                    {isPro ? "PRO Member" : "Free Account"}
                  </Badge>
                }
              />
            }
          >
            <ContentGrid cols={1} gap='lg' className='max-w-4xl mx-auto'>
              <ContentGrid cols={4} gap='md' className='w-full'>
                <StatCard
                  variant='warning'
                  icon={<Zap className={cn("w-6 h-6", GAME_ELEMENT_COLORS.XP.text)} />}
                  title='XP Points'
                  value={currentData.points.toString()}
                  subtitle='Experience earned'
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
                      <Gem className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>Gems</p>
                      <p className={cn("text-2xl font-bold", GAME_ELEMENT_COLORS.GEMS.text)}>
                        {currentData.gems.toString()}
                      </p>
                      <p className='text-sm text-muted-foreground'>Premium currency</p>
                    </div>
                  </div>
                </div>
                <StatCard
                  variant='danger'
                  icon={<Heart className='w-6 h-6' />}
                  title='Hearts'
                  value={currentData.hearts.toString()}
                  subtitle='Health remaining'
                />
                <StatCard
                  variant={isPro ? "success" : "warning"}
                  icon={isPro ? <Crown className='w-6 h-6' /> : <Target className='w-6 h-6' />}
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
                    <div>• Earn Gems by watching ads and Pro daily bonuses</div>
                    <div>• Hearts are used when you make mistakes during lessons</div>
                    <div>• Use Gems to refill hearts when you run out</div>
                    <div>• Pro membership gives you unlimited hearts and exclusive features</div>
                    <div>• Check back regularly for new items and special offers!</div>
                  </div>
                </AlertDescription>
              </Alert>

              <Items
                hearts={currentData.hearts}
                points={currentData.points}
                gems={currentData.gems}
                hasActiveSubscription={isPro}
                onRefresh={refresh}
              />
            </ContentGrid>
          </DashboardLayout>
        </div>

        <div className='hidden lg:block w-80 space-y-4'>
          {!isPro && <ProUpgradeCard />}
          <Quests points={currentData.points} />
        </div>
      </div>
    </div>
  )
}
