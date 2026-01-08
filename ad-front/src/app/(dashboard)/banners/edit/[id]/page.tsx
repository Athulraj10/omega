'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/components/redux/hooks';
import { updateBannerRequest, fetchBannersRequest } from '@/components/redux/action/banner/bannerAction';
import { toast } from 'react-toastify';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import BannerPreview from '@/components/BannerPreview';
import api from '@/utils/api';

interface BannerFormData {
  id: string;
  titleLine1: string;
  titleLine2: string;
  offerText: string;
  offerHighlight: string;
  buttonText: string;
  image: File | null;
  imageUrl: string; // Existing image URL
  device: 'mobile' | 'desktop';
  isDefault: boolean;
  status: boolean;
}

const EditBannerPage = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { banners } = useAppSelector((state) => state.banner);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState<BannerFormData>({
    id: '',
    titleLine1: '',
    titleLine2: '',
    offerText: '',
    offerHighlight: '',
    buttonText: 'Shop Now',
    image: null,
    imageUrl: '',
    device: 'desktop',
    isDefault: false,
    status: true,
  });

  useEffect(() => {
    const bannerId = params.id as string;
    if (bannerId && !formData.id) {
      fetchBannerData(bannerId);
    }
  }, [params.id]);

  // Watch for banners updates and populate form if we're still fetching
  useEffect(() => {
    const bannerId = params.id as string;
    if (bannerId && fetching && banners && banners.length > 0 && !formData.id) {
      const banner = banners.find((b: any) => b._id === bannerId);
      if (banner) {
        populateFormData(banner);
        setFetching(false);
      }
    }
  }, [banners, params.id, fetching, formData.id]);

  const fetchBannerData = async (bannerId: string) => {
    try {
      setFetching(true);
      setError('');
      
      // First, try to get from Redux store
      if (banners && banners.length > 0) {
        const banner = banners.find((b: any) => b._id === bannerId);
        if (banner) {
          populateFormData(banner);
          setFetching(false);
          return;
        }
      }
      
      // If not in store, fetch all banners
      dispatch(fetchBannersRequest());
      
      // Also try fetching directly from API as fallback
      fetchBannerFromAPI(bannerId);
    } catch (error) {
      console.error('Error fetching banner:', error);
      setError('Failed to load banner data');
      setFetching(false);
    }
  };

  const fetchBannerFromAPI = async (bannerId: string) => {
    try {
      // Fetch all banners and find the one we need
      const response = await api.get('/admin/banners');
      const bannersData = response.data;
      
      if (bannersData.meta?.code === 200 || bannersData.success) {
        const allBanners = bannersData.data || bannersData;
        const banner = Array.isArray(allBanners) 
          ? allBanners.find((b: any) => b._id === bannerId)
          : null;
        
        if (banner) {
          populateFormData(banner);
        } else {
          setError('Banner not found');
        }
      } else {
        setError('Failed to fetch banner data');
      }
    } catch (error: any) {
      console.error('Error fetching banner from API:', error);
      setError(error.response?.data?.message || 'Failed to load banner data');
    } finally {
      setFetching(false);
    }
  };

  const populateFormData = (banner: any) => {
    console.log('📋 Populating form with banner:', banner);
    const imageUrl = banner.image || '';
    setFormData({
      id: banner._id,
      titleLine1: banner.titleLine1 || '',
      titleLine2: banner.titleLine2 || '',
      offerText: banner.offerText || '',
      offerHighlight: banner.offerHighlight || '',
      buttonText: banner.buttonText || 'Shop Now',
      image: null,
      imageUrl: imageUrl,
      device: banner.device || 'desktop',
      isDefault: banner.isDefault || false,
      status: banner.status === '1' || banner.status === true,
    });
    
    // Set image preview - use the full S3 URL from the API
    if (imageUrl) {
      console.log('🖼️ Setting image preview:', imageUrl);
      setImagePreview(imageUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.titleLine1.trim()) {
      setError('Title Line 1 is required');
      return;
    }

    if (!formData.id) {
      setError('Banner ID is missing');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Prepare update data - id is sent in the action payload, not in updateData
      const updateData: any = {
        id: formData.id, // Keep id in payload for saga to extract
        titleLine1: formData.titleLine1,
        titleLine2: formData.titleLine2,
        offerText: formData.offerText,
        offerHighlight: formData.offerHighlight,
        buttonText: formData.buttonText,
        device: formData.device,
        isDefault: formData.isDefault,
        status: formData.status ? '1' : '0',
      };

      // Handle image update - convert to base64 if new image is selected
      if (formData.image) {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const base64Image = reader.result as string;
            updateData.image = base64Image;
            
            // Send update request
            await dispatch(updateBannerRequest(updateData));
            setLoading(false);
            // Wait a bit for the saga to complete
            setTimeout(() => {
              router.push('/banners/list');
            }, 1000);
          } catch (err: any) {
            console.error('Failed to update banner:', err);
            const errorMessage = err.response?.data?.message || 'Error updating banner';
            setError(errorMessage);
            toast.error(errorMessage);
            setLoading(false);
          }
        };
        reader.onerror = () => {
          setError('Failed to read image file');
          setLoading(false);
        };
        reader.readAsDataURL(formData.image);
      } else {
        // No new image, just update other fields
        try {
          await dispatch(updateBannerRequest(updateData));
          setLoading(false);
          // Wait a bit for the saga to complete
          setTimeout(() => {
            router.push('/banners/list');
          }, 1000);
        } catch (err: any) {
          console.error('Failed to update banner:', err);
          const errorMessage = err.response?.data?.message || 'Error updating banner';
          setError(errorMessage);
          toast.error(errorMessage);
          setLoading(false);
        }
      }
    } catch (err: any) {
      console.error('Failed to update banner:', err);
      const errorMessage = err.response?.data?.message || 'Error updating banner';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/banners/list');
  };

  if (fetching) {
    return (
      <div suppressHydrationWarning>
        <Breadcrumb pageName="Edit Banner" />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
          <div className="flex items-center justify-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData.id) {
    return (
      <div suppressHydrationWarning>
        <Breadcrumb pageName="Edit Banner" />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-800 font-medium mb-2">Error Loading Banner</p>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={() => router.push('/banners/list')}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning>
      <Breadcrumb pageName="Edit Banner" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Banner</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Update banner information and content
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Banner Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                        >
                          <span>Upload a new file</span>
                          <input
                            id="image-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      <p className="text-xs text-gray-400 italic">Leave empty to keep current image</p>
                    </div>
                  </div>
                  {(imagePreview || formData.imageUrl) && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Image:</p>
                      <img
                        src={(() => {
                          const img = imagePreview || formData.imageUrl || '';
                          const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8001';
                          
                          if (!img) return '';
                          
                          // If already absolute URL or base64
                          if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
                            return img;
                          }
                          
                          // Remove "fake" prefix if present
                          let cleanImg = img.replace(/^fake\/?/, '').trim();
                          
                          // Ensure it starts with / for proper path construction
                          if (!cleanImg.startsWith('/')) {
                            cleanImg = '/' + cleanImg;
                          }
                          
                          // Construct absolute URL
                          return `${apiEndpoint}${cleanImg}`;
                        })()}
                        alt="Banner Preview"
                        className="w-full max-w-md h-auto object-contain rounded border"
                        onError={(e) => {
                          console.error('Image load error:', imagePreview || formData.imageUrl);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                        onLoad={(e) => {
                          console.log('Image loaded successfully:', e.currentTarget.src);
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Content Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title Line 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title Line 1 *
                    </label>
                    <input
                      type="text"
                      name="titleLine1"
                      value={formData.titleLine1}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="e.g., Organic & healthy vegetables"
                      required
                    />
                  </div>

                  {/* Title Line 2 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title Line 2
                    </label>
                    <input
                      type="text"
                      name="titleLine2"
                      value={formData.titleLine2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="e.g., Fresh from the farm"
                    />
                  </div>

                  {/* Offer Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Offer Text
                    </label>
                    <input
                      type="text"
                      name="offerText"
                      value={formData.offerText}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="e.g., Starting at $"
                    />
                  </div>

                  {/* Offer Highlight */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Offer Highlight
                    </label>
                    <input
                      type="text"
                      name="offerHighlight"
                      value={formData.offerHighlight}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="e.g., 20.00"
                    />
                  </div>

                  {/* Button Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      name="buttonText"
                      value={formData.buttonText}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="e.g., Shop Now"
                    />
                  </div>

                </div>

                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Device */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Device
                    </label>
                    <select
                      name="device"
                      value={formData.device}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    >
                      <option value="desktop">Desktop</option>
                      <option value="mobile">Mobile</option>
                    </select>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Set as default banner
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Active
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Updating...' : 'Update Banner'}
                  </button>
                </div>
              </form>
            </div>

            {/* Preview Section */}
            <div>
              <BannerPreview
                image={imagePreview || formData.imageUrl}
                titleLine1={formData.titleLine1}
                titleLine2={formData.titleLine2}
                offerText={formData.offerText}
                offerHighlight={formData.offerHighlight}
                buttonText={formData.buttonText}
                backgroundColor="#ffffff"
                textColor="#000000"
                animation="fade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBannerPage;

