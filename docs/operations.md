# panopticon-test-child-b — operations

## Running locally

Install Node.js and npm, then install dependencies:

```bash
npm install
```

The repository cannot currently run as a complete service. `npm run dev` targets the absent
`src/index.ts`, `npm start` targets the corresponding absent `dist/index.js`, and
`src/queue/worker.ts` exports `runWorker` without invoking it when `npm run worker` loads the file.
The individual modules can be imported by another TypeScript program after the required
environment variables are configured.

## Testing

No test files, test framework, or `npm test` script are present. TypeScript compilation is the
only configured local verification:

```bash
npm run build
```

A successful command must exit with status 0 and emit compiled files under `dist/`.

## Deployment

No deployment pipeline, container definition, infrastructure deployment command, environment
promotion process, approval policy, or rollback procedure is present in this repository. The
files under `infra/` declare service URLs, an SQS queue, and an S3 bucket, but no included tool
applies those declarations.

## Required configuration

- `INVENTORY_API_URL` — required by `src/clients/inventory.ts`.
- `STRIPE_SECRET_KEY` — required by `src/clients/stripe.ts`.
- `SHIPPING_API_URL` — required by `src/clients/shipping.ts`.
- `ORDER_PROCESSING_QUEUE_URL` — required by `src/queue/processor.ts`.
- `ORDER_ATTACHMENTS_BUCKET` — required by `src/storage/attachments.ts`.
- `KAFKA_BROKERS` — optional; defaults to `localhost:9092`.
- `AWS_REGION` — optional; defaults to `us-east-1` for SQS and S3 clients.

The repository does not define how these values or the Stripe secret are supplied in any
environment.

## Observability

The worker writes startup, action, and per-job failure messages to standard output or standard
error when `runWorker` is invoked. The other modules define no application logging. No metrics,
tracing, dashboards, health checks, or alert definitions are present, so failures otherwise
surface only as rejected promises or process errors to the calling application.
