import { AuthContext } from '@/auth/authProvider.tsx';
import React from 'react';

export const useAuth = () => {
  return React.useContext(AuthContext);
};