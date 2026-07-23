import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DoctorAuth {
  id: string;
  email: string;
  name: string;
  registrationNumber: string;
  token: string;
}

interface AuthStore {
  doctor: DoctorAuth | null;
  isAuthenticated: boolean;
  setAuth: (doctor: DoctorAuth) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      doctor: null,
      isAuthenticated: false,
      setAuth: (doctor: DoctorAuth) =>
        set({ doctor, isAuthenticated: true }),
      logout: () =>
        set({ doctor: null, isAuthenticated: false }),
      setToken: (token: string) =>
        set((state) =>
          state.doctor ? { doctor: { ...state.doctor, token } } : {}
        ),
    }),
    {
      name: 'auth-storage',
    }
  )
);
