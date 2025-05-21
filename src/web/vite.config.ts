import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['vd.harville.dev', 'localhost', '127.0.0.1'],
		host: '0.0.0.0',
		port: 3000,
		watch: {
			usePolling: true
		}
	},
});
