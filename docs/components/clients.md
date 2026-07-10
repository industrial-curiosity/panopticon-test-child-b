# clients

## Responsibility

Owns outbound REST integration code for three external services: an inventory service, Stripe,
and a shipping provider. Each file exports plain async functions wrapping `fetch` (inventory,
shipping) or the `stripe` SDK (payments) — there is no shared HTTP client, retry logic, or base
class among them. Out of scope: nothing in this repo currently calls any function in this
directory (no route handler or worker wires these in).

## Interfaces

Not present in the local interface index. Each client points at (consumes) an external service,
but no config file declares those services for a deterministic parser or LLM-fallback pass to
extract from — only the `.ts` client code itself references them, via environment-variable base
URLs.

## Key modules

- `src/clients/inventory.ts` — `checkInventory`, `reserveInventory`, `releaseInventory` against
  `${INVENTORY_API_URL}/inventory/...`.
- `src/clients/stripe.ts` — `createPaymentIntent`, `confirmPayment`, `refundPayment` via the
  `stripe` npm SDK (`apiVersion: '2023-10-16'`).
- `src/clients/shipping.ts` — `getQuotes`, `createShipment`, `trackShipment` against
  `${SHIPPING_API_URL}/...`.

## Configuration

- `INVENTORY_API_URL` — required (non-null-asserted); inventory service base URL.
- `STRIPE_SECRET_KEY` — required; Stripe secret API key.
- `SHIPPING_API_URL` — required (non-null-asserted); shipping provider base URL.

## Failure modes

`inventory.ts` and `shipping.ts` throw an `Error` with the HTTP status on any non-OK response
(e.g. `Inventory check failed: 500`); callers must catch these explicitly since none of these
functions retry or degrade gracefully. `stripe.ts` has no explicit error handling and surfaces
whatever the `stripe` SDK throws directly (typically a `Stripe.errors.StripeError` subtype).
