type Token = string | null;

interface AuthState {
	accessToken: Token;
	isAuth: boolean;
}

interface AuthActions {
	setAccessToken: (token: Token) => void;
	logout: () => void;
}

export type AuthStore = AuthState & AuthActions;
