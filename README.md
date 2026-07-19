# ts-order-service

[panopticon-test-child-b architecture](docs/architecture.md)
[org architecture](https://github.com/industrial-curiosity/panopticon-test/blob/main/docs/architecture.md#panopticon-test-child-b)

TypeScript order-management fixture containing an HTTP contract and route stubs, external-service
clients, Kafka publishing, SQS processing, and S3 attachment helpers.

## Repository structure

```text
src/
├── api/
│   ├── openapi.yaml
│   └── routes/
│       ├── orders.ts
│       └── webhooks.ts
├── clients/
│   ├── inventory.ts
│   ├── stripe.ts
│   └── shipping.ts
├── events/
│   ├── kafka-topics.yaml
│   └── producer.ts
├── queue/
│   ├── processor.ts
│   └── worker.ts
└── storage/
    └── attachments.ts
```

## Setup

```bash
npm install
```

## Environment variables

| Variable | Requirement | Description |
| --- | --- | --- |
| `INVENTORY_API_URL` | Required | Inventory service base URL |
| `STRIPE_SECRET_KEY` | Required | Stripe API secret |
| `SHIPPING_API_URL` | Required | Shipping provider base URL |
| `ORDER_PROCESSING_QUEUE_URL` | Required | SQS queue URL for order jobs |
| `ORDER_ATTACHMENTS_BUCKET` | Required | S3 bucket name for order attachments |
| `KAFKA_BROKERS` | Optional | Comma-separated brokers; defaults to `localhost:9092` |
| `AWS_REGION` | Optional | SQS and S3 region; defaults to `us-east-1` |

## Build and run

Compile the TypeScript sources with:

```bash
npm run build
```

The repository does not currently provide a runnable application entry point. `npm run dev` and
`npm start` target absent `src/index.ts` and `dist/index.js` files. `npm run worker` loads
`src/queue/worker.ts`, but that module exports `runWorker` without invoking it.

## API

The OpenAPI contract is in `src/api/openapi.yaml`.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/orders` | List orders, optionally filtered by status |
| `POST` | `/orders` | Create an order |
| `GET` | `/orders/{id}` | Get an order |
| `PATCH` | `/orders/{id}` | Update an order |
| `POST` | `/orders/{id}/cancel` | Cancel an order |

The Express route implementations return stub responses and are not mounted by an application in
this repository.
