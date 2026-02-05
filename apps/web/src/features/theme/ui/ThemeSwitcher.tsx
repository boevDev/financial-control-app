import { useThemeStore } from '../model/themeStore';

export const ThemeSwitcher = () => {
	const { theme, setTheme } = useThemeStore();

	return (
		<select
			value={theme}
			onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
			className="p-2 border rounded"
		>
			<option value="light">Светлая</option>
			<option value="dark">Тёмная</option>
			<option value="system">Системная</option>
		</select>
	);
};
