import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from './layouts/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './components/Toast/ToastProvider';

const queryClient = new QueryClient({});

function App() {
	const [count, setCount] = useState(0);

	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<div>
					<a href="https://vitejs.dev" target="_blank">
						<img src={viteLogo} className="logo" alt="Vite logo" />
					</a>
					<a href="https://react.dev" target="_blank">
						<img src={reactLogo} className="logo react" alt="React logo" />
					</a>
				</div>
				<h1>Vite + React</h1>
				<Home />
			</ToastProvider>
		</QueryClientProvider>
	);
}

export default App;
