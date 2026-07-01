import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
	accessToken: string | null;
	isAuth: boolean;
	setAccessToken: (token: string | null) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
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
