import type { AuthResponse, AuthUser } from '@finance/shared-types';
import { api } from '../../shared/lib/api';

export const authApi = {
	register: (email: string, password: string) =>
		api.post<AuthResponse>('/auth/register', { email, password }).then((res) => res.data),

	login: (email: string, password: string) =>
		api.post<AuthResponse>('/auth/login', { email, password }).then((res) => res.data),

	refresh: () => api.post<AuthResponse>('/auth/refresh').then((res) => res.data),

	me: () => api.get<AuthUser>('/auth/me').then((res) => res.data),
};
