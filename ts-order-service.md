# Fixture: ts-order-service (TypeScript)

This repository is a TypeScript order-service fixture whose package name is `ts-order-service` and whose Panopticon repository name is `panopticon-test-child-b`.

## Checked-in interfaces

The local [interface index](docs/interfaces.md) records the interfaces evidenced by the checked-in files.

- `orders-api` is an owned REST interface defined by `src/api/openapi.yaml` and the route modules.
- `order-events` is an owned Kafka topic declared in `src/events/kafka-topics.yaml` and published by `src/events/producer.ts`.
- `inventory-api`, `stripe-payments`, and `shipping-provider-api` are REST services consumed by the respective client modules.
- `order-processing-queue` and `order-attachments-bucket` are SQS and S3 resources owned and used by the queue and storage modules; `infra/sqs-queues.yaml` and `infra/s3-buckets.yaml` declare them.

## Repository contents

The source tree contains API routes, client modules, an event producer, a queue processor and worker, and attachment-storage functions. An `infra/` directory declares the consumed services, the SQS queue, and the S3 bucket the modules use. The repository contains no sibling-repository declarations.
