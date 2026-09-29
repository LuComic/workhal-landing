<script lang="ts">
	import { page } from '$app/state';
	import SiteFooter from './SiteFooter.svelte';
	import SiteHeader from './SiteHeader.svelte';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime.js';

	let {
		document,
		path
	}: {
		document: {
			title: string;
			updated: string;
			intro: string;
			sections: { id: string; title: string; body: string }[];
		};
		path: string;
	} = $props();
	const locale = getLocale();
	const canonicalUrl = $derived(new URL(page.url.pathname, 'https://workhal.com').href);
</script>

<svelte:head>
	<title>{document.title} - workhal</title>
	<meta name="description" content={document.intro} />
	<link rel="canonical" href={canonicalUrl} />
	{#each ['en', 'et'] as language}
		<link
			rel="alternate"
			hreflang={language}
			href={`https://workhal.com${localizeHref(path, { locale: language as 'en' | 'et' })}`}
		/>
	{/each}
	<link
		rel="alternate"
		hreflang="x-default"
		href={`https://workhal.com${localizeHref(path, { locale: 'et' })}`}
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="Workhal" />
	<meta property="og:title" content={document.title} />
	<meta property="og:description" content={document.intro} />
</svelte:head>

<SiteHeader />
<main id="top" class="privacy-page">
	<article class="site-container privacy-document">
		<header class="privacy-document-header">
			<h1>{document.title}</h1>
			<p>{document.updated}</p>
		</header>
		<div class="privacy-document-body">
			<p class="privacy-lead">{document.intro}</p>
			<nav aria-label={locale === 'et' ? 'Sisukord' : 'On this page'} class="mb-12">
				<ol class="grid gap-3 sm:grid-cols-2">
					{#each document.sections as section, index}
						<li>
							<a class="text-sm underline underline-offset-4" href={`#${section.id}`}
								>{index + 1}. {section.title}</a
							>
						</li>
					{/each}
				</ol>
			</nav>
			{#each document.sections as section, index}
				<section id={section.id} class="scroll-mt-28">
					<h2>{index + 1}. {section.title}</h2>
					<p>{section.body}</p>
				</section>
			{/each}
			<p class="mt-10!">
				<a href="mailto:lukasjaager@gmail.com">lukasjaager@gmail.com</a>
				·
				<a href={localizeHref(path === '/privacy' ? '/tos' : '/privacy', { locale })}>
					{path === '/privacy'
						? locale === 'et'
							? 'Kasutustingimused'
							: 'Terms of service'
						: locale === 'et'
							? 'Privaatsuspoliitika'
							: 'Privacy policy'}
				</a>
			</p>
		</div>
	</article>
</main>
<SiteFooter />
