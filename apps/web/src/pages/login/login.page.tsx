import { useState } from 'react';
import { useAuthStore } from '../../entities/auth/auth.store';
import { authApi } from '../../entities/auth/auth.api';
import { useNavigate } from '@tanstack/react-router';

export function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const setUser = useAuthStore((state) => state.setUser);
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const navigate = useNavigate();

	const handleLogin = async () => {
		const data = await authApi.login(email, password);
		setAccessToken(data.accessToken);

		const user = await authApi.me();
		setUser(user);
		navigate({ to: '/dashboard' });
	};

	return (
		<div>
			<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
			<input
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				type="password"
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
}
