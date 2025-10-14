/**
 * Analytics Placeholder Component
 * 
 * Placeholder component for future analytics dashboard
 */

"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";

export const AnalyticsPlaceholder: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment Analytics</h3>
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium mb-2">Analytics Dashboard Coming Soon</p>
        <p>Revenue charts, conversion funnels, and detailed metrics will be available here.</p>
      </div>
    </div>
  );
};