"use client";

import { AdminDashboard as ModularAdminDashboard } from '@/components/admin/AdminDashboard';

/**
 * Legacy Admin Dashboard Component
 * 
 * This component has been refactored and modularized.
 * It now uses the new modular AdminDashboard component from /components/admin/AdminDashboard.tsx
 * 
 * The original 480-line file has been broken down into:
 * - DashboardHeader: Enhanced gradient header with date/time
 * - DashboardStats: Statistics cards grid with loading states
 * - QuickActions: Action buttons for admin tasks
 * - RecentActivity: Activity feed with type-specific icons
 * - PerformanceOverview: Performance metrics cards
 * 
 * All components are available in /components/admin/dashboard/
 */
export const AdminDashboard = () => {
  return <ModularAdminDashboard />;
};