// Mock data for deployment without database
export const mockUsers = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'student@example.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'instructor@example.com',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2ca?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-10T14:20:00Z'
  },
  {
    id: 3,
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-01T09:00:00Z'
  }
];

export const mockCourses = [
  {
    id: 1,
    title: 'Complete React Developer Course 2024',
    slug: 'complete-react-developer-2024',
    short_description: 'Learn React from scratch with hands-on projects, modern hooks, state management, and deployment.',
    description: 'Master React.js with this comprehensive course covering everything from basics to advanced concepts.',
    price: 0,
    original_price: 89.99,
    level: 'beginner',
    duration_hours: 42,
    enrollment_count: 1247,
    rating_average: 4.8,
    rating_count: 342,
    category: 'Web Development',
    instructor: {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2ca?w=150&h=150&fit=crop&crop=face'
    },
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    tags: ['React', 'JavaScript', 'Frontend'],
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-20T15:45:00Z'
  },
  {
    id: 2,
    title: 'Node.js & Express: Backend Development',
    slug: 'nodejs-express-backend-development',
    short_description: 'Master Node.js and Express to build scalable backend applications and APIs.',
    description: 'Complete guide to backend development with Node.js, Express, databases, and authentication.',
    price: 0,
    original_price: 79.99,
    level: 'intermediate',
    duration_hours: 38,
    enrollment_count: 892,
    rating_average: 4.7,
    rating_count: 203,
    category: 'Web Development',
    instructor: {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2ca?w=150&h=150&fit=crop&crop=face'
    },
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    tags: ['Node.js', 'Express', 'Backend'],
    created_at: '2024-01-10T14:20:00Z',
    updated_at: '2024-01-18T11:30:00Z'
  },
  {
    id: 3,
    title: 'Flutter Mobile App Development',
    slug: 'flutter-mobile-app-development',
    short_description: 'Build cross-platform mobile apps for iOS and Android with Flutter.',
    description: 'Learn Flutter from basics to advanced topics including state management, animations, and deployment.',
    price: 0,
    original_price: 99.99,
    level: 'intermediate',
    duration_hours: 50,
    enrollment_count: 892,
    rating_average: 4.8,
    rating_count: 198,
    category: 'Mobile Development',
    instructor: {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2ca?w=150&h=150&fit=crop&crop=face'
    },
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    tags: ['Flutter', 'Mobile', 'Cross-platform'],
    created_at: '2024-01-08T09:15:00Z',
    updated_at: '2024-01-22T16:20:00Z'
  }
];

export const mockEnrollments = [
  {
    id: 1,
    user_id: 1,
    course_id: 1,
    enrollment_date: '2024-01-20T10:30:00Z',
    progress_percentage: 65,
    completed_lessons: [1, 2, 3],
    current_lesson: 4,
    status: 'active',
    course: mockCourses[0]
  },
  {
    id: 2,
    user_id: 1,
    course_id: 2,
    enrollment_date: '2024-01-18T14:20:00Z',
    progress_percentage: 30,
    completed_lessons: [1],
    current_lesson: 2,
    status: 'active',
    course: mockCourses[1]
  }
];

export const mockUserStats = {
  enrolled: 2,
  completed: 0,
  certificates: 0,
  hours_learned: 25,
  points: 150
};

export const mockNotifications = [
  {
    id: 1,
    title: 'New course available',
    message: 'Check out our new Flutter course!',
    type: 'info',
    read: false,
    created_at: '2024-01-20T10:30:00Z'
  },
  {
    id: 2,
    title: 'Course completion reminder',
    message: 'You are 65% through React course. Keep going!',
    type: 'success',
    read: false,
    created_at: '2024-01-19T15:45:00Z'
  }
];

export const mockForums = [
  {
    id: 1,
    course_id: 1,
    title: 'React Course Discussion',
    description: 'General discussion for React course students',
    posts_count: 15,
    created_at: '2024-01-15T10:30:00Z'
  }
];

export const mockForumPosts = [
  {
    id: 1,
    forum_id: 1,
    title: 'Help with useState hook',
    content: 'I am having trouble understanding the useState hook. Can someone help?',
    author: {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    created_at: '2024-01-20T10:30:00Z',
    replies_count: 3,
    likes_count: 5
  }
];

// Mock authentication functions
export const mockAuth = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (user && (password === 'password123' || password === 'admin123')) {
      return {
        success: true,
        data: {
          user,
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now()
        }
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'student',
      created_at: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    return {
      success: true,
      data: {
        user: newUser,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now()
      }
    };
  },
  
  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would decode the token and find the user
    // For demo, return the first student user
    return {
      success: true,
      data: mockUsers[0]
    };
  }
};
