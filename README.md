# Workhal landing page

The public-facing landing page for Workhal, built with SvelteKit, Tailwind CSS, and Lucide icons.

## Development

```sh
bun install
bun run dev
```

## Quality checks

```sh
bun run check
bun run build
```

## Contact form delivery

The contact form sends through Resend. Copy `.env.example` to `.env` and set the API key,
recipient address, and a sender address on a verified domain before deploying.

The page content is based on the Workhal product in `../onboarding-site`, including Today, Guides, Calendar, Announcements, Documents, employee access, and manager administration.

# workhal-landing
