import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data - in a real app, this would come from an API
  const mockCourses = [
    {
      id: 1,
      title: 'Complete React Developer Course 2024',
      slug: 'complete-react-developer-2024',
      short_description: 'Learn React from scratch with hands-on projects, modern hooks, state management, and deployment. Build real-world applications!',
      price: 0,
      original_price: 89.99,
      level: 'beginner',
      duration_hours: 42,
      enrollment_count: 1247,
      rating_average: 4.8,
      rating_count: 342,
      category: 'Web Development',
      instructor: 'John Instructor',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      title: 'Node.js & Express: Backend Development Masterclass',
      slug: 'nodejs-express-backend-masterclass',
      short_description: 'Master Node.js and Express to build scalable backend applications, APIs, and web services with databases and authentication.',
      price: 0,
      original_price: 79.99,
      level: 'intermediate',
      duration_hours: 38,
      enrollment_count: 892,
      rating_average: 4.7,
      rating_count: 203,
      category: 'Web Development',
      instructor: 'John Instructor',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      tags: ['Node.js', 'Express', 'Backend']
    },
    {
      id: 3,
      title: 'Frontend Development with React.js & TypeScript',
      slug: 'frontend-react-typescript-masterclass',
      short_description: 'Master React.js with TypeScript to build scalable, type-safe frontend applications with modern tools and best practices.',
      price: 0,
      original_price: 94.99,
      level: 'intermediate',
      duration_hours: 47,
      enrollment_count: 1156,
      rating_average: 4.9,
      rating_count: 287,
      category: 'Web Development',
      instructor: 'John Instructor',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
      tags: ['React', 'TypeScript', 'Frontend']
    },
    {
      id: 4,
      title: 'Flutter Mobile App Development: iOS & Android',
      slug: 'flutter-mobile-app-development',
      short_description: 'Master Flutter to build cross-platform mobile apps for iOS and Android with beautiful UIs and native performance.',
      price: 0,
      original_price: 99.99,
      level: 'intermediate',
      duration_hours: 50,
      enrollment_count: 892,
      rating_average: 4.8,
      rating_count: 198,
      category: 'Mobile Development',
      instructor: 'John Instructor',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      tags: ['Flutter', 'Mobile', 'Cross-platform']
    },
    {
      id: 5,
      title: 'Next.js & TypeScript: Full-Stack Web Development',
      slug: 'nextjs-typescript-fullstack-development',
      short_description: 'Build full-stack applications with Next.js and TypeScript, featuring SSR, API routes, and modern deployment strategies.',
      price: 0,
      original_price: 109.99,
      level: 'advanced',
      duration_hours: 55,
      enrollment_count: 567,
      rating_average: 4.9,
      rating_count: 123,
      category: 'Web Development',
      instructor: 'John Instructor',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      tags: ['Next.js', 'TypeScript', 'Full-Stack']
    },
    {
      id: 6,
      title: 'Backend Development with PHP & Laravel Framework',
      slug: 'php-laravel-backend-development',
      short_description: 'Learn PHP and Laravel to build robust backend applications, APIs, and web services with modern development practices.',
      price: 0,
      original_price: 84.99,
      level: 'beginner',
      duration_hours: 42,
      enrollment_count: 743,
      rating_average: 4.6,
      rating_count: 164,
      category: 'Web Development',
      instructor: 'John Instructor',
      thumbnail: 'https://images.unsplash.com/photo-1599507593362-e2d6e2b5c5e7?w=400&h=250&fit=crop',
      tags: ['PHP', 'Laravel', 'Backend']
    },
    {
      id: 7,
      title: 'Bootstrap & Tailwind CSS: Modern Web Design',
      slug: 'bootstrap-tailwind-css-web-design',
      short_description: 'Master Bootstrap and Tailwind CSS to create beautiful, responsive web designs with modern CSS frameworks.',
      price: 0,
      original_price: 69.99,
      level: 'beginner',
      duration_hours: 35,
      enrollment_count: 1234,
      rating_average: 4.7,
      rating_count: 298,
      category: 'Design',
      instructor: 'John Instructor',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      tags: ['Bootstrap', 'Tailwind CSS', 'Design']
    },
    {
      id: 8,
      title: 'Complete Full-Stack Developer Bootcamp 2024',
      slug: 'complete-fullstack-developer-bootcamp-2024',
      short_description: 'Complete bootcamp covering frontend, backend, databases, and deployment to become a job-ready full-stack developer.',
      price: 0,
      original_price: 149.99,
      level: 'beginner',
      duration_hours: 85,
      enrollment_count: 2156,
      rating_average: 4.8,
      rating_count: 542,
      category: 'Web Development',
      instructor: 'John Instructor',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      tags: ['Full-Stack', 'Bootcamp', 'Career']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort courses
  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.short_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating_average - a.rating_average;
        case 'popular':
          return b.enrollment_count - a.enrollment_count;
        default:
          return b.id - a.id; // newest first
      }
    });

  const categories = ['all', 'Web Development', 'Mobile Development', 'Design', 'Data Science'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIconSolid
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover {courses.length} high-quality courses designed to advance your career and skills
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 sm:py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-4 w-full lg:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <AcademicCapIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-gray-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-32 sm:h-40 md:h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.level === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="mb-2">
                      <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">{course.category}</span>
                    </div>
                    
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                      {course.short_description}
                    </p>

                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="flex items-center">
                        {renderStars(course.rating_average)}
                      </div>
                      <span className="ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {course.rating_average} ({course.rating_count})
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                      <div className="flex items-center">
                        <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {course.duration_hours}h
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {course.enrollment_count.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          {course.price === 0 ? 'Free' : `$${course.price}`}
                        </span>
                        {course.original_price && course.price !== course.original_price && (
                          <span className="ml-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${course.original_price}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/courses/${course.slug}`}
                      className="w-full bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block text-xs sm:text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
