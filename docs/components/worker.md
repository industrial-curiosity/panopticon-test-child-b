# worker

## Responsibility

SQS order-processing worker: enqueues and consumes order jobs on the `order-processing-queue`
and dispatches each job by action (`process`, `fulfill`, `cancel`). Owns the queue declaration
in `infra/sqs-queues.yaml`.

## Interfaces

- `order-processing-queue` (sqs) — **produced** (declared in infra config) and **consumed**
  (processor and worker), owned by this repo (worker component).

See [interfaces.md](../interfaces.md).

## Key modules

- `src/queue/processor.ts` — SQS client helpers: `enqueueOrder`, `receiveOrders`, `deleteMessage`.
- `src/queue/worker.ts` — `runWorker`: long-poll receive loop, dispatches jobs, acknowledges
  messages, logs per-job failures.
- `infra/sqs-queues.yaml` — queue definition (`order-processing-queue`, 300 s visibility timeout,
  20 s receive wait).

## Configuration

- `ORDER_PROCESSING_QUEUE_URL` (required) — the SQS queue URL.
- `AWS_REGION` (optional, default `us-east-1`).

## Failure modes

- Queue unreachable or misconfigured → jobs cannot be enqueued or received.
- Worker down → queued order jobs are not processed; messages remain in the queue and become
  visible again after the visibility timeout.
