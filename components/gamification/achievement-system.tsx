"use client"

import { useState } from "react"
import { Award, Trophy, Star, Lock, CheckCircle, Zap, Gem } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CurrencyDisplay } from "./currency-display"

interface Achievement {
  id: number
  key: string
  title: string
  description: string
  category: "learning" | "social" | "streak" | "mastery" | "collection"
  iconSrc?: string
  badgeColor: string
  xpReward: number
  gemsReward: number
  isSecret: boolean
  unlockedAt?: Date
  progress?: number
}

interface AchievementCardProps {
  achievement: Achievement
  isUnlocked: boolean
  showRewards?: boolean
  size?: "sm" | "md" | "lg"
  animate?: boolean
}

const categoryConfig = {
  learning: {
    icon: Trophy,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    label: "Learning",
  },
  social: {
    icon: Star,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    label: "Social",
  },
  streak: {
    icon: CheckCircle,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    label: "Streak",
  },
  mastery: {
    icon: Award,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    label: "Mastery",
  },
  collection: {
    icon: Gem,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    label: "Collection",
  },
}

const badgeColorConfig = {
  bronze: "bg-gradient-to-br from-amber-600 to-amber-800",
  silver: "bg-gradient-to-br from-gray-400 to-gray-600",
  gold: "bg-gradient-to-br from-yellow-400 to-yellow-600",
  platinum: "bg-gradient-to-br from-blue-400 to-purple-600",
  diamond: "bg-gradient-to-br from-cyan-400 to-blue-600",
  legendary: "bg-gradient-to-br from-purple-500 to-pink-600",
}

export const AchievementCard = ({
  achievement,
  isUnlocked,
  showRewards = true,
  size = "md",
  animate = false,
}: AchievementCardProps) => {
  const category = categoryConfig[achievement.category]
  const CategoryIcon = category.icon
  const badgeGradient =
    badgeColorConfig[achievement.badgeColor as keyof typeof badgeColorConfig] ||
    badgeColorConfig.bronze

  const isSecret = achievement.isSecret && !isUnlocked
  const displayTitle = isSecret ? "???" : achievement.title
  const displayDescription = isSecret
    ? "Complete more challenges to unlock this secret achievement!"
    : achievement.description

  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg",
        sizeClasses[size],
        isUnlocked
          ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10"
          : "border-gray-200 dark:border-gray-700",
        animate && "hover:scale-105",
        !isUnlocked && "opacity-75",
      )}
    >
      <div className='flex items-start gap-3'>
        {/* Achievement Badge */}
        <div className='relative flex-shrink-0'>
          <div
            className={cn(
              "rounded-full flex items-center justify-center text-white shadow-lg",
              iconSizes[size],
              isUnlocked ? badgeGradient : "bg-gray-400 dark:bg-gray-600",
            )}
          >
            {isSecret && !isUnlocked ? (
              <Lock className={cn(iconSizes[size === "lg" ? "md" : "sm"])} />
            ) : (
              <CategoryIcon className={cn(iconSizes[size === "lg" ? "md" : "sm"])} />
            )}
          </div>
          {isUnlocked && (
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center'>
              <CheckCircle className='h-3 w-3 text-white' />
            </div>
          )}
        </div>

        {/* Content */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-2 mb-2'>
            <div className='flex-1 min-w-0'>
              <h3
                className={cn(
                  "font-semibold truncate",
                  size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg",
                  isUnlocked ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {displayTitle}
              </h3>
              <Badge
                variant={achievement.category === "learning" ? "info" : "default"}
                className='text-xs mt-1'
              >
                {category.label}
              </Badge>
            </div>
            {isUnlocked && achievement.unlockedAt && (
              <div className='text-xs text-muted-foreground text-right'>
                <div>Unlocked</div>
                <div>{achievement.unlockedAt.toLocaleDateString()}</div>
              </div>
            )}
          </div>

          <p className={cn("text-muted-foreground mb-3", size === "sm" ? "text-xs" : "text-sm")}>
            {displayDescription}
          </p>

          {/* Rewards */}
          {showRewards && !isSecret && (achievement.xpReward > 0 || achievement.gemsReward > 0) && (
            <div className='flex items-center gap-2'>
              <span className='text-xs text-muted-foreground'>Rewards:</span>
              {achievement.xpReward > 0 && (
                <CurrencyDisplay type='xp' value={achievement.xpReward} size='sm' />
              )}
              {achievement.gemsReward > 0 && (
                <CurrencyDisplay type='gems' value={achievement.gemsReward} size='sm' />
              )}
            </div>
          )}

          {/* Progress (for progressive achievements) */}
          {achievement.progress !== undefined && achievement.progress < 100 && (
            <div className='mt-2'>
              <div className='flex justify-between items-center mb-1'>
                <span className='text-xs text-muted-foreground'>Progress</span>
                <span className='text-xs font-medium'>{achievement.progress}%</span>
              </div>
              <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5'>
                <div
                  className={cn("h-1.5 rounded-full transition-all duration-300", badgeGradient)}
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

interface AchievementGridProps {
  achievements: Achievement[]
  unlockedAchievements: Set<number>
  title?: string
  emptyMessage?: string
  showCategories?: boolean
  maxDisplay?: number
}

export const AchievementGrid = ({
  achievements,
  unlockedAchievements,
  title = "Achievements",
  emptyMessage = "No achievements to display",
  showCategories = true,
  maxDisplay,
}: AchievementGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showAll, setShowAll] = useState(false)

  const categories = Array.from(new Set(achievements.map((a) => a.category)))
  const unlockedCount = achievements.filter((a) => unlockedAchievements.has(a.id)).length

  const filteredAchievements = achievements.filter((achievement) => {
    if (selectedCategory === "all") return true
    return achievement.category === selectedCategory
  })

  const displayedAchievements =
    maxDisplay && !showAll ? filteredAchievements.slice(0, maxDisplay) : filteredAchievements

  return (
    <div className='space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-bold text-foreground'>{title}</h2>
          <p className='text-sm text-muted-foreground'>
            {unlockedCount}/{achievements.length} unlocked
          </p>
        </div>

        {/* Progress Ring or Bar */}
        <div className='text-right'>
          <div className='text-2xl font-bold text-foreground'>
            {Math.round((unlockedCount / achievements.length) * 100)}%
          </div>
          <div className='text-xs text-muted-foreground'>Complete</div>
        </div>
      </div>

      {/* Category Filter */}
      {showCategories && categories.length > 1 && (
        <div className='flex gap-1 p-1 bg-muted rounded-lg w-fit overflow-x-auto'>
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
              selectedCategory === "all"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
                selectedCategory === category
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {categoryConfig[category as keyof typeof categoryConfig]?.label || category}
            </button>
          ))}
        </div>
      )}

      {/* Achievement Grid */}
      {displayedAchievements.length > 0 ? (
        <>
          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {displayedAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                isUnlocked={unlockedAchievements.has(achievement.id)}
                animate
              />
            ))}
          </div>

          {/* Show More Button */}
          {maxDisplay && filteredAchievements.length > maxDisplay && !showAll && (
            <div className='text-center'>
              <Button variant='outline' onClick={() => setShowAll(true)} className='mt-4'>
                Show {filteredAchievements.length - maxDisplay} More
              </Button>
            </div>
          )}
        </>
      ) : (
        <Card className='p-8 text-center'>
          <Award className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
          <p className='text-muted-foreground'>{emptyMessage}</p>
        </Card>
      )}
    </div>
  )
}
