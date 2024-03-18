import { render } from '@testing-library/react';
import Iterator from '../Iterator';

const mockData = ['Item 1', 'Item 2', 'Item 3'];
const MockComponent = ({ data }: { data: string }) => (
	<div data-testid="mock-component">{data}</div>
); // Mock component for testing

describe('Iterator', () => {
	test('should renders correct list of MockComponent with proper data as expected', () => {
		const { getAllByTestId } = render(
			<Iterator
				component={MockComponent}
				data={mockData}
				itemViewPortSizes={{ xs: 12 }}
			/>
		);
		const elems = getAllByTestId('mock-component');
		expect(elems).toHaveLength(mockData.length);

		elems.forEach((elem, index) => {
			expect(elem).toHaveTextContent(mockData[index]);
		});
	});
});
