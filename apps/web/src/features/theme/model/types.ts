import type { ComponentType } from 'react';
import { THEMES } from './config';
import type { LucideProps } from 'lucide-react';

export type Theme = keyof typeof THEMES;

export interface ThemeMeta {
	text: string;
	icon: ComponentType<LucideProps>;
}

interface ThemeState {
	theme: Theme;
}

interface ThemeActions {
	setTheme: (theme: Theme) => void;
	initializeTheme: () => void;
}

export type ThemeStore = ThemeState & ThemeActions;
