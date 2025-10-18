"use client"

import { toast } from "sonner"
import { useTransition, useState } from "react"
import {
  Heart,
  Zap,
  Crown,
  Check,
  Settings,
  Rocket,
  Coins,
  Infinity,
  Play,
  Clock,
  Gem,
} from "lucide-react"

import { refillHeartsWithGemsAction } from "@/actions/user-progress"
import { watchAdForGems } from "@/actions/gamification"
import { createStripeUrl } from "@/actions/user-subscription"
import { Button } from "@/components/ui/button"
import { GAMIFICATION } from "@/constants"
import { cn } from "@/lib/utils"
import { statusStyles } from "@/lib/style-utils"
import { AdRewardModal } from "@/components/modals/ad-reward-modal"
import { useDailyAds } from "@/hooks/use-daily-ads"

type Props = {
  hearts: number
  points: number
  gems: number
  hasActiveSubscription: boolean
}

export const Items = ({ hearts, points, gems, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition()
  const [showAdModal, setShowAdModal] = useState(false)
  const dailyAds = useDailyAds(5) // Max 5 ads per day

  const onRefillHearts = () => {
    if (pending) {
      toast.error("Please wait, operation in progress...")
      return
    }
    
    if (hearts === 5) {
      toast.error("Your hearts are already full!")
      return
    }
    
    if (gems < GAMIFICATION.HEARTS_REFILL_COST_GEMS) {
      toast.error(`You need ${GAMIFICATION.HEARTS_REFILL_COST_GEMS} gems to refill hearts. You have ${gems} gems.`)
      return
    }

    startTransition(() => {
      refillHeartsWithGemsAction()
        .then(() => {
          toast.success(`Hearts refilled successfully! You spent ${GAMIFICATION.HEARTS_REFILL_COST_GEMS} gems.`)
        })
        .catch((error) => {
          console.error("Heart refill error:", error)
          toast.error(`Failed to refill hearts: ${error.message || "Something went wrong"}`)
        })
    })
  }

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data
          }
        })
        .catch(() => toast.error("Something went wrong"))
    })
  }

  const handleAdReward = () => {
    startTransition(() => {
      watchAdForGems()
        .then((result) => {
          dailyAds.watchAd()
          toast.success(`You earned ${GAMIFICATION.GEMS_FROM_AD_WATCH} gems! Total gems: ${result.newTotal}`, {
            duration: 4000,
          })
        })
        .catch((error) => {
          console.error("Failed to earn gems from ad:", error)
          toast.error("Failed to earn gems. Please try again.")
        })
    })
  }

  return (
    <div className='w-full space-y-6'>
      {/* Heart Refill Item - Only show for free users */}
      {!hasActiveSubscription && (
        <div className='bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border-2 border-red-200 dark:border-red-700/50 p-6 transition-all duration-200 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600'>
          <div className='flex items-center gap-4'>
            <div className='w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0'>
              <Heart className='w-8 h-8 text-white fill-current' />
            </div>
            <div className='flex-1 min-w-0'>
              <h3 className='text-xl font-bold text-foreground mb-2'>Refill Hearts</h3>
              <p className='text-sm text-muted-foreground mb-3'>
                Get back in the game when you run out of hearts!
              </p>
              <div className='flex items-center gap-2'>
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1",
                    statusStyles.error.bg,
                    statusStyles.error.text,
                  )}
                >
                  <Heart className={cn("w-4 h-4", statusStyles.error.text)} fill='currentColor' />
                  <span>{hearts === 5 ? "Hearts Full" : `${hearts}/5 Hearts`}</span>
                </div>
                {hearts < 5 && (
                  <div
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1",
                      statusStyles.success.bg,
                      statusStyles.success.text,
                    )}
                  >
                    <Gem className={cn("w-4 h-4", statusStyles.success.text)} />
                    <span>Cost: {GAMIFICATION.HEARTS_REFILL_COST_GEMS} Gems</span>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant='subtle'
              onClick={onRefillHearts}
              disabled={pending || hearts === 5 || gems < GAMIFICATION.HEARTS_REFILL_COST_GEMS}
              className={`px-6 py-3 font-bold text-lg ${
                hearts === 5
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : gems < GAMIFICATION.HEARTS_REFILL_COST_GEMS
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl"
              } transition-all duration-200`}
            >
              {hearts === 5 ? (
                <div className='flex items-center gap-2'>
                  <Heart className='w-5 h-5 text-muted-foreground/60' fill='currentColor' />
                  <span>Hearts Full</span>
                </div>
              ) : gems < GAMIFICATION.HEARTS_REFILL_COST_GEMS ? (
                "Not enough Gems"
              ) : (
                <div className='flex items-center gap-2'>
                  <Gem className='w-5 h-5 text-purple-300' />
                  <span>{GAMIFICATION.HEARTS_REFILL_COST_GEMS} Gems</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Video Ads for XP Item - Only show for free users */}
      {!hasActiveSubscription && (
        <div className='bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700/50 p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600'>
          <div className='flex items-center gap-4'>
            <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0'>
              <Play className='w-8 h-8 text-white fill-current' />
            </div>
            <div className='flex-1 min-w-0'>
              <h3 className='text-xl font-bold text-foreground mb-2'>Watch Ads for Gems</h3>
              <p className='text-sm text-muted-foreground mb-3'>
                Watch short video ads to earn free gems! Use gems to buy hearts and other items.
              </p>
              <div className='flex items-center gap-2'>
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1",
                    statusStyles.info.bg,
                    statusStyles.info.text,
                  )}
                >
                  <Gem className={cn("w-4 h-4", statusStyles.success.text)} />
                  <span>+{GAMIFICATION.GEMS_FROM_AD_WATCH} Gems per ad</span>
                </div>
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1",
                    statusStyles.warning.bg,
                    statusStyles.warning.text,
                  )}
                >
                  <Clock className={cn("w-4 h-4", statusStyles.warning.text)} />
                  <span>
                    {dailyAds.adsWatched}/{dailyAds.maxAds} today
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant='subtle'
              onClick={() => setShowAdModal(true)}
              disabled={!dailyAds.canWatch}
              className={`px-6 py-3 font-bold text-lg ${
                !dailyAds.canWatch
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl"
              } transition-all duration-200`}
            >
              {!dailyAds.canWatch ? (
                <div className='flex items-center gap-2'>
                  <Clock className='w-5 h-5 text-muted-foreground/60' />
                  <span>Daily Limit</span>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <Play className='w-5 h-5 text-white' />
                  <span>Watch Ad</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Pro Membership Item */}
      <div className='bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-yellow-300 dark:border-yellow-700/50 p-6 transition-all duration-200 hover:shadow-xl hover:border-yellow-400 dark:hover:border-yellow-600 relative overflow-hidden'>
        <div
          className={cn(
            "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
            statusStyles.warning.bg,
            statusStyles.warning.text,
          )}
        >
          {hasActiveSubscription ? "Active" : "Popular"}
        </div>

        <div className='flex items-center gap-4'>
          <div className='w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0'>
            <Infinity className='w-8 h-8 text-white' />
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='text-xl font-bold text-foreground mb-2 flex items-center gap-2'>
              Pro Membership
              <Crown className={cn("w-5 h-5", statusStyles.warning.text)} />
            </h3>
            <p className='text-sm text-muted-foreground mb-3'>
              Unlock unlimited hearts, remove ads, and get access to exclusive pro features and
              content.
            </p>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Check className={cn("w-4 h-4", statusStyles.success.text)} />
                <span className='text-sm text-muted-foreground'>Unlimited Hearts</span>
              </div>
              <div className='flex items-center gap-2'>
                <Check className={cn("w-4 h-4", statusStyles.success.text)} />
                <span className='text-sm text-muted-foreground'>Ad-free Experience</span>
              </div>
              <div className='flex items-center gap-2'>
                <Check className={cn("w-4 h-4", statusStyles.success.text)} />
                <span className='text-sm text-muted-foreground'>Exclusive Pro Content</span>
              </div>
              <div className='flex items-center gap-2'>
                <Check className={cn("w-4 h-4", statusStyles.success.text)} />
                <span className='text-sm text-muted-foreground'>Priority Support</span>
              </div>
            </div>
          </div>
          <Button
            variant='subtle'
            onClick={onUpgrade}
            disabled={pending}
            className={`px-6 py-3 font-bold text-lg ${
              hasActiveSubscription
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            } shadow-lg hover:shadow-xl transition-all duration-200`}
          >
            {hasActiveSubscription ? (
              <div className='flex items-center gap-2'>
                <Settings className='w-5 h-5' />
                <span>Manage</span>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <Rocket className='w-5 h-5' />
                <span>Upgrade</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Coming Soon Items */}
      <div className='bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-700/50 p-6 opacity-75'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4'>
            <Rocket className='w-8 h-8 text-white' />
          </div>
          <h3 className='text-xl font-bold text-foreground mb-2'>More Items Coming Soon!</h3>
          <p className='text-sm text-muted-foreground'>
            We&apos;re working on exciting new power-ups, themes, and learning boosters. Stay tuned!
          </p>
        </div>
      </div>

      {/* Ad Reward Modal */}
      <AdRewardModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onRewardEarned={() => handleAdReward()}
        dailyAdsWatched={dailyAds.adsWatched}
        maxDailyAds={dailyAds.maxAds}
        rewardPoints={GAMIFICATION.GEMS_FROM_AD_WATCH}
      />
    </div>
  )
}
