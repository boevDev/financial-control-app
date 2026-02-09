import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';
import { LoginPage } from '../../pages/login/login.page';

export const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: LoginPage,
});
