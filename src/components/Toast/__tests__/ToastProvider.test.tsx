import { render, screen } from '@testing-library/react';
import { ToastProvider } from '../ToastProvider';
import { useToast } from '../useToast';
import userEvent from '@testing-library/user-event';

const mockCheckProps = vi.fn();

vi.mock('@mui/material/Snackbar', () => {
	return {
		default: function MockSnakcbar(props: any) {
			// a way to check props for mocked components, ideally we mock 3rd-party library components or components/functions whose tests we are going to write differently
			mockCheckProps(props);
			return (
				<>
					{props.children}
					<button
						data-testid="mock-snackbar"
						onClick={() => props.onClose()}
					></button>
				</>
			);
		},
	};
});

const TestComponent = () => {
	const { toast } = useToast();

	return (
		<>
			<button
				key={'success_btn'}
				onClick={() => toast('warning', 'Warning Message')}
			>
				Toast
			</button>
			<button onClick={() => toast('error', 'Error Message')}>
				Toast Error
			</button>
		</>
	);
};

describe('ToastProvider', () => {
	test('should render message props as expected, and should hide it on closing toast', async () => {
		render(
			<ToastProvider>
				<TestComponent></TestComponent>
			</ToastProvider>
		);

		const buttons: HTMLElement[] = screen.getAllByRole('button');

		// warning button from our TestComponent
		await userEvent.click(buttons[0]);

		// checking essential props passed to our MockSnakcbarComponent, expect.objectContaining will help us to ignore children prop check
		expect(mockCheckProps).toHaveBeenLastCalledWith(
			expect.objectContaining({
				anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
				open: true,
				onClose: expect.any(Function),
				autoHideDuration: 6000,
			})
		);

		// warning message rendered successfully
		expect(screen.queryByText('Warning Message')).toBeInTheDocument();

		await userEvent.click(screen.getByTestId('mock-snackbar'));

		// warning message is removed from the dom
		expect(screen.queryByText('Warning Message')).toBeNull();
		// screen.debug();
		await userEvent.click(buttons[1]);
		expect(screen.queryByText('Error Message')).toBeInTheDocument();
	});
});

/**
 * Test using Context.Consumer
 */

// test('ToastProvider', () => {
//   const { getByText } = render(
//     <ToastProvider>
//       <ToastContext.Consumer>
//         {({ toast }) => (
//           <button onClick={() => toast('success', 'Success Message')}>Toast</button>
//         )}
//       </ToastContext.Consumer>
//     </ToastProvider>
//   );

//   fireEvent.click(getByText('Toast'));
//   expect(getByText('Success Message')).toBeInTheDocument();
// });
