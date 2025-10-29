"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Play, Gem, Heart, Clock, Gift, Sparkles, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CurrencyDisplay } from "./currency-display"
import { watchAdForGems } from "@/actions/gamification"
import { AdRewardModal } from "@/components/modals/ad-reward-modal"
import { useDailyAds } from "@/hooks/use-daily-ads"
import { GAMIFICATION, GAME_ELEMENT_COLORS } from "@/constants"

interface AdReward {
  type: "gems" | "hearts" | "xp"
  amount: number
  description: string
}

interface AdWatchSectionProps {
  userGems: number
  userHearts: number
  maxHearts: number
  isPro: boolean
  onGemsChange?: (newGems: number) => void
  onHeartsChange?: (newHearts: number) => void
}

const GOOGLE_ADS_CONFIGURED =
  Boolean(process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID) &&
  Boolean(process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT)

const adRewards: AdReward[] = [
  {
    type: "gems",
    amount: GAMIFICATION.GEMS_FROM_AD_WATCH,
    description: `Watch a short video to earn ${GAMIFICATION.GEMS_FROM_AD_WATCH} gems`,
  },
]

export const AdWatchSection = ({
  userGems,
  userHearts,
  maxHearts,
  isPro,
  onGemsChange,
  onHeartsChange,
}: AdWatchSectionProps) => {
  const [lastAdWatchTime, setLastAdWatchTime] = useState<number>(0)
  const [showAdModal, setShowAdModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState<AdReward | null>(null)
  const dailyAds = useDailyAds(5)

  // Cooldown period in milliseconds (5 minutes)
  const AD_COOLDOWN = 5 * 60 * 1000

  const canWatchAd = () => {
    return Date.now() - lastAdWatchTime >= AD_COOLDOWN
  }

  const getNextAdTime = () => {
    if (canWatchAd()) return null
    const timeLeft = AD_COOLDOWN - (Date.now() - lastAdWatchTime)
    const minutes = Math.ceil(timeLeft / (60 * 1000))
    return `${minutes}m`
  }

  const handleWatchAd = (reward: AdReward) => {
    if (!GOOGLE_ADS_CONFIGURED) {
      toast.error("Google Ads is not configured yet. Please try again later.")
      return
    }

    if (!dailyAds.canWatch) {
      toast.error("You've reached your daily ad limit. Come back tomorrow!")
      return
    }

    if (!canWatchAd()) {
      toast.error("Please wait before watching another ad")
      return
    }

    setSelectedReward(reward)
    setShowAdModal(true)
  }

  const handleRewardEarned = async (points: number) => {
    try {
      const result = await watchAdForGems()
      setLastAdWatchTime(Date.now())
      dailyAds.watchAd()
      onGemsChange?.(result.newTotal)
      toast.success(`You earned ${points} gems for watching the ad!`, {
        icon: <Gem className={cn("h-4 w-4", GAME_ELEMENT_COLORS.GEMS.text)} />,
        duration: 4000,
      })
    } catch (error) {
      console.error("[AdWatchSection] Failed to award ad reward:", error)
      throw error
    }
  }

  return (
    <Card className='bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-lg font-bold text-purple-800 dark:text-purple-300 flex items-center gap-2'>
          <Gift className='h-5 w-5' />
          Free Rewards
          <Badge variant='neutral' className='ml-auto'>
            <Sparkles className='h-3 w-3 mr-1' />
            No Purchase Required
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='text-sm text-muted-foreground'>
          Watch short advertisements to earn free gems! Pro users still benefit from these rewards.
        </div>
        {!GOOGLE_ADS_CONFIGURED && (
          <div className='flex items-center gap-2 text-xs text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-md px-3 py-2'>
            <AlertTriangle className='h-4 w-4 flex-shrink-0' />
            <span>Google ad unit not configured. Set NEXT_PUBLIC_GOOGLE_ADS_* env variables to enable ads.</span>
          </div>
        )}

        <div className='grid gap-3'>
          {adRewards.map((reward, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-3 bg-white/50 dark:bg-gray-900/20 rounded-lg border border-purple-200/50 dark:border-purple-700/50'
            >
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center'>
                  <Play className='h-4 w-4 text-purple-600 dark:text-purple-400' />
                </div>

                <div className='flex-1'>
                  <div className='font-medium text-sm text-foreground'>{reward.description}</div>
                  <div className='flex items-center gap-2 mt-1'>
                    <CurrencyDisplay type={reward.type} value={reward.amount} size='sm' />
                    <span className='text-xs text-muted-foreground'>• Free every 5 minutes</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleWatchAd(reward)}
                disabled={!GOOGLE_ADS_CONFIGURED || !dailyAds.canWatch || !canWatchAd()}
                size='sm'
                className='bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {!GOOGLE_ADS_CONFIGURED ? (
                  <div className='flex items-center gap-1'>
                    <AlertTriangle className='h-3 w-3' />
                    <span className='text-xs'>Setup Required</span>
                  </div>
                ) : !dailyAds.canWatch ? (
                  <div className='flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    <span className='text-xs'>Daily Limit</span>
                  </div>
                ) : !canWatchAd() ? (
                  <div className='flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    <span className='text-xs'>{getNextAdTime()}</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-1'>
                    <Play className='h-3 w-3' />
                    <span className='text-xs'>Watch</span>
                  </div>
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className='text-xs text-center text-muted-foreground pt-2 border-t border-purple-200/30 dark:border-purple-700/30'>
          💡 Tip: Ads help support the platform and are completely optional!
        </div>
      </CardContent>
      <AdRewardModal
        isOpen={showAdModal}
        onClose={() => {
          setShowAdModal(false)
          setSelectedReward(null)
        }}
        onRewardEarned={async (points) => {
          await handleRewardEarned(points)
        }}
        dailyAdsWatched={dailyAds.adsWatched}
        maxDailyAds={dailyAds.maxAds}
        rewardPoints={selectedReward?.amount ?? GAMIFICATION.GEMS_FROM_AD_WATCH}
      />
    </Card>
  )
}
