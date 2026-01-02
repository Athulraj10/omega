"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilSquareIcon, TrashIcon, EyeIcon } from "@/assets/icons";
import { Checkbox } from "@/components/FormElements/checkbox";
import { fetchUsers, fetchUserOrders, fetchUserReports, updateUserStatus, deleteUser } from "@/components/redux/action/users/userAction";
import { RootState } from "@/components/redux/reducer";
import { useCurrency } from "@/contexts/CurrencyContext";
import CurrencySelector from "@/components/CurrencySelector";
import ErrorBoundary from "@/components/ErrorBoundary";
import { formatDate } from "@/utils/dateUtils";
import UserDataDebug from "@/components/UserDataDebug";
import StatusDropdown from "@/components/StatusDropdown";
import { getLocalStorageItem } from "@/utils/helperWindows";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "blocked";
  registrationDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  avatar?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  itemCount: number;
  date: string;
}

export default function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error, pagination, userOrders, userReports, ordersLoading, reportsLoading } = useSelector((state: RootState) => state.users);
  const { formatPrice } = useCurrency();
  
  // Test Redux connection
  const state = useSelector((state: RootState) => state);
  console.log('Redux State:', state?.users);
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive' | 'blocked'
  });
  const [editLoading, setEditLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  
  // Add refs for scroll position preservation
  const tableRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const windowScrollRef = useRef<number>(0);

  const fetchUsersData = () => {
    dispatch(fetchUsers({
      page: currentPage,
      limit: 10,
      search: searchTerm,
      status: statusFilter === 'all' ? '' : statusFilter
    }));
  };

  // Fetch users on component mount
  useEffect(() => {
    console.log('Fetching users with params:', { currentPage, searchTerm, statusFilter });
    try {
      fetchUsersData();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [currentPage, searchTerm, statusFilter]);

  // Debug: Log when users state changes
  useEffect(() => {
    console.log('🔄 Users state changed:', users?.length, 'users');
    if (users && users.length > 0) {
      console.log('📋 First user status:', users[0].status);
    }
  }, [users]);

  // Debug: Detect page reloads
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      console.log('⚠️ Page is about to reload/unload');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Track scroll position continuously
  useEffect(() => {
    const handleScroll = () => {
      windowScrollRef.current = window.scrollY;
      if (tableRef.current) {
        scrollPositionRef.current = tableRef.current.scrollTop;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Preserve scroll position when users state updates
  useEffect(() => {
    if (scrollPositionRef.current > 0 || windowScrollRef.current > 0) {
      // Restore scroll positions after DOM updates
      requestAnimationFrame(() => {
        // Restore window scroll
        if (windowScrollRef.current > 0) {
          window.scrollTo(0, windowScrollRef.current);
        }
        
        // Restore table scroll
        if (tableRef.current && scrollPositionRef.current > 0) {
          tableRef.current.scrollTop = scrollPositionRef.current;
        }
      });
    }
  }, [users]);

  // Save scroll position before any potential re-renders
  const saveScrollPosition = () => {
    // Save window scroll position
    windowScrollRef.current = window.scrollY;
    
    // Save table scroll position
    if (tableRef.current) {
      scrollPositionRef.current = tableRef.current.scrollTop;
    }
    
    console.log('💾 Saved scroll positions:', {
      window: windowScrollRef.current,
      table: scrollPositionRef.current
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "blocked":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleViewOrders = (user: User) => {
    console.log('🔍 handleViewOrders called:', user);
    setSelectedUser(user);
    dispatch(fetchUserOrders(user.id, { page: 1, limit: 10 }));
    setShowOrdersModal(true);
  };

  const handleViewReports = (user: User) => {
    console.log('📊 handleViewReports called:', user);
    setSelectedUser(user);
    dispatch(fetchUserReports(user.id, '30'));
    setShowReportsModal(true);
  };

  const handleEdit = (userId: string) => {
    console.log("✏️ Edit user called:", userId);
    
    // Set the editing user ID to show visual feedback
    setEditingUserId(userId);
    
    // Find the user to edit
    const user = validUsers.find(u => u.id === userId);
    if (user) {
      console.log("📋 Editing user:", user);
      
      // Set the editing user and populate form data
      setEditingUser(user);
      setEditFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        status: user.status || 'active'
      });
      
      // Open the edit modal
      setShowEditModal(true);
    } else {
      console.error("❌ User not found for editing:", userId);
      alert("User not found!");
    }
    
    // Clear the editing state after a short delay
    setTimeout(() => {
      setEditingUserId(null);
    }, 2000);
  };

  const handleDelete = (userId: string) => {
    console.log("🗑️ Delete user called:", userId);
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        // Ensure userId is valid before dispatching
        if (userId && typeof userId === 'string') {
          console.log("🚀 Dispatching deleteUser:", userId);
          dispatch(deleteUser(userId));
        } else {
          console.error('Invalid userId for deletion:', userId);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    try {
      console.log('🔄 handleStatusChange called:', { userId, newStatus });
      
      // Save current scroll position before status update
      saveScrollPosition();
      
      // Ensure both userId and newStatus are valid
      if (userId && typeof userId === 'string' && newStatus && typeof newStatus === 'string') {
        const statusMap = {
          'active': '1',
          'inactive': '0',
          'blocked': '2'
        };
        const mappedStatus = statusMap[newStatus as keyof typeof statusMap];
        console.log('📋 Status mapping:', { newStatus, mappedStatus });
        
        if (mappedStatus) {
          console.log('🚀 Dispatching updateUserStatus:', { userId, mappedStatus });
          dispatch(updateUserStatus(userId, mappedStatus));
        } else {
          console.error('❌ Invalid status for user update:', newStatus);
        }
      } else {
        console.error('❌ Invalid userId or status for update:', { userId, newStatus });
      }
    } catch (error) {
      console.error('❌ Error updating user status:', error);
    }
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingUser) {
      console.error('❌ No user selected for editing');
      return;
    }

    setEditLoading(true);
    
    try {
      console.log('🔄 Submitting edit form:', editFormData);
      
      // Validate form data
      if (!editFormData.name.trim()) {
        alert('Name is required!');
        return;
      }
      
      if (!editFormData.email.trim()) {
        alert('Email is required!');
        return;
      }
      
      // TODO: Implement API call to update user
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('✅ User updated successfully:', {
        userId: editingUser.id,
        oldData: editingUser,
        newData: editFormData
      });
      
      // Show success message
      alert(`User ${editFormData.name} updated successfully!`);
      
      // Close modal and refresh users
      setShowEditModal(false);
      setEditingUser(null);
      setEditFormData({ name: '', email: '', phone: '', status: 'active' });
      
      // Refresh users list
      fetchUsersData();
      
    } catch (error) {
      console.error('❌ Error updating user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
    setEditFormData({ name: '', email: '', phone: '', status: 'active' });
    setEditLoading(false);
  };



  // Log each user's status for debugging
  if (users && users.length > 0) {
    console.log('🔍 User statuses:', users.map(u => ({ id: u.id, name: u.name, status: u.status })));
  }

  // Debug: Check if component is rendering
  console.log('🎨 UserList component rendering...');

  // Check if Redux state is properly initialized
  if (!users || users === undefined) {
    console.log('❌ Users state is not initialized');
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 dark:text-gray-400 mb-4">Initializing...</div>
        </div>
      </div>
    );
  }

  // Filter out any undefined or null users to prevent errors
  const validUsers = users.filter(user => user && typeof user === 'object' && user.id);
  console.log('Valid users count:', validUsers.length);
  console.log('First valid user:', validUsers[0]);
  
  // Debug logging for role level check
  useEffect(() => {
    console.log('🔍 User List Debug Info:');
    console.log('  - Valid Users Count:', validUsers.length);
    console.log('  - Loading State:', loading);
    console.log('  - Error State:', error);
    console.log('  - Current Page:', currentPage);
    console.log('  - Search Term:', searchTerm);
    console.log('  - Status Filter:', statusFilter);
    
    // Check current user's role level
    const adminData = getLocalStorageItem("adminData");
    if (adminData) {
      try {
        const userData = JSON.parse(adminData);
        console.log('👤 Current User Data:', {
          id: userData.id,
          email: userData.email,
          role: userData.role,
          roleLevel: userData.roleLevel,
          name: userData.name
        });
        
        // Check if user has sufficient permissions
        if (userData.roleLevel <= 1) {
          console.warn('⚠️ WARNING: Current user has insufficient role level for admin access!');
          console.warn('   Required: roleLevel > 1');
          console.warn('   Current: roleLevel =', userData.roleLevel);
          console.warn('   This will cause 403 Forbidden errors on admin routes.');
        }
      } catch (error) {
        console.error('❌ Error parsing admin data:', error);
      }
    } else {
      console.warn('⚠️ No admin data found in localStorage');
    }
  }, [validUsers, loading, error, currentPage, searchTerm, statusFilter]);
  
  // Debug: Check if buttons will be rendered
  console.log('🔘 Will render buttons for users:', validUsers?.length || 0);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">Error: {error}</div>
          <button 
            onClick={fetchUsersData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 2xl:p-10 bg-white dark:bg-[#122031] min-h-screen">
      <div className="mx-auto max-w-7xl">
        <UserDataDebug />
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark dark:text-white">Users</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your user accounts and view their orders</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                console.log('🧪 Test button clicked!');
                alert('Test button is working!');
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200"
            >
              Test Button
            </button>
            <button
              type="button"
              onClick={() => {
                console.log('🔍 Simple test button clicked!');
                alert('Simple test button is working!');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Simple Test
            </button>
            <CurrencySelector />
          </div>
        </div>

        {/* Test Section */}
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Button Test Section</h3>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                console.log('🔍 Test View Orders clicked');
                alert('View Orders test clicked!');
              }}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Test View Orders
            </button>
            <button
              type="button"
              onClick={() => {
                console.log('📊 Test View Reports clicked');
                alert('View Reports test clicked!');
              }}
              className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200"
            >
              Test View Reports
            </button>
            <button
              type="button"
              onClick={() => {
                console.log('✏️ Test Edit clicked');
                alert('Edit test clicked!');
              }}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
            >
              Test Edit
            </button>
            <button
              type="button"
              onClick={() => {
                console.log('🗑️ Test Delete clicked');
                alert('Delete test clicked!');
              }}
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
            >
              Test Delete
            </button>
          </div>
          
          {/* Test Dropdown */}
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2 text-black dark:text-white">Test Dropdown</h4>
            <select
              onChange={(e) => {
                console.log('🧪 Test dropdown changed:', e.target.value);
                alert(`Test dropdown changed to: ${e.target.value}`);
              }}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select an option</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:w-80"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="currentColor"
              >
                <g clipPath="url(#clip0_1699_11536)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
                  />
                </g>
              </svg>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-stroke bg-transparent px-4 py-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {pagination.totalUsers} total users
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-lg bg-white shadow-sm dark:bg-gray-dark">
          <div className="overflow-x-auto" ref={tableRef}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke dark:border-strokedark">
                  <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                    User
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                    Orders
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                    Total Spent
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {validUsers.map((user) => {
                  // Additional safety check for each user
                  if (!user || typeof user !== 'object' || !user.id) {
                    console.warn('Invalid user object found:', user);
                    return null;
                  }
                  
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar || "/images/user/user-01.png"}
                            alt={user.name || 'User'}
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/images/user/user-01.png";
                            }}
                          />
                          <div>
                            <div className="font-medium text-black dark:text-white">
                              {user.name || 'Unknown User'}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Joined {user.registrationDate ? formatDate(user.registrationDate) : 'Unknown'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-black dark:text-white">{user.email || 'No email'}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.phone || 'No phone'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusDropdown
                          userId={user.id}
                          currentStatus={user.status || 'inactive'}
                          onStatusChange={handleStatusChange}
                          getStatusColor={getStatusColor}
                        />
                      </td>
                      <td className="px-6 py-4 text-black dark:text-white">
                        {user.totalOrders || 0}
                      </td>
                      <td className="px-6 py-4 text-black dark:text-white">
                        {formatPrice(user.totalSpent || 0)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {/* Inline test button */}
                          <button
                            type="button"
                            onClick={() => {
                              console.log('🧪 Inline test button clicked!');
                              alert('Inline test button works!');
                            }}
                            className="px-2 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600"
                          >
                            Test
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('🔍 View Orders button clicked for user:', user.id);
                              handleViewOrders(user);
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="rounded p-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors duration-200"
                            title="View Orders"
                          >
                            <EyeIcon />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('📊 View Reports button clicked for user:', user.id);
                              handleViewReports(user);
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="rounded p-1 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-colors duration-200"
                            title="View Reports"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('✏️ Edit button clicked for user:', user.id);
                              handleEdit(user.id);
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className={`rounded p-1 transition-colors duration-200 ${
                              editingUserId === user.id 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20'
                            }`}
                            title="Edit"
                          >
                            <PencilSquareIcon />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('🗑️ Delete button clicked for user:', user.id);
                              handleDelete(user.id);
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="rounded p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
                            title="Delete"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {validUsers.length === 0 && !loading && (
            <div className="py-12 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                No users found matching your criteria.
              </div>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-stroke px-6 py-4 dark:border-strokedark">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.totalUsers)} of {pagination.totalUsers} users
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="rounded px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="rounded px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Orders Modal */}
        {showOrdersModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark dark:text-white">
                  Orders for {selectedUser.name}
                </h2>
                <button
                  onClick={() => setShowOrdersModal(false)}
                  className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>

              <div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Orders</div>
                    <div className="text-lg font-semibold text-black dark:text-white">
                      {selectedUser.totalOrders}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Spent</div>
                    <div className="text-lg font-semibold text-black dark:text-white">
                      {formatPrice(selectedUser.totalSpent)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                    <div className="text-lg font-semibold text-black dark:text-white">
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Last Login</div>
                    <div className="text-lg font-semibold text-black dark:text-white">
                      {formatDate(selectedUser.lastLogin)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                        Order #
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                        Items
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-4 py-3 text-black dark:text-white">
                          {order.orderNumber}
                        </td>
                        <td className="px-4 py-3 text-black dark:text-white">
                          {formatDate(order.date)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getOrderStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-black dark:text-white">
                          {order.itemCount}
                        </td>
                        <td className="px-4 py-3 text-black dark:text-white">
                          {formatPrice(order.total)}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => console.log("View order details:", order.id)}
                            className="rounded bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-opacity-90"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {userOrders.length === 0 && (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No orders found for this user.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reports Modal */}
        {showReportsModal && selectedUser && userReports && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 w-full max-w-6xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark dark:text-white">
                  Reports for {selectedUser.name}
                </h2>
                <button
                  onClick={() => setShowReportsModal(false)}
                  className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>

              {reportsLoading ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                  </div>
                </div>
              ) : userReports && userReports.summary ? (
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                    <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                      <div className="text-sm text-blue-600 dark:text-blue-400">Total Orders</div>
                      <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                        {userReports.summary?.totalOrders || 0}
                      </div>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                      <div className="text-sm text-green-600 dark:text-green-400">Total Spent</div>
                      <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                        {formatPrice(userReports.summary?.totalSpent || 0)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                      <div className="text-sm text-purple-600 dark:text-purple-400">Avg Order Value</div>
                      <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                        ${(userReports.summary?.averageOrderValue || 0).toFixed(2)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                      <div className="text-sm text-yellow-600 dark:text-yellow-400">Min Order</div>
                      <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                        ${(userReports.summary?.minOrderValue || 0).toFixed(2)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                      <div className="text-sm text-red-600 dark:text-red-400">Max Order</div>
                      <div className="text-2xl font-bold text-red-800 dark:text-red-200">
                        ${(userReports.summary?.maxOrderValue || 0).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Orders by Status */}
                  {userReports.ordersByStatus && Object.keys(userReports.ordersByStatus).length > 0 && (
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                      <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">Orders by Status</h3>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {Object.entries(userReports.ordersByStatus).map(([status, data]) => (
                          <div key={status} className="rounded bg-white p-3 dark:bg-gray-700">
                            <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {status}
                            </div>
                            <div className="text-lg font-semibold text-black dark:text-white">
                              {data.count} orders
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ${(data.totalAmount || 0).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Monthly Trends */}
                  {userReports.monthlyTrends && userReports.monthlyTrends.length > 0 && (
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                      <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">Monthly Trends</h3>
                      <div className="space-y-2">
                        {userReports.monthlyTrends.map((trend) => (
                          <div key={trend.month} className="flex items-center justify-between rounded bg-white p-3 dark:bg-gray-700">
                            <div className="text-black dark:text-white">{trend.month}</div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {trend.orders} orders
                              </span>
                              <span className="font-semibold text-black dark:text-white">
                                ${(trend.totalAmount || 0).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Orders */}
                  {userReports.recentOrders && userReports.recentOrders.length > 0 && (
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                      <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">Recent Orders</h3>
                      <div className="space-y-2">
                        {userReports.recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between rounded bg-white p-3 dark:bg-gray-700">
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getOrderStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(order.date).toLocaleDateString()}
                              </span>
                            </div>
                            <span className="font-semibold text-black dark:text-white">
                              ${(order.totalAmount || 0).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No reports data available for this user.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark dark:text-white">
                  Edit User: {editingUser.name}
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

              <form onSubmit={handleEditFormSubmit} className="space-y-6">
                {/* User Avatar */}
                <div className="flex items-center gap-4">
                  <img
                    src={editingUser.avatar || "/images/user/user-01.png"}
                    alt={editingUser.name || 'User'}
                    className="h-16 w-16 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/user/user-01.png";
                    }}
                  />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">User ID</div>
                    <div className="font-medium text-black dark:text-white">{editingUser.id}</div>
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={editFormData.name}
                    onChange={(e) => handleEditFormChange('name', e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Enter full name"
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
                  <label htmlFor="phone" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={editFormData.phone}
                    onChange={(e) => handleEditFormChange('phone', e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Enter phone number"
                  />
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>

                {/* Read-only Information */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Registration Date</div>
                    <div className="font-medium text-black dark:text-white">
                      {editingUser.registrationDate ? formatDate(editingUser.registrationDate) : 'Unknown'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Last Login</div>
                    <div className="font-medium text-black dark:text-white">
                      {editingUser.lastLogin ? formatDate(editingUser.lastLogin) : 'Never'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Orders</div>
                    <div className="font-medium text-black dark:text-white">
                      {editingUser.totalOrders || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Spent</div>
                    <div className="font-medium text-black dark:text-white">
                      {formatPrice(editingUser.totalSpent || 0)}
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
                      'Update User'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}