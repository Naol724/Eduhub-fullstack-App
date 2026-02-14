import { 
  mockUsers, 
  mockCourses, 
  mockEnrollments, 
  mockUserStats, 
  mockNotifications, 
  mockForums, 
  mockForumPosts, 
  mockAuth 
} from './mockData';

// Simulate network delays
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockApi = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      await delay(1000);
      return mockAuth.login(credentials.email, credentials.password);
    },
    
    register: async (userData) => {
      await delay(1000);
      return mockAuth.register(userData);
    },
    
    logout: async () => {
      await delay(300);
      return { success: true };
    },
    
    getProfile: async () => {
      await delay(500);
      return mockAuth.getProfile();
    },
    
    forgotPassword: async (email) => {
      await delay(1000);
      return { success: true, message: 'Password reset email sent' };
    },
    
    resetPassword: async (data) => {
      await delay(1000);
      return { success: true, message: 'Password reset successful' };
    }
  },

  // Course endpoints
  courses: {
    getCourses: async (params = {}) => {
      await delay(800);
      let courses = [...mockCourses];
      
      // Apply filters
      if (params.category && params.category !== 'all') {
        courses = courses.filter(c => c.category === params.category);
      }
      
      if (params.level && params.level !== 'all') {
        courses = courses.filter(c => c.level === params.level);
      }
      
      if (params.search) {
        const search = params.search.toLowerCase();
        courses = courses.filter(c => 
          c.title.toLowerCase().includes(search) ||
          c.short_description.toLowerCase().includes(search) ||
          c.tags.some(tag => tag.toLowerCase().includes(search))
        );
      }
      
      // Apply sorting
      if (params.sort) {
        switch (params.sort) {
          case 'newest':
            courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
          case 'popular':
            courses.sort((a, b) => b.enrollment_count - a.enrollment_count);
            break;
          case 'rating':
            courses.sort((a, b) => b.rating_average - a.rating_average);
            break;
          case 'price-low':
            courses.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            courses.sort((a, b) => b.price - a.price);
            break;
        }
      }
      
      return {
        data: {
          data: courses,
          total: courses.length,
          page: 1,
          totalPages: 1
        }
      };
    },
    
    getCourseBySlug: async (slug) => {
      await delay(600);
      const course = mockCourses.find(c => c.slug === slug);
      if (!course) {
        throw new Error('Course not found');
      }
      return {
        data: course
      };
    },
    
    createCourse: async (courseData) => {
      await delay(1000);
      const newCourse = {
        id: mockCourses.length + 1,
        ...courseData,
        slug: courseData.title.toLowerCase().replace(/\s+/g, '-'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockCourses.push(newCourse);
      return {
        data: newCourse
      };
    }
  },

  // Enrollment endpoints
  enrollments: {
    getMyCourses: async () => {
      await delay(600);
      return {
        data: mockEnrollments
      };
    },
    
    enrollInCourse: async (data) => {
      await delay(800);
      const newEnrollment = {
        id: mockEnrollments.length + 1,
        user_id: 1,
        course_id: data.courseId,
        enrollment_date: new Date().toISOString(),
        progress_percentage: 0,
        completed_lessons: [],
        current_lesson: 1,
        status: 'active',
        course: mockCourses.find(c => c.id === data.courseId)
      };
      mockEnrollments.push(newEnrollment);
      return {
        data: newEnrollment
      };
    },
    
    updateProgress: async (enrollmentId, progressData) => {
      await delay(500);
      const enrollment = mockEnrollments.find(e => e.id === enrollmentId);
      if (enrollment) {
        Object.assign(enrollment, progressData);
      }
      return {
        data: enrollment
      };
    }
  },

  // User endpoints
  users: {
    getStats: async () => {
      await delay(400);
      return {
        data: mockUserStats
      };
    },
    
    updateProfile: async (data) => {
      await delay(800);
      const user = mockUsers[0]; // Current user
      Object.assign(user, data);
      return {
        data: user
      };
    }
  },

  // Notification endpoints
  notifications: {
    getNotifications: async () => {
      await delay(400);
      return {
        data: mockNotifications
      };
    },
    
    markAsRead: async (id) => {
      await delay(300);
      const notification = mockNotifications.find(n => n.id === id);
      if (notification) {
        notification.read = true;
      }
      return { success: true };
    },
    
    markAllAsRead: async () => {
      await delay(500);
      mockNotifications.forEach(n => n.read = true);
      return { success: true };
    }
  },

  // Forum endpoints
  forums: {
    getForums: async (courseId) => {
      await delay(400);
      return {
        data: mockForums.filter(f => f.course_id === courseId)
      };
    },
    
    getForumPosts: async (forumId) => {
      await delay(500);
      return {
        data: mockForumPosts.filter(p => p.forum_id === forumId)
      };
    }
  }
};

export default mockApi;
