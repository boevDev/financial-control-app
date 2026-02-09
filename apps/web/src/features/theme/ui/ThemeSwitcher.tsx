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

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
	const theme = useThemeStore((s) => s.theme);
	const setTheme = useThemeStore((s) => s.setTheme);

	return (
		<div className={cn(className)}>
			<Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
				<SelectTrigger className="w-full max-w-48">
					<SelectValue placeholder="Выбрать тему" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Тема</SelectLabel>
						<SelectItem value="light">Светлая</SelectItem>
						<SelectItem value="dark">Тёмная</SelectItem>
						<SelectItem value="system">Системная</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
