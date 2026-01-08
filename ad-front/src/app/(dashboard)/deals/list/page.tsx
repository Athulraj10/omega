"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import api from "@/utils/api";

// Icons
const Icons = {
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Filter: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" /></svg>,
  Edit: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Eye: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  Star: () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
  Calendar: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Tag: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
  TrendingUp: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
};

interface Deal {
  _id: string;
  title: string;
  description: string;
  dealType: string;
  originalPrice: number;
  dealPrice: number;
  category: string | { name: string; description?: string; icon?: string };
  brand: string;
  location: string;
  quantity: number;
  rating: number;
  status: string;
  sale: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  startDate: string;
  endDate: string;
  maxUses: number;
  usedCount: number;
  minOrderValue: number;
  tags: string[];
  conditions: string;
  terms: string;
  createdBy: {
    name: string;
    email: string;
  };
  seller?: {
    companyName: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function DealsList() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDealType, setSelectedDealType] = useState("");
  const [categories, setCategories] = useState<Array<{id: string; name: string}>>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch deals
  const fetchDeals = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      });

      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedStatus) params.append('status', selectedStatus);
      if (selectedDealType) params.append('dealType', selectedDealType);

      const result = await api.get(`/admin/deals/list?${params}`);
      const resultData = result.data;

      if (resultData.success) {
        setDeals(resultData.data);
        setTotalPages(resultData.pagination.totalPages);
        setTotalItems(resultData.pagination.totalItems);
      } else {
        setError(resultData.message || 'Error fetching deals');
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, [currentPage, searchTerm, selectedCategory, selectedStatus, selectedDealType]);

  // Fetch categories for filter
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await api.get('/admin/categories/for-product');
      const result = response.data;

      // Handle both response formats: {success: true, data: {...}} or {meta: {code: 200}, data: {...}}
      const responseData = result.data || result;
      
      if (result.success || result.meta?.code === 200) {
        const allCategories: Array<{id: string; name: string}> = [];
        
        // Add main categories
        if (responseData.mainCategories) {
          responseData.mainCategories.forEach((mainCat: any) => {
            allCategories.push({
              id: mainCat.id,
              name: mainCat.name
            });
            
            // Add subcategories
            if (mainCat.subcategories) {
              mainCat.subcategories.forEach((subCat: any) => {
                allCategories.push({
                  id: subCat.id,
                  name: `  └─ ${subCat.name}`
                });
              });
            }
          });
        }
        
        // Add standalone categories
        if (responseData.standaloneCategories) {
          responseData.standaloneCategories.forEach((cat: any) => {
            allCategories.push({
              id: cat.id,
              name: cat.name
            });
          });
        }
        
        setCategories(allCategories);
      } else {
        console.error('Failed to fetch categories:', result.message || result.meta?.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Delete deal
  const handleDelete = async (dealId: string) => {
    if (!confirm('Are you sure you want to delete this deal?')) return;

    try {
      const response = await fetch(`/api/admin/deals/${dealId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Deal deleted successfully');
        fetchDeals();
      } else {
        toast.error(result.message || 'Error deleting deal');
      }
    } catch (error) {
      console.error('Error deleting deal:', error);
      toast.error('An unexpected error occurred');
    }
  };

  // Toggle deal status
  const handleToggleStatus = async (dealId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/deals/${dealId}/toggle-status`, {
        method: 'PATCH',
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Deal ${currentStatus ? 'deactivated' : 'activated'} successfully`);
        fetchDeals();
      } else {
        toast.error(result.message || 'Error updating deal status');
      }
    } catch (error) {
      console.error('Error updating deal status:', error);
      toast.error('An unexpected error occurred');
    }
  };

  // Toggle featured status
  const handleToggleFeatured = async (dealId: string, currentFeatured: boolean) => {
    try {
      const response = await fetch(`/api/admin/deals/${dealId}/toggle-featured`, {
        method: 'PATCH',
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Deal ${currentFeatured ? 'unmarked as featured' : 'marked as featured'} successfully`);
        fetchDeals();
      } else {
        toast.error(result.message || 'Error updating featured status');
      }
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast.error('An unexpected error occurred');
    }
  };

  // Calculate discount percentage
  const getDiscountPercentage = (originalPrice: number, dealPrice: number) => {
    if (originalPrice > 0) {
      return Math.round(((originalPrice - dealPrice) / originalPrice) * 100);
    }
    return 0;
  };

  // Check if deal is currently active
  const isDealActive = (startDate: string, endDate: string, isActive: boolean) => {
    if (!isActive) return false;
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= now && end >= now;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Pre-order': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get deal type color
  const getDealTypeColor = (dealType: string) => {
    switch (dealType) {
      case 'percentage': return 'bg-blue-100 text-blue-800';
      case 'fixed': return 'bg-purple-100 text-purple-800';
      case 'buy_one_get_one': return 'bg-green-100 text-green-800';
      case 'free_shipping': return 'bg-orange-100 text-orange-800';
      case 'flash_sale': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && deals.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deals Management</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage all deals and promotions ({totalItems} total deals)
          </p>
        </div>
        
        <Link
          href="/deals/add"
          className="flex items-center space-x-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
        >
          <Icons.Plus />
          <span>Add New Deal</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Icons.Filter />
            <span>Filters</span>
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  disabled={loadingCategories}
                >
                  <option value="">
                    {loadingCategories ? 'Loading categories...' : 'All Categories'}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Pre-order">Pre-order</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Deal Type
                </label>
                <select
                  value={selectedDealType}
                  onChange={(e) => setSelectedDealType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Types</option>
                  <option value="percentage">Percentage Discount</option>
                  <option value="fixed">Fixed Amount</option>
                  <option value="buy_one_get_one">Buy One Get One</option>
                  <option value="free_shipping">Free Shipping</option>
                  <option value="flash_sale">Flash Sale</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <div
            key={deal._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Deal Image */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              {deal.images && deal.images.length > 0 ? (
                <img
                  src={deal.images[0]}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Icons.Tag className="w-12 h-12" />
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-2 left-2 space-y-1">
                {deal.sale && (
                  <span className="inline-block bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {deal.sale}
                  </span>
                )}
                {deal.isFeatured && (
                  <span className="inline-block bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="absolute top-2 right-2 space-y-1">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getDealTypeColor(deal.dealType)}`}>
                  {deal.dealType.replace('_', ' ').toUpperCase()}
                </span>
                {getDiscountPercentage(deal.originalPrice, deal.dealPrice) > 0 && (
                  <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    -{getDiscountPercentage(deal.originalPrice, deal.dealPrice)}%
                  </span>
                )}
              </div>
            </div>

            {/* Deal Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {deal.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {deal.description}
              </p>

              {/* Pricing */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${deal.dealPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${deal.originalPrice}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                {/* Category */}
                {deal.category && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="font-medium">{typeof deal.category === 'string' ? deal.category : deal.category.name}</span>
                  </div>
                )}
                
                {deal.brand && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Brand:</span>
                    <span className="font-medium">{deal.brand}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(deal.status)}`}>
                    {deal.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Active:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    isDealActive(deal.startDate, deal.endDate, deal.isActive)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {isDealActive(deal.startDate, deal.endDate, deal.isActive) ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              {/* Rating */}
              {deal.rating > 0 && (
                <div className="flex items-center space-x-1 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Icons.Star key={i} className={`w-4 h-4 ${i < deal.rating ? 'fill-current' : 'fill-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">({deal.rating})</span>
                </div>
              )}

              {/* Schedule */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-1 mb-1">
                  <Icons.Calendar />
                  <span>Start: {formatDate(deal.startDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icons.Calendar />
                  <span>End: {formatDate(deal.endDate)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push(`/deals/edit/${deal._id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit Deal"
                  >
                    <Icons.Edit />
                  </button>
                  
                  <button
                    onClick={() => router.push(`/deals/view/${deal._id}`)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    title="View Deal"
                  >
                    <Icons.Eye />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(deal._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Deal"
                  >
                    <Icons.Trash />
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleStatus(deal._id, deal.isActive)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      deal.isActive
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {deal.isActive ? 'Active' : 'Inactive'}
                  </button>
                  
                  <button
                    onClick={() => handleToggleFeatured(deal._id, deal.isFeatured)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      deal.isFeatured
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {deal.isFeatured ? 'Featured' : 'Feature'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {deals.length === 0 && !loading && (
        <div className="text-center py-12">
          <Icons.Tag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No deals found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new deal.
          </p>
          <div className="mt-6">
            <Link
              href="/deals/add"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-90"
            >
              <Icons.Plus className="-ml-1 mr-2 h-5 w-5" />
              Add New Deal
            </Link>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPage === i + 1
                    ? 'bg-primary text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 