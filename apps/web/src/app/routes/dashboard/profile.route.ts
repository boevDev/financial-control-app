import { createRoute } from '@tanstack/react-router';
import { ProfilePage } from '../../../pages/dashboard/profile.page';
import { dashboardRoute } from './dashboard.route';

export const profileRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: 'profile',
	component: ProfilePage,
});
