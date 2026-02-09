import { usePageTitle } from '../../shared/hooks/usePageTitle';

export function NotFoundPage() {
	usePageTitle('404 — Страница не найдена');
	return <h1>404 — Page Not Found</h1>;
}
