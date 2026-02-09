import { createRoute } from '@tanstack/react-router';
import { useAuthStore } from '../../entities/auth/auth.store';
import { rootRoute } from '../router';

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	beforeLoad: () => {
		const { isInitialized, accessToken } = useAuthStore.getState();
		if (!isInitialized) {
			return false;
		}
		if (accessToken) {
			window.location.href = '/dashboard';
		} else {
			window.location.href = '/login';
		}
		return false;
	},
});
