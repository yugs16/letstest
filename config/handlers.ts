import { http as rest, HttpResponse, delay } from 'msw';
import mockAllCharacters from './responses/mockAllCharacters.json';

const baseURI = 'http://myserver/api/v1';
const headers = ['Content-Type', 'application/json'];

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
export { getHandlers };
