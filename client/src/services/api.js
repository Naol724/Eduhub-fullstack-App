// Import deployment API that handles both real and mock data
export { 
  authAPI, 
  courseAPI, 
  enrollmentAPI, 
  userAPI, 
  notificationAPI, 
  forumAPI,
  setupAxiosInterceptors 
} from './deploymentApi';

// Re-export everything for backward compatibility
export { default } from './deploymentApi';