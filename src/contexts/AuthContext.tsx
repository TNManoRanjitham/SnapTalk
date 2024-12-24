import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login } from '../services/authService';

export interface AuthContextProps {
  user: { userId: string | null; username?: string } | null;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ userId: string | null; } | null>(null);

  // Handle login logic
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
      if (response && response.message) {
        setUser({ userId: username });
      } else {
        console.error('Login failed', response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Handle logout logic
  const handleLogout = async () => {
    try {
      localStorage.removeItem('userId');  // Clear user ID from localStorage
      localStorage.removeItem('token'); 
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Use effect to check if the user is already logged in
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser({ userId });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
