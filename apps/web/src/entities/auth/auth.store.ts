import type { AuthUser } from '@finance/shared-types';
import { create } from 'zustand';

interface AuthState {
	user: AuthUser | null;
	accessToken: string | null;
	isAuth: boolean;
	setUser: (user: AuthUser | null) => void;
	setAccessToken: (token: string | null) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	accessToken: null,
	isAuth: false,
	setUser: (user) => set({ user, isAuth: !!user }),
	setAccessToken: (token) => set({ accessToken: token }),
	logout: () => set({ user: null, accessToken: null, isAuth: false }),
}));
