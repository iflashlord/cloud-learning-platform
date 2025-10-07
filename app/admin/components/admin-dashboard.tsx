"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  ListChecks,
  FileQuestion,
  CheckCircle2,
  Plus,
  BarChart3,
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  Settings,
  ArrowUpRight,
  Activity,
  Calendar,
  Clock,
} from "lucide-react";

interface Stats {
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

interface RecentActivity {
  id: string;
  type: 'course' | 'lesson' | 'challenge' | 'user';
  action: 'created' | 'updated' | 'completed';
  title: string;
  timestamp: Date;
  user?: string;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    courses: 0,
    units: 0,
    lessons: 0,
    challenges: 0,
    users: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    challengeOptions: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch data from existing API endpoints
        const [coursesRes, unitsRes, lessonsRes, challengesRes, challengeOptionsRes] = await Promise.all([
          fetch('/api/courses').then(r => r.json()),
          fetch('/api/units').then(r => r.json()),
          fetch('/api/lessons').then(r => r.json()),
          fetch('/api/challenges').then(r => r.json()),
          fetch('/api/challengeOptions').then(r => r.json()),
        ]);

        // Calculate completion rate (mock for now - could be based on user progress)
        const totalContent = (unitsRes.length || 0) + (lessonsRes.length || 0) + (challengesRes.length || 0);
        const completionRate = totalContent > 0 ? Math.floor(Math.random() * 40 + 60) : 0; // Mock 60-100%

        setStats({
          courses: coursesRes.length || 0,
          units: unitsRes.length || 0,
          lessons: lessonsRes.length || 0,
          challenges: challengesRes.length || 0,
          challengeOptions: challengeOptionsRes.length || 0,
          completionRate,
          users: Math.floor(Math.random() * 500 + 100), // Mock data for now
          activeSubscriptions: Math.floor(Math.random() * 50 + 25), // Mock data
          monthlyRevenue: Math.floor(Math.random() * 5000 + 2500), // Mock data
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      label: "Add Certification",
      href: "/admin/courses/new",
      icon: GraduationCap,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      label: "Create Unit",
      href: "/admin/units/new",
      icon: BookOpen,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      label: "Add Lesson",
      href: "/admin/lessons/new",
      icon: ListChecks,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "Create Question",
      href: "/admin/challenges/new",
      icon: FileQuestion,
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      label: "Manage Users",
      href: "/admin/users",
      icon: Users,
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      label: "View Payments",
      href: "/admin/payments",
      icon: CreditCard,
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
  ];

  const statCards = [
    {
      label: "AWS Certifications",
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
      label: "Active Users",
      value: stats.users.toLocaleString(),
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      trend: "+28%",
      trendPositive: true,
    },
    {
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      trend: "+5%",
      trendPositive: true,
    },
    {
      label: "Subscriptions",
      value: stats.activeSubscriptions,
      icon: CreditCard,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
      trend: "+32%",
      trendPositive: true,
    },
    {
      label: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      trend: "+15%",
      trendPositive: true,
    },
  ];

  // Mock recent activity data
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'course',
      action: 'created',
      title: 'AWS Solutions Architect Professional',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      user: 'Admin User'
    },
    {
      id: '2',
      type: 'lesson',
      action: 'updated',
      title: 'EC2 Instance Types Deep Dive',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      user: 'Content Team'
    },
    {
      id: '3',
      type: 'challenge',
      action: 'created',
      title: 'VPC Configuration Challenge',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      user: 'Admin User'
    },
    {
      id: '4',
      type: 'user',
      action: 'completed',
      title: 'Lambda Functions Masterclass',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      user: 'john.doe@example.com'
    },
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'course': return GraduationCap;
      case 'lesson': return BookOpen;
      case 'challenge': return FileQuestion;
      case 'user': return Users;
      default: return Activity;
    }
  };

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'course': return 'text-blue-600 bg-blue-50';
      case 'lesson': return 'text-emerald-600 bg-emerald-50';
      case 'challenge': return 'text-orange-600 bg-orange-50';
      case 'user': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">AWS Cloud Academy</h1>
            <p className="text-blue-100 text-lg">
              Admin Dashboard - {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-1" />
              <p className="text-sm">Today</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-1" />
              <p className="text-sm">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className={`p-6 hover:shadow-lg transition-all duration-300 border-2 ${stat.border} ${stat.bg} group cursor-pointer`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
                  ) : (
                    stat.value
                  )}
                </p>
                <div className="flex items-center space-x-1">
                  <ArrowUpRight className={`w-4 h-4 ${stat.trendPositive ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-medium ${stat.trendPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                  </span>
                  <span className="text-gray-500 text-sm">vs last month</span>
                </div>
              </div>
              <div className={`p-4 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            <Plus className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="flex items-center space-x-4 p-4 rounded-lg border hover:border-gray-300 hover:shadow-md transition-all duration-200 group">
                  <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-gray-700">{action.label}</h3>
                    <div className="text-sm text-gray-500">
                      {action.label.includes('Add') || action.label.includes('Create') ? 'Create new content' : 'Manage existing content'}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              const colorClasses = getActivityColor(activity.type);
              
              return (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className={`p-2 rounded-lg ${colorClasses}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500 capitalize">
                        {activity.action} by {activity.user}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="pt-4 border-t">
              <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all activity →
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {loading ? '...' : `${Math.floor(stats.completionRate)}%`}
            </div>
            <p className="text-sm text-blue-700 font-medium">Average Completion Rate</p>
            <p className="text-xs text-blue-600 mt-1">↗️ +5% from last week</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {loading ? '...' : `${Math.floor(stats.users / 7)}`}
            </div>
            <p className="text-sm text-emerald-700 font-medium">Daily Active Users</p>
            <p className="text-xs text-emerald-600 mt-1">↗️ +12% from yesterday</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {loading ? '...' : `${Math.floor(stats.challenges / stats.lessons * 100)}%`}
            </div>
            <p className="text-sm text-purple-700 font-medium">Challenge Coverage</p>
            <p className="text-xs text-purple-600 mt-1">↗️ Questions per lesson ratio</p>
          </div>
        </div>
      </Card>
    </div>
  );
};