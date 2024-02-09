import React, { createContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContext {
  token: string | null;
  onLogin: (token: string) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContext>({
  token: null,
  onLogin: () => {},
  onLogout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useLocalStorage('jwtToken', null);

  const handleLogin = async (token: string) => {
    setToken(token);
    navigate('/');
  };

  const handleGoogleLogin = async () => {
    const idToken = location.search.slice(10);
    const response = await axios.get(
      `https://1c21-37-128-40-211.ngrok-free.app/api/auth/google/callback?access_token=${idToken}`,
    );
    setToken(response.data.jwt);
    navigate('/');
  };

  const handleLogout = () => {
    setToken(null);
  };

  useEffect(() => {
    if (location.pathname === '/auth/google/callback') {
      handleGoogleLogin();
    }
  }, [location]);

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
