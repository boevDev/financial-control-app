import { AxiosError } from 'axios';

export function getAuthErrorMessage(error: unknown): string {
	if (error instanceof AxiosError) {
		switch (error.response?.status) {
			case 401:
				return 'Неверный email или пароль';
			case 403:
				return 'Доступ запрещён';
			case 409:
				return 'Пользователь с таким email уже существует';
			default:
				return 'Произошла ошибка. Попробуйте позже';
		}
	}

	return 'Неизвестная ошибка';
}
