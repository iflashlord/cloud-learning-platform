/**
 * 📱 Enhanced Universal Header
 *
 * Universal header for all screen sizes with:
 * - Perfect contrast in light/dark modes
 * - Smooth animations and transitions
 * - Accessibility features
 * - Theme-aware styling
 * - Unique navigation items (not duplicating bottom nav)
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap, Crown } from "lucide-react"
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { CONFIG } from "@/lib/config"
import { zIndex } from "@/lib/z-index-system"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { useIsAdmin } from "@/hooks/useIsAdmin"
import { SettingsDropdown } from "@/components/settings-dropdown"
import {
  toggleManualProMode,
  getManualProModeStatus,
} from "@/actions/admin-pro-mode"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Header navigation items (simplified - settings moved to dropdown)
const getHeaderNavItems = (isPro = false) => {
  const items = []

  // Only show Pro link for non-pro users
  if (!isPro) {
    items.push({
      label: "Pro",
      href: "/pro",
      icon: Crown,
      activeColor: "text-yellow-500 dark:text-yellow-400",
    })
  }

  return items
}

interface HeaderNavItemProps {
  item: {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    activeColor: string
  }
  isActive: boolean
}

const HeaderNavItem = ({ item, isActive }: HeaderNavItemProps) => {
  const { label, href, icon: Icon, activeColor } = item

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center relative",
        "min-w-0 flex-1 py-1 px-2",
        "transition-all duration-200 ease-out",
        "active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        "rounded-lg"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-all duration-200",
          isActive ? activeColor : "text-muted-foreground"
        )}
      />
      <span
        className={cn(
          "text-xs font-medium mt-0.5 truncate w-full text-center",
          "transition-all duration-200",
          isActive ? activeColor : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </Link>
  )
}

export const EnhancedMobileHeader: React.FC = () => {
  const pathname = usePathname()
  const { isAdmin, isLoggedIn } = useIsAdmin()
  const [showResetDialog, setShowResetDialog] = React.useState(false)
  const [isProMode, setIsProMode] = React.useState(false)
  const [isPro, setIsPro] = React.useState(false)

  // Check subscription status
  React.useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await fetch("/api/user/subscription")
        if (response.ok) {
          const data = await response.json()
          setIsPro(!!data.isActive)
        }
      } catch (error) {
        console.error("Failed to check subscription:", error)
      }
    }

    if (isLoggedIn) {
      checkSubscription()
    }
  }, [isLoggedIn])

  const headerNavItems = getHeaderNavItems(isPro)

  // Load pro mode status for admins
  React.useEffect(() => {
    if (isAdmin && isLoggedIn) {
      getManualProModeStatus()
        .then((result) => setIsProMode(result.isProMode))
        .catch((error) =>
          console.error("Failed to get pro mode status:", error)
        )
    }
  }, [isAdmin, isLoggedIn])

  const handleResetProgress = async () => {
    try {
      const response = await fetch("/api/progress/reset", {
        method: "POST",
      })

      if (response.ok) {
        toast.success("Progress reset successfully!")
        window.location.reload()
      } else {
        toast.error("Failed to reset progress")
      }
    } catch (error) {
      console.error("Error resetting progress:", error)
      toast.error("Failed to reset progress")
    }
    setShowResetDialog(false)
  }

  const handleToggleProMode = async () => {
    try {
      const result = await toggleManualProMode()
      if (result.success) {
        setIsProMode(result.isProMode)
        toast.success(result.message)
      }
    } catch (error) {
      console.error("Failed to toggle pro mode:", error)
      toast.error("Failed to toggle pro mode")
    }
  }

  return (
    <nav
      className={cn(
        "px-4 h-[60px] flex items-center justify-between",
        "bg-background dark:bg-background backdrop-blur-md",
        "border-b border-border/50 fixed top-0 w-full",
        "shadow-sm",
        zIndex("MOBILE_HEADER")
      )}
    >
      {/* Left side - Logo */}
      <Link href='/learn' className='flex items-center gap-2'>
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            "bg-gradient-to-br from-primary to-primary/80"
          )}
        >
          <GraduationCap className='h-5 w-5 text-white dark:text-gray-700' />
        </div>
        <h1 className='text-lg font-bold text-foreground'>
          {CONFIG.PLATFORM_NAME}
        </h1>
      </Link>

      {/* Center - Navigation Icons */}
      <div className='flex items-center justify-center flex-1 mx-4'>
        {headerNavItems.map((item) => (
          <HeaderNavItem
            key={item.href + item.label}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </div>

      {/* Right side - Settings, Theme and User */}
      <div className='flex items-center gap-2'>
        <SettingsDropdown
          onResetProgress={() => setShowResetDialog(true)}
          onToggleProMode={handleToggleProMode}
          isProMode={isProMode}
        />

        <ThemeSwitcher variant='compact' size='sm' />

        <div className='ml-1'>
          <ClerkLoading>
            <div className='w-7 h-7 bg-muted rounded-full animate-pulse' />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton
              afterSignOutUrl='/'
              appearance={{
                elements: {
                  avatarBox: "w-7 h-7",
                },
              }}
            />
          </ClerkLoaded>
        </div>
      </div>

      {/* Reset Progress Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Progress</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset all your progress? This action
              cannot be undone and will permanently delete:
              <ul className='mt-2 ml-4 list-disc'>
                <li>All completed lessons and units</li>
                <li>Your current points and hearts</li>
                <li>All quest completions</li>
                <li>Your leaderboard progress</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetProgress}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Yes, Reset Everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  )
}
