import { Heart, Zap, Gem, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

type CurrencyType = "hearts" | "xp" | "gems" | "streak"

interface CurrencyDisplayProps {
  type: CurrencyType
  value: number
  maxValue?: number
  className?: string
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  animated?: boolean
  isPro?: boolean
}

const currencyConfig = {
  hearts: {
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    label: "Hearts",
    fillIcon: true,
  },
  xp: {
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    label: "XP",
    fillIcon: false,
  },
  gems: {
    icon: Gem,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    label: "Gems",
    fillIcon: false,
  },
  streak: {
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    label: "Streak",
    fillIcon: true,
  },
}

const sizeConfig = {
  sm: {
    container: "px-2 py-1",
    icon: "h-3 w-3",
    text: "text-xs",
    gap: "gap-1",
  },
  md: {
    container: "px-3 py-2",
    icon: "h-4 w-4",
    text: "text-sm",
    gap: "gap-2",
  },
  lg: {
    container: "px-4 py-3",
    icon: "h-5 w-5",
    text: "text-base",
    gap: "gap-2",
  },
}

export const CurrencyDisplay = ({
  type,
  value,
  maxValue,
  className,
  size = "md",
  showLabel = false,
  animated = false,
  isPro = false,
}: CurrencyDisplayProps) => {
  const config = currencyConfig[type]
  const sizeStyles = sizeConfig[size]
  const Icon = config.icon

  // Special handling for hearts when user is Pro
  const displayValue = type === "hearts" && isPro ? "∞" : value.toLocaleString()
  const isLow = type === "hearts" && !isPro && value <= 1
  const isFull = type === "hearts" && !isPro && maxValue && value === maxValue

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-medium transition-all duration-200",
        config.bgColor,
        config.borderColor,
        sizeStyles.container,
        sizeStyles.gap,
        sizeStyles.text,
        animated && "hover:scale-105",
        isLow && "animate-pulse",
        className,
      )}
    >
      <Icon
        className={cn(
          sizeStyles.icon,
          config.color,
          config.fillIcon && "fill-current",
          isLow && "animate-bounce",
          isFull && "animate-pulse",
        )}
      />
      <span className={cn("font-bold", config.color)}>
        {displayValue}
        {maxValue && type === "hearts" && !isPro && (
          <span className='text-muted-foreground'>/{maxValue}</span>
        )}
      </span>
      {showLabel && (
        <span className={cn("ml-1 text-muted-foreground", sizeStyles.text)}>{config.label}</span>
      )}
    </div>
  )
}

// Specialized components for common use cases
export const HeartsDisplay = (props: Omit<CurrencyDisplayProps, "type">) => (
  <CurrencyDisplay type='hearts' {...props} />
)

export const XPDisplay = (props: Omit<CurrencyDisplayProps, "type">) => (
  <CurrencyDisplay type='xp' {...props} />
)

export const GemsDisplay = (props: Omit<CurrencyDisplayProps, "type">) => (
  <CurrencyDisplay type='gems' {...props} />
)

export const StreakDisplay = (props: Omit<CurrencyDisplayProps, "type">) => (
  <CurrencyDisplay type='streak' {...props} />
)

// Combined header display for multiple currencies
interface CurrencyHeaderProps {
  hearts: number
  maxHearts: number
  xp: number
  gems: number
  streak: number
  isPro?: boolean
  className?: string
}

export const CurrencyHeader = ({
  hearts,
  maxHearts,
  xp,
  gems,
  streak,
  isPro = false,
  className,
}: CurrencyHeaderProps) => {
  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <HeartsDisplay value={hearts} maxValue={maxHearts} isPro={isPro} animated />
      <XPDisplay value={xp} animated />
      <GemsDisplay value={gems} animated />
      {streak > 0 && <StreakDisplay value={streak} animated />}
    </div>
  )
}
