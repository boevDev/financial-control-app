import { createRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/entities/auth';
import { rootRoute } from '../router';

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	beforeLoad: () => {
		const { accessToken } = useAuthStore.getState();

		if (accessToken) {
			throw redirect({
				to: '/dashboard',
				replace: true,
			});
		} else {
			throw redirect({
				to: '/login',
				replace: true,
			});
		}
	},
});
