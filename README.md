# The Canvas

The Canvas is a full-stack design editor built by [Mykhailo Yarytskiy](https://github.com/mmmihaeel). It combines authentication, template-driven workflows, project management, image uploads, prompt-based image creation, automated background cleanup, and subscription billing in a single Next.js application.

## Highlights

- Credential, GitHub, and Google authentication flows with NextAuth.
- Project dashboard with recent files, duplication, deletion, and template-based creation.
- Fabric.js-powered editor for text, shapes, drawing, images, filters, and layout adjustments.
- UploadThing, Unsplash, and Replicate integrations for media workflows.
- Stripe-powered paid plan flow for premium capabilities.
- Hono API layer with Drizzle ORM and Neon/PostgreSQL persistence.

## Stack

- Next.js 14
- TypeScript
- React
- Tailwind CSS
- Hono
- Drizzle ORM
- NextAuth
- Fabric.js
- Stripe
- UploadThing

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template and fill in your own credentials:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Environment Variables

The repository ships with `.env.example` only. Configure your own values for:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY`
- `UPLOADTHING_SECRET`
- `UPLOADTHING_APP_ID`
- `REPLICATE_API_TOKEN`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `AUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`
- `DATABASE_URL`

Do not commit populated `.env` files or production credentials.

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates the production build.
- `npm run start` runs the production server.
- `npm run lint` runs ESLint.
- `npm run db:generate` generates Drizzle migrations.
- `npm run db:migrate` runs Drizzle migrations.
- `npm run db:studio` opens Drizzle Studio.

## Project Structure

- `src/app` contains the App Router entrypoints and route groups.
- `src/features` contains domain-specific UI, hooks, and data logic.
- `src/app/api` contains the Hono-backed API surface.
- `src/db` contains the database client and schema definitions.
- `public` contains static assets and starter templates.

## Publication Notes

- Secrets are intentionally excluded from version control.
- The repository is prepared for portfolio presentation and public sharing.
- Replace external service credentials with your own before running builds or deployments.
