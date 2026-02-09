import { create } from 'zustand';

type CurrentPageTitleType = string;

interface PageTitleState {
	currentPageTitle: CurrentPageTitleType;
	setCurrentPageTitle: (title: CurrentPageTitleType) => void;
}

export const usePageTitleStore = create<PageTitleState>((set) => ({
	currentPageTitle: 'Контроль финансов',
	setCurrentPageTitle: (title) => set({ currentPageTitle: title }),
}));
