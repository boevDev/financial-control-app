import axios from 'axios';
import { useAuthStore } from '../../entities/auth/auth.store';

export const api = axios.create({
	baseURL: 'http://localhost:3000',
	withCredentials: true,
});

// Добавляем accessToken в каждый запрос
api.interceptors.request.use((config) => {
	const accessToken = useAuthStore.getState().accessToken;
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});
