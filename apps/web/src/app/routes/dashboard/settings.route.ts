import { createRoute } from '@tanstack/react-router';
import { dashboardRoute } from './dashboard.route';
import { SettingsPage } from '../../../pages/dashboard/settings.page';

export const settingsRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: 'settings',
	component: SettingsPage,
});
