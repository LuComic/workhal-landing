<script lang="ts">
	import { getLocale, localizeHref } from '$lib/paraglide/runtime.js';
	import { m } from '$lib/paraglide/messages.js';
	import BrandMark from './BrandMark.svelte';

	const locale = getLocale();
	const homeHref = localizeHref('/', { locale });
	const footerLinks = [
		{ href: `${homeHref}#product`, label: m.nav_product() },
		{ href: `${homeHref}#difference`, label: m.nav_why_workhal() },
		{ href: `${homeHref}#questions`, label: m.nav_questions() },
		{ href: localizeHref('/about', { locale }), label: m.nav_about() },
		{ href: localizeHref('/contact', { locale }), label: m.nav_contact() },
		{ href: localizeHref('/privacy', { locale }), label: m.nav_privacy() }
	];
</script>

<footer class="site-footer">
	<div class="site-container footer-inner">
		<a class="brand" href={homeHref} aria-label={m.home_label()}>
			<BrandMark class="brand-logo" />
			<span>workhal</span>
		</a>
		<p>{m.footer_tagline()}</p>
		<nav aria-label={m.footer_navigation()} class="flex flex-wrap gap-1">
			{#each footerLinks as link}
				<a data-slot="button" class="button button-ghost button-sm" href={link.href}>{link.label}</a
				>
			{/each}
		</nav>
	</div>
</footer>
