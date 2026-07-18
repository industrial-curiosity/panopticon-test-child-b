# ts-order-service operations

## Deployment

The repository provides a compiled Node.js service and a separate `worker` command for SQS order processing.

## Configuration

Configure the API URLs, Stripe credentials, Kafka brokers, SQS queue URL, attachment bucket, and AWS region using the environment variables documented in `README.md`.

## Failure handling

The worker logs failed jobs and leaves their queue messages undeleted so they can be retried according to the queue configuration.
