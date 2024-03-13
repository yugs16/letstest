import { http as rest, PathParams, HttpResponse, DefaultBodyType } from 'msw';
import mockAllCharacters from './responses/mockAllCharacters';

const baseURI = 'http://myserver/api/v1';
const headers = ['Content-Type', 'application/json'];

const handlers = [
	rest.get < PathParams,
	DefaultBodyType,
	HttpResponse >
		(`${baseURI}/characters/all`,
		(req, res, ctx) => {
			return res(
				ctx.status(),
				ctx.set([...headers]),
				ctx.body(mockAllCharacters)
			);
		}),
];

export default handlers;
