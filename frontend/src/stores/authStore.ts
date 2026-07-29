import { create } from 'zustand';
import type { User } from '@/types';
import { setAccessToken } from '@/lib/api';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  setAuth: (user, token) => {
    setAccessToken(token);
    set({ user, isLoggedIn: true });
  },

  clearAuth: () => {
    setAccessToken(null);
    set({ user: null, isLoggedIn: false });
  },
}));
