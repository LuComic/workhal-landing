<script lang="ts">
	import { page } from '$app/state';
	import { ArrowRight, Menu, X } from '@lucide/svelte';
	import { getLocale, localizeHref, setLocale, type Locale } from '$lib/paraglide/runtime.js';
	import { m } from '$lib/paraglide/messages.js';
	import BrandMark from './BrandMark.svelte';
	import { onMount } from 'svelte';

	let mobileOpen = $state(false);
	let scrolled = $state(false);

	const locale = getLocale();
	const homeHref = localizeHref('/', { locale });
	const aboutHref = localizeHref('/about', { locale });
	const contactHref = localizeHref('/contact', { locale });

	const links = [
		{ href: `${homeHref}#product`, label: m.nav_product() },
		{ href: `${homeHref}#difference`, label: m.nav_why_workhal() },
		{ href: aboutHref, label: m.nav_about() },
		{ href: contactHref, label: m.nav_contact() }
	];

	function closeMobile() {
		mobileOpen = false;
	}

	function localeHref(targetLocale: Locale) {
		return `${localizeHref(page.url.pathname, { locale: targetLocale })}${page.url.search}${page.url.hash}`;
	}

	function changeLocale(event: MouseEvent, targetLocale: Locale) {
		event.preventDefault();
		void setLocale(targetLocale);
	}

	onMount(() => {
		const updateHeader = () => (scrolled = window.scrollY > 12);
		updateHeader();
		window.addEventListener('scroll', updateHeader, { passive: true });
		return () => window.removeEventListener('scroll', updateHeader);
	});
</script>

<header class:nav-scrolled={scrolled} class="site-header">
	<div class="site-container header-inner">
		<a class="brand" href={homeHref} aria-label={m.home_label()} onclick={closeMobile}>
			<BrandMark class="brand-logo" />
			<span>workhal</span>
		</a>

		<nav class="desktop-nav" aria-label={m.main_navigation()}>
			{#each links as link}
				<a data-slot="button" class="button button-ghost button-sm" href={link.href}>{link.label}</a
				>
			{/each}
		</nav>

		<div class="header-actions">
			<nav class="locale-switcher" aria-label={m.language_navigation()}>
				<a
					href={localeHref('et')}
					hreflang="et"
					lang="et"
					aria-label={m.language_estonian()}
					aria-current={locale === 'et' ? 'page' : undefined}
					data-sveltekit-reload
					onclick={(event) => changeLocale(event, 'et')}>ET</a
				>
				<span aria-hidden="true">/</span>
				<a
					href={localeHref('en')}
					hreflang="en"
					lang="en"
					aria-label={m.language_english()}
					aria-current={locale === 'en' ? 'page' : undefined}
					data-sveltekit-reload
					onclick={(event) => changeLocale(event, 'en')}>EN</a
				>
			</nav>
			<a data-slot="button" class="button button-primary header-cta" href={contactHref}>
				<span class="header-cta-full">{m.nav_contact()}</span>
				<span class="header-cta-short" aria-hidden="true">{m.contact_short()}</span>
				<ArrowRight data-icon="inline-end" size={17} />
			</a>
		</div>

		<button
			data-slot="button"
			class="mobile-toggle flex items-center justify-center"
			type="button"
			aria-label={mobileOpen ? m.close_menu() : m.open_menu()}
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			{#if mobileOpen}<X size={20} />{:else}<Menu size={20} />{/if}
		</button>
	</div>

	{#if mobileOpen}
		<nav class="mobile-nav" aria-label={m.mobile_navigation()}>
			{#each links as link}
				<a data-slot="button" class="button button-ghost" href={link.href} onclick={closeMobile}
					>{link.label}</a
				>
			{/each}
			<div class="mobile-locale-switcher" role="group" aria-label={m.language_navigation()}>
				<a
					href={localeHref('et')}
					hreflang="et"
					lang="et"
					aria-current={locale === 'et' ? 'page' : undefined}
					data-sveltekit-reload
					onclick={(event) => changeLocale(event, 'et')}>ET</a
				>
				<a
					href={localeHref('en')}
					hreflang="en"
					lang="en"
					aria-current={locale === 'en' ? 'page' : undefined}
					data-sveltekit-reload
					onclick={(event) => changeLocale(event, 'en')}>EN</a
				>
			</div>
			<a data-slot="button" class="button button-primary" href={contactHref} onclick={closeMobile}>
				{m.nav_contact()}
				<ArrowRight data-icon="inline-end" size={17} />
			</a>
		</nav>
	{/if}
</header>
