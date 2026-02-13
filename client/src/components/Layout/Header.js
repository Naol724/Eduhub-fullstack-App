import React, { useState, useRef, useEffect } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';

import {

  Bars3Icon,

  XMarkIcon,

  MagnifyingGlassIcon,

  BellIcon,

  UserCircleIcon,

  SunIcon,

  MoonIcon,

  GlobeAltIcon,

  Cog6ToothIcon,

  ArrowRightOnRectangleIcon,

} from '@heroicons/react/24/outline';



import { logoutUser } from '../../store/slices/authSlice';

import { toggleSidebar, toggleDarkMode, setLanguage } from '../../store/slices/uiSlice';

import { useTranslation } from 'react-i18next';

import SearchModal from '../Search/SearchModal';

import NotificationDropdown from '../Notifications/NotificationDropdown';



const Header = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { t, i18n } = useTranslation();

  

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { darkMode, language } = useSelector((state) => state.ui);

  const { unreadCount } = useSelector((state) => state.notifications);

  

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  

  const userMenuRef = useRef(null);

  const languageMenuRef = useRef(null);



  // Close dropdowns when clicking outside

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {

        setUserMenuOpen(false);

      }

      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {

        setLanguageMenuOpen(false);

      }

    };



    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);

  }, []);



  const handleLogout = () => {

    dispatch(logoutUser());

    navigate('/');

    setUserMenuOpen(false);

  };



  const handleLanguageChange = (lang) => {

    i18n.changeLanguage(lang);

    dispatch(setLanguage(lang));

    setLanguageMenuOpen(false);

  };



  const navigation = [

    { name: t('nav.home'), href: '/', current: location.pathname === '/' },

    { name: t('nav.courses'), href: '/courses', current: location.pathname === '/courses' },

    { name: t('nav.about'), href: '/about', current: location.pathname === '/about' },

    { name: t('nav.contact'), href: '/contact', current: location.pathname === '/contact' },

  ];



  const userNavigation = [

    { name: t('nav.profile'), href: '/profile', icon: UserCircleIcon },

    { name: t('nav.dashboard'), href: '/dashboard', icon: Cog6ToothIcon },

    { name: t('nav.settings'), href: '/settings', icon: Cog6ToothIcon },

  ];



  const languages = [

    { code: 'en', name: 'English', flag: '🇺🇸' },

    { code: 'es', name: 'Español', flag: '🇪🇸' },

    { code: 'fr', name: 'Français', flag: '🇫🇷' },

    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },

  ];



  return (

    <>

      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">

          <div className="flex justify-between items-center h-14 sm:h-16">

            {/* Logo and mobile menu button */}

            <div className="flex items-center">

              {isAuthenticated && (

                <button

                  type="button"

                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"

                  onClick={() => dispatch(toggleSidebar())}

                >

                  <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />

                </button>

              )}

              

              <Link to="/" className="flex items-center ml-2 sm:ml-4 lg:ml-0">

                <div className="flex-shrink-0 flex items-center">

                  <div className="h-6 w-6 sm:h-7 sm:w-7 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">

                    <span className="text-white font-bold text-sm sm:text-lg">E</span>

                  </div>

                  <span className="ml-1 sm:ml-2 text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">

                    EduHub

                  </span>

                </div>

              </Link>

            </div>

            {/* Desktop navigation - show on md and up for better tablet experience */}

            <nav className="hidden md:flex lg:space-x-6 md:space-x-4 md:space-x-3">

              {navigation.map((item) => (

                <Link

                  key={item.name}

                  to={item.href}

                  className={`${

                    item.current

                      ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/30 shadow-md'

                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'

                  } inline-flex items-center px-1 sm:px-2 md:px-3 lg:px-4 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}

                >

                  {item.name}

                </Link>

              ))}

            </nav>

            {/* Right side items */}

            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">

              {/* Search - hidden on smallest screens */}

              <button

                type="button"

                className="hidden sm:flex p-1.5 sm:p-2 lg:p-2.5 rounded-xl text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"

                onClick={() => setSearchModalOpen(true)}

                aria-label="Search"

              >

                <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" />

              </button>

              {/* Dark mode toggle */}

              <button

                type="button"

                className="p-1.5 sm:p-2 lg:p-2.5 rounded-xl text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"

                onClick={() => dispatch(toggleDarkMode())}

                aria-label="Toggle dark mode"

              >

                {darkMode ? (

                  <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" />

                ) : (

                  <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5" />

                )}

              </button>

              {/* Language selector - hidden on mobile */}

              <div className="relative hidden sm:block" ref={languageMenuRef}>

                <button

                  type="button"

                  className="p-1.5 sm:p-2 lg:p-2.5 rounded-xl text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"

                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}

                >

                  <GlobeAltIcon className="h-4 w-4 sm:h-5 sm:w-5" />

                </button>

                <AnimatePresence>

                  {languageMenuOpen && (

                    <motion.div

                      initial={{ opacity: 0, scale: 0.95 }}

                      animate={{ opacity: 1, scale: 1 }}

                      exit={{ opacity: 0, scale: 0.95 }}

                      transition={{ duration: 0.1 }}

                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"

                    >

                      <div className="py-1">

                        {languages.map((lang) => (

                          <button

                            key={lang.code}

                            onClick={() => handleLanguageChange(lang.code)}

                            className={`${

                              language === lang.code

                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'

                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'

                            } group flex items-center px-3 sm:px-4 py-2 text-sm w-full text-left transition-colors duration-200`}

                          >

                            <span className="mr-2 sm:mr-3 text-lg sm:text-xl transform transition-transform duration-200 group-hover:scale-150 group-hover:rotate-12">{lang.flag}</span>

                            <span className="font-medium">{lang.name}</span>

                          </button>

                        ))}

                      </div>

                    </motion.div>

                  )}

                </AnimatePresence>

              </div>

              {isAuthenticated ? (

                <>

                  {/* Notifications */}

                  <NotificationDropdown />

                  {/* User menu */}

                  <div className="relative" ref={userMenuRef}>

                    <button

                      type="button"

                      className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"

                      onClick={() => setUserMenuOpen(!userMenuOpen)}

                    >

                      {user?.avatar ? (

                        <img

                          className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover"

                          src={user.avatar}

                          alt={user.first_name}

                        />

                      ) : (

                        <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-500 flex items-center justify-center">

                          <span className="text-xs sm:text-sm font-medium text-white">

                            {user?.first_name?.[0]?.toUpperCase()}

                          </span>

                        </div>

                      )}

                    </button>

                    <AnimatePresence>

                      {userMenuOpen && (

                        <motion.div

                          initial={{ opacity: 0, scale: 0.95 }}

                          animate={{ opacity: 1, scale: 1 }}

                          exit={{ opacity: 0, scale: 0.95 }}

                          transition={{ duration: 0.1 }}

                          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"

                        >

                          <div className="py-1">

                            <div className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">

                              <p className="font-medium">{user?.first_name} {user?.last_name}</p>

                              <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>

                            </div>

                            

                            {userNavigation.map((item) => (

                              <Link

                                key={item.name}

                                to={item.href}

                                className="group flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"

                                onClick={() => setUserMenuOpen(false)}

                              >

                                <item.icon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500" />

                                {item.name}

                              </Link>

                            ))}

                            

                            <button

                              onClick={handleLogout}

                              className="group flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"

                            >

                              <ArrowRightOnRectangleIcon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500" />

                              {t('nav.logout')}

                            </button>

                          </div>

                        </motion.div>

                      )}

                    </AnimatePresence>

                  </div>

                </>

              ) : (

                <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">

                  <Link

                    to="/login"

                    className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium"

                  >

                    {t('auth.login')}

                  </Link>

                  <Link

                    to="/register"

                    className="bg-primary-600 hover:bg-primary-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"

                  >

                    {t('auth.register')}

                  </Link>

                </div>

              )}

              {/* Mobile menu button */}

              <button

                type="button"

                className="md:hidden p-1.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"

                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}

              >

                {mobileMenuOpen ? (

                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />

                ) : (

                  <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />

                )}

              </button>

            </div>

          </div>

        </div>

        {/* Mobile menu */}

        <AnimatePresence>

          {mobileMenuOpen && (

            <motion.div

              initial={{ opacity: 0, height: 0 }}

              animate={{ opacity: 1, height: 'auto' }}

              exit={{ opacity: 0, height: 0 }}

              transition={{ duration: 0.2 }}

              className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"

            >

              <div className="px-2 pt-2 pb-3 space-y-1">

                {navigation.map((item) => (

                  <Link

                    to={item.href}

                    className={`${

                      item.current

                        ? 'bg-primary-50 dark:bg-primary-900 border-primary-500 text-primary-700 dark:text-primary-200'

                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'

                    } block pl-3 pr-4 py-2 border-l-4 text-sm font-medium transition-colors duration-200`}

                    onClick={() => setMobileMenuOpen(false)}

                  >

                    {item.name}

                  </Link>

                ))}

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </header>

      {/* Search Modal */}

      <SearchModal

        isOpen={searchModalOpen}

        onClose={() => setSearchModalOpen(false)}

      />

    </>

  );

};

export default Header;