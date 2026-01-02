"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../components/redux/reducer";
import { getSellersRequest, deleteSellerRequest, editSellerRequest } from "../../../../components/redux/action/seller";
import { Seller, SellerFormData } from "../../../../components/redux/action/types/sellerTypes";
import { PencilSquareIcon, TrashIcon, SearchIcon } from "@/assets/icons";

export default function SellerListPage() {
  const dispatch = useDispatch();
  const { sellers, loading, error, deleteLoading, editLoading } = useSelector((state: RootState) => state.sellers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSellers, setFilteredSellers] = useState<Seller[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null);
  const [editFormData, setEditFormData] = useState<SellerFormData>({
    companyName: '',
    userName: '',
    email: '',
    mobile_no: '',
    address: '',
    password: '',
    status: '1'
  });

  useEffect(() => {
    dispatch(getSellersRequest());
  }, [dispatch]);

  useEffect(() => {
    // Add null checks and fallbacks for undefined fields
    const filtered = sellers.filter((seller) => {
      const companyName = seller.companyName || "";
      const userName = seller.userName || "";
      const email = seller.email || "";
      
      return (
        companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredSellers(filtered);
  }, [sellers, searchTerm]);

  const handleEdit = (seller: Seller) => {
    console.log('Editing seller:', seller);
    setEditingSeller(seller);
    setEditFormData({
      companyName: seller.companyName || '',
      userName: seller.userName || '',
      email: seller.email || '',
      mobile_no: seller.mobile_no || '',
      address: seller.address || '',
      password: '', // Don't populate password for security
      status: seller.status || '1'
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (field: keyof SellerFormData, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingSeller) {
      console.error('No seller selected for editing');
      return;
    }

    try {
      console.log('Submitting edit form:', editFormData);
      
      // Validate required fields
      if (!editFormData.companyName.trim()) {
        alert('Company name is required!');
        return;
      }
      
      if (!editFormData.userName.trim()) {
        alert('User name is required!');
        return;
      }
      
      if (!editFormData.email.trim()) {
        alert('Email is required!');
        return;
      }

      // Dispatch edit action
      dispatch(editSellerRequest(editingSeller._id, editFormData, () => {
        // Success callback
        setShowEditModal(false);
        setEditingSeller(null);
        setEditFormData({
          companyName: '',
          userName: '',
          email: '',
          mobile_no: '',
          address: '',
          password: '',
          status: '1'
        });
        alert('Seller updated successfully!');
      }));
      
    } catch (error) {
      console.error('Error updating seller:', error);
      alert('Failed to update seller. Please try again.');
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingSeller(null);
    setEditFormData({
      companyName: '',
      userName: '',
      email: '',
      mobile_no: '',
      address: '',
      password: '',
      status: '1'
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this seller?")) {
      dispatch(deleteSellerRequest(id));
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "1") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <div className="w-2 h-2 bg-red-400 rounded-full mr-1.5"></div>
          Inactive
        </span>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-primary"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading sellers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Loading Sellers</h3>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Seller Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and monitor all registered sellers in your platform
            </p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Seller
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sellers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{sellers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Sellers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sellers.filter(s => s.status === "1").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive Sellers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sellers.filter(s => s.status === "0").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Filtered Results</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredSellers.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors duration-200"
              placeholder="Search sellers by company, name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors duration-200">
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Contact Person
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSellers.map((seller) => (
                <tr key={seller._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {(seller.companyName || seller.userName || "N/A").charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {seller.companyName || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {seller._id.slice(-8)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {seller.userName || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {seller.email || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {seller.mobile_no || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(seller.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                         <div className="flex items-center space-x-3">
                       <button 
                         className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                         onClick={() => handleEdit(seller)}
                       >
                         <PencilSquareIcon className="w-4 h-4 mr-1" />
                         Edit
                       </button>
                      <button 
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-400 dark:bg-red-900 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        onClick={() => handleDelete(seller._id)}
                        disabled={deleteLoading}
                      >
                        <TrashIcon className="w-4 h-4 mr-1" />
                        {deleteLoading ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredSellers.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? "No sellers found" : "No sellers yet"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm 
                ? "Try adjusting your search terms or filters."
                : "Get started by adding your first seller."
              }
            </p>
                         {!searchTerm && (
               <button className="inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-200">
                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                 </svg>
                 Add First Seller
               </button>
             )}
          </div>
                 )}
       </div>

       {/* Edit Seller Modal */}
       {showEditModal && editingSeller && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
           <div className="w-full max-w-2xl max-h-[90vh] rounded-lg bg-white shadow-lg dark:bg-gray-dark flex flex-col">
             {/* Header */}
             <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
               <h2 className="text-xl font-bold text-dark dark:text-white">
                 Edit Seller: {editingSeller.companyName || editingSeller.userName}
               </h2>
               <button
                 onClick={handleCloseEditModal}
                 className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
               >
                 <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                   <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                 </svg>
               </button>
             </div>

             {/* Scrollable Content */}
             <div className="flex-1 overflow-y-auto p-6">
               <form onSubmit={handleEditFormSubmit} className="space-y-6">
               {/* Company Name Field */}
               <div>
                 <label htmlFor="companyName" className="block text-sm font-medium text-black dark:text-white mb-2">
                   Company Name *
                 </label>
                 <input
                   type="text"
                   id="companyName"
                   value={editFormData.companyName}
                   onChange={(e) => handleEditFormChange('companyName', e.target.value)}
                   className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                   placeholder="Enter company name"
                   required
                 />
               </div>

               {/* User Name Field */}
               <div>
                 <label htmlFor="userName" className="block text-sm font-medium text-black dark:text-white mb-2">
                   Contact Person Name *
                 </label>
                 <input
                   type="text"
                   id="userName"
                   value={editFormData.userName}
                   onChange={(e) => handleEditFormChange('userName', e.target.value)}
                   className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                   placeholder="Enter contact person name"
                   required
                 />
               </div>

               {/* Email Field */}
               <div>
                 <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white mb-2">
                   Email Address *
                 </label>
                 <input
                   type="email"
                   id="email"
                   value={editFormData.email}
                   onChange={(e) => handleEditFormChange('email', e.target.value)}
                   className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                   placeholder="Enter email address"
                   required
                 />
               </div>

               {/* Phone Field */}
               <div>
                 <label htmlFor="mobile_no" className="block text-sm font-medium text-black dark:text-white mb-2">
                   Phone Number
                 </label>
                 <input
                   type="tel"
                   id="mobile_no"
                   value={editFormData.mobile_no}
                   onChange={(e) => handleEditFormChange('mobile_no', e.target.value)}
                   className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                   placeholder="Enter phone number"
                 />
               </div>

               {/* Address Field */}
               <div>
                 <label htmlFor="address" className="block text-sm font-medium text-black dark:text-white mb-2">
                   Address
                 </label>
                 <textarea
                   id="address"
                   value={editFormData.address}
                   onChange={(e) => handleEditFormChange('address', e.target.value)}
                   className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                   placeholder="Enter address"
                   rows={3}
                 />
               </div>

               {/* Password Field */}
               <div>
                 <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white mb-2">
                   New Password
                 </label>
                 <input
                   type="password"
                   id="password"
                   value={editFormData.password}
                   onChange={(e) => handleEditFormChange('password', e.target.value)}
                   className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                   placeholder="Leave blank to keep current password"
                 />
                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                   Leave blank to keep the current password unchanged
                 </p>
               </div>

               {/* Status Field */}
               <div>
                 <label htmlFor="status" className="block text-sm font-medium text-black dark:text-white mb-2">
                   Status
                 </label>
                 <select
                   id="status"
                   value={editFormData.status}
                   onChange={(e) => handleEditFormChange('status', e.target.value)}
                   className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                 >
                   <option value="1">Active</option>
                   <option value="0">Inactive</option>
                 </select>
               </div>

               {/* Read-only Information */}
               <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                 <div>
                   <div className="text-sm text-gray-500 dark:text-gray-400">Seller ID</div>
                   <div className="font-medium text-black dark:text-white">
                     {editingSeller._id}
                   </div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-500 dark:text-gray-400">Registration Date</div>
                   <div className="font-medium text-black dark:text-white">
                     {editingSeller.createdAt ? new Date(editingSeller.createdAt).toLocaleDateString() : 'Unknown'}
                   </div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-500 dark:text-gray-400">Last Updated</div>
                   <div className="font-medium text-black dark:text-white">
                     {editingSeller.updatedAt ? new Date(editingSeller.updatedAt).toLocaleDateString() : 'Unknown'}
                   </div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-500 dark:text-gray-400">Role Level</div>
                   <div className="font-medium text-black dark:text-white">
                     {editingSeller.roleLevel || 'N/A'}
                   </div>
                 </div>
               </div>

               {/* Form Actions */}
               <div className="flex items-center justify-end gap-4 pt-4 border-t border-stroke dark:border-strokedark">
                 <button
                   type="button"
                   onClick={handleCloseEditModal}
                   className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                   disabled={editLoading}
                 >
                   Cancel
                 </button>
                 <button
                   type="submit"
                   className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
                   disabled={editLoading}
                 >
                   {editLoading ? (
                     <>
                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                       Updating...
                     </>
                   ) : (
                     'Update Seller'
                   )}
                 </button>
               </div>
             </form>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 } 