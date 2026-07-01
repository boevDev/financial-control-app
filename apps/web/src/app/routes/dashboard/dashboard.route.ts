import { createRoute, redirect } from '@tanstack/react-router';
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
		if (!accessToken) {
			throw redirect({
				to: '/login',
				replace: true,
			});
		}
	},
});

export const dashboardRouteWithChildren = dashboardRoute.addChildren([profileRoute, settingsRoute]);
