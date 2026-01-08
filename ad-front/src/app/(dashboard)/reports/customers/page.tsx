"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { useCurrency } from "@/contexts/CurrencyContext";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const Icons = {
  Users: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  UserPlus: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  TrendingUp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  DollarSign: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  ),
};

interface CustomerAnalyticsReports {
  summary: {
    totalCustomers: number;
    newCustomers: number;
    returningCustomers: number;
    oneTimeCustomers: number;
    averageLTV: number;
  };
  topCustomers: Array<{
    userId: string;
    name: string;
    email: string;
    totalSpent: number;
    orderCount: number;
    averageOrderValue: number;
    firstOrder: string;
    lastOrder: string;
  }>;
  segments: {
    vip: number;
    regular: number;
    new: number;
  };
  acquisitionTrend: Array<{
    month: string;
    count: number;
  }>;
  orderDistribution: Array<{
    _id: string;
    customerCount: number;
  }>;
  retention: {
    returningRate: number;
    returningCustomers: number;
    oneTimeCustomers: number;
  };
}

export default function CustomerAnalyticsPage() {
  const { formatPrice } = useCurrency();
  const [reports, setReports] = useState<CustomerAnalyticsReports | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
      
      const response = await api.get('/admin/reports/customers', { params });
      const data = response.data;
      
      if (data.meta?.code === 200 || data.success) {
        setReports(data.data || data);
      } else {
        toast.error(data.meta?.message || 'Failed to fetch customer analytics');
      }
    } catch (error: any) {
      console.error('Error fetching customer analytics:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch customer analytics');
    } finally {
      setLoading(false);
    }
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
      <Breadcrumb pageName="Customer Analytics" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive customer insights and behavior analysis</p>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Period</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-stroke rounded-md"
              disabled={!!(startDate && endDate)}
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (e.target.value) setPeriod('');
              }}
              className="w-full px-3 py-2 border border-stroke rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                if (e.target.value) setPeriod('');
              }}
              className="w-full px-3 py-2 border border-stroke rounded-md"
            />
          </div>
        </div>

        {reports && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-6">
                <Icons.Users className="w-8 h-8 text-blue-600 dark:text-blue-300 mb-2" />
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Customers</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{reports.summary.totalCustomers}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-6">
                <Icons.UserPlus className="w-8 h-8 text-green-600 dark:text-green-300 mb-2" />
                <p className="text-sm font-medium text-green-700 dark:text-green-300">New Customers</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{reports.summary.newCustomers}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-6">
                <Icons.Users className="w-8 h-8 text-purple-600 dark:text-purple-300 mb-2" />
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Returning</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{reports.summary.returningCustomers}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-lg p-6">
                <Icons.Users className="w-8 h-8 text-orange-600 dark:text-orange-300 mb-2" />
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">One-Time</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{reports.summary.oneTimeCustomers}</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-lg p-6">
                <Icons.DollarSign className="w-8 h-8 text-red-600 dark:text-red-300 mb-2" />
                <p className="text-sm font-medium text-red-700 dark:text-red-300">Avg LTV</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">{formatPrice(reports.summary.averageLTV)}</p>
              </div>
            </div>

            {/* Customer Segmentation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Segmentation</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">VIP Customers</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Spent $10,000+</p>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{reports.segments.vip}</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Regular Customers</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Spent $1,000 - $10,000</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{reports.segments.regular}</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">New Customers</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Spent &lt; $1,000</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{reports.segments.new}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Retention Rate</h3>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="text-5xl font-bold text-primary mb-2">{reports.retention.returningRate.toFixed(1)}%</div>
                    <p className="text-gray-600 dark:text-gray-400">Returning Customer Rate</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-300">{reports.retention.returningCustomers}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Returning</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{reports.retention.oneTimeCustomers}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">One-Time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top 10 Customers</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stroke dark:border-stroke-dark">
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Customer</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Email</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Orders</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Avg Order</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white text-right">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.topCustomers.map((customer, index) => (
                      <tr key={index} className="border-b border-stroke dark:border-stroke-dark">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{customer.name || 'Unknown'}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{customer.email || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{customer.orderCount}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{formatPrice(customer.averageOrderValue)}</td>
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

