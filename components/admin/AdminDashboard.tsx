'use client';

import { useState, useEffect } from 'react';
import { 
  DashboardHeader,
  DashboardStats, 
  QuickActions, 
  RecentActivity, 
  PerformanceOverview 
} from '@/components/admin/dashboard';

export const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <DashboardHeader />

      {/* Stats Grid */}
      <DashboardStats loading={loading} />

      {/* Content Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Activity */}
        <RecentActivity loading={loading} />
      </div>

      {/* Performance Overview */}
      <PerformanceOverview 
        loading={loading}
        completionRate={87}
        monthlyRevenue={24800}
        challenges={156}
        lessons={78}
      />
    </div>
  );
};