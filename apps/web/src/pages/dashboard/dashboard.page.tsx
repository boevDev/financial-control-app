import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../entities/auth/auth.api';
import { useAuthStore } from '../../entities/auth/auth.store';
import { useEffect } from 'react';
import type { AuthUser } from '@finance/shared-types';
import { Outlet } from '@tanstack/react-router';

export function DashboardPage() {
	const setUser = useAuthStore((state) => state.setUser);
	const setAccessToken = useAuthStore((state) => state.setAccessToken);

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

	if (meQuery.isLoading) return <div>Loading...</div>;
	if (meQuery.isError) return <div>Error</div>;

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome, {meQuery.data?.email}</p>
			<Outlet />
		</div>
	);
}
