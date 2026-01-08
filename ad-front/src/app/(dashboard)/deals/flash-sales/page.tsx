"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import api from "@/utils/api";
import { useCurrency } from "@/contexts/CurrencyContext";

// Icons
const Icons = {
  Search: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Filter: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
    </svg>
  ),
  Edit: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Trash: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Calendar: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Fire: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.5-7 1 1 2 2 2 4a6 6 0 015.157 8.657z" />
    </svg>
  ),
};

interface FlashSale {
  _id: string;
  title: string;
  description: string;
  originalPrice: number;
  dealPrice: number;
  category: string | { name: string };
  images: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  usedCount: number;
  maxUses: number;
  status: string;
}

export default function FlashSales() {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const [flashSales, setFlashSales] = useState<FlashSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchFlashSales();
  }, [statusFilter]);

  const fetchFlashSales = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all deals and filter for flash sales
      const result = await api.get('/admin/deals/list?limit=1000');
      const resultData = result.data;
      
      if (resultData.success) {
        const allDeals = resultData.data || [];
        
        // Filter for flash sales (dealType === 'flash_sale')
        let filtered = allDeals.filter((deal: any) => deal.dealType === 'flash_sale');
        
        // Apply status filter
        if (statusFilter !== 'all') {
          const now = new Date();
          filtered = filtered.filter((deal: any) => {
            const start = new Date(deal.startDate);
            const end = new Date(deal.endDate);
            
            if (statusFilter === 'active') {
              return deal.isActive && start <= now && end >= now;
            } else if (statusFilter === 'upcoming') {
              return deal.isActive && start > now;
            } else if (statusFilter === 'expired') {
              return end < now;
            }
            return true;
          });
        }
        
        setFlashSales(filtered);
      } else {
        setError(resultData.message || 'Error fetching flash sales');
      }
    } catch (error: any) {
      console.error('Error fetching flash sales:', error);
      setError(error.response?.data?.message || 'An unexpected error occurred');
      toast.error('Failed to fetch flash sales');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (dealId: string) => {
    if (!confirm('Are you sure you want to delete this flash sale?')) {
      return;
    }

    try {
      await api.delete(`/admin/deals/${dealId}`);
      toast.success('Flash sale deleted successfully');
      fetchFlashSales();
    } catch (error: any) {
      console.error('Error deleting flash sale:', error);
      toast.error(error.response?.data?.message || 'Failed to delete flash sale');
    }
  };

  const getStatus = (deal: FlashSale) => {
    const now = new Date();
    const start = new Date(deal.startDate);
    const end = new Date(deal.endDate);
    
    if (!deal.isActive) return { text: 'Inactive', color: 'text-gray-600 bg-gray-100' };
    if (end < now) return { text: 'Expired', color: 'text-red-600 bg-red-100' };
    if (start > now) return { text: 'Upcoming', color: 'text-blue-600 bg-blue-100' };
    return { text: 'Active', color: 'text-green-600 bg-green-100' };
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const filteredSales = flashSales.filter((sale) =>
    sale.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sale.description && sale.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Icons.Fire className="w-6 h-6 text-red-500 mr-2" />
            Flash Sales
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage time-limited flash sale deals</p>
        </div>
        <button
          onClick={() => router.push('/deals/add?type=flash_sale')}
          className="flex items-center space-x-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
        >
          <span>Create Flash Sale</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search flash sales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Flash Sales Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSales.map((sale) => {
          const status = getStatus(sale);
          const timeRemaining = getTimeRemaining(sale.endDate);
          const discount = ((sale.originalPrice - sale.dealPrice) / sale.originalPrice) * 100;
          
          return (
            <div
              key={sale._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                {sale.images && sale.images.length > 0 ? (
                  <img
                    src={sale.images[0]}
                    alt={sale.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icons.Fire className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    {status.text}
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                    -{discount.toFixed(0)}%
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {sale.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {sale.description}
                </p>
                
                {/* Pricing */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(sale.dealPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(sale.originalPrice)}
                  </span>
                </div>
                
                {/* Time Remaining */}
                <div className="flex items-center space-x-2 mb-4 text-sm">
                  <Icons.Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {timeRemaining} remaining
                  </span>
                </div>
                
                {/* Usage Stats */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-600 dark:text-gray-400">
                    Used: {sale.usedCount} / {sale.maxUses === -1 ? '∞' : sale.maxUses}
                  </span>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => router.push(`/deals/add?id=${sale._id}`)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Icons.Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(sale._id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredSales.length === 0 && (
        <div className="text-center py-12">
          <Icons.Fire className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No flash sales found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your filters.'
              : 'Get started by creating a new flash sale.'}
          </p>
        </div>
      )}
    </div>
  );
}

