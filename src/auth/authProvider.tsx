import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContext {
  token: string | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContext>({
  token: null,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const [token, setToken] = React.useState<string | null>('xd');

  const handleLogin = async () => {
    const token: string = '';

    setToken(token);
    navigate('/');

  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
