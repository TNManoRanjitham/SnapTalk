import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login, signup } from '../services/authService';

export interface AuthContextProps {
  user: { userId: string | null; username?: string } | null;
  handleLogin: (username: string, password: string) => void;
  handleSignup: (username: string, password: string) => void;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ userId: string | null; } | null>(null);

  // Function to determine device type (mobile or web)
  const getDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/android|iphone|ipod|windows phone/i.test(userAgent) || window.innerWidth <= 768) {
      return 'mobile';
    }
    return 'web';
  };


  // Handle login logic
  const handleLogin = async (username: string, password: string) => {
    try {
      const deviceId = localStorage.getItem('deviceId') || ''; // Fetch or generate deviceId
      const deviceType = getDeviceType();
      console.log(deviceType);

      const response = await login(username, password, deviceId , deviceType);
      if (response && response.message) {
        setUser({ userId: username });
      } else {
        console.error('Login failed', response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (username: string, password: string) => {
    try {
       await signup(username, password);
    } catch (error) {
      console.error('Signup error:', error);
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
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};
