"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Play, Gem, Heart, Clock, Gift, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CurrencyDisplay } from "./currency-display"
import { watchAdForGems } from "@/actions/gamification"

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

const adRewards: AdReward[] = [
  {
    type: "gems",
    amount: 5,
    description: "Watch a short video to earn 5 gems",
  },
  {
    type: "gems", 
    amount: 10,
    description: "Watch a longer video to earn 10 gems",
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
  const [pending, startTransition] = useTransition()
  const [lastAdWatchTime, setLastAdWatchTime] = useState<number>(0)
  
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

  const handleWatchAd = (gemAmount: number) => {
    if (!canWatchAd()) {
      toast.error("Please wait before watching another ad")
      return
    }

    startTransition(async () => {
      try {
        // Simulate ad watching delay
        toast.info("Loading advertisement...", {
          duration: 2000,
        })

        // Simulate watching ad (in real implementation, integrate with ad provider)
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Award gems for watching ad
        const result = await watchAdForGems()
        
        setLastAdWatchTime(Date.now())
        onGemsChange?.(result.newTotal)
        
        toast.success(`You earned ${gemAmount} gems for watching the ad!`, {
          icon: <Gem className="h-4 w-4 text-purple-500" />,
        })
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to watch ad")
      }
    })
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-purple-800 dark:text-purple-300 flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Free Rewards
          <Badge variant="neutral" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            No Purchase Required
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Watch short advertisements to earn free gems! Pro users still benefit from these rewards.
        </div>

        <div className="grid gap-3">
          {adRewards.map((reward, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-900/20 rounded-lg border border-purple-200/50 dark:border-purple-700/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Play className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                
                <div className="flex-1">
                  <div className="font-medium text-sm text-foreground">
                    {reward.description}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <CurrencyDisplay
                      type={reward.type}
                      value={reward.amount}
                      size="sm"
                    />
                    <span className="text-xs text-muted-foreground">
                      • Free every 5 minutes
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleWatchAd(reward.amount)}
                disabled={!canWatchAd() || pending}
                size="sm"
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                {pending ? (
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-xs">Loading...</span>
                  </div>
                ) : !canWatchAd() ? (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{getNextAdTime()}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    <span className="text-xs">Watch</span>
                  </div>
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-xs text-center text-muted-foreground pt-2 border-t border-purple-200/30 dark:border-purple-700/30">
          💡 Tip: Ads help support the platform and are completely optional!
        </div>
      </CardContent>
    </Card>
  )
}