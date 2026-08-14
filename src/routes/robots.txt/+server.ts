import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const sitemapUrl = new URL('/sitemap.xml', url.origin);
	const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`;

	return new Response(body, {
		headers: {
			'cache-control': 'public, max-age=3600',
			'content-type': 'text/plain; charset=utf-8'
		}
	});
};
