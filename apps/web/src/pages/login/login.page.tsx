import { useForm } from '@tanstack/react-form';
import { useAuthStore } from '../../entities/auth/auth.store';
import { authApi } from '../../entities/auth/auth.api';
import { useNavigate } from '@tanstack/react-router';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { Input } from '@/shared/ui/input';
import { ThemeSwitcher } from '@/features/theme';
import { Button } from '@/shared/ui/button';
import { loginFormSchema } from '@/shared/lib/form-schemas';
import { useState } from 'react';
import { ErrorMessage } from '@/shared/ui/error-message';
import { getAuthErrorMessage } from '@/shared/lib/get-auth-error-message';

export function LoginPage() {
	usePageTitle('Авторизация');
	const setUser = useAuthStore((state) => state.setUser);
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const navigate = useNavigate();
	const [submitError, setSubmitError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		validators: {
			onSubmit: loginFormSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const data = await authApi.login(value.email, value.password);
				setAccessToken(data.accessToken);

				const user = await authApi.me();
				setUser(user);
				navigate({ to: '/dashboard' });
			} catch (error: unknown) {
				setSubmitError(getAuthErrorMessage(error));
			}
		},
	});

	return (
		<div className="flex justify-center items-center h-full">
			<ThemeSwitcher className="absolute top-4 right-4" />

			<div className="flex flex-col w-xs gap-8">
				<h1 className="text-2xl font-bold">Авторизация</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="flex flex-col gap-4"
				>
					<form.Field
						name="email"
						children={(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<div className="flex flex-col gap-1">
									<label htmlFor={field.name} className="text-sm font-medium">
										Email
									</label>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => {
											setSubmitError(null);
											field.handleChange(e.target.value);
										}}
										placeholder="example@email.com"
										aria-invalid={isInvalid}
									/>
									{isInvalid && field.state.meta.errors.length > 0 && (
										<p className="text-sm text-red-500">
											{field.state.meta.errors[0]?.message}
										</p>
									)}
								</div>
							);
						}}
					/>

					<form.Field
						name="password"
						children={(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<div className="flex flex-col gap-1">
									<label htmlFor={field.name} className="text-sm font-medium">
										Пароль
									</label>
									<Input
										id={field.name}
										name={field.name}
										type="password"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => {
											setSubmitError(null);
											field.handleChange(e.target.value);
										}}
										placeholder="••••••"
										aria-invalid={isInvalid}
									/>
									{isInvalid && field.state.meta.errors.length > 0 && (
										<p className="text-sm text-red-500">
											{field.state.meta.errors[0]?.message}
										</p>
									)}
								</div>
							);
						}}
					/>

					{submitError && <ErrorMessage error={submitError} />}

					<Button type="submit">Войти</Button>
				</form>

				<p className="text-sm text-center">
					Нет аккаунта?{' '}
					<button
						onClick={() => navigate({ to: '/register' })}
						className="text-blue-500 hover:underline"
					>
						Зарегистрируйтесь
					</button>
				</p>
			</div>
		</div>
	);
}
