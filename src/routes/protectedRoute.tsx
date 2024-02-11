import { Navigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth.ts';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userData } = useAuth();

  if (!userData) {
    return <Navigate to="/" />;
  }

  return children;
};
