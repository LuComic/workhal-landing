import type { RequestHandler } from './$types';

const pagePaths = ['', '/about', '/contact', '/privacy'] as const;
const languages = ['en', 'et'] as const;

const escapeXml = (value: string) =>
	value.replace(/[<>&'\"]/g, (character) => {
		const entities: Record<string, string> = {
			'<': '&lt;',
			'>': '&gt;',
			'&': '&amp;',
			"'": '&apos;',
			'"': '&quot;'
		};

		return entities[character];
	});

export const GET: RequestHandler = ({ url }) => {
	const absoluteUrl = (language: (typeof languages)[number], path: (typeof pagePaths)[number]) =>
		new URL(`/${language}${path}`, url.origin).href;

	const urls = pagePaths.flatMap((path) => {
		const alternates = languages
			.map(
				(language) =>
					`    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(absoluteUrl(language, path))}" />`
			)
			.concat(
				`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl('en', path))}" />`
			)
			.join('\n');

		return languages.map(
			(language) => `  <url>
    <loc>${escapeXml(absoluteUrl(language, path))}</loc>
${alternates}
  </url>`
		);
	});

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'cache-control': 'public, max-age=3600',
			'content-type': 'application/xml; charset=utf-8'
		}
	});
};
