// utils/secureStorage.ts
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { User } from './authApi';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const secureStorage = {
  // Save JWT token
  async saveToken(token: string) {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  },

  // Get JWT token
  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Save user data
  async saveUser(userData: object) {
    try {
      console.log('Saving user data to storage:', userData);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  // Get user data
  async getUser(): Promise<User | null> {
    try {
      const data = await SecureStore.getItemAsync(USER_KEY);
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
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },
};
