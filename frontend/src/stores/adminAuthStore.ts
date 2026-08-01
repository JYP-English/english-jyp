import { create } from 'zustand';
import { setAdminKey } from '@/lib/adminApi';

interface AdminAuthState {
  isAuthed: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ADMIN_PASSWORD = 'Pa64949372@@1231';

export const useAdminAuth = create<AdminAuthState>((set) => ({
  isAuthed: false,
  login: (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setAdminKey(password);
      set({ isAuthed: true });
      return true;
    }
    return false;
  },
  logout: () => {
    setAdminKey('');
    set({ isAuthed: false });
  },
}));
