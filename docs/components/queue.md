# queue

## Responsibility

The queue component enqueues order jobs, polls them from SQS, processes three action types by
logging, and deletes successfully handled messages. Its worker loop is exported but not invoked
by the module, so the configured npm worker command only loads the definitions.

## Interfaces

- Owns, produces, and consumes `order-processing-queue` (`sqs`).

See [interfaces.md](../interfaces.md) for source evidence and ownership.

## Key modules

- `infra/sqs-queues.yaml` — declares the queue with a 300-second visibility timeout and 20-second
  receive wait.
- `src/queue/processor.ts` — sends, receives, parses, and deletes SQS messages.
- `src/queue/worker.ts` — implements the polling loop and action dispatch.

## Configuration

- `ORDER_PROCESSING_QUEUE_URL` — required SQS queue URL.
- `AWS_REGION` — optional AWS region; defaults to `us-east-1`.

`receiveOrders` also defaults to at most 10 messages and a 20-second long poll; these values are
hard-coded rather than externally configurable.

## Failure modes

SQS send, receive, JSON parse, and delete errors can reject their calling functions. The worker
catches per-job processing and deletion failures, logs them, and leaves those messages undeleted,
but a receive failure escapes and terminates `runWorker`. There is no backoff, shutdown handling,
dead-letter configuration, metric, or alert in this repository.
