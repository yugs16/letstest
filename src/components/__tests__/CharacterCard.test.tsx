import { render, screen } from '@testing-library/react';
import CharacterCard from '../CharacterCard';

const defaultProps = {
	image: 'nami.png',
	name: 'nami',
	bounty: '1',
};

describe('CharacterCard', () => {
	it('renders the CharacterCard component', () => {
		render(<CharacterCard data={defaultProps} />);

		screen.debug(); // prints out the jsx in the App component unto the command line

		expect(screen.getByText('nami')).toBeInTheDocument();
	});
});
