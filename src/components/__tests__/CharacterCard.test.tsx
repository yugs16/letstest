import { render, screen, waitFor } from '@testing-library/react';
import CharacterCard from '../CharacterCard';
import userEvent from '@testing-library/user-event';

const defaultProps = {
	data: {
		image: 'nami.png',
		name: 'nami',
		bounty: '100',
	},
	isLoading: false,
};

const mockWriteText = vi.fn();
const mockToast = vi.fn();

vi.mock('./Toast/useToast', () => {
	return {
		useToast: () => ({ toast: mockToast }),
	};
});

describe('CharacterCard', () => {
	describe('should render ', () => {
		test('skeletons in laoding state', () => {
			render(<CharacterCard isLoading={true} />);
			expect(
				screen.getByTestId('test-card-media-skeleton')
			).toBeInTheDocument();
			expect(
				screen.getByTestId('test-name-skeleton-wrapper')
			).toBeInTheDocument();
		});

		test('the CharacterCard component with expected props', () => {
			render(<CharacterCard {...defaultProps} />);

			expect(screen.getByText('nami')).toBeInTheDocument();

			// good to have data-tesid for the components you think will be hard to find, or needed to be differentiated amoung multiple similar ones
			expect(screen.getByTestId('test-bounty').innerHTML).toBe('100');

			waitFor(() => {
				expect(screen.queryByRole('img')).toBeInTheDocument();
			});
		});
	});

	test('should call toast and copy bounty value when clicked on copy button', () => {
		Object.assign(navigator, {
			clipboard: {
				writeText: mockWriteText,
			},
		});

		render(<CharacterCard {...defaultProps} />);

		// userEvent.click returns a promise, but here we just need to wait for dom to re-render
		userEvent.click(screen.getByTestId('test_copy_btn'));

		// waitFor is enough to wait for re-render, it's callback will run after re-rendring asyncs have finished, so we do not need await here
		waitFor(() => {
			expect(mockWriteText).toHaveBeenCalledWith(defaultProps.data.bounty);
			expect(mockToast).toHaveBeenCalledWith(
				'success',
				'Copied to clipboard!!'
			);
		});
	});
});
