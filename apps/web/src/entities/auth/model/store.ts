import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthStore } from './types';

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			accessToken: null,
			isAuth: false,
			setAccessToken: (token) => set({ accessToken: token, isAuth: !!token }),
			logout: () => set({ accessToken: null, isAuth: false }),
		}),
		{
			name: 'auth_token',
			partialize: (state) => ({ accessToken: state.accessToken, isAuth: state.isAuth }),
		},
	),
);
