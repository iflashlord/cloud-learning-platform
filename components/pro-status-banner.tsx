"use client"

import { Crown, Clock, Calendar, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface ProStatusBannerProps {
  subscription: {
    isActive: boolean
    proType?: string | null
    remainingDays?: number
    expiresAt?: Date | string
    activeCouponRedemption?: any
  } | null
  className?: string
}

export const ProStatusBanner = ({ subscription, className }: ProStatusBannerProps) => {
  const router = useRouter()
  if (!subscription?.isActive) {
    return null // Don't show anything if not pro
  }

  const { proType, remainingDays, expiresAt, activeCouponRedemption } = subscription

  // Format expiry date
  const expiryDate = expiresAt ? new Date(expiresAt).toLocaleDateString() : null

  // Determine warning levels
  const isExpiringSoon = remainingDays && remainingDays <= 3
  const isExpiringSoonWarning = remainingDays && remainingDays <= 7

  if (proType === "coupon") {
    return (
      <Card
        className={cn(
          "border-l-4",
          isExpiringSoon
            ? "border-l-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
            : isExpiringSoonWarning
            ? "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
            : "border-l-purple-500 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
          className,
        )}
      >
        <CardContent className='p-4'>
          <div className='flex items-center justify-between flex-col gap-2'>
            <div className='flex items-center gap-3'>
              {isExpiringSoon ? (
                <AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400' />
              ) : (
                <Crown className='w-5 h-5 text-purple-600 dark:text-purple-400' />
              )}
              <div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold text-sm'>Pro Trial Active</span>
                  {activeCouponRedemption?.coupon?.code && (
                    <Badge variant='neutral' className='text-xs'>
                      {activeCouponRedemption.coupon.code}
                    </Badge>
                  )}
                </div>
                <div className='flex items-center gap-4 text-xs text-muted-foreground mt-1'>
                  {remainingDays !== undefined && (
                    <span className='flex items-center gap-1'>
                      <Clock className='w-3 h-3' />
                      {remainingDays} days remaining
                    </span>
                  )}
                  {expiryDate && (
                    <span className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      Expires: {expiryDate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className='flex gap-2'>
              <Button
                size='sm'
                variant={isExpiringSoonWarning ? "warning" : "outline"}
                onClick={() => router.push("/pro")}
                className={cn(
                  "text-xs",
                  !isExpiringSoonWarning &&
                    "border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-400",
                )}
              >
                <Crown className='w-3 h-3 mr-1' />
                Upgrade to Paid
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // For Stripe subscriptions, show simpler status
  return (
    <Card
      className={cn(
        "border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
        className,
      )}
    >
      <CardContent className='p-4'>
        <div className='flex items-center gap-3'>
          <Crown className='w-5 h-5 text-green-600 dark:text-green-400' />
          <div>
            <div className='font-semibold text-sm'>Pro Member</div>
            <div className='text-xs text-muted-foreground'>
              {expiryDate ? `Renews: ${expiryDate}` : "Active subscription"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
