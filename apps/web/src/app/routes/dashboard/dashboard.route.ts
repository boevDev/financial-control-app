import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../../router';
import { DashboardPage } from '../../../pages/dashboard/dashboard.page';
import { useAuthStore } from '../../../entities/auth/auth.store';
import { profileRoute } from './profile.route';
import { settingsRoute } from './settings.route';

export const dashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/dashboard',
	component: DashboardPage,
	beforeLoad: () => {
		const accessToken = useAuthStore.getState().accessToken;
		console.log('[dashboard.route] beforeLoad, accessToken:', !!accessToken);
		if (!accessToken) {
			console.log('[dashboard.route] No accessToken, redirecting to /login');
			window.location.href = '/login';
			return false;
		}
		console.log('[dashboard.route] accessToken exists, allowing access');
		return true;
	},
});

export const dashboardRouteWithChildren = dashboardRoute.addChildren([profileRoute, settingsRoute]);
