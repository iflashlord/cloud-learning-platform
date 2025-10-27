"use client"

import { BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"

export interface PerformanceMetric {
  label: string
  value: string | number
  description: string
  color: string
  bgGradient: string
}

export interface PerformanceOverviewProps {
  completionRate?: number
  monthlyRevenue?: number
  challenges?: number
  lessons?: number
  loading?: boolean
  customMetrics?: PerformanceMetric[]
}

export const PerformanceOverview = ({
  completionRate = 87,
  monthlyRevenue = 24800,
  challenges = 156,
  lessons = 78,
  loading = false,
  customMetrics,
}: PerformanceOverviewProps) => {
  // Calculate average questions per lesson
  const avgQuestionsPerLesson =
    challenges > 0 && lessons > 0 ? Math.round((challenges / lessons) * 100) / 100 : 0

  const defaultMetrics: PerformanceMetric[] = [
    {
      label: "Challenge Completion Rate",
      value: `${completionRate}%`,
      description: "Real-time completion tracking",
      color: "text-blue-600",
      bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      label: "Monthly Revenue",
      value: `$${monthlyRevenue.toLocaleString()}`,
      description: "From active subscriptions",
      color: "text-emerald-600",
      bgGradient: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    },
    {
      label: "Avg Questions per Lesson",
      value: avgQuestionsPerLesson,
      description: "Content density ratio",
      color: "text-purple-600",
      bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
  ]

  const metrics = customMetrics || defaultMetrics

  if (loading) {
    return (
      <Card className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-400'>
            Performance Overview
          </h2>
          <BarChart3 className='w-5 h-5 text-gray-400' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='text-center p-6 bg-gray-50 rounded-xl'>
              <div className='animate-pulse bg-gray-200 h-8 w-16 mx-auto mb-2 rounded'></div>
              <div className='animate-pulse bg-gray-200 h-4 w-24 mx-auto mb-1 rounded'></div>
              <div className='animate-pulse bg-gray-200 h-3 w-20 mx-auto rounded'></div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-400'>
          Performance Overview
        </h2>
        <BarChart3 className='w-5 h-5 text-gray-400' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {metrics.map((metric, index) => (
          <div key={index} className={`text-center p-6 ${metric.bgGradient} rounded-xl`}>
            <div className={`text-3xl font-bold ${metric.color} mb-2`}>
              {loading ? "..." : metric.value}
            </div>
            <div
              className={`text-sm ${metric.color
                .replace("text-", "text-")
                .replace("-600", "-700")} font-medium`}
            >
              {metric.label}
            </div>
            <div className={`text-xs ${metric.color} mt-1`}>{metric.description}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
