# clients

## Responsibility

The clients component provides outbound functions for inventory checks and reservations, Stripe
payment actions, and shipping quotes, creation, and tracking. It does not coordinate these calls
into an order workflow, and no current module imports the client functions.

## Interfaces

- Consumes `inventory-api` (`rest`) through the inventory HTTP client.
- Consumes `stripe-api` (`rest`) through the Stripe SDK.
- Consumes `shipping-api` (`rest`) through the shipping HTTP client.

All three interfaces have unknown or externally managed owners in the local index. See
[interfaces.md](../interfaces.md).

## Key modules

- `src/clients/inventory.ts` — checks, reserves, and releases inventory with `fetch`.
- `src/clients/stripe.ts` — creates and confirms payment intents and creates refunds with the
  Stripe SDK.
- `src/clients/shipping.ts` — requests quotes, creates shipments, and tracks shipments with
  `fetch`.

## Configuration

- `INVENTORY_API_URL` — required inventory service base URL.
- `STRIPE_SECRET_KEY` — required Stripe API secret.
- `SHIPPING_API_URL` — required shipping provider base URL.

The source uses non-null assertions and performs no explicit startup validation.

## Failure modes

The inventory and shipping clients throw an `Error` containing the HTTP status for non-successful
responses; network errors propagate from `fetch`. Stripe SDK failures propagate unchanged. None
of the clients implement retries, timeouts, logging, or fallback behavior, so callers own all
recovery and observability.
