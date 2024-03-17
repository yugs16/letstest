import { http as rest, HttpResponse, delay } from 'msw';
import mockAllCharacters from './responses/mockAllCharacters.json';

const baseURI = 'http://myserver/api/v1';
const headers = ['Content-Type', 'application/json'];

function getHandlers(timeout?: number) {
	console.log('first-==========');
	return [
		rest.get(`/characters`, async () => {
			if (timeout) {
				await delay(timeout);
				return HttpResponse.json(mockAllCharacters);
			} else return HttpResponse.json(mockAllCharacters);
		}),
	];
}

export const tasksHandlerException = rest.get(`/characters`, async () => {
	console.log('calleddddd-======');
	return new HttpResponse(null, {
		status: 500,
		statusText: 'Bad Request!!',
	});
});

export { getHandlers };
