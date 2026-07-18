# ts-order-service architecture

This repository contains an order management API, event producer, queue worker, external service clients, and attachment storage integration.

## Architecture diagram

```mermaid
flowchart LR
  api[API] --> events[Kafka events]
  api --> queue[Queue worker]
  api --> storage[S3 attachments]
  api --> clients[External clients]
  queue --> events
```

[org diagram](../architecture.md#ts-order-service)
