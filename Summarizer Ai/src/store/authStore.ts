import { create } from 'zustand';
import { User, UserPreferences } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  defaultLanguage: 'hi',
  summaryLength: 'medium',
  theme: 'light',
  notifications: true,
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        isGuest: false,
        preferences: defaultPreferences,
        createdAt: new Date(),
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        isGuest: false,
        preferences: defaultPreferences,
        createdAt: new Date(),
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  loginAsGuest: () => {
    const guestUser: User = {
      id: 'guest-' + Math.random().toString(36).substr(2, 9),
      email: '',
      name: 'Guest User',
      isGuest: true,
      preferences: defaultPreferences,
      createdAt: new Date(),
    };
    
    set({ user: guestUser, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updatePreferences: (newPreferences: Partial<UserPreferences>) => {
    const { user } = get();
    if (user) {
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...newPreferences }
      };
      set({ user: updatedUser });
    }
  },
}));