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
  Alert: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  X: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  DollarSign: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  ),
};

interface InventoryReports {
  summary: {
    totalProducts: number;
    totalStock: number;
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
  };
  inventoryByCategory: Array<{
    categoryId: string;
    categoryName: string;
    productCount: number;
    totalStock: number;
    totalValue: number;
    lowStockCount: number;
  }>;
  lowStockProducts: Array<{
    _id: string;
    name: string;
    sku: string;
    stock: number;
    lowStockThreshold: number;
    price: number;
    category: any;
  }>;
  outOfStockProducts: Array<{
    _id: string;
    name: string;
    sku: string;
    stock: number;
    price: number;
    category: any;
  }>;
  stockMovement: Array<{
    productId: string;
    month: string;
    unitsSold: number;
  }>;
  products: Array<{
    _id: string;
    name: string;
    sku: string;
    stock: number;
    lowStockThreshold: number;
    price: number;
    category: any;
    seller: any;
    status: string;
    isLowStock: boolean;
    isOutOfStock: boolean;
  }>;
}

export default function InventoryReportsPage() {
  const { formatPrice } = useCurrency();
  const [reports, setReports] = useState<InventoryReports | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReports();
  }, [category, status, stockFilter]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (category) params.category = category;
      if (status) params.status = status;
      if (stockFilter !== 'all') params.stockFilter = stockFilter;
      
      const response = await api.get('/admin/reports/inventory', { params });
      const data = response.data;
      
      if (data.meta?.code === 200 || data.success) {
        setReports(data.data || data);
      } else {
        toast.error(data.meta?.message || 'Failed to fetch inventory reports');
      }
    } catch (error: any) {
      console.error('Error fetching inventory reports:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch inventory reports');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = reports?.products.filter(product => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower)
      );
    }
    return true;
  }) || [];

  if (loading && !reports) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning>
      <Breadcrumb pageName="Inventory Reports" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor inventory levels and stock status</p>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-stroke rounded-md"
            />
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-stroke rounded-md"
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock Status</label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-3 py-2 border border-stroke rounded-md"
            >
              <option value="all">All</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
              <option value="in">In Stock</option>
            </select>
          </div>
        </div>

        {reports && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-6">
                <Icons.Package className="w-8 h-8 text-blue-600 dark:text-blue-300 mb-2" />
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Products</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{reports.summary.totalProducts}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-6">
                <Icons.Package className="w-8 h-8 text-green-600 dark:text-green-300 mb-2" />
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Total Stock</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{reports.summary.totalStock}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-6">
                <Icons.DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-300 mb-2" />
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Value</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{formatPrice(reports.summary.totalValue)}</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-lg p-6">
                <Icons.Alert className="w-8 h-8 text-yellow-600 dark:text-yellow-300 mb-2" />
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{reports.summary.lowStockCount}</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-lg p-6">
                <Icons.X className="w-8 h-8 text-red-600 dark:text-red-300 mb-2" />
                <p className="text-sm font-medium text-red-700 dark:text-red-300">Out of Stock</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">{reports.summary.outOfStockCount}</p>
              </div>
            </div>

            {/* Inventory by Category */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inventory by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {reports.inventoryByCategory.map((cat, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="font-bold text-gray-900 dark:text-white mb-2">{cat.categoryName || 'Uncategorized'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{cat.productCount} products</p>
                    <p className="text-lg font-bold text-primary mb-1">{formatPrice(cat.totalValue)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cat.totalStock} units</p>
                    {cat.lowStockCount > 0 && (
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">{cat.lowStockCount} low stock</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock & Out of Stock Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icons.Alert className="w-5 h-5 text-yellow-600" />
                  Low Stock Products
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {reports.lowStockProducts.length > 0 ? (
                    reports.lowStockProducts.map((product, index) => (
                      <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {product.sku}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                              {product.stock} / {product.lowStockThreshold}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">units</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-4">No low stock products</p>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icons.X className="w-5 h-5 text-red-600" />
                  Out of Stock Products
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {reports.outOfStockProducts.length > 0 ? (
                    reports.outOfStockProducts.map((product, index) => (
                      <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {product.sku}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-red-600 dark:text-red-400">0 units</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">out of stock</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-4">No out of stock products</p>
                  )}
                </div>
              </div>
            </div>

            {/* All Products Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Products Inventory</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stroke dark:border-stroke-dark">
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Product</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">SKU</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Category</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Stock</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Threshold</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Value</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, index) => (
                      <tr key={index} className="border-b border-stroke dark:border-stroke-dark">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{product.name}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.sku}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {typeof product.category === 'object' ? product.category?.name : product.category || 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{product.stock}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.lowStockThreshold}</td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{formatPrice(product.price * product.stock)}</td>
                        <td className="py-3 px-4">
                          {product.isOutOfStock ? (
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded text-xs font-medium">
                              Out of Stock
                            </span>
                          ) : product.isLowStock ? (
                            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 rounded text-xs font-medium">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded text-xs font-medium">
                              In Stock
                            </span>
                          )}
                        </td>
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

