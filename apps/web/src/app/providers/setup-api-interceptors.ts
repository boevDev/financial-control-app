import axios, { type InternalAxiosRequestConfig } from 'axios';
import { api } from '@/shared/api';
import { useAuthStore } from '@/entities/auth';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

export function setupApiInterceptors() {
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
			const originalRequest = error.config as CustomAxiosRequestConfig;

			if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
				originalRequest._retry = true;

				try {
					const res = await axios.post(
						'/auth/refresh',
						{},
						{
							baseURL: import.meta.env.VITE_API_URL,
							withCredentials: true,
						},
					);

					const newAccessToken = res.data.accessToken;
					useAuthStore.getState().setAccessToken(newAccessToken);

					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

					return api(originalRequest);
				} catch (refreshError) {
					useAuthStore.getState().logout();
					return Promise.reject(refreshError);
				}
			}
			return Promise.reject(error);
		},
	);
}
