"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "@/utils/api";
import { useCurrency } from "@/contexts/CurrencyContext";

// Icons
const Icons = {
  TrendingUp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  TrendingDown: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
  DollarSign: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  ),
  Package: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Users: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Calendar: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

interface DealAnalytics {
  totalDeals: number;
  activeDeals: number;
  expiredDeals: number;
  upcomingDeals: number;
  totalRevenue: number;
  averageDiscount: number;
  totalUses: number;
  topDeals: Array<{
    title: string;
    revenue: number;
    uses: number;
    discount: number;
  }>;
  categoryPerformance: Array<{
    category: string;
    deals: number;
    revenue: number;
  }>;
  dealTypeDistribution: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
}

export default function DealAnalytics() {
  const { formatPrice } = useCurrency();
  const [analytics, setAnalytics] = useState<DealAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeFrame]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch all deals
      const dealsResult = await api.get('/admin/deals/list?limit=1000');
      const dealsData = dealsResult.data;
      const deals = dealsData.success ? dealsData.data : [];
      
      // Calculate analytics
      const now = new Date();
      const totalDeals = deals.length;
      const activeDeals = deals.filter((deal: any) => {
        const start = new Date(deal.startDate);
        const end = new Date(deal.endDate);
        return deal.isActive && start <= now && end >= now;
      }).length;
      
      const expiredDeals = deals.filter((deal: any) => {
        const end = new Date(deal.endDate);
        return end < now;
      }).length;
      
      const upcomingDeals = deals.filter((deal: any) => {
        const start = new Date(deal.startDate);
        return deal.isActive && start > now;
      }).length;
      
      // Calculate revenue (mock - would come from orders)
      const totalRevenue = deals.reduce((sum: number, deal: any) => {
        return sum + (deal.dealPrice * (deal.usedCount || 0));
      }, 0);
      
      const totalUses = deals.reduce((sum: number, deal: any) => sum + (deal.usedCount || 0), 0);
      
      const averageDiscount = deals.length > 0
        ? deals.reduce((sum: number, deal: any) => {
            const discount = ((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100;
            return sum + discount;
          }, 0) / deals.length
        : 0;
      
      // Top deals
      const topDeals = deals
        .map((deal: any) => ({
          title: deal.title,
          revenue: deal.dealPrice * (deal.usedCount || 0),
          uses: deal.usedCount || 0,
          discount: ((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100,
        }))
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 5);
      
      // Category performance
      const categoryMap: { [key: string]: { deals: number; revenue: number } } = {};
      deals.forEach((deal: any) => {
        const categoryName = typeof deal.category === 'object' 
          ? deal.category.name 
          : 'Uncategorized';
        if (!categoryMap[categoryName]) {
          categoryMap[categoryName] = { deals: 0, revenue: 0 };
        }
        categoryMap[categoryName].deals++;
        categoryMap[categoryName].revenue += deal.dealPrice * (deal.usedCount || 0);
      });
      
      const categoryPerformance = Object.entries(categoryMap).map(([category, data]) => ({
        category,
        deals: data.deals,
        revenue: data.revenue,
      })).sort((a, b) => b.revenue - a.revenue);
      
      // Deal type distribution
      const typeMap: { [key: string]: number } = {};
      deals.forEach((deal: any) => {
        typeMap[deal.dealType] = (typeMap[deal.dealType] || 0) + 1;
      });
      
      const dealTypeDistribution = Object.entries(typeMap).map(([type, count]) => ({
        type: type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        count,
        percentage: (count / totalDeals) * 100,
      }));
      
      setAnalytics({
        totalDeals,
        activeDeals,
        expiredDeals,
        upcomingDeals,
        totalRevenue,
        averageDiscount,
        totalUses,
        topDeals,
        categoryPerformance,
        dealTypeDistribution,
      });
    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deal Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive insights into your deals performance</p>
        </div>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Icons.Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Deals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalDeals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Icons.TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Deals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.activeDeals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Icons.DollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(analytics.totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Icons.Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Uses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalUses}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expired Deals</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.expiredDeals}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Deals</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.upcomingDeals}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Discount</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.averageDiscount.toFixed(1)}%</p>
        </div>
      </div>

      {/* Top Deals */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Performing Deals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Deal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Uses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Discount</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {analytics.topDeals.map((deal, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {deal.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatPrice(deal.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {deal.uses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {deal.discount.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Category Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.categoryPerformance.slice(0, 5).map((cat, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{cat.category}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{formatPrice(cat.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(cat.revenue / analytics.totalRevenue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{cat.deals} deals</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {((cat.revenue / analytics.totalRevenue) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Deal Type Distribution</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.dealTypeDistribution.map((type, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{type.type}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{type.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {type.percentage.toFixed(1)}% of total deals
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

