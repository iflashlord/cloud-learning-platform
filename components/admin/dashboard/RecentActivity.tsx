'use client';

import { Activity, GraduationCap, BookOpen, FileQuestion, Users } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export interface RecentActivity {
  id: string;
  type: 'course' | 'lesson' | 'challenge' | 'user';
  action: 'created' | 'updated' | 'completed' | 'deleted';
  title: string;
  timestamp: Date;
  user: string;
}

export interface RecentActivityProps {
  activities?: RecentActivity[];
  loading?: boolean;
  viewAllLink?: string;
}

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

// Default mock data
const defaultActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'course',
    action: 'created',
    title: 'Cloud Solutions Architecture',
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

export const RecentActivity = ({ 
  activities = defaultActivities, 
  loading = false,
  viewAllLink = "/admin/users"
}: RecentActivityProps) => {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-start space-x-4 p-3">
              <div className="animate-pulse bg-gray-200 w-8 h-8 rounded-lg"></div>
              <div className="flex-1">
                <div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                <div className="animate-pulse bg-gray-200 h-3 w-1/2 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
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
          <Link href={viewAllLink} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all activity →
          </Link>
        </div>
      </div>
    </Card>
  );
};