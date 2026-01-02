"use client";

import React, { useState } from 'react';
import api from '@/utils/api';

const ApiTest: React.FC = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test: string, success: boolean, data?: any, error?: any) => {
    setTestResults(prev => [...prev, {
      test,
      success,
      data,
      error,
      timestamp: new Date().toISOString()
    }]);
  };

  const testBackendConnection = async () => {
    setLoading(true);
    setTestResults([]);

    try {
      // Test 1: Health check
      console.log('🧪 Testing health endpoint...');
      const healthResponse = await api.get('/admin/health');
      addResult('Health Check', true, healthResponse.data);
      console.log('✅ Health check passed:', healthResponse.data);
    } catch (error: any) {
      addResult('Health Check', false, null, error);
      console.error('❌ Health check failed:', error);
    }

    try {
      // Test 2: Currencies endpoint
      console.log('🧪 Testing currencies endpoint...');
      const currenciesResponse = await api.get('/admin/currencies');
      addResult('Currencies', true, currenciesResponse.data);
      console.log('✅ Currencies test passed:', currenciesResponse.data);
    } catch (error: any) {
      addResult('Currencies', false, null, error);
      console.error('❌ Currencies test failed:', error);
    }

    try {
      // Test 3: Users endpoint
      console.log('🧪 Testing users endpoint...');
      const usersResponse = await api.get('/admin/users');
      addResult('Users', true, usersResponse.data);
      console.log('✅ Users test passed:', usersResponse.data);
    } catch (error: any) {
      addResult('Users', false, null, error);
      console.error('❌ Users test failed:', error);
    }

    try {
      // Test 4: Categories endpoint
      console.log('🧪 Testing categories endpoint...');
      const categoriesResponse = await api.get('/admin/categories/active');
      addResult('Categories', true, categoriesResponse.data);
      console.log('✅ Categories test passed:', categoriesResponse.data);
    } catch (error: any) {
      addResult('Categories', false, null, error);
      console.error('❌ Categories test failed:', error);
    }

    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        API Connection Test
      </h2>
      
      <div className="mb-4 space-y-2">
        <button
          onClick={testBackendConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test API Connection'}
        </button>
        
        <button
          onClick={clearResults}
          className="ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Clear Results
        </button>
      </div>

      {testResults.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Test Results:
          </h3>
          
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-3 rounded border ${
                result.success
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                  : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  {result.test}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    result.success
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
                  }`}
                >
                  {result.success ? 'PASS' : 'FAIL'}
                </span>
              </div>
              
              {result.success && result.data && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
              
              {!result.success && result.error && (
                <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                  <div>Status: {result.error.response?.status || 'Network Error'}</div>
                  <div>Message: {result.error.message}</div>
                  {result.error.response?.data && (
                    <pre className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-xs overflow-auto mt-1">
                      {JSON.stringify(result.error.response.data, null, 2)}
                    </pre>
                  )}
                </div>
              )}
              
              <div className="mt-1 text-xs text-gray-500">
                {new Date(result.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
          Troubleshooting Tips:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li>• Make sure the backend server is running on port 3000</li>
          <li>• Check if MongoDB is running and accessible</li>
          <li>• Verify the API base URL in the console</li>
          <li>• Check for CORS issues in the browser console</li>
          <li>• Ensure all environment variables are set correctly</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTest; 