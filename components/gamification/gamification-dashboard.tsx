"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  Flame,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Star,
  Users,
  ChevronRight,
  Gift,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CurrencyDisplay, CurrencyHeader } from "./currency-display"
import { QuestCard } from "./quest-system"
import { AchievementCard } from "./achievement-system"
import { LeaderboardEntry } from "./leaderboard"

interface GameStats {
  level: number
  totalXP: number
  xpToNextLevel: number
  currentLevelXP: number
  lessonsCompleted: number
  perfectLessons: number
  currentStreak: number
  bestStreak: number
  rank: number
  totalUsers: number
}

interface QuickQuest {
  id: number
  title: string
  progress: number
  target: number
  xpReward: number
  gemsReward: number
}

interface RecentAchievement {
  id: number
  title: string
  category: string
  unlockedAt: Date
  xpReward: number
  gemsReward: number
}

interface TopPlayer {
  userId: string
  userName: string
  userImageSrc: string
  xp: number
  rank: number
}

interface GamificationDashboardProps {
  // User Progress Data
  hearts: number
  maxHearts: number
  xp: number
  gems: number
  streak: number
  isPro: boolean

  // Detailed Stats
  stats: GameStats

  // Quest & Achievement Data
  dailyQuests: QuickQuest[]
  recentAchievements: RecentAchievement[]

  // Leaderboard Data
  topPlayers: TopPlayer[]
  userRank?: number

  // Callbacks
  onViewAllQuests?: () => void
  onViewAllAchievements?: () => void
  onViewLeaderboard?: () => void
  onClaimQuest?: (questId: number) => void
}

export const GamificationDashboard = ({
  hearts,
  maxHearts,
  xp,
  gems,
  streak,
  isPro,
  stats,
  dailyQuests,
  recentAchievements,
  topPlayers,
  userRank,
  onViewAllQuests,
  onViewAllAchievements,
  onViewLeaderboard,
  onClaimQuest,
}: GamificationDashboardProps) => {
  const levelProgress = (stats.currentLevelXP / stats.xpToNextLevel) * 100
  const streakIsGood = streak >= 3
  const isTopRanked = userRank && userRank <= 10

  return (
    <div className='space-y-6'>
      {/* Header with Currency */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-foreground'>Your Progress</h1>
          <p className='text-muted-foreground'>
            Level {stats.level} • Rank #{userRank || "—"}
          </p>
        </div>
        <CurrencyHeader
          hearts={hearts}
          maxHearts={maxHearts}
          xp={xp}
          gems={gems}
          streak={streak}
          isPro={isPro}
        />
      </div>

      {/* Main Stats Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Level Progress */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <TrendingUp className='h-4 w-4 text-blue-500' />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-bold'>Level {stats.level}</span>
              <Badge variant='info' className='text-xs'>
                +{stats.xpToNextLevel - stats.currentLevelXP} XP to go
              </Badge>
            </div>
            <Progress value={levelProgress} className='h-2' />
            <div className='text-xs text-muted-foreground'>
              {stats.currentLevelXP} / {stats.xpToNextLevel} XP
            </div>
          </CardContent>
        </Card>

        {/* Streak */}
        <Card
          className={cn(
            "transition-all duration-200",
            streakIsGood &&
              "ring-2 ring-orange-200 bg-orange-50/50 dark:ring-orange-800 dark:bg-orange-900/10",
          )}
        >
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Flame
                className={cn("h-4 w-4", streakIsGood ? "text-orange-500" : "text-gray-400")}
              />
              Daily Streak
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-bold'>{streak} days</span>
              {streakIsGood && (
                <Badge variant='warning' className='text-xs'>
                  On Fire! 🔥
                </Badge>
              )}
            </div>
            <div className='text-xs text-muted-foreground'>Best: {stats.bestStreak} days</div>
          </CardContent>
        </Card>

        {/* Lessons Completed */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Target className='h-4 w-4 text-green-500' />
              Lessons
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='text-2xl font-bold'>{stats.lessonsCompleted}</div>
            <div className='text-xs text-muted-foreground'>
              {stats.perfectLessons} perfect (
              {Math.round((stats.perfectLessons / stats.lessonsCompleted) * 100)}%)
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Rank */}
        <Card
          className={cn(
            "transition-all duration-200",
            isTopRanked &&
              "ring-2 ring-yellow-200 bg-yellow-50/50 dark:ring-yellow-800 dark:bg-yellow-900/10",
          )}
        >
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Trophy
                className={cn("h-4 w-4", isTopRanked ? "text-yellow-500" : "text-gray-400")}
              />
              Global Rank
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-bold'>#{userRank || "—"}</span>
              {isTopRanked && (
                <Badge variant='warning' className='text-xs'>
                  Top 10! 👑
                </Badge>
              )}
            </div>
            <div className='text-xs text-muted-foreground'>
              of {stats.totalUsers.toLocaleString()} learners
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Daily Quests */}
        <Card>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-blue-500' />
                Daily Quests
              </CardTitle>
              {onViewAllQuests && (
                <Button variant='ghost' size='sm' onClick={onViewAllQuests}>
                  View All <ChevronRight className='h-4 w-4 ml-1' />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className='space-y-3'>
            {dailyQuests.length > 0 ? (
              dailyQuests.slice(0, 3).map((quest) => (
                <div key={quest.id} className='p-3 bg-muted/50 rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-medium text-sm'>{quest.title}</h4>
                    <div className='flex gap-1'>
                      {quest.xpReward > 0 && (
                        <CurrencyDisplay type='xp' value={quest.xpReward} size='sm' />
                      )}
                      {quest.gemsReward > 0 && (
                        <CurrencyDisplay type='gems' value={quest.gemsReward} size='sm' />
                      )}
                    </div>
                  </div>
                  <Progress value={(quest.progress / quest.target) * 100} className='h-1.5' />
                  <div className='text-xs text-muted-foreground mt-1'>
                    {quest.progress} / {quest.target}
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-4 text-muted-foreground'>
                <Calendar className='h-8 w-8 mx-auto mb-2' />
                <p className='text-sm'>No quests available today</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                <Award className='h-5 w-5 text-purple-500' />
                Recent Achievements
              </CardTitle>
              {onViewAllAchievements && (
                <Button variant='ghost' size='sm' onClick={onViewAllAchievements}>
                  View All <ChevronRight className='h-4 w-4 ml-1' />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className='space-y-3'>
            {recentAchievements.length > 0 ? (
              recentAchievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className='p-3 bg-muted/50 rounded-lg'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h4 className='font-medium text-sm'>{achievement.title}</h4>
                      <Badge variant='info' className='text-xs mt-1'>
                        {achievement.category}
                      </Badge>
                    </div>
                    <div className='flex gap-1'>
                      {achievement.xpReward > 0 && (
                        <CurrencyDisplay type='xp' value={achievement.xpReward} size='sm' />
                      )}
                      {achievement.gemsReward > 0 && (
                        <CurrencyDisplay type='gems' value={achievement.gemsReward} size='sm' />
                      )}
                    </div>
                  </div>
                  <div className='text-xs text-muted-foreground mt-1'>
                    {achievement.unlockedAt.toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-4 text-muted-foreground'>
                <Award className='h-8 w-8 mx-auto mb-2' />
                <p className='text-sm'>No recent achievements</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Players */}
        <Card>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                <Users className='h-5 w-5 text-green-500' />
                Top Players
              </CardTitle>
              {onViewLeaderboard && (
                <Button variant='ghost' size='sm' onClick={onViewLeaderboard}>
                  View All <ChevronRight className='h-4 w-4 ml-1' />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className='space-y-2'>
            {topPlayers.length > 0 ? (
              topPlayers.slice(0, 5).map((player) => (
                <LeaderboardEntry
                  key={player.userId}
                  entry={{
                    userId: player.userId,
                    userName: player.userName,
                    userImageSrc: player.userImageSrc,
                    rank: player.rank,
                    xp: player.xp,
                  }}
                  showDetails={false}
                  size='sm'
                />
              ))
            ) : (
              <div className='text-center py-4 text-muted-foreground'>
                <Users className='h-8 w-8 mx-auto mb-2' />
                <p className='text-sm'>No leaderboard data</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pro Upgrade CTA (if not Pro) */}
      {!isPro && (
        <Card className='bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center'>
                  <Gift className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h3 className='text-lg font-bold text-foreground'>Unlock Your Full Potential</h3>
                  <p className='text-muted-foreground'>
                    Get unlimited hearts, daily gem bonuses, and exclusive features with Pro!
                  </p>
                </div>
              </div>
              <Button
                variant='primary'
                size='lg'
                className='bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                asChild
              >
                <Link href='/pro'>Upgrade to Pro</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
