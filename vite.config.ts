import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		}),

		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			emitTsDeclarations: true,
			// Keep development and production on the same generated module layout.
			// Switching layouts in one outdir can leave a running dev server with stale imports.
			outputStructure: 'locale-modules',
			strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
			cookieMaxAge: 60 * 60 * 24 * 365,
			urlPatterns: [
				{
					pattern: '/',
					localized: [
						['et', '/et'],
						['en', '/en']
					]
				},
				{
					pattern: '/:path(.*)?',
					localized: [
						['et', '/et/:path(.*)?'],
						['en', '/en/:path(.*)?']
					]
				}
			]
		})
	]
});
