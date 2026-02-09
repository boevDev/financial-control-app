import { cn } from '@/shared/lib/utils';
import { useThemeStore, type Theme } from '../model/themeStore';
import type { FC } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';
import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';

interface ThemeSwitcherProps {
	className?: string;
}

const themes = [
	{
		value: 'light',
		icon: <SunIcon />,
		text: 'Светлая',
	},
	{
		value: 'dark',
		icon: <MoonIcon />,
		text: 'Тёмная',
	},
	{
		value: 'system',
		icon: <SunMoonIcon />,
		text: 'Системная',
	},
];

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
	const theme = useThemeStore((s) => s.theme);
	const setTheme = useThemeStore((s) => s.setTheme);

	const currentIcon = themes.find((t) => t.value === theme)?.icon;

	return (
		<div className={cn(className)}>
			<Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
				<SelectTrigger>
					<SelectValue placeholder="Выбрать тему">{currentIcon} Выбрать тему</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Тема</SelectLabel>
						{themes.map((theme) => (
							<SelectItem value={theme.value}>
								{theme.icon} {theme.text}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
