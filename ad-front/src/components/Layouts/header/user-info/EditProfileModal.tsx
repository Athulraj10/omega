"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/components/redux/hooks";
import { updateProfile } from "@/components/redux/action/auth/profileAction";
import { toast } from "react-toastify";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/helperWindows";
import api from "@/utils/api";

interface EditProfileModalProps {
  userData: any;
  onClose: () => void;
}

export default function EditProfileModal({ userData, onClose }: EditProfileModalProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    userName: userData?.userName || userData?.username || "",
    phoneNumber: userData?.phoneNumber || userData?.mobileNo || "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch fresh data when modal opens
    const fetchProfile = async () => {
      try {
        const response = await api.get("/admin/profile");
        const data = response.data;
        if (data.meta?.code === 200 || data.success) {
          const freshData = data.data || data;
          setForm({
            name: freshData.name || "",
            email: freshData.email || "",
            userName: freshData.userName || freshData.username || "",
            phoneNumber: freshData.phoneNumber || freshData.mobileNo || "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (form.password && form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // Use Redux action for consistency
      dispatch(
        updateProfile({
          data: {
            id: userData?.id || userData?._id,
            name: form.name,
            email: form.email,
            userName: form.userName,
            phoneNumber: form.phoneNumber,
            password: form.password || undefined,
          },
          callback: (updatedData: any) => {
            // Update localStorage
            const storedAdminData = getLocalStorageItem("adminData");
            if (storedAdminData) {
              try {
                const parsed = JSON.parse(storedAdminData);
                const updated = { ...parsed, ...updatedData };
                setLocalStorageItem("adminData", JSON.stringify(updated));
              } catch (e) {
                console.error("Error updating localStorage:", e);
              }
            }
            
            toast.success("Profile updated successfully");
            onClose();
            // Refresh page to update header
            setTimeout(() => {
              window.location.reload();
            }, 500);
          },
        })
      );
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to update profile");
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">New Password (leave blank to keep current)</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          {form.password && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                autoComplete="new-password"
                minLength={6}
              />
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-dark-3 dark:bg-dark-2"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-700 dark:text-gray-300">
              Show Password
            </label>
          </div>

          {error && <div className="rounded bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stroke px-4 py-2 font-medium text-black transition-all hover:shadow-1 dark:border-dark-3 dark:text-white dark:hover:shadow-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 font-medium text-white transition-all hover:bg-opacity-90 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
