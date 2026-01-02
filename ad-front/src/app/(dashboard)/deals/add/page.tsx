"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "@/components/FormElements/InputGroup";
import ImageUpload from "@/components/ImageUpload";
import CategorySubcategorySelector from "@/components/CategorySubcategorySelector";
import { toast } from "react-hot-toast";
import api from "@/utils/api";

// Icons for sidebar navigation
const Icons = {
  Eye: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  EyeOff: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>,
  Save: ({ className = "w-5 h-5" }: { className?: string }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Package: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  Tag: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
  TrendingUp: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  FileText: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  BarChart3: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Image: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};

export default function AddDeal() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dealType: "percentage",
    discountValue: "",
    originalPrice: "",
    dealPrice: "",
    category: "", // Main category ID
    subcategory: "", // Subcategory ID
    brand: "",
    location: "Online",
    quantity: "1",
    weight: "",
    rating: "0",
    status: "Available",
    sale: "",
    isActive: true,
    isFeatured: false,
    startDate: "",
    endDate: "",
    maxUses: "-1",
    minOrderValue: "0",
    applicableProducts: "",
    applicableCategories: "",
    tags: "",
    conditions: "",
    terms: "",
    images: [] as File[],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'basic', label: 'Basic Information', icon: Icons.Package },
    { id: 'pricing', label: 'Pricing & Discount', icon: Icons.TrendingUp },
    { id: 'schedule', label: 'Schedule & Duration', icon: Icons.Calendar },
    { id: 'targeting', label: 'Targeting & Rules', icon: Icons.Settings },
    { id: 'content', label: 'Content & Media', icon: Icons.FileText },
    { id: 'images', label: 'Images & Media', icon: Icons.Image },
  ];

  // Category change handlers
  const handleCategoryChange = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      category: categoryId,
      subcategory: "", // Reset subcategory when category changes
    }));
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setFormData(prev => ({
      ...prev,
      subcategory: subcategoryId,
    }));
  };

  // Deal Preview Component
  const DealPreview = () => {
    const discountPercentage = formData.originalPrice && formData.dealPrice 
      ? Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.dealPrice)) / parseFloat(formData.originalPrice)) * 100)
      : 0;

    // Get category info from Redux state
    const { categoriesForProduct } = useSelector((state: any) => state.categories);
    const categoriesArray = Array.isArray(categoriesForProduct) ? categoriesForProduct : [];
    
    // Get selected category name
    let selectedCategoryName = "";
    if (formData.subcategory) {
      const selectedCategory = categoriesArray.find((cat: any) => cat.id === formData.category);
      const selectedSub = selectedCategory?.subcategories?.find((sub: any) => sub.id === formData.subcategory);
      selectedCategoryName = selectedSub ? selectedSub.name : "";
    } else if (formData.category) {
      const selectedCategory = categoriesArray.find((cat: any) => cat.id === formData.category);
      selectedCategoryName = selectedCategory ? selectedCategory.name : "";
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="relative">
          {/* Deal Image Placeholder */}
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
            {formData.images.length > 0 ? (
              <img 
                src={URL.createObjectURL(formData.images[0])} 
                alt={formData.title} 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Icons.Image />
            )}
          </div>
          
          {/* Deal Badge */}
          {formData.sale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
              {formData.sale}
            </div>
          )}
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
              -{discountPercentage}%
            </div>
          )}

          {/* Deal Type Badge */}
          <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
            {formData.dealType.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        {/* Deal Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {formData.title || "Deal Title"}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formData.description || "Deal description will appear here..."}
          </p>
          
          {/* Brand */}
          {formData.brand && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Brand: {formData.brand}
            </p>
          )}
          
          {/* Category */}
          {selectedCategoryName && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Category: {selectedCategoryName}
            </p>
          )}
          
          {/* Rating */}
          {parseFloat(formData.rating) > 0 && (
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < parseFloat(formData.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">({formData.rating})</span>
            </div>
          )}
          
          {/* Pricing */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${formData.dealPrice || "0.00"}
            </span>
            {formData.originalPrice && formData.dealPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${formData.originalPrice}
              </span>
            )}
          </div>
          
          {/* Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              formData.status === 'Available' ? 'bg-green-500' : 
              formData.status === 'Out of Stock' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formData.status}
            </span>
          </div>
          
          {/* Quantity */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Quantity: {formData.quantity || "1"}
          </p>
          
          {/* Location */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Location: {formData.location}
          </p>

          {/* Schedule */}
          {formData.startDate && formData.endDate && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>Start: {new Date(formData.startDate).toLocaleDateString()}</p>
              <p>End: {new Date(formData.endDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        setError('Deal title is required');
        setSubmitting(false);
        return;
      }
      
      if (!formData.originalPrice || parseFloat(formData.originalPrice) <= 0) {
        setError('Valid original price is required');
        setSubmitting(false);
        return;
      }
      
      if (!formData.dealPrice || parseFloat(formData.dealPrice) <= 0) {
        setError('Valid deal price is required');
        setSubmitting(false);
        return;
      }
      
      if (parseFloat(formData.dealPrice) >= parseFloat(formData.originalPrice)) {
        setError('Deal price must be less than original price');
        setSubmitting(false);
        return;
      }
      
      if (!formData.category && !formData.subcategory) {
        setError('Either main category or subcategory is required');
        setSubmitting(false);
        return;
      }
      
      if (!formData.startDate || !formData.endDate) {
        setError('Start and end dates are required');
        setSubmitting(false);
        return;
      }
      
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const now = new Date();
      
      if (startDate < now) {
        setError('Start date cannot be in the past');
        setSubmitting(false);
        return;
      }
      
      if (endDate <= startDate) {
        setError('End date must be after start date');
        setSubmitting(false);
        return;
      }
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'images' && key !== 'subcategory') {
          formDataToSend.append(key, formData[key as keyof typeof formData] as string);
        }
      });
      
      // Add the final category ID (either subcategory or main category)
      const finalCategoryId = formData.subcategory || formData.category;
      formDataToSend.append('category', finalCategoryId);
      
      // Add images
      if (formData.images.length > 0) {
        formData.images.forEach((image, index) => {
          formDataToSend.append('images', image);
        });
      }
      
      // Send to backend using the API utility
      const result = await api.post('/admin/deals/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const resultData = result.data;
      
      if (resultData.success) {
        toast.success('Deal created successfully!');
        router.push('/deals/list');
      } else {
        setError(resultData.message || 'Error creating deal');
      }
      
    } catch (error) {
      console.error('Error creating deal:', error);
      setError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Icons.ArrowLeft />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add New Deal
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            {showPreview ? <Icons.EyeOff /> : <Icons.Eye />}
            <span>{showPreview ? "Hide Preview" : "Show Preview"}</span>
          </button>
          
          <button
            type="submit"
            form="deal-form"
            disabled={submitting}
            className="flex items-center space-x-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            <Icons.Save />
            <span>{submitting ? "Creating..." : "Create Deal"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Form Sections</h3>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {sidebarItems.find(item => item.id === activeSection)?.label}
              </h3>
            </div>
            
            <form id="deal-form" onSubmit={handleSubmit}>
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {/* Basic Information Section */}
                {activeSection === 'basic' && (
                  <div className="space-y-6">
                    <InputGroup
                      type="text"
                      label="Deal Title"
                      name="title"
                      placeholder="Enter deal title"
                      value={formData.title}
                      handleChange={handleChange}
                      required
                    />

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="Enter deal description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                          Deal Type
                        </label>
                        <select
                          name="dealType"
                          value={formData.dealType}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="percentage">Percentage Discount</option>
                          <option value="fixed">Fixed Amount Discount</option>
                          <option value="buy_one_get_one">Buy One Get One</option>
                          <option value="free_shipping">Free Shipping</option>
                          <option value="flash_sale">Flash Sale</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                          Brand
                        </label>
                        <input
                          type="text"
                          name="brand"
                          placeholder="Enter brand name"
                          value={formData.brand}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <CategorySubcategorySelector
                      onCategoryChange={handleCategoryChange}
                      onSubcategoryChange={handleSubcategoryChange}
                      selectedCategory={formData.category}
                      selectedSubcategory={formData.subcategory}
                      required={true}
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <InputGroup
                        type="text"
                        label="Location"
                        name="location"
                        placeholder="Online, Store, Both"
                        value={formData.location}
                        handleChange={handleChange}
                      />

                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                          Status
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="Available">Available</option>
                          <option value="Out of Stock">Out of Stock</option>
                          <option value="Pre-order">Pre-order</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing & Discount Section */}
                {activeSection === 'pricing' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <InputGroup
                        type="number"
                        label="Original Price"
                        name="originalPrice"
                        placeholder="0.00"
                        value={formData.originalPrice}
                        handleChange={handleChange}
                        required
                      />

                      <InputGroup
                        type="number"
                        label="Deal Price"
                        name="dealPrice"
                        placeholder="0.00"
                        value={formData.dealPrice}
                        handleChange={handleChange}
                        required
                      />
                    </div>

                    <InputGroup
                      type="number"
                      label="Discount Value"
                      name="discountValue"
                      placeholder="0"
                      value={formData.discountValue}
                      handleChange={handleChange}
                    />

                    <InputGroup
                      type="number"
                      label="Minimum Order Value"
                      name="minOrderValue"
                      placeholder="0.00"
                      value={formData.minOrderValue}
                      handleChange={handleChange}
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <InputGroup
                        type="number"
                        label="Quantity"
                        name="quantity"
                        placeholder="1"
                        value={formData.quantity}
                        handleChange={handleChange}
                      />

                      <InputGroup
                        type="text"
                        label="Weight"
                        name="weight"
                        placeholder="e.g., 500g, 1kg"
                        value={formData.weight}
                        handleChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Rating
                      </label>
                      <input
                        type="number"
                        name="rating"
                        placeholder="0-5"
                        value={formData.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                )}

                {/* Schedule & Duration Section */}
                {activeSection === 'schedule' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                          Start Date
                        </label>
                        <input
                          type="datetime-local"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          required
                        />
                      </div>

                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                          End Date
                        </label>
                        <input
                          type="datetime-local"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          required
                        />
                      </div>
                    </div>

                    <InputGroup
                      type="number"
                      label="Maximum Uses"
                      name="maxUses"
                      placeholder="-1 for unlimited"
                      value={formData.maxUses}
                      handleChange={handleChange}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Set to -1 for unlimited uses
                    </p>
                  </div>
                )}

                {/* Targeting & Rules Section */}
                {activeSection === 'targeting' && (
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Applicable Products (IDs)
                      </label>
                      <textarea
                        name="applicableProducts"
                        rows={3}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="product_id1, product_id2, product_id3"
                        value={formData.applicableProducts}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Separate product IDs with commas
                      </p>
                    </div>

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Applicable Categories (IDs)
                      </label>
                      <textarea
                        name="applicableCategories"
                        rows={3}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="category_id1, category_id2, category_id3"
                        value={formData.applicableCategories}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Separate category IDs with commas
                      </p>
                    </div>

                    <InputGroup
                      type="text"
                      label="Tags"
                      name="tags"
                      placeholder="tag1, tag2, tag3"
                      value={formData.tags}
                      handleChange={handleChange}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Separate tags with commas
                    </p>
                  </div>
                )}

                {/* Content & Media Section */}
                {activeSection === 'content' && (
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Conditions
                      </label>
                      <textarea
                        name="conditions"
                        rows={4}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="Enter deal conditions"
                        value={formData.conditions}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Terms & Conditions
                      </label>
                      <textarea
                        name="terms"
                        rows={4}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="Enter terms and conditions"
                        value={formData.terms}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isActive"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-stroke-dark dark:bg-dark-2"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-black dark:text-white">
                          Active Deal
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isFeatured"
                          name="isFeatured"
                          checked={formData.isFeatured}
                          onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-stroke-dark dark:bg-dark-2"
                        />
                        <label htmlFor="isFeatured" className="text-sm font-medium text-black dark:text-white">
                          Featured Deal
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Images Section */}
                {activeSection === 'images' && (
                  <div className="space-y-6">
                    <ImageUpload
                      images={formData.images}
                      onChange={(images) => setFormData({ ...formData, images })}
                      multiple={true}
                      maxFiles={5}
                      maxSize={5}
                      accept="image/*"
                      label="Deal Images"
                    />
                  </div>
                )}

                {/* Submit Button Section */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Creating Deal...</span>
                      </>
                    ) : (
                      <>
                        <Icons.Save className="w-4 h-4" />
                        <span>Create Deal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Deal Preview</h3>
              <DealPreview />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 