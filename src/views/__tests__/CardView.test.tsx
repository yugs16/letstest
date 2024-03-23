import { screen, waitFor, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardView from '../CardView';

import { server } from '../../../config/server';
import {
	mockForTestSuccess,
	mockTestRes,
	mockForTestError,
} from '../../../config/handlers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetCharacters } from '../../services/queries';
import { IteratorProps } from '../../components/Iterator';

const mockCheckIteratorProps = vi.fn();
const mockEditBountyDialogCheckProps = vi.fn();

// Mocking the Iterator component because we do not want to test it here
vi.mock('../../components/Iterator', () => ({
	default: function MockIterator(
		props: IteratorProps & { openEditBountyDialog: (val: string) => void }
	) {
		mockCheckIteratorProps(props);
		const Component = props.component;
		return (
			<>
				{props.isLoading && <div data-testid={'mock-iterator-loading'}></div>}
				<Component />
				<div
					data-testid="mock-iterator-open-dialog"
					onClick={() => props.openEditBountyDialog('100')}
				></div>
			</>
		);
	},
}));

function MockCard() {
	return <div></div>;
}

vi.mock('../../components/CharacterCard', () => ({
	default: MockCard,
}));

vi.mock('../../components/EditBountyDialog', () => ({
	default: function MockEditBountyDialog(props: any) {
		mockEditBountyDialogCheckProps(props);
		return (
			<div
				data-testid="mock-edit-close-dialog"
				onClick={props.closeDialog}
			></div>
		);
	},
}));

const renderComp = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				// ✅ turns retries off
				retry: false,
			},
		},
	});
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<CardView />
		</QueryClientProvider>
	);
};

describe('CardView Component', () => {
	test('should render default flow as expected, should handle events like openDialog and closeDialog', async () => {
		server.use(mockForTestSuccess);

		const { result } = renderHook(() => useGetCharacters(), {
			wrapper: renderComp,
		});

		await waitFor(() => {
			//before data is received, loading is in progress
			expect(screen.getByTestId('mock-iterator-loading')).toBeInTheDocument();
			expect(mockCheckIteratorProps).toHaveBeenCalledWith(
				expect.objectContaining({
					component: MockCard,
					data: new Array(10).fill({}),
					isLoading: true,
					openEditBountyDialog: expect.any(Function),
					containerProps: expect.any(Object),
				})
			);

			// select component is independent of loading, so should get rendered before data is fetched
			expect(screen.getByLabelText(/Crews/i)).toBeInTheDocument();
		});

		await waitFor(() => {
			// waiting for query to finish fetch call
			expect(result.current.isSuccess).toBe(true);
		});

		await waitFor(() => {
			//after data is fetched

			expect(screen.queryByTestId('mock-iterator-loading')).toBeNull();

			expect(mockCheckIteratorProps).toHaveBeenLastCalledWith(
				expect.objectContaining({
					data: [...mockTestRes],
					isLoading: false,
				})
			);

			// click and open edit dialog
			userEvent.click(screen.getByTestId('mock-iterator-open-dialog'));
		});

		await waitFor(() => {
			expect(mockEditBountyDialogCheckProps).toHaveBeenLastCalledWith({
				open: true,
				bounty: '100',
				closeDialog: expect.any(Function),
			});

			// close dialog should change parent props, and should close eidt dialog
			userEvent.click(screen.getByTestId('mock-edit-close-dialog'));
		});

		await waitFor(() => {
			// below assertion will confirm the change in props after closeDialog function exec
			expect(mockEditBountyDialogCheckProps).toHaveBeenLastCalledWith({
				open: false,
				bounty: '0',
				closeDialog: expect.any(Function),
			});
		});
	});

	test('should filter data based on SmallSelect component selection ', async () => {
		server.use(mockForTestSuccess);

		const { result } = renderHook(() => useGetCharacters(), {
			wrapper: renderComp,
		});

		await waitFor(() => {
			// waiting for query to finish fetch call
			expect(result.current.isSuccess).toBe(true);
		});

		// get SelectSmall component
		const selectElem = screen.getByRole('combobox');
		await userEvent.click(selectElem);

		/**
		 * Note: we cannot use userEvent.selectOptions(screen.getByRole('listbox'), 'straw_hats'),
		 * as our options are present inside a menu, so we need to open it first to put it in simulated dom, which can be done by clck,
		 * and then we need to select option/li which has text or data-value needed.
		 */
		// get list element that has text as stra_hats
		let liElem = screen
			.getByRole('listbox')
			.querySelector('li[data-value="straw_hats"]');

		if (liElem) await userEvent.click(liElem); // needed for ts

		// filter by straw_hats should pass in below assertion
		await waitFor(() => {
			expect(mockCheckIteratorProps).toHaveBeenLastCalledWith(
				expect.objectContaining({
					data: [
						{
							name: 'person1',
							bounty: '100',
							isStrawHat: true,
							crew: { name: 'Straw Hats' },
						},
						{
							name: 'person2',
							bounty: '200',
							isStrawHat: true,
							crew: {
								name: 'Straw Hats',
							},
						},
					],
				})
			);
		});

		// reopening menu dialog
		await userEvent.click(selectElem);

		// get list element that has text as law
		liElem = screen.getByRole('listbox').querySelector('li[data-value="law"]');

		if (liElem) await userEvent.click(liElem); // needed for ts

		// filter by law should pass in below assertion
		await waitFor(() => {
			expect(mockCheckIteratorProps).toHaveBeenLastCalledWith(
				expect.objectContaining({
					data: [
						{
							name: 'person3',
							bounty: '300',
							crew: { name: 'heart pirates' },
						},
					],
				})
			);
		});
	});

	test('renders error message when isError is true', async () => {
		// Mocking useGetCharacters hook to return isError true
		server.use(mockForTestError);
		const { result } = renderHook(() => useGetCharacters(), {
			wrapper: renderComp,
		});

		await waitFor(() => {
			// below assertion will confirm that api is throwing error
			expect(result.current.isError).toBe(true);
		});

		// findByText returns promise
		const errorMessage = await screen.findByText(/Some Error please check!!/i);
		expect(errorMessage).toBeInTheDocument();
	});
});
