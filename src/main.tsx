import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { prepare } from '../sandbox/devBoot.ts';

// async function prepare() {
// 	console.log('in prepare======');
// 	if (process.env.NODE_ENV !== 'development') {
// 		return;
// 		// return Promise.resolve();
// 	}

// 	console.log('chec============================');
// 	const { worker } = await import('../config/browser');
// 	worker.start({
// 		onUnhandledRequest: 'bypass',
// 	});
// 	return worker.start();
// }

prepare().then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
});
