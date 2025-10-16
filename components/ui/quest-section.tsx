"use client"

import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  icon: LucideIcon
  iconBgClass: string
  children: React.ReactNode
  className?: string
}

export const QuestSection = ({
  title,
  icon: Icon,
  iconBgClass,
  children,
  className,
}: Props) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className='flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6'>
        <div
          className={cn(
            "w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center bg-primary"
          )}
        >
          <Icon className='w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground' />
        </div>
        <h2 className='text-lg sm:text-xl font-semibold text-foreground'>
          {title}
        </h2>
        <div className='flex-1 h-px bg-border'></div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6'>
        {children}
      </div>
    </div>
  )
}
