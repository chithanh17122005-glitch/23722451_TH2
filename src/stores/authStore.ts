import { create } from 'zustand';
import { STUDENT, examStamp } from '@constants/student';

interface AuthState {
  token: string | null;
  authValue: string;
  login: (value: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  authValue: '',
  login: (value: string) => {
    const generatedToken = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
    set({ token: generatedToken, authValue: value });
  },
  logout: () => {
    set({ token: null, authValue: '' });
  },
}));
