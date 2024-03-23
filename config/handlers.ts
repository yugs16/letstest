import { http as rest, HttpResponse, delay } from 'msw';
import mockAllCharacters from './responses/mockAllCharacters.json';
// import { Http } from '@mui/icons-material';

// const baseURI = 'http://myserver/api/v1';
// const headers = ['Content-Type', 'application/json'];

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

function getHandlers(timeout?: number) {
	return [
		rest.get(`http://localhost:4000/characters`, async () => {
			console.log('saas');

			if (timeout) {
				await delay(timeout);
				return HttpResponse.json(mockAllCharacters);
			} else return HttpResponse.json(mockAllCharacters);
		}),
		// rest.get('/static/images/*', () => {
		// 	return passthrough();
		// 	// Return a real response instead of mocking it.
		// 	return HttpResponse.networkError('Not intercepted');
		// }),
		// rest.get('/static/images/:imageId', async ({ request }) => {

		//@ts-ignore
		// rest.get(
		// 	'/static/images/:imageId',
		// 	//@ts-ignore

		// 	async ({ params }) => {
		// 		// return passthrough();
		// 		// console.log('laoding images');
		// 		// return new HttpResponse('script contents', {
		// 		// 	headers: {
		// 		// 		'Content-Type': 'image/webp',
		// 		// 	},
		// 		// });

		// 		// return HttpResponse.
		// 		console.log('params.imageId', params.imageId);
		// 		const buffer = await import(`./images/${params.imageId}`).then(
		// 			(response) => response.arrayBuffer()
		// 		);

		// 		console.log('herereeeeeeeeee===============');

		// 		// Use the "HttpResponse.arrayBuffer()" shorthand method
		// 		// to automatically infer the response body buffer's length.
		// 		return HttpResponse.arrayBuffer(buffer, {
		// 			headers: {
		// 				'Content-Type': 'image/webbp',
		// 			},
		// 		});
		// 		// (
		// 		// 	ctx.set('Content-Type', 'image/jpeg'), // Adjust MIME type as needed
		// 		// 	ctx.body(/* Your image data here */)
		// 		// );
		// 	}
		// ),

		// return HttpResponse.
		// const buffer = await fetch(`./static/images/${params.imageId}`).then(
		// 	(response) => response.arrayBuffer()
		// );

		// console.log('herereeeeeeeeee===============');

		// // Use the "HttpResponse.arrayBuffer()" shorthand method
		// // to automatically infer the response body buffer's length.
		// return HttpResponse.arrayBuffer(buffer, {
		// 	headers: {
		// 		'Content-Type': 'image/webbp',
		// 	},
		// });
		// return H;
		// }),
	];
}

export const mockForTestSuccess = rest.get(`/characters`, async () => {
	return HttpResponse.json(mockTestRes);
});

export const mockForTestError = rest.get(`/characters`, async () => {
	return HttpResponse.error();
});

export { getHandlers };
