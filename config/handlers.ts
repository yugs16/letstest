import { http as rest, HttpResponse, delay } from 'msw';
import mockAllCharacters from './responses/mockAllCharacters.json';

const baseURI = 'http://myserver/api/v1';
const headers = ['Content-Type', 'application/json'];

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
		rest.get(`/characters`, async () => {
			if (timeout) {
				await delay(timeout);
				return HttpResponse.json(mockAllCharacters);
			} else return HttpResponse.json(mockAllCharacters);
		}),
	];
}

export const mockForTestSuccess = rest.get(`/characters`, async () => {
	return HttpResponse.json(mockTestRes);
});

export const mockForTestError = rest.get(`/characters`, async () => {
	return HttpResponse.error();
});

export { getHandlers };
