import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import config from './vite.config';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],

	test: {
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		globals: true,
		environment: 'jsdom',
		globalSetup: [
			'./__setup__/db.ts'
		],
	},

	resolve: {
		alias: {
			...config.resolve?.alias,
			// apply "$app" mocks for *.svelte files
			'$app': path.resolve('./__mocks__/$app'),
		}
	}
});
