// Admin Dashboard Types
export interface Stats {
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

export interface RecentActivity {
  id: string;
  type: 'course' | 'lesson' | 'challenge' | 'user';
  action: 'created' | 'updated' | 'completed';
  title: string;
  timestamp: Date;
  user?: string;
}

export interface QuickAction {
  label: string;
  href: string;
  icon: any;
  color: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  bg: string;
  border: string;
  trend: string;
  trendPositive: boolean;
}