import { http as rest, HttpResponse } from 'msw';
import mockAllCharacters from './responses/mockAllCharacters.json';

const baseURI = 'http://myserver/api/v1';
const headers = ['Content-Type', 'application/json'];

const handlers = [
	rest.get(`/characters`, () => {
		console.log('seeeeeeeeeeeeeeeeeeeeeeeeeeeee');
		return HttpResponse.json(mockAllCharacters);
	}),
];

export { handlers };
