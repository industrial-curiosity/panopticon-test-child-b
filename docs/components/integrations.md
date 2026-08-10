# integrations

## Responsibility

Client modules for the external services this repo depends on: inventory, shipping, and Stripe.
Consumes the `inventory-api`, `shipping-api`, and `stripe-api` REST interfaces.

## Interfaces

- `inventory-api` (rest) — consumed; stock checks and reservations.
- `shipping-api` (rest) — consumed; quotes, shipments, tracking.
- `stripe-api` (rest) — consumed; payment intents and refunds.

See [interfaces.md](../interfaces.md).

## Key modules

- `src/clients/inventory.ts` — `checkInventory`, `reserveInventory`, `releaseInventory` via
  `INVENTORY_API_URL`.
- `src/clients/shipping.ts` — `getQuotes`, `createShipment`, `trackShipment` via
  `SHIPPING_API_URL`.
- `src/clients/stripe.ts` — Stripe SDK client: `createPaymentIntent`, `confirmPayment`,
  `refundPayment`.
- `infra/services.yaml` — base-URL configuration for the inventory, stripe, and shipping
  services.

## Configuration

- `INVENTORY_API_URL` (required) — inventory service base URL.
- `SHIPPING_API_URL` (required) — shipping service base URL.
- `STRIPE_SECRET_KEY` (required, secret) — Stripe API key.

## Failure modes

- `inventory-api` unavailable → stock checks and reservations fail.
- `shipping-api` unavailable → quotes, shipment creation, and tracking fail.
- `stripe-api` unavailable or key invalid → payment intents, confirmations, and refunds fail.
