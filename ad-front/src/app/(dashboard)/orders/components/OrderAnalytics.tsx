"use client";

import React from 'react';
import { OrderAnalytics as OrderAnalyticsType } from '@/components/redux/action/types/orderTypes';
import { useCurrency } from '@/contexts/CurrencyContext';

interface OrderAnalyticsProps {
  analytics: OrderAnalyticsType | null;
  loading: boolean;
}

const OrderAnalyticsComponent: React.FC<OrderAnalyticsProps> = ({
  analytics,
  loading
}) => {
  const { formatPrice } = useCurrency();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No analytics data available</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'returned': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{analytics.totalOrders}</p>
          <p className="text-sm text-gray-500 mt-1">
            {analytics.orderGrowth > 0 ? '+' : ''}{analytics.orderGrowth}% from last period
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">{formatPrice(analytics.totalRevenue)}</p>
          <p className="text-sm text-gray-500 mt-1">
            {analytics.revenueGrowth > 0 ? '+' : ''}{analytics.revenueGrowth}% from last period
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Average Order Value</h3>
          <p className="text-3xl font-bold text-purple-600">{formatPrice(analytics.averageOrderValue)}</p>
          <p className="text-sm text-gray-500 mt-1">
            {analytics.aovGrowth > 0 ? '+' : ''}{analytics.aovGrowth}% from last period
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold text-indigo-600">{analytics.conversionRate}%</p>
          <p className="text-sm text-gray-500 mt-1">
            {analytics.conversionGrowth > 0 ? '+' : ''}{analytics.conversionGrowth}% from last period
          </p>
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.statusDistribution.map((status) => (
            <div key={status.status} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status.status)}`}>
                  {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{status.count}</p>
                <p className="text-sm text-gray-500">{status.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue by Period */}
      {analytics.revenueByPeriod && analytics.revenueByPeriod.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Period</h3>
          <div className="space-y-3">
            {analytics.revenueByPeriod.map((period) => (
              <div key={period.period} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{period.period}</span>
                <span className="font-semibold text-gray-900">{formatPrice(period.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Products */}
      {analytics.topProducts && analytics.topProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-3">
            {analytics.topProducts.map((product, index) => (
              <div key={product.productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.orders} orders</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">{formatPrice(product.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Method Distribution */}
      {analytics.paymentMethodDistribution && analytics.paymentMethodDistribution.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.paymentMethodDistribution.map((method) => (
              <div key={method.method} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                    {method.method.charAt(0).toUpperCase() + method.method.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{method.count}</p>
                  <p className="text-sm text-gray-500">{method.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAnalyticsComponent; 