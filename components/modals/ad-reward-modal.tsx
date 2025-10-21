"use client"

import { useState, useEffect } from "react"
import { Play, X, Coins, Trophy, CheckCircle, Clock, Gem } from "lucide-react"
import { toast } from "sonner"

import {
  NativeDialog as Dialog,
  NativeDialogContent as DialogContent,
  NativeDialogDescription as DialogDescription,
  NativeDialogFooter as DialogFooter,
  NativeDialogHeader as DialogHeader,
  NativeDialogTitle as DialogTitle,
} from "@/components/ui/native-dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { GAME_ELEMENT_COLORS } from "@/constants"
import { cn } from "@/lib/utils"

interface AdRewardModalProps {
  isOpen: boolean
  onClose: () => void
  onRewardEarned: (points: number) => Promise<void>
  dailyAdsWatched: number
  maxDailyAds: number
  rewardPoints: number
}

export const AdRewardModal = ({
  isOpen,
  onClose,
  onRewardEarned,
  dailyAdsWatched,
  maxDailyAds,
  rewardPoints,
}: AdRewardModalProps) => {
  const [adState, setAdState] = useState<"ready" | "playing" | "completed">("ready")
  const [adProgress, setAdProgress] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  const canWatchMoreAds = dailyAdsWatched < maxDailyAds

  const watchAd = () => {
    if (!canWatchMoreAds) {
      toast.error("You've reached your daily ad limit. Come back tomorrow!")
      return
    }

    setAdState("playing")
    setAdProgress(0)

    // Simulate 15-second ad with progress
    const duration = 15000 // 15 seconds
    const interval = 100 // Update every 100ms
    const increment = (interval / duration) * 100

    const progressTimer = setInterval(() => {
      setAdProgress((prev) => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          clearInterval(progressTimer)
          setAdState("completed")
          return 100
        }
        return newProgress
      })
    }, interval)
  }

  const claimReward = async () => {
    try {
      await onRewardEarned(rewardPoints)
      setAdState("ready")
      setAdProgress(0)
      onClose()
      // Don't show success toast here - let the parent component handle it
    } catch (error) {
      console.error("Failed to claim reward:", error)
      toast.error("Failed to claim reward. Please try again.")
    }
  }

  const handleClose = () => {
    setAdState("ready")
    setAdProgress(0)
    onClose()
  }

  if (!isClient) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} showCloseButton={false}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            {adState === "ready" && (
              <div className='relative'>
                <Play className='h-24 w-24 text-blue-500 fill-current' />
                <div
                  className={cn(
                    "absolute -bottom-2 -right-2 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold",
                    GAME_ELEMENT_COLORS.GEMS.bg,
                    "bg-violet-500",
                  )}
                >
                  <Gem className={cn("w-4 h-4", "text-white")} />
                </div>
              </div>
            )}
            {adState === "playing" && (
              <div className='relative'>
                <div className='w-24 h-24 bg-gray-800 rounded-xl flex items-center justify-center'>
                  <div className='text-white text-lg font-bold'>AD</div>
                </div>
              </div>
            )}
            {adState === "completed" && (
              <div className='relative'>
                <Trophy className='h-24 w-24 text-yellow-500 fill-current' />
                <CheckCircle className='absolute -top-2 -right-2 h-8 w-8 text-green-500' />
              </div>
            )}
          </div>

          <DialogTitle className='text-center font-bold text-2xl'>
            {adState === "ready" && "Watch Ad & Earn Gems!"}
            {adState === "playing" && "Ad Playing..."}
            {adState === "completed" && "Reward Earned!"}
          </DialogTitle>

          <DialogDescription className='text-center text-base'>
            {adState === "ready" && (
              <>
                Watch a short 15-second video ad to earn <strong>{rewardPoints} gems</strong>!<br />
                <span className='text-sm text-muted-foreground mt-2 block'>
                  Daily limit: {dailyAdsWatched}/{maxDailyAds} ads watched
                </span>
              </>
            )}
            {adState === "playing" && (
              <>Please wait while the ad plays. Don&apos;t close this window!</>
            )}
            {adState === "completed" && (
              <>
                Great job! You&apos;ve earned <strong>{rewardPoints} gems</strong>. You can use
                these gems to buy hearts and other items.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {adState === "playing" && (
          <div className='space-y-4'>
            <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center'>
              <div className='text-lg font-bold text-gray-800 dark:text-gray-200 mb-2'>
                Dummy Advertisement
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                🎮 Play Amazing Games! 🎮
              </div>
              <div className='text-xs text-gray-500'>
                This is a placeholder for future Google AdSense integration
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  Progress
                </span>
                <span>{Math.round(adProgress)}%</span>
              </div>
              <Progress value={adProgress} />
            </div>
          </div>
        )}

        <DialogFooter className='mb-4'>
          <div className='flex flex-col gap-y-3 w-full'>
            {adState === "ready" && (
              <>
                <Button
                  variant='subtle'
                  className='w-full flex items-center gap-2'
                  size='lg'
                  onClick={watchAd}
                  disabled={!canWatchMoreAds}
                >
                  <Play className='w-5 h-5' />
                  {canWatchMoreAds ? `Watch Ad (+${rewardPoints} Gems)` : "Daily Limit Reached"}
                </Button>
                <Button
                  variant='outline'
                  className='w-full flex items-center gap-2'
                  size='lg'
                  onClick={handleClose}
                >
                  <X className='w-5 h-5' />
                  Cancel
                </Button>
              </>
            )}

            {adState === "playing" && (
              <Button variant='outline' className='w-full' size='lg' disabled>
                Please wait... ({Math.ceil((100 - adProgress) / 6.67)}s)
              </Button>
            )}

            {adState === "completed" && (
              <>
                <Button
                  variant='primary'
                  className='w-full flex items-center gap-2'
                  size='lg'
                  onClick={claimReward}
                >
                  <Trophy className='w-5 h-5' />
                  Claim {rewardPoints} Gems
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
