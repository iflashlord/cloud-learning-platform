"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmModal } from "@/components/ui/common";
import {
  PaymentHeader,
  PaymentStatsCards,
  PaymentTabs,
  PaymentFilters,
  PaymentTable,
  SubscriptionTable,
  AnalyticsPlaceholder,
  type PaymentStats,
  type Payment,
  type Subscription,
} from "@/components/admin/payments";

export default function PaymentManagementPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    activeSubscriptions: 0,
    failedPayments: 0,
    conversionRate: 0,
    churnRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"payments" | "subscriptions" | "analytics">("payments");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("");
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string>("");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const [paymentsRes, subscriptionsRes, statsRes] = await Promise.all([
        fetch("/api/admin/payments"),
        fetch("/api/admin/subscriptions"),
        fetch("/api/admin/payment-stats"),
      ]);

      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        setPayments(paymentsData);
      }

      if (subscriptionsRes.ok) {
        const subscriptionsData = await subscriptionsRes.json();
        setSubscriptions(subscriptionsData);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
    setRefundModalOpen(true);
  };

  const confirmRefund = async () => {
    try {
      const response = await fetch(`/api/admin/payments/${selectedPaymentId}/refund`, {
        method: "POST",
      });
      
      if (response.ok) {
        fetchPaymentData();
        setRefundModalOpen(false);
      } else {
        alert("Failed to process refund");
      }
    } catch (error) {
      console.error("Error processing refund:", error);
      alert("Error processing refund");
    }
  };

  const handleSubscriptionCancel = (subscriptionId: string) => {
    setSelectedSubscriptionId(subscriptionId);
    setCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    try {
      const response = await fetch(`/api/admin/subscriptions/${selectedSubscriptionId}/cancel`, {
        method: "POST",
      });
      
      if (response.ok) {
        fetchPaymentData();
        setCancelModalOpen(false);
      } else {
        alert("Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      alert("Error canceling subscription");
    }
  };

  const exportData = async (type: 'payments' | 'subscriptions') => {
    try {
      const response = await fetch(`/api/admin/export-${type}?format=csv`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`Error exporting ${type}:`, error);
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.userId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(
    (activeTab === 'payments' ? filteredPayments.length : filteredSubscriptions.length) / itemsPerPage
  );

  // Reset to first page when filters or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, activeTab]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <PaymentHeader
        activeTab={activeTab}
        onRefresh={fetchPaymentData}
        onExportData={exportData}
      />

      {/* Stats Cards */}
      <PaymentStatsCards stats={stats} loading={loading} />

      {/* Main Content */}
      <Card>
        <CardContent className="p-6">
          {/* Tabs */}
          <PaymentTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          {/* Filters */}
          {activeTab !== "analytics" && (
            <PaymentFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              activeTab={activeTab}
            />
          )}

          {/* Content */}
          {activeTab === "payments" && (
            <PaymentTable
              payments={filteredPayments}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onRefund={handleRefund}
            />
          )}

          {activeTab === "subscriptions" && (
            <SubscriptionTable
              subscriptions={filteredSubscriptions}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onCancel={handleSubscriptionCancel}
            />
          )}

          {activeTab === "analytics" && <AnalyticsPlaceholder />}
        </CardContent>
      </Card>

      {/* Confirmation Modals */}
      <ConfirmModal
        open={refundModalOpen}
        onOpenChange={setRefundModalOpen}
        title="Confirm Refund"
        description="Are you sure you want to process this refund? This action cannot be undone."
        confirmLabel="Process Refund"
        confirmVariant="error"
        onConfirm={confirmRefund}
      />

      <ConfirmModal
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        title="Cancel Subscription"
        description="Are you sure you want to cancel this subscription? The user will lose access at the end of their billing period."
        confirmLabel="Cancel Subscription"
        confirmVariant="error"
        onConfirm={confirmCancel}
      />
    </div>
  );
}