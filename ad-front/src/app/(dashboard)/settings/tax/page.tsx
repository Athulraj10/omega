"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";

interface TaxRate {
  _id?: string;
  name: string;
  rate: number;
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  taxType: string;
  isActive: boolean;
  priority: number;
}

interface TaxSettings {
  taxCalculationMethod: string;
  defaultTaxRate: number;
  taxRates: TaxRate[];
  taxClasses: Array<{
    name: string;
    description?: string;
    taxRateIds: string[];
  }>;
  taxExemptUserGroups: string[];
  taxOnShipping: boolean;
  taxOnShippingRate: number;
  displayPricesWithTax: boolean;
  showTaxInCart: boolean;
  showTaxOnCheckout: boolean;
  showTaxInEmails: boolean;
  euVatEnabled: boolean;
  euVatNumber: string;
  validateEuVatNumber: boolean;
  generateTaxReports: boolean;
  taxReportFrequency: string;
}

export default function TaxSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddRate, setShowAddRate] = useState(false);
  const [editingRate, setEditingRate] = useState<TaxRate | null>(null);
  const [formData, setFormData] = useState<TaxSettings>({
    taxCalculationMethod: "exclusive",
    defaultTaxRate: 0,
    taxRates: [],
    taxClasses: [],
    taxExemptUserGroups: [],
    taxOnShipping: false,
    taxOnShippingRate: 0,
    displayPricesWithTax: false,
    showTaxInCart: true,
    showTaxOnCheckout: true,
    showTaxInEmails: true,
    euVatEnabled: false,
    euVatNumber: "",
    validateEuVatNumber: false,
    generateTaxReports: true,
    taxReportFrequency: "monthly",
  });

  const [rateForm, setRateForm] = useState<TaxRate>({
    name: "",
    rate: 0,
    country: "",
    state: "",
    city: "",
    postalCode: "",
    taxType: "standard",
    isActive: true,
    priority: 0,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/settings/tax");
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        const settings = data.data || data;
        setFormData((prev) => ({
          ...prev,
          ...settings,
        }));
      } else {
        toast.error(data.meta?.message || "Failed to fetch tax settings");
      }
    } catch (error: any) {
      console.error("Error fetching tax settings:", error);
      toast.error(error.response?.data?.message || "Failed to fetch tax settings");
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

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setRateForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddRate = async () => {
    try {
      setSaving(true);
      const response = await api.post("/admin/settings/tax/rates", rateForm);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        toast.success("Tax rate added successfully");
        setShowAddRate(false);
        setRateForm({
          name: "",
          rate: 0,
          country: "",
          state: "",
          city: "",
          postalCode: "",
          taxType: "standard",
          isActive: true,
          priority: 0,
        });
        await fetchSettings();
      } else {
        toast.error(data.meta?.message || "Failed to add tax rate");
      }
    } catch (error: any) {
      console.error("Error adding tax rate:", error);
      toast.error(error.response?.data?.message || "Failed to add tax rate");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateRate = async () => {
    if (!editingRate?._id) return;

    try {
      setSaving(true);
      const response = await api.put(`/admin/settings/tax/rates/${editingRate._id}`, rateForm);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        toast.success("Tax rate updated successfully");
        setEditingRate(null);
        setRateForm({
          name: "",
          rate: 0,
          country: "",
          state: "",
          city: "",
          postalCode: "",
          taxType: "standard",
          isActive: true,
          priority: 0,
        });
        await fetchSettings();
      } else {
        toast.error(data.meta?.message || "Failed to update tax rate");
      }
    } catch (error: any) {
      console.error("Error updating tax rate:", error);
      toast.error(error.response?.data?.message || "Failed to update tax rate");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRate = async (rateId: string) => {
    if (!confirm("Are you sure you want to delete this tax rate?")) return;

    try {
      const response = await api.delete(`/admin/settings/tax/rates/${rateId}`);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        toast.success("Tax rate deleted successfully");
        await fetchSettings();
      } else {
        toast.error(data.meta?.message || "Failed to delete tax rate");
      }
    } catch (error: any) {
      console.error("Error deleting tax rate:", error);
      toast.error(error.response?.data?.message || "Failed to delete tax rate");
    }
  };

  const handleEditRate = (rate: TaxRate) => {
    setEditingRate(rate);
    setRateForm(rate);
    setShowAddRate(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await api.put("/admin/settings/tax", formData);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        toast.success("Tax settings updated successfully");
      } else {
        toast.error(data.meta?.message || "Failed to update tax settings");
      }
    } catch (error: any) {
      console.error("Error updating tax settings:", error);
      toast.error(error.response?.data?.message || "Failed to update tax settings");
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
      <Breadcrumb pageName="Tax Settings" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tax Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Configure tax rates and calculation methods</p>
          </div>
          <button
            onClick={() => {
              setShowAddRate(true);
              setEditingRate(null);
              setRateForm({
                name: "",
                rate: 0,
                country: "",
                state: "",
                city: "",
                postalCode: "",
                taxType: "standard",
                isActive: true,
                priority: 0,
              });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Tax Rate
          </button>
        </div>

        {/* Add/Edit Tax Rate Form */}
        {showAddRate && (
          <div className="mb-6 rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingRate ? "Edit Tax Rate" : "Add New Tax Rate"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                type="text"
                label="Tax Rate Name"
                name="name"
                value={rateForm.name}
                handleChange={handleRateChange}
                required
              />
              <InputGroup
                type="number"
                label="Rate (%)"
                name="rate"
                value={rateForm.rate.toString()}
                handleChange={handleRateChange}
                min="0"
                max="100"
                step="0.01"
                required
              />
              <InputGroup
                type="text"
                label="Country"
                name="country"
                value={rateForm.country || ""}
                handleChange={handleRateChange}
              />
              <InputGroup
                type="text"
                label="State/Province"
                name="state"
                value={rateForm.state || ""}
                handleChange={handleRateChange}
              />
              <InputGroup
                type="text"
                label="City"
                name="city"
                value={rateForm.city || ""}
                handleChange={handleRateChange}
              />
              <InputGroup
                type="text"
                label="Postal Code"
                name="postalCode"
                value={rateForm.postalCode || ""}
                handleChange={handleRateChange}
              />
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Tax Type</label>
                <select
                  name="taxType"
                  value={rateForm.taxType}
                  onChange={handleRateChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="standard">Standard</option>
                  <option value="reduced">Reduced</option>
                  <option value="zero">Zero</option>
                  <option value="exempt">Exempt</option>
                </select>
              </div>
              <InputGroup
                type="number"
                label="Priority"
                name="priority"
                value={rateForm.priority.toString()}
                handleChange={handleRateChange}
                min="0"
              />
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={rateForm.isActive}
                    onChange={handleRateChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  if (editingRate) {
                    handleUpdateRate();
                  } else {
                    handleAddRate();
                  }
                }}
                disabled={saving}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
              >
                {saving ? "Saving..." : editingRate ? "Update" : "Add"} Tax Rate
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddRate(false);
                  setEditingRate(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tax Calculation Method */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Calculation Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Calculation Method</label>
                <select
                  name="taxCalculationMethod"
                  value={formData.taxCalculationMethod}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="inclusive">Tax Inclusive</option>
                  <option value="exclusive">Tax Exclusive</option>
                  <option value="auto">Auto Detect</option>
                </select>
              </div>
              <InputGroup
                type="number"
                label="Default Tax Rate (%)"
                name="defaultTaxRate"
                value={formData.defaultTaxRate.toString()}
                handleChange={handleChange}
                min="0"
                max="100"
                step="0.01"
              />
            </div>
          </div>

          {/* Tax Rates List */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Rates</h2>
            {formData.taxRates && formData.taxRates.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stroke dark:border-stroke-dark">
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Name</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Rate</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Location</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                      <th className="py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.taxRates.map((rate, index) => (
                      <tr key={rate._id || index} className="border-b border-stroke dark:border-stroke-dark">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{rate.name}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{rate.rate}%</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {[rate.country, rate.state, rate.city].filter(Boolean).join(", ") || "Global"}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400 capitalize">{rate.taxType}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              rate.isActive
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {rate.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditRate(rate)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => rate._id && handleDeleteRate(rate._id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-4">No tax rates configured</p>
            )}
          </div>

          {/* Tax Display Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Display Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="displayPricesWithTax"
                    checked={formData.displayPricesWithTax}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Display Prices With Tax</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="showTaxInCart"
                    checked={formData.showTaxInCart}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Show Tax in Cart</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="showTaxOnCheckout"
                    checked={formData.showTaxOnCheckout}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Show Tax on Checkout</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="showTaxInEmails"
                    checked={formData.showTaxInEmails}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Show Tax in Emails</span>
                </label>
              </div>
            </div>
          </div>

          {/* Tax on Shipping */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax on Shipping</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 mb-2.5 block text-black dark:text-white">
                  <input
                    type="checkbox"
                    name="taxOnShipping"
                    checked={formData.taxOnShipping}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>Apply Tax to Shipping</span>
                </label>
              </div>
              {formData.taxOnShipping && (
                <InputGroup
                  type="number"
                  label="Shipping Tax Rate (%)"
                  name="taxOnShippingRate"
                  value={formData.taxOnShippingRate.toString()}
                  handleChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                />
              )}
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



























