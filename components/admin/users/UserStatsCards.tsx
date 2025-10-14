import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  UserPlus, 
  Activity, 
  Ban
} from 'lucide-react';
import type { UserStatsProps } from './types';

export const UserStatsCards: React.FC<UserStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: "Total Users",
      value: stats.total,
      icon: Users,
      color: "blue"
    },
    {
      title: "Active Users",
      value: stats.active,
      icon: Activity,
      color: "green"
    },
    {
      title: "Inactive Users",
      value: stats.inactive,
      icon: Ban,
      color: "red"
    },
    {
      title: "New This Month",
      value: stats.newThisMonth,
      icon: UserPlus,
      color: "purple"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">{stat.title}</div>
                  <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                </div>
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};