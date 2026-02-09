import * as z from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email('Введите корректный email'),
	password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
	.object({
		email: z.string().email('Введите корректный email'),
		password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
