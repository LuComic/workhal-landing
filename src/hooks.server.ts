import type { Handle } from '@sveltejs/kit';
import { getTextDirection, localizeHref } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleParaglide: Handle = ({ event, resolve }) => {
	const requestedUrl = new URL(event.request.url);

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		if (requestedUrl.pathname === '/') {
			const headers = new Headers({
				location: `${localizeHref('/', { locale })}${requestedUrl.search}`
			});
			headers.append(
				'set-cookie',
				`PARAGLIDE_LOCALE=${locale}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
			);

			return new Response(null, { status: 307, headers });
		}

		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});
};

export const handle: Handle = handleParaglide;
