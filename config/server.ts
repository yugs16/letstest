import { setupServer } from 'msw/node';
import { getHandlers } from './handlers.js';

export const server = setupServer(...getHandlers());
