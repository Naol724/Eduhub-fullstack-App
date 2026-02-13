import React, { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { AnimatePresence } from 'framer-motion';

import { Toaster } from 'react-hot-toast';



// Components

import Layout from './components/Layout/Layout';

import ProtectedRoute from './components/Auth/ProtectedRoute';

import LoadingSpinner from './components/UI/LoadingSpinner';



// Pages

import HomePage from './pages/HomePage';

import AboutPage from './pages/AboutPage';

import ContactPage from './pages/ContactPage';

import LoginPage from './pages/Auth/LoginPage';

import RegisterPage from './pages/Auth/RegisterPage';

import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';

import ResetPasswordPage from './pages/Auth/ResetPasswordPage';

import ProfilePage from './pages/User/ProfilePage';

import DashboardPage from './pages/Dashboard/DashboardPage';
import RoleBasedDashboard from './components/Dashboard/RoleBasedDashboard';

import MyLearningPage from './pages/Learning/MyLearningPage';

import CoursesPage from './pages/Courses/CoursesPage';

import CourseDetailPage from './pages/Courses/CourseDetailPage';

import LessonPage from './pages/Courses/LessonPage';

import CreateCoursePage from './pages/Instructor/CreateCoursePage';

import InstructorDashboard from './pages/Instructor/InstructorDashboard';

import AdminDashboard from './pages/Admin/AdminDashboard';

import ForumPage from './pages/Forum/ForumPage';

import NotFoundPage from './pages/NotFoundPage';



// Redux actions

import { checkAuthStatus } from './store/slices/authSlice';

import { initializeSocket } from './store/slices/socketSlice';



// Services

import { setupAxiosInterceptors } from './services/api';



function App() {

  const dispatch = useDispatch();

  const { isLoading, isAuthenticated, user } = useSelector((state) => state.auth);

  const { darkMode } = useSelector((state) => state.ui);



  useEffect(() => {

    // Setup axios interceptors

    setupAxiosInterceptors(dispatch);

    

    // Check authentication status

    dispatch(checkAuthStatus());

  }, [dispatch]);



  useEffect(() => {

    // Initialize socket connection if authenticated

    if (isAuthenticated && user) {

      dispatch(initializeSocket());

    }

  }, [dispatch, isAuthenticated, user]);



  useEffect(() => {

    // Apply dark mode class to document

    if (darkMode) {

      document.documentElement.classList.add('dark');

    } else {

      document.documentElement.classList.remove('dark');

    }

  }, [darkMode]);



  if (isLoading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">

        <LoadingSpinner size="lg" />

      </div>

    );

  }



  return (

    <div className="App">

      <Toaster

        position="top-right"

        toastOptions={{

          duration: 4000,

          style: {

            background: '#363636',

            color: '#fff',

          },

          success: {

            duration: 3000,

            theme: {

              primary: 'green',

              secondary: 'black',

            },

          },

        }}

      />

      <AnimatePresence mode="wait">

        <Routes>

          {/* Public Routes */}

          <Route path="/" element={<Layout />}>

            <Route index element={<HomePage />} />

            <Route path="about" element={<AboutPage />} />

            <Route path="contact" element={<ContactPage />} />

            <Route path="courses" element={<CoursesPage />} />

            <Route path="courses/:slug" element={<CourseDetailPage />} />

            

            {/* Auth Routes */}

            <Route 

              path="login" 

              element={

                isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />

              } 

            />

            <Route 

              path="register" 

              element={

                isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />

              } 

            />

            <Route path="forgot-password" element={<ForgotPasswordPage />} />

            <Route path="reset-password/:token" element={<ResetPasswordPage />} />

            

            {/* Protected Routes */}

            <Route 

              path="dashboard" 

              element={

                <ProtectedRoute>

                  <RoleBasedDashboard />

                </ProtectedRoute>

              } 

            />

            <Route 

              path="profile" 

              element={

                <ProtectedRoute>

                  <ProfilePage />

                </ProtectedRoute>

              } 

            />

            <Route 

              path="my-courses" 

              element={

                <ProtectedRoute>

                  <MyLearningPage />

                </ProtectedRoute>

              } 

            />

            <Route 

              path="learn/:courseSlug/:lessonSlug" 

              element={

                <ProtectedRoute>

                  <LessonPage />

                </ProtectedRoute>

              } 

            />

            <Route 

              path="forums/:courseSlug?" 

              element={

                <ProtectedRoute>

                  <ForumPage />

                </ProtectedRoute>

              } 

            />

            

            {/* Instructor Routes */}

            <Route 

              path="instructor" 

              element={

                <ProtectedRoute allowedRoles={['instructor', 'admin']}>

                  <InstructorDashboard />

                </ProtectedRoute>

              } 

            />

            <Route 

              path="instructor/create-course" 

              element={

                <ProtectedRoute allowedRoles={['instructor', 'admin']}>

                  <CreateCoursePage />

                </ProtectedRoute>

              } 

            />

            

            {/* Admin Routes */}

            <Route 

              path="admin/*" 

              element={

                <ProtectedRoute allowedRoles={['admin']}>

                  <AdminDashboard />

                </ProtectedRoute>

              } 

            />

            

            {/* 404 Route */}

            <Route path="*" element={<NotFoundPage />} />

          </Route>

        </Routes>

      </AnimatePresence>

    </div>

  );

}



export default App;