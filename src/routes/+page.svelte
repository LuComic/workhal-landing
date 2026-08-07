<script lang="ts">
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
	import { onMount } from 'svelte';

	let mobileOpen = $state(false);
	let scrolled = $state(false);

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

	function reveal(node: HTMLElement, delay = 0) {
		node.style.setProperty('--reveal-delay', `${delay}ms`);
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					observer.unobserve(node);
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -32px' }
		);
		observer.observe(node);

		return { destroy: () => observer.disconnect() };
	}

	onMount(() => {
		const updateHeader = () => (scrolled = window.scrollY > 12);
		updateHeader();
		window.addEventListener('scroll', updateHeader, { passive: true });
		return () => window.removeEventListener('scroll', updateHeader);
	});
</script>

<svelte:head>
	<title>Workhal — Everything your shift needs, in one place</title>
	<meta
		name="description"
		content="Workhal brings workplace guides, announcements, events, documents, and everyday answers into one clear home."
	/>
	<meta name="theme-color" content="#00877f" />
	<meta property="og:title" content="Workhal — Everything your shift needs, in one place" />
	<meta
		property="og:description"
		content="One clear workplace for the people who keep the day moving."
	/>
	<meta property="og:image" content="/og.png" />
	<meta property="og:type" content="website" />
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
			<div class="hero-copy">
				<h1>Turn scattered information into <span>useful direction.</span></h1>
				<p>
					Workhal gives workplace know-how, updates, dates, and documents one clear home, so the
					team spends less time finding and more time doing.
				</p>
				<div class="hero-actions">
					<a data-slot="button" class="button button-primary" href="#product">
						See the product <ArrowRight data-icon="inline-end" size={18} />
					</a>
					<a data-slot="button" class="button button-outline" href="#before-after"
						>See the difference</a
					>
				</div>
			</div>
			<div class="hero-facts" aria-label="Workhal highlights">
				<span><Check size={16} /> No employee account required</span>
				<span><Check size={16} /> English and Estonian</span>
				<span><Check size={16} /> Works on desktop and mobile</span>
			</div>
		</div>
	</section>

	<section class="transformation" id="before-after" aria-label="Before and after Workhal">
		<div class="comparison chaos-side">
			<div class="comparison-label">Before Workhal</div>
			<div class="comparison-copy">
				<h2>“Where was that again?”</h2>
				<p>Chats, folders, paper notes, old files—and the same question asked every shift.</p>
			</div>
			<div class="scraps" aria-hidden="true">
				<span class="scrap scrap-one"><FileText size={16} /> schedule_final_v4.xlsx</span>
				<span class="scrap scrap-two"><Search size={16} /> Which folder?</span>
				<span class="scrap scrap-three"><Bell size={16} /> Can someone resend it?</span>
			</div>
		</div>

		<div class="comparison clarity-side">
			<div class="comparison-label">With Workhal</div>
			<div class="comparison-copy">
				<h2>Everything has a home.</h2>
				<p>One current, searchable place that makes sense to managers and employees alike.</p>
			</div>
			<div class="comparison-screen">
				<img src="/today.png" alt="Workhal Today page showing useful guides and current events" />
			</div>
		</div>
	</section>

	<section class="problem-strip" aria-label="Problems Workhal solves">
		<article>
			<strong class="problem-label">Version drift</strong>
			<h3>The latest file is not obvious</h3>
			<p>Old copies linger in inboxes and shared folders.</p>
		</article>
		<article>
			<strong class="problem-label">Buried updates</strong>
			<h3>Updates disappear in chat</h3>
			<p>Important notices compete with everyday conversation.</p>
		</article>
		<article>
			<strong class="problem-label">Knowledge bottleneck</strong>
			<h3>Knowledge lives in people</h3>
			<p>The answer depends on who happens to be working.</p>
		</article>
		<article>
			<strong class="problem-label">Repeated briefing</strong>
			<h3>Every shift starts from zero</h3>
			<p>The same context has to be explained again.</p>
		</article>
	</section>

	<section class="product-section" id="product">
		<div class="site-container product-layout">
			<div class="product-copy reveal" use:reveal>
				<h2>See the day before the day gets busy.</h2>
				<p>
					The Today page surfaces useful guides, current events, quick links, and workplace
					information without making employees hunt through separate tools.
				</p>
				<ul class="check-list">
					<li><Check size={18} /> Current information first</li>
					<li><Check size={18} /> Stable places for recurring knowledge</li>
					<li><Check size={18} /> Search across workplace information</li>
					<li><Check size={18} /> A focused, responsive employee view</li>
				</ul>
			</div>
			<figure class="app-shot app-shot-main reveal" use:reveal={80}>
				<div class="shot-frame shot-today">
					<img src="/today.png" alt="The real Workhal Today screen" />
				</div>
				<figcaption>Today keeps the most useful workplace information in view.</figcaption>
			</figure>
		</div>
	</section>

	<section class="feature-section">
		<div class="site-container">
			<div class="section-heading reveal" use:reveal>
				<h2>One workplace, organized around the actual workday.</h2>
				<p>
					Guides, events, announcements, documents, and common questions stay connected and
					searchable from the same clear interface.
				</p>
			</div>

			<div class="feature-grid">
				<article class="feature-copy-card reveal" use:reveal>
					<div class="feature-icon"><BookOpen size={22} /></div>
					<h3>Practical guides stay easy to find.</h3>
					<p>
						Organize instructions by work area and show the frequently used guides directly on the
						Today page.
					</p>
				</article>
				<article class="feature-copy-card reveal" use:reveal={50}>
					<div class="feature-icon"><Bell size={22} /></div>
					<h3>Temporary information stays temporary.</h3>
					<p>
						Publish announcements when they matter, then retire them so yesterday’s update does not
						become today’s confusion.
					</p>
				</article>
				<article class="feature-copy-card reveal" use:reveal={100}>
					<div class="feature-icon"><FileText size={22} /></div>
					<h3>Documents have a dependable place.</h3>
					<p>
						Keep shared files and reference material close to the guides, events, and questions that
						give them context.
					</p>
				</article>
			</div>

			<div class="screenshot-pair">
				<figure class="app-shot reveal" use:reveal>
					<div class="shot-heading">
						<CalendarDays size={20} />
						<h3>A shared operational calendar</h3>
					</div>
					<div class="shot-frame shot-calendar">
						<img src="/calendar.png" alt="The real Workhal calendar screen" />
					</div>
					<figcaption>Reservations, training, deliveries, visits, and important dates.</figcaption>
				</figure>

				<figure class="app-shot reveal" use:reveal={80}>
					<div class="shot-heading">
						<KeyRound size={20} />
						<h3>A simple way into the workplace</h3>
					</div>
					<div class="shot-frame shot-login">
						<img src="/login.png" alt="The real Workhal workplace join screen" />
					</div>
					<figcaption>Employees can open a workplace without creating an account.</figcaption>
				</figure>
			</div>
		</div>
	</section>

	<section class="workflow-section" id="workflow">
		<div class="site-container">
			<div class="workflow-heading reveal" use:reveal>
				<h2>Three changes, not a giant transformation project.</h2>
				<p>
					Start with the information employees already need. Workhal gives it structure and a
					dependable publishing rhythm.
				</p>
			</div>

			<div class="workflow-grid">
				<article class="workflow-step reveal" use:reveal>
					<strong>Collect recurring needs</strong>
					<h3>Move the useful things in.</h3>
					<p>Gather recurring answers, practical guides, important dates, and current notices.</p>
				</article>
				<article class="workflow-step reveal" use:reveal={60}>
					<strong>Separate by lifespan</strong>
					<h3>Give each thing a purpose.</h3>
					<p>Separate lasting know-how from temporary updates and organize it by work area.</p>
				</article>
				<article class="workflow-step reveal" use:reveal={120}>
					<strong>Maintain one source</strong>
					<h3>Keep one version current.</h3>
					<p>Managers maintain the content. Employees return to the same trusted workplace.</p>
				</article>
			</div>
		</div>
	</section>

	<section class="audience-section">
		<div class="audience-panel employee-panel reveal" use:reveal>
			<Users size={28} />
			<h2>The employee side</h2>
			<h3>Less software. More useful context.</h3>
			<p>
				A straightforward workplace home designed around familiar sections, clear labels, and the
				current day.
			</p>
			<ul>
				<li>Today’s priorities</li>
				<li>Practical guides</li>
				<li>Questions and help</li>
			</ul>
		</div>
		<div class="audience-panel manager-panel reveal" use:reveal={70}>
			<BookOpen size={28} />
			<h2>The manager side</h2>
			<h3>Enough control to keep it trustworthy.</h3>
			<p>
				Drafting, publishing, access controls, and activity history keep information useful without
				making the employee experience heavy.
			</p>
			<ul>
				<li>Content workflow</li>
				<li>Workplace access</li>
				<li>Current information</li>
			</ul>
		</div>
	</section>

	<section class="principle-section">
		<blockquote>
			“Clarity is not an empty screen. It is the right thing, in the right place, at the right
			time.”
		</blockquote>
	</section>

	<section class="faq-section" id="questions">
		<div class="site-container faq-layout">
			<div class="faq-heading reveal" use:reveal>
				<h2>Clear questions. Clear answers.</h2>
				<p>The practical details teams usually want to understand first.</p>
			</div>
			<div class="faq-accordion reveal" use:reveal={60}>
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
		<div class="site-container final-inner reveal" use:reveal>
			<h2>Leave “where was that?” behind.</h2>
			<p>Start with the information your team asks for every week.</p>
			<a data-slot="button" class="button button-light" href="#product"
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
