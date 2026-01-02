"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/components/redux/reducer';
import {
  fetchOrdersRequest,
  fetchOrderAnalyticsRequest,
  updateOrderStatusRequest,
  deleteOrderRequest,
  bulkUpdateOrderStatusRequest,
  exportOrdersRequest
} from '@/components/redux/action/orders/orderAction';
import { OrderFilters } from '@/components/redux/action/types/orderTypes';
import { useCurrency } from '@/contexts/CurrencyContext';
import { toast } from 'react-toastify';

// Components
import OrderList from './components/OrderList';
import OrderFiltersComponent from './components/OrderFilters';
import OrderSummaryComponent from './components/OrderSummary';
import OrderAnalyticsComponent from './components/OrderAnalytics';
import CreateOrderModal from './components/CreateOrderModal';
import OrderDetailsModal from './components/OrderDetailsModal';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, pagination, summary, analytics, loading } = useSelector((state: RootState) => state.orders);
  const { formatPrice } = useCurrency();

  // State
  const [filters, setFilters] = useState<OrderFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'analytics'>('list');

  // Fetch orders on component mount and when filters change
  useEffect(() => {
    dispatch(fetchOrdersRequest(filters));
  }, [dispatch, filters]);

  // Fetch analytics on component mount
  useEffect(() => {
    dispatch(fetchOrderAnalyticsRequest('30d'));
  }, [dispatch]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<OrderFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1 // Reset to first page when filters change
    }));
    setSelectedOrders([]); // Clear selections when filters change
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setSelectedOrders([]);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  // Handle order selection
  const handleOrderSelect = (orderId: string, selected: boolean) => {
    if (selected) {
      setSelectedOrders(prev => [...prev, orderId]);
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    }
  };

  // Handle bulk selection
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedOrders(orders.map(order => order._id));
    } else {
      setSelectedOrders([]);
    }
  };

  // Handle status update
  const handleStatusUpdate = (orderId: string, status: string, paymentStatus?: string) => {
    dispatch(updateOrderStatusRequest(orderId, status, paymentStatus));
  };

  // Handle bulk status update
  const handleBulkStatusUpdate = (status: string, paymentStatus?: string) => {
    if (selectedOrders.length === 0) {
      toast.warning('Please select orders to update');
      return;
    }
    
    if (confirm(`Are you sure you want to update ${selectedOrders.length} orders to ${status}?`)) {
      dispatch(bulkUpdateOrderStatusRequest(selectedOrders, status, paymentStatus));
      setSelectedOrders([]); // Clear selections after bulk update
    }
  };

  // Handle order deletion
  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      dispatch(deleteOrderRequest(orderId));
    }
  };

  // Handle order details view
  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowDetailsModal(true);
  };

  // Handle export
  const handleExport = () => {
    dispatch(exportOrdersRequest(filters));
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'returned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage customer orders, track status, and view analytics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Order
          </button>
          <button
            onClick={handleExport}
            disabled={loading.export}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {loading.export ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <OrderSummaryComponent
        summary={summary}
        selectedOrders={selectedOrders}
        onBulkStatusUpdate={handleBulkStatusUpdate}
        onExport={handleExport}
      />

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('list')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'list'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Orders List
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'list' ? (
        <div className="space-y-6">
          {/* Filters */}
          <OrderFiltersComponent
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />

          {/* Orders List */}
          <OrderList
            orders={orders}
            selectedOrders={selectedOrders}
            onOrderSelect={handleOrderSelect}
            onSelectAll={handleSelectAll}
            onStatusUpdate={handleStatusUpdate}
            onViewDetails={handleViewDetails}
            onDelete={handleDeleteOrder}
            loading={loading.orders}
          />

          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing {((pagination.currentPage - 1) * (filters.limit || 10)) + 1} to{' '}
                {Math.min(pagination.currentPage * (filters.limit || 10), pagination.totalOrders)} of{' '}
                {pagination.totalOrders} orders
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">
                  {pagination.currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <OrderAnalyticsComponent analytics={analytics} loading={loading.analytics} />
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateOrderModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            dispatch(fetchOrdersRequest(filters));
          }}
        />
      )}

      {showDetailsModal && selectedOrderId && (
        <OrderDetailsModal
          isOpen={showDetailsModal}
          orderId={selectedOrderId}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedOrderId(null);
          }}
        />
      )}
    </div>
  );
}