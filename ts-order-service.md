# Fixture: ts-order-service (TypeScript)

[panopticon-test-child-b](https://github.com/industrial-curiosity/panopticon-test-child-b)

This fixture represents an incomplete TypeScript order-management service. It exercises owned
REST, Kafka, SQS, S3, and webhook interfaces plus outbound REST consumers whose owners are not
declared in this local repo.

## Purpose

The fixture provides source evidence for these Panopticon cases:

- an owned OpenAPI contract and matching Express order routes;
- an owned Kafka topic and producer;
- an owned SQS queue used in both producer and consumer roles;
- an owned S3 bucket whose objects are written, read, and deleted;
- externally owned inventory, Stripe, and shipping REST APIs;
- Stripe and shipping webhook receivers owned by this repo.

The repository intentionally does not assemble these modules into a running application. There
is no `src/index.ts`, the routes do not call the client/event/queue/storage modules, and the worker
module exports its loop without invoking it.

## Repository structure

```text
panopticon-test-child-b/
├── infra/
│   ├── s3-buckets.yaml
│   ├── services.yaml
│   └── sqs-queues.yaml
├── src/
│   ├── api/
│   │   ├── openapi.yaml
│   │   └── routes/
│   │       ├── orders.ts
│   │       └── webhooks.ts
│   ├── clients/
│   │   ├── inventory.ts
│   │   ├── shipping.ts
│   │   └── stripe.ts
│   ├── events/
│   │   ├── kafka-topics.yaml
│   │   └── producer.ts
│   ├── queue/
│   │   ├── processor.ts
│   │   └── worker.ts
│   └── storage/
│       └── attachments.ts
├── package.json
└── tsconfig.json
```

## Interfaces

### `orders-api`

- **Type:** `rest`
- **Owner:** `panopticon-test-child-b / api`
- **Producer evidence:** `src/api/openapi.yaml`, `src/api/routes/orders.ts`

### `order-events`

- **Type:** `kafka`
- **Owner:** `panopticon-test-child-b / events`
- **Producer evidence:** `src/events/kafka-topics.yaml`, `src/events/producer.ts`

### `order-processing-queue`

- **Type:** `sqs`
- **Owner:** `panopticon-test-child-b / queue`
- **Producer evidence:** `infra/sqs-queues.yaml`, `src/queue/processor.ts`
- **Consumer evidence:** `src/queue/processor.ts`, `src/queue/worker.ts`

### `order-attachments-bucket`

- **Type:** `s3`
- **Owner:** `panopticon-test-child-b / storage`
- **Producer evidence:** `infra/s3-buckets.yaml`
- **Consumer evidence:** `src/storage/attachments.ts`

### `inventory-api`

- **Type:** `rest`
- **Owner:** not declared locally
- **Consumer evidence:** `infra/services.yaml`, `src/clients/inventory.ts`

### `stripe-api`

- **REST object:** externally owned; consumed through `infra/services.yaml` and
  `src/clients/stripe.ts`.
- **Webhook object:** owned by `panopticon-test-child-b / api`; produced through the hinted
  `POST /stripe` route in `src/api/routes/webhooks.ts`.

### `shipping-api`

- **REST object:** externally owned; consumed through `infra/services.yaml` and
  `src/clients/shipping.ts`.
- **Webhook object:** owned by `panopticon-test-child-b / api`; produced through the hinted
  `POST /shipping` route in `src/api/routes/webhooks.ts`.

## Expected local index

`panopticon/index.json` contains one object per canonical name and type. Its local producer and
consumer records mention only `panopticon-test-child-b`, and it contains no compiled-index
conflicts. `docs/interfaces.md` is rendered deterministically from that file.
