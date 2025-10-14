'use client';

import { Calendar, Clock } from 'lucide-react';

export interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  showDateTime?: boolean;
}

export const DashboardHeader = ({ 
  title = "Learning Platform",
  subtitle,
  showDateTime = true
}: DashboardHeaderProps) => {
  const defaultSubtitle = `Admin Dashboard - ${new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`;

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-blue-100 text-lg">
            {subtitle || defaultSubtitle}
          </p>
        </div>
        {showDateTime && (
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-1" />
              <div className="text-sm">Today</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-1" />
              <div className="text-sm">
                {new Date().toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};