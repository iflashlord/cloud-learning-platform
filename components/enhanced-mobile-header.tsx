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
        "rounded-lg",
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-all duration-200",
          isActive ? activeColor : "text-muted-foreground",
        )}
      />
      <span
        className={cn(
          "text-xs font-medium mt-0.5 truncate w-full text-center",
          "transition-all duration-200",
          isActive ? activeColor : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </Link>
  )
}

export const EnhancedMobileHeader: React.FC = () => {
  const pathname = usePathname()
  const { user, isSignedIn } = useUser()
  const { isAdmin, isLoggedIn } = useIsAdmin()
  const [showResetDialog, setShowResetDialog] = React.useState(false)
  const [isProMode, setIsProMode] = React.useState(false)
  const [isPro, setIsPro] = React.useState(false)
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
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasLoadedOnce, setHasLoadedOnce] = React.useState(false)
  const [loadingError, setLoadingError] = React.useState(false)
  const isLoadingRef = React.useRef(false)

  const themeClasses = useThemeClasses()

  // Fetch user data when Clerk user is available
  React.useEffect(() => {
    let mounted = true
    let timeoutId: NodeJS.Timeout
    let failsafeTimeoutId: NodeJS.Timeout

    const fetchUserData = async () => {
      if (!mounted) return

      setIsLoading(true)
      isLoadingRef.current = true
      setLoadingError(false)

      try {
        const [subscriptionResponse, progressResponse] = await Promise.all([
          fetch("/api/user/subscription"),
          fetch("/api/user/progress"),
        ])

        if (!mounted) return

        if (subscriptionResponse.ok) {
          const subscriptionData = await subscriptionResponse.json()
          setIsPro(!!subscriptionData.isActive)
        }

        if (progressResponse.ok) {
          const progressData = await progressResponse.json()
          setUserProgress(progressData)
        }

        setHasLoadedOnce(true)
      } catch (error) {
        if (mounted) {
          console.error("Failed to fetch user data:", error)
          setLoadingError(true)
          setHasLoadedOnce(true)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
          isLoadingRef.current = false
        }
      }
    }

    // Simple condition: only fetch if signed in, has user ID, and hasn't loaded yet
    if (isSignedIn && user?.id && !hasLoadedOnce) {
      // Small delay to ensure Clerk is stable
      timeoutId = setTimeout(() => {
        fetchUserData()
      }, 150)

      // Failsafe: force stop loading after 5 seconds
      failsafeTimeoutId = setTimeout(() => {
        if (mounted && isLoadingRef.current) {
          console.warn("Loading timeout reached, forcing completion")
          setIsLoading(false)
          isLoadingRef.current = false
          setHasLoadedOnce(true)
          setLoadingError(true)
        }
      }, 5000)
    }

    return () => {
      mounted = false
      if (timeoutId) clearTimeout(timeoutId)
      if (failsafeTimeoutId) clearTimeout(failsafeTimeoutId)
    }
  }, [isSignedIn, user?.id, hasLoadedOnce])

  // Reset states when user signs out
  React.useEffect(() => {
    if (!isSignedIn) {
      setUserProgress(null)
      setIsPro(false)
      setIsLoading(false)
      isLoadingRef.current = false
      setHasLoadedOnce(false)
      setLoadingError(false)
    }
  }, [isSignedIn])

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
        <div
          className={cn(
            "w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center",
            "bg-gradient-to-br from-primary to-primary/80 flex-shrink-0",
          )}
        >
          <GraduationCap className='h-4 w-4 sm:h-5 sm:w-5 text-white dark:text-gray-700' />
        </div>
        <h1 className='text-sm sm:text-lg font-bold text-foreground truncate hidden sm:block'>
          {CONFIG.PLATFORM_NAME}
        </h1>
      </Link>

      {/* Progress section with improved loading state */}
      <div className='flex items-center gap-1 sm:gap-2 flex-1 justify-center mx-2'>
        <ClerkLoading>
          {/* Show skeleton while Clerk is loading */}
          <div className='flex items-center gap-1 sm:gap-2'>
            <div className='w-8 h-8 bg-muted rounded animate-pulse'></div>
            <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
            <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
            <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          {isSignedIn && (isLoading || !hasLoadedOnce) ? (
            // Loading skeleton for data fetch
            <div className='flex items-center gap-1 sm:gap-2'>
              <div className='w-8 h-8 bg-muted rounded animate-pulse'></div>
              <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
              <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
              <div className='w-12 h-6 bg-muted rounded animate-pulse'></div>
            </div>
          ) : isSignedIn && userProgress ? (
            // User progress data
            <>
              <Link href='/courses'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-8'
                >
                  <Image
                    src={userProgress.activeCourse.imageSrc}
                    alt={userProgress.activeCourse.title}
                    className='rounded border border-neutral-200 flex-shrink-0'
                    width={24}
                    height={24}
                  />
                  <span className='text-xs font-medium text-foreground truncate max-w-[130px] sm:max-w-[140px] hidden sm:inline'>
                    {userProgress.activeCourse.title}
                  </span>
                </Button>
              </Link>

              <Link href='/shop'>
                <Button
                  variant='ghost'
                  size='sm'
                  className={cn("gap-1 px-2 h-8", GAME_ELEMENT_COLORS.XP.text)}
                >
                  <Coins className={cn("h-4 w-4 sm:h-5 sm:w-5", GAME_ELEMENT_COLORS.XP.icon)} />
                  <span className='font-bold text-xs sm:text-sm'>{userProgress.points}</span>
                </Button>
              </Link>

              <Link href='/shop'>
                <Button
                  variant='ghost'
                  size='sm'
                  className={cn("gap-1 px-2 h-8", GAME_ELEMENT_COLORS.GEMS.text)}
                >
                  <Gem className={cn("h-4 w-4 sm:h-5 sm:w-5", GAME_ELEMENT_COLORS.GEMS.icon)} />
                  <span className='font-bold text-xs sm:text-sm'>{userProgress.gems}</span>
                </Button>
              </Link>

              <Link href='/shop'>
                <Button
                  variant='ghost'
                  size='sm'
                  className={cn("gap-1 px-2 h-8", GAME_ELEMENT_COLORS.HEARTS.text)}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 sm:h-5 sm:w-5 fill-current",
                      GAME_ELEMENT_COLORS.HEARTS.icon,
                    )}
                  />
                  <span className='font-medium text-xs sm:text-sm'>
                    {isPro ? (
                      <InfinityIcon className='h-3 w-3 sm:h-4 sm:w-4 stroke-[3]' />
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

      <div className='flex items-center gap-1 sm:gap-2'>
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

        <ThemeSwitcher variant='compact' size='sm' />

        <div className='ml-1'>
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
