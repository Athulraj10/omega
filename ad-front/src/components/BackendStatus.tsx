"use client";

import React, { useState, useEffect } from 'react';

const BackendStatus = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [details, setDetails] = useState<any>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkBackendStatus = async () => {
    setStatus('checking');
    setLastCheck(new Date());

    try {
      // Try to fetch the health endpoint
      const response = await fetch('http://localhost:8001/admin/health', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Short timeout to avoid hanging
        signal: AbortSignal.timeout(5000)
      });

      if (response.ok) {
        const data = await response.json();
        setStatus('online');
        setDetails({
          status: response.status,
          data,
          headers: Object.fromEntries(response.headers.entries())
        });
      } else {
        setStatus('offline');
        setDetails({
          status: response.status,
          statusText: response.statusText,
          error: 'Backend responded with error status'
        });
      }
    } catch (error: any) {
      setStatus('offline');
      setDetails({
        error: error.message,
        type: error.name,
        code: error.code
      });
    }
  };

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'offline':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      case 'checking':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'online':
        return '🟢';
      case 'offline':
        return '🔴';
      case 'checking':
        return '🟡';
      default:
        return '⚪';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Backend Status
        </h3>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {getStatusIcon()} {status.toUpperCase()}
          </span>
          <button
            onClick={checkBackendStatus}
            disabled={status === 'checking'}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {status === 'checking' ? 'Checking...' : 'Refresh'}
          </button>
        </div>
      </div>

      {lastCheck && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Last checked: {lastCheck.toLocaleTimeString()}
        </div>
      )}

      {details && (
        <div className="space-y-2">
          {status === 'online' && (
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
              <h4 className="font-medium text-green-900 dark:text-green-200 mb-2">
                Backend is running successfully!
              </h4>
              <div className="text-sm text-green-800 dark:text-green-300 space-y-1">
                <div>Status: {details.status}</div>
                <div>Message: {details.data?.message}</div>
                <div>Environment: {details.data?.environment}</div>
                <div>Version: {details.data?.version}</div>
              </div>
            </div>
          )}

          {status === 'offline' && (
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
              <h4 className="font-medium text-red-900 dark:text-red-200 mb-2">
                Backend is not accessible
              </h4>
              <div className="text-sm text-red-800 dark:text-red-300 space-y-1">
                {details.status && <div>HTTP Status: {details.status}</div>}
                {details.statusText && <div>Status Text: {details.statusText}</div>}
                {details.error && <div>Error: {details.error}</div>}
                {details.code && <div>Code: {details.code}</div>}
              </div>
            </div>
          )}

          {status === 'checking' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                <span className="text-yellow-800 dark:text-yellow-200">
                  Checking backend status...
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {status === 'offline' && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
          <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
            How to fix:
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Make sure the backend server is running</li>
            <li>• Check if MongoDB is running</li>
            <li>• Verify the backend is on port 8001</li>
            <li>• Check the backend terminal for errors</li>
            <li>• Ensure all environment variables are set</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BackendStatus; 