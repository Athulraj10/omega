"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";

interface ShippingZone {
  _id?: string;
  name: string;
  description?: string;
  countries: string[];
  states: string[];
  postalCodes: string[];
  isActive: boolean;
}

interface ShippingMethod {
  _id?: string;
  name: string;
  description?: string;
  methodType: string;
  zone?: string;
  cost: number;
  freeShippingThreshold: number;
  weightRanges?: Array<{
    minWeight: number;
    maxWeight?: number;
    cost: number;
  }>;
  priceRanges?: Array<{
    minPrice: number;
    maxPrice?: number;
    cost: number;
  }>;
  estimatedDeliveryDays: {
    min: number;
    max: number;
  };
  isActive: boolean;
  isDefault: boolean;
  priority: number;
}

interface ShippingSettings {
  shippingZones: ShippingZone[];
  shippingMethods: ShippingMethod[];
  defaultShippingMethod: string;
  defaultShippingCost: number;
  enableFreeShipping: boolean;
  freeShippingMinimumOrder: number;
  freeShippingForAll: boolean;
  enableWeightBasedShipping: boolean;
  weightUnit: string;
  baseWeight: number;
  baseShippingCost: number;
  additionalWeightCost: number;
  enablePriceBasedShipping: boolean;
  priceBasedShippingRates: Array<{
    minOrderValue: number;
    maxOrderValue?: number;
    shippingCost: number;
  }>;
  defaultPackageWeight: number;
  defaultPackageDimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  defaultProcessingTime: number;
  processingTimeUnit: string;
  showEstimatedDelivery: boolean;
  deliveryTimeBuffer: number;
  enableInternationalShipping: boolean;
  internationalShippingMultiplier: number;
  restrictedCountries: string[];
  enableLocalPickup: boolean;
  localPickupLocations: Array<{
    name: string;
    address: string;
    phone?: string;
    hours?: string;
    cost: number;
  }>;
}

export default function ShippingSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddZone, setShowAddZone] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [editingZone, setEditingZone] = useState<ShippingZone | null>(null);
  const [editingMethod, setEditingMethod] = useState<ShippingMethod | null>(null);
  const [formData, setFormData] = useState<ShippingSettings>({
    shippingZones: [],
    shippingMethods: [],
    defaultShippingMethod: "free",
    defaultShippingCost: 0,
    enableFreeShipping: true,
    freeShippingMinimumOrder: 0,
    freeShippingForAll: false,
    enableWeightBasedShipping: false,
    weightUnit: "kg",
    baseWeight: 1,
    baseShippingCost: 0,
    additionalWeightCost: 0,
    enablePriceBasedShipping: false,
    priceBasedShippingRates: [],
    defaultPackageWeight: 0.5,
    defaultPackageDimensions: {
      length: 20,
      width: 15,
      height: 10,
      unit: "cm",
    },
    defaultProcessingTime: 1,
    processingTimeUnit: "days",
    showEstimatedDelivery: true,
    deliveryTimeBuffer: 1,
    enableInternationalShipping: true,
    internationalShippingMultiplier: 1.5,
    restrictedCountries: [],
    enableLocalPickup: false,
    localPickupLocations: [],
  });

  const [zoneForm, setZoneForm] = useState<ShippingZone>({
    name: "",
    description: "",
    countries: [],
    states: [],
    postalCodes: [],
    isActive: true,
  });

  const [methodForm, setMethodForm] = useState<ShippingMethod>({
    name: "",
    description: "",
    methodType: "flat_rate",
    cost: 0,
    freeShippingThreshold: 0,
    estimatedDeliveryDays: {
      min: 3,
      max: 7,
    },
    isActive: true,
    isDefault: false,
    priority: 0,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/settings/shipping");
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        const settings = data.data || data;
        setFormData((prev) => ({
          ...prev,
          ...settings,
        }));
      } else {
        toast.error(data.meta?.message || "Failed to fetch shipping settings");
      }
    } catch (error: any) {
      console.error("Error fetching shipping settings:", error);
      toast.error(error.response?.data?.message || "Failed to fetch shipping settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleNestedChange = (path: string, value: any) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setZoneForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setMethodForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await api.put("/admin/settings/shipping", formData);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        toast.success("Shipping settings updated successfully");
      } else {
        toast.error(data.meta?.message || "Failed to update shipping settings");
      }
    } catch (error: any) {
      console.error("Error updating shipping settings:", error);
      toast.error(error.response?.data?.message || "Failed to update shipping settings");
    } finally {
      setSaving(false);
    }
  };

  const handleAddZone = async () => {
    try {
      setSaving(true);
      const response = await api.post("/admin/settings/shipping/zones", zoneForm);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        toast.success("Shipping zone added successfully");
        setShowAddZone(false);
        setZoneForm({
          name: "",
          description: "",
          countries: [],
          states: [],
          postalCodes: [],
          isActive: true,
        });
        await fetchSettings();
      } else {
        toast.error(data.meta?.message || "Failed to add shipping zone");
      }
    } catch (error: any) {
      console.error("Error adding shipping zone:", error);
      toast.error(error.response?.data?.message || "Failed to add shipping zone");
    } finally {
      setSaving(false);
    }
  };

  const handleAddMethod = async () => {
    try {
      setSaving(true);
      const response = await api.post("/admin/settings/shipping/methods", methodForm);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        toast.success("Shipping method added successfully");
        setShowAddMethod(false);
        setMethodForm({
          name: "",
          description: "",
          methodType: "flat_rate",
          cost: 0,
          freeShippingThreshold: 0,
          estimatedDeliveryDays: {
            min: 3,
            max: 7,
          },
          isActive: true,
          isDefault: false,
          priority: 0,
        });
        await fetchSettings();
      } else {
        toast.error(data.meta?.message || "Failed to add shipping method");
      }
    } catch (error: any) {
      console.error("Error adding shipping method:", error);
      toast.error(error.response?.data?.message || "Failed to add shipping method");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteZone = async (zoneId: string) => {
    if (!confirm("Are you sure you want to delete this shipping zone?")) return;

    try {
      const response = await api.delete(`/admin/settings/shipping/zones/${zoneId}`);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        toast.success("Shipping zone deleted successfully");
        await fetchSettings();
      } else {
        toast.error(data.meta?.message || "Failed to delete shipping zone");
      }
    } catch (error: any) {
      console.error("Error deleting shipping zone:", error);
      toast.error(error.response?.data?.message || "Failed to delete shipping zone");
    }
  };

  const handleDeleteMethod = async (methodId: string) => {
    if (!confirm("Are you sure you want to delete this shipping method?")) return;

    try {
      const response = await api.delete(`/admin/settings/shipping/methods/${methodId}`);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        toast.success("Shipping method deleted successfully");
        await fetchSettings();
      } else {
        toast.error(data.meta?.message || "Failed to delete shipping method");
      }
    } catch (error: any) {
      console.error("Error deleting shipping method:", error);
      toast.error(error.response?.data?.message || "Failed to delete shipping method");
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
      <Breadcrumb pageName="Shipping Settings" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shipping Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Configure shipping zones, methods, and rates</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => {
              setShowAddZone(true);
              setEditingZone(null);
              setZoneForm({
                name: "",
                description: "",
                countries: [],
                states: [],
                postalCodes: [],
                isActive: true,
              });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Zone
          </button>
          <button
            onClick={() => {
              setShowAddMethod(true);
              setEditingMethod(null);
              setMethodForm({
                name: "",
                description: "",
                methodType: "flat_rate",
                cost: 0,
                freeShippingThreshold: 0,
                estimatedDeliveryDays: {
                  min: 3,
                  max: 7,
                },
                isActive: true,
                isDefault: false,
                priority: 0,
              });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Method
          </button>
        </div>

        {/* Add/Edit Zone Form */}
        {showAddZone && (
          <div className="mb-6 rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingZone ? "Edit Shipping Zone" : "Add New Shipping Zone"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                type="text"
                label="Zone Name"
                name="name"
                value={zoneForm.name}
                handleChange={handleZoneChange}
                required
              />
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Description</label>
                <textarea
                  name="description"
                  value={zoneForm.description || ""}
                  onChange={handleZoneChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  rows={3}
                />
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Countries (comma-separated)</label>
                <input
                  type="text"
                  name="countries"
                  value={Array.isArray(zoneForm.countries) ? zoneForm.countries.join(", ") : ""}
                  onChange={(e) => {
                    setZoneForm((prev) => ({
                      ...prev,
                      countries: e.target.value.split(",").map((c) => c.trim()).filter((c) => c),
                    }));
                  }}
                  placeholder="US, CA, MX"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={zoneForm.isActive}
                    onChange={handleZoneChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={handleAddZone}
                disabled={saving}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
              >
                {saving ? "Saving..." : "Add Zone"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddZone(false);
                  setEditingZone(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Add/Edit Method Form */}
        {showAddMethod && (
          <div className="mb-6 rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingMethod ? "Edit Shipping Method" : "Add New Shipping Method"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                type="text"
                label="Method Name"
                name="name"
                value={methodForm.name}
                handleChange={handleMethodChange}
                required
              />
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Method Type</label>
                <select
                  name="methodType"
                  value={methodForm.methodType}
                  onChange={handleMethodChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="free">Free Shipping</option>
                  <option value="flat_rate">Flat Rate</option>
                  <option value="weight_based">Weight Based</option>
                  <option value="price_based">Price Based</option>
                  <option value="local_pickup">Local Pickup</option>
                  <option value="express">Express</option>
                </select>
              </div>
              <InputGroup
                type="number"
                label="Cost"
                name="cost"
                value={methodForm.cost.toString()}
                handleChange={handleMethodChange}
                min="0"
                step="0.01"
              />
              <InputGroup
                type="number"
                label="Free Shipping Threshold"
                name="freeShippingThreshold"
                value={methodForm.freeShippingThreshold.toString()}
                handleChange={handleMethodChange}
                min="0"
                step="0.01"
              />
              <InputGroup
                type="number"
                label="Min Delivery Days"
                name="estimatedDeliveryDays.min"
                value={methodForm.estimatedDeliveryDays.min.toString()}
                handleChange={(e) => {
                  setMethodForm((prev) => ({
                    ...prev,
                    estimatedDeliveryDays: {
                      ...prev.estimatedDeliveryDays,
                      min: parseFloat(e.target.value) || 0,
                    },
                  }));
                }}
                min="0"
              />
              <InputGroup
                type="number"
                label="Max Delivery Days"
                name="estimatedDeliveryDays.max"
                value={methodForm.estimatedDeliveryDays.max.toString()}
                handleChange={(e) => {
                  setMethodForm((prev) => ({
                    ...prev,
                    estimatedDeliveryDays: {
                      ...prev.estimatedDeliveryDays,
                      max: parseFloat(e.target.value) || 0,
                    },
                  }));
                }}
                min="0"
              />
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={methodForm.isActive}
                    onChange={handleMethodChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Active</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={methodForm.isDefault}
                    onChange={handleMethodChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Default Method</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={handleAddMethod}
                disabled={saving}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
              >
                {saving ? "Saving..." : "Add Method"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddMethod(false);
                  setEditingMethod(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Free Shipping Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Free Shipping Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="enableFreeShipping"
                    checked={formData.enableFreeShipping}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Enable Free Shipping</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="freeShippingForAll"
                    checked={formData.freeShippingForAll}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Free Shipping for All Orders</span>
                </label>
              </div>
              {formData.enableFreeShipping && !formData.freeShippingForAll && (
                <InputGroup
                  type="number"
                  label="Minimum Order Value for Free Shipping"
                  name="freeShippingMinimumOrder"
                  value={formData.freeShippingMinimumOrder.toString()}
                  handleChange={handleChange}
                  min="0"
                  step="0.01"
                />
              )}
            </div>
          </div>

          {/* Weight-Based Shipping */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weight-Based Shipping</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="enableWeightBasedShipping"
                    checked={formData.enableWeightBasedShipping}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Enable Weight-Based Shipping</span>
                </label>
              </div>
              {formData.enableWeightBasedShipping && (
                <>
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Weight Unit</label>
                    <select
                      name="weightUnit"
                      value={formData.weightUnit}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="kg">Kilograms (kg)</option>
                      <option value="g">Grams (g)</option>
                      <option value="lb">Pounds (lb)</option>
                      <option value="oz">Ounces (oz)</option>
                    </select>
                  </div>
                  <InputGroup
                    type="number"
                    label="Base Weight"
                    name="baseWeight"
                    value={formData.baseWeight.toString()}
                    handleChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                  <InputGroup
                    type="number"
                    label="Base Shipping Cost"
                    name="baseShippingCost"
                    value={formData.baseShippingCost.toString()}
                    handleChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                  <InputGroup
                    type="number"
                    label="Additional Weight Cost"
                    name="additionalWeightCost"
                    value={formData.additionalWeightCost.toString()}
                    handleChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </>
              )}
            </div>
          </div>

          {/* Default Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Default Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Default Shipping Method</label>
                <select
                  name="defaultShippingMethod"
                  value={formData.defaultShippingMethod}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="free">Free</option>
                  <option value="standard">Standard</option>
                  <option value="express">Express</option>
                </select>
              </div>
              <InputGroup
                type="number"
                label="Default Shipping Cost"
                name="defaultShippingCost"
                value={formData.defaultShippingCost.toString()}
                handleChange={handleChange}
                min="0"
                step="0.01"
              />
              <InputGroup
                type="number"
                label="Default Processing Time"
                name="defaultProcessingTime"
                value={formData.defaultProcessingTime.toString()}
                handleChange={handleChange}
                min="0"
              />
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Processing Time Unit</label>
                <select
                  name="processingTimeUnit"
                  value={formData.processingTimeUnit}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Shipping Zones List */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Zones</h2>
            {formData.shippingZones && formData.shippingZones.length > 0 ? (
              <div className="space-y-4">
                {formData.shippingZones.map((zone, index) => (
                  <div
                    key={zone._id || index}
                    className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-stroke dark:border-stroke-dark"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{zone.name}</h3>
                        {zone.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{zone.description}</p>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Countries: {zone.countries.length > 0 ? zone.countries.join(", ") : "All"}
                        </p>
                        <span
                          className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                            zone.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {zone.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => zone._id && handleDeleteZone(zone._id)}
                          className="px-3 py-1 text-red-600 hover:text-red-800 dark:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-4">No shipping zones configured</p>
            )}
          </div>

          {/* Shipping Methods List */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Methods</h2>
            {formData.shippingMethods && formData.shippingMethods.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stroke dark:border-stroke-dark">
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Name</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Cost</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Delivery Days</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.shippingMethods.map((method, index) => (
                      <tr key={method._id || index} className="border-b border-stroke dark:border-stroke-dark">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">
                          {method.name}
                          {method.isDefault && (
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs">
                              Default
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400 capitalize">
                          {method.methodType.replace("_", " ")}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">${method.cost.toFixed(2)}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {method.estimatedDeliveryDays.min}-{method.estimatedDeliveryDays.max} days
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              method.isActive
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {method.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => method._id && handleDeleteMethod(method._id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-4">No shipping methods configured</p>
            )}
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



























