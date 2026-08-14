<script lang="ts">
	import { page } from '$app/state';
	import { ArrowRight, Layers3, MessagesSquare, Repeat2 } from '@lucide/svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { entrance, textDecode } from '$lib/motion';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime.js';

	const locale = getLocale();
	const canonicalUrl = $derived(new URL(page.url.pathname, page.url.origin).href);
	const estonianUrl = $derived(
		new URL(localizeHref('/about', { locale: 'et' }), page.url.origin).href
	);
	const englishUrl = $derived(
		new URL(localizeHref('/about', { locale: 'en' }), page.url.origin).href
	);
	const contactHref = localizeHref('/contact', { locale });

	const problems = [
		{
			icon: Layers3,
			title: m.about_problem_one_title(),
			description: m.about_problem_one_description(),
			tone: 'mint'
		},
		{
			icon: MessagesSquare,
			title: m.about_problem_two_title(),
			description: m.about_problem_two_description(),
			tone: 'orange'
		},
		{
			icon: Repeat2,
			title: m.about_problem_three_title(),
			description: m.about_problem_three_description(),
			tone: 'teal'
		}
	];
</script>

<svelte:head>
	<title>{m.about_page_title()}</title>
	<meta name="description" content={m.about_page_description()} />
	<meta name="theme-color" content="#00877f" />
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="et" href={estonianUrl} />
	<link rel="alternate" hreflang="en" href={englishUrl} />
	<link rel="alternate" hreflang="x-default" href={estonianUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="Workhal" />
	<meta property="og:title" content={m.about_page_title()} />
	<meta property="og:description" content={m.about_page_description()} />
</svelte:head>

<SiteHeader />

<main id="top" class="inner-page">
	<section class="inner-hero about-hero">
		<div class="site-container about-hero-inner">
			<div class="inner-hero-copy" use:textDecode>
				<h1 data-motion-text>{m.about_title()}</h1>
				<p data-motion-fade>{m.about_intro()}</p>
			</div>
		</div>
	</section>

	<section class="about-story-section">
		<div class="site-container about-story-grid">
			<div class="section-heading-compact" use:textDecode>
				<h2 data-motion-text>{m.about_story_title()}</h2>
			</div>
			<div class="about-story-copy" use:entrance={{ delay: 0.08 }}>
				<p>{m.about_story_paragraph_one()}</p>
				<p>{m.about_story_paragraph_two()}</p>
				<p>{m.about_story_paragraph_three()}</p>
			</div>
		</div>
	</section>

	<section class="about-problems-section">
		<div class="site-container">
			<div class="about-problems-heading" use:textDecode>
				<h2 data-motion-text>{m.about_problems_title()}</h2>
				<p data-motion-fade>{m.about_problems_description()}</p>
			</div>

			<div class="about-problem-grid" use:entrance={{ staggerBy: 0.08, variant: 'card' }}>
				{#each problems as problem, index}
					{@const Icon = problem.icon}
					<article class={`about-problem-card problem-tone-${problem.tone}`} data-motion-item>
						<div class="problem-card-meta">
							<span>{String(index + 1).padStart(2, '0')}</span>
							<Icon size={24} />
						</div>
						<div>
							<h3>{problem.title}</h3>
							<span>{problem.description}</span>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="about-principle" use:textDecode>
		<p data-motion-text>{m.about_principle()}</p>
	</section>

	<section class="inner-cta">
		<div class="site-container inner-cta-grid" use:entrance>
			<h2>{m.about_cta_title()}</h2>
			<div>
				<p>{m.about_cta_description()}</p>
				<a data-slot="button" class="button button-light" href={contactHref}>
					{m.about_cta_action()}
					<ArrowRight data-icon="inline-end" size={18} />
				</a>
			</div>
		</div>
	</section>
</main>

<SiteFooter />
