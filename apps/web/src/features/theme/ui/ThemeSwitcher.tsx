import { useThemeStore, type Theme } from '../model/themeStore';

export const ThemeSwitcher = () => {
	const theme = useThemeStore((s) => s.theme);
	const setTheme = useThemeStore((s) => s.setTheme);

	return (
		<select
			value={theme}
			onChange={(e) => setTheme(e.target.value as Theme)}
			className="p-2 border rounded"
		>
			<option value="light">Светлая</option>
			<option value="dark">Тёмная</option>
			<option value="system">Системная</option>
		</select>
	);
};
