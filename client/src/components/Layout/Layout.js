import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { sidebarOpen } = useSelector((state) => state.ui);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      {isAuthenticated ? (
        // Authenticated layout with fixed sidebar
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            isOpen={sidebarOpen}
            userRole={user?.role}
          />
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <Outlet />
          </main>
        </div>
      ) : (
        // Public layout without sidebar
        <div className="flex flex-col flex-1">
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;