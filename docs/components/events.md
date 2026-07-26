# events

## Responsibility

The events component declares the `order-events` topic and publishes order lifecycle event payloads to it. It does not consume Kafka messages.

## Interfaces

This component produces the owned `order-events` Kafka interface. See [interfaces.md](../interfaces.md) for its indexed source file.

## Key modules

- `src/events/kafka-topics.yaml` — topic declaration with partition count, replication factor, and retention policy.
- `src/events/producer.ts` — Kafka producer and `OrderEvent` payload type.

## Configuration

`KAFKA_BROKERS` supplies a comma-separated broker list; it defaults to `localhost:9092` when unset.

## Failure modes

Broker connection or send failures reject `publishOrderEvent`. The producer connects for each call in the visible implementation, so unavailable brokers directly prevent publication.
