import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { UserDataInterface } from '@shared/interfaces/user.ts';
import { useLocalStorage } from '@/hooks/useLocalStorage.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface LoginResponse {
  user: UserDataInterface;
  jwt: string;
}

interface AuthContext {
  onLogin: (userData: LoginResponse) => void;
  jwtToken: string;
  userData: UserDataInterface | null;
  onLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContext>({
  userData: null,
  jwtToken: '',
  onLogin: () => {},
  onLogout: () => {},
});

const templateData = {
  id: 0,
  username: '',
  email: '',
  provider: '',
  confirmed: true,
  blocked: true,
  createdAt: '',
  updatedAt: '',
  avatar: '',
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [jwtToken, setJwtToken] = useLocalStorage('jwtToken', null);
  const [userData, setUserData] = useState<UserDataInterface | null>(jwtToken ? templateData : null);

  const handleLogin = async (loginData: LoginResponse) => {
    setJwtToken(loginData.jwt);
    setUserData(loginData.user);
    navigate('/');
  };

  const handleGoogleLogin = async () => {
    const idToken = location.search.slice(10);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/google/callback?access_token=${idToken}`);
    setUserData(response.data.jwt);
    navigate('/');
  };

  const handleLogout = () => {
    setUserData(null);
    setJwtToken(null);
    navigate('/');
  };

  const getUserData = useMutation({
    mutationFn: () => {
      return axios.get(`${import.meta.env.VITE_API_URL}/users/me?`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
    onSuccess: (data) => setUserData(data.data),
    onError: () => {
      setUserData(null);
      setJwtToken(null);
    },
  });

  useEffect(() => {
    if (jwtToken) getUserData.mutate();
  }, [jwtToken]);

  useEffect(() => {
    if (location.pathname === '/auth/google/callback') {
      handleGoogleLogin();
    }
  }, [location]);

  const value = {
    userData,
    jwtToken,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
