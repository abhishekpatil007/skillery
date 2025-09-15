import { ApiResponse, ApiError } from '@/types/api';

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === '1';

// Request configuration
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
  timeout?: number;
}

// Default timeout in milliseconds
const DEFAULT_TIMEOUT = 10000;

// Create abort controller with timeout
function createTimeoutController(timeout: number = DEFAULT_TIMEOUT): AbortController {
  const controller = new AbortController();
  
  setTimeout(() => {
    controller.abort();
  }, timeout);
  
  return controller;
}

// Normalize API errors
function normalizeError(error: unknown): ApiError {
  if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
    return {
      code: 'TIMEOUT',
      message: 'Request timed out',
      statusCode: 408,
    };
  }
  
  if (error && typeof error === 'object' && 'response' in error) {
    // Server responded with error status
    const response = error.response as { status: number; data?: { code?: string; message?: string; details?: Record<string, unknown> } };
    return {
      code: response.data?.code || 'SERVER_ERROR',
      message: response.data?.message || 'Server error occurred',
      details: response.data?.details,
      statusCode: response.status,
    };
  }
  
  if (error && typeof error === 'object' && 'request' in error) {
    // Network error
    return {
      code: 'NETWORK_ERROR',
      message: 'Network error - please check your connection',
      statusCode: 0,
    };
  }
  
  // Other errors
  return {
    code: 'UNKNOWN_ERROR',
    message: (error as Error)?.message || 'An unknown error occurred',
    statusCode: 500,
  };
}

// Main fetch wrapper
export async function fetchJson<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    signal,
    timeout = DEFAULT_TIMEOUT,
  } = config;

  // Create timeout controller if no signal provided
  const timeoutController = signal ? null : createTimeoutController(timeout);
  const abortSignal = signal || timeoutController?.signal;

  // Prepare request URL
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  // Prepare headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  // Prepare request body
  let requestBody: string | undefined;
  if (body && method !== 'GET') {
    requestBody = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: requestBody,
      signal: abortSignal,
    });

    // Parse response
    const data = await response.json();

    // Check if response is successful
    if (!response.ok) {
      throw {
        response: {
          status: response.status,
          data,
        },
      };
    }

    // Return normalized response
    return {
      data: data.data || data,
      success: true,
      message: data.message,
    };
  } catch (error) {
    const normalizedError = normalizeError(error);
    
    // Clean up timeout controller
    if (timeoutController) {
      timeoutController.abort();
    }
    
    throw normalizedError;
  }
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) =>
    fetchJson<T>(endpoint, { ...config, method: 'GET' }),
    
  post: <T>(endpoint: string, body?: unknown, config?: Omit<RequestConfig, 'method'>) =>
    fetchJson<T>(endpoint, { ...config, method: 'POST', body }),
    
  put: <T>(endpoint: string, body?: unknown, config?: Omit<RequestConfig, 'method'>) =>
    fetchJson<T>(endpoint, { ...config, method: 'PUT', body }),
    
  patch: <T>(endpoint: string, body?: unknown, config?: Omit<RequestConfig, 'method'>) =>
    fetchJson<T>(endpoint, { ...config, method: 'PATCH', body }),
    
  delete: <T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) =>
    fetchJson<T>(endpoint, { ...config, method: 'DELETE' }),
};

// Utility function to check if we should use mock data
export function shouldUseMock(): boolean {
  return USE_MOCK;
}

// Utility function to get API base URL
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

// Utility function to create query string from params
export function createQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

// Utility function to handle API errors in components
export function handleApiError(error: ApiError): string {
  switch (error.code) {
    case 'TIMEOUT':
      return 'Request timed out. Please try again.';
    case 'NETWORK_ERROR':
      return 'Network error. Please check your connection.';
    case 'UNAUTHORIZED':
      return 'Please log in to continue.';
    case 'FORBIDDEN':
      return 'You do not have permission to perform this action.';
    case 'NOT_FOUND':
      return 'The requested resource was not found.';
    case 'VALIDATION_ERROR':
      return error.message || 'Please check your input and try again.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
}
