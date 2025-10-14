/**
 * Dashboard Stats Component
 * 
 * Statistics cards grid for admin dashboard
 */

"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/common";
import {
  GraduationCap,
  BookOpen,
  ListChecks,
  FileQuestion,
  CheckCircle2,
  Users,
  TrendingUp,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminStats {
  courses: number;
  units: number;
  lessons: number;
  challenges: number;
  users: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  challengeOptions: number;
  completionRate: number;
}

interface DashboardStatsProps {
  stats?: AdminStats;
  loading?: boolean;
}

// Default mock stats
const defaultStats: AdminStats = {
  courses: 12,
  units: 45,
  lessons: 78,
  challenges: 156,
  users: 2847,
  activeSubscriptions: 342,
  monthlyRevenue: 24800,
  challengeOptions: 624,
  completionRate: 87
};

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  stats = defaultStats,
  loading = false,
}) => {
  const statCards = [
    {
      label: "Courses",
      value: stats.courses,
      icon: GraduationCap,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      trend: "+12%",
      trendPositive: true,
    },
    {
      label: "Units",
      value: stats.units,
      icon: BookOpen,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      trend: "+8%",
      trendPositive: true,
    },
    {
      label: "Lessons",
      value: stats.lessons,
      icon: ListChecks,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      trend: "+24%",
      trendPositive: true,
    },
    {
      label: "Questions",
      value: stats.challenges,
      icon: FileQuestion,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      trend: "+16%",
      trendPositive: true,
    },
    {
      label: "Answer Options",
      value: stats.challengeOptions,
      icon: CheckCircle2,
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-200",
      trend: "+18%",
      trendPositive: true,
    },
    {
      label: "Registered Users",
      value: stats.users.toLocaleString(),
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      trend: "Real-time data",
      trendPositive: true,
    },
    {
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      trend: "Challenge success",
      trendPositive: true,
    },
    {
      label: "Active Subscriptions",
      value: stats.activeSubscriptions.toLocaleString(),
      icon: CreditCard,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
      trend: "Current active",
      trendPositive: true,
    },
    {
      label: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      trend: "From subscriptions",
      trendPositive: true,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i} className="border-2">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <Card
            key={index}
            className={cn(
              "border-2 hover:shadow-lg transition-all duration-200 hover:-translate-y-1",
              stat.border
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl", stat.bg)}>
                  <IconComponent className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className={cn(
                  "text-sm flex items-center gap-1",
                  stat.trendPositive ? "text-green-600" : "text-red-600"
                )}>
                  <span>{stat.trend}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};