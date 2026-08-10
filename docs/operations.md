# panopticon-test-child-b — operations

<!-- panopticon-analysis-scope:start -->
## Panopticon analysis scope

Panopticon excludes illustrative material from interface, dependency, and doc-drift analysis.

### Excluded directories currently in this repository

- None currently detected.

Directories whose exact path component is one of `examples`, `samples`, `fixtures`, `testdata`, `demos`, `scaffolding`, `demo`, `scaffold` are excluded case-insensitively.
Similar production paths, such as `src/sample-service`, remain in scope.

Use `panopticon-ignore file` in one of a file's first five nonblank lines to exclude the whole file. Use `panopticon-ignore declaration` on a declaration line or the line immediately before it to exclude only that declaration.
<!-- panopticon-analysis-scope:end -->

## Running locally

The repository has no application bootstrap that wires the modules together; the `package.json`
scripts compile and run the pieces that are standalone:

```bash
npm run build   # compile TypeScript → dist/
npm run dev     # run with ts-node (no compile step)
npm run worker  # start the SQS long-poll worker
```

## Testing

This repository contains no test suite.

## Deployment

No deployment pipeline is defined in this repository. Deployment is owned elsewhere or not yet
wired.

## Required configuration

Environment variables read by the modules (names only):

- `ORDER_PROCESSING_QUEUE_URL` (required) — SQS queue for order jobs.
- `ORDER_ATTACHMENTS_BUCKET` (required) — S3 bucket for attachments.
- `INVENTORY_API_URL` (required) — inventory service base URL.
- `SHIPPING_API_URL` (required) — shipping service base URL.
- `STRIPE_SECRET_KEY` (required, secret) — Stripe API key.
- `KAFKA_BROKERS` (optional, default `localhost:9092`) — Kafka brokers.
- `AWS_REGION` (optional, default `us-east-1`) — AWS region.

## Observability

No logging, metrics, or alerting infrastructure is defined in this repository. The worker and
modules log to standard output/console; failures surface as exceptions or console error output.
