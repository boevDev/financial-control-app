import { useEffect } from 'react';
import { usePageTitleStore } from './pageTitle.store';

export const usePageTitle = (title: string) => {
	const setCurrentPageTitle = usePageTitleStore((state) => state.setCurrentPageTitle);

	useEffect(() => {
		setCurrentPageTitle(title);
		document.title = title;
	}, [title, setCurrentPageTitle]);
};
