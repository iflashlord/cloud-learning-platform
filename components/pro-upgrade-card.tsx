import Link from "next/link"
import { Crown, Zap, Infinity, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProUpgradeCardProps {
  className?: string
}

export const ProUpgradeCard = ({ className }: ProUpgradeCardProps) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
        "border border-purple-200 dark:border-purple-800 rounded-xl p-4 text-center",
        className,
      )}
    >
      <div className='flex items-center justify-center gap-2 mb-3'>
        <div className='w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
          <Crown className='w-4 h-4 text-white' />
        </div>
        <h3 className='font-bold text-purple-700 dark:text-purple-300'>Upgrade to PRO</h3>
      </div>

      <div className='space-y-2 mb-4 text-sm text-purple-600 dark:text-purple-400'>
        <div className='flex items-center gap-2'>
          <Infinity className='w-4 h-4 text-purple-500' />
          <span>Unlimited Hearts</span>
        </div>
        <div className='flex items-center gap-2'>
          <Zap className='w-4 h-4 text-purple-500' />
          <span>Exclusive Features</span>
        </div>
        <div className='flex items-center gap-2'>
          <Target className='w-4 h-4 text-purple-500' />
          <span>Advanced Analytics</span>
        </div>
      </div>

      <Link href='/pro'>
        <Button
          size='sm'
          variant='subtle'
          className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium'
        >
          Get PRO Now
        </Button>
      </Link>
    </div>
  )
}
