import { create } from 'zustand';
import type { Theme, ThemeStore } from './types';
import { THEMES } from './config';

const STORAGE_KEY = 'theme_preference';

const isTheme = (value: string): value is Theme => value in THEMES;

export const useThemeStore = create<ThemeStore>((set) => ({
	theme: 'system',

	setTheme: (theme) => {
		localStorage.setItem(STORAGE_KEY, theme);
		set({ theme });
	},

	initializeTheme: () => {
		const saved = localStorage.getItem(STORAGE_KEY);

		if (saved && isTheme(saved)) {
			set({ theme: saved });
		}
	},
}));
