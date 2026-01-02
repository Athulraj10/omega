"use client";

import React from 'react';

interface StatusDropdownProps {
  userId: string;
  currentStatus: string;
  onStatusChange: (userId: string, newStatus: string) => void;
  getStatusColor: (status: string) => string;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  userId,
  currentStatus,
  onStatusChange,
  getStatusColor
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    console.log('🔄 StatusDropdown change:', { userId, newStatus });
    
    // Call the status change handler immediately
    onStatusChange(userId, newStatus);
  };

  return (
    <select
      value={currentStatus || 'inactive'}
      onChange={handleChange}
      className={`rounded-full px-3 py-1 text-xs font-medium border-0 ${getStatusColor(currentStatus || 'inactive')}`}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="blocked">Blocked</option>
    </select>
  );
};

export default StatusDropdown; 