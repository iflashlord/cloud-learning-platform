"use client"

import { useState, useTransition, useEffect } from "react"
import { toast } from "sonner"
import { Ticket, Check, AlertCircle, Loader2, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CouponRedemptionFormProps {
  onSuccess?: () => void
  className?: string
  variant?: "default" | "compact"
}

export const CouponRedemptionForm = ({
  onSuccess,
  className,
  variant = "default",
}: CouponRedemptionFormProps) => {
  const [couponCode, setCouponCode] = useState("")
  const [pending, startTransition] = useTransition()
  const [isRedeemed, setIsRedeemed] = useState(false)

  // Check if user has active coupon subscription on component mount
  useEffect(() => {
    const checkCouponStatus = async () => {
      try {
        const response = await fetch("/api/user/subscription")
        if (response.ok) {
          const data = await response.json()
          // If user doesn't have active coupon subscription, reset isRedeemed state
          if (!data.hasActiveCouponSubscription) {
            setIsRedeemed(false)
          }
        }
      } catch (error) {
        // On error, reset to allow redemption attempts
        setIsRedeemed(false)
      }
    }

    checkCouponStatus()
  }, [])

  const handleRedeem = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code")
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/coupons/redeem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: couponCode.trim().toUpperCase() }),
        })

        const data = await response.json()

        if (response.ok) {
          setIsRedeemed(true)
          const message = data.proEndsAt
            ? `Coupon redeemed successfully! You now have Pro access until ${new Date(
                data.proEndsAt,
              ).toLocaleDateString()}.`
            : `Coupon redeemed successfully! You now have ${
                data.durationDays || 30
              } days of Pro access.`
          toast.success(message)
          setCouponCode("")

          // Refresh the page or redirect after a short delay
          setTimeout(() => {
            onSuccess?.()
          }, 1500)
        } else {
          setIsRedeemed(false)
          toast.error(data.error || "Failed to redeem coupon")
        }
      } catch (error) {
        setIsRedeemed(false)
        toast.error("Something went wrong. Please try again.")
      }
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !pending) {
      handleRedeem()
    }
  }

  if (isRedeemed) {
    if (variant === "compact") {
      return (
        <div
          className={cn(
            "text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg",
            className,
          )}
        >
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Check className='w-5 h-5 text-green-600 dark:text-green-400' />
            <span className='text-sm font-semibold text-green-800 dark:text-green-200'>
              Coupon Redeemed Successfully!
            </span>
          </div>
          <p className='text-xs text-green-700 dark:text-green-300'>
            Your Pro trial has been activated. Redirecting...
          </p>
        </div>
      )
    }

    return (
      <Card
        className={cn(
          "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20",
          className,
        )}
      >
        <CardContent className='p-6 text-center'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <div className='w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center'>
              <Check className='w-6 h-6 text-green-600 dark:text-green-400' />
            </div>
          </div>
          <h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-2'>
            Coupon Redeemed Successfully!
          </h3>
          <p className='text-sm text-green-700 dark:text-green-300'>
            Your Pro trial has been activated. Enjoy unlimited hearts and exclusive features!
          </p>
          <Badge variant='success' className='mt-3'>
            Pro Trial Active
          </Badge>
        </CardContent>
      </Card>
    )
  }

  if (variant === "compact") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className='space-y-4'>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Enter coupon code (e.g., TRIAL30)'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              disabled={pending}
              className='text-center font-mono text-lg tracking-wider uppercase placeholder:lowercase placeholder:font-sans border-2 focus:border-purple-400 dark:focus:border-purple-500 '
              maxLength={20}
            />
            {!couponCode.trim() && (
              <div className='absolute inset-y-0 right-3 flex items-center pointer-events-none'>
                <Ticket className='w-4 h-4 text-muted-foreground/50' />
              </div>
            )}
          </div>

          <Button
            onClick={handleRedeem}
            disabled={pending || !couponCode.trim()}
            className='w-full'
            variant='success'
            size='lg'
          >
            {pending ? (
              <div className='flex items-center gap-2'>
                <Loader2 className='w-5 h-5 animate-spin' />
                <span>Redeeming Coupon...</span>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <Ticket className='w-5 h-5' />
                <span>Redeem Coupon</span>
              </div>
            )}
          </Button>

          <div className='bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800'>
            <div className='text-xs text-purple-700 dark:text-purple-300 text-center space-y-1'>
              <p className='font-medium'>
                <PartyPopper className='inline-block' /> Instant Pro Access
              </p>
              <p className='flex items-center justify-center gap-3 text-xs opacity-80'>
                <span>✓ Unlimited Hearts</span>
                <span>✓ All Features</span>
                <span>✓ No Payment</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card
      className={cn(
        "border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 shadow-lg",
        className,
      )}
    >
      <CardHeader className='text-center'>
        <CardTitle className='flex items-center justify-center gap-3 text-xl'>
          <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md'>
            <Ticket className='w-6 h-6 text-white' />
          </div>
          Have a Coupon Code?
        </CardTitle>
        <p className='text-sm text-muted-foreground'>
          Enter your coupon code below to unlock instant Pro access with all premium features
        </p>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-3'>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Enter coupon code (e.g., TRIAL30)'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              disabled={pending}
              className='text-center font-mono text-xl tracking-widest uppercase placeholder:lowercase placeholder:font-sans border-2 focus:border-purple-400 dark:focus:border-purple-500 h-14'
              maxLength={20}
            />
            {!couponCode.trim() && (
              <div className='absolute inset-y-0 right-4 flex items-center pointer-events-none'>
                <Ticket className='w-5 h-5 text-muted-foreground/50' />
              </div>
            )}
          </div>
          <div className='text-xs text-center text-muted-foreground'>
            Codes are case-insensitive and will be automatically formatted
          </div>
        </div>

        <Button
          onClick={handleRedeem}
          disabled={pending || !couponCode.trim()}
          className='w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-14'
          size='lg'
          variant='outline'
        >
          {pending ? (
            <div className='flex items-center gap-3'>
              <Loader2 className='w-6 h-6 animate-spin' />
              <span className='text-lg'>Redeeming Coupon...</span>
            </div>
          ) : (
            <div className='flex items-center gap-3'>
              <Ticket className='w-6 h-6' />
              <span className='text-lg'>Redeem Coupon</span>
            </div>
          )}
        </Button>

        <div className='bg-purple-100 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700'>
          <h4 className='text-sm font-semibold text-purple-800 dark:text-purple-200 text-center mb-3'>
            🎉 What You&apos;ll Get Instantly
          </h4>
          <div className='grid grid-cols-2 gap-2 text-xs text-purple-700 dark:text-purple-300'>
            <div className='flex items-center gap-2'>
              <Check className='w-3 h-3 text-purple-600 dark:text-purple-400' />
              <span>Unlimited Hearts</span>
            </div>
            <div className='flex items-center gap-2'>
              <Check className='w-3 h-3 text-purple-600 dark:text-purple-400' />
              <span>Ad-Free Experience</span>
            </div>
            <div className='flex items-center gap-2'>
              <Check className='w-3 h-3 text-purple-600 dark:text-purple-400' />
              <span>Exclusive Content</span>
            </div>
            <div className='flex items-center gap-2'>
              <Check className='w-3 h-3 text-purple-600 dark:text-purple-400' />
              <span>Priority Support</span>
            </div>
          </div>
          <div className='text-center mt-3 text-xs text-purple-600 dark:text-purple-400 font-medium'>
            No payment required • Instant activation
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
