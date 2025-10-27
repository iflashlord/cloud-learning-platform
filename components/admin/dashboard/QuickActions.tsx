"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"
import { adminFakeCompleteMonthlyQuest } from "@/actions/gamification"
import {
  GraduationCap,
  BookOpen,
  ListChecks,
  FileQuestion,
  Users,
  CreditCard,
  Plus,
  Target,
} from "lucide-react"

interface QuickAction {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  description?: string
  isAction?: boolean
}

interface QuickActionsProps {
  className?: string
}

export const QuickActions: React.FC<QuickActionsProps> = ({ className }) => {
  const [loading, setLoading] = React.useState(false)

  const handleMonthlyQuestTest = async () => {
    setLoading(true)
    try {
      const result = await adminFakeCompleteMonthlyQuest()
      if (result.success) {
        toast.success(result.message)
      }
    } catch (error) {
      console.error("Error testing monthly quest:", error)
      toast.error("Failed to complete monthly quest test")
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (action: QuickAction) => {
    if (action.label === "Test Monthly Quest") {
      await handleMonthlyQuestTest()
    }
  }
  const quickActions: QuickAction[] = [
    {
      label: "Add Course",
      href: "/admin/courses/new",
      icon: GraduationCap,
      color: "bg-blue-500 hover:bg-blue-600 dark:text-white dark:hover:bg-blue-500",
      description: "Create a new learning course",
    },
    {
      label: "Create Unit",
      href: "/admin/units/new",
      icon: BookOpen,
      color: "bg-green-500 hover:bg-green-600 dark:text-white dark:hover:bg-green-500",
      description: "Add a course unit",
    },
    {
      label: "Add Lesson",
      href: "/admin/lessons/new",
      icon: ListChecks,
      color: "bg-purple-500 hover:bg-purple-600 dark:text-white dark:hover:bg-purple-500",
      description: "Create a new lesson",
    },
    {
      label: "Create Question",
      href: "/admin/challenges/new",
      icon: FileQuestion,
      color: "bg-purple-500 hover:bg-purple-600 dark:text-white dark:hover:bg-purple-500",
      description: "Add a challenge question",
    },
    {
      label: "Manage Users",
      href: "/admin/users",
      icon: Users,
      color: "bg-indigo-500 hover:bg-indigo-600 dark:text-white dark:hover:bg-indigo-500",
      description: "User management panel",
    },
    {
      label: "View Payments",
      href: "/admin/payments",
      icon: CreditCard,
      color: "bg-emerald-500 hover:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500",
      description: "Payment and subscription tracking",
    },
    {
      label: "Test Monthly Quest",
      href: "#",
      icon: Target,
      color: "bg-yellow-500 hover:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500",
      description: "Simulate monthly quest completion for testing",
      isAction: true,
    },
  ]

  return (
    <div className={className}>
      <h2 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>Quick Actions</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {quickActions.map((action, index) => {
          const IconComponent = action.icon

          if (action.isAction) {
            return (
              <Button
                key={index}
                onClick={() => handleAction(action)}
                disabled={loading}
                className={`w-full h-auto p-6 flex flex-col items-center gap-3 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${action.color}`}
              >
                <div className='p-3 bg-white/20 rounded-xl'>
                  <IconComponent className='w-6 h-6' />
                </div>
                <div className='text-center'>
                  <div className='font-semibold'>{action.label}</div>
                  {action.description && (
                    <div className='text-sm opacity-90 mt-1'>{action.description}</div>
                  )}
                </div>
              </Button>
            )
          }

          return (
            <Link key={index} href={action.href}>
              <Button
                className={`w-full h-auto p-6 flex flex-col items-center gap-3 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${action.color}`}
              >
                <div className='p-3 bg-white/20 rounded-xl'>
                  <IconComponent className='w-6 h-6' />
                </div>
                <div className='text-center'>
                  <div className='font-semibold'>{action.label}</div>
                  {action.description && (
                    <div className='text-sm opacity-90 mt-1'>{action.description}</div>
                  )}
                </div>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
