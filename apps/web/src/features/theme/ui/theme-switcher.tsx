import { cn } from '@/shared/lib/utils';
import { useThemeStore } from '../model/store';
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
import { THEMES, THEMES_LIST } from '../model/config';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
	const theme = useThemeStore((s) => s.theme);
	const setTheme = useThemeStore((s) => s.setTheme);

	const currentTheme = THEMES[theme];
	const CurrentIcon = currentTheme.icon;

	return (
		<div className={cn(className)}>
			<Select value={theme} onValueChange={setTheme}>
				<SelectTrigger aria-label="Выбор темы">
					<div className="flex items-center gap-2">
						<CurrentIcon className="size-4" />
						<SelectValue />
					</div>
				</SelectTrigger>

				<SelectContent>
					<SelectGroup>
						<SelectLabel>Тема</SelectLabel>

						{THEMES_LIST.map(([value, meta]) => {
							const Icon = meta.icon;

							return (
								<SelectItem key={value} value={value}>
									<Icon className="size-4" />
									{meta.text}
								</SelectItem>
							);
						})}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
