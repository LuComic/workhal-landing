<script lang="ts">
	import { asset } from '$app/paths';
	import { page } from '$app/state';
	import {
		ArrowRight,
		BookOpen,
		CalendarDays,
		Check,
		CircleHelp,
		FileText,
		Home,
		KeyRound,
		Megaphone,
		Menu,
		Search,
		ShieldCheck,
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

	const pageTitle = 'Workhal — The workplace portal built for the workday';
	const pageDescription =
		'Workhal turns workplace guides, schedules, files, and everyday answers into one clear staff portal with a focused employee view and controlled manager publishing.';
	const previewDescription = 'Give every shift one clear place to start.';
	const canonicalUrl = $derived(new URL(page.url.pathname, page.url.origin).href);
	const previewImageUrl = $derived(new URL(asset('/og.png'), page.url).href);

	const faqs = [
		{
			question: 'Do employees need to create accounts?',
			answer:
				'No. A workplace can be open by link or protected with a join code or private link. Access can be remembered on that device, which makes Workhal practical on shared workplace computers as well as employees’ phones.'
		},
		{
			question: 'How is Workhal different from Docs or Notion?',
			answer:
				'Docs and Notion are flexible places to create pages. Workhal is a ready-made employee portal: it opens on the workday, separates published information from manager controls, connects guides to events and files, and gives staff one search built around workplace tasks.'
		},
		{
			question: 'What belongs in Workhal?',
			answer:
				'Use guides for repeatable procedures, the calendar for reservations, training, maintenance, and other operational dates, the document library for files and shared links, and common questions for fast everyday answers.'
		},
		{
			question: 'Can more than one person maintain the content?',
			answer:
				'Yes. Give people view-only, editing, or full content access. Drafts stay out of the employee view until they are published, and the activity history shows who created, changed, or removed workplace content.'
		},
		{
			question: 'Can we start without moving everything at once?',
			answer:
				'Yes. Start with the recurring answers, practical guides, and important dates the team needs most often, then add the rest at a pace the workplace can maintain.'
		}
	];

	const productFeatures = [
		{
			icon: Home,
			label: 'Today',
			title: 'A useful opening screen, shaped around this shift.',
			description:
				'Bring the workplace welcome, quick links, today’s schedule, active announcements, what is coming next, and featured guides into one configurable starting point.',
			details: [
				'Show, hide, and reorder sections',
				'Branded for each workplace',
				'Built for quick return visits'
			],
			tone: 'mint'
		},
		{
			icon: BookOpen,
			label: 'Guides & answers',
			title: 'Know-how people can actually use mid-task.',
			description:
				'Publish rich, step-by-step guides by work area, connect related instructions, and keep common questions close for the answers people need repeatedly.',
			details: [
				'Categories, reading time, and keywords',
				'Related guides and print view',
				'Fast common-question answers'
			],
			tone: 'paper'
		},
		{
			icon: CalendarDays,
			label: 'Calendar & responsibility',
			title: 'The schedule carries the context with it.',
			description:
				'Plan training, reservations, maintenance, and other operational dates with owners, locations, notes, attachments, and the guides needed to prepare.',
			details: [
				'Assign employees to events',
				'Attach files and related guides',
				'Export events to a calendar'
			],
			tone: 'orange'
		},
		{
			icon: Megaphone,
			label: 'Announcements & notifications',
			title: 'Important changes arrive while they still matter.',
			description:
				'Publish time-bound operational updates, pin priorities, and give staff a notification feed for new content, assignments, questions, and workplace changes.',
			details: [
				'Normal, important, and urgent priority',
				'Publish and expiry windows',
				'Unread activity in one feed'
			],
			tone: 'ink'
		},
		{
			icon: FileText,
			label: 'Documents & connections',
			title: 'Files stop living in a separate universe.',
			description:
				'Upload a workplace file or point to an existing link, connect it to the relevant guidance, and assign it to the people who need it.',
			details: [
				'Files and shared links',
				'Guide and employee relationships',
				'One published document library'
			],
			tone: 'paper'
		},
		{
			icon: Search,
			label: 'Search & personal notes',
			title: 'Find the shared answer. Keep your own context.',
			description:
				'Search across guides, events, announcements, common questions, and documents, while signed-in employees keep an autosaved note pad close to the workday.',
			details: [
				'Search titles, content, people, and places',
				'Keyboard-first quick search',
				'Autosaved employee notes'
			],
			tone: 'mint'
		},
		{
			icon: ShieldCheck,
			label: 'Publishing, roles & access',
			title: 'Delegate the upkeep without losing the trusted source.',
			description:
				'Keep drafts away from the employee view, let selected people contribute to specific areas, and control entry without forcing every employee to create an account.',
			details: [
				'Viewer, editor, and manager roles',
				'Per-area employee editing',
				'Join code, private link, and activity history'
			],
			tone: 'teal'
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
	<meta property="og:image:alt" content="Workhal: give every shift one clear place to start" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={previewDescription} />
	<meta name="twitter:image" content={previewImageUrl} />
	<meta name="twitter:image:alt" content="Workhal: give every shift one clear place to start" />
</svelte:head>

<header class:nav-scrolled={scrolled} class="site-header">
	<div class="site-container header-inner">
		<a class="brand" href="#top" aria-label="Workhal home" onclick={closeMobile}>
			<BrandMark class="brand-logo" />
			<span>workhal</span>
		</a>

		<nav class="desktop-nav" aria-label="Main navigation">
			<a data-slot="button" class="button button-ghost button-sm" href="#difference">Why Workhal</a>
			<a data-slot="button" class="button button-ghost button-sm" href="#product">Product</a>
			<a data-slot="button" class="button button-ghost button-sm" href="#roles">For teams</a>
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
			<a data-slot="button" class="button button-ghost" href="#difference" onclick={closeMobile}
				>Why Workhal</a
			>
			<a data-slot="button" class="button button-ghost" href="#product" onclick={closeMobile}
				>Product</a
			>
			<a data-slot="button" class="button button-ghost" href="#roles" onclick={closeMobile}
				>For teams</a
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
					Give every shift <span class="hero-accent">one clear place to start.</span>
				</h1>
				<p data-motion-fade>
					Workhal turns procedures, schedules, files, and everyday answers into a focused staff
					portal—built for people doing the work, not people organizing pages.
				</p>
				<div class="hero-actions" data-motion-item>
					<a data-slot="button" class="button button-primary" href="#product">
						See how Workhal works <ArrowRight data-icon="inline-end" size={18} />
					</a>
					<a data-slot="button" class="button button-outline" href="#difference"
						>Why not Docs or Notion?</a
					>
				</div>
			</div>
			<div class="hero-facts" aria-label="Workhal highlights" use:textDecode>
				<span data-motion-fade><Check size={16} /> No employee account required</span>
				<span data-motion-fade><Check size={16} /> Controlled publishing and permissions</span>
				<span data-motion-fade><Check size={16} /> Made for shared computers and phones</span>
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
			<div class="comparison-label" data-motion-fade>Across folders, chats, and shared drives</div>
			<div class="comparison-copy">
				<h2 data-motion-text>The answer exists. The team still asks.</h2>
				<p data-motion-fade>
					Information is spread across pages and files, while the same questions still interrupt the
					shift.
				</p>
			</div>
			<div class="scraps" aria-hidden="true">
				<span class="scrap scrap-one"><FileText size={16} /> process_FINAL_v3.docx</span>
				<span class="scrap scrap-two"><Search size={16} /> Which page is current?</span>
				<span class="scrap scrap-three"><CircleHelp size={16} /> Who knows this?</span>
			</div>
		</div>

		<div class="comparison clarity-side" use:textDecode>
			<div class="comparison-label" data-motion-fade>With Workhal</div>
			<div class="comparison-copy">
				<h2 data-motion-text>The right answer meets the workday.</h2>
				<p data-motion-fade>
					One staff-ready portal brings the day, guides, calendar, files, and answers together in a
					structure employees can understand at a glance.
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
		aria-label="Business benefits of Workhal"
		use:entrance={{ staggerBy: 0.06, variant: 'card', distance: 28 }}
	>
		<article data-motion-item>
			<strong class="problem-label">Fewer interruptions</strong>
			<h3>Managers stop being the search bar</h3>
			<p>Everyday answers stay findable even when the expert is not on shift.</p>
		</article>
		<article data-motion-item>
			<strong class="problem-label">Faster onboarding</strong>
			<h3>New starters follow the same playbook</h3>
			<p>Clear, repeatable guides reduce dependence on memory and verbal handover.</p>
		</article>
		<article data-motion-item>
			<strong class="problem-label">Operational readiness</strong>
			<h3>The team sees the day before it gets busy</h3>
			<p>Important times, responsibilities, and instructions live in the same workplace.</p>
		</article>
		<article data-motion-item>
			<strong class="problem-label">A trusted source</strong>
			<h3>Employees see the published version</h3>
			<p>Drafts and manager controls stay separate from the clear employee view.</p>
		</article>
	</section>

	<section class="product-section" id="product">
		<div class="site-container product-layout">
			<div class="product-copy" use:entrance use:textDecode>
				<h2 data-motion-text>Start every shift with context, not questions.</h2>
				<p data-motion-fade>
					Today is a branded operational briefing, not a blank page. It brings the day’s schedule,
					featured instructions, and key workplace information into one clean view.
				</p>
				<ul class="check-list" data-motion-item>
					<li><Check size={18} /> Featured guides and today’s schedule</li>
					<li><Check size={18} /> Sections managers can show, hide, and reorder</li>
					<li><Check size={18} /> One search across the workplace</li>
					<li><Check size={18} /> A direct route to the right contact</li>
				</ul>
			</div>
			<figure class="app-shot app-shot-main">
				<div class="shot-frame shot-today" use:screenshotReveal={0.08} use:screenshotScroll>
					<img src="/today.png" alt="The real Workhal Today screen" />
				</div>
			</figure>
		</div>
	</section>

	<section class="feature-section">
		<div class="site-container">
			<div class="section-heading" use:textDecode>
				<h2 data-motion-text>Tools for running work, not collecting pages.</h2>
				<p data-motion-fade>
					Every part of Workhal is shaped around what staff need to know, do, or find during a shift
					and what managers need to keep it reliable.
				</p>
			</div>

			<div class="feature-grid" use:entrance={{ staggerBy: 0.055, variant: 'card', distance: 28 }}>
				<article class="feature-copy-card" data-motion-item>
					<div class="feature-icon"><BookOpen size={22} /></div>
					<h3>Turn know-how into usable instructions.</h3>
					<p>
						Organize step-by-step guides by work area, add reading time and related guidance,
						feature the most useful ones on Today, and print them when the job needs paper.
					</p>
				</article>
				<article class="feature-copy-card" data-motion-item>
					<div class="feature-icon"><CalendarDays size={22} /></div>
					<h3>Put the full plan on the calendar.</h3>
					<p>
						Keep reservations, training, maintenance, and key dates together with the responsible
						people, location, notes, attachments, and the guides needed to prepare.
					</p>
				</article>
				<article class="feature-copy-card" data-motion-item>
					<div class="feature-icon"><FileText size={22} /></div>
					<h3>Keep files connected to the work.</h3>
					<p>
						Upload a file or share an existing link, connect it to relevant guides and employees,
						and make it discoverable through the same workplace search.
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
					<figcaption>
						Plan the work with dates, people, files, and instructions in context.
					</figcaption>
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

	<section class="feature-story" aria-labelledby="feature-story-title">
		<div class="feature-story-sticky">
			<div class="site-container feature-story-heading" use:textDecode>
				<h2 id="feature-story-title" data-motion-text>
					One workplace. Every moving part connected.
				</h2>
			</div>

			<!-- svelte-ignore a11y_no_noninteractive_tabindex (scroll region is keyboard-focusable) -->
			<div class="feature-story-window" role="region" aria-label="Product features" tabindex="0">
				<div class="feature-story-track">
					{#each productFeatures as feature, index}
						{@const Icon = feature.icon}
						<article class={`feature-story-card feature-tone-${feature.tone}`}>
							<div class="feature-story-copy">
								<div class="feature-story-meta">
									<span>{String(index + 1).padStart(2, '0')} / 07</span>
									<span><Icon size={19} /> {feature.label}</span>
								</div>
								<h3>{feature.title}</h3>
								<p>{feature.description}</p>
								<ul>
									{#each feature.details as detail}
										<li><Check size={16} /> {detail}</li>
									{/each}
								</ul>
							</div>
							<div
								class="feature-media-placeholder"
								role="img"
								aria-label={`${feature.label} product screenshot placeholder`}
							>
								<div class="placeholder-bar">
									<span></span><span></span><span></span>
								</div>
								<div class="placeholder-body">
									<Icon size={34} />
									<strong>{feature.label}</strong>
									<small>Product screenshot placeholder</small>
								</div>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="workflow-section" id="difference">
		<div class="site-container">
			<div class="workflow-heading" use:textDecode>
				<h2 data-motion-text>Why Workhal instead of another Docs or Notion space?</h2>
				<p data-motion-fade>
					Docs and Notion are excellent places to create information. Workhal is designed to turn
					approved information into an employee experience that works on shift.
				</p>
			</div>

			<div class="workflow-grid" use:entrance={{ staggerBy: 0.06, variant: 'card', distance: 28 }}>
				<article class="workflow-step" data-motion-item>
					<strong>A starting point, not a folder tree</strong>
					<h3>Start with what matters today.</h3>
					<p>
						Employees open Today and immediately see useful guidance and what is on the schedule.
					</p>
				</article>
				<article class="workflow-step" data-motion-item>
					<strong>A staff view, not an editing workspace</strong>
					<h3>Employees see the trusted version.</h3>
					<p>Drafting, publishing, access controls, and administration stay on the manager side.</p>
				</article>
				<article class="workflow-step" data-motion-item>
					<strong>Connected operations, not isolated pages</strong>
					<h3>Knowledge travels with the work.</h3>
					<p>
						Guides, events, files, responsibilities, and common questions connect through one staff
						portal.
					</p>
				</article>
			</div>
		</div>
	</section>

	<section class="audience-section" id="roles">
		<div class="audience-panel employee-panel" use:entrance use:textDecode>
			<div data-motion-item><Users size={28} /></div>
			<h2 data-motion-fade>The employee side</h2>
			<h3 data-motion-text>A workplace portal that feels obvious.</h3>
			<p data-motion-fade>
				A clear home designed for quick visits during real work, whether staff use a shared computer
				or their own phone.
			</p>
			<ul class="audience-capabilities" data-motion-item>
				<li>
					<span class="capability-number">01</span>
					<span>
						<strong>Start with the shift</strong>
						<small
							>Open Today for the schedule, useful guides, and direct routes to key areas.</small
						>
					</span>
				</li>
				<li>
					<span class="capability-number">02</span>
					<span>
						<strong>Search the whole workplace</strong>
						<small
							>Find guides, events, files, and common answers without learning a folder system.</small
						>
					</span>
				</li>
				<li>
					<span class="capability-number">03</span>
					<span>
						<strong>Ask the right person</strong>
						<small>Send a question to the shift lead without leaving the workplace portal.</small>
					</span>
				</li>
			</ul>
		</div>
		<div class="audience-panel manager-panel" use:entrance={{ delay: 0.07 }} use:textDecode>
			<div data-motion-item><ShieldCheck size={28} /></div>
			<h2 data-motion-fade>The manager side</h2>
			<h3 data-motion-text>Control without becoming a systems admin.</h3>
			<p data-motion-fade>
				A separate manager area keeps content, staff access, and workplace settings reliable without
				adding complexity to the employee side.
			</p>
			<ul class="audience-capabilities" data-motion-item>
				<li>
					<span class="capability-number">01</span>
					<span>
						<strong>Publish with confidence</strong>
						<small>Prepare and review content before it reaches employees.</small>
					</span>
				</li>
				<li>
					<span class="capability-number">02</span>
					<span>
						<strong>Delegate with clear roles</strong>
						<small
							>Give view-only, editing, or full content access without exposing owner controls.</small
						>
					</span>
				</li>
				<li>
					<span class="capability-number">03</span>
					<span>
						<strong>Keep access and changes accountable</strong>
						<small>Protect entry with a code or private link and review the activity history.</small
						>
					</span>
				</li>
			</ul>
		</div>
	</section>

	<section class="principle-section">
		<blockquote data-motion-text use:textDecode>
			“Your procedures should do more than exist. They should show up when the work needs them.”
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
			<h2 data-motion-text>Make workplace knowledge useful on shift.</h2>
			<p data-motion-fade>
				Give staff one clear source for the workday—and managers one place to keep it trusted.
			</p>
			<a data-motion-item data-slot="button" class="button button-light" href="#product"
				>See Workhal in action <ArrowRight data-icon="inline-end" size={18} /></a
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
		<p>The workplace portal built for the workday.</p>
		<nav aria-label="Footer navigation" class="flex flex-wrap gap-6">
			<a data-slot="button" class="button button-ghost button-sm" href="#product">Product</a>
			<a data-slot="button" class="button button-ghost button-sm" href="#difference">Why Workhal</a>
			<a data-slot="button" class="button button-ghost button-sm" href="#questions">Questions</a>
		</nav>
	</div>
</footer>
