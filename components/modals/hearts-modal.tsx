"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Frown, Crown, ShoppingCart, Ticket } from "lucide-react"

import {
  NativeDialog,
  NativeDialogContent,
  NativeDialogDescription,
  NativeDialogFooter,
  NativeDialogHeader,
  NativeDialogTitle,
} from "@/components/ui/native-dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CouponRedemptionForm } from "@/components/coupon-redemption-form"
import { useHeartsModal } from "@/store/use-hearts-modal"

export const HeartsModal = () => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [upgradeMethod, setUpgradeMethod] = useState("pro")
  const { isOpen, close } = useHeartsModal()

  useEffect(() => setIsClient(true), [])

  const onGoToPro = () => {
    close()
    router.push("/pro")
  }

  const onGoToShop = () => {
    close()
    router.push("/shop")
  }

  const handleCouponSuccess = () => {
    close()
    router.push("/learn")
  }

  if (!isClient) {
    return null
  }

  return (
    <NativeDialog open={isOpen} onOpenChange={close} className='max-w-lg'>
      <NativeDialogContent>
        <NativeDialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <Frown className='h-20 w-20 text-muted-foreground' />
          </div>
          <NativeDialogTitle className='text-center font-bold text-2xl'>
            You ran out of hearts!
          </NativeDialogTitle>
          <NativeDialogDescription className='text-center text-base'>
            Choose how you&apos;d like to continue your learning journey.
          </NativeDialogDescription>
        </NativeDialogHeader>
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
              <Button variant='primary' className='w-full' size='lg' onClick={onGoToPro}>
                <Crown className='w-4 h-4 mr-2' />
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
                Purchase hearts with gems to keep learning.
              </div>
              <Button variant='outline' className='w-full' size='lg' onClick={onGoToShop}>
                <ShoppingCart className='w-4 h-4 mr-2' />
                Go to Shop
              </Button>
            </TabsContent>
          </Tabs>

          <Button variant='ghost' className='w-full mt-4' size='sm' onClick={close}>
            No thanks
          </Button>
        </div>
      </NativeDialogContent>
    </NativeDialog>
  )
}
