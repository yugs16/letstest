import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from './layouts/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './components/Toast/ToastProvider';
import { Stack, Typography } from '@mui/material';

const queryClient = new QueryClient({});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<Stack
					padding={4}
					direction={'row'}
					gap={1}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<a href="https://vitejs.dev" target="_blank">
						<img src={viteLogo} className="logo" alt="Vite logo" />
					</a>
					<Typography component={'span'} variant="body1">
						+
					</Typography>
					<a href="https://react.dev" target="_blank">
						<img src={reactLogo} className="logo react" alt="React logo" />
					</a>
				</Stack>
				<Home />
			</ToastProvider>
		</QueryClientProvider>
	);
}

export default App;
