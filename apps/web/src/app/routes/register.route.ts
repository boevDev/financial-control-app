import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';
import { RegisterPage } from '../../pages/register/register.page';

export const registerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/register',
	component: RegisterPage,
});
