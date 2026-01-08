import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { url } from "./helper";
import { getLocalStorageItem } from "./helperWindows";

console.log('🌐 API Base URL:', url);
console.log('🔧 Environment check:');
console.log('  - NEXT_PUBLIC_API_ENDPOINT:', process.env.NEXT_PUBLIC_API_ENDPOINT);
console.log('  - NODE_ENV:', process.env.NODE_ENV);

const api = axios.create({
  baseURL: url,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    const token = getLocalStorageItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token attached to request');
    } else {
      console.log('⚠️ No token found, making unauthenticated request');
    }
    
    // Don't override Content-Type for FormData - let axios set it automatically with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      console.log('📎 FormData detected, letting axios set Content-Type with boundary');
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    console.error(`❌ API Error: ${error.response?.status || 'NETWORK'} ${error.config?.url}`);
    
    // Log detailed error information
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
      console.error('Error Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Network Error - No response received');
      console.error('Request:', error.request);
    } else {
      console.error('Request Setup Error:', error.message);
    }

    // Check for 401 status or invalidToken message
    if (error.response?.status === 401 || (error.response?.data as any)?.meta?.code === 401) {
      console.log("🔐 Authentication error detected, clearing token and redirecting...");
      // Clear all authentication data
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("user");
        // Clear any other auth-related data
        sessionStorage.clear();
        // Redirect to login page
        window.location.href = "/sign-in";
      }
    } else if (error.response?.status === 404) {
      console.log("🔍 404 Error - Endpoint not found. Backend might not be running.");
    } else if (error.code === 'ERR_NETWORK' || error.message?.includes('fetch')) {
      console.log("🌐 Network Error - Backend server might not be running or CORS issue.");
    }

    return Promise.reject(error);
  },
);

export default api;
