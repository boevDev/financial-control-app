import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';
import { LoginPage } from '../../pages/login/login.page';
import { useAuthStore } from '../../entities/auth/auth.store';

export const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: LoginPage,
	beforeLoad: () => {
		const accessToken = useAuthStore.getState().accessToken;
		if (accessToken) {
			window.location.href = '/dashboard';
			return false;
		}
	},
});
