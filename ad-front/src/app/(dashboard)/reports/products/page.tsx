"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { useCurrency } from "@/contexts/CurrencyContext";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const Icons = {
  Package: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
  ShoppingCart: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Download: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

interface ProductPerformanceReports {
  topProducts: Array<{
    productId: string;
    productName: string;
    revenue: number;
    unitsSold: number;
    orderCount: number;
    averagePrice: number;
  }>;
  categoryPerformance: Array<{
    categoryId: string;
    categoryName: string;
    revenue: number;
    unitsSold: number;
    productCount: number;
  }>;
  productTrends: Array<{
    productId: string;
    month: string;
    revenue: number;
    units: number;
  }>;
  totalProducts: number;
  summary: {
    totalRevenue: number;
    totalUnitsSold: number;
    averageRevenuePerProduct: number;
  };
}

export default function ProductPerformancePage() {
  const { formatPrice } = useCurrency();
  const [reports, setReports] = useState<ProductPerformanceReports | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('revenue');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchReports();
  }, [period, startDate, endDate, sortBy, category]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params: any = { period, sortBy };
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      if (category) {
        params.category = category;
      }
      
      const response = await api.get('/admin/reports/products', { params });
      const data = response.data;
      
      if (data.meta?.code === 200 || data.success) {
        setReports(data.data || data);
      } else {
        toast.error(data.meta?.message || 'Failed to fetch product performance reports');
      }
    } catch (error: any) {
      console.error('Error fetching product performance reports:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch product performance reports');
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
      <Breadcrumb pageName="Product Performance" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Performance</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track product sales and performance metrics</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-stroke rounded-md"
            >
              <option value="revenue">Revenue</option>
              <option value="units">Units Sold</option>
              <option value="orders">Orders</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Filter by category"
              className="w-full px-3 py-2 border border-stroke rounded-md"
            />
          </div>
        </div>

        {reports && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-6">
                <Icons.DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-300 mb-2" />
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatPrice(reports.summary.totalRevenue)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-6">
                <Icons.ShoppingCart className="w-8 h-8 text-green-600 dark:text-green-300 mb-2" />
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Units Sold</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {reports.summary.totalUnitsSold}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-6">
                <Icons.Package className="w-8 h-8 text-purple-600 dark:text-purple-300 mb-2" />
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Products</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {reports.totalProducts}
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-lg p-6">
                <Icons.TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-300 mb-2" />
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Avg Revenue/Product</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {formatPrice(reports.summary.averageRevenuePerProduct)}
                </p>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top 10 Products</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stroke dark:border-stroke-dark">
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Product</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Units Sold</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Orders</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.topProducts.map((product, index) => (
                      <tr key={index} className="border-b border-stroke dark:border-stroke-dark">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{product.productName}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.unitsSold}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.orderCount}</td>
                        <td className="py-3 px-4 text-right font-bold text-primary">{formatPrice(product.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reports.categoryPerformance.map((cat, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">{cat.categoryName || 'Uncategorized'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{cat.productCount} products</p>
                    <p className="text-2xl font-bold text-primary mb-1">{formatPrice(cat.revenue)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cat.unitsSold} units sold</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

