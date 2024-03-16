import { render, waitFor, screen, within } from '@testing-library/react';
import EditBountyDialog from '../EditBountyDialog';
import userEvent from '@testing-library/user-event';

const defaultProps = {
	open: true,
	bounty: '100',
	closeDialog: vi.fn(),
};

describe('EditBountyDialog', () => {
	test('should render default props as expected and should update bounty value on change, should call closeDialog on save button', async () => {
		render(<EditBountyDialog {...defaultProps} />);

		const textElem = within(
			await screen.findByLabelText('Edit Bounty')
		).getByRole('textbox');
		expect(textElem).toHaveValue('100');

		await userEvent.clear(textElem);

		userEvent.type(textElem, '200');

		await waitFor(() => {
			expect(textElem).toHaveValue('200');

			userEvent.click(screen.getByText('Save'));
		});

		await waitFor(() => {
			expect(defaultProps.closeDialog).toHaveBeenCalled();
		});
	});

	test('should call closeDialog function on cancel', async () => {
		const { getByText } = render(<EditBountyDialog {...defaultProps} />);
		userEvent.click(getByText('Cancel'));
		await waitFor(() => {
			expect(defaultProps.closeDialog).toHaveBeenCalled();
		});
	});
});
