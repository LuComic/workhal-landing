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
		PencilLine,
		Search,
		ShieldCheck,
		Users
	} from '@lucide/svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime.js';
	import {
		chaosToClarity,
		entrance,
		screenshotReveal,
		screenshotScroll,
		textDecode
	} from '$lib/motion';

	const locale = getLocale();
	const pageTitle = m.page_title();
	const pageDescription = m.page_description();
	const previewDescription = m.preview_description();
	const canonicalUrl = $derived(new URL(page.url.pathname, page.url.origin).href);
	const previewImageUrl = $derived(new URL(asset('/og.png'), page.url).href);
	const estonianUrl = $derived(new URL(localizeHref('/', { locale: 'et' }), page.url.origin).href);
	const englishUrl = $derived(new URL(localizeHref('/', { locale: 'en' }), page.url.origin).href);
	const openGraphLocale = locale === 'et' ? 'et_EE' : 'en_GB';
	const openGraphAlternateLocale = locale === 'et' ? 'en_GB' : 'et_EE';
	const featureImageLocale = locale === 'et' ? 'est' : 'en';

	const faqs = [
		{
			question: m.faq_accounts_question(),
			answer: m.faq_accounts_answer()
		},
		{
			question: m.faq_difference_question(),
			answer: m.faq_difference_answer()
		},
		{
			question: m.faq_content_question(),
			answer: m.faq_content_answer()
		},
		{
			question: m.faq_maintainers_question(),
			answer: m.faq_maintainers_answer()
		},
		{
			question: m.faq_gradual_question(),
			answer: m.faq_gradual_answer()
		}
	];

	const productFeatures = [
		{
			icon: Home,
			label: m.feature_today_label(),
			title: m.feature_today_title(),
			description: m.feature_today_description(),
			details: [
				m.feature_today_detail_one(),
				m.feature_today_detail_two(),
				m.feature_today_detail_three()
			],
			tone: 'mint',
			image: `/features/processed/today-${featureImageLocale}.png`
		},
		{
			icon: BookOpen,
			label: m.feature_guides_label(),
			title: m.feature_guides_title(),
			description: m.feature_guides_description(),
			details: [
				m.feature_guides_detail_one(),
				m.feature_guides_detail_two(),
				m.feature_guides_detail_three()
			],
			tone: 'paper',
			image: `/features/processed/guide-${featureImageLocale}.png`
		},
		{
			icon: PencilLine,
			label: m.feature_creation_label(),
			title: m.feature_creation_title(),
			description: m.feature_creation_description(),
			details: [
				m.feature_creation_detail_one(),
				m.feature_creation_detail_two(),
				m.feature_creation_detail_three()
			],
			tone: 'teal',
			image: `/features/processed/creation-${featureImageLocale}.png`
		},
		{
			icon: CalendarDays,
			label: m.feature_calendar_label(),
			title: m.feature_calendar_title(),
			description: m.feature_calendar_description(),
			details: [
				m.feature_calendar_detail_one(),
				m.feature_calendar_detail_two(),
				m.feature_calendar_detail_three()
			],
			tone: 'orange',
			image: `/features/processed/calendar-${featureImageLocale}.png`
		},
		{
			icon: Megaphone,
			label: m.feature_announcements_label(),
			title: m.feature_announcements_title(),
			description: m.feature_announcements_description(),
			details: [
				m.feature_announcements_detail_one(),
				m.feature_announcements_detail_two(),
				m.feature_announcements_detail_three()
			],
			tone: 'ink',
			image: `/features/processed/announcement-${featureImageLocale}.png`
		},
		{
			icon: FileText,
			label: m.feature_documents_label(),
			title: m.feature_documents_title(),
			description: m.feature_documents_description(),
			details: [
				m.feature_documents_detail_one(),
				m.feature_documents_detail_two(),
				m.feature_documents_detail_three()
			],
			tone: 'paper',
			image: `/features/processed/docs-${featureImageLocale}.png`
		},
		{
			icon: Search,
			label: m.feature_search_label(),
			title: m.feature_search_title(),
			description: m.feature_search_description(),
			details: [
				m.feature_search_detail_one(),
				m.feature_search_detail_two(),
				m.feature_search_detail_three()
			],
			tone: 'mint',
			image: `/features/processed/search-${featureImageLocale}.png`
		},
		{
			icon: ShieldCheck,
			label: m.feature_access_label(),
			title: m.feature_access_title(),
			description: m.feature_access_description(),
			details: [
				m.feature_access_detail_one(),
				m.feature_access_detail_two(),
				m.feature_access_detail_three()
			],
			tone: 'teal',
			image: `/features/processed/employee-${featureImageLocale}.png`
		}
	];
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="theme-color" content="#00877f" />
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="et" href={estonianUrl} />
	<link rel="alternate" hreflang="en" href={englishUrl} />
	<link rel="alternate" hreflang="x-default" href={estonianUrl} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="Workhal" />
	<meta property="og:locale" content={openGraphLocale} />
	<meta property="og:locale:alternate" content={openGraphAlternateLocale} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={previewDescription} />
	<meta property="og:image" content={previewImageUrl} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={m.preview_image_alt()} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={previewDescription} />
	<meta name="twitter:image" content={previewImageUrl} />
	<meta name="twitter:image:alt" content={m.preview_image_alt()} />
</svelte:head>

<SiteHeader />

<main id="top">
	<section class="hero-intro">
		<div class="site-container hero-inner">
			<div class="hero-copy" use:entrance={{ distance: 18 }} use:textDecode>
				<h1 data-motion-text>
					{m.hero_title_start()} <span class="hero-accent">{m.hero_title_accent()}</span>
				</h1>
				<p data-motion-fade>{m.hero_description()}</p>
				<div class="hero-actions" data-motion-item>
					<a data-slot="button" class="button button-primary" href="#product">
						{m.hero_primary_action()}
						<ArrowRight data-icon="inline-end" size={18} />
					</a>
					<a data-slot="button" class="button button-outline" href="#difference"
						>{m.hero_secondary_action()}</a
					>
				</div>
			</div>
			<div class="hero-facts" aria-label={m.workhal_highlights()} use:textDecode>
				<span data-motion-fade><Check size={16} /> {m.highlight_no_account()}</span>
				<span data-motion-fade><Check size={16} /> {m.highlight_controlled_publishing()}</span>
				<span data-motion-fade><Check size={16} /> {m.highlight_shared_devices()}</span>
			</div>
		</div>
	</section>

	<section
		class="transformation"
		id="before-after"
		aria-label={m.before_after_label()}
		use:chaosToClarity
	>
		<div class="comparison chaos-side" use:textDecode>
			<div class="comparison-label" data-motion-fade>{m.before_label()}</div>
			<div class="comparison-copy">
				<h2 data-motion-text>{m.before_title()}</h2>
				<p data-motion-fade>{m.before_description()}</p>
			</div>
			<div class="scraps" aria-hidden="true">
				<span class="scrap scrap-one"><FileText size={16} /> process_FINAL_v3.docx</span>
				<span class="scrap scrap-two"><Search size={16} /> {m.scrap_current_page()}</span>
				<span class="scrap scrap-three"><CircleHelp size={16} /> {m.scrap_who_knows()}</span>
			</div>
		</div>

		<div class="comparison clarity-side" use:textDecode>
			<div class="comparison-label" data-motion-fade>{m.after_label()}</div>
			<div class="comparison-copy">
				<h2 data-motion-text>{m.after_title()}</h2>
				<p data-motion-fade>{m.after_description()}</p>
			</div>
			<div class="comparison-screen">
				<img src="/guide.png" alt={m.guide_image_alt()} />
			</div>
		</div>
	</section>

	<section
		class="problem-strip"
		aria-label={m.business_benefits_label()}
		use:entrance={{ staggerBy: 0.06, variant: 'card', distance: 28 }}
	>
		<article data-motion-item>
			<strong class="problem-label">{m.benefit_interruptions_label()}</strong>
			<h3>{m.benefit_interruptions_title()}</h3>
			<p>{m.benefit_interruptions_description()}</p>
		</article>
		<article data-motion-item>
			<strong class="problem-label">{m.benefit_onboarding_label()}</strong>
			<h3>{m.benefit_onboarding_title()}</h3>
			<p>{m.benefit_onboarding_description()}</p>
		</article>
		<article data-motion-item>
			<strong class="problem-label">{m.benefit_readiness_label()}</strong>
			<h3>{m.benefit_readiness_title()}</h3>
			<p>{m.benefit_readiness_description()}</p>
		</article>
		<article data-motion-item>
			<strong class="problem-label">{m.benefit_trusted_label()}</strong>
			<h3>{m.benefit_trusted_title()}</h3>
			<p>{m.benefit_trusted_description()}</p>
		</article>
	</section>

	<section class="product-section" id="product">
		<div class="site-container product-layout">
			<div class="product-copy" use:entrance use:textDecode>
				<h2 data-motion-text>{m.today_title()}</h2>
				<p data-motion-fade>{m.today_description()}</p>
				<ul class="check-list" data-motion-item>
					<li><Check size={18} /> {m.today_detail_guides()}</li>
					<li><Check size={18} /> {m.today_detail_sections()}</li>
					<li><Check size={18} /> {m.today_detail_search()}</li>
					<li><Check size={18} /> {m.today_detail_contact()}</li>
				</ul>
			</div>
			<figure class="app-shot app-shot-main">
				<div class="shot-frame shot-today" use:screenshotReveal={0.08} use:screenshotScroll>
					<img src="/today.png" alt={m.today_image_alt()} />
				</div>
			</figure>
		</div>
	</section>

	<section class="feature-section">
		<div class="site-container">
			<div class="section-heading" use:textDecode>
				<h2 data-motion-text>{m.tools_title()}</h2>
				<p data-motion-fade>{m.tools_description()}</p>
			</div>

			<div class="feature-grid" use:entrance={{ staggerBy: 0.055, variant: 'card', distance: 28 }}>
				<article class="feature-copy-card" data-motion-item>
					<div class="feature-icon"><BookOpen size={22} /></div>
					<h3>{m.tools_guides_title()}</h3>
					<p>{m.tools_guides_description()}</p>
				</article>
				<article class="feature-copy-card" data-motion-item>
					<div class="feature-icon"><CalendarDays size={22} /></div>
					<h3>{m.tools_calendar_title()}</h3>
					<p>{m.tools_calendar_description()}</p>
				</article>
				<article class="feature-copy-card" data-motion-item>
					<div class="feature-icon"><FileText size={22} /></div>
					<h3>{m.tools_files_title()}</h3>
					<p>{m.tools_files_description()}</p>
				</article>
			</div>

			<div class="screenshot-pair">
				<figure class="app-shot" use:entrance>
					<div class="shot-heading">
						<CalendarDays size={20} />
						<h3>{m.calendar_shot_title()}</h3>
					</div>
					<div class="shot-frame shot-calendar" use:screenshotReveal>
						<img src="/calendar.png" alt={m.calendar_image_alt()} />
					</div>
					<figcaption>{m.calendar_shot_caption()}</figcaption>
				</figure>

				<figure class="app-shot" use:entrance={{ delay: 0.06 }}>
					<div class="shot-heading">
						<KeyRound size={20} />
						<h3>{m.login_shot_title()}</h3>
					</div>
					<div class="shot-frame shot-login" use:screenshotReveal={0.06}>
						<img src="/login.png" alt={m.login_image_alt()} />
					</div>
					<figcaption>{m.login_shot_caption()}</figcaption>
				</figure>
			</div>
		</div>
	</section>

	<section class="feature-story" aria-labelledby="feature-story-title">
		<div class="feature-story-sticky">
			<div class="site-container feature-story-heading" use:textDecode>
				<h2 id="feature-story-title" data-motion-text>
					<span>{m.browse_features()}</span>
					<ArrowRight class="feature-story-arrow" aria-hidden="true" />
				</h2>
			</div>

			<!-- svelte-ignore a11y_no_noninteractive_tabindex (scroll region is keyboard-focusable) -->
			<div
				class="feature-story-window"
				role="region"
				aria-label={m.product_features_label()}
				tabindex="0"
			>
				<div class="feature-story-track">
					{#each productFeatures as feature, index}
						{@const Icon = feature.icon}
						<article class={`feature-story-card feature-tone-${feature.tone}`}>
							<div class="feature-story-copy">
								<div class="feature-story-meta">
									<span
										>{String(index + 1).padStart(2, '0')} / {String(
											productFeatures.length
										).padStart(2, '0')}</span
									>
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
							<div class="feature-story-media">
								<img
									src={feature.image}
									alt={m.feature_screenshot_label({ feature: feature.label })}
									loading={index < 2 ? 'eager' : 'lazy'}
									decoding="async"
								/>
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
				<h2 data-motion-text>{m.difference_title()}</h2>
				<p data-motion-fade>{m.difference_description()}</p>
			</div>

			<div class="workflow-grid" use:entrance={{ staggerBy: 0.06, variant: 'card', distance: 28 }}>
				<article class="workflow-step" data-motion-item>
					<strong>{m.difference_start_label()}</strong>
					<h3>{m.difference_start_title()}</h3>
					<p>{m.difference_start_description()}</p>
				</article>
				<article class="workflow-step" data-motion-item>
					<strong>{m.difference_view_label()}</strong>
					<h3>{m.difference_view_title()}</h3>
					<p>{m.difference_view_description()}</p>
				</article>
				<article class="workflow-step" data-motion-item>
					<strong>{m.difference_connected_label()}</strong>
					<h3>{m.difference_connected_title()}</h3>
					<p>{m.difference_connected_description()}</p>
				</article>
			</div>
		</div>
	</section>

	<section class="audience-section" id="roles">
		<div class="audience-panel employee-panel" use:entrance use:textDecode>
			<div data-motion-item><Users size={28} /></div>
			<h2 data-motion-fade>{m.employee_side()}</h2>
			<h3 data-motion-text>{m.employee_title()}</h3>
			<p data-motion-fade>{m.employee_description()}</p>
			<ul class="audience-capabilities" data-motion-item>
				<li>
					<span class="capability-number">01</span>
					<span>
						<strong>{m.employee_shift_title()}</strong>
						<small>{m.employee_shift_description()}</small>
					</span>
				</li>
				<li>
					<span class="capability-number">02</span>
					<span>
						<strong>{m.employee_search_title()}</strong>
						<small>{m.employee_search_description()}</small>
					</span>
				</li>
				<li>
					<span class="capability-number">03</span>
					<span>
						<strong>{m.employee_ask_title()}</strong>
						<small>{m.employee_ask_description()}</small>
					</span>
				</li>
			</ul>
		</div>
		<div class="audience-panel manager-panel" use:entrance={{ delay: 0.07 }} use:textDecode>
			<div data-motion-item><ShieldCheck size={28} /></div>
			<h2 data-motion-fade>{m.manager_side()}</h2>
			<h3 data-motion-text>{m.manager_title()}</h3>
			<p data-motion-fade>{m.manager_description()}</p>
			<ul class="audience-capabilities" data-motion-item>
				<li>
					<span class="capability-number">01</span>
					<span>
						<strong>{m.manager_publish_title()}</strong>
						<small>{m.manager_publish_description()}</small>
					</span>
				</li>
				<li>
					<span class="capability-number">02</span>
					<span>
						<strong>{m.manager_delegate_title()}</strong>
						<small>{m.manager_delegate_description()}</small>
					</span>
				</li>
				<li>
					<span class="capability-number">03</span>
					<span>
						<strong>{m.manager_accountability_title()}</strong>
						<small>{m.manager_accountability_description()}</small>
					</span>
				</li>
			</ul>
		</div>
	</section>

	<section class="principle-section">
		<blockquote data-motion-text use:textDecode>{m.principle_quote()}</blockquote>
	</section>

	<section class="faq-section" id="questions">
		<div class="site-container faq-layout">
			<div class="faq-heading" use:textDecode>
				<h2 data-motion-text>{m.faq_title()}</h2>
				<p data-motion-fade>{m.faq_description()}</p>
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
			<h2 data-motion-text>{m.cta_title()}</h2>
			<p data-motion-fade>{m.cta_description()}</p>
			<a data-motion-item data-slot="button" class="button button-light" href="#product"
				>{m.cta_action()} <ArrowRight data-icon="inline-end" size={18} /></a
			>
		</div>
	</section>
</main>

<SiteFooter />
