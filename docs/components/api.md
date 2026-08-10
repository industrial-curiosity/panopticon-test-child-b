# api

## Responsibility

Express HTTP surface of this repo: the REST order endpoints and the webhook receivers. It
produces the `orders-api` REST interface (routes + OpenAPI contract) and consumes
`stripe-webhooks` and `shipping-webhooks` by receiving POSTs from Stripe and the shipping
provider. Deliberately out of scope: order job processing (worker), attachments (storage).

## Interfaces

- `orders-api` (rest) — **produced**, owned by this repo (api component).
- `stripe-webhooks` (webhook) — consumed; receives Stripe webhook events.
- `shipping-webhooks` (webhook) — consumed; receives shipping-provider webhook events.

See [interfaces.md](../interfaces.md).

## Key modules

- `src/api/openapi.yaml` — OpenAPI 3.0.3 contract for `orders-api` (order list/create/get/update/
  cancel).
- `src/api/routes/orders.ts` — Express router implementing the `orders-api` endpoints.
- `src/api/routes/webhooks.ts` — Express router with `/stripe` and `/shipping` webhook receivers.

## Configuration

The route modules read no configuration; there is no bootstrap that mounts this router or sets
Express options.

## Failure modes

- `orders-api` endpoints unavailable → order management operations fail for callers.
- Webhook receivers unavailable → Stripe and shipping events are not received; the modules
  contain no retry or acknowledgement logic.
