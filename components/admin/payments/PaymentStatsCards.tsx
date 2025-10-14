/**
 * Payment Stats Cards Component
 * 
 * Displays key payment metrics in a grid layout
 */

"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  XCircle 
} from "lucide-react";

export interface PaymentStats {
  totalRevenue: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  failedPayments: number;
  conversionRate: number;
  churnRate: number;
}

interface PaymentStatsCardsProps {
  stats: PaymentStats;
  loading?: boolean;
}

export const PaymentStatsCards: React.FC<PaymentStatsCardsProps> = ({
  stats,
  loading = false,
}) => {
  const statsConfig = [
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "Monthly Revenue", 
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      label: "Active Subs",
      value: stats.activeSubscriptions.toString(),
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "Failed Payments",
      value: stats.failedPayments.toString(),
      icon: XCircle,
      color: "text-red-600",
      valueColor: "text-red-600",
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Churn Rate",
      value: `${stats.churnRate}%`,
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statsConfig.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.valueColor || "text-gray-900"}`}>
                    {stat.value}
                  </p>
                </div>
                <IconComponent className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};