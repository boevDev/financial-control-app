import { ThemeSwitcher, useThemeEffect } from '../features/theme';

function App() {
	useThemeEffect();

	return (
		<div>
			<h1 className="bg-white text-black dark:bg-black dark:text-white">hello world</h1>
			<ThemeSwitcher />
		</div>
	);
}

export default App;
