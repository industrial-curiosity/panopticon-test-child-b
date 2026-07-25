# panopticon-test-child-b — operations

## Running locally

Install the declared Node.js dependencies with `npm install`. Use `npm run build` to compile TypeScript, `npm run dev` for the declared ts-node development command, and `npm run worker` to start the SQS long-poll worker.

The repository does not include `src/index.ts`, although the `dev` script references it; that command cannot be verified from the checked-in source.

## Testing

No test scripts or test suites are declared in `package.json`. TypeScript compilation via `npm run build` is the available repository-level verification command.

## Deployment

No deployment pipeline, environment promotion process, approval flow, or rollback procedure is present in the repository. The `infra/` YAML files declare interface-related infrastructure only.

## Required configuration

Set `INVENTORY_API_URL`, `STRIPE_SECRET_KEY`, `SHIPPING_API_URL`, `ORDER_PROCESSING_QUEUE_URL`, and `ORDER_ATTACHMENTS_BUCKET` for the applicable clients. Set `KAFKA_BROKERS` to override its local default, and set `AWS_REGION` to override the default `us-east-1` used by SQS and S3.

## Observability

The worker writes startup, processing, and per-job failure messages to standard output or error. No metrics, dashboards, tracing, or alert definitions are visible in the repository.
