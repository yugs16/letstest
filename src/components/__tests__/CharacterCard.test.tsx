import { render, screen, waitFor } from '@testing-library/react';
import CharacterCard from '../CharacterCard';
import userEvent from '@testing-library/user-event';

const defaultProps = {
	image: 'nami.png',
	name: 'nami',
	bounty: '100',
};

const mockWriteText = vi.fn();

describe('CharacterCard', () => {
	test('should render the CharacterCard component with expected props', () => {
		render(<CharacterCard data={defaultProps} />);

		expect(screen.getByText('nami')).toBeInTheDocument();
		expect(screen.queryByRole('img')).toBeInTheDocument();

		expect(screen.getByTestId('test-bounty').innerHTML).toBe('100');
	});

	test('should copy bounty value when clicked on copy button', () => {
		Object.assign(navigator, {
			clipboard: {
				writeText: mockWriteText,
			},
		});

		render(<CharacterCard data={defaultProps} />);

		// userEvent.click returns a promise, but here we just need to wait for dom to re-render
		userEvent.click(screen.getByTestId('test_copy_btn'));

		// waitFor is enough to wait for re-render, it's callback will run after re-rendring asyncs have finished, so we do not need await here
		waitFor(() => {
			expect(mockWriteText).toHaveBeenCalledWith(defaultProps.bounty);
		});
	});
});
