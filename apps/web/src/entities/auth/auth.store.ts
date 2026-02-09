import type { AuthUser } from '@finance/shared-types';
import { create } from 'zustand';

const STORAGE_KEY = 'auth_token';

interface AuthState {
	user: AuthUser | null;
	accessToken: string | null;
	isAuth: boolean;
	isInitialized: boolean;
	setUser: (user: AuthUser | null) => void;
	setAccessToken: (token: string | null) => void;
	logout: () => void;
	initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	accessToken: null,
	isAuth: false,
	isInitialized: false,
	setUser: (user) => set({ user, isAuth: !!user }),
	setAccessToken: (token) => {
		if (token) {
			localStorage.setItem(STORAGE_KEY, token);
		} else {
			localStorage.removeItem(STORAGE_KEY);
		}
		set({ accessToken: token });
	},
	logout: () => {
		localStorage.removeItem(STORAGE_KEY);
		set({ user: null, accessToken: null, isAuth: false });
	},
	initializeAuth: () => {
		const savedToken = localStorage.getItem(STORAGE_KEY);
		if (savedToken) {
			set({ accessToken: savedToken });
		}
		set({ isInitialized: true });
	},
}));
