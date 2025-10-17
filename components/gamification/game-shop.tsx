"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import {
  Heart,
  Zap,
  Gem,
  Shield,
  Clock,
  Star,
  Crown,
  Infinity,
  ShoppingCart,
  Check,
  Sparkles,
  Gift,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CurrencyDisplay } from "./currency-display"
import { purchaseShopItem } from "@/actions/gamification"
import { refillHeartsWithGemsAction } from "@/actions/user-progress"

interface ShopItem {
  id: string
  title: string
  description: string
  type: "hearts_refill" | "streak_freeze" | "double_xp" | "gem_pack" | "cosmetic"
  gemCost: number
  xpCost: number
  iconSrc?: string
  isLimited?: boolean
  isPopular?: boolean
  discount?: number
  durationHours?: number
}

interface ShopItemCardProps {
  item: ShopItem
  userGems: number
  userXP: number
  userHearts: number
  maxHearts: number
  isPro: boolean
  onPurchase: (itemId: string) => void
  isLoading?: boolean
}

const shopItemConfig = {
  hearts_refill: {
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    category: "Essential",
  },
  streak_freeze: {
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    category: "Protection",
  },
  double_xp: {
    icon: Zap,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    category: "Boost",
  },
  gem_pack: {
    icon: Gem,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    category: "Currency",
  },
  cosmetic: {
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    category: "Cosmetic",
  },
}

export const ShopItemCard = ({
  item,
  userGems,
  userXP,
  userHearts,
  maxHearts,
  isPro,
  onPurchase,
  isLoading,
}: ShopItemCardProps) => {
  const config = shopItemConfig[item.type]
  const Icon = config.icon

  // Check affordability
  const canAffordWithGems = item.gemCost === 0 || userGems >= item.gemCost
  const canAffordWithXP = item.xpCost === 0 || userXP >= item.xpCost
  const canAfford = canAffordWithGems || canAffordWithXP

  // Special conditions
  const isHeartsItem = item.type === "hearts_refill"
  const heartsAreFull = userHearts >= maxHearts
  const proHasUnlimitedHearts = isPro && isHeartsItem

  const isDisabled =
    !canAfford || (isHeartsItem && (heartsAreFull || proHasUnlimitedHearts)) || isLoading

  const getButtonText = () => {
    if (proHasUnlimitedHearts) return "Pro Has Unlimited"
    if (isHeartsItem && heartsAreFull) return "Hearts Full"
    if (!canAfford) return "Cannot Afford"
    return "Purchase"
  }

  const getPrimaryCost = () => {
    if (item.gemCost > 0) return { type: "gems", amount: item.gemCost }
    if (item.xpCost > 0) return { type: "xp", amount: item.xpCost }
    return null
  }

  const primaryCost = getPrimaryCost()

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-lg group",
        config.bgColor,
        config.borderColor,
        "border-2",
        !isDisabled && "hover:scale-105",
        isDisabled && "opacity-60",
      )}
    >
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div className='flex items-start gap-3'>
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shadow-md",
                config.bgColor,
              )}
            >
              <Icon className={cn("h-6 w-6", config.color)} />
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-1'>
                <h3 className='font-bold text-foreground'>{item.title}</h3>
                {item.isPopular && (
                  <Badge variant='warning' className='text-xs'>
                    <Star className='h-3 w-3 mr-1' />
                    Popular
                  </Badge>
                )}
                {item.isLimited && (
                  <Badge variant='error' className='text-xs'>
                    <Clock className='h-3 w-3 mr-1' />
                    Limited
                  </Badge>
                )}
              </div>
              <Badge variant='neutral' className='text-xs'>
                {config.category}
              </Badge>
            </div>
          </div>

          {item.discount && (
            <div className='bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold'>
              -{item.discount}%
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        <p className='text-sm text-muted-foreground'>
          {item.description}
          {item.durationHours && (
            <span className='block mt-1 text-xs'>Duration: {item.durationHours} hours</span>
          )}
        </p>

        {/* Cost Display */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {primaryCost && (
              <CurrencyDisplay
                type={primaryCost.type as any}
                value={primaryCost.amount}
                size='sm'
              />
            )}
            {item.gemCost > 0 && item.xpCost > 0 && (
              <>
                <span className='text-xs text-muted-foreground'>or</span>
                <CurrencyDisplay type='xp' value={item.xpCost} size='sm' />
              </>
            )}
          </div>

          <Button
            onClick={() => onPurchase(item.id)}
            disabled={isDisabled}
            size='sm'
            className={cn(
              "font-bold transition-all duration-200",
              !isDisabled && config.color.replace("text-", "hover:bg-").replace("-500", "-500/10"),
              isDisabled && "cursor-not-allowed",
            )}
            variant={!isDisabled ? "primary" : "outline"}
          >
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                <span>Processing...</span>
              </div>
            ) : (
              getButtonText()
            )}
          </Button>
        </div>

        {/* Special Effects/Benefits */}
        {item.type === "double_xp" && (
          <div className='flex items-center gap-2 p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg'>
            <Sparkles className='h-4 w-4 text-purple-500' />
            <span className='text-xs text-purple-700 dark:text-purple-300'>
              Earn 2x XP for all activities
            </span>
          </div>
        )}

        {item.type === "streak_freeze" && (
          <div className='flex items-center gap-2 p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg'>
            <Shield className='h-4 w-4 text-blue-500' />
            <span className='text-xs text-blue-700 dark:text-blue-300'>
              Protects your streak for one day
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface GameShopProps {
  userGems: number
  userXP: number
  userHearts: number
  maxHearts: number
  isPro: boolean
  onGemsChange?: (newGems: number) => void
  onXPChange?: (newXP: number) => void
  onHeartsChange?: (newHearts: number) => void
}

export const GameShop = ({
  userGems,
  userXP,
  userHearts,
  maxHearts,
  isPro,
  onGemsChange,
  onXPChange,
  onHeartsChange,
}: GameShopProps) => {
  const [pending, startTransition] = useTransition()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Mock shop items - in real app, these would come from the database
  const shopItems: ShopItem[] = [
    {
      id: "hearts_refill",
      title: "Refill Hearts",
      description: "Instantly restore all your hearts to full",
      type: "hearts_refill",
      gemCost: 5,
      xpCost: 10,
      isPopular: true,
    },
    {
      id: "streak_freeze",
      title: "Streak Freeze",
      description: "Protect your streak for one day if you miss a lesson",
      type: "streak_freeze",
      gemCost: 15,
      xpCost: 0,
    },
    {
      id: "double_xp_2h",
      title: "2-Hour XP Boost",
      description: "Earn double XP for all activities for 2 hours",
      type: "double_xp",
      gemCost: 20,
      xpCost: 0,
      durationHours: 2,
      isLimited: true,
    },
    {
      id: "gem_pack_small",
      title: "Small Gem Pack",
      description: "Get 50 gems instantly",
      type: "gem_pack",
      gemCost: 0,
      xpCost: 100,
    },
    {
      id: "gem_pack_large",
      title: "Large Gem Pack",
      description: "Get 200 gems instantly with 20% bonus",
      type: "gem_pack",
      gemCost: 0,
      xpCost: 400,
      discount: 20,
      isPopular: true,
    },
  ]

  const categories = [
    { key: "all", label: "All Items" },
    { key: "essential", label: "Essential" },
    { key: "boost", label: "Boosts" },
    { key: "protection", label: "Protection" },
    { key: "currency", label: "Currency" },
  ]

  const filteredItems = shopItems.filter((item) => {
    if (selectedCategory === "all") return true
    const config = shopItemConfig[item.type]
    return config.category.toLowerCase() === selectedCategory
  })

  const handlePurchase = (itemId: string) => {
    startTransition(async () => {
      try {
        if (itemId === "hearts_refill") {
          // Special handling for hearts refill
          await refillHeartsWithGemsAction()
          toast.success("Hearts refilled successfully!")
          onHeartsChange?.(maxHearts)
          onGemsChange?.(userGems - 5)
        } else {
          // Generic shop item purchase
          await purchaseShopItem(itemId)
          toast.success("Item purchased successfully!")

          // Update local state based on item type
          const item = shopItems.find((i) => i.id === itemId)
          if (item) {
            if (item.gemCost > 0) {
              onGemsChange?.(userGems - item.gemCost)
            }
            if (item.xpCost > 0) {
              onXPChange?.(userXP - item.xpCost)
            }
          }
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Purchase failed")
      }
    })
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-foreground flex items-center gap-2'>
            <ShoppingCart className='h-6 w-6' />
            Game Shop
          </h2>
          <p className='text-muted-foreground'>
            Spend your gems and XP on useful items and power-ups
          </p>
        </div>

        {/* Currency Display */}
        <div className='flex items-center gap-3'>
          <CurrencyDisplay type='gems' value={userGems} size='lg' showLabel />
          <CurrencyDisplay type='xp' value={userXP} size='lg' showLabel />
          <CurrencyDisplay
            type='hearts'
            value={userHearts}
            maxValue={maxHearts}
            size='lg'
            showLabel
            isPro={isPro}
          />
        </div>
      </div>

      {/* Pro Upgrade Banner */}
      {!isPro && (
        <Card className='bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center'>
                  <Crown className='h-5 w-5 text-white' />
                </div>
                <div>
                  <h3 className='font-bold text-foreground'>Upgrade to Pro</h3>
                  <p className='text-sm text-muted-foreground'>
                    Get unlimited hearts, daily gem bonuses, and exclusive items!
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2 text-purple-600 dark:text-purple-400'>
                <Infinity className='h-5 w-5' />
                <Gift className='h-5 w-5' />
                <Sparkles className='h-5 w-5' />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <div className='flex gap-1 p-1 bg-muted rounded-lg w-fit'>
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              selectedCategory === category.key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Shop Items Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {filteredItems.map((item) => (
          <ShopItemCard
            key={item.id}
            item={item}
            userGems={userGems}
            userXP={userXP}
            userHearts={userHearts}
            maxHearts={maxHearts}
            isPro={isPro}
            onPurchase={handlePurchase}
            isLoading={pending}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className='p-8 text-center'>
          <ShoppingCart className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
          <p className='text-muted-foreground'>No items available in this category.</p>
        </Card>
      )}
    </div>
  )
}
