import axios from 'axios';
import { toast } from 'react-hot-toast';

// Create axios instance
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

// Response interceptor for error handling and token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          const response = await axios.post('/api/v1/auth/refresh', {
            refreshToken,
          });
          
          const { token: newToken } = response.data.data;
          localStorage.setItem('token', newToken);
          
          processQueue(null, newToken);
          
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          
          // Clear tokens and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          
          // Dispatch logout action if store is available
          if (window.store) {
            window.store.dispatch({ type: 'auth/logoutUser/fulfilled' });
          }
          
          window.location.href = '/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // No refresh token, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        
        if (window.store) {
          window.store.dispatch({ type: 'auth/logoutUser/fulfilled' });
        }
        
        window.location.href = '/login';
        return Promise.reject(error);
      }
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

// Setup function to be called from App.js
export const setupAxiosInterceptors = (store) => {
  window.store = store;
};

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
  changePassword: (passwords) => api.put('/auth/change-password', passwords),
  getProfile: () => api.get('/auth/me'),
};

export const userAPI = {
  updateProfile: (data) => api.put('/users/profile', data),
  uploadAvatar: (formData) => api.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUsers: (params) => api.get('/users', { params }),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export const courseAPI = {
  getCourses: (params) => api.get('/courses', { params }),
  getCourseBySlug: (slug) => api.get(`/courses/${slug}`),
  createCourse: (data) => api.post('/courses', data),
  updateCourse: (id, data) => api.put(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  uploadCourseImage: (id, formData) => api.post(`/courses/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getCourseLessons: (courseId) => api.get(`/courses/${courseId}/lessons`),
  createLesson: (courseId, data) => api.post(`/courses/${courseId}/lessons`, data),
  updateLesson: (courseId, lessonId, data) => api.put(`/courses/${courseId}/lessons/${lessonId}`, data),
  deleteLesson: (courseId, lessonId) => api.delete(`/courses/${courseId}/lessons/${lessonId}`),
};

export const enrollmentAPI = {
  enrollInCourse: (courseId) => api.post('/enrollments', { courseId }),
  getEnrollments: (params) => api.get('/enrollments', { params }),
  getEnrollmentById: (id) => api.get(`/enrollments/${id}`),
  getMyCourses: () => api.get('/enrollments/my-courses'),
  updateProgress: (enrollmentId, data) => api.put(`/enrollments/${enrollmentId}/progress`, data),
  dropCourse: (enrollmentId) => api.delete(`/enrollments/${enrollmentId}`),
};

export const contentAPI = {
  getContent: (lessonId) => api.get(`/content/lesson/${lessonId}`),
  createContent: (data) => api.post('/content', data),
  updateContent: (id, data) => api.put(`/content/${id}`, data),
  deleteContent: (id) => api.delete(`/content/${id}`),
  uploadVideo: (formData) => api.post('/content/upload/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadDocument: (formData) => api.post('/content/upload/document', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const forumAPI = {
  getForums: (courseId) => api.get(`/forums/course/${courseId}`),
  createForum: (data) => api.post('/forums', data),
  getForumPosts: (forumId, params) => api.get(`/forums/${forumId}/posts`, { params }),
  createPost: (forumId, data) => api.post(`/forums/${forumId}/posts`, data),
  updatePost: (postId, data) => api.put(`/forums/posts/${postId}`, data),
  deletePost: (postId) => api.delete(`/forums/posts/${postId}`),
  likePost: (postId) => api.post(`/forums/posts/${postId}/like`),
};

export const paymentAPI = {
  createPaymentIntent: (courseId) => api.post('/payments/create-intent', { courseId }),
  confirmPayment: (paymentIntentId) => api.post('/payments/confirm', { paymentIntentId }),
  getPaymentHistory: (params) => api.get('/payments', { params }),
};

export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getCourseAnalytics: (courseId) => api.get(`/analytics/course/${courseId}`),
  getUserAnalytics: (userId) => api.get(`/analytics/user/${userId}`),
  getSystemAnalytics: () => api.get('/analytics/system'),
};

export const notificationAPI = {
  getNotifications: (params) => api.get('/notifications', { params }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
  updateSettings: (settings) => api.put('/notifications/settings', settings),
};

export default api;