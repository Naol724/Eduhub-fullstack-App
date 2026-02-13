import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    enrolled: 0,
    completed: 0,
    certificates: 0,
    hoursLearned: 0
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
    fetchEnrolledCourses();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/users/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/enrollments/my-courses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEnrolledCourses(data.data.slice(0, 2)); // Show only first 2 courses
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      name: 'Enrolled Courses',
      value: stats.enrolled.toString(),
      icon: BookOpenIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      name: 'Completed Courses',
      value: stats.completed.toString(),
      icon: TrophyIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    {
      name: 'Hours Learned',
      value: stats.hoursLearned.toString(),
      icon: ClockIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      name: 'Certificates',
      value: stats.certificates.toString(),
      icon: AcademicCapIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900'
    }
  ];

  const handleContinueLearning = (courseId) => {
    // Convert courseId to slug format for navigation
    const courseSlug = courseId || 'course-1';
    navigate(`/learn/${courseSlug}/lesson-1`);
  };

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.first_name || 'Student'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue your learning journey and track your progress.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Continue Learning
              </h2>
              
              {enrolledCourses.length > 0 ? (
                <div className="space-y-4">
                  {enrolledCourses.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop`}
                        alt={enrollment.course?.title}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {enrollment.course?.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          by {enrollment.course?.instructor?.first_name} {enrollment.course?.instructor?.last_name} • 
                          Enrolled {new Date(enrollment.enrollment_date).toLocaleDateString()}
                        </p>
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${enrollment.progress_percentage || 0}%` }}
                            />
                          </div>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {enrollment.progress_percentage || 0}%
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleContinueLearning(enrollment.course_id)}
                        className="ml-4 p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                      >
                        <PlayIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    You haven't enrolled in any courses yet.
                  </p>
                  <button 
                    onClick={() => navigate('/courses')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Courses
                  </button>
                </div>
              )}

              {enrolledCourses.length > 0 && (
                <div className="mt-6">
                  <button 
                    onClick={() => navigate('/courses')}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Browse All Courses
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Quick Actions & Progress */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/courses')}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <BookOpenIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-900 dark:text-white">Browse Courses</span>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <ChartBarIcon className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-900 dark:text-white">View Progress</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-gray-900 dark:text-white">My Certificates</span>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Learning Streak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-6 text-white"
            >
              <h2 className="text-xl font-semibold mb-2">Learning Streak</h2>
              <div className="text-3xl font-bold mb-2">
                {stats.enrolled > 0 ? `${Math.min(stats.enrolled * 2, 14)} Days` : '0 Days'} 🔥
              </div>
              <p className="text-blue-100 text-sm">
                {stats.enrolled > 0 
                  ? "Keep it up! You're on a great learning streak." 
                  : "Start learning to build your streak!"
                }
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;