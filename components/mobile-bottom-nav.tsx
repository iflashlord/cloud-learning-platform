/**
 * 📱 Mobile Bottom Navigation
 *
 * Instagram-style bottom navigation for mobile devices:
 * - Fixed bottom positioning
 * - Primary navigation items only
 * - Active state indicators
 * - Touch-optimized sizing
 * - Theme-aware styling
 */

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Library, Trophy, Target, ShoppingCart, User } from "lucide-react"
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { zIndex } from "@/lib/z-index-system"

// Navigation items for mobile bottom bar
const mobileNavItems = [
  {
    label: "Learn",
    href: "/learn",
    icon: BookOpen,
    activeColor: "text-blue-500 dark:text-blue-400",
  },
  {
    label: "Courses",
    href: "/courses",
    icon: Library,
    activeColor: "text-indigo-500 dark:text-indigo-400",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
    activeColor: "text-amber-500 dark:text-amber-400",
  },
  {
    label: "Quests",
    href: "/quests",
    icon: Target,
    activeColor: "text-green-500 dark:text-green-400",
  },
  {
    label: "Shop",
    href: "/shop",
    icon: ShoppingCart,
    activeColor: "text-purple-500 dark:text-purple-400",
  },
]

interface MobileBottomNavItemProps {
  item: (typeof mobileNavItems)[0]
  isActive: boolean
}

const MobileBottomNavItem = ({ item, isActive }: MobileBottomNavItemProps) => {
  const { label, href, icon: Icon, activeColor } = item

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center relative",
        "min-w-0 flex-1 py-2 px-1",
        "transition-all duration-200 ease-out",
        "active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        "rounded-lg",
      )}
    >
      {/* Icon with badge */}
      <div className='relative'>
        <Icon
          className={cn(
            "h-6 w-6 transition-all duration-200",
            isActive ? activeColor : "text-muted-foreground",
          )}
        />
      </div>

      {/* Label */}
      <span
        className={cn(
          "text-xs font-medium mt-1 truncate w-full text-center",
          "transition-all duration-200",
          isActive ? activeColor : "text-muted-foreground",
        )}
      >
        {label}
      </span>

      {/* Active indicator */}
      {isActive && (
        <div
          className={cn(
            "absolute -bottom-1 left-1/2 transform -translate-x-1/2",
            "w-[calc(100%)] h-1",
            "bg-current opacity-50",
          )}
        />
      )}
    </Link>
  )
}

export const MobileBottomNav = () => {
  const pathname = usePathname()

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0",
          "bg-card/95 backdrop-blur-lg border-t border-border/50",
          "safe-area-inset-bottom",
          zIndex("MOBILE_BOTTOM_NAV"),
        )}
      >
        <div className='flex items-center justify-between px-2 py-1'>
          {/* Navigation Items */}
          {mobileNavItems.map((item) => (
            <MobileBottomNavItem key={item.href} item={item} isActive={pathname === item.href} />
          ))}
        </div>
      </nav>

      {/* Bottom Spacer for Content */}
      <div className='h-16 flex-shrink-0' />
    </>
  )
}
