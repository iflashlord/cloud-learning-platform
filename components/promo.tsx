import Link from "next/link"
import { Infinity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BRAND_CONFIG } from "@/lib/config"

export const Promo = () => {
  return (
    <Card className='p-4 space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center gap-x-2'>
          <Infinity className='h-6 w-6 text-primary' />
          <h3 className='font-bold text-lg'>Upgrade to {BRAND_CONFIG.PLATFORM_NAME} Pro</h3>
        </div>
        <p className='text-muted-foreground'>
          Get unlimited hearts and unlock all AWS certification paths!
        </p>
      </div>
      <Button asChild variant='primary' className='w-full' size='lg'>
        <Link href='/pro'>Upgrade today</Link>
      </Button>
    </Card>
  )
}
