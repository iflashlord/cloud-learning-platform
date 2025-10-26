"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Heart, ShoppingCart, X, Gem, Crown, Ticket } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CouponRedemptionForm } from "@/components/coupon-redemption-form"
import { GAME_ELEMENT_COLORS } from "@/constants"
import { cn } from "@/lib/utils"

interface HeartsDepleteModalProps {
  isOpen: boolean
  onClose: () => void
}

export const HeartsDepleteModal = ({ isOpen, onClose }: HeartsDepleteModalProps) => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [upgradeMethod, setUpgradeMethod] = useState("pro")

  useEffect(() => setIsClient(true), [])

  const handleGoToPro = () => {
    onClose()
    router.push("/pro")
  }

  const handleGoToShop = () => {
    onClose()
    router.push("/shop")
  }

  const handleBuyHearts = () => {
    onClose()
    router.push("/shop#hearts")
  }

  const handleCouponSuccess = () => {
    onClose()
    router.push("/learn")
  }

  const handleCloseLesson = () => {
    onClose()
    router.push("/learn")
  }

  if (!isClient) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <div className='relative'>
              <Heart className='h-24 w-24 text-red-500 fill-current' />
              <div className='absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold'>
                0
              </div>
            </div>
          </div>
          <DialogTitle className='text-center font-bold text-2xl'>Out of Hearts!</DialogTitle>
          <DialogDescription className='text-center text-base'>
            You&apos;ve run out of hearts! Choose how you&apos;d like to continue your learning
            journey.
          </DialogDescription>
        </DialogHeader>

        <div className='px-6 pb-6'>
          <Tabs value={upgradeMethod} onValueChange={setUpgradeMethod} className='w-full'>
            <TabsList className='grid w-full grid-cols-3 mb-4'>
              <TabsTrigger value='pro' className='flex items-center gap-1 text-xs'>
                <Crown className='w-3 h-3' />
                <span>Pro Access</span>
              </TabsTrigger>
              <TabsTrigger value='coupon' className='flex items-center gap-1 text-xs'>
                <Ticket className='w-3 h-3' />
                <span>Coupon</span>
              </TabsTrigger>
              <TabsTrigger value='shop' className='flex items-center gap-1 text-xs'>
                <ShoppingCart className='w-3 h-3' />
                <span>Buy Hearts</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value='pro' className='space-y-3'>
              <div className='text-center text-sm text-muted-foreground mb-3'>
                Get unlimited hearts with Pro membership!
              </div>
              <Button
                variant='primary'
                className='w-full flex items-center gap-2'
                size='lg'
                onClick={handleGoToPro}
              >
                <Crown className='w-5 h-5' />
                Upgrade to Pro
              </Button>
            </TabsContent>

            <TabsContent value='coupon' className='space-y-3'>
              <div className='text-center text-sm text-muted-foreground mb-3'>
                Have a coupon code? Redeem it for Pro access!
              </div>
              <CouponRedemptionForm onSuccess={handleCouponSuccess} variant='compact' />
            </TabsContent>

            <TabsContent value='shop' className='space-y-3'>
              <div className='text-center text-sm text-muted-foreground mb-3'>
                Purchase hearts with gems or visit the shop.
              </div>
              <div className='space-y-2'>
                <Button
                  variant='primary'
                  className='w-full flex items-center gap-2'
                  size='lg'
                  onClick={handleBuyHearts}
                >
                  <Gem className={cn("w-5 h-5")} />
                  Buy Hearts (5 Gems)
                </Button>
                <Button
                  variant='outline'
                  className='w-full flex items-center gap-2'
                  size='lg'
                  onClick={handleGoToShop}
                >
                  <ShoppingCart className='w-5 h-5' />
                  Go to Shop
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            variant='ghost'
            className='w-full flex items-center gap-2 mt-4'
            size='lg'
            onClick={handleCloseLesson}
          >
            <X className='w-5 h-5' />
            Close Lesson
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
