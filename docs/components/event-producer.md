# event-producer

## Responsibility

Publishes order lifecycle events to the Kafka topic `order-events`. Owns the topic declaration
in `src/events/kafka-topics.yaml`.

## Interfaces

- `order-events` (kafka) — **produced**, owned by this repo (event-producer component).

See [interfaces.md](../interfaces.md).

## Key modules

- `src/events/producer.ts` — kafkajs producer; `publishOrderEvent` sends an `OrderEvent`
  (`order.created`, `order.updated`, `order.cancelled`, `order.shipped`, `order.delivered`) keyed
  by order id to `order-events`.
- `src/events/kafka-topics.yaml` — topic definition: 12 partitions, replication factor 3,
  7-day retention, delete cleanup policy.

## Configuration

- `KAFKA_BROKERS` (optional, default `localhost:9092`) — broker list for the kafkajs client.

## Failure modes

- Kafka cluster unavailable → order events are not published; `publishOrderEvent` rejects.
- Topic misconfigured or missing → publication fails.
