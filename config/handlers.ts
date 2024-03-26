import { http as rest, HttpResponse, delay, passthrough } from 'msw';
import mockAllCharacters from './responses/mockAllCharacters.json';

export const mockTestRes = [
	{
		name: 'person1',
		bounty: '100',
		isStrawHat: true,
		crew: {
			name: 'Straw Hats',
		},
	},
	{
		name: 'person2',
		bounty: '200',
		isStrawHat: true,
		crew: {
			name: 'Straw Hats',
		},
	},
	{
		name: 'person3',
		bounty: '300',
		crew: {
			name: 'heart pirates',
		},
	},
	{
		name: 'person4',
		bounty: '400',
		crew: {
			name: 'cross guild',
		},
	},
];

const apiURI = 'http://localhost:4000/api/v1/characters';

function getHandlers(timeout?: number) {
	return [
		rest.get(apiURI, async () => {
			if (timeout) {
				await delay(timeout);
				return HttpResponse.json(mockAllCharacters);
			} else return HttpResponse.json(mockAllCharacters);
		}),

		rest.get('**/*.svg', () => {
			// let images load from client itself
			passthrough();
		}),

		rest.get('**/images/*', () => {
			// let images load from client itself
			passthrough();
		}),

		// return HttpResponse.
		// const buffer = await fetch(`./static/images/${params.imageId}`).then(
		// 	(response) => response.arrayBuffer()
		// );

		// // Use the "HttpResponse.arrayBuffer()" shorthand method
		// // to automatically infer the response body buffer's length.
		// return HttpResponse.arrayBuffer(buffer, {
		// 	headers: {
		// 		'Content-Type': 'image/webbp',
		// 	},
		// });
		// }),
	];
}

export const mockForTestSuccess = rest.get(apiURI, () => {
	return HttpResponse.json(mockTestRes);
});

export const mockForTestError = rest.get(apiURI, () => {
	return HttpResponse.error();
});

export { getHandlers };
