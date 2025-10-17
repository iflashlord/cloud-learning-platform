"use client"

import { useState } from "react"
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Calendar, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CurrencyDisplay } from "./currency-display"

interface LeaderboardEntry {
  userId: string
  userName: string
  userImageSrc: string
  rank: number
  xp: number
  streak?: number
  lessonsCompleted?: number
  courseTitle?: string
  isCurrentUser?: boolean
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  currentUser?: LeaderboardEntry
  type: "global" | "course" | "weekly" | "monthly"
  title?: string
  showUserRank?: boolean
  maxDisplay?: number
  loading?: boolean
}

const leaderboardConfig = {
  global: {
    icon: Globe,
    title: "Global Leaderboard",
    description: "Top learners across all courses",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  course: {
    icon: Users,
    title: "Course Leaderboard",
    description: "Top learners in this course",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  weekly: {
    icon: Calendar,
    title: "Weekly Champions",
    description: "This week's top performers",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  monthly: {
    icon: TrendingUp,
    title: "Monthly Leaders",
    description: "This month's achievements",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        icon: Crown,
        color: "text-yellow-500",
        bg: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      }
    case 2:
      return {
        icon: Medal,
        color: "text-gray-400",
        bg: "bg-gradient-to-br from-gray-400 to-gray-600",
      }
    case 3:
      return {
        icon: Medal,
        color: "text-amber-600",
        bg: "bg-gradient-to-br from-amber-600 to-amber-800",
      }
    default:
      return null
  }
}

export const LeaderboardEntry = ({
  entry,
  showDetails = true,
  size = "md",
}: {
  entry: LeaderboardEntry
  showDetails?: boolean
  size?: "sm" | "md" | "lg"
}) => {
  const rankIcon = getRankIcon(entry.rank)
  const RankIcon = rankIcon?.icon

  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  const avatarSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        sizeClasses[size],
        entry.isCurrentUser && "ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10",
      )}
    >
      <div className='flex items-center gap-3'>
        {/* Rank */}
        <div className='flex-shrink-0 flex items-center justify-center w-8 h-8'>
          {rankIcon && RankIcon ? (
            <div
              className={cn("w-8 h-8 rounded-full flex items-center justify-center", rankIcon.bg)}
            >
              <RankIcon className='h-4 w-4 text-white' />
            </div>
          ) : (
            <div className='w-8 h-8 rounded-full bg-muted flex items-center justify-center'>
              <span className='text-sm font-bold text-muted-foreground'>{entry.rank}</span>
            </div>
          )}
        </div>

        {/* Avatar */}
        <Avatar className={avatarSizes[size]}>
          <AvatarImage src={entry.userImageSrc} alt={entry.userName} />
          <AvatarFallback>{entry.userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2'>
            <h3 className={cn("font-semibold truncate", size === "sm" ? "text-sm" : "text-base")}>
              {entry.userName}
            </h3>
            {entry.isCurrentUser && (
              <Badge variant='info' className='text-xs'>
                You
              </Badge>
            )}
          </div>
          {showDetails && entry.courseTitle && (
            <p className='text-xs text-muted-foreground truncate'>{entry.courseTitle}</p>
          )}
        </div>

        {/* Stats */}
        <div className='flex-shrink-0 text-right'>
          <CurrencyDisplay type='xp' value={entry.xp} size='sm' />
          {showDetails && (
            <div className='flex items-center gap-2 mt-1'>
              {entry.streak && entry.streak > 0 && (
                <CurrencyDisplay type='streak' value={entry.streak} size='sm' />
              )}
              {entry.lessonsCompleted && (
                <span className='text-xs text-muted-foreground'>
                  {entry.lessonsCompleted} lessons
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export const Leaderboard = ({
  entries,
  currentUser,
  type,
  title,
  showUserRank = true,
  maxDisplay = 10,
  loading = false,
}: LeaderboardProps) => {
  const [showAll, setShowAll] = useState(false)
  const config = leaderboardConfig[type]
  const Icon = config.icon

  const displayedEntries = showAll ? entries : entries.slice(0, maxDisplay)
  const currentUserInTop =
    currentUser && entries.slice(0, maxDisplay).some((e) => e.userId === currentUser.userId)

  if (loading) {
    return (
      <Card className='p-6'>
        <div className='animate-pulse space-y-4'>
          <div className='h-6 bg-muted rounded w-1/3' />
          <div className='space-y-2'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className='h-16 bg-muted rounded' />
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className='space-y-4'>
      {/* Header */}
      <CardHeader className='px-0 pb-4'>
        <div className='flex items-center gap-3'>
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              config.bgColor,
            )}
          >
            <Icon className={cn("h-5 w-5", config.color)} />
          </div>
          <div>
            <h2 className='text-lg font-bold text-foreground'>{title || config.title}</h2>
            <p className='text-sm text-muted-foreground'>{config.description}</p>
          </div>
        </div>
      </CardHeader>

      {entries.length === 0 ? (
        <Card className='p-8 text-center'>
          <Trophy className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
          <p className='text-muted-foreground'>No data available for this leaderboard yet.</p>
        </Card>
      ) : (
        <>
          {/* Top 3 Podium for large displays */}
          {entries.length >= 3 && (
            <div className='hidden lg:grid grid-cols-3 gap-4 mb-6'>
              {/* 2nd Place */}
              <div className='flex flex-col items-center pt-8'>
                <div className='w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-2'>
                  <Medal className='h-8 w-8 text-white' />
                </div>
                <Avatar className='h-12 w-12 mb-2'>
                  <AvatarImage src={entries[1].userImageSrc} alt={entries[1].userName} />
                  <AvatarFallback>{entries[1].userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className='font-semibold text-sm text-center'>{entries[1].userName}</h3>
                <CurrencyDisplay type='xp' value={entries[1].xp} size='sm' />
              </div>

              {/* 1st Place */}
              <div className='flex flex-col items-center'>
                <div className='w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2'>
                  <Crown className='h-10 w-10 text-white' />
                </div>
                <Avatar className='h-16 w-16 mb-2 ring-4 ring-yellow-400/50'>
                  <AvatarImage src={entries[0].userImageSrc} alt={entries[0].userName} />
                  <AvatarFallback>{entries[0].userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className='font-bold text-lg text-center'>{entries[0].userName}</h3>
                <CurrencyDisplay type='xp' value={entries[0].xp} size='md' />
                <Badge variant='warning' className='mt-1'>
                  Champion
                </Badge>
              </div>

              {/* 3rd Place */}
              <div className='flex flex-col items-center pt-8'>
                <div className='w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center mb-2'>
                  <Medal className='h-8 w-8 text-white' />
                </div>
                <Avatar className='h-12 w-12 mb-2'>
                  <AvatarImage src={entries[2].userImageSrc} alt={entries[2].userName} />
                  <AvatarFallback>{entries[2].userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className='font-semibold text-sm text-center'>{entries[2].userName}</h3>
                <CurrencyDisplay type='xp' value={entries[2].xp} size='sm' />
              </div>
            </div>
          )}

          {/* Full List */}
          <div className='space-y-2'>
            {displayedEntries.map((entry) => (
              <LeaderboardEntry key={entry.userId} entry={entry} />
            ))}
          </div>

          {/* Current User Position (if not in top) */}
          {showUserRank && currentUser && !currentUserInTop && (
            <>
              <div className='flex items-center gap-2 py-2'>
                <div className='flex-1 h-px bg-border' />
                <span className='text-xs text-muted-foreground px-2'>Your Position</span>
                <div className='flex-1 h-px bg-border' />
              </div>
              <LeaderboardEntry entry={currentUser} />
            </>
          )}

          {/* Show More Button */}
          {entries.length > maxDisplay && !showAll && (
            <div className='text-center'>
              <Button variant='outline' onClick={() => setShowAll(true)} className='mt-4'>
                Show {entries.length - maxDisplay} More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
