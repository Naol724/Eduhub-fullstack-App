import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DashboardPage from '../../pages/Dashboard/DashboardPage';
import InstructorDashboard from '../../pages/Instructor/InstructorDashboard';
import AdminDashboard from '../../pages/Admin/AdminDashboard';

const RoleBasedDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // Redirect to appropriate dashboard based on user role
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (user?.role === 'instructor') {
    return <Navigate to="/instructor" replace />;
  } else {
    return <DashboardPage />;
  }
};

export default RoleBasedDashboard;
