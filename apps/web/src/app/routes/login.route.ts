import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from '../router';
import { LoginPage } from '../../pages/login/login.page';
import { useAuthStore } from '@/entities/auth';

export const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: LoginPage,
	beforeLoad: () => {
		const accessToken = useAuthStore.getState().accessToken;

		if (accessToken) {
			throw redirect({
				to: '/dashboard',
				replace: true,
			});
		}
	},
});
