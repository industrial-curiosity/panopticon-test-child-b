# events

## Responsibility

The events component defines Kafka topic configuration and publishes order lifecycle events. It
supports created, updated, cancelled, shipped, and delivered event types. No current module calls
the publisher, and this component contains no consumer.

## Interfaces

- Owns and produces `order-events` (`kafka`).

See [interfaces.md](../interfaces.md) for source evidence and ownership.

## Key modules

- `src/events/kafka-topics.yaml` — declares 12 partitions, replication factor 3, seven-day
  retention, and delete cleanup for the topic.
- `src/events/producer.ts` — connects a KafkaJS producer and sends order-keyed JSON messages.

## Configuration

- `KAFKA_BROKERS` — optional comma-separated broker list; defaults to `localhost:9092`.

## Failure modes

Connection and send failures propagate to the caller because `publishOrderEvent` does not catch
them. It connects the producer on every call and never disconnects it. The component defines no
retry, dead-letter handling, logging, metrics, or alerts.
