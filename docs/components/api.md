# api

## Responsibility

The API component defines the order-management HTTP contract and Express route handlers for
listing, creating, retrieving, updating, and cancelling orders. It also defines Stripe and
shipping webhook receivers.

The handlers are stubs: they do not validate against the OpenAPI schema, persist data, process
webhook payloads, or call any other component in this repository.

## Interfaces

- Owns and produces `orders-api` (`rest`) through the OpenAPI contract and order routes.
- Owns and produces `stripe-api` (`webhook`) through `POST /stripe`.
- Owns and produces `shipping-api` (`webhook`) through `POST /shipping`.

See [interfaces.md](../interfaces.md) for source evidence and ownership.

## Key modules

- `src/api/openapi.yaml` — defines the OpenAPI 3.0 order schemas and `/orders` operations.
- `src/api/routes/orders.ts` — implements Express handlers returning stub order responses.
- `src/api/routes/webhooks.ts` — acknowledges Stripe and shipping callbacks with
  `{ received: true }`.

## Configuration

This component reads no environment variables, configuration files, or flags. The repository
does not include an Express application that mounts the routers.

## Failure modes

The current handlers have no explicit error handling. Express would surface thrown handler
errors, but no application-level middleware is present here. Requests are not validated or
persisted, and webhook payloads are acknowledged without processing. The absent `src/index.ts`
also prevents the configured development and start commands from serving these routes.
