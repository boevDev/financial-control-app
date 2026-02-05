import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	resolvedTheme: 'light' | 'dark'; // фактическая тема с учётом system
}

export const useThemeStore = create<ThemeState>((set) => {
	const getSystemTheme = () => {
		if (typeof window === 'undefined') return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	const applyTheme = (theme: Theme) => {
		const resolved = theme === 'system' ? getSystemTheme() : theme;
		if (typeof document !== 'undefined') {
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(resolved);
		}
		return resolved;
	};

	const initialTheme: Theme = 'system';
	const resolved = applyTheme(initialTheme);

	// слушаем системную тему
	if (typeof window !== 'undefined') {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			set((state) => {
				if (state.theme === 'system') {
					const newResolved = applyTheme('system');
					return { resolvedTheme: newResolved };
				}
				return {};
			});
		});
	}

	return {
		theme: initialTheme,
		resolvedTheme: resolved,
		setTheme: (theme) => set(() => ({ theme, resolvedTheme: applyTheme(theme) })),
	};
});
