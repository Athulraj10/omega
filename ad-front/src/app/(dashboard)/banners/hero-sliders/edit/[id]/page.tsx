"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { RootState } from '@/components/redux/store';
import { updateHeroSliderRequest, fetchHeroSlidersRequest, UpdateHeroSliderData, HeroSlider } from '@/components/redux/action/banner/heroSliderAction';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { toast } from 'react-toastify';
import api from '@/utils/api';

const EditHeroSliderPage = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const { heroSliders } = useSelector((state: RootState) => state.heroSlider);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState<UpdateHeroSliderData>({
    id: '',
    titleLine1: '',
    titleLine2: '',
    offerText: '',
    offerHighlight: '',
    buttonText: '',
    buttonLink: '',
    image: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    animation: 'fade',
    autoplayDelay: 2500,
    sortOrder: 1,
    status: true,
    device: 'desktop',
  });

  useEffect(() => {
    const sliderId = params.id as string;
    if (sliderId) {
      fetchSliderData(sliderId);
    }
  }, [params.id, dispatch]);

  // Watch for heroSliders updates and populate form if we're still fetching
  useEffect(() => {
    const sliderId = params.id as string;
    if (sliderId && fetching && heroSliders && heroSliders.length > 0 && !formData.id) {
      const slider = heroSliders.find((s: HeroSlider) => s._id === sliderId);
      if (slider) {
        populateFormData(slider);
        setFetching(false);
      }
    }
  }, [heroSliders, params.id, fetching, formData.id]);

  const fetchSliderData = async (sliderId: string) => {
    try {
      setFetching(true);
      setError('');
      
      // First, try to get from Redux store
      if (heroSliders && heroSliders.length > 0) {
        const slider = heroSliders.find((s: HeroSlider) => s._id === sliderId);
        if (slider) {
          populateFormData(slider);
          setFetching(false);
          return;
        }
      }
      
      // If not in store, fetch all hero sliders
      dispatch(fetchHeroSlidersRequest());
      
      // Also try fetching directly from API as fallback
      fetchSliderFromAPI(sliderId);
    } catch (error) {
      console.error('Error fetching hero slider:', error);
      setError('Failed to load hero slider data');
      setFetching(false);
    }
  };

  const fetchSliderFromAPI = async (sliderId: string) => {
    try {
      const response = await api.get(`/admin/hero-sliders/${sliderId}`);
      const sliderData = response.data;
      
      if (sliderData.meta?.code === 200 || sliderData.success) {
        const slider = sliderData.data || sliderData;
        populateFormData(slider);
      } else {
        setError('Hero slider not found');
      }
    } catch (error: any) {
      console.error('Error fetching hero slider from API:', error);
      setError(error.response?.data?.message || 'Failed to load hero slider data');
    } finally {
      setFetching(false);
    }
  };

  const populateFormData = (slider: any) => {
    console.log('📋 Populating form with hero slider:', slider);
    const imgUrl = slider.imageUrl || slider.image || '';
    
    setFormData({
      id: slider._id,
      titleLine1: slider.titleLine1 || slider.title || '',
      titleLine2: slider.titleLine2 || '',
      offerText: slider.offerText || '',
      offerHighlight: slider.offerHighlight || '',
      buttonText: slider.buttonText || 'Shop Now',
      buttonLink: slider.buttonLink || '/',
      image: '', // Don't prefill base64, use imageUrl for preview
      backgroundColor: slider.backgroundColor || '#ffffff',
      textColor: slider.textColor || '#000000',
      animation: slider.animation || 'fade',
      autoplayDelay: slider.autoplayDelay || 2500,
      sortOrder: slider.sortOrder || 1,
      status: slider.status === 'active' || slider.status === true || slider.status === '1',
      device: slider.device || 'desktop',
    });
    
    // Set image preview URL
    if (imgUrl) {
      console.log('🖼️ Setting image preview:', imgUrl);
      setImageUrl(imgUrl);
      setImagePreview(imgUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.id) {
      setError('Hero slider ID is missing');
      return;
    }

    if (!formData.titleLine1.trim()) {
      setError('Title Line 1 is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Prepare update data - backend expects id in the action payload
      const updateData = {
        id: formData.id,
        titleLine1: formData.titleLine1,
        titleLine2: formData.titleLine2,
        offerText: formData.offerText,
        offerHighlight: formData.offerHighlight,
        buttonText: formData.buttonText,
        buttonLink: formData.buttonLink,
        device: formData.device || 'desktop',
        backgroundColor: formData.backgroundColor,
        textColor: formData.textColor,
        animation: formData.animation,
        autoplayDelay: formData.autoplayDelay,
        sortOrder: formData.sortOrder,
        status: formData.status ? 'active' : 'inactive',
        image: formData.image, // base64 image if changed
      };
      
      await dispatch(updateHeroSliderRequest(updateData));
      setLoading(false);
      
      // Wait a bit for the saga to complete
      setTimeout(() => {
        router.push('/banners/hero-sliders');
      }, 1000);
    } catch (error: any) {
      console.error('Failed to update hero slider:', error);
      const errorMessage = error.response?.data?.message || 'Error updating hero slider';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div suppressHydrationWarning>
        <Breadcrumb pageName="Edit Hero Slider" />
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
        <Breadcrumb pageName="Edit Hero Slider" />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-800 font-medium mb-2">Error Loading Hero Slider</p>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={() => router.push('/banners/hero-sliders')}
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
      <Breadcrumb pageName="Edit Hero Slider" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-stroke-dark dark:bg-box-dark sm:px-7.5 xl:pb-1">
        <div className="max-w-2xl mx-auto">
          <h4 className="text-xl font-semibold text-black dark:text-white mb-6">
            Edit Hero Slider
          </h4>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Slider Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {(imagePreview || imageUrl) && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Image:</p>
                  <img
                    src={(() => {
                      const img = imagePreview || imageUrl || '';
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
                    alt="Preview"
                    className="w-full max-w-md h-auto object-contain rounded border"
                    onError={(e) => {
                      console.error('Image load error:', imagePreview || imageUrl);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <p className="text-xs text-gray-400 italic mt-2">Upload a new file to replace the current image</p>
                </div>
              )}
            </div>

            {/* Title Line 1 */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Title Line 1 *
              </label>
              <input
                type="text"
                name="titleLine1"
                value={formData.titleLine1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Organic & healthy vegetables"
                required
              />
            </div>

            {/* Title Line 2 */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Title Line 2
              </label>
              <input
                type="text"
                name="titleLine2"
                value={formData.titleLine2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Fresh from the farm"
              />
            </div>

            {/* Offer Text */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Offer Text
              </label>
              <input
                type="text"
                name="offerText"
                value={formData.offerText}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Starting at $"
              />
            </div>

            {/* Offer Highlight */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Offer Highlight
              </label>
              <input
                type="text"
                name="offerHighlight"
                value={formData.offerHighlight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 20.00"
              />
            </div>

            {/* Button Text */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Button Text
              </label>
              <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Shop Now"
              />
            </div>

            {/* Button Link */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Button Link
              </label>
              <input
                type="url"
                name="buttonLink"
                value={formData.buttonLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., https://example.com/shop"
              />
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Background Color
              </label>
              <input
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleInputChange}
                className="w-full h-12 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Text Color
              </label>
              <input
                type="color"
                name="textColor"
                value={formData.textColor}
                onChange={handleInputChange}
                className="w-full h-12 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Device */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Device
              </label>
              <select
                name="device"
                value={formData.device || 'desktop'}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
                <option value="all">All Devices</option>
              </select>
            </div>

            {/* Animation */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Animation Type
              </label>
              <select
                name="animation"
                value={formData.animation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="zoom">Zoom</option>
              </select>
            </div>

            {/* Autoplay Delay */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Autoplay Delay (ms)
              </label>
              <input
                type="number"
                name="autoplayDelay"
                value={formData.autoplayDelay}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                min="1000"
                max="10000"
                step="500"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Sort Order
              </label>
              <input
                type="number"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
              />
            </div>

            {/* Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-black dark:text-white">
                Active
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Hero Slider'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center justify-center rounded-md border border-stroke py-2 px-10 text-center font-medium text-black hover:bg-gray-50 lg:px-8 xl:px-10"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditHeroSliderPage; 