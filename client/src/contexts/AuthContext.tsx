import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType {
  auth: AuthState;
  login: (user: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<AuthState>(() => {
    // Try to get auth data from localStorage
    const storedAuth = localStorage.getItem('auth');
    return storedAuth 
      ? JSON.parse(storedAuth) 
      : { user: null, token: null, isAuthenticated: false };
  });

  useEffect(() => {
    // Save auth state to localStorage whenever it changes
    localStorage.setItem('auth', JSON.stringify(auth));
    setIsLoading(false);
  }, [auth]);

  const login = (user: User, token: string) => {
    setAuth({
      user,
      token,
      isAuthenticated: true
    });
  };

  const logout = () => {
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 