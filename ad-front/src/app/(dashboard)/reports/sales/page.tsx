"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { useCurrency } from "@/contexts/CurrencyContext";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// Icons
const Icons = {
  DollarSign: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  ),
  ShoppingCart: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Users: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  TrendingUp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Calendar: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Download: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

interface SalesReports {
  summary: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    minOrderValue: number;
    maxOrderValue: number;
  };
  salesByStatus: Array<{
    _id: string;
    count: number;
    totalAmount: number;
  }>;
  salesByPayment: Array<{
    _id: string;
    count: number;
    totalAmount: number;
  }>;
  dailyTrend: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  topCustomers: Array<{
    userId: string;
    name: string;
    email: string;
    totalSpent: number;
    orderCount: number;
  }>;
}

export default function SalesReportsPage() {
  const { formatPrice } = useCurrency();
  const [reports, setReports] = useState<SalesReports | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeRange, setTimeRange] = useState<'daily' | 'monthly'>('daily');

  useEffect(() => {
    fetchReports();
  }, [period, startDate, endDate]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params: any = { period };
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      
      const response = await api.get('/admin/reports/sales', { params });
      const data = response.data;
      
      if (data.meta?.code === 200 || data.success) {
        setReports(data.data || data);
      } else {
        toast.error(data.meta?.message || 'Failed to fetch sales reports');
      }
    } catch (error: any) {
      console.error('Error fetching sales reports:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch sales reports');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    toast.info('Export functionality coming soon');
  };

  if (loading && !reports) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning>
      <Breadcrumb pageName="Sales Reports" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Reports</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive sales analytics and insights</p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            <Icons.Download className="w-5 h-5" />
            Export
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Period (Days)
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={!!(startDate && endDate)}
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (e.target.value) setPeriod('');
              }}
              className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                if (e.target.value) setPeriod('');
              }}
              className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              View
            </label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'daily' | 'monthly')}
              className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        {reports && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icons.DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatPrice(reports.summary.totalRevenue)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icons.ShoppingCart className="w-8 h-8 text-green-600 dark:text-green-300" />
                </div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Total Orders</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {reports.summary.totalOrders}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icons.DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                </div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Avg Order Value</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {formatPrice(reports.summary.averageOrderValue)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icons.TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-300" />
                </div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Min Order</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {formatPrice(reports.summary.minOrderValue)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icons.TrendingUp className="w-8 h-8 text-red-600 dark:text-red-300" />
                </div>
                <p className="text-sm font-medium text-red-700 dark:text-red-300">Max Order</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {formatPrice(reports.summary.maxOrderValue)}
                </p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Sales Trend */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {timeRange === 'daily' ? 'Daily' : 'Monthly'} Sales Trend
                </h3>
                <div className="h-64 overflow-x-auto">
                  <div className="min-w-full space-y-4">
                    {(timeRange === 'daily' ? reports.dailyTrend : reports.monthlyTrend)
                      .slice(-14)
                      .map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-24 text-sm text-gray-600 dark:text-gray-400">{item.date}</div>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
                            <div
                              className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
                              style={{
                                width: `${Math.min(
                                  (item.revenue / Math.max(...(timeRange === 'daily' ? reports.dailyTrend : reports.monthlyTrend).map(t => t.revenue))) * 100,
                                  100
                                )}%`
                              }}
                            >
                              <span className="text-xs text-white font-medium">
                                {formatPrice(item.revenue)}
                              </span>
                            </div>
                          </div>
                          <div className="w-20 text-sm text-gray-900 dark:text-white text-right">
                            {item.orders} orders
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Sales by Status */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Sales by Status
                </h3>
                <div className="space-y-4">
                  {reports.salesByStatus.map((status, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">{status._id || 'Unknown'}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{status.count} orders</p>
                      </div>
                      <p className="text-lg font-bold text-primary">{formatPrice(status.totalAmount)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sales by Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Sales by Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reports.salesByPayment.map((payment, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Payment Method</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white capitalize mb-2">{payment._id || 'Unknown'}</p>
                    <p className="text-2xl font-bold text-primary">{formatPrice(payment.totalAmount)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{payment.count} transactions</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Customers
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stroke dark:border-stroke-dark">
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Customer</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Email</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Orders</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white text-right">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.topCustomers.map((customer, index) => (
                      <tr key={index} className="border-b border-stroke dark:border-stroke-dark">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{customer.name || 'Unknown'}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{customer.email || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{customer.orderCount}</td>
                        <td className="py-3 px-4 text-right font-bold text-primary">{formatPrice(customer.totalSpent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

