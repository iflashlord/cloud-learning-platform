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
} from "lucide-react";

interface Stats {
  courses: number;
  units: number;
  lessons: number;
  challenges: number;
  users: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
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
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // We'll implement these API endpoints
        const [coursesRes, unitsRes, lessonsRes, challengesRes] = await Promise.all([
          fetch('/api/courses').then(r => r.json()),
          fetch('/api/units').then(r => r.json()),
          fetch('/api/lessons').then(r => r.json()),
          fetch('/api/challenges').then(r => r.json()),
        ]);

        setStats({
          courses: coursesRes.length || 0,
          units: unitsRes.length || 0,
          lessons: lessonsRes.length || 0,
          challenges: challengesRes.length || 0,
          users: 0, // We can implement user counting later
          activeSubscriptions: 0, // We'll implement subscription counting later
          monthlyRevenue: 0, // We'll implement revenue tracking later
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
      bg: "bg-blue-100",
    },
    {
      label: "Units",
      value: stats.units,
      icon: BookOpen,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Lessons",
      value: stats.lessons,
      icon: ListChecks,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Questions",
      value: stats.challenges,
      icon: FileQuestion,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      label: "Active Users",
      value: stats.users,
      icon: Users,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
    {
      label: "Subscriptions",
      value: stats.activeSubscriptions,
      icon: CreditCard,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      label: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to AWS Cloud Academy Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${action.color} text-white`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.label}</h3>
                    <p className="text-sm text-gray-600">
                      Create new {action.label.toLowerCase()}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <Card className="p-6">
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Activity tracking will be implemented soon</p>
          </div>
        </Card>
      </div>
    </div>
  );
};