# queue

## Responsibility

The queue component sends order jobs to SQS and runs a worker that long-polls, processes, and deletes messages. The visible worker logs process, fulfill, and cancel actions.

## Interfaces

This component consumes `order-processing-queue` through SQS. The repository does not include queue-creation configuration, so ownership is unknown in the local index; see [interfaces.md](../interfaces.md).

## Key modules

- `src/queue/processor.ts` — SQS send, receive, and delete operations.
- `src/queue/worker.ts` — long-poll processing loop.

## Configuration

`ORDER_PROCESSING_QUEUE_URL` is required. `AWS_REGION` selects the SQS region and defaults to `us-east-1`.

## Failure modes

SQS operation failures reject queue functions. The worker catches errors during individual job processing and logs them; it does not delete a message when that processing fails.
