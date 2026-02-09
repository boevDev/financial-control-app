import { useState } from 'react';
import { useAuthStore } from '../../entities/auth/auth.store';
import { authApi } from '../../entities/auth/auth.api';
import { useNavigate } from '@tanstack/react-router';

export function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const setUser = useAuthStore((state) => state.setUser);
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const navigate = useNavigate();

	const handleRegister = async () => {
		try {
			const data = await authApi.register(email, password);
			console.log('Tokens:', data);

			if (!data?.accessToken) {
				throw new Error('No access token returned from register');
			}

			setAccessToken(data.accessToken);

			const user = await authApi.me();
			console.log('User:', user);

			setUser(user);
			navigate({ to: '/dashboard' });
		} catch (error) {
			console.error('Registration failed', error);
			alert('Registration failed. Check console for details.');
		}
	};

	return (
		<div>
			<h2>Register</h2>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleRegister}>Register</button>
		</div>
	);
}
