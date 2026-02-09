import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme_preference';

interface ThemeState {
	theme: Theme;
	resolvedTheme: ResolvedTheme;

	setTheme: (theme: Theme) => void;
	setResolvedTheme: (theme: ResolvedTheme) => void;
	initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
	theme: 'system',
	resolvedTheme: 'light',

	setTheme: (theme) => {
		localStorage.setItem(STORAGE_KEY, theme);
		set({ theme });
	},
	setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
	initializeTheme: () => {
		const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
		if (saved && ['light', 'dark', 'system'].includes(saved)) {
			set({ theme: saved });
		}
	},
}));
