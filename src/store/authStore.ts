import { create } from 'zustand';

// Define types for your state
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  // State
  user: User | null;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  logout: () => void;
}

// Create the store
export const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  isLoading: false,
  
  // Actions
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
