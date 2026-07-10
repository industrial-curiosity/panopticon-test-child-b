# ts-order-service

TypeScript order management service. Handles order creation, fulfillment, and lifecycle management, integrating with inventory, payments, and shipping providers.

## Repository structure

```text
src/
├── api/
│   ├── openapi.yaml              # REST API spec
│   └── routes/
│       ├── orders.ts
│       └── webhooks.ts
├── clients/
│   ├── inventory.ts              # inventory service client
│   ├── stripe.ts                 # Stripe payments client
│   └── shipping.ts               # shipping provider client
├── events/
│   ├── kafka-topics.yaml         # Kafka topic declarations
│   └── producer.ts
├── queue/
│   ├── processor.ts              # SQS producer + consumer
│   └── worker.ts
└── storage/
    └── attachments.ts            # S3 order attachments
```

## Setup

```bash
npm install
```

## Environment variables

| Variable | Description |
|---|---|
| `INVENTORY_API_URL` | Base URL for the inventory service |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `SHIPPING_API_URL` | Base URL for the shipping provider |
| `KAFKA_BROKERS` | Comma-separated Kafka broker list (default: `localhost:9092`) |
| `ORDER_PROCESSING_QUEUE_URL` | SQS queue URL for order jobs |
| `ORDER_ATTACHMENTS_BUCKET` | S3 bucket name for order attachments |
| `AWS_REGION` | AWS region for SQS + S3 (default: `us-east-1`) |

## Build and run

```bash
npm run build   # compile TypeScript → dist/
npm run dev     # run with ts-node (no compile step)
npm run worker  # start the SQS long-poll worker
```

## API

Full spec in `src/api/openapi.yaml`. Key endpoints:

| Method | Path | Description |
|---|---|---|
| `GET` | `/orders` | List orders (filterable by status) |
| `POST` | `/orders` | Create order |
| `GET` | `/orders/:id` | Get order |
| `PATCH` | `/orders/:id` | Update order |
| `POST` | `/orders/:id/cancel` | Cancel order |
