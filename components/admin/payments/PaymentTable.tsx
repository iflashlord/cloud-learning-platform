/**
 * Payment Table Component
 * 
 * Displays payment data in a table format with actions
 */

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { StatusIndicator, LoadingState } from "@/components/ui/common";
import { CreditCard } from "lucide-react";

export interface Payment {
  id: string;
  userId: string;
  userName: string | null;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  subscriptionType: 'monthly' | 'yearly' | 'lifetime';
  paymentMethod: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PaymentTableProps {
  payments: Payment[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onRefund: (paymentId: string) => void;
}

export const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  loading,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onRefund,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = payments.slice(startIndex, startIndex + itemsPerPage);

  const getStatusVariant = (status: Payment['status']): "success" | "error" | "warning" | "info" | "pending" | "neutral" => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'pending';
      case 'failed':
        return 'error';
      case 'refunded':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Payments ({payments.length})</h3>
      
      <LoadingState loading={loading} size="lg">
        {payments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No payments found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {paginatedPayments.map((payment) => (
              <div 
                key={payment.id} 
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <StatusIndicator 
                    status={getStatusVariant(payment.status)}
                    label={payment.status}
                    size="sm"
                    variant="dot"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {payment.userName || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {payment.transactionId} • {payment.paymentMethod}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(payment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${payment.amount}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {payment.subscriptionType}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {payment.status}
                  </p>
                </div>
                
                {payment.status === 'completed' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onRefund(payment.id)}
                  >
                    Refund
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </LoadingState>

      {payments.length > 0 && (
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showTotal={true}
            totalItems={payments.length}
          />
        </div>
      )}
    </div>
  );
};