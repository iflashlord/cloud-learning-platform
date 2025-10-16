import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const leaderboardHeaderVariants = cva("text-center mb-8", {
  variants: {
    variant: {
      default: "",
      featured: "relative",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface LeaderboardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof leaderboardHeaderVariants> {
  title: string
  description?: string
  icon?: React.ReactNode
  stats?: Array<{
    label: string
    color: "green" | "blue" | "purple" | "orange"
    animated?: boolean
  }>
  isPro?: boolean
  userPoints?: number
}

const LeaderboardHeader = React.forwardRef<
  HTMLDivElement,
  LeaderboardHeaderProps
>(
  (
    {
      className,
      variant,
      title,
      description,
      icon,
      stats,
      isPro,
      userPoints,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          leaderboardHeaderVariants({ variant }),
          "pt-8",
          className
        )}
        {...props}
      >
        {/* Pro/Free Status Badge */}
        <div className='flex justify-center mb-4'>
          <div
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
              isPro
                ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                : "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
            )}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                isPro ? "bg-purple-500 animate-pulse" : "bg-blue-500"
              )}
            />
            {isPro ? "PRO Member" : "Free Account"}
            {!isPro && (
              <span className='text-xs opacity-75'>
                • Upgrade for unlimited features
              </span>
            )}
          </div>
        </div>

        {/* Icon Section */}
        {icon && (
          <div className='relative inline-block mb-6'>
            <div className='w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 dark:from-yellow-500 dark:via-orange-600 dark:to-red-600 rounded-full flex items-center justify-center shadow-xl'>
              {icon}
            </div>
            {/* User Points Badge */}
            {userPoints !== undefined && (
              <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg'>
                {userPoints} XP
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <h1 className='text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-4'>
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className='text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed'>
            {description}
          </p>
        )}

        {/* Stats */}
        {stats && (
          <div className='flex items-center justify-center gap-6 mt-6 text-sm text-gray-600 dark:text-gray-400'>
            {stats.map((stat, index) => (
              <div key={index} className='flex items-center gap-2'>
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    {
                      "bg-green-500 dark:bg-green-400": stat.color === "green",
                      "bg-blue-500 dark:bg-blue-400": stat.color === "blue",
                      "bg-purple-500 dark:bg-purple-400":
                        stat.color === "purple",
                      "bg-orange-500 dark:bg-orange-400":
                        stat.color === "orange",
                    },
                    stat.animated && "animate-pulse"
                  )}
                />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
LeaderboardHeader.displayName = "LeaderboardHeader"

export { LeaderboardHeader, leaderboardHeaderVariants }
