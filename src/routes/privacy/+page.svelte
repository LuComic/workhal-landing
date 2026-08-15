<script lang="ts">
	import { page } from '$app/state';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime.js';

	const locale = getLocale();
	const canonicalUrl = $derived(new URL(page.url.pathname, page.url.origin).href);
	const estonianUrl = $derived(
		new URL(localizeHref('/privacy', { locale: 'et' }), page.url.origin).href
	);
	const englishUrl = $derived(
		new URL(localizeHref('/privacy', { locale: 'en' }), page.url.origin).href
	);
	const contactHref = localizeHref('/contact', { locale });
</script>

<svelte:head>
	<title>{m.privacy_page_title()}</title>
	<meta name="description" content={m.privacy_page_description()} />
	<meta name="theme-color" content="#00877f" />
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="et" href={estonianUrl} />
	<link rel="alternate" hreflang="en" href={englishUrl} />
	<link rel="alternate" hreflang="x-default" href={estonianUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="Workhal" />
	<meta property="og:title" content={m.privacy_page_title()} />
	<meta property="og:description" content={m.privacy_page_description()} />
</svelte:head>

<SiteHeader />

<main id="top" class="privacy-page">
	<article class="site-container privacy-document">
		<header class="privacy-document-header">
			<h1>{m.privacy_title()}</h1>
			<p>{m.privacy_updated()}</p>
		</header>

		<div class="privacy-document-body">
			<p class="privacy-lead">{m.privacy_intro()}</p>

			<section>
				<h2>{m.privacy_collect_title()}</h2>
				<p>{m.privacy_collect_body()}</p>
			</section>

			<section>
				<h2>{m.privacy_use_title()}</h2>
				<p>{m.privacy_use_body()}</p>
			</section>

			<section>
				<h2>{m.privacy_waitlist_title()}</h2>
				<p>{m.privacy_waitlist_body()}</p>
			</section>

			<section>
				<h2>{m.privacy_retention_title()}</h2>
				<p>{m.privacy_retention_body()}</p>
			</section>

			<section>
				<h2>{m.privacy_rights_title()}</h2>
				<p>{m.privacy_rights_body()}</p>
			</section>

			<section>
				<h2>{m.privacy_contact_title()}</h2>
				<p>
					{m.privacy_contact_before()}
					<a href={contactHref}>{m.privacy_contact_link()}</a>{m.privacy_contact_after()}
				</p>
			</section>
		</div>
	</article>
</main>

<SiteFooter />
