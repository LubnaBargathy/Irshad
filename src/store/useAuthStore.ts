import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    username: string;
    isAnonymous: boolean;
    role: 'patient' | 'counselor';
  } | null;
  login: (username: string) => void;
  loginAnonymous: () => void;
  loginCounselor: (username: string) => void;
  logout: () => void;
}

const generateSerial = () => `USR-${Math.floor(100000 + Math.random() * 900000)}`;

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (username) => set({ 
    isAuthenticated: true, 
    user: { id: generateSerial(), username, isAnonymous: false, role: 'patient' } 
  }),
  loginAnonymous: () => {
    const serial = generateSerial();
    set({
      isAuthenticated: true,
      user: { id: serial, username: serial, isAnonymous: true, role: 'patient' }
    });
  },
  loginCounselor: (username) => set({
    isAuthenticated: true,
    user: { id: 'DOC-9921', username, isAnonymous: false, role: 'counselor' }
  }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
