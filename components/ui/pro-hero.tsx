"use client"

import { Crown, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { statusStyles } from "@/lib/style-utils"

interface ProHeroProps {
  onStartTrial: () => void
}

export const ProHero = ({ onStartTrial }: ProHeroProps) => {
  return (
    <div className='text-center mb-12'>
      <div className='flex items-center justify-center mb-4'>
        <Crown className={cn("w-12 h-12 mr-3", statusStyles.warning.text)} />
        <h1 className='text-4xl font-bold text-foreground'>
          Upgrade to{" "}
          <span className='text-orange-500 dark:text-orange-400'>Pro</span>
        </h1>
      </div>
      <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
        Unlock unlimited learning potential with advanced features, exclusive
        content, and priority support.
      </p>

      <div className='bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white max-w-md mx-auto mb-12'>
        <div className='flex items-center justify-center mb-4'>
          <Star className='w-8 h-8 mr-2' />
          <span className='text-2xl font-bold'>Pro Membership</span>
        </div>
        <div className='text-4xl font-bold mb-2'>$9.99</div>
        <div className='text-orange-100 mb-6'>per month</div>
        <button
          onClick={onStartTrial}
          className='w-full bg-white dark:bg-gray-100 text-orange-600 py-3 px-6 rounded-lg font-bold text-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors'
        >
          Start Free Trial
        </button>
        <p className='text-sm text-orange-100 mt-3'>
          7-day free trial • Cancel anytime
        </p>
      </div>
    </div>
  )
}
