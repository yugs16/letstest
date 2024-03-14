/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 8081,
	},
	test: {
		globals: true,
		environment: 'jsdom',
		// include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		// this points to the setup file
		setupFiles: './src/setupTests.ts',
		// you might want to disable the `css: true` line, since we don't have
		// tests that rely on CSS -- and parsing CSS is slow.
		// I'm leaving it in here becasue often people want to parse CSS in tests.
		css: true,
	},
});
