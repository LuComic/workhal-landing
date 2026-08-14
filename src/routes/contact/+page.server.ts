import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const allowedIntents = new Set(['question', 'demo', 'setup']);

function readField(data: FormData, key: string, maxLength: number) {
	return String(data.get(key) ?? '')
		.trim()
		.slice(0, maxLength);
}

function escapeHtml(value: string) {
	return value.replace(
		/[&<>'"]/g,
		(character) =>
			({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character] ??
			character
	);
}

export const actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();
		const website = readField(data, 'website', 200);

		if (website) {
			return { success: true };
		}

		const rawIntent = readField(data, 'intent', 20);
		const values = {
			intent: allowedIntents.has(rawIntent) ? rawIntent : 'question',
			name: readField(data, 'name', 100),
			email: readField(data, 'email', 254),
			organization: readField(data, 'organization', 120),
			message: readField(data, 'message', 3000)
		};
		const errors = {
			name: values.name.length < 2,
			email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
			message: values.message.length < 10
		};

		if (errors.name || errors.email || errors.message) {
			return fail(400, { values, errors, errorCode: 'validation' });
		}

		if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
			return fail(503, { values, errorCode: 'unavailable' });
		}

		const intentLabels: Record<string, string> = {
			question: 'Question',
			demo: 'Workhal demo',
			setup: 'On-site setup help'
		};
		const subject = `[Workhal contact] ${intentLabels[values.intent]} from ${values.name}`;
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: env.CONTACT_FROM_EMAIL ?? 'Workhal website <onboarding@resend.dev>',
				to: [env.CONTACT_TO_EMAIL],
				reply_to: values.email,
				subject,
				text: [
					`Reason: ${intentLabels[values.intent]}`,
					`Name: ${values.name}`,
					`Email: ${values.email}`,
					`Workplace: ${values.organization || 'Not provided'}`,
					`Page: ${url.href}`,
					'',
					values.message
				].join('\n'),
				html: `<h2>New Workhal message</h2>
					<p><strong>Reason:</strong> ${escapeHtml(intentLabels[values.intent])}</p>
					<p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
					<p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
					<p><strong>Workplace:</strong> ${escapeHtml(values.organization || 'Not provided')}</p>
					<hr>
					<p>${escapeHtml(values.message).replace(/\n/g, '<br>')}</p>`
			})
		});

		if (!response.ok) {
			return fail(503, { values, errorCode: 'unavailable' });
		}

		return { success: true };
	}
} satisfies Actions;
