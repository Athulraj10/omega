"use client";

import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import { url } from '@/utils/helper';

const DebugPage = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [environment, setEnvironment] = useState<any>({});

  useEffect(() => {
    // Gather environment information
    const envInfo = {
      apiUrl: url,
      userAgent: navigator.userAgent,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString(),
      localStorage: typeof window !== 'undefined' ? 'Available' : 'Not Available',
      sessionStorage: typeof window !== 'undefined' ? 'Available' : 'Not Available',
    };
    setEnvironment(envInfo);
  }, []);

  const addResult = (test: string, success: boolean, data?: any, error?: any) => {
    setResults(prev => [...prev, {
      test,
      success,
      data,
      error: error ? {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        code: error.code,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
        }
      } : null,
      timestamp: new Date().toISOString()
    }]);
  };

  const runDiagnostics = async () => {
    setLoading(true);
    setResults([]);

    console.log('🔍 Starting diagnostics...');

    // Test 1: Environment check
    console.log('🧪 Testing environment...');
    addResult('Environment Check', true, environment);

    // Test 2: API configuration
    console.log('🧪 Testing API configuration...');
    try {
      const config = api.defaults;
      addResult('API Configuration', true, {
        baseURL: config.baseURL,
        timeout: config.timeout,
        headers: config.headers,
      });
    } catch (error: any) {
      addResult('API Configuration', false, null, error);
    }

    // Test 3: Simple fetch test
    console.log('🧪 Testing basic fetch...');
    try {
      const response = await fetch(`${url}/admin/health`);
      const data = await response.json();
      addResult('Basic Fetch Test', true, { status: response.status, data });
    } catch (error: any) {
      addResult('Basic Fetch Test', false, null, error);
    }

    // Test 4: Axios health check
    console.log('🧪 Testing axios health check...');
    try {
      const response = await api.get('/admin/health');
      addResult('Axios Health Check', true, response.data);
    } catch (error: any) {
      addResult('Axios Health Check', false, null, error);
    }

    // Test 5: Currencies endpoint
    console.log('🧪 Testing currencies endpoint...');
    try {
      const response = await api.get('/admin/currencies');
      addResult('Currencies Endpoint', true, response.data);
    } catch (error: any) {
      addResult('Currencies Endpoint', false, null, error);
    }

    // Test 6: Users endpoint
    console.log('🧪 Testing users endpoint...');
    try {
      const response = await api.get('/admin/users');
      addResult('Users Endpoint', true, response.data);
    } catch (error: any) {
      addResult('Users Endpoint', false, null, error);
    }

    // Test 7: Categories endpoint
    console.log('🧪 Testing categories endpoint...');
    try {
      const response = await api.get('/admin/categories/active');
      addResult('Categories Endpoint', true, response.data);
    } catch (error: any) {
      addResult('Categories Endpoint', false, null, error);
    }

    // Test 8: Test endpoint
    console.log('🧪 Testing test endpoint...');
    try {
      const response = await api.get('/admin/test');
      addResult('Test Endpoint', true, response.data);
    } catch (error: any) {
      addResult('Test Endpoint', false, null, error);
    }

    setLoading(false);
    console.log('✅ Diagnostics completed');
  };

  const clearResults = () => {
    setResults([]);
  };

  const copyResults = () => {
    const resultsText = JSON.stringify(results, null, 2);
    navigator.clipboard.writeText(resultsText);
    alert('Results copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🔍 Frontend Diagnostics
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Environment Info
              </h3>
              <div className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <div>API URL: {environment.apiUrl}</div>
                <div>User Agent: {environment.userAgent?.substring(0, 50)}...</div>
                <div>Window Size: {environment.windowSize}</div>
                <div>LocalStorage: {environment.localStorage}</div>
                <div>Timestamp: {environment.timestamp}</div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={runDiagnostics}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Running Diagnostics...' : 'Run Full Diagnostics'}
                </button>
                <button
                  onClick={clearResults}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Clear Results
                </button>
                <button
                  onClick={copyResults}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Copy Results
                </button>
              </div>
            </div>
          </div>
        </div>

        {results.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Diagnostic Results
            </h2>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.success
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                      : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {result.test}
                    </h3>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        result.success
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
                      }`}
                    >
                      {result.success ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  
                  {result.success && result.data && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Response Data:
                      </h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-auto max-h-40">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  {!result.success && result.error && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">
                        Error Details:
                      </h4>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-sm">
                        <div><strong>Message:</strong> {result.error.message}</div>
                        {result.error.status && (
                          <div><strong>Status:</strong> {result.error.status} {result.error.statusText}</div>
                        )}
                        {result.error.code && (
                          <div><strong>Code:</strong> {result.error.code}</div>
                        )}
                        {result.error.config && (
                          <div><strong>Request:</strong> {result.error.config.method} {result.error.config.url}</div>
                        )}
                        {result.error.data && (
                          <div className="mt-2">
                            <strong>Response Data:</strong>
                            <pre className="bg-red-100 dark:bg-red-900/40 p-2 rounded text-xs overflow-auto max-h-32 mt-1">
                              {JSON.stringify(result.error.data, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Troubleshooting Guide
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Common Issues & Solutions
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>404 Errors:</strong> Backend server not running</li>
                <li>• <strong>Network Errors:</strong> CORS issues or wrong port</li>
                <li>• <strong>Database Errors:</strong> MongoDB not running</li>
                <li>• <strong>Port Conflicts:</strong> Change port in .env file</li>
                <li>• <strong>Auth Errors:</strong> Check localStorage for token</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Quick Fixes
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Start backend: <code>cd ad-backend && npm run start-dev</code></li>
                <li>• Start MongoDB: <code>docker run -d -p 27017:27017 mongo:latest</code></li>
                <li>• Clear browser cache and localStorage</li>
                <li>• Check if ports 3000 and 3001 are available</li>
                <li>• Verify .env files are configured correctly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPage; 