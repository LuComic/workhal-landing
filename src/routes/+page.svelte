<script lang="ts">
	import { asset } from '$app/paths';
	import { page } from '$app/state';
	import {
		ArrowRight,
		Bell,
		BookOpen,
		CalendarDays,
		Check,
		FileText,
		KeyRound,
		Menu,
		Search,
		Users,
		X
	} from '@lucide/svelte';
	import BrandMark from '$lib/components/BrandMark.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import {
		chaosToClarity,
		entrance,
		screenshotReveal,
		screenshotScroll,
		textDecode
	} from '$lib/motion';
	import { onMount } from 'svelte';

	let mobileOpen = $state(false);
	let scrolled = $state(false);

	const pageTitle = 'Workhal — Everything your shift needs, in one place';
	const pageDescription =
		'Workhal brings workplace guides, announcements, events, documents, and everyday answers into one clear place.';
	const previewDescription = 'One clear workplace for the people who keep the day moving.';
	const canonicalUrl = $derived(new URL(page.url.pathname, page.url.origin).href);
	const previewImageUrl = $derived(new URL(asset('/og.png'), page.url).href);

	const faqs = [
		{
			question: 'Do employees need to create accounts?',
			answer:
				'No. Employees can join with a workplace link or ID and an employee code. Account sign-in is available for people who need it, but it is not required to open a workplace.'
		},
		{
			question: 'What can we keep in Workhal?',
			answer:
				'Use guides for lasting know-how, announcements for temporary updates, the calendar for operational dates, and documents for shared files and reference material.'
		},
		{
			question: 'Can more than one person maintain the content?',
			answer:
				'Yes. Managers can organize guides, publish announcements, maintain the calendar, manage documents, and control who can access the workplace.'
		},
		{
			question: 'Can we start without moving everything at once?',
			answer:
				'Yes. Start with the answers, updates, and practical guides the team needs most often, then add the rest at a pace the workplace can maintain.'
		}
	];

	function closeMobile() {
		mobileOpen = false;
	}

	onMount(() => {
		const updateHeader = () => (scrolled = window.scrollY > 12);
		updateHeader();
		window.addEventListener('scroll', updateHeader, { passive: true });
		return () => window.removeEventListener('scroll', updateHeader);
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="theme-color" content="#00877f" />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="Workhal" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={previewDescription} />
	<meta property="og:image" content={previewImageUrl} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Workhal: everything your shift needs, in one place" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={previewDescription} />
	<meta name="twitter:image" content={previewImageUrl} />
	<meta name="twitter:image:alt" content="Workhal: everything your shift needs, in one place" />
</svelte:head>

<header class:nav-scrolled={scrolled} class="site-header">
	<div class="site-container header-inner">
		<a class="brand" href="#top" aria-label="Workhal home" onclick={closeMobile}>
			<BrandMark class="brand-logo" />
			<span>workhal</span>
		</a>

		<nav class="desktop-nav" aria-label="Main navigation">
			<a data-slot="button" class="button button-ghost button-sm" href="#before-after"
				>Before and after</a
			>
			<a data-slot="button" class="button button-ghost button-sm" href="#product">Product</a>
			<a data-slot="button" class="button button-ghost button-sm" href="#workflow">How it works</a>
			<a data-slot="button" class="button button-ghost button-sm" href="#questions">Questions</a>
		</nav>

		<a data-slot="button" class="button button-primary header-cta" href="#product">
			Explore Workhal <ArrowRight data-icon="inline-end" size={17} />
		</a>

		<button
			data-slot="button"
			class="button button-outline button-icon mobile-toggle"
			type="button"
			aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			{#if mobileOpen}<X size={22} />{:else}<Menu size={22} />{/if}
		</button>
	</div>

	{#if mobileOpen}
		<nav class="mobile-nav" aria-label="Mobile navigation">
			<a data-slot="button" class="button button-ghost" href="#before-after" onclick={closeMobile}
				>Before and after</a
			>
			<a data-slot="button" class="button button-ghost" href="#product" onclick={closeMobile}
				>Product</a
			>
			<a data-slot="button" class="button button-ghost" href="#workflow" onclick={closeMobile}
				>How it works</a
			>
			<a data-slot="button" class="button button-ghost" href="#questions" onclick={closeMobile}
				>Questions</a
			>
			<a data-slot="button" class="button button-primary" href="#product" onclick={closeMobile}>
				Explore Workhal <ArrowRight data-icon="inline-end" size={17} />
			</a>
		</nav>
	{/if}
</header>

<main id="top">
	<section class="hero-intro">
		<div class="site-container hero-inner">
			<div class="hero-copy" use:entrance={{ distance: 18 }} use:textDecode>
				<h1 data-motion-text>
					Turn scattered information into <span class="hero-accent">useful direction.</span>
				</h1>
				<p data-motion-fade>
					Workhal gives workplace know-how, updates, dates, and documents one clear place, so the
					team spends less time finding and more time doing.
				</p>
				<div class="hero-actions" data-motion-item>
					<a data-slot="button" class="button button-primary" href="#product">
						See the product <ArrowRight data-icon="inline-end" size={18} />
					</a>
					<a data-slot="button" class="button button-outline" href="#before-after"
						>See the difference</a
					>
				</div>
			</div>
			<div class="hero-facts" aria-label="Workhal highlights" use:textDecode>
				<span data-motion-fade><Check size={16} /> No employee account required</span>
				<span data-motion-fade><Check size={16} /> English and Estonian</span>
				<span data-motion-fade><Check size={16} /> Works on desktop and mobile</span>
			</div>
		</div>
	</section>

	<section
		class="transformation"
		id="before-after"
		aria-label="Before and after Workhal"
		use:chaosToClarity
	>
		<div class="comparison chaos-side" use:textDecode>
			<div class="comparison-label" data-motion-fade>Before Workhal</div>
			<div class="comparison-copy">
				<h2 data-motion-text>“Where was that again?”</h2>
				<p data-motion-fade>
					Chats, folders, paper notes, old files - and the same question asked every shift.
				</p>
			</div>
			<div class="scraps" aria-hidden="true">
				<span class="scrap scrap-one"><FileText size={16} /> schedule_final_v4.xlsx</span>
				<span class="scrap scrap-two"><Search size={16} /> Which folder?</span>
				<span class="scrap scrap-three"><Bell size={16} /> Can someone resend it?</span>
			</div>
		</div>

		<div class="comparison clarity-side" use:textDecode>
			<div class="comparison-label" data-motion-fade>With Workhal</div>
			<div class="comparison-copy">
				<h2 data-motion-text>Everything has a home.</h2>
				<p data-motion-fade>
					One current, searchable place that makes sense to managers and employees alike.
				</p>
			</div>
			<div class="comparison-screen">
				<img
					src="/guide.png"
					alt="Workhal guide showing step-by-step instructions for opening a cash register"
				/>
			</div>
		</div>
	</section>

	<section
		class="problem-strip"
		aria-label="Problems Workhal solves"
		use:entrance={{ staggerBy: 0.06, variant: 'card', distance: 28 }}
	>
		<article data-motion-item>
			<strong class="problem-label">Version drift</strong>
			<h3>The latest file is not obvious</h3>
			<p>Old copies linger in inboxes and shared folders.</p>
		</article>
		<article data-motion-item>
			<strong class="problem-label">Buried updates</strong>
			<h3>Updates disappear in chat</h3>
			<p>Important notices compete with everyday conversation.</p>
		</article>
		<article data-motion-item>
			<strong class="problem-label">Knowledge bottleneck</strong>
			<h3>Knowledge lives in people</h3>
			<p>The answer depends on who happens to be working.</p>
		</article>
		<article data-motion-item>
			<strong class="problem-label">Repeated briefing</strong>
			<h3>Every shift starts from zero</h3>
			<p>The same context has to be explained again.</p>
		</article>
	</section>

	<section class="product-section" id="product">
		<div class="site-container product-layout">
			<div class="product-copy" use:entrance use:textDecode>
				<h2 data-motion-text>See the day before the day gets busy.</h2>
				<p data-motion-fade>
					The Today page surfaces useful guides, current events, quick links, and workplace
					information without making employees hunt through separate tools.
				</p>
				<ul class="check-list" data-motion-item>
					<li><Check size={18} /> Current information first</li>
					<li><Check size={18} /> Stable places for recurring knowledge</li>
					<li><Check size={18} /> Search across workplace information</li>
					<li><Check size={18} /> A focused, responsive employee view</li>
				</ul>
			</div>
			<figure class="app-shot app-shot-main">
				<div class="shot-frame shot-today" use:screenshotReveal={0.08} use:screenshotScroll>
					<img src="/today.png" alt="The real Workhal Today screen" />
				</div>
				<figcaption>Today keeps the most useful workplace information in view.</figcaption>
			</figure>
		</div>
	</section>

	<section class="feature-section">
		<div class="site-container">
			<div class="section-heading" use:textDecode>
				<h2 data-motion-text>One workplace, organized around the actual workday.</h2>
				<p data-motion-fade>
					Guides, events, announcements, documents, and common questions stay connected and
					searchable from the same clear interface.
				</p>
			</div>

			<div class="feature-grid" use:entrance={{ staggerBy: 0.055, variant: 'card', distance: 28 }}>
				<article class="feature-copy-card" data-motion-item>
					<div class="feature-icon"><BookOpen size={22} /></div>
					<h3>Practical guides stay easy to find.</h3>
					<p>
						Organize instructions by work area and show the frequently used guides directly on the
						Today page.
					</p>
				</article>
				<article class="feature-copy-card" data-motion-item>
					<div class="feature-icon"><Bell size={22} /></div>
					<h3>Temporary information stays temporary.</h3>
					<p>
						Publish announcements when they matter, then retire them so yesterday’s update does not
						become today’s confusion.
					</p>
				</article>
				<article class="feature-copy-card" data-motion-item>
					<div class="feature-icon"><FileText size={22} /></div>
					<h3>Documents have a dependable place.</h3>
					<p>
						Keep shared files and reference material close to the guides, events, and questions that
						give them context.
					</p>
				</article>
			</div>

			<div class="screenshot-pair">
				<figure class="app-shot" use:entrance>
					<div class="shot-heading">
						<CalendarDays size={20} />
						<h3>A shared operational calendar</h3>
					</div>
					<div class="shot-frame shot-calendar" use:screenshotReveal>
						<img src="/calendar.png" alt="The real Workhal calendar screen" />
					</div>
					<figcaption>Reservations, training, deliveries, visits, and important dates.</figcaption>
				</figure>

				<figure class="app-shot" use:entrance={{ delay: 0.06 }}>
					<div class="shot-heading">
						<KeyRound size={20} />
						<h3>A simple way into the workplace</h3>
					</div>
					<div class="shot-frame shot-login" use:screenshotReveal={0.06}>
						<img src="/login.png" alt="The real Workhal workplace join screen" />
					</div>
					<figcaption>Employees can open a workplace without creating an account.</figcaption>
				</figure>
			</div>
		</div>
	</section>

	<section class="workflow-section" id="workflow">
		<div class="site-container">
			<div class="workflow-heading" use:textDecode>
				<h2 data-motion-text>Three changes, not a giant transformation project.</h2>
				<p data-motion-fade>
					Start with the information employees already need. Workhal gives it structure and a
					dependable publishing rhythm.
				</p>
			</div>

			<div class="workflow-grid" use:entrance={{ staggerBy: 0.06, variant: 'card', distance: 28 }}>
				<article class="workflow-step" data-motion-item>
					<strong>Collect recurring needs</strong>
					<h3>Move the useful things in.</h3>
					<p>Gather recurring answers, practical guides, important dates, and current notices.</p>
				</article>
				<article class="workflow-step" data-motion-item>
					<strong>Separate by lifespan</strong>
					<h3>Give each thing a purpose.</h3>
					<p>Separate lasting know-how from temporary updates and organize it by work area.</p>
				</article>
				<article class="workflow-step" data-motion-item>
					<strong>Maintain one source</strong>
					<h3>Keep one version current.</h3>
					<p>Managers maintain the content. Employees return to the same trusted workplace.</p>
				</article>
			</div>
		</div>
	</section>

	<section class="audience-section">
		<div class="audience-panel employee-panel" use:entrance use:textDecode>
			<div data-motion-item><Users size={28} /></div>
			<h2 data-motion-fade>The employee side</h2>
			<h3 data-motion-text>Less software. More useful context.</h3>
			<p data-motion-fade>
				A straightforward workplace home designed around familiar sections, clear labels, and the
				current day.
			</p>
			<ul class="audience-capabilities" data-motion-item>
				<li>
					<span class="capability-number">01</span>
					<span>
						<strong>Know what matters today</strong>
						<small>See current updates, events, and useful guides at a glance.</small>
					</span>
				</li>
				<li>
					<span class="capability-number">02</span>
					<span>
						<strong>Follow practical guides</strong>
						<small>Open clear, step-by-step instructions where the work happens.</small>
					</span>
				</li>
				<li>
					<span class="capability-number">03</span>
					<span>
						<strong>Find an answer or a person</strong>
						<small>Search common questions or contact the shift lead for help.</small>
					</span>
				</li>
			</ul>
		</div>
		<div class="audience-panel manager-panel" use:entrance={{ delay: 0.07 }} use:textDecode>
			<div data-motion-item><BookOpen size={28} /></div>
			<h2 data-motion-fade>The manager side</h2>
			<h3 data-motion-text>Enough control to keep it trustworthy.</h3>
			<p data-motion-fade>
				Drafting, publishing, access controls, and activity history keep information useful without
				making the employee experience heavy.
			</p>
			<ul class="audience-capabilities" data-motion-item>
				<li>
					<span class="capability-number">01</span>
					<span>
						<strong>Draft, review, and publish</strong>
						<small>Shape content before it reaches the employee view.</small>
					</span>
				</li>
				<li>
					<span class="capability-number">02</span>
					<span>
						<strong>Control workplace access</strong>
						<small>Decide who can enter, contribute, and manage information.</small>
					</span>
				</li>
				<li>
					<span class="capability-number">03</span>
					<span>
						<strong>Keep one source current</strong>
						<small>Update the trusted version and track how content changes.</small>
					</span>
				</li>
			</ul>
		</div>
	</section>

	<section class="principle-section">
		<blockquote data-motion-text use:textDecode>
			“Clarity is not an empty screen. It is the right thing, in the right place, at the right
			time.”
		</blockquote>
	</section>

	<section class="faq-section" id="questions">
		<div class="site-container faq-layout">
			<div class="faq-heading" use:textDecode>
				<h2 data-motion-text>Clear questions. Clear answers.</h2>
				<p data-motion-fade>The practical details teams usually want to understand first.</p>
			</div>
			<div class="faq-accordion" use:entrance={{ delay: 0.06 }}>
				<Accordion.Root type="single" class="faq-list">
					{#each faqs as faq, index}
						<Accordion.Item value={`faq-${index}`}>
							<Accordion.Trigger>{faq.question}</Accordion.Trigger>
							<Accordion.Content><p>{faq.answer}</p></Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</div>
		</div>
	</section>

	<section class="final-cta">
		<div class="site-container final-inner" use:entrance use:textDecode>
			<h2 data-motion-text>Leave “where was that?” behind.</h2>
			<p data-motion-fade>Start with the information your team asks for every week.</p>
			<a data-motion-item data-slot="button" class="button button-light" href="#product"
				>Explore the employee view <ArrowRight data-icon="inline-end" size={18} /></a
			>
		</div>
	</section>
</main>

<footer class="site-footer">
	<div class="site-container footer-inner">
		<a class="brand" href="#top" aria-label="Back to top">
			<BrandMark class="brand-logo" />
			<span>workhal</span>
		</a>
		<p>Everything your shift needs, in one place.</p>
		<nav aria-label="Footer navigation" class="flex flex-wrap gap-6">
			<a data-slot="button" class="button button-ghost button-sm" href="#product">Product</a>
			<a data-slot="button" class="button button-ghost button-sm" href="#workflow">How it works</a>
			<a data-slot="button" class="button button-ghost button-sm" href="#questions">Questions</a>
		</nav>
	</div>
</footer>
