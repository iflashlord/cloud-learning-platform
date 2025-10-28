"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { GraduationCap, Crown, InfinityIcon, Coins, Heart, Gem } from "lucide-react"
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { CONFIG } from "@/lib/config"
import { GAME_ELEMENT_COLORS } from "@/constants"
import { zIndex } from "@/lib/z-index-system"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { useIsAdmin } from "@/hooks/useIsAdmin"
import { SettingsDropdown } from "@/components/settings-dropdown"
import { Button } from "@/components/ui/button"
import { useThemeClasses } from "@/lib/theme-utils"
import { statusStyles } from "@/lib/style-utils"
import { toggleManualProMode, getManualProModeStatus } from "@/actions/admin-pro-mode"
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

const getHeaderNavItems = (isPro = false) => {
  const items = []

  if (!isPro) {
    items.push({
      label: "",
      href: "/pro",
      icon: Crown,
      activeColor: "text-yellow-500 dark:text-yellow-400",
    })
  }

  return items
}

const CONTROL_ICON_CLASS = "h-4 w-4 sm:h-5 sm:w-5"

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
  const stateColor = isActive ? activeColor : "text-muted-foreground"

  return (
    <Button
      asChild
      variant='ghost'
      size='sm'
      noMinWidth
      className={cn(
        "gap-1 px-2 h-8 justify-center text-xs font-semibold",
        "border border-transparent hover:border-border/60",
        "bg-transparent hover:bg-muted/60 transition-all",
        stateColor,
      )}
    >
      <Link href={href} className='flex items-center justify-center gap-1'>
        <Icon className={cn(CONTROL_ICON_CLASS, stateColor)} />
        <span className='truncate'>{label}</span>
      </Link>
    </Button>
  )
}

// Custom hook for user data with simplified loading logic
const useUserData = () => {
  const { user, isSignedIn, isLoaded } = useUser()
  const [userProgress, setUserProgress] = React.useState<{
    activeCourse: {
      id: number
      title: string
      imageSrc: string
    }
    hearts: number
    points: number
    gems: number
  } | null>(null)
  const [isPro, setIsPro] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const refetch = React.useCallback(async () => {
    if (!isLoaded || !isSignedIn || !user?.id) return
    setIsLoading(true)
    setError(null)
    try {
      const [subscriptionRes, progressRes] = await Promise.all([
        fetch("/api/user/subscription", { cache: "no-store" }),
        fetch("/api/user/progress", { cache: "no-store" }),
      ])
      if (subscriptionRes.ok) {
        const subData = await subscriptionRes.json()
        setIsPro(!!subData.isActive)
      }
      if (progressRes.ok) {
        const progressData = await progressRes.json()
        setUserProgress(progressData)
      } else {
        setError("Failed to load progress")
      }
    } catch (err) {
      setError("Network error")
      console.error("User data fetch error:", err)
    } finally {
      setIsLoading(false)
    }
  }, [isLoaded, isSignedIn, user?.id])

  React.useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) {
      setUserProgress(null)
      setIsPro(false)
      setIsLoading(false)
      setError(null)
      return
    }

    let cancelled = false
    setIsLoading(true)
    setError(null)

    // Add small delay to ensure Clerk is stable
    const timeoutId = setTimeout(() => {
      if (!cancelled) refetch()
    }, 100)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [isLoaded, isSignedIn, user?.id, refetch])

  // Listen for manual refresh signals
  React.useEffect(() => {
    const handler = () => {
      refetch()
    }
    window.addEventListener("user-progress:refresh", handler)
    return () => {
      window.removeEventListener("user-progress:refresh", handler)
    }
  }, [refetch])

  return {
    userProgress,
    isPro,
    isLoading: isLoading && isSignedIn,
    error,
    hasData: !!userProgress,
    isSignedIn,
  }
}

export const EnhancedMobileHeaderSimple: React.FC = () => {
  const pathname = usePathname()
  const { isAdmin, isLoggedIn } = useIsAdmin()
  const [showResetDialog, setShowResetDialog] = React.useState(false)
  const [isProMode, setIsProMode] = React.useState(false)

  const { userProgress, isPro, isLoading, hasData, isSignedIn } = useUserData()
  const themeClasses = useThemeClasses()
  const headerNavItems = getHeaderNavItems(isPro)

  React.useEffect(() => {
    if (isAdmin && isLoggedIn) {
      getManualProModeStatus()
        .then((result) => setIsProMode(result.isProMode))
        .catch((error) => console.error("Failed to get pro mode status:", error))
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
        "px-2 sm:px-4 h-[65px] flex items-center justify-between",
        "bg-background dark:bg-background backdrop-blur-md",
        "border-b border-border/50 fixed top-0 w-full",
        "shadow-sm",
        zIndex("MOBILE_HEADER"),
      )}
    >
      <Link href='/learn' className='flex items-center gap-1 sm:gap-2 min-w-0'>
        {/* <div
          className={cn(
            "w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center",
            "bg-gradient-to-br from-primary to-primary/80 flex-shrink-0",
          )}
        >
          <GraduationCap className='h-4 w-4 sm:h-5 sm:w-5 text-white dark:text-gray-700' />
        </div>
        <h1 className='text-sm sm:text-lg font-bold text-foreground truncate hidden sm:block'>
          {CONFIG.PLATFORM_NAME}
        </h1> */}
        <div className='flex items-center gap-x-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center shadow-lg'>
            <GraduationCap className='h-6 w-6 text-white' />
          </div>
          <h1 className='text-xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent'>
            {CONFIG.PLATFORM_NAME}
          </h1>
        </div>
      </Link>

      {/* Simplified progress section */}
      <div className='flex items-center gap-1 sm:gap-2 flex-1 justify-center mx-2'>
        <ClerkLoading>
          <div className='flex items-center gap-1 sm:gap-2'>
            <div className='w-8 h-8 bg-muted rounded animate-pulse'></div>
            <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
            <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
            <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          {isSignedIn && isLoading ? (
            <div className='flex items-center gap-1 sm:gap-2'>
              <div className='w-8 h-8 bg-muted rounded animate-pulse'></div>
              <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
              <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
              <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
            </div>
          ) : isSignedIn && hasData && userProgress ? (
            <>
              <Link href='/courses'>
                <Button
                  variant='ghost'
                  size='sm'
                  noMinWidth
                  className='flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-8'
                >
                  <Image
                    src={userProgress.activeCourse.imageSrc}
                    alt={userProgress.activeCourse.title}
                    className='rounded border border-neutral-200 flex-shrink-0'
                    width={24}
                    height={24}
                  />
                  <span className='text-xs font-medium text-foreground truncate max-w-[80px] sm:max-w-[80px] md:max-w-[150px] hidden sm:inline'>
                    {userProgress.activeCourse.title}
                  </span>
                </Button>
              </Link>

              <Link href='/shop'>
                <Button
                  variant='ghost'
                  size='sm'
                  noMinWidth
                  className={cn("gap-1 px-2 h-8", GAME_ELEMENT_COLORS.XP.text)}
                >
                  <Coins className={cn(CONTROL_ICON_CLASS, GAME_ELEMENT_COLORS.XP.icon)} />
                  <span className='font-bold text-xs sm:text-sm'>{userProgress.points}</span>
                </Button>
              </Link>

              <Link href='/shop'>
                <Button
                  variant='ghost'
                  size='sm'
                  noMinWidth
                  className={cn("gap-1 px-2 h-8", GAME_ELEMENT_COLORS.GEMS.text)}
                >
                  <Gem className={cn(CONTROL_ICON_CLASS, GAME_ELEMENT_COLORS.GEMS.icon)} />
                  <span className='font-bold text-xs sm:text-sm'>{userProgress.gems}</span>
                </Button>
              </Link>

              <Link href='/shop'>
                <Button
                  variant='ghost'
                  size='sm'
                  noMinWidth
                  className={cn("gap-1 px-2 h-8", GAME_ELEMENT_COLORS.HEARTS.text)}
                >
                  <Heart
                    className={cn(
                      CONTROL_ICON_CLASS,
                      "fill-current",
                      GAME_ELEMENT_COLORS.HEARTS.icon,
                    )}
                  />
                  <span className='font-medium text-xs sm:text-sm'>
                    {isPro ? (
                      <InfinityIcon
                        className={cn(
                          CONTROL_ICON_CLASS,
                          "stroke-[3]",
                          GAME_ELEMENT_COLORS.HEARTS.icon,
                        )}
                      />
                    ) : (
                      userProgress.hearts
                    )}
                  </span>
                </Button>
              </Link>
            </>
          ) : null}
        </ClerkLoaded>
      </div>

      <div className='flex items-center gap-0.5 sm:gap-1'>
        <div className='hidden sm:flex items-center'>
          {headerNavItems.map((item) => (
            <HeaderNavItem
              key={item.href + item.label}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </div>

        <SettingsDropdown
          onResetProgress={() => setShowResetDialog(true)}
          onToggleProMode={handleToggleProMode}
          isProMode={isProMode}
        />

        <ThemeSwitcher variant='compact' size='sm' className='h-8 w-8 p-0' />

        <div className='ml-0.5 sm:ml-1 mt-1'>
          <ClerkLoading>
            <div className='w-7 h-7 bg-muted rounded-full animate-pulse' />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-7 h-7",
                },
              }}
            />
          </ClerkLoaded>
        </div>
      </div>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Progress</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset all your progress? This action cannot be undone and
              will permanently delete:
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
