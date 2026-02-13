import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  PlayIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  CheckIcon,
  BookOpenIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { toast } from 'react-hot-toast';

const CourseDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Mock course data - in a real app, this would come from an API
  const mockCourseData = {
    'complete-react-developer-2024': {
      id: 1,
      title: 'Complete React Developer Course 2024',
      short_description: 'Learn React from scratch with hands-on projects, modern hooks, state management, and deployment. Build real-world applications!',
      description: `Master React from the ground up! This comprehensive course covers everything you need to know to become a proficient React developer.

**What you'll learn:**
- React fundamentals and component architecture
- State management with Redux and Context API
- Modern React hooks and functional components
- Building responsive UIs with CSS-in-JS
- Testing React applications
- Deployment strategies and best practices

**Course includes:**
- 40+ hours of video content
- 15 hands-on projects
- Downloadable resources and code samples
- Certificate of completion
- Lifetime access to course materials

Perfect for beginners and intermediate developers looking to master React!`,
      price: 0,
      original_price: 89.99,
      level: 'beginner',
      duration_hours: 42,
      enrollment_count: 1247,
      rating_average: 4.8,
      rating_count: 342,
      category: 'Web Development',
      instructor: {
        name: 'John Instructor',
        bio: 'Full-stack developer and instructor with 10+ years of experience in web development.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      video_preview: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      requirements: [
        'Basic HTML, CSS, and JavaScript knowledge required',
        'No prior React experience needed',
        'Computer with internet access',
        'Text editor (VS Code recommended)'
      ],
      what_you_learn: [
        'React fundamentals and component architecture',
        'Modern React hooks and functional components',
        'State management with Redux and Context API',
        'Building responsive UIs with CSS-in-JS',
        'Testing React applications with Jest',
        'Deployment strategies and best practices',
        'Performance optimization techniques',
        'Real-world project development'
      ],
      curriculum: [
        {
          title: 'Getting Started with React',
          lessons: 8,
          duration: '2h 30m',
          topics: ['Introduction to React', 'Setting up Development Environment', 'Your First Component', 'JSX Fundamentals']
        },
        {
          title: 'Components and Props',
          lessons: 12,
          duration: '4h 15m',
          topics: ['Functional vs Class Components', 'Props and PropTypes', 'Component Composition', 'Conditional Rendering']
        },
        {
          title: 'State and Event Handling',
          lessons: 10,
          duration: '3h 45m',
          topics: ['useState Hook', 'Event Handling', 'Forms in React', 'Controlled Components']
        },
        {
          title: 'Advanced React Concepts',
          lessons: 15,
          duration: '5h 30m',
          topics: ['useEffect Hook', 'Custom Hooks', 'Context API', 'Error Boundaries']
        },
        {
          title: 'State Management with Redux',
          lessons: 18,
          duration: '6h 20m',
          topics: ['Redux Fundamentals', 'Actions and Reducers', 'Redux Toolkit', 'Async Actions with Thunk']
        },
        {
          title: 'Testing and Deployment',
          lessons: 12,
          duration: '4h 10m',
          topics: ['Testing with Jest', 'React Testing Library', 'Deployment to Netlify', 'CI/CD Setup']
        }
      ],
      tags: ['React', 'JavaScript', 'Frontend', 'Web Development', 'Hooks'],
      features: [
        'Lifetime access to course materials',
        'Certificate of completion',
        'Direct instructor support',
        'Mobile and desktop access',
        'Downloadable resources',
        'Free enrollment - no payment required'
      ]
    },
    'nodejs-express-backend-masterclass': {
      id: 2,
      title: 'Node.js & Express: Backend Development Masterclass',
      short_description: 'Master Node.js and Express to build scalable backend applications, APIs, and web services with databases and authentication.',
      description: `Build powerful backend applications with Node.js and Express! Learn server-side development, APIs, databases, and deployment.

**What you'll learn:**
- Node.js fundamentals and asynchronous programming
- Building RESTful APIs with Express.js
- Database integration (MongoDB & PostgreSQL)
- Authentication and authorization
- File uploads and email handling
- Testing and debugging techniques
- Production deployment and scaling

**Course features:**
- 35+ hours of practical content
- 12 real-world projects
- Source code for all projects
- Community support forum
- Regular updates and new content

Transform into a full-stack developer with solid backend skills!`,
      price: 0,
      original_price: 79.99,
      level: 'intermediate',
      duration_hours: 38,
      enrollment_count: 892,
      rating_average: 4.7,
      rating_count: 203,
      category: 'Web Development',
      instructor: {
        name: 'John Instructor',
        bio: 'Backend development expert with extensive experience in Node.js and server architecture.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
      requirements: [
        'Good understanding of JavaScript',
        'Basic knowledge of HTML/CSS',
        'Familiarity with command line',
        'Node.js installed on your computer'
      ],
      what_you_learn: [
        'Node.js fundamentals and event loop',
        'Express.js framework and middleware',
        'RESTful API design and development',
        'Database integration and ORM usage',
        'Authentication with JWT tokens',
        'File handling and email services',
        'Testing with Jest and Supertest',
        'Production deployment strategies'
      ],
      curriculum: [
        {
          title: 'Node.js Fundamentals',
          lessons: 10,
          duration: '3h 45m',
          topics: ['Node.js Architecture', 'Modules and NPM', 'File System Operations', 'Event Loop']
        },
        {
          title: 'Express.js Framework',
          lessons: 12,
          duration: '4h 20m',
          topics: ['Express Setup', 'Routing and Middleware', 'Request/Response Handling', 'Error Handling']
        },
        {
          title: 'Database Integration',
          lessons: 15,
          duration: '5h 30m',
          topics: ['MongoDB with Mongoose', 'PostgreSQL with Sequelize', 'Database Design', 'Migrations']
        },
        {
          title: 'Authentication & Security',
          lessons: 8,
          duration: '3h 15m',
          topics: ['JWT Authentication', 'Password Hashing', 'Rate Limiting', 'CORS and Security']
        },
        {
          title: 'Advanced Features',
          lessons: 10,
          duration: '4h 10m',
          topics: ['File Uploads', 'Email Services', 'Real-time with Socket.io', 'Caching Strategies']
        },
        {
          title: 'Testing & Deployment',
          lessons: 8,
          duration: '3h 00m',
          topics: ['Unit Testing', 'Integration Testing', 'CI/CD Pipeline', 'Production Deployment']
        }
      ],
      tags: ['Node.js', 'Express', 'Backend', 'API', 'JavaScript'],
      features: [
        'Complete backend development skills',
        'Real-world project experience',
        'Industry best practices',
        'Source code included',
        'Community support',
        'Free enrollment - no payment required'
      ]
    },
    'data-science-python-zero-hero': {
      id: 3,
      title: 'Data Science with Python: From Zero to Hero',
      short_description: 'Complete Python data science course covering analysis, visualization, statistics, and machine learning with real projects.',
      description: `Dive into the world of Data Science with Python! Learn data analysis, visualization, machine learning, and more.

**Comprehensive curriculum:**
- Python programming for data science
- Data manipulation with Pandas and NumPy
- Data visualization with Matplotlib and Seaborn
- Statistical analysis and hypothesis testing
- Machine learning with Scikit-learn
- Deep learning introduction with TensorFlow
- Real-world data science projects

**What's included:**
- 50+ hours of video lectures
- 20+ hands-on projects and exercises
- Jupyter notebooks with all code
- Datasets for practice
- Career guidance and portfolio building

Start your data science journey today!`,
      price: 0,
      original_price: 99.99,
      level: 'beginner',
      duration_hours: 52,
      enrollment_count: 634,
      rating_average: 4.6,
      rating_count: 156,
      category: 'Data Science',
      instructor: {
        name: 'Dr. Sarah Analytics',
        bio: 'Data scientist with PhD in Statistics and 8+ years of industry experience in machine learning.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      requirements: [
        'Basic computer skills',
        'No programming experience required',
        'Willingness to learn mathematics',
        'Python installed (we\'ll guide you through setup)'
      ],
      what_you_learn: [
        'Python programming fundamentals',
        'Data manipulation with Pandas',
        'Data visualization techniques',
        'Statistical analysis methods',
        'Machine learning algorithms',
        'Deep learning basics',
        'Real-world project development',
        'Data science career guidance'
      ],
      curriculum: [
        {
          title: 'Python for Data Science',
          lessons: 12,
          duration: '4h 30m',
          topics: ['Python Basics', 'NumPy Arrays', 'Pandas DataFrames', 'Data Types and Structures']
        },
        {
          title: 'Data Analysis & Cleaning',
          lessons: 15,
          duration: '6h 15m',
          topics: ['Data Cleaning Techniques', 'Handling Missing Data', 'Data Transformation', 'Exploratory Data Analysis']
        },
        {
          title: 'Data Visualization',
          lessons: 10,
          duration: '4h 45m',
          topics: ['Matplotlib Fundamentals', 'Seaborn Advanced Plots', 'Interactive Visualizations', 'Dashboard Creation']
        },
        {
          title: 'Statistics & Probability',
          lessons: 8,
          duration: '3h 20m',
          topics: ['Descriptive Statistics', 'Probability Distributions', 'Hypothesis Testing', 'Correlation Analysis']
        },
        {
          title: 'Machine Learning',
          lessons: 18,
          duration: '7h 30m',
          topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering']
        },
        {
          title: 'Advanced Topics & Projects',
          lessons: 12,
          duration: '5h 40m',
          topics: ['Deep Learning Intro', 'Time Series Analysis', 'Capstone Projects', 'Portfolio Building']
        }
      ],
      tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics', 'Pandas'],
      features: [
        'Complete beginner-friendly approach',
        'Real datasets and projects',
        'Jupyter notebook tutorials',
        'Career guidance included',
        'Portfolio development support',
        'Free enrollment - no payment required'
      ]
    },
    'ui-ux-design-fundamentals': {
      id: 4,
      title: 'UI/UX Design Fundamentals: Create Amazing User Experiences',
      short_description: 'Master UI/UX design principles, tools, and processes to create beautiful and user-friendly digital experiences.',
      description: `Learn the art and science of UI/UX design! Create beautiful, user-friendly interfaces that people love to use.

**Course highlights:**
- Design thinking and user-centered design
- User research and persona development
- Wireframing and prototyping
- Visual design principles and color theory
- Typography and layout design
- Usability testing and iteration
- Design tools: Figma, Adobe XD, Sketch

**Practical approach:**
- 30+ hours of design training
- 10 real client projects
- Design portfolio development
- Industry best practices
- Peer feedback and critiques

Perfect for aspiring designers and developers who want to create better user experiences!`,
      price: 0,
      original_price: 69.99,
      level: 'beginner',
      duration_hours: 32,
      enrollment_count: 423,
      rating_average: 4.9,
      rating_count: 89,
      category: 'Design',
      instructor: {
        name: 'Alex Designer',
        bio: 'Senior UX Designer with 7+ years at top tech companies, specializing in user-centered design.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      requirements: [
        'No design experience required',
        'Computer with internet access',
        'Willingness to think creatively',
        'Figma account (free)'
      ],
      what_you_learn: [
        'Design thinking methodology',
        'User research techniques',
        'Wireframing and prototyping',
        'Visual design principles',
        'Typography and color theory',
        'Usability testing methods',
        'Design tool proficiency',
        'Portfolio development'
      ],
      curriculum: [
        {
          title: 'Design Thinking & Research',
          lessons: 8,
          duration: '3h 15m',
          topics: ['Design Thinking Process', 'User Research Methods', 'Persona Development', 'User Journey Mapping']
        },
        {
          title: 'Wireframing & Prototyping',
          lessons: 10,
          duration: '4h 20m',
          topics: ['Low-fidelity Wireframes', 'High-fidelity Mockups', 'Interactive Prototypes', 'Design Systems']
        },
        {
          title: 'Visual Design Principles',
          lessons: 12,
          duration: '5h 30m',
          topics: ['Color Theory', 'Typography', 'Layout and Composition', 'Visual Hierarchy']
        },
        {
          title: 'Design Tools Mastery',
          lessons: 15,
          duration: '6h 45m',
          topics: ['Figma Fundamentals', 'Advanced Figma Features', 'Adobe XD Basics', 'Design Handoff']
        },
        {
          title: 'Usability & Testing',
          lessons: 6,
          duration: '2h 30m',
          topics: ['Usability Principles', 'User Testing Methods', 'A/B Testing', 'Design Iteration']
        },
        {
          title: 'Portfolio & Career',
          lessons: 8,
          duration: '3h 40m',
          topics: ['Portfolio Development', 'Case Study Creation', 'Design Presentation', 'Career Guidance']
        }
      ],
      tags: ['UI Design', 'UX Design', 'Figma', 'Design Thinking', 'Prototyping'],
      features: [
        'Hands-on design projects',
        'Portfolio development guidance',
        'Industry-standard tools training',
        'Real client work experience',
        'Design community access',
        'Free enrollment - no payment required'
      ]
    },
    'fullstack-javascript-mern-stack': {
      id: 5,
      title: 'Full-Stack JavaScript: MERN Stack Development',
      short_description: 'Complete MERN stack course: MongoDB, Express, React, Node.js. Build full-stack applications with authentication and deployment.',
      description: `Become a full-stack developer with the MERN stack! Build complete web applications using MongoDB, Express, React, and Node.js.

**Complete MERN curriculum:**
- MongoDB database design and operations
- Express.js server and API development
- React frontend with modern hooks
- Node.js backend architecture
- Authentication and authorization
- State management with Redux
- Real-time features with Socket.io
- Testing and deployment strategies

**Project-based learning:**
- E-commerce application
- Social media platform
- Task management system
- Real-time chat application
- Portfolio website

Master the most popular JavaScript stack and build amazing full-stack applications!`,
      price: 0,
      original_price: 109.99,
      level: 'intermediate',
      duration_hours: 48,
      enrollment_count: 756,
      rating_average: 4.8,
      rating_count: 178,
      category: 'Web Development',
      instructor: {
        name: 'Mike Fullstack',
        bio: 'Full-stack engineer with 12+ years building scalable web applications using modern JavaScript technologies.',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
      requirements: [
        'Solid JavaScript knowledge',
        'Basic React understanding',
        'Familiarity with Node.js basics',
        'Git and command line experience'
      ],
      what_you_learn: [
        'Complete MERN stack development',
        'MongoDB database design',
        'Express.js API development',
        'React frontend development',
        'Authentication and authorization',
        'State management with Redux',
        'Real-time features implementation',
        'Full-stack deployment strategies'
      ],
      curriculum: [
        {
          title: 'MERN Stack Overview',
          lessons: 6,
          duration: '2h 15m',
          topics: ['Stack Introduction', 'Development Environment', 'Project Structure', 'Git Workflow']
        },
        {
          title: 'MongoDB & Database Design',
          lessons: 10,
          duration: '4h 30m',
          topics: ['MongoDB Fundamentals', 'Mongoose ODM', 'Schema Design', 'Database Relationships']
        },
        {
          title: 'Express.js Backend',
          lessons: 12,
          duration: '5h 45m',
          topics: ['Express Setup', 'RESTful APIs', 'Middleware', 'Error Handling']
        },
        {
          title: 'React Frontend',
          lessons: 15,
          duration: '7h 20m',
          topics: ['React Components', 'Hooks and State', 'Routing', 'API Integration']
        },
        {
          title: 'Authentication & Security',
          lessons: 8,
          duration: '3h 40m',
          topics: ['JWT Authentication', 'Protected Routes', 'User Management', 'Security Best Practices']
        },
        {
          title: 'Advanced Features & Deployment',
          lessons: 12,
          duration: '5h 30m',
          topics: ['Redux State Management', 'Real-time Features', 'Testing', 'Production Deployment']
        }
      ],
      tags: ['MERN', 'Full-Stack', 'MongoDB', 'Express', 'React', 'Node.js'],
      features: [
        'Complete full-stack development',
        'Real-world project portfolio',
        'Modern development practices',
        'Deployment and DevOps',
        'Code review and feedback',
        'Free enrollment - no payment required'
      ]
    },
    'flutter-mobile-app-development': {
      id: 6,
      title: 'Flutter Mobile App Development: iOS & Android',
      short_description: 'Master Flutter to build cross-platform mobile apps for iOS and Android with beautiful UIs and native performance.',
      description: `Create beautiful, native mobile apps for both iOS and Android with Flutter! Learn Google's powerful cross-platform framework.

**Complete Flutter journey:**
- Dart programming language fundamentals
- Flutter widgets and UI development
- State management with Provider and Bloc
- Navigation and routing in Flutter apps
- API integration and data persistence
- Native device features (camera, GPS, notifications)
- App store deployment for iOS and Android

**Project-based learning:**
- Social media app with real-time features
- E-commerce mobile application
- Weather app with location services
- Task management app with offline support
- Photo sharing app with cloud storage

**Build professional mobile apps that work seamlessly on both platforms!**`,
      price: 0,
      original_price: 99.99,
      level: 'intermediate',
      duration_hours: 50,
      enrollment_count: 892,
      rating_average: 4.8,
      rating_count: 198,
      category: 'Mobile Development',
      instructor: {
        name: 'Emma Flutter',
        bio: 'Mobile development expert specializing in Flutter and cross-platform solutions with 6+ years experience.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
      requirements: [
        'Basic programming knowledge',
        'Object-oriented programming concepts',
        'Mobile development interest',
        'Android Studio or VS Code installed'
      ],
      what_you_learn: [
        'Flutter framework and Dart language',
        'Mobile UI design and development',
        'State management patterns',
        'API integration and networking',
        'Local data storage solutions',
        'Native device feature integration',
        'App store deployment process',
        'Performance optimization techniques'
      ],
      curriculum: [
        {
          title: 'Dart Programming Fundamentals',
          lessons: 10,
          duration: '3h 20m',
          topics: ['Dart Syntax', 'Variables and Functions', 'Classes and Objects', 'Async Programming']
        },
        {
          title: 'Flutter Basics',
          lessons: 15,
          duration: '5h 45m',
          topics: ['Flutter Architecture', 'Widgets Overview', 'Layouts and Styling', 'Navigation']
        },
        {
          title: 'State Management',
          lessons: 12,
          duration: '4h 30m',
          topics: ['setState', 'Provider Pattern', 'Bloc Architecture', 'Riverpod']
        },
        {
          title: 'Advanced Features',
          lessons: 18,
          duration: '7h 15m',
          topics: ['API Integration', 'Local Storage', 'Camera and Gallery', 'Push Notifications']
        },
        {
          title: 'Real-World Projects',
          lessons: 20,
          duration: '8h 30m',
          topics: ['E-commerce App', 'Social Media App', 'Weather App', 'Task Manager']
        },
        {
          title: 'Deployment and Publishing',
          lessons: 8,
          duration: '3h 10m',
          topics: ['App Store Guidelines', 'iOS Deployment', 'Android Deployment', 'App Optimization']
        }
      ],
      tags: ['Flutter', 'Dart', 'Mobile', 'iOS', 'Android', 'Cross-platform'],
      features: [
        'Cross-platform development skills',
        'Real device testing guidance',
        'App store submission help',
        'Source code for all projects',
        'Community forum access',
        'Free enrollment - no payment required'
      ]
    },
    'frontend-react-typescript-masterclass': {
      id: 7,
      title: 'Frontend Development with React.js & TypeScript',
      short_description: 'Master React.js with TypeScript to build scalable, type-safe frontend applications with modern tools and best practices.',
      description: `Build modern, type-safe frontend applications with React and TypeScript! Learn the perfect combination for scalable web development.

**What you'll master:**
- TypeScript fundamentals and advanced types
- React with TypeScript integration
- Component typing and prop interfaces
- State management with typed Redux
- Testing TypeScript React applications
- Modern build tools and configuration
- Performance optimization techniques

**Course features:**
- 47+ hours of comprehensive content
- 18 real-world projects
- TypeScript best practices
- Modern development workflow
- Industry-standard patterns

Perfect for developers who want to build robust, maintainable frontend applications!`,
      price: 0,
      original_price: 94.99,
      level: 'intermediate',
      duration_hours: 47,
      enrollment_count: 1156,
      rating_average: 4.9,
      rating_count: 287,
      category: 'Web Development',
      instructor: {
        name: 'Sarah TypeScript',
        bio: 'Frontend architect with 8+ years specializing in React and TypeScript development.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      requirements: [
        'Solid JavaScript knowledge',
        'Basic React experience',
        'Understanding of ES6+ features',
        'Node.js and npm installed'
      ],
      what_you_learn: [
        'TypeScript fundamentals and advanced types',
        'React with TypeScript best practices',
        'Component and prop type definitions',
        'State management with typed Redux',
        'Testing strategies for TypeScript',
        'Build configuration and tooling',
        'Performance optimization',
        'Modern development workflow'
      ],
      curriculum: [
        {
          title: 'TypeScript Fundamentals',
          lessons: 12,
          duration: '4h 20m',
          topics: ['TypeScript Basics', 'Type System', 'Interfaces and Types', 'Generics']
        },
        {
          title: 'React with TypeScript',
          lessons: 15,
          duration: '6h 15m',
          topics: ['Component Typing', 'Props and State', 'Event Handling', 'Hooks with Types']
        },
        {
          title: 'Advanced Patterns',
          lessons: 10,
          duration: '4h 30m',
          topics: ['Higher-Order Components', 'Render Props', 'Context API', 'Custom Hooks']
        },
        {
          title: 'State Management',
          lessons: 8,
          duration: '3h 45m',
          topics: ['Redux with TypeScript', 'Redux Toolkit', 'Async Actions', 'Type-safe Selectors']
        },
        {
          title: 'Testing & Tools',
          lessons: 6,
          duration: '2h 50m',
          topics: ['Jest with TypeScript', 'React Testing Library', 'Type Testing', 'Build Tools']
        },
        {
          title: 'Real-World Projects',
          lessons: 12,
          duration: '5h 20m',
          topics: ['E-commerce App', 'Dashboard Application', 'API Integration', 'Deployment']
        }
      ],
      tags: ['React', 'TypeScript', 'Frontend', 'JavaScript', 'Web Development'],
      features: [
        'Type-safe development skills',
        'Modern React patterns',
        'Industry best practices',
        'Real-world project experience',
        'Career advancement focus',
        'Free enrollment - no payment required'
      ]
    },
    'nextjs-typescript-fullstack-development': {
      id: 8,
      title: 'Next.js & TypeScript: Full-Stack Web Development',
      short_description: 'Build full-stack applications with Next.js and TypeScript, featuring SSR, API routes, and modern deployment strategies.',
      description: `Master full-stack development with Next.js and TypeScript! Build modern web applications with server-side rendering and API routes.

**Complete Next.js curriculum:**
- Next.js fundamentals and file-based routing
- Server-side rendering (SSR) and static generation
- API routes and serverless functions
- TypeScript integration and best practices
- Database integration and ORM usage
- Authentication and authorization
- Performance optimization and SEO
- Deployment and production strategies

**Advanced features:**
- Incremental Static Regeneration (ISR)
- Image optimization and lazy loading
- Internationalization (i18n)
- Progressive Web App (PWA) features
- Real-time features with WebSockets

Build production-ready full-stack applications with the most popular React framework!`,
      price: 0,
      original_price: 109.99,
      level: 'advanced',
      duration_hours: 55,
      enrollment_count: 567,
      rating_average: 4.9,
      rating_count: 123,
      category: 'Web Development',
      instructor: {
        name: 'David NextJS',
        bio: 'Full-stack developer and Next.js expert with 6+ years building production applications.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      requirements: [
        'Strong React knowledge',
        'TypeScript experience',
        'Understanding of Node.js',
        'Basic database concepts'
      ],
      what_you_learn: [
        'Next.js framework mastery',
        'Server-side rendering techniques',
        'API development with Next.js',
        'TypeScript in full-stack context',
        'Database integration patterns',
        'Authentication implementation',
        'Performance optimization',
        'Production deployment strategies'
      ],
      curriculum: [
        {
          title: 'Next.js Fundamentals',
          lessons: 10,
          duration: '4h 15m',
          topics: ['Next.js Setup', 'File-based Routing', 'Pages and Components', 'CSS and Styling']
        },
        {
          title: 'Server-Side Features',
          lessons: 12,
          duration: '5h 30m',
          topics: ['SSR vs SSG', 'getServerSideProps', 'getStaticProps', 'ISR']
        },
        {
          title: 'API Development',
          lessons: 8,
          duration: '3h 45m',
          topics: ['API Routes', 'Serverless Functions', 'Middleware', 'Error Handling']
        },
        {
          title: 'Database Integration',
          lessons: 10,
          duration: '4h 20m',
          topics: ['Prisma ORM', 'Database Design', 'CRUD Operations', 'Migrations']
        },
        {
          title: 'Authentication & Security',
          lessons: 6,
          duration: '2h 50m',
          topics: ['NextAuth.js', 'JWT Tokens', 'Protected Routes', 'Security Best Practices']
        },
        {
          title: 'Advanced Topics & Deployment',
          lessons: 12,
          duration: '5h 40m',
          topics: ['Performance Optimization', 'SEO', 'PWA Features', 'Vercel Deployment']
        }
      ],
      tags: ['Next.js', 'TypeScript', 'Full-Stack', 'React', 'SSR'],
      features: [
        'Modern full-stack development',
        'Production-ready applications',
        'Performance optimization',
        'SEO best practices',
        'Deployment expertise',
        'Free enrollment - no payment required'
      ]
    },
    'php-laravel-backend-development': {
      id: 9,
      title: 'Backend Development with PHP & Laravel Framework',
      short_description: 'Learn PHP and Laravel to build robust backend applications, APIs, and web services with modern development practices.',
      description: `Master backend development with PHP and Laravel! Build powerful web applications and APIs using one of the most popular PHP frameworks.

**Comprehensive Laravel curriculum:**
- PHP fundamentals and object-oriented programming
- Laravel framework architecture and MVC pattern
- Eloquent ORM and database relationships
- RESTful API development
- Authentication and authorization
- Testing with PHPUnit and Feature tests
- Package development and integration
- Deployment and server management

**Real-world projects:**
- Blog management system
- E-commerce API
- Task management application
- Social media backend
- Multi-tenant application

Perfect for developers wanting to master PHP backend development with Laravel!`,
      price: 0,
      original_price: 84.99,
      level: 'beginner',
      duration_hours: 42,
      enrollment_count: 743,
      rating_average: 4.6,
      rating_count: 164,
      category: 'Web Development',
      instructor: {
        name: 'Carlos Laravel',
        bio: 'PHP developer with 9+ years experience building scalable web applications with Laravel.',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1599507593362-e2d6e2b5c5e7?w=800&h=400&fit=crop',
      requirements: [
        'Basic programming knowledge',
        'Understanding of web concepts',
        'HTML and CSS basics',
        'Willingness to learn PHP'
      ],
      what_you_learn: [
        'PHP programming fundamentals',
        'Laravel framework mastery',
        'Database design and Eloquent ORM',
        'RESTful API development',
        'Authentication systems',
        'Testing methodologies',
        'Package development',
        'Deployment strategies'
      ],
      curriculum: [
        {
          title: 'PHP Fundamentals',
          lessons: 8,
          duration: '3h 15m',
          topics: ['PHP Syntax', 'OOP Concepts', 'Namespaces', 'Composer']
        },
        {
          title: 'Laravel Basics',
          lessons: 12,
          duration: '5h 20m',
          topics: ['MVC Architecture', 'Routing', 'Controllers', 'Views and Blade']
        },
        {
          title: 'Database & Eloquent',
          lessons: 10,
          duration: '4h 30m',
          topics: ['Migrations', 'Models', 'Relationships', 'Query Builder']
        },
        {
          title: 'Advanced Features',
          lessons: 8,
          duration: '3h 45m',
          topics: ['Middleware', 'Events', 'Jobs and Queues', 'File Storage']
        },
        {
          title: 'API Development',
          lessons: 6,
          duration: '2h 50m',
          topics: ['RESTful APIs', 'API Resources', 'Rate Limiting', 'API Authentication']
        },
        {
          title: 'Testing & Deployment',
          lessons: 8,
          duration: '3h 20m',
          topics: ['PHPUnit Testing', 'Feature Tests', 'Server Setup', 'Production Deployment']
        }
      ],
      tags: ['PHP', 'Laravel', 'Backend', 'API', 'Web Development'],
      features: [
        'Complete PHP and Laravel mastery',
        'Real-world project portfolio',
        'Modern development practices',
        'Testing and deployment skills',
        'Career-focused curriculum',
        'Free enrollment - no payment required'
      ]
    },
    'bootstrap-tailwind-css-web-design': {
      id: 10,
      title: 'Bootstrap & Tailwind CSS: Modern Web Design',
      short_description: 'Master Bootstrap and Tailwind CSS to create beautiful, responsive web designs with modern CSS frameworks.',
      description: `Master modern web design with Bootstrap and Tailwind CSS! Learn to create beautiful, responsive websites using the most popular CSS frameworks.

**Comprehensive design curriculum:**
- Bootstrap 5 components and utilities
- Tailwind CSS utility-first approach
- Responsive design principles
- Custom component development
- Design system creation
- Performance optimization
- Accessibility best practices
- Modern layout techniques

**Hands-on projects:**
- Corporate website with Bootstrap
- E-commerce site with Tailwind
- Dashboard interface design
- Mobile-first responsive layouts
- Custom component library

Perfect for designers and developers who want to create stunning web interfaces!`,
      price: 0,
      original_price: 69.99,
      level: 'beginner',
      duration_hours: 35,
      enrollment_count: 1234,
      rating_average: 4.7,
      rating_count: 298,
      category: 'Design',
      instructor: {
        name: 'Lisa Designer',
        bio: 'UI/UX designer and frontend developer with 7+ years creating beautiful web interfaces.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      requirements: [
        'Basic HTML knowledge',
        'CSS fundamentals',
        'Understanding of responsive design',
        'Text editor or IDE'
      ],
      what_you_learn: [
        'Bootstrap 5 framework mastery',
        'Tailwind CSS utility classes',
        'Responsive design techniques',
        'Component-based design',
        'Custom theme development',
        'Performance optimization',
        'Accessibility implementation',
        'Modern CSS practices'
      ],
      curriculum: [
        {
          title: 'Bootstrap Fundamentals',
          lessons: 10,
          duration: '4h 15m',
          topics: ['Bootstrap Setup', 'Grid System', 'Components', 'Utilities']
        },
        {
          title: 'Advanced Bootstrap',
          lessons: 8,
          duration: '3h 30m',
          topics: ['Custom Themes', 'JavaScript Components', 'Forms', 'Navigation']
        },
        {
          title: 'Tailwind CSS Basics',
          lessons: 12,
          duration: '5h 20m',
          topics: ['Utility Classes', 'Responsive Design', 'Flexbox & Grid', 'Spacing']
        },
        {
          title: 'Tailwind Advanced',
          lessons: 8,
          duration: '3h 45m',
          topics: ['Custom Configuration', 'Components', 'Plugins', 'Optimization']
        },
        {
          title: 'Design Systems',
          lessons: 6,
          duration: '2h 40m',
          topics: ['Design Tokens', 'Component Libraries', 'Documentation', 'Maintenance']
        },
        {
          title: 'Real-World Projects',
          lessons: 10,
          duration: '4h 30m',
          topics: ['Corporate Website', 'E-commerce Design', 'Dashboard UI', 'Mobile App Design']
        }
      ],
      tags: ['Bootstrap', 'Tailwind CSS', 'CSS', 'Design', 'Responsive'],
      features: [
        'Two popular frameworks in one course',
        'Responsive design mastery',
        'Real-world project experience',
        'Modern design principles',
        'Performance optimization',
        'Free enrollment - no payment required'
      ]
    },
    'complete-fullstack-developer-bootcamp-2024': {
      id: 11,
      title: 'Complete Full-Stack Developer Bootcamp 2024',
      short_description: 'Complete bootcamp covering frontend, backend, databases, and deployment to become a job-ready full-stack developer.',
      description: `Become a job-ready full-stack developer with our comprehensive bootcamp! Master frontend, backend, databases, and deployment in one complete course.

**Complete full-stack curriculum:**
- HTML, CSS, and JavaScript fundamentals
- React.js for modern frontend development
- Node.js and Express.js for backend
- MongoDB and PostgreSQL databases
- Authentication and security
- RESTful API development
- Version control with Git
- Deployment and DevOps basics

**Career-focused approach:**
- Portfolio project development
- Interview preparation
- Resume building guidance
- Industry best practices
- Real-world development workflow
- Freelancing and job search tips

**85+ hours of comprehensive content to transform you into a professional developer!**`,
      price: 0,
      original_price: 149.99,
      level: 'beginner',
      duration_hours: 85,
      enrollment_count: 2156,
      rating_average: 4.8,
      rating_count: 542,
      category: 'Web Development',
      instructor: {
        name: 'Team EduHub',
        bio: 'Professional development team with combined 50+ years of industry experience.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
      requirements: [
        'No programming experience required',
        'Computer with internet access',
        'Dedication to learn and practice',
        'Willingness to build projects'
      ],
      what_you_learn: [
        'Complete web development stack',
        'Frontend development with React',
        'Backend development with Node.js',
        'Database design and management',
        'API development and integration',
        'Authentication and security',
        'Version control and collaboration',
        'Deployment and hosting'
      ],
      curriculum: [
        {
          title: 'Web Development Fundamentals',
          lessons: 15,
          duration: '8h 30m',
          topics: ['HTML5', 'CSS3', 'JavaScript ES6+', 'DOM Manipulation']
        },
        {
          title: 'Frontend with React',
          lessons: 20,
          duration: '12h 45m',
          topics: ['React Components', 'State Management', 'Routing', 'Hooks']
        },
        {
          title: 'Backend with Node.js',
          lessons: 18,
          duration: '10h 20m',
          topics: ['Express.js', 'RESTful APIs', 'Middleware', 'Error Handling']
        },
        {
          title: 'Databases',
          lessons: 12,
          duration: '7h 15m',
          topics: ['MongoDB', 'PostgreSQL', 'Database Design', 'ORMs']
        },
        {
          title: 'Authentication & Security',
          lessons: 8,
          duration: '4h 30m',
          topics: ['JWT Authentication', 'Password Security', 'HTTPS', 'CORS']
        },
        {
          title: 'Deployment & Career',
          lessons: 15,
          duration: '9h 40m',
          topics: ['Git & GitHub', 'Heroku Deployment', 'Portfolio Building', 'Job Search']
        }
      ],
      tags: ['Full-Stack', 'Bootcamp', 'Career', 'React', 'Node.js'],
      features: [
        'Complete career transformation',
        'Job-ready skills development',
        'Portfolio project guidance',
        'Interview preparation',
        'Lifetime career support',
        'Free enrollment - no payment required'
      ]
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from API first
        try {
          const response = await fetch(`http://localhost:5000/api/v1/courses/slug/${slug}`);
          const data = await response.json();
          
          if (data.success) {
            // Transform API data to match expected structure
            const apiCourse = data.data;
            const transformedCourse = {
              ...apiCourse,
              // Handle category data
              category: apiCourse.category?.name || apiCourse.category || 'General',
              // Ensure arrays exist with defaults
              features: apiCourse.features || [
                'Lifetime access to course materials',
                'Certificate of completion',
                'Community support',
                'Mobile and desktop access',
                'Regular updates and new content'
              ],
              what_you_learn: apiCourse.what_you_learn ? 
                (typeof apiCourse.what_you_learn === 'string' ? 
                  apiCourse.what_you_learn.split(',').map(item => item.trim()) : 
                  apiCourse.what_you_learn) : 
                [
                  'Master the fundamentals',
                  'Build real-world projects',
                  'Best practices and industry standards',
                  'Problem-solving techniques'
                ],
              requirements: apiCourse.requirements ? 
                (typeof apiCourse.requirements === 'string' ? 
                  apiCourse.requirements.split(',').map(item => item.trim()) : 
                  apiCourse.requirements) : 
                [
                  'Basic computer skills',
                  'Internet connection',
                  'Willingness to learn'
                ],
              curriculum: apiCourse.curriculum || [
                {
                  title: 'Getting Started',
                  lessons: 5,
                  duration: '2h 30m',
                  topics: ['Introduction', 'Setup', 'First Steps', 'Basic Concepts']
                },
                {
                  title: 'Core Concepts',
                  lessons: 8,
                  duration: '4h 15m',
                  topics: ['Fundamentals', 'Advanced Topics', 'Best Practices', 'Common Patterns']
                },
                {
                  title: 'Practical Applications',
                  lessons: 6,
                  duration: '3h 45m',
                  topics: ['Real-world Examples', 'Project Building', 'Testing', 'Deployment']
                }
              ],
              // Handle instructor data
              instructor: apiCourse.instructor ? {
                name: `${apiCourse.instructor.first_name} ${apiCourse.instructor.last_name}`,
                bio: apiCourse.instructor.bio || 'Experienced instructor',
                rating: 4.8,
                students: 1200,
                courses: 8
              } : {
                name: 'Expert Instructor',
                bio: 'Experienced professional with years of industry experience',
                rating: 4.8,
                students: 1200,
                courses: 8
              }
            };
            setCourse(transformedCourse);
            return;
          }
        } catch (apiError) {
          console.log('API fetch failed, falling back to mock data:', apiError);
        }
        
        // Fallback to mock data
        const mockCourse = mockCourseData[slug];
        if (mockCourse) {
          setCourse(mockCourse);
        } else {
          toast.error('Course not found');
          navigate('/courses');
        }
      } catch (error) {
        console.error('Error in fetchCourse:', error);
        toast.error('Failed to load course');
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug, navigate]);

  const handleEnrollClick = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    
    try {
      // Try to enroll via API first
      try {
        const response = await fetch('http://localhost:5000/api/v1/enrollments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            courseId: course.id
          })
        });

        const data = await response.json();

        if (data.success) {
          toast.success('Successfully enrolled in the course for free!');
          // Redirect to first lesson after a short delay
          setTimeout(() => {
            navigate(`/learn/${slug}/lesson-1`);
          }, 1500);
          return;
        } else {
          if (data.message === 'Already enrolled in this course') {
            toast.success('You are already enrolled! Redirecting to course...');
            setTimeout(() => {
              navigate(`/learn/${slug}/lesson-1`);
            }, 1500);
            return;
          }
        }
      } catch (apiError) {
        console.log('API enrollment failed, proceeding with mock enrollment:', apiError);
      }
      
      // Fallback to mock enrollment (always succeeds)
      toast.success('Successfully enrolled in the course for free!');
      setTimeout(() => {
        navigate(`/learn/${slug}/lesson-1`);
      }, 1500);
      
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error('Failed to enroll in course');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login', { state: { from: `/courses/${slug}` } });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIconSolid
        key={i}
        className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link
            to="/courses"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {typeof course.category === 'object' && course.category?.name ? course.category.name : 
                   typeof course.category === 'string' ? course.category : 'General'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              
              <p className="text-xl mb-6 opacity-90">
                {course.short_description}
              </p>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  {renderStars(course.rating_average)}
                  <span className="ml-2 text-lg font-medium">
                    {course.rating_average} ({course.rating_count} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  {course.enrollment_count.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  {course.duration_hours} hours
                </div>
                <div className="flex items-center">
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  {course.level}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
                <div className="relative mb-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg hover:bg-black/40 transition-colors">
                    <PlayIcon className="h-16 w-16 text-white" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                    {course.original_price && course.price !== course.original_price && (
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        ${course.original_price}
                      </span>
                    )}
                  </div>
                  {course.original_price && course.price !== course.original_price && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {course.price === 0 ? (
                        `Free enrollment - Save $${course.original_price.toFixed(2)} (100% off)`
                      ) : (
                        `Save $${(course.original_price - course.price).toFixed(2)} 
                        (${Math.round((1 - course.price / course.original_price) * 100)}% off)`
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleEnrollClick}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors mb-4"
                >
                  {isAuthenticated ? 'Enroll for Free' : 'Login to Enroll'}
                </button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Free enrollment - No payment required
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">This course includes:</h4>
                  {Array.isArray(course.features) && course.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', name: 'Overview' },
                    { id: 'curriculum', name: 'Curriculum' },
                    { id: 'instructor', name: 'Instructor' },
                    { id: 'reviews', name: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">About this course</h3>
                    <div className="prose max-w-none text-gray-600 dark:text-gray-400 mb-8">
                      {(course.description || '').split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>

                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">What you'll learn</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {Array.isArray(course.what_you_learn) && course.what_you_learn.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Requirements</h4>
                    <ul className="space-y-2">
                      {Array.isArray(course.requirements) && course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Course Curriculum</h3>
                    <div className="space-y-4">
                      {Array.isArray(course.curriculum) && course.curriculum.map((section, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg">
                          <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900">{section.title}</h4>
                              <div className="text-sm text-gray-600">
                                {section.lessons} lessons • {section.duration}
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {Array.isArray(section.topics) && section.topics.map((topic, topicIndex) => (
                                <div key={topicIndex} className="flex items-center text-sm text-gray-600">
                                  <PlayIcon className="h-4 w-4 mr-2 text-gray-400" />
                                  {topic}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Meet Your Instructor</h3>
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.instructor?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'}
                        alt={course.instructor?.name || 'Instructor'}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{course.instructor?.name || 'Expert Instructor'}</h4>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{course.instructor?.bio || 'Experienced professional with years of industry experience.'}</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                          <span>⭐ {course.instructor?.rating || 4.8} rating</span>
                          <span>👥 {course.instructor?.students || 1200} students</span>
                          <span>📚 {course.instructor?.courses || 8} courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Student Reviews</h3>
                    <div className="text-center py-8 text-gray-500">
                      Reviews will be displayed here once you're enrolled in the course.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Course Features</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <ClockIcon className="h-5 w-5 mr-3 text-gray-400" />
                    {course.duration_hours} hours on-demand video
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <BookOpenIcon className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" />
                    Downloadable resources
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <DevicePhoneMobileIcon className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" />
                    Access on mobile and desktop
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <GlobeAltIcon className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" />
                    Lifetime access
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <ShieldCheckIcon className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" />
                    Certificate of completion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Login Required
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to be logged in to enroll in this course for free. Please login or create an account to continue.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleLoginRedirect}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;