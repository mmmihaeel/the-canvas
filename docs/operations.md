# Operations

## Runtime Matrix

| Concern | Tooling | Owner in codebase | Failure impact |
| --- | --- | --- | --- |
| Web application runtime | Next.js 14 + Node.js | `package.json`, `src/app/**` | UI unavailable |
| API composition | Hono | `src/app/api/[[...route]]/**` | Editor persistence and integrations unavailable |
| Persistence | Neon / PostgreSQL + Drizzle | `src/db/**` | Auth, projects, and billing state unavailable |
| Authentication | NextAuth | `src/auth.ts`, `src/auth.config.ts` | Sign-in and protected routes unavailable |
| Uploads | UploadThing | `src/app/api/uploadthing/**` | User media ingestion blocked |
| Billing | Stripe | `src/lib/stripe.ts`, subscriptions API | Checkout and entitlement sync unavailable |
| Media generation | Replicate | `src/lib/replicate.ts`, `ai.ts` | Prompt-based generation and background removal unavailable |
| Media discovery | Unsplash | `src/lib/unsplash.ts`, `images.ts` | Curated image browsing unavailable |

## Environment Variables

| Variable | Required | Sensitivity | Used by | Purpose |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | Yes | Public | Next.js metadata, redirects, Hono client, remote image allowlist | Canonical application origin |
| `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` | Yes | Public app key | Unsplash integration | Random image sourcing |
| `UPLOADTHING_SECRET` | Yes | Secret | UploadThing | Server-side upload authentication |
| `UPLOADTHING_APP_ID` | Yes | Internal app identifier | UploadThing | Route handler configuration |
| `REPLICATE_API_TOKEN` | Yes | Secret | Replicate integration | Image generation and background removal |
| `AUTH_GITHUB_ID` | If GitHub auth enabled | Semi-sensitive | NextAuth provider | OAuth client ID |
| `AUTH_GITHUB_SECRET` | If GitHub auth enabled | Secret | NextAuth provider | OAuth client secret |
| `AUTH_GOOGLE_ID` | If Google auth enabled | Semi-sensitive | NextAuth provider | OAuth client ID |
| `AUTH_GOOGLE_SECRET` | If Google auth enabled | Secret | NextAuth provider | OAuth client secret |
| `AUTH_SECRET` | Yes | Secret | NextAuth | Session signing and token protection |
| `STRIPE_SECRET_KEY` | If billing enabled | Secret | Stripe SDK | Checkout, billing portal, webhook follow-up calls |
| `STRIPE_PRICE_ID` | If billing enabled | Internal identifier | Subscriptions route | Checkout line item configuration |
| `STRIPE_WEBHOOK_SECRET` | If billing enabled | Secret | Stripe webhook endpoint | Authenticity verification |
| `DATABASE_URL` | Yes | Secret | Drizzle / Neon | Primary application database connection |

## Local Development Workflow

1. Install dependencies with `npm install`.
2. Copy `.env.example` into a local environment file and populate service credentials.
3. Run `npm run dev`.
4. If database schema changes are introduced, generate and apply migrations with:

```bash
npm run db:generate
npm run db:migrate
```

5. Use `npm run lint` before publishing changes.

## Deployment Checklist

| Step | Why it matters | Done when |
| --- | --- | --- |
| Populate all required environment variables | Prevents runtime boot failures and broken integrations | Application starts and protected flows complete |
| Provision PostgreSQL and apply migrations | Required for auth, projects, and subscription state | Tables exist and CRUD succeeds |
| Configure OAuth redirect URIs | Prevents failed third-party sign-in | GitHub and Google callbacks return to the app origin |
| Register Stripe webhook endpoint | Keeps subscription state synchronized | Checkout completion creates or updates subscription rows |
| Verify UploadThing, Replicate, and Unsplash credentials | Prevents editor-side media failures | Uploads, prompt generation, and gallery fetches succeed |
| Validate `NEXT_PUBLIC_APP_URL` against the deployed domain | Avoids broken redirects and remote image loading | Hosted URLs and billing flows resolve correctly |
| Run a smoke test on auth, editor save, uploads, and billing | Confirms end-to-end behavior | Critical product paths are operational |

## Release Checklist

| Step | Command or action |
| --- | --- |
| Review repository state | `git status --short --branch` |
| Commit scoped changes | `git commit -m "<message>"` |
| Push branch | `git push origin main` |
| Publish release | `gh release create <tag>` or `gh release edit <tag>` |
| Verify repository metadata | `gh repo view --json description,repositoryTopics` |

## Operational Guardrails

- Keep `.env` files local and rotate credentials if they are ever exposed.
- Treat `NEXT_PUBLIC_*` variables as public by design.
- Use production HTTPS for all hosted environments.
- Terminate requests behind a platform or edge layer that can provide rate limiting and security headers.
- Review third-party quotas, especially for Replicate, UploadThing, Unsplash, and Stripe.

## Recommended Observability Baseline

| Signal | Recommendation |
| --- | --- |
| Authentication failures | Track sign-in error rates and provider callback failures |
| Project persistence | Monitor non-2xx responses from `PATCH /api/projects/:id` |
| Billing | Log webhook verification failures and checkout completion latency |
| Media pipeline | Monitor UploadThing failures and Replicate request error rate |
| Database | Watch connection errors and slow project queries |
