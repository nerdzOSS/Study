import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ColorScheme {
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accentPurple: string;
  accentPink: string;
  accentViolet: string;
  cardBg: string;
  borderColor: string;
  success: string;
}

export const darkTheme: ColorScheme = {
  bgPrimary: '#0a0a0f',
  bgSecondary: '#13131a',
  textPrimary: '#ffffff',
  textSecondary: '#b4b4c8',
  accentPurple: '#6366f1',
  accentPink: '#ec4899',
  accentViolet: '#a855f7',
  cardBg: 'rgba(30, 30, 45, 0.6)',
  borderColor: 'rgba(99, 102, 241, 0.2)',
  success: '#10b981',
};

export const lightTheme: ColorScheme = {
  bgPrimary: '#ffffff',
  bgSecondary: '#f8fafc',
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  accentPurple: '#6366f1',
  accentPink: '#ec4899',
  accentViolet: '#a855f7',
  cardBg: 'rgba(248, 250, 252, 0.8)',
  borderColor: 'rgba(99, 102, 241, 0.2)',
  success: '#10b981',
};

interface ThemeContextType {
  isDark: boolean;
  colors: ColorScheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark theme

  useEffect(() => {
    // Load saved theme preference
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
    }
  };

  const saveThemePreference = async (theme: string) => {
    try {
      await AsyncStorage.setItem('theme', theme);
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    saveThemePreference(newTheme ? 'dark' : 'light');
  };

  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
