import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/entities/auth';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { Button } from '@/shared/ui/button';
import Header from '@/shared/ui/layout/header';
import { ThemeSwitcher } from '@/features/theme';
import { usePageTitleStore } from '@/shared/hooks/pageTitle.store';
import { authApi } from '@/entities/auth';

export function DashboardPage() {
	usePageTitle('Панель управления');
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();
	const { currentPageTitle } = usePageTitleStore();

	const {
		data: user,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['me'],
		queryFn: () => authApi.me(),
	});

	const handleLogout = () => {
		logout();
		navigate({ to: '/login' });
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading profile</div>;

	return (
		<div>
			<Header>
				<div>
					<h1>{currentPageTitle}</h1>
					<p className="text-sm text-muted-foreground">Привет, {user?.email}</p>
				</div>

				<div className="flex gap-4">
					<ThemeSwitcher />
					<Button onClick={handleLogout} variant="outline">
						Выйти
					</Button>
				</div>
			</Header>
			<Outlet />
		</div>
	);
}
