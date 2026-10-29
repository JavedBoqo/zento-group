This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables

Create a `.env.local` file in the project root (this file is gitignored). Required variables:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 site key (client-side) |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v3 secret key (server-only, never expose to the client) |
| `RESEND_API_KEY` | Resend API key used by the contact and careers APIs (server-only) |
| `MAIL_FROM` | Sender email address on a verified Resend domain |
| `MAIL_TO` | Admin email address receiving contact enquiries and job applications |

Both APIs use the shared `sendEmail` helper in `app/lib/email.ts`. Careers notifications include the applicant's details and an optional CV attachment (PDF, DOC or DOCX, up to 5MB). Missing mail configuration or a failed Resend request returns an error instead of acknowledging an unsent application. Careers reCAPTCHA verification is enforced when `RECAPTCHA_SECRET_KEY` is configured; set the public site key alongside it.

Register keys at [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) and choose **reCAPTCHA v3**.

For production, add the same variables in your hosting provider's environment settings (e.g. Vercel project settings).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Admin panel

See [ADMIN.md](./ADMIN.md) for setup, migration, privacy controls, routes, and verification commands.
