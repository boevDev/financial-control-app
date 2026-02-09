import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../entities/auth/auth.store';
import { authApi } from '../entities/auth/auth.api';

const queryClient = new QueryClient();

function App() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const initialize = async () => {
			console.log('[App] Starting initialization...');

			// Инициализируем auth из localStorage
			const initializeAuth = useAuthStore.getState().initializeAuth;
			initializeAuth();

			const accessToken = useAuthStore.getState().accessToken;
			console.log('[App] Access token from storage:', !!accessToken);

			if (accessToken) {
				try {
					console.log('[App] Fetching user...');
					const user = await authApi.me();
					console.log('[App] User fetched:', user);
					useAuthStore.getState().setUser(user);
				} catch (error) {
					console.error('[App] Failed to fetch user:', error);
					useAuthStore.getState().logout();
				}
			}

			// Только после инициализации показываем приложение
			console.log('[App] Initialization complete');
			setIsReady(true);
		};

		initialize();
	}, []);

	if (!isReady) {
		return <div>Loading...</div>;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
