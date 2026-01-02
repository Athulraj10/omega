"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reducer';

export default function UserDataDebug() {
  const userState = useSelector((state: RootState) => state.users);
  
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">User Data Debug</h3>
      <div className="text-sm">
        <div><strong>Loading:</strong> {userState.loading ? 'true' : 'false'}</div>
        <div><strong>Error:</strong> {userState.error || 'none'}</div>
        <div><strong>Users Count:</strong> {userState.users?.length || 0}</div>
        <div><strong>Pagination:</strong> {JSON.stringify(userState.pagination)}</div>
        <div><strong>Raw Users Data:</strong></div>
        <pre className="bg-white dark:bg-gray-900 p-2 rounded text-xs overflow-auto max-h-40">
          {JSON.stringify(userState.users, null, 2)}
        </pre>
      </div>
    </div>
  );
} 