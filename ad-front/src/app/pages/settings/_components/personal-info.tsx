"use client";

import {
  CallIcon,
  EmailIcon,
  PencilSquareIcon,
  UserIcon,
} from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/helperWindows";

export function PersonalInfoForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    username: "",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/profile");
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        const userData = data.data || data;
        const storedAdminData = getLocalStorageItem("adminData");
        
        // Update localStorage with fresh data
        if (storedAdminData) {
          try {
            const parsed = JSON.parse(storedAdminData);
            const updated = { ...parsed, ...userData };
            setLocalStorageItem("adminData", JSON.stringify(updated));
          } catch (e) {
            console.error("Error updating localStorage:", e);
          }
        }

        setFormData({
          fullName: userData.name || `${userData.first_name || ""} ${userData.last_name || ""}`.trim() || "",
          phoneNumber: userData.phoneNumber || userData.mobileNo || "",
          email: userData.email || "",
          username: userData.userName || userData.username || "",
          bio: userData.bio || "",
        });
      } else {
        toast.error(data.meta?.message || "Failed to fetch profile");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast.error(error.response?.data?.message || "Failed to fetch profile");
      
      // Fallback to localStorage data
      const storedAdminData = getLocalStorageItem("adminData");
      if (storedAdminData) {
        try {
          const parsed = JSON.parse(storedAdminData);
          setFormData({
            fullName: parsed.name || "",
            phoneNumber: parsed.phoneNumber || parsed.mobileNo || "",
            email: parsed.email || "",
            username: parsed.userName || parsed.username || "",
            bio: parsed.bio || "",
          });
        } catch (e) {
          console.error("Error parsing localStorage:", e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Split fullName into first_name and last_name
      const nameParts = formData.fullName.trim().split(" ");
      const first_name = nameParts[0] || "";
      const last_name = nameParts.slice(1).join(" ") || "";

      const updateData: any = {
        name: formData.fullName,
        first_name,
        last_name,
        email: formData.email,
        userName: formData.username,
        phoneNumber: formData.phoneNumber,
        bio: formData.bio,
      };

      const response = await api.post("/admin/update-profile", updateData);
      const data = response.data;

      if (data.meta?.code === 200 || data.success) {
        const updatedUser = data.data || data;
        
        // Update localStorage
        const storedAdminData = getLocalStorageItem("adminData");
        if (storedAdminData) {
          try {
            const parsed = JSON.parse(storedAdminData);
            const updated = { ...parsed, ...updatedUser };
            setLocalStorageItem("adminData", JSON.stringify(updated));
          } catch (e) {
            console.error("Error updating localStorage:", e);
          }
        }

        toast.success("Profile updated successfully");
      } else {
        toast.error(data.meta?.message || "Failed to update profile");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ShowcaseSection title="Personal Information" className="!p-7">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </ShowcaseSection>
    );
  }

  return (
    <ShowcaseSection title="Personal Information" className="!p-7">
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="fullName"
            label="Full Name"
            placeholder="David Jhon"
            value={formData.fullName}
            handleChange={handleChange}
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
            required
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="phoneNumber"
            label="Phone Number"
            placeholder="+990 3343 7865"
            value={formData.phoneNumber}
            handleChange={handleChange}
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
          />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="devidjond45@gmail.com"
          value={formData.email}
          handleChange={handleChange}
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
          required
        />

        <InputGroup
          className="mb-5.5"
          type="text"
          name="username"
          label="Username"
          placeholder="devidjhon24"
          value={formData.username}
          handleChange={handleChange}
          icon={<UserIcon />}
          iconPosition="left"
          height="sm"
        />

        <TextAreaGroup
          className="mb-5.5"
          label="BIO"
          name="bio"
          placeholder="Write your bio here"
          icon={<PencilSquareIcon />}
          value={formData.bio}
          handleChange={handleChange}
        />

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
            onClick={() => fetchProfile()}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90 disabled:opacity-50"
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
