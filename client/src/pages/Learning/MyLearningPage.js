import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  PlayIcon,
  ClockIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { fetchEnrolledCourses } from '../../store/slices/enrollmentSlice';

const MyLearningPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { enrolledCourses, loading } = useSelector((state) => ({
    enrolledCourses: state.enrollment.enrolledCourses,
    loading: state.enrollment.loading.enrolledCourses
  }));
  const [stats, setStats] = useState({
    inProgress: 0,
    completed: 0,
    totalHours: 0,
    certificates: 0
  });

  useEffect(() => {
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      const completed = enrolledCourses.filter(course => course.progress_percentage === 100).length;
      const inProgress = enrolledCourses.filter(course => course.progress_percentage < 100).length;
      const totalHours = enrolledCourses.reduce((acc, course) => acc + (course.course?.duration_hours || 0), 0);
      
      setStats({
        inProgress,
        completed,
        totalHours,
        certificates: completed
      });
    }
  }, [enrolledCourses]);

  const handleContinueLearning = (courseId, courseSlug) => {
    navigate(`/learn/${courseSlug || courseId}/lesson-1`);
  };

  const statsData = [
    {
      name: 'In Progress',
      value: stats.inProgress.toString(),
      icon: BookOpenIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      name: 'Completed',
      value: stats.completed.toString(),
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    {
      name: 'Learning Hours',
      value: Math.round(stats.totalHours).toString(),
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

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Learning
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and continue your learning journey.
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

        {/* Enrolled Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Courses
            </h2>
          </div>
          
          {enrolledCourses.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {enrolledCourses.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={enrollment.course?.thumbnail || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'}
                      alt={enrollment.course?.title}
                      className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        {enrollment.course?.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        by {enrollment.course?.instructor?.first_name} {enrollment.course?.instructor?.last_name}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {enrollment.course?.duration_hours || 0}h
                        </span>
                        <span className="flex items-center">
                          <BookOpenIcon className="h-4 w-4 mr-1" />
                          {enrollment.course?.lessons_count || 0} lessons
                        </span>
                        <span>
                          Enrolled {new Date(enrollment.enrollment_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Progress
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {enrollment.progress_percentage || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${enrollment.progress_percentage || 0}%` }}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleContinueLearning(enrollment.course_id, enrollment.course?.slug)}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <PlayIcon className="h-4 w-4 mr-2" />
                          {enrollment.progress_percentage > 0 ? 'Continue' : 'Start'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <BookOpenIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No courses yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start your learning journey by enrolling in a course.
              </p>
              <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Courses
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyLearningPage;
