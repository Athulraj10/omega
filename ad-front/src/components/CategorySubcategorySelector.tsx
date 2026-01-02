import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesForProduct } from '@/components/redux/action/categories/categoryAction';
import { RootState } from '@/components/redux/reducer';

interface CategorySubcategorySelectorProps {
  selectedCategory: string;
  selectedSubcategory: string;
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategoryId: string) => void;
  className?: string;
  required?: boolean;
}

const CategorySubcategorySelector: React.FC<CategorySubcategorySelectorProps> = ({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  className = "",
  required = false
}) => {
  const dispatch = useDispatch();
  const { categoriesForProduct, categoriesForProductLoading } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    console.log('🔄 Dispatching fetchCategoriesForProduct...');
    dispatch(fetchCategoriesForProduct());
  }, [dispatch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    console.log('🔄 Category changed to:', categoryId);
    onCategoryChange(categoryId);
    // Reset subcategory when category changes
    onSubcategoryChange('');
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subcategoryId = e.target.value;
    console.log('🔄 Subcategory changed to:', subcategoryId);
    onSubcategoryChange(subcategoryId);
  };

  // Ensure categoriesForProduct is an array
  const categoriesArray = Array.isArray(categoriesForProduct) ? categoriesForProduct : [];
  
  // Get subcategories for the selected category with null safety
  const selectedCategoryData = categoriesArray.find((cat: any) => cat.id === selectedCategory);
  const subcategories = selectedCategoryData?.subcategories || [];

  console.log('📊 Categories for product:', categoriesArray.length);
  console.log('🎯 Selected category:', selectedCategory);
  console.log('📋 Selected category data:', selectedCategoryData);
  console.log('🔽 Subcategories available:', subcategories.length);
  console.log('📋 All categories:', categoriesArray);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Category Selection */}
      <div>
        <label className="mb-2.5 block text-black dark:text-white">
          Category {required && <span className="text-meta-1">*</span>}
        </label>
        <select
          value={selectedCategory || ""}
          onChange={handleCategoryChange}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          required={required}
          disabled={categoriesForProductLoading}
        >
          <option value="">Select a category</option>
          {categoriesArray.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name} {category.subcategories?.length > 0 && `(${category.subcategories.length} subcategories)`}
            </option>
          ))}
        </select>
        {categoriesForProductLoading && (
          <div className="mt-2 text-sm text-gray-500">
            Loading categories...
          </div>
        )}
      </div>

      {/* Subcategory Selection - Always show if category is selected */}
      {selectedCategory && (
        <div>
          <label className="mb-2.5 block text-black dark:text-white">
            Subcategory
          </label>
          {subcategories.length > 0 ? (
            <select
              value={selectedSubcategory || ""}
              onChange={handleSubcategoryChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="">Select a subcategory (optional)</option>
              {subcategories.map((subcategory: any) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="w-full rounded border-[1.5px] border-stroke bg-gray-100 px-5 py-3 font-medium text-gray-500 dark:border-form-strokedark dark:bg-gray-800 dark:text-gray-400">
              No subcategories available for this category
            </div>
          )}
        </div>
      )}

      {/* Show selected category info */}
      {selectedCategory && (
        <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="text-sm">
            <div className="font-medium text-gray-900 dark:text-white flex items-center">
              <span className="mr-2">📁</span>
              Selected Category: {selectedCategoryData?.name}
            </div>
            {selectedSubcategory && (
              <div className="text-gray-600 dark:text-gray-300 mt-1 flex items-center">
                <span className="mr-2">📂</span>
                Selected Subcategory: {subcategories.find((sub: any) => sub.id === selectedSubcategory)?.name}
              </div>
            )}
            {selectedCategoryData?.description && (
              <div className="text-gray-500 dark:text-gray-400 mt-1">
                {selectedCategoryData.description}
              </div>
            )}
            {subcategories.length > 0 && (
              <div className="text-gray-500 dark:text-gray-400 mt-1">
                Available subcategories: {subcategories.length}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default CategorySubcategorySelector; 