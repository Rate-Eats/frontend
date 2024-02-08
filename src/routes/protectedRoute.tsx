import { Navigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth.ts';

export const ProtectedRoute = ({ children }: any) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
