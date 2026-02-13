import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarOpen } from '../../store/slices/uiSlice';

const Sidebar = ({ isOpen, userRole }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(setSidebarOpen(false));
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Courses', href: '/courses', icon: '📚' },
    { name: 'My Learning', href: '/my-courses', icon: '🎓' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ];

  const instructorNavigation = [
    { name: 'Create Course', href: '/instructor/create-course', icon: '➕' },
    { name: 'My Courses', href: '/instructor/courses', icon: '📖' },
    { name: 'Analytics', href: '/instructor/analytics', icon: '📈' },
  ];

  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin', icon: '⚙️' },
    { name: 'User Management', href: '/admin/users', icon: '👥' },
    { name: 'Course Management', href: '/admin/courses', icon: '📚' },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col`}>
        
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={handleClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => window.innerWidth < 1024 && handleClose()}
                className={`${
                  location.pathname === item.href
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Instructor
              </h3>
              <div className="mt-1 space-y-1">
                {instructorNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => window.innerWidth < 1024 && handleClose()}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {user?.role === 'admin' && (
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Admin
              </h3>
              <div className="mt-1 space-y-1">
                {adminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => window.innerWidth < 1024 && handleClose()}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;