# PrimeServers

Production-ready Next.js storefront for legitimate gaming performance/configuration packages, with a signed external Stripe Checkout bridge back to CheatMarket.

## Included

- PrimeServers dark premium homepage
- VIP Starter / VIP Pro / VIP Elite packages
- Terms, Privacy, Refund and Contact pages
- SEO metadata, robots and sitemap
- `/checkout?handoff=...` HMAC validation
- Server-side Stripe Checkout creation
- Stripe webhook signature verification
- Signed server-to-server payment callback to CheatMarket
- Product allowlist and return/callback host validation
- No database required for this PrimeServers MVP
- Vercel-ready

## Install

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local`.

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CHEATMARKET_BRIDGE_SECRET=...
PRIMESERVERS_ALLOWED_PRODUCTS=vip-starter,vip-pro,vip-elite
PRIMESERVERS_ALLOWED_RETURN_HOSTS=cheatmarket.cc
PRIMESERVERS_ALLOWED_EVENT_HOSTS=cheatmarket.cc
NEXT_PUBLIC_SITE_URL=https://primeservers.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@primeservers.com
```

Generate a bridge secret:

```bash
npm run secret
```

Use the exact same secret in PrimeServers and in Cheatmaster.

## Stripe webhook

Create:

```text
https://primeservers.com/api/stripe/webhook
```

Subscribe to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `checkout.session.expired`

Save the generated `whsec_...` as `STRIPE_WEBHOOK_SECRET`.

## CheatMarket

Run:

```text
Cheatmaster → Update DB → Stripe external checkout bridge
```

Then:

```text
Cheatmaster → Integrations → Payments → External Stripe checkout bridge
```

Set:

```text
External Checkout URL:
https://primeservers.com/checkout
```

Use the same shared signing secret.

Only add real PrimeServers/configuration SKUs to the bridge allowlist, for example:

```text
vip-starter
vip-pro
vip-elite
```

Start in Sandbox.

## Security model

CheatMarket sends:

```text
https://primeservers.com/checkout?handoff=v1.<payload>.<signature>
```

PrimeServers verifies:

- HMAC-SHA256
- issuer and audience
- expiration
- UUID order id
- email
- USD amount
- product allowlist
- exact callback route
- allowed callback/return host

PrimeServers then creates Stripe Checkout server-side.

The browser never chooses the payment amount and the success redirect is never treated as proof of payment.

Stripe webhook events are verified with `STRIPE_WEBHOOK_SECRET`, then PrimeServers signs a compact callback with `CHEATMARKET_BRIDGE_SECRET` before sending it to CheatMarket.

CheatMarket independently verifies the order reference, amount and currency before fulfillment.

## Vercel

1. Push this folder to GitHub.
2. Import it into Vercel.
3. Add all `.env.example` variables in Vercel Project Settings.
4. Deploy.
5. Configure the production Stripe webhook.
6. Put the production `/checkout` URL in Cheatmaster.
7. Test end-to-end in Sandbox before switching Live.
