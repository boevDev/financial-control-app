import type { FC } from 'react';
import { cn } from '../lib/utils';

interface ErrorMessageProps {
	error: string;
	className?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ error, className }) => {
	return (
		<p
			className={cn(
				'rounded-md bg-red-100 border border-red-200 px-3 py-2 text-red-600 text-sm',
				'dark:bg-red-900/20 dark:border-red-200/20',
				className,
			)}
		>
			{error}
		</p>
	);
};
