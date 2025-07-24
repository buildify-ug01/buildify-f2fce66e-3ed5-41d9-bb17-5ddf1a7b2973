
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('teosUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock authentication functions (to be replaced with Supabase when connected)
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - in a real app, this would validate with Supabase
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user',
      };
      
      setUser(mockUser);
      localStorage.setItem('teosUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      // Mock registration - in a real app, this would create a user in Supabase
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        username,
        role: 'user',
      };
      
      setUser(mockUser);
      localStorage.setItem('teosUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Mock logout - in a real app, this would sign out from Supabase
      setUser(null);
      localStorage.removeItem('teosUser');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      // Mock password reset - in a real app, this would trigger a reset email via Supabase
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setLoading(true);
    try {
      // Mock profile update - in a real app, this would update the user in Supabase
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('teosUser', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};