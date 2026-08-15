<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { ArrowRight, Check, MapPin, Send } from '@lucide/svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { entrance, textDecode } from '$lib/motion';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime.js';
	import { tick } from 'svelte';

	type ContactForm = {
		success?: boolean;
		intent?: string;
		values?: {
			intent: string;
			name: string;
			email: string;
			organization: string;
			message: string;
		};
		errors?: { name?: boolean; email?: boolean; message?: boolean };
		errorCode?: string;
	} | null;

	let { form }: { form: ContactForm } = $props();
	let intent = $state(form?.values?.intent ?? form?.intent ?? 'question');
	let submitting = $state(false);
	const isWaitlist = $derived(intent === 'waitlist');

	const locale = getLocale();
	const canonicalUrl = $derived(new URL(page.url.pathname, page.url.origin).href);
	const estonianUrl = $derived(
		new URL(localizeHref('/contact', { locale: 'et' }), page.url.origin).href
	);
	const englishUrl = $derived(
		new URL(localizeHref('/contact', { locale: 'en' }), page.url.origin).href
	);
	const contactHref = localizeHref('/contact', { locale });
	const privacyHref = localizeHref('/privacy', { locale });

	const intentions = [
		{
			value: 'question',
			title: m.contact_intent_question_title(),
			description: m.contact_intent_question_description()
		},
		{
			value: 'demo',
			title: m.contact_intent_demo_title(),
			description: m.contact_intent_demo_description()
		},
		{
			value: 'setup',
			title: m.contact_intent_setup_title(),
			description: m.contact_intent_setup_description()
		},
		{
			value: 'waitlist',
			title: m.contact_intent_waitlist_title(),
			description: m.contact_intent_waitlist_description()
		}
	];

	function selectSetup() {
		intent = 'setup';
	}
</script>

<svelte:head>
	<title>{m.contact_page_title()}</title>
	<meta name="description" content={m.contact_page_description()} />
	<meta name="theme-color" content="#00877f" />
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="et" href={estonianUrl} />
	<link rel="alternate" hreflang="en" href={englishUrl} />
	<link rel="alternate" hreflang="x-default" href={estonianUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="Workhal" />
	<meta property="og:title" content={m.contact_page_title()} />
	<meta property="og:description" content={m.contact_page_description()} />
</svelte:head>

<SiteHeader />

<main id="top" class="inner-page">
	<section class="contact-hero">
		<div class="site-container contact-hero-grid">
			<div class="contact-intro" use:textDecode>
				<h1 data-motion-text>
					<span>{m.contact_title_line_one()}</span>
					<span>{m.contact_title_line_two()}</span>
				</h1>
				<p data-motion-fade>{m.contact_intro()}</p>
			</div>

			<div class="contact-form-panel" id="contact-form" use:entrance={{ delay: 0.08 }}>
				{#if form?.success}
					<div class="form-success" role="status" tabindex="-1">
						<div class="form-success-icon"><Check size={30} /></div>
						<h2>{isWaitlist ? m.contact_waitlist_success_title() : m.contact_success_title()}</h2>
						<p>
							{isWaitlist
								? m.contact_waitlist_success_description()
								: m.contact_success_description()}
						</p>
						<a data-slot="button" class="button button-outline" href={contactHref}
							>{m.contact_success_action()}</a
						>
					</div>
				{:else}
					<div class="contact-form-heading">
						<h2>{m.contact_form_title()}</h2>
						<p>{m.contact_form_description()}</p>
					</div>

					{#if form?.errorCode}
						<div class="form-error-summary" role="alert" tabindex="-1">
							{form.errorCode === 'unavailable'
								? m.contact_error_unavailable()
								: m.contact_error_summary()}
						</div>
					{/if}

					<form
						method="POST"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update();
								submitting = false;
								await tick();
								document.querySelector<HTMLElement>('.form-error-summary, .form-success')?.focus();
							};
						}}
					>
						<fieldset class="intent-fieldset">
							<legend>{m.contact_intent_legend()}</legend>
							<div class="intent-options">
								{#each intentions as option}
									<label class:checked={intent === option.value} class="intent-option">
										<input type="radio" name="intent" value={option.value} bind:group={intent} />
										<span class="intent-check" aria-hidden="true"><Check size={14} /></span>
										<span>
											<strong>{option.title}</strong>
											<small>{option.description}</small>
										</span>
									</label>
								{/each}
							</div>
						</fieldset>

						{#if !isWaitlist}
							<div class:error={form?.errors?.name} class="form-field">
								<label for="name"
									>{m.contact_name_label()} <span>({m.contact_required()})</span></label
								>
								{#if form?.errors?.name}<p class="field-error" id="name-error">
										{m.contact_error_name()}
									</p>{/if}
								<input
									id="name"
									name="name"
									type="text"
									autocomplete="name"
									value={form?.values?.name ?? ''}
									aria-describedby={form?.errors?.name ? 'name-error' : undefined}
									aria-invalid={form?.errors?.name ? 'true' : undefined}
									required
								/>
							</div>
						{/if}

						<div class:error={form?.errors?.email} class="form-field">
							<label for="email"
								>{m.contact_email_label()} <span>({m.contact_required()})</span></label
							>
							{#if form?.errors?.email}<p class="field-error" id="email-error">
									{m.contact_error_email()}
								</p>{/if}
							<input
								id="email"
								name="email"
								type="email"
								inputmode="email"
								autocomplete="email"
								autocapitalize="none"
								spellcheck="false"
								value={form?.values?.email ?? ''}
								aria-describedby={form?.errors?.email ? 'email-error' : undefined}
								aria-invalid={form?.errors?.email ? 'true' : undefined}
								required
							/>
						</div>

						{#if intent === 'demo' || intent === 'setup'}
							<div class="form-field">
								<label for="organization"
									>{m.contact_company_label()} <span>({m.contact_optional()})</span></label
								>
								<p class="field-hint" id="organization-hint">{m.contact_company_hint()}</p>
								<input
									id="organization"
									name="organization"
									type="text"
									autocomplete="organization"
									value={form?.values?.organization ?? ''}
									aria-describedby="organization-hint"
								/>
							</div>
						{/if}

						{#if !isWaitlist}
							<div class:error={form?.errors?.message} class="form-field">
								<label for="message"
									>{m.contact_message_label()} <span>({m.contact_required()})</span></label
								>
								<p class="field-hint" id="message-hint">{m.contact_message_hint()}</p>
								{#if form?.errors?.message}<p class="field-error" id="message-error">
										{m.contact_error_message()}
									</p>{/if}
								<textarea
									id="message"
									name="message"
									rows="6"
									aria-describedby={`message-hint${form?.errors?.message ? ' message-error' : ''}`}
									aria-invalid={form?.errors?.message ? 'true' : undefined}
									required>{form?.values?.message ?? ''}</textarea
								>
							</div>
						{/if}

						<div class="website-field" aria-hidden="true">
							<label for="website">Website</label>
							<input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
						</div>

						<div class="form-submit-row">
							<button
								data-slot="button"
								class="button button-primary"
								type="submit"
								disabled={submitting}
								aria-busy={submitting}
							>
								{submitting
									? m.contact_sending()
									: isWaitlist
										? m.contact_waitlist_submit()
										: m.contact_submit()}
								<Send data-icon="inline-end" size={17} />
							</button>
							<p>
								{isWaitlist ? m.contact_waitlist_privacy() : m.contact_privacy()}
								<a href={privacyHref}>{m.contact_privacy_link()}</a>
							</p>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<section class="business-help-section">
		<div class="site-container business-help-grid">
			<div class="business-help-intro" use:textDecode>
				<div class="business-pin" data-motion-fade><MapPin size={25} /></div>
				<h2 data-motion-text>{m.contact_business_title()}</h2>
				<p data-motion-fade>{m.contact_business_description()}</p>
			</div>

			<div class="business-help-steps" use:entrance={{ staggerBy: 0.08, variant: 'card' }}>
				<article data-motion-item>
					<span>01</span>
					<div>
						<h3>{m.contact_business_step_one_title()}</h3>
						<p>{m.contact_business_step_one_description()}</p>
					</div>
				</article>
				<article data-motion-item>
					<span>02</span>
					<div>
						<h3>{m.contact_business_step_two_title()}</h3>
						<p>{m.contact_business_step_two_description()}</p>
					</div>
				</article>
				<article data-motion-item>
					<span>03</span>
					<div>
						<h3>{m.contact_business_step_three_title()}</h3>
						<p>{m.contact_business_step_three_description()}</p>
					</div>
				</article>
				<a
					data-slot="button"
					class="button button-primary business-help-action"
					href="#contact-form"
					onclick={selectSetup}
				>
					{m.contact_business_action()}
					<ArrowRight data-icon="inline-end" size={18} />
				</a>
			</div>
		</div>
	</section>
</main>

<SiteFooter />
