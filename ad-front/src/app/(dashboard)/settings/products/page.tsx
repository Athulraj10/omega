"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";

interface ProductSettings {
  // Inventory Defaults
  defaultLowStockThreshold: number;
  defaultTrackInventory: boolean;
  defaultMinimumOrder: number;
  defaultStock: number;

  // SKU Settings
  skuPrefix: string;
  autoGenerateSku: boolean;
  skuFormat: string;

  // Image Settings
  maxImagesPerProduct: number;
  maxImageSize: number;
  allowedImageFormats: string[];

  // Product Defaults
  defaultStatus: string;
  defaultAvailability: string;
  defaultLocation: string;

  // SEO Defaults
  autoGenerateMetaTitle: boolean;
  metaTitleTemplate: string;
  autoGenerateMetaDescription: boolean;

  // Review Settings
  allowReviews: boolean;
  requireApprovalForReviews: boolean;
  minimumRating: number;

  // Discount Settings
  allowDiscountPercentage: boolean;
  maxDiscountPercentage: number;
  allowSaleDates: boolean;

  // Category Settings
  requireCategory: boolean;
  allowMultipleCategories: boolean;

  // Brand Settings
  requireBrand: boolean;
  allowCustomBrand: boolean;

  // Weight and Dimensions
  requireWeight: boolean;
  weightUnit: string;

  // Product Features
  maxFeatures: number;
  maxTags: number;

  // Notification Settings
  notifyOnLowStock: boolean;
  notifyOnOutOfStock: boolean;
  lowStockEmailRecipients: string[];

  // Audit Settings
  trackInventoryChanges: boolean;
  trackPriceChanges: boolean;
}

export default function ProductSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProductSettings>({
    defaultLowStockThreshold: 5,
    defaultTrackInventory: true,
    defaultMinimumOrder: 1,
    defaultStock: 0,
    skuPrefix: "",
    autoGenerateSku: false,
    skuFormat: "sequential",
    maxImagesPerProduct: 10,
    maxImageSize: 5242880,
    allowedImageFormats: ["jpg", "jpeg", "png", "gif", "webp"],
    defaultStatus: "1",
    defaultAvailability: "Available",
    defaultLocation: "Online",
    autoGenerateMetaTitle: false,
    metaTitleTemplate: "{productName} - {categoryName}",
    autoGenerateMetaDescription: false,
    allowReviews: true,
    requireApprovalForReviews: false,
    minimumRating: 1,
    allowDiscountPercentage: true,
    maxDiscountPercentage: 100,
    allowSaleDates: true,
    requireCategory: true,
    allowMultipleCategories: false,
    requireBrand: false,
    allowCustomBrand: true,
    requireWeight: false,
    weightUnit: "kg",
    maxFeatures: 10,
    maxTags: 10,
    notifyOnLowStock: true,
    notifyOnOutOfStock: true,
    lowStockEmailRecipients: [],
    trackInventoryChanges: true,
    trackPriceChanges: false,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/settings/products");
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        const settings = data.data || data;
        setFormData((prev) => ({
          ...prev,
          ...settings,
        }));
      } else {
        toast.error(data.meta?.message || "Failed to fetch product settings");
      }
    } catch (error: any) {
      console.error("Error fetching product settings:", error);
      toast.error(error.response?.data?.message || "Failed to fetch product settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleArrayChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()).filter((item) => item),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await api.put("/admin/settings/products", formData);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        toast.success("Product settings updated successfully");
      } else {
        toast.error(data.meta?.message || "Failed to update product settings");
      }
    } catch (error: any) {
      console.error("Error updating product settings:", error);
      toast.error(error.response?.data?.message || "Failed to update product settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning>
      <Breadcrumb pageName="Product Settings" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Configure default product settings and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Inventory Defaults */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inventory Defaults</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                type="number"
                label="Default Low Stock Threshold"
                name="defaultLowStockThreshold"
                value={formData.defaultLowStockThreshold.toString()}
                handleChange={handleChange}
                min="0"
              />
              <InputGroup
                type="number"
                label="Default Minimum Order"
                name="defaultMinimumOrder"
                value={formData.defaultMinimumOrder.toString()}
                handleChange={handleChange}
                min="1"
              />
              <InputGroup
                type="number"
                label="Default Stock"
                name="defaultStock"
                value={formData.defaultStock.toString()}
                handleChange={handleChange}
                min="0"
              />
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="defaultTrackInventory"
                    checked={formData.defaultTrackInventory}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Default Track Inventory</span>
                </label>
              </div>
            </div>
          </div>

          {/* SKU Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SKU Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                type="text"
                label="SKU Prefix"
                name="skuPrefix"
                value={formData.skuPrefix}
                handleChange={handleChange}
                placeholder="e.g., PROD"
              />
              <div>
                <label className="mb-2.5 block text-black dark:text-white">SKU Format</label>
                <select
                  name="skuFormat"
                  value={formData.skuFormat}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="sequential">Sequential</option>
                  <option value="random">Random</option>
                  <option value="category-prefix">Category Prefix</option>
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="autoGenerateSku"
                    checked={formData.autoGenerateSku}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Auto Generate SKU</span>
                </label>
              </div>
            </div>
          </div>

          {/* Image Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Image Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                type="number"
                label="Max Images Per Product"
                name="maxImagesPerProduct"
                value={formData.maxImagesPerProduct.toString()}
                handleChange={handleChange}
                min="1"
                max="20"
              />
              <InputGroup
                type="number"
                label="Max Image Size (bytes)"
                name="maxImageSize"
                value={formData.maxImageSize.toString()}
                handleChange={handleChange}
                min="0"
              />
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Allowed Image Formats</label>
                <input
                  type="text"
                  name="allowedImageFormats"
                  value={formData.allowedImageFormats.join(", ")}
                  onChange={(e) => handleArrayChange("allowedImageFormats", e.target.value)}
                  placeholder="jpg, jpeg, png, gif, webp"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Comma-separated list</p>
              </div>
            </div>
          </div>

          {/* Product Defaults */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Defaults</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Default Status</label>
                <select
                  name="defaultStatus"
                  value={formData.defaultStatus}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Default Availability</label>
                <select
                  name="defaultAvailability"
                  value={formData.defaultAvailability}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Pre-order">Pre-order</option>
                </select>
              </div>
              <InputGroup
                type="text"
                label="Default Location"
                name="defaultLocation"
                value={formData.defaultLocation}
                handleChange={handleChange}
              />
            </div>
          </div>

          {/* Review Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Review Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="allowReviews"
                    checked={formData.allowReviews}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Allow Reviews</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="requireApprovalForReviews"
                    checked={formData.requireApprovalForReviews}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Require Approval for Reviews</span>
                </label>
              </div>
              <InputGroup
                type="number"
                label="Minimum Rating"
                name="minimumRating"
                value={formData.minimumRating.toString()}
                handleChange={handleChange}
                min="1"
                max="5"
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="notifyOnLowStock"
                    checked={formData.notifyOnLowStock}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Notify on Low Stock</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="notifyOnOutOfStock"
                    checked={formData.notifyOnOutOfStock}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Notify on Out of Stock</span>
                </label>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Low Stock Email Recipients</label>
                <input
                  type="text"
                  name="lowStockEmailRecipients"
                  value={formData.lowStockEmailRecipients.join(", ")}
                  onChange={(e) => handleArrayChange("lowStockEmailRecipients", e.target.value)}
                  placeholder="email1@example.com, email2@example.com"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Comma-separated email addresses</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}





