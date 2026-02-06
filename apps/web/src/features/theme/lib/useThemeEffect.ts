import { useEffect } from 'react';
import { useThemeStore } from '../model/themeStore';
import type { ResolvedTheme } from '../model/themeStore';

const getSystemTheme = (): ResolvedTheme =>
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyThemeToDOM = (theme: ResolvedTheme) => {
	document.documentElement.classList.remove('light', 'dark');
	document.documentElement.classList.add(theme);
};

export function useThemeEffect() {
	const theme = useThemeStore((s) => s.theme);
	const setResolvedTheme = useThemeStore((s) => s.setResolvedTheme);

	useEffect(() => {
		const resolved = theme === 'system' ? getSystemTheme() : theme;
		setResolvedTheme(resolved);
		applyThemeToDOM(resolved);
	}, [theme, setResolvedTheme]);

	useEffect(() => {
		if (theme !== 'system') return;

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => {
			const resolved = getSystemTheme();
			setResolvedTheme(resolved);
			applyThemeToDOM(resolved);
		};

		media.addEventListener('change', handler);
		return () => media.removeEventListener('change', handler);
	}, [theme, setResolvedTheme]);
}
