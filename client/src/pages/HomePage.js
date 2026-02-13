import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  StarIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

import TestimonialCard from '../components/Testimonials/TestimonialCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useInView } from 'react-intersection-observer';

const HomePage = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [stats, setStats] = useState({
    totalCourses: 150,
    totalStudents: 25000,
    totalInstructors: 500,
    averageRating: 4.8,
  });
  const [loading, setLoading] = useState(false);

  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: BookOpenIcon,
      title: t('home.features.comprehensive.title'),
      description: t('home.features.comprehensive.description'),
    },
    {
      icon: UserGroupIcon,
      title: t('home.features.expert.title'),
      description: t('home.features.expert.description'),
    },
    {
      icon: PlayCircleIcon,
      title: t('home.features.interactive.title'),
      description: t('home.features.interactive.description'),
    },
    {
      icon: CheckCircleIcon,
      title: t('home.features.certified.title'),
      description: t('home.features.certified.description'),
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Software Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: 'EduHub transformed my career. The courses are well-structured and the instructors are amazing.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'The best online learning platform I\'ve used. Great content and excellent community support.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: 'I love the interactive approach and the practical projects. Highly recommended!',
      rating: 5,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('home.meta.title')} | EduHub</title>
        <meta name="description" content={t('home.meta.description')} />
        <meta name="keywords" content="online learning, courses, education, skills, certification" />
        <meta property="og:title" content={`${t('home.meta.title')} | EduHub`} />
        <meta property="og:description" content={t('home.meta.description')} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section ref={heroRef} className="relative bg-gradient-to-r from-primary-600 to-purple-700 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {t('home.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    {t('home.hero.dashboard')}
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      {t('home.hero.getStarted')}
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      to="/courses"
                      className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-primary-600 transition-colors duration-200"
                    >
                      {t('home.hero.browseCourses')}
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-5 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white opacity-5 rounded-full"></div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stats.totalCourses.toLocaleString()}+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {t('home.stats.courses')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stats.totalStudents.toLocaleString()}+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {t('home.stats.students')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stats.totalInstructors.toLocaleString()}+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {t('home.stats.instructors')}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stats.averageRating}
                  <StarIcon className="h-8 w-8 text-yellow-400 ml-1" />
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {t('home.stats.rating')}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('home.features.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('home.features.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-lg mb-4">
                    <feature.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('home.courses.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('home.courses.subtitle')}
              </p>
            </div>

            {/* Featured Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Sample Featured Courses */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                onClick={() => window.location.href = '/courses'}
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
                    alt="React Course"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Beginner
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Complete React Developer Course 2024
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Learn React from scratch with hands-on projects, modern hooks, and state management.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">$89.99</span>
                    <div className="flex items-center text-yellow-400">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mr-1">4.8</span>
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                onClick={() => window.location.href = '/courses'}
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop"
                    alt="Flutter Course"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Intermediate
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Flutter Mobile App Development
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Build cross-platform mobile apps for iOS and Android with Flutter framework.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">$99.99</span>
                    <div className="flex items-center text-yellow-400">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mr-1">4.8</span>
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                onClick={() => window.location.href = '/courses'}
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
                    alt="Next.js Course"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Advanced
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Next.js & TypeScript Full-Stack
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Build full-stack applications with Next.js, TypeScript, and modern deployment.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">$109.99</span>
                    <div className="flex items-center text-yellow-400">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mr-1">4.9</span>
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="text-center">
              <Link
                to="/courses"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                {t('home.courses.viewAll')}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('home.testimonials.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('home.testimonials.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  {t('home.cta.getStarted')}
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-primary-600 transition-colors duration-200"
                >
                  {t('home.cta.learnMore')}
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;