"use client";

import React, { useState, useEffect, useRef } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import { Checkbox } from "@/components/FormElements/checkbox";
import { useAppDispatch, useAppSelector } from "@/components/redux/hooks";
import { addProduct, editProduct, fetchProducts } from "@/components/redux/action/products/productAction";
import { getSellersRequest } from "@/components/redux/action/seller";
import { fetchActiveCategories } from "@/components/redux/action/categories/categoryAction";
import { useRouter, useSearchParams } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import CategorySubcategorySelector from "@/components/CategorySubcategorySelector";
// Icons for sidebar navigation
const Icons = {
  Eye: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  EyeOff: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>,
  Save: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Tag: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
  Image: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Package: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  TrendingUp: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  FileText: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  BarChart3: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Globe: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" /></svg>,
  ShoppingCart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" /></svg>,
};

export default function AddProduct() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, loading } = useAppSelector((state) => state.products);
  const { sellers } = useAppSelector((state) => state.sellers);
  const { activeCategories } = useAppSelector((state) => state.categories);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stock: "",
    minimumOrder: "1",
    status: "1",
    sku: "",
    discountPrice: "",
    seller: "",
    sale: "",
    location: "Online",
    brand: "",
    weight: "",
    rating: "0",
    availability: "Available",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    features: "",
    tags: "",
    isOnSale: false,
    saleStartDate: "",
    saleEndDate: "",
    discountPercentage: "",
    lowStockThreshold: "5",
    trackInventory: true,
    images: [] as File[],
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'basic', label: 'Basic Information', icon: Icons.Package },
    { id: 'details', label: 'Product Details', icon: Icons.Tag },
    { id: 'seo', label: 'SEO & Metadata', icon: Icons.Globe },
    { id: 'pricing', label: 'Sale & Pricing', icon: Icons.TrendingUp },
    { id: 'features', label: 'Features & Tags', icon: Icons.FileText },
    { id: 'inventory', label: 'Inventory Settings', icon: Icons.BarChart3 },
    { id: 'images', label: 'Images & Media', icon: Icons.Image },
  ];

  // Fetch sellers and categories on component mount
  useEffect(() => {
    dispatch(getSellersRequest());
    dispatch(fetchActiveCategories());
  }, [dispatch]);

  // Debug form data changes
  useEffect(() => {
    console.log('📝 Form data updated:', formData);
  }, [formData]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setEditId(id);
      if (products.length === 0) {
        dispatch(fetchProducts());
      } else {
        const prod = products.find((p: any) => p._id === id);
        if (prod) {
          setFormData({
            name: prod.name || "",
            description: prod.description || "",
            price: prod.price?.toString() || "",
            category: prod.category || "",
            subcategory: prod.subcategory || "",
            stock: prod.stock?.toString() || "",
            minimumOrder: prod.minimumOrder?.toString() || "1",
            status: prod.status || "1",
            sku: prod.sku || "",
            discountPrice: prod.discountPrice?.toString() || "",
            seller: prod.seller || "",
            sale: prod.sale || "",
            location: prod.location || "Online",
            brand: prod.brand || "",
            weight: prod.weight || "",
            rating: prod.rating?.toString() || "0",
            availability: prod.availability || "Available",
            metaTitle: prod.metaTitle || "",
            metaDescription: prod.metaDescription || "",
            keywords: prod.keywords?.join(", ") || "",
            features: prod.features?.join(", ") || "",
            tags: prod.tags?.join(", ") || "",
            isOnSale: prod.isOnSale || false,
            saleStartDate: prod.saleStartDate ? new Date(prod.saleStartDate).toISOString().split('T')[0] : "",
            saleEndDate: prod.saleEndDate ? new Date(prod.saleEndDate).toISOString().split('T')[0] : "",
            discountPercentage: prod.discountPercentage?.toString() || "",
            lowStockThreshold: prod.lowStockThreshold?.toString() || "5",
            trackInventory: prod.trackInventory !== false,
            images: [], // images are not prefilled for edit
          });
        }
      }
    }
  }, [searchParams, products, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    console.log('🔄 Parent: Category changed to:', categoryId);
    setFormData(prev => ({
      ...prev,
      category: categoryId,
      subcategory: "", // Reset subcategory when category changes
    }));
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    console.log('🔄 Parent: Subcategory changed to:', subcategoryId);
    setFormData(prev => ({
      ...prev,
      subcategory: subcategoryId,
    }));
  };

  // Product Preview Component
  const ProductPreview = () => {
    const discountPercentage = formData.discountPrice && formData.price 
      ? Math.round(((parseFloat(formData.price) - parseFloat(formData.discountPrice)) / parseFloat(formData.price)) * 100)
      : 0;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="relative">
          {/* Product Image Placeholder */}
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
            {formData.images.length > 0 ? (
              <img 
                src={URL.createObjectURL(formData.images[0])} 
                alt={formData.name} 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Icons.Image />
            )}
          </div>
          
          {/* Sale Badge */}
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
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {formData.name || "Product Name"}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formData.description || "Product description will appear here..."}
          </p>
          
          {/* Brand */}
          {formData.brand && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Brand: {formData.brand}
            </p>
          )}
          
          {/* Weight */}
          {formData.weight && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Weight: {formData.weight}
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
              ${formData.discountPrice || formData.price || "0.00"}
            </span>
            {formData.discountPrice && formData.price && (
              <span className="text-sm text-gray-500 line-through">
                ${formData.price}
              </span>
            )}
          </div>
          
          {/* Availability */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              formData.availability === 'Available' ? 'bg-green-500' : 
              formData.availability === 'Out of Stock' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formData.availability}
            </span>
          </div>
          
          {/* Stock Info */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Stock: {formData.stock || "0"} units
          </p>
          
          {/* Minimum Order */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Min. Order: {formData.minimumOrder || "1"} unit
          </p>
          
          {/* Location */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Location: {formData.location}
          </p>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (submitting) {
      console.log('🚫 Form submission already in progress');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!formData.name.trim()) {
        setError('Product name is required');
        setSubmitting(false);
        return;
      }
      
      if (!formData.category) {
        setError('Category is required');
        setSubmitting(false);
        return;
      }
      
      if (!formData.price || parseFloat(formData.price) <= 0) {
        setError('Valid price is required');
        setSubmitting(false);
        return;
      }
      
      if (!formData.stock || parseInt(formData.stock) < 0) {
        setError('Valid stock quantity is required');
        setSubmitting(false);
        return;
      }
      
      if (!formData.minimumOrder || parseInt(formData.minimumOrder) < 1) {
        setError('Minimum order quantity must be at least 1');
        setSubmitting(false);
        return;
      }
      
      if (parseInt(formData.minimumOrder) > parseInt(formData.stock)) {
        setError('Minimum order quantity cannot be greater than available stock');
        setSubmitting(false);
        return;
      }
      
      // Validate discount price
      if (formData.discountPrice && parseFloat(formData.discountPrice) > 0) {
        const regularPrice = parseFloat(formData.price);
        const discountPrice = parseFloat(formData.discountPrice);
        
        if (discountPrice >= regularPrice) {
          setError('Discount price must be less than regular price');
          setSubmitting(false);
          return;
        }
        
        if (discountPrice <= 0) {
          setError('Discount price must be greater than 0');
          setSubmitting(false);
          return;
        }
      }
      
      if (!formData.seller) {
        setError('Seller is required');
        setSubmitting(false);
        return;
      }
      
      // Generate SKU if not provided
      let sku = formData.sku;
      if (!sku.trim()) {
        sku = `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      }
      
      console.log('📝 Form data before submission:', formData);
      console.log('📝 Required fields check:');
      console.log('  - name:', !!formData.name.trim());
      console.log('  - category:', !!formData.category);
      console.log('  - price:', !!formData.price);
      console.log('  - stock:', !!formData.stock);
      console.log('  - seller:', !!formData.seller);
      console.log('  - subcategory:', formData.subcategory);
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all required fields
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('minimumOrder', formData.minimumOrder);
      formDataToSend.append('sku', sku);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('seller', formData.seller);
      
      // Add product details
      formDataToSend.append('sale', formData.sale);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('weight', formData.weight);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('availability', formData.availability);
      
      // Add SEO fields
      formDataToSend.append('metaTitle', formData.metaTitle);
      formDataToSend.append('metaDescription', formData.metaDescription);
      formDataToSend.append('keywords', formData.keywords);
      
      // Add features and tags
      formDataToSend.append('features', formData.features);
      formDataToSend.append('tags', formData.tags);
      
      // Add sale settings
      formDataToSend.append('isOnSale', formData.isOnSale.toString());
      formDataToSend.append('saleStartDate', formData.saleStartDate);
      formDataToSend.append('saleEndDate', formData.saleEndDate);
      formDataToSend.append('discountPercentage', formData.discountPercentage);
      
      // Add inventory settings
      formDataToSend.append('lowStockThreshold', formData.lowStockThreshold);
      formDataToSend.append('trackInventory', formData.trackInventory.toString());
      
      // Add optional fields
      if (formData.subcategory) {
        console.log('📝 Appending subcategory:', formData.subcategory);
        formDataToSend.append('subcategory', formData.subcategory);
      }
      
      if (formData.discountPrice && parseFloat(formData.discountPrice) > 0) {
        formDataToSend.append('discountPrice', formData.discountPrice);
      }
      
      // Add images
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file: File) => {
          formDataToSend.append('images', file);
        });
      }
      
      // Debug FormData contents
      console.log('📤 FormData entries:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`  ${key}: ${value}`);
      }
      
      // Debug specific fields
      console.log('📝 Form data subcategory:', formData.subcategory);
      console.log('📝 Form data subcategory type:', typeof formData.subcategory);
      
      // Submit the form
      if (editId) {
        await dispatch(editProduct({ 
          id: editId, 
          data: formDataToSend,
          callback: () => {
            alert('Product updated successfully!');
            router.push('/products/list');
          },
          errorCallback: () => {
            setError('Failed to update product');
            setSubmitting(false);
          }
        }));
      } else {
        await dispatch(addProduct({ 
          data: formDataToSend,
          callback: () => {
            alert('Product added successfully!');
            router.push('/products/list');
          },
          errorCallback: () => {
            setError('Failed to add product');
            setSubmitting(false);
          }
        }));
      }
      
    } catch (error: any) {
      console.error('❌ Error in handleSubmit:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      setError(errorMessage);
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
            {editId ? "Edit Product" : "Add New Product"}
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
            form="product-form"
            disabled={submitting}
            className="flex items-center space-x-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            <Icons.Save />
            <span>{submitting ? "Saving..." : editId ? "Update Product" : "Save Product"}</span>
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
            
            <form id="product-form" onSubmit={handleSubmit}>
              <div className="p-6">
                                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {/* Basic Information Section */}
                {activeSection === 'basic' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <InputGroup
                        type="text"
                        label="Product Name"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        handleChange={handleChange}
                        required
                      />

                      <InputGroup
                        type="text"
                        label="SKU"
                        name="sku"
                        placeholder="Auto-generated"
                        value={formData.sku}
                        handleChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <InputGroup
                        type="number"
                        label="Price"
                        name="price"
                        placeholder="0.00"
                        value={formData.price}
                        handleChange={handleChange}
                        required
                      />

                      <InputGroup
                        type="number"
                        label="Stock Quantity"
                        name="stock"
                        placeholder="0"
                        value={formData.stock}
                        handleChange={handleChange}
                        required
                      />
                    </div>

                    <InputGroup
                      type="number"
                      label="Minimum Order Quantity"
                      name="minimumOrder"
                      placeholder="1"
                      value={formData.minimumOrder}
                      handleChange={handleChange}
                      required
                    />

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Product Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Select Seller
                      </label>
                      <select
                        name="seller"
                        value={formData.seller}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        required
                      >
                        <option value="">Select a seller</option>
                        {sellers.map((seller: any) => (
                          <option key={seller._id} value={seller._id}>
                            {seller.companyName || seller.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <CategorySubcategorySelector
                      onCategoryChange={handleCategoryChange}
                      onSubcategoryChange={handleSubcategoryChange}
                      selectedCategory={formData.category}
                      selectedSubcategory={formData.subcategory}
                    />
                  </div>
                )}

                {/* Product Details Section */}
                {activeSection === 'details' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <InputGroup
                        type="text"
                        label="Sale Badge"
                        name="sale"
                        placeholder="Sale, New, Hot, etc."
                        value={formData.sale}
                        handleChange={handleChange}
                      />

                      <InputGroup
                        type="text"
                        label="Brand"
                        name="brand"
                        placeholder="Enter brand name"
                        value={formData.brand}
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

                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                          Location
                        </label>
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="Online">Online</option>
                          <option value="Store">Store</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                          Availability
                        </label>
                        <select
                          name="availability"
                          value={formData.availability}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="Available">Available</option>
                          <option value="Out of Stock">Out of Stock</option>
                          <option value="Pre-order">Pre-order</option>
                        </select>
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
                  </div>
                )}

                {/* SEO Section */}
                {activeSection === 'seo' && (
                  <div className="space-y-6">
                    <InputGroup
                      type="text"
                      label="Meta Title"
                      name="metaTitle"
                      placeholder="SEO title for search engines"
                      value={formData.metaTitle}
                      handleChange={handleChange}
                    />

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Meta Description
                      </label>
                      <textarea
                        name="metaDescription"
                        rows={3}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="SEO description for search engines"
                        value={formData.metaDescription}
                        onChange={handleChange}
                      />
                    </div>

                    <InputGroup
                      type="text"
                      label="Keywords"
                      name="keywords"
                      placeholder="keyword1, keyword2, keyword3"
                      value={formData.keywords}
                      handleChange={handleChange}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Separate keywords with commas
                    </p>
                  </div>
                )}

                {/* Sale & Pricing Section */}
                {activeSection === 'pricing' && (
                  <div className="space-y-6">
                    <InputGroup
                      type="number"
                      label="Discount Price"
                      name="discountPrice"
                      placeholder="0.00"
                      value={formData.discountPrice}
                      handleChange={handleChange}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Must be less than regular price (optional)
                    </p>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isOnSale"
                        name="isOnSale"
                        checked={formData.isOnSale}
                        onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-stroke-dark dark:bg-dark-2"
                      />
                      <label htmlFor="isOnSale" className="text-sm font-medium text-black dark:text-white">
                        Product is on sale
                      </label>
                    </div>

                    {formData.isOnSale && (
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label className="mb-2.5 block text-black dark:text-white">
                            Sale Start Date
                          </label>
                          <input
                            type="date"
                            name="saleStartDate"
                            value={formData.saleStartDate}
                            onChange={handleChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="mb-2.5 block text-black dark:text-white">
                            Sale End Date
                          </label>
                          <input
                            type="date"
                            name="saleEndDate"
                            value={formData.saleEndDate}
                            onChange={handleChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="mb-2.5 block text-black dark:text-white">
                            Discount Percentage
                          </label>
                          <input
                            type="number"
                            name="discountPercentage"
                            placeholder="0-100"
                            value={formData.discountPercentage}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Features & Tags Section */}
                {activeSection === 'features' && (
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Features
                      </label>
                      <textarea
                        name="features"
                        rows={3}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="Feature 1, Feature 2, Feature 3"
                        value={formData.features}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Separate features with commas
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

                {/* Inventory Section */}
                {activeSection === 'inventory' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                          Low Stock Threshold
                        </label>
                        <input
                          type="number"
                          name="lowStockThreshold"
                          placeholder="5"
                          value={formData.lowStockThreshold}
                          onChange={handleChange}
                          min="0"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="trackInventory"
                          name="trackInventory"
                          checked={formData.trackInventory}
                          onChange={(e) => setFormData({ ...formData, trackInventory: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-stroke-dark dark:bg-dark-2"
                        />
                        <label htmlFor="trackInventory" className="text-sm font-medium text-black dark:text-white">
                          Track inventory
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
                      label="Product Images"
                    />
                  </div>
                )}

                {/* Form Submit Button */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center space-x-2 px-6 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icons.Save />
                      <span>{submitting ? "Saving..." : editId ? "Update Product" : "Save Product"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Preview</h3>
              <ProductPreview />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 