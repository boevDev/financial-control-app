import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';
import type { ThemeMeta } from './types';

export const SYSTEM_THEME = 'system' as const;

export const THEMES = {
	[SYSTEM_THEME]: {
		text: 'Системная',
		icon: SunMoonIcon,
	},
	light: {
		text: 'Светлая',
		icon: SunIcon,
	},
	dark: {
		text: 'Тёмная',
		icon: MoonIcon,
	},
} as const satisfies Record<string, ThemeMeta>;

export const THEMES_LIST = Object.entries(THEMES);
