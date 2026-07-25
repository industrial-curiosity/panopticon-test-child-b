# clients

## Responsibility

The clients component calls inventory, payment, and shipping services for order-related work. It does not own the remote APIs it uses.

## Interfaces

This component consumes `inventory-api`, `stripe-payments`, and `shipping-provider-api`. Their indexed ownership and source evidence are in [interfaces.md](../interfaces.md).

## Key modules

- `src/clients/inventory.ts` — checks, reserves, and releases inventory.
- `src/clients/stripe.ts` — creates, confirms, and refunds Stripe payment objects.
- `src/clients/shipping.ts` — gets quotes, creates shipments, and tracks shipments.

## Configuration

`INVENTORY_API_URL`, `STRIPE_SECRET_KEY`, and `SHIPPING_API_URL` are required by the respective client modules.

## Failure modes

Inventory and shipping functions throw when HTTP responses are unsuccessful. Stripe client calls surface SDK errors. Missing environment variables prevent valid remote client construction or requests.
