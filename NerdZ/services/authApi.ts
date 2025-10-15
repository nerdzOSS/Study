import axios from 'axios';
import { secureStorage } from './secureStorage';
import {createClient} from '@supabase/supabase-js'

// API configuration
const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL!, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!)
const API_BASE_URL = 'https://study-a09j.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await secureStorage.getToken();
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh or logout on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear auth data
      await secureStorage.clearAuth();
    }
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
  is_teacher?: boolean;
  firstName?: string;
  lastName?: string;
  bio?: string;
}

export interface AuthResponse {
  success: boolean;
  data: string;
  token?: string;
  user?: any;
}

export interface User {
    id: any;
    email: any;
    username: any;
    password: any;
    is_teacher: any;
    first_name: any;
    last_name: any;
    bio: any;
}

export const authApi = {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/login', credentials);

      // Check if login was successful
      if (!response.data.success) {
        throw new Error(response.data.data || 'Login failed');
      }

      if (response.data.token) {
        // Store token and user data
        await secureStorage.saveToken(response.data.token);
        if (response.data.user) {
          await secureStorage.saveUser(response.data.user);
        }
      }

      return response.data;
    } catch (error: any) {
      // If it's already our custom error from the success check, re-throw it
      if (error.message && error.message !== 'Login failed') {
        throw error;
      }
      // Otherwise, it's a network error
      throw new Error(error.response?.data?.message || error.response?.data?.data || error.message || 'Login failed');
    }
  },

  // Signup user
  async signup(userData: SignupRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/user/signup', userData);
      // Check if signup was successful
      if (!response.data.success && JSON.stringify(response.data.data) !== '{}') {
        console.log(JSON.stringify(response.data))
        throw new Error(JSON.stringify(response.data.data) || 'Signup failed');
      }

      if (response.data.token) {
        // Store token and user data
        await secureStorage.saveToken(response.data.token);
        if (response.data.user) {
          await secureStorage.saveUser(response.data.user);
        }
      }

      return response.data;
    } catch (error: any) {
      // If it's already our custom error from the success check, re-throw it
      if (error.message && error.message !== 'Signup failed') {
        throw error;
      }
      // Otherwise, it's a network error
      throw new Error(error.response?.data?.data || error.message || 'Signup failed');
    }
  },

  // Get users (protected route)
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get<{ users: User[] }>('/user/getUsers');
      return response.data.users;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      await secureStorage.clearAuth();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await secureStorage.getToken();
      return !!token;
    } catch (error) {
      return false;
    }
  },

  // Get current user data
  async getCurrentUser(): Promise<any> {
    try {
      return await secureStorage.getUser();
    } catch (error) {
      return null;
    }
  },

  async delete(email:string):Promise<void>{
    try{
      const {data,error} =await supabase.from('users').delete().eq('email', email)
      if(error){
        throw error;
      }
      await secureStorage.clearAuth();
    }catch(error){
      console.error('Delete error:', error);
      throw error;
    }
  }
};

export default authApi;
