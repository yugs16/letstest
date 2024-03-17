import { render, screen, waitFor, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardView from '../CardView';

import { server } from '../../../config/server';
import { tasksHandlerException } from '../../../config/handlers';
import {
	QueryClient,
	QueryClientProvider,
	useQueries,
	useQuery,
} from '@tanstack/react-query';

// const defaultRes
// const mockUseGetCharacters = vi.fn();

// Mocking the useGetCharacters hook
// vi.mock('../services/queries', () => ({
// 	useGetCharacters: mockUseGetCharacters,
// }));

const renderComp = ({ children }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				// ✅ turns retries off
				retry: false,
			},
		},
	});
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export function useCustomHook() {
	useQuery({ queryKey: ['customHook'], queryFn: () => 'Hello' });
	return <CardView />;
}

describe('CardView Component', () => {
	// test('should render SelectSmall component and CharacterCard component with isLoading=true', async () => {
	//   mockUseGetCharacters.mockImplementation({})
	// 	render(<CardView />);

	// 	// Asserting SelectSmall component renders
	// 	const selectElement = screen.getByLabelText(/Crews/i);
	// 	expect(selectElement).toBeInTheDocument();

	// 	// Simulating selection change
	// 	userEvent.selectOptions(selectElement, 'straw_hats');
	// 	await waitFor(() => {
	// 		// Asserting CharacterCard component renders after data fetch
	// 		const characterCardElement = screen.getByText(/Character Name/i);
	// 		expect(characterCardElement).toBeInTheDocument();
	// 	});
	// });

	test('renders error message when isError is true', async () => {
		// Mocking useGetCharacters hook to return isError true
		server.use(tasksHandlerException);
		const { result } = renderHook(() => useCustomHook(), {
			wrapper: renderComp,
		});

		await waitFor(() => result.current.isLoading);
		console.log(result.current);

		await waitFor(() => {
			// Asserting error message renders
			const errorMessage = screen.getByText(/Some Error please check!!/i);
			expect(errorMessage).toBeInTheDocument();
		});
	});
});
