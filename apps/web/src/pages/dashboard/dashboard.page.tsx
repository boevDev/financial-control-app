import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../entities/auth/auth.api';
import { useAuthStore } from '../../entities/auth/auth.store';
import { useEffect } from 'react';
import type { AuthUser } from '@finance/shared-types';
import { Outlet, useNavigate } from '@tanstack/react-router';

export function DashboardPage() {
	const setUser = useAuthStore((state) => state.setUser);
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const meQuery = useQuery<AuthUser, Error>({
		queryKey: ['me'],
		queryFn: async () => {
			try {
				return await authApi.me();
			} catch {
				const data = await authApi.refresh();
				setAccessToken(data.accessToken);
				return await authApi.me();
			}
		},
		retry: false,
	});

	useEffect(() => {
		if (meQuery.data) setUser(meQuery.data);
	}, [meQuery.data, setUser]);

	const handleLogout = () => {
		logout();
		navigate({ to: '/login' });
	};

	if (meQuery.isLoading) return <div>Loading...</div>;
	if (meQuery.isError) return <div>Error: {meQuery.error.message}</div>;

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<div>
					<h1>Dashboard</h1>
					<p>Welcome, {meQuery.data?.email}</p>
				</div>
				<button onClick={handleLogout} style={{ padding: '10px 20px' }}>
					Выйти из аккаунта
				</button>
			</div>
			<Outlet />
		</div>
	);
}
