import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi, LoginRequest, SignupRequest } from '@/services/authApi';
import { secureStorage } from '@/services/secureStorage';

interface User {
    id: any;
    email: any;
    username: any;
    password: any;
    is_teacher: any;
    first_name: any;
    last_name: any;
    bio: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (userData: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on app start
  useEffect(() => {
    refreshAuth();
  }, []);

  const refreshAuth = async () => {
    try {
      setIsLoading(true);
      const token = await secureStorage.getToken();
      const currentUser = await secureStorage.getUser();

      if (token && currentUser) {
        setUser(currentUser as User);
        setToken(token);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Auth refresh error:', error);
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await authApi.login(credentials);

      if (response.token && response.user) {
        // Store user data immediately
        await secureStorage.saveUser(response.user);
        setUser(response.user);

        // Refresh auth state to ensure consistency
        await refreshAuth();
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupRequest) => {
    try {
      setIsLoading(true);
      const response = await authApi.signup(userData);

      if (response.token && response.user) {
        // Store user data immediately
        await secureStorage.saveUser(response.user);
        setUser(response.user);

        // Refresh auth state to ensure consistency
        await refreshAuth();
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authApi.logout();
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    isTeacher: user?.is_teacher || false,
    isStudent: !user?.is_teacher || false,
    login,
    signup,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
