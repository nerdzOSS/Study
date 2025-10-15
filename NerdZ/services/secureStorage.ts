// utils/secureStorage.ts
import * as SecureStore from 'expo-secure-store';
import { User } from './authApi';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// Check if running on web
const isWeb = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

// Web storage implementation
const webStorage = {
  async setItem(key: string, value: string) {
    if (isWeb) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Web storage error:', error);
        throw error;
      }
    } else {
      await SecureStore.setItemAsync(key, value, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      });
    }
  },

  async getItem(key: string): Promise<string | null> {
    if (isWeb) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Web storage error:', error);
        return null;
      }
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },

  async deleteItem(key: string) {
    if (isWeb) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Web storage error:', error);
        throw error; // Re-throw the error so clearAuth() knows it failed
      }
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

export const secureStorage = {
  // Save JWT token
  async saveToken(token: string) {
    try {
      await webStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  },

  // Get JWT token
  async getToken(): Promise<string | null> {
    try {
      return await webStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Save user data
  async saveUser(userData: object) {
    try {
      console.log('Saving user data to storage:', userData);
      await webStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  // Get user data
  async getUser(): Promise<User | null> {
    try {
      const data = await webStorage.getItem(USER_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        console.log('Retrieved user data from storage:', parsed);
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Clear all auth data
  async clearAuth() {
    try {
      console.log('Clearing auth data...');
      await webStorage.deleteItem(TOKEN_KEY);
      await webStorage.deleteItem(USER_KEY);
      console.log('Auth data cleared successfully');

      // Verify that items were actually removed
      const tokenAfter = await webStorage.getItem(TOKEN_KEY);
      const userAfter = await webStorage.getItem(USER_KEY);

      if (tokenAfter || userAfter) {
        console.warn('Warning: Some auth data may still exist after clearing');
      }
    } catch (error) {
      console.error('Error clearing auth:', error);
      throw error; // Re-throw so calling code knows it failed
    }
  },
};
