import { useEffect } from 'react';
import { useThemeStore } from '../model/store';

const getSystemTheme = (): 'light' | 'dark' =>
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyThemeToDOM = (theme: 'light' | 'dark') => {
	document.documentElement.classList.remove('light', 'dark');
	document.documentElement.classList.add(theme);
};

export function useThemeEffect() {
	const theme = useThemeStore((s) => s.theme);

	useEffect(() => {
		const applyCurrentTheme = () => {
			const resolved = theme === 'system' ? getSystemTheme() : theme;

			applyThemeToDOM(resolved);
		};

		applyCurrentTheme();

		if (theme !== 'system') {
			return;
		}

		const media = window.matchMedia('(prefers-color-scheme: dark)');

		media.addEventListener('change', applyCurrentTheme);

		return () => {
			media.removeEventListener('change', applyCurrentTheme);
		};
	}, [theme]);
}
