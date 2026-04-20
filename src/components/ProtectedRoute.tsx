import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentRole } from '../utils/auth';
import Layout from './Layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'mentor';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const currentRole = getCurrentRole();
    if (currentRole !== requiredRole) {
      return <Navigate to={`/${currentRole}/dashboard`} replace />;
    }
  }

  return <Layout>{children}</Layout>;
}
