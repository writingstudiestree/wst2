import { sveltekit } from "@sveltejs/kit/vite";
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;',
			},
		},
	},

	resolve: {
		alias: {
			src: path.resolve('./src'),
		}
	}
};

export default config;
