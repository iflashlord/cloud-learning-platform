"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { PageLayout, useResponsive } from "@/lib/enhanced-layout-system"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { EnhancedMobileHeader } from "@/components/enhanced-mobile-header"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { Promo } from "@/components/promo"
import { Quests } from "@/components/quests"

type Props = {
  children: React.ReactNode
  points: number
  hasActiveSubscription: boolean
  showQuests?: boolean
  additionalSidebarContent?: React.ReactNode
  className?: string
}

export const EnhancedAppLayoutComponent = ({
  children,
  points,
  hasActiveSubscription,
  showQuests = true,
  additionalSidebarContent,
  className,
}: Props) => {
  const { isMobile } = useResponsive()

  const sidebarContent = (
    <>
      {additionalSidebarContent}

      {!hasActiveSubscription && <Promo />}

      {showQuests && <Quests points={points} />}
    </>
  )

  return (
    <div className='min-h-screen'>
      {isMobile && <EnhancedMobileHeader />}
      {!isMobile && <EnhancedSidebar />}
      <div
        className={cn(
          "transition-all duration-300",
          !isMobile ? "lg:pl-[280px]" : "",
          isMobile ? "pt-[65px]" : "",
          className,
        )}
      >
        <div className='flex'>
          {sidebarContent}
          <div className='flex-1 px-4 sm:px-6'>{children}</div>
        </div>
      </div>
    </div>
  )
}
