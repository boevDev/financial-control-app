import { LAYOUT_CLASSES } from '@/shared/lib/layout-classes';
import { cn } from '@/shared/lib/utils';
import type { FC, ReactNode } from 'react';

interface HeaderProps {
	children?: ReactNode;
	className?: string;
}

const { LAYOUT_SPACE_HORIZ, LAYOUT_SPACE_VERT, CONTAINER_BG } = LAYOUT_CLASSES;

const Header: FC<HeaderProps> = ({ children, className }) => {
	return (
		<header
			className={cn(
				'fixed top-0 left-0  w-full',
				`px-${LAYOUT_SPACE_HORIZ} py-${LAYOUT_SPACE_VERT}`,
			)}
		>
			<div
				className={cn(
					'flex flex-row items-center justify-between w-full rounded-2xl py-4 px-8 shadow-sm',
					`${CONTAINER_BG}`,
					className,
				)}
			>
				{children}
			</div>
		</header>
	);
};

export default Header;
