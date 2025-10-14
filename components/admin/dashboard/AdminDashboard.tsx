"use client";

import { useAdminStats } from "@/components/admin/dashboard/useAdminStats";
import {
  DashboardHeader,
  DashboardStats,
  QuickActions,
  RecentActivity,
  PerformanceOverview
} from "@/components/admin/dashboard";

export const AdminDashboard = () => {
  const { stats, loading } = useAdminStats();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <DashboardHeader />
      
      <DashboardStats stats={stats} loading={loading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QuickActions />
        <RecentActivity />
      </div>
      
      <PerformanceOverview 
        completionRate={stats.completionRate}
        monthlyRevenue={stats.monthlyRevenue}
        challenges={stats.challenges}
        lessons={stats.lessons}
        loading={loading}
      />
    </div>
  );
};