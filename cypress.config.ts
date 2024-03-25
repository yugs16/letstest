import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:8081',
		// setupNodeEvents(on, config) {
		//   // implement node event listeners here
		// },
	},
	// chromeWebSecurity: false, // will enable this if our server api points to diff server
	requestTimeout: 10000,

	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
	},
});