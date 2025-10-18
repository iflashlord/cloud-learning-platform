"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Crown, Gem, Gift, Check, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CurrencyDisplay } from "./currency-display"
import { claimProDailyBonus } from "@/actions/gamification"
import { GAMIFICATION } from "@/constants"

interface ProBonusSectionProps {
  isPro: boolean
  userGems: number
  onGemsChange?: (newGems: number) => void
}

export const ProBonusSection = ({ isPro, userGems, onGemsChange }: ProBonusSectionProps) => {
  const [pending, startTransition] = useTransition()
  const [claimed, setClaimed] = useState(false)

  const handleClaimBonus = () => {
    startTransition(async () => {
      try {
        const result = await claimProDailyBonus()

        setClaimed(true)
        onGemsChange?.(result.newTotal)

        toast.success(
          `You claimed your daily Pro bonus of ${GAMIFICATION.GEMS_PRO_DAILY_BONUS} gems!`,
          {
            icon: <Crown className='h-4 w-4 text-yellow-500' />,
          },
        )
      } catch (error) {
        if (error instanceof Error && error.message.includes("already claimed")) {
          setClaimed(true)
          toast.info("You've already claimed today's Pro bonus!")
        } else {
          toast.error(error instanceof Error ? error.message : "Failed to claim Pro bonus")
        }
      }
    })
  }

  if (!isPro) {
    return null
  }

  return (
    <Card className='bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-lg font-bold text-yellow-800 dark:text-yellow-300 flex items-center gap-2'>
          <Crown className='h-5 w-5' />
          Pro Daily Bonus
          <Badge variant='warning' className='ml-auto'>
            <Gift className='h-3 w-3 mr-1' />
            Premium
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='text-sm text-muted-foreground'>
          As a Pro member, claim your daily gem bonus to support your learning journey!
        </div>

        <div className='flex items-center justify-between p-4 bg-white/50 dark:bg-gray-900/20 rounded-lg border border-yellow-200/50 dark:border-yellow-700/50'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center'>
              <Gem className='h-6 w-6 text-white' />
            </div>

            <div className='flex-1'>
              <div className='font-semibold text-foreground'>Daily Pro Gem Bonus</div>
              <div className='flex items-center gap-2 mt-1'>
                <CurrencyDisplay type='gems' value={GAMIFICATION.GEMS_PRO_DAILY_BONUS} size='sm' />
                <span className='text-xs text-muted-foreground'>• Once per day</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleClaimBonus}
            disabled={claimed || pending}
            size='sm'
            className='bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white'
          >
            {pending ? (
              <div className='flex items-center gap-2'>
                <div className='w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin' />
                <span className='text-xs'>Claiming...</span>
              </div>
            ) : claimed ? (
              <div className='flex items-center gap-2'>
                <Check className='h-3 w-3' />
                <span className='text-xs'>Claimed</span>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <Gift className='h-3 w-3' />
                <span className='text-xs'>Claim {GAMIFICATION.GEMS_PRO_DAILY_BONUS}</span>
              </div>
            )}
          </Button>
        </div>

        <div className='text-xs text-center text-muted-foreground pt-2 border-t border-yellow-200/30 dark:border-yellow-700/30'>
          💎 Pro members receive exclusive daily rewards and bonuses!
        </div>
      </CardContent>
    </Card>
  )
}
