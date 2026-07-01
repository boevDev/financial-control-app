import { createRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../entities/auth/auth.store';
import { rootRoute } from '../router';

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	beforeLoad: () => {
		const { isInitialized, accessToken } = useAuthStore.getState();

		if (!isInitialized) {
			return;
		}

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
