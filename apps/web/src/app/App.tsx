import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../entities/auth/auth.store';
import { authApi } from '../entities/auth/auth.api';
import { useThemeEffect } from '../features/theme';
import { useThemeStore } from '../features/theme/model/themeStore';

const queryClient = new QueryClient();

function App() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const initialize = async () => {
			// Инициализируем тему из localStorage
			useThemeStore.getState().initializeTheme();

			// Инициализируем auth из localStorage
			const initializeAuth = useAuthStore.getState().initializeAuth;
			initializeAuth();

			const accessToken = useAuthStore.getState().accessToken;

			if (accessToken) {
				try {
					const user = await authApi.me();
					useAuthStore.getState().setUser(user);
				} catch (error) {
					console.error('[App] Failed to fetch user:', error);
					useAuthStore.getState().logout();
				}
			}

			setIsReady(true);
		};

		initialize();
	}, []);

	useThemeEffect();

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
