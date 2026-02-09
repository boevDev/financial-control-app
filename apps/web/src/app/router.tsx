import { createRootRoute, createRouter, Outlet } from '@tanstack/react-router';
import { NotFoundPage } from '../pages/not-found/not-found.page';
import { indexRoute } from './routes/index.route';
import { loginRoute } from './routes/login.route';
import { registerRoute } from './routes/register.route';
import { dashboardRouteWithChildren } from './routes/dashboard/dashboard.route';

export const rootRoute = createRootRoute({
	component: () => <Outlet />,
	notFoundComponent: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	loginRoute,
	registerRoute,
	dashboardRouteWithChildren,
]);

export const router = createRouter({ routeTree });
