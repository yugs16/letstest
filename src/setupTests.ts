// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom/vitest';

// src/setupTests.js
import { server } from '../config/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
	cleanup();
	server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
