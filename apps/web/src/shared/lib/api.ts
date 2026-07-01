import axios from 'axios';
import { useAuthStore } from '@/entities/auth';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const res = await axios.post(
					'/auth/refresh',
					{},
					{ baseURL: import.meta.env.VITE_API_URL },
				);
				useAuthStore.getState().setAccessToken(res.data.accessToken);

				originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
				return api(originalRequest);
			} catch (refreshError) {
				useAuthStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);
