/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { viteStaticCopy } from 'vite-plugin-static-copy';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// viteStaticCopy({
		// 	targets: [
		// 		{
		// 			src: './src/assets/images/*', // correct path to this file.
		// 			dest: './assets/images', // root of your output directory
		// 		},
		// 	],
		// }),
	],
	server: {
		port: 8081,
	},
	preview: {
		cors: true,
	},
	test: {
		globals: true,
		coverage: {
			include: ['src/**/*.[jt]s?(x)'],
			exclude: [...configDefaults.exclude, 'src/**/models/**/*.ts'],
		},
		environment: 'jsdom',
		include: ['src/**/__tests__/**/(*.)+(spec|test).[jt]s?(x)'],
		exclude: [...configDefaults.exclude, 'src/**/models/**/*.ts'],
		// this points to the setup file
		setupFiles: './src/setupTests.ts',
	},
});
