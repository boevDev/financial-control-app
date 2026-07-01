import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { setupApiInterceptors } from './app/providers/setup-api-interceptors';
import './app/index.css';

setupApiInterceptors();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
