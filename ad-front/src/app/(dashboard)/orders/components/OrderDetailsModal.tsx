"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/components/redux/reducer';
import { fetchOrderByIdRequest } from '@/components/redux/action/orders/orderAction';
import { useCurrency } from '@/contexts/CurrencyContext';

interface OrderDetailsModalProps {
  isOpen: boolean;
  orderId: string | null;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  orderId,
  onClose
}) => {
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector((state: RootState) => state.orders);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen && orderId) {
      dispatch(fetchOrderByIdRequest(orderId));
    }
  }, [dispatch, isOpen, orderId]);

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {loading.currentOrder ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : currentOrder ? (
          <div className="p-6 space-y-6">
            {/* Order Header */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{currentOrder.orderNumber}</h3>
                  <p className="text-sm text-gray-500">Order ID: {currentOrder._id}</p>
                </div>
                <div className="text-center">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(currentOrder.orderStatus)}`}>
                    {currentOrder.orderStatus.charAt(0).toUpperCase() + currentOrder.orderStatus.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{formatPrice(currentOrder.total)}</p>
                  <p className="text-sm text-gray-500">{formatDate(currentOrder.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Name</p>
                  <p className="text-sm text-gray-900">
                    {currentOrder.user?.first_name} {currentOrder.user?.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-900">{currentOrder.user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Username</p>
                  <p className="text-sm text-gray-900">{currentOrder.user?.userName}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {currentOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">SKU: {item.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
                      <p className="text-sm font-semibold text-gray-900">{formatPrice(item.totalPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Label:</span> {currentOrder.shippingAddress.label}
                  </p>
                  <p className="text-sm text-gray-900">
                    {currentOrder.shippingAddress.addressLine1}
                  </p>
                  <p className="text-sm text-gray-900">
                    {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.postalCode}
                  </p>
                  <p className="text-sm text-gray-900">
                    {currentOrder.shippingAddress.country}
                  </p>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Phone:</span> {currentOrder.shippingAddress.phone}
                  </p>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Label:</span> {currentOrder.billingAddress.label}
                  </p>
                  <p className="text-sm text-gray-900">
                    {currentOrder.billingAddress.addressLine1}
                  </p>
                  <p className="text-sm text-gray-900">
                    {currentOrder.billingAddress.city}, {currentOrder.billingAddress.state} {currentOrder.billingAddress.postalCode}
                  </p>
                  <p className="text-sm text-gray-900">
                    {currentOrder.billingAddress.country}
                  </p>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Phone:</span> {currentOrder.billingAddress.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment & Shipping Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Payment Method:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {currentOrder.paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Payment Status:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(currentOrder.paymentStatus)}`}>
                      {currentOrder.paymentStatus.charAt(0).toUpperCase() + currentOrder.paymentStatus.slice(1)}
                    </span>
                  </div>
                  {currentOrder.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Tracking Number:</span>
                      <span className="text-sm font-medium text-gray-900">{currentOrder.trackingNumber}</span>
                    </div>
                  )}
                  {currentOrder.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Estimated Delivery:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(currentOrder.estimatedDelivery)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Subtotal:</span>
                    <span className="text-sm font-medium text-gray-900">{formatPrice(currentOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Shipping:</span>
                    <span className="text-sm font-medium text-gray-900">{formatPrice(currentOrder.shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Tax:</span>
                    <span className="text-sm font-medium text-gray-900">{formatPrice(currentOrder.tax)}</span>
                  </div>
                  {currentOrder.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Discount:</span>
                      <span className="text-sm font-medium text-green-600">-{formatPrice(currentOrder.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm font-semibold text-gray-900">Total:</span>
                    <span className="text-sm font-semibold text-gray-900">{formatPrice(currentOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {(currentOrder.notes || currentOrder.cancellationReason) && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                {currentOrder.notes && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Order Notes:</p>
                    <p className="text-sm text-gray-900">{currentOrder.notes}</p>
                  </div>
                )}
                {currentOrder.cancellationReason && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Cancellation Reason:</p>
                    <p className="text-sm text-gray-900">{currentOrder.cancellationReason}</p>
                  </div>
                )}
              </div>
            )}

            {/* Timestamps */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Timeline</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Order Created:</span>
                  <span className="text-sm text-gray-900">{formatDate(currentOrder.createdAt)}</span>
                </div>
                {currentOrder.updatedAt && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Last Updated:</span>
                    <span className="text-sm text-gray-900">{formatDate(currentOrder.updatedAt)}</span>
                  </div>
                )}
                {currentOrder.deliveredAt && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Delivered:</span>
                    <span className="text-sm text-gray-900">{formatDate(currentOrder.deliveredAt)}</span>
                  </div>
                )}
                {currentOrder.cancelledAt && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Cancelled:</span>
                    <span className="text-sm text-gray-900">{formatDate(currentOrder.cancelledAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">Order not found</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal; 