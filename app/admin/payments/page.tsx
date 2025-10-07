"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";

interface PaymentStats {
  totalRevenue: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  failedPayments: number;
  conversionRate: number;
  churnRate: number;
}

interface Payment {
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

interface Subscription {
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

  const handleRefund = async (paymentId: string) => {
    if (!confirm("Are you sure you want to process this refund?")) return;
    
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/refund`, {
        method: "POST",
      });
      
      if (response.ok) {
        fetchPaymentData(); // Refresh data
      } else {
        alert("Failed to process refund");
      }
    } catch (error) {
      console.error("Error processing refund:", error);
      alert("Error processing refund");
    }
  };

  const handleSubscriptionCancel = async (subscriptionId: string) => {
    if (!confirm("Are you sure you want to cancel this subscription?")) return;
    
    try {
      const response = await fetch(`/api/admin/subscriptions/${subscriptionId}/cancel`, {
        method: "POST",
      });
      
      if (response.ok) {
        fetchPaymentData(); // Refresh data
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

  // Pagination logic for payments and subscriptions
  const currentData = activeTab === 'payments' ? filteredPayments : filteredSubscriptions;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex);
  const paginatedSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);

  // Reset to first page when filters or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, activeTab]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Monitor payments, subscriptions, and revenue</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => exportData(activeTab === "subscriptions" ? "subscriptions" : "payments")}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={fetchPaymentData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Payments</p>
                <p className="text-2xl font-bold text-red-600">{stats.failedPayments}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.churnRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-2 mb-4">
            <Button
              variant={activeTab === "payments" ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveTab("payments")}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Payments
            </Button>
            <Button
              variant={activeTab === "subscriptions" ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveTab("subscriptions")}
            >
              <Users className="w-4 h-4 mr-2" />
              Subscriptions
            </Button>
            <Button
              variant={activeTab === "analytics" ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveTab("analytics")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {activeTab === "payments" ? (
                  <>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </>
                ) : (
                  <>
                    <option value="active">Active</option>
                    <option value="canceled">Canceled</option>
                    <option value="expired">Expired</option>
                    <option value="trial">Trial</option>
                  </>
                )}
              </select>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Content */}
          {activeTab === "payments" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Payments ({filteredPayments.length})</h3>
              {loading ? (
                <div className="text-center py-8">Loading payments...</div>
              ) : filteredPayments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No payments found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          payment.status === 'completed' ? 'bg-green-500' :
                          payment.status === 'pending' ? 'bg-yellow-500' :
                          payment.status === 'failed' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`} />
                        <div>
                          <p className="font-semibold">{payment.userName || "Anonymous"}</p>
                          <p className="text-sm text-gray-600">
                            {payment.transactionId} • {payment.paymentMethod}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(payment.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${payment.amount}</p>
                        <p className="text-sm text-gray-600 capitalize">{payment.subscriptionType}</p>
                        <p className="text-sm text-gray-500 capitalize">{payment.status}</p>
                      </div>
                      {payment.status === 'completed' && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRefund(payment.id)}
                        >
                          Refund
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {filteredPayments.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredPayments.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                    showTotal={true}
                    totalItems={filteredPayments.length}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "subscriptions" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Active Subscriptions ({filteredSubscriptions.length})</h3>
              {loading ? (
                <div className="text-center py-8">Loading subscriptions...</div>
              ) : filteredSubscriptions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No subscriptions found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedSubscriptions.map((subscription) => (
                    <div key={subscription.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          subscription.status === 'active' ? 'bg-green-500' :
                          subscription.status === 'trial' ? 'bg-blue-500' :
                          subscription.status === 'expired' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`} />
                        <div>
                          <p className="font-semibold">{subscription.userName || "Anonymous"}</p>
                          <p className="text-sm text-gray-600 capitalize">
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
                        <p className="font-semibold">${subscription.amount}</p>
                        <p className="text-sm text-gray-600 capitalize">{subscription.status}</p>
                      </div>
                      {subscription.status === 'active' && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleSubscriptionCancel(subscription.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {filteredSubscriptions.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredSubscriptions.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                    showTotal={true}
                    totalItems={filteredSubscriptions.length}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Payment Analytics</h3>
              <div className="text-center py-12 text-gray-500">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Analytics Dashboard Coming Soon</p>
                <p>Revenue charts, conversion funnels, and detailed metrics will be available here.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}