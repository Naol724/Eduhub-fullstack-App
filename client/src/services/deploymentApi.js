import axios from 'axios';
import { toast } from 'react-hot-toast';
import mockApi from './mockApi';

// Check if we're in deployment mode (no backend available)
const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API === 'true' || 
                       process.env.NODE_ENV === 'production' && !process.env.REACT_APP_API_URL;

// Create axios instance for real API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // If we're in deployment mode and get a network error, switch to mock API
    if (USE_MOCK_API && (!error.response && (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK'))) {
      console.log('Backend unavailable, switching to mock data for demo');
      return Promise.reject({ useMock: true });
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }

    // Handle other error status codes
    if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (error.response?.status === 404) {
      toast.error('Resource not found.');
    } else if (error.response?.status === 429) {
      toast.error('Too many requests. Please slow down.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    } else if (!error.response) {
      toast.error('Network error. Please check your connection.');
    }

    return Promise.reject(error);
  }
);

// Create a wrapper that uses mock API when needed
const createApiWrapper = (mockEndpoints) => {
  return new Proxy({}, {
    get(target, prop) {
      return new Proxy({}, {
        get(target, method) => {
          return async (...args) => {
            if (USE_MOCK_API) {
              try {
                return await mockEndpoints[prop][method](...args);
              } catch (error) {
                // Convert mock errors to axios-like format
                throw {
                  response: {
                    data: { message: error.message },
                    status: 400
                  }
                };
              }
            } else {
              try {
                return await api[prop][method](...args);
              } catch (error) {
                if (error.useMock) {
                  // Fallback to mock API on network error
                  try {
                    return await mockEndpoints[prop][method](...args);
                  } catch (mockError) {
                    throw {
                      response: {
                        data: { message: mockError.message },
                        status: 400
                      }
                    };
                  }
                }
                throw error;
              }
            }
          };
        }
      });
    }
  });
};

// API endpoints that work with both real and mock data
export const authAPI = createApiWrapper(mockApi.auth);
export const courseAPI = createApiWrapper(mockApi.courses);
export const enrollmentAPI = createApiWrapper(mockApi.enrollments);
export const userAPI = createApiWrapper(mockApi.users);
export const notificationAPI = createApiWrapper(mockApi.notifications);
export const forumAPI = createApiWrapper(mockApi.forums);

// Legacy exports for compatibility
export default api;

// Setup function for App.js
export const setupAxiosInterceptors = (store) => {
  window.store = store;
};
