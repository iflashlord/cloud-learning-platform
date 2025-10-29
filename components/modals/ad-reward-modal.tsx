"use client"

import { useState, useEffect, useRef } from "react"
import { Play, X, Coins, Trophy, CheckCircle, Clock, Gem, AlertTriangle } from "lucide-react"
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
import { GoogleAd } from "@/components/google/google-ad"

const GOOGLE_ADS_CONFIGURED =
  Boolean(process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID) &&
  Boolean(process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT)

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
  const [adRenderKey, setAdRenderKey] = useState(0)
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isClaimingReward, setIsClaimingReward] = useState(false)

  useEffect(() => setIsClient(true), [])
  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current)
        progressTimerRef.current = null
      }
    }
  }, [])

  const canWatchMoreAds = dailyAdsWatched < maxDailyAds
  const isWatchDisabled = !canWatchMoreAds || !GOOGLE_ADS_CONFIGURED

  const watchAd = () => {
    if (!canWatchMoreAds) {
      toast.error("You've reached your daily ad limit. Come back tomorrow!")
      return
    }

    if (!GOOGLE_ADS_CONFIGURED) {
      toast.error("Google Ads is not configured yet. Please try again later.")
      return
    }

    setAdState("playing")
    setAdProgress(0)
    setAdRenderKey((prev) => prev + 1)
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }

    // Require a minimum watch duration before enabling claim.
    const duration = 15000 // 15 seconds
    const interval = 100 // Update every 100ms
    const increment = (interval / duration) * 100

    const progressTimer = setInterval(() => {
      setAdProgress((prev) => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          clearInterval(progressTimer)
          progressTimerRef.current = null
          setAdState("completed")
          return 100
        }
        return newProgress
      })
    }, interval)
    progressTimerRef.current = progressTimer
  }

  const claimReward = async () => {
    try {
      setIsClaimingReward(true)
      await onRewardEarned(rewardPoints)
      setAdState("ready")
      setAdProgress(0)
      onClose()
      // Don't show success toast here - let the parent component handle it
    } catch (error) {
      console.error("Failed to claim reward:", error)
      toast.error("Failed to claim reward. Please try again.")
    } finally {
      setIsClaimingReward(false)
    }
  }

  const handleClose = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }
    setAdState("ready")
    setAdProgress(0)
    setIsClaimingReward(false)
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
                {!GOOGLE_ADS_CONFIGURED && (
                  <span className='mt-3 text-xs text-amber-600 dark:text-amber-300 flex items-center gap-1 justify-center'>
                    <AlertTriangle className='w-4 h-4' />
                    Google ad unit not configured yet. Set NEXT_PUBLIC_GOOGLE_ADS_* env values.
                  </span>
                )}
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
            <div className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/40 p-3'>
              <div className='text-xs text-muted-foreground flex items-center gap-2 mb-2'>
                <AlertTriangle className='w-4 h-4 text-amber-500' />
                If the advertisement does not appear, disable ad blockers and try again.
              </div>
              <div className='rounded-md bg-gray-50 dark:bg-gray-800/80 p-2 flex items-center justify-center min-h-[120px]'>
                <GoogleAd key={adRenderKey} className='mx-auto w-full' />
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
                  disabled={isWatchDisabled}
                >
                  <Play className='w-5 h-5' />
                  {!canWatchMoreAds
                    ? "Daily Limit Reached"
                    : !GOOGLE_ADS_CONFIGURED
                    ? "Configure Google Ads"
                    : `Watch Ad (+${rewardPoints} Gems)`}
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
                  disabled={isClaimingReward}
                >
                  {isClaimingReward ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-4 h-4 border border-white/40 border-t-white rounded-full animate-spin' />
                      <span>Claiming...</span>
                    </div>
                  ) : (
                    <>
                      <Trophy className='w-5 h-5' />
                      <span>Claim {rewardPoints} Gems</span>
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
