import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';
import { RegisterPage } from '../../pages/register/register.page';
import { useAuthStore } from '../../entities/auth/auth.store';

export const registerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/register',
	component: RegisterPage,
	beforeLoad: () => {
		const accessToken = useAuthStore.getState().accessToken;
		if (accessToken) {
			window.location.href = '/dashboard';
			return false;
		}
	},
});
