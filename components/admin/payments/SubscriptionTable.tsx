/**
 * Subscription Table Component
 * 
 * Displays subscription data in a table format with actions
 */

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { StatusIndicator, LoadingState } from "@/components/ui/common";
import { Users } from "lucide-react";

export interface Subscription {
  id: string;
  userId: string;
  userName: string | null;
  type: 'monthly' | 'yearly' | 'lifetime';
  status: 'active' | 'canceled' | 'expired' | 'trial';
  startDate: Date;
  endDate: Date | null;
  amount: number;
  currency: string;
  nextBillingDate: Date | null;
}

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onCancel: (subscriptionId: string) => void;
}

export const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  subscriptions,
  loading,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onCancel,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubscriptions = subscriptions.slice(startIndex, startIndex + itemsPerPage);

  const getStatusVariant = (status: Subscription['status']): "success" | "error" | "warning" | "info" | "pending" | "neutral" => {
    switch (status) {
      case 'active':
        return 'success';
      case 'trial':
        return 'info';
      case 'expired':
        return 'error';
      case 'canceled':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Active Subscriptions ({subscriptions.length})</h3>
      
      <LoadingState loading={loading} size="lg">
        {subscriptions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No subscriptions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {paginatedSubscriptions.map((subscription) => (
              <div 
                key={subscription.id} 
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <StatusIndicator 
                    status={getStatusVariant(subscription.status)}
                    label={subscription.status}
                    size="sm"
                    variant="dot"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {subscription.userName || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {subscription.type} Subscription
                    </p>
                    <p className="text-xs text-gray-500">
                      Started: {new Date(subscription.startDate).toLocaleDateString()}
                    </p>
                    {subscription.nextBillingDate && (
                      <p className="text-xs text-gray-500">
                        Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${subscription.amount}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {subscription.status}
                  </p>
                </div>
                
                {subscription.status === 'active' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onCancel(subscription.id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </LoadingState>

      {subscriptions.length > 0 && (
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showTotal={true}
            totalItems={subscriptions.length}
          />
        </div>
      )}
    </div>
  );
};