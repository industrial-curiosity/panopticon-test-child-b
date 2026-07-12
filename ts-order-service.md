# Fixture: ts-order-service (TypeScript)

[panopticon-test-child-b](https://github.com/industrial-curiosity/panopticon-test-child-b)

Test fixture repo representing a TypeScript order management service. Covers: internal-only interfaces, externally owned interfaces, and interfaces owned here and consumed by `py-inventory-service`.

## Purpose

Exercises Panopticon against a TypeScript repo where:
- The REST/OpenAPI parser picks up an owned API (`src/api/openapi.yaml`)
- The Kafka parser picks up an owned event topic (`src/events/kafka-topics.yaml`)
- S3, SQS, and external REST clients are extracted via LLM fallback from `infra/` YAML config files, **and** the `.ts` source files that reference those same interfaces (matched by shared environment-variable names, e.g. `INVENTORY_API_URL`, or by SDK identity for Stripe) are folded in as additional evidence on the same index entries
- Two more interfaces (`stripe-payments`, `shipping-provider-api`) each carry a second, `webhook`-type entry: this repo hosts inbound webhook receivers for both external services in `src/api/routes/webhooks.ts`, alongside the outbound `rest` client usage in `src/clients/`
- Several interfaces have `null` owner (external services, manually managed)
- `ts-order-service` is both an API owner (consumed by Python) and a consumer (of the Python service's API)

## Repository structure

```
panopticon-test-child-b/
├── infra/
│   ├── s3-buckets.yaml           # LLM fallback — order-attachments-bucket (s3, owned)
│   ├── services.yaml             # LLM fallback — inventory-api, stripe-payments, shipping-provider-api (rest, consumer)
│   └── sqs-queues.yaml           # LLM fallback — order-processing-queue (sqs, owned)
├── src/
│   ├── api/
│   │   ├── openapi.yaml          # REST parser — orders-api (producer, owned)
│   │   └── routes/
│   │       ├── orders.ts         # LLM fallback — additional orders-api producer evidence
│   │       └── webhooks.ts       # LLM fallback — stripe-payments + shipping-provider-api (webhook, producer, owned)
│   ├── clients/
│   │   ├── inventory.ts          # LLM fallback — additional inventory-api consumer evidence
│   │   ├── stripe.ts             # LLM fallback — additional stripe-payments consumer evidence
│   │   └── shipping.ts           # LLM fallback — additional shipping-provider-api consumer evidence
│   ├── events/
│   │   ├── kafka-topics.yaml     # Kafka parser — order-events (producer, owned)
│   │   └── producer.ts           # LLM fallback — additional order-events producer evidence
│   ├── queue/
│   │   ├── processor.ts          # LLM fallback — additional order-processing-queue producer+consumer evidence
│   │   └── worker.ts             # LLM fallback — additional order-processing-queue consumer evidence
│   └── storage/
│       └── attachments.ts        # LLM fallback — additional order-attachments-bucket producer+consumer evidence
├── package.json
└── tsconfig.json
```

## Interfaces

### orders-api — owned, cross-repo

- **Type:** `rest`
- **Owner:** `panopticon-test-child-b / api`
- **Producer sources:** `src/api/openapi.yaml` (REST/OpenAPI parser), `src/api/routes/orders.ts` (LLM fallback — the route implementation of that contract)
- **Consumers (other repos):** `py-inventory-service` (declared in that repo's index)
- **Parser:** REST/OpenAPI for `openapi.yaml`; LLM fallback adds the route file as further producer evidence, which is also what resolves the owning component to `api` instead of falling back to the repo name
- **Category:** owned by this repo, consumed by sibling

`src/api/openapi.yaml` content outline:
```yaml
openapi: "3.0.3"
info:
  title: Orders API
  version: "1.0.0"
# panopticon-interface orders-api
paths:
  /orders:
    get: ...
    post: ...
  /orders/{id}:
    get: ...
    patch: ...
  /orders/{id}/cancel:
    post: ...
```

### order-events — owned, cross-repo

- **Type:** `kafka`
- **Owner:** `panopticon-test-child-b / events`
- **Producer sources:** `src/events/kafka-topics.yaml` (Kafka parser), `src/events/producer.ts` (LLM fallback — `publishOrderEvent` sends to the `order-events` topic by name)
- **Consumers (other repos):** `py-inventory-service`
- **Parser:** Kafka topic-config for `kafka-topics.yaml`; LLM fallback adds `producer.ts` as further producer evidence, resolving the owning component to `events`
- **Category:** owned by this repo, consumed by sibling

`src/events/kafka-topics.yaml` content outline:
```yaml
# panopticon-interface order-events
topics:
  - name: order-events
    partitions: 12
    replication_factor: 3
    config:
      retention.ms: "604800000"
      cleanup.policy: delete
```

### order-processing-queue — internal only

- **Type:** `sqs`
- **Owner:** `panopticon-test-child-b / worker` (component owning `src/queue/`)
- **Producer sources:** `infra/sqs-queues.yaml`, `src/queue/processor.ts` (`enqueueOrder`)
- **Consumer sources:** `infra/sqs-queues.yaml`, `src/queue/processor.ts` (`receiveOrders`), `src/queue/worker.ts` (drives the receive/delete loop)
- **Consumers (other repos):** none
- **Parser:** none — LLM fallback; hint in `infra/sqs-queues.yaml` pins the name, matched again in the `.ts` files via the `ORDER_PROCESSING_QUEUE_URL` environment variable
- **Category:** internal; never crosses repo boundaries

`infra/sqs-queues.yaml` content outline:
```yaml
queues:
  # panopticon-interface order-processing-queue
  - name: order-processing-queue
    type: sqs
    visibility_timeout_seconds: 300
    receive_wait_time_seconds: 20
```

### order-attachments-bucket — internal only

- **Type:** `s3`
- **Owner:** `panopticon-test-child-b / storage`
- **Producer sources:** `infra/s3-buckets.yaml`, `src/storage/attachments.ts` (`uploadAttachment` writes)
- **Consumer sources:** `infra/s3-buckets.yaml`, `src/storage/attachments.ts` (`getAttachmentUrl`/`deleteAttachment` read/delete)
- **Consumers (other repos):** none
- **Parser:** none — LLM fallback; hint in `infra/s3-buckets.yaml` pins the name, matched again in `attachments.ts` via the `ORDER_ATTACHMENTS_BUCKET` environment variable
- **Category:** internal; used for temporary file storage (receipts, uploads)

`infra/s3-buckets.yaml` content outline:
```yaml
buckets:
  # panopticon-interface order-attachments-bucket
  - name: order-attachments-bucket
    versioning: false
    lifecycle_expiration_days: 7
```

### inventory-api — external to this repo, owned by sibling

- **Type:** `rest`
- **Owner:** `null` in this repo's index (truth lives in `py-inventory-service`)
- **Consumer sources:** `infra/services.yaml`, `src/clients/inventory.ts` (matched by the shared `INVENTORY_API_URL` environment variable)
- **Category:** cross-repo; ownership declared by `panopticon-test-child-a`

### stripe-payments — external service, manually managed, plus an owned webhook receiver

- **`rest` entry** (outbound, external):
  - **Owner:** `null` (third-party, no Panopticon owner)
  - **Consumer sources:** `infra/services.yaml`, `src/clients/stripe.ts` (matched by identity — both reference the Stripe payments API; the client wraps the `stripe` npm SDK rather than a URL env var)
  - **Category:** external; owner is Stripe, not any org repo
- **`webhook` entry** (inbound, owned by this repo):
  - **Owner:** `panopticon-test-child-b / api`
  - **Producer source:** `src/api/routes/webhooks.ts` (`POST /stripe` receiver)
  - **Category:** this repo owns the receiving endpoint even though it doesn't own the Stripe API itself — two entry objects under one canonical name, distinguished by `type`

### shipping-provider-api — external service, manually managed, plus an owned webhook receiver

- **`rest` entry** (outbound, external):
  - **Owner:** `null` (third-party, no Panopticon owner)
  - **Consumer sources:** `infra/services.yaml`, `src/clients/shipping.ts` (matched by the shared `SHIPPING_API_URL` environment variable)
  - **Category:** external; manually managed contract with shipping vendor
- **`webhook` entry** (inbound, owned by this repo):
  - **Owner:** `panopticon-test-child-b / api`
  - **Producer source:** `src/api/routes/webhooks.ts` (`POST /shipping` receiver)
  - **Category:** this repo owns the receiving endpoint even though it doesn't own the shipping provider's API itself

`infra/services.yaml` content outline (covers both `rest` consumer entries above):
```yaml
services:
  # panopticon-interface inventory-api
  inventory:
    base_url: ${INVENTORY_API_URL}
  # panopticon-interface stripe-payments
  stripe:
    base_url: https://api.stripe.com/v1
  # panopticon-interface shipping-provider-api
  shipping:
    base_url: ${SHIPPING_API_URL}
```

`src/api/routes/webhooks.ts` content outline (covers both `webhook` producer entries above):
```typescript
// panopticon-interface stripe-payments
router.post('/stripe', ...);

// panopticon-interface shipping-provider-api
router.post('/shipping', ...);
```

## Expected `panopticon/index.json`

Repo name in the index is the GitHub repo name: `panopticon-test-child-b`. Every entry below is tagged `extracted_by: "llm"` because every canonical name in this fixture now carries at least one piece of `.ts`-derived evidence alongside (or, for the externally-owned `rest` entries, instead of) its deterministic-parser or `infra/`-config evidence — there are no purely-parser-only entries left in this fixture. Component is resolved from whichever evidence names it; it only falls back to the repo name when nothing does (not exercised by any entry currently in this index).

```json
{
  "interfaces": {
    "inventory-api": [
      {
        "consumer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["infra/services.yaml", "src/clients/inventory.ts"]
          }
        ],
        "extracted_by": "llm",
        "owner": null,
        "producer": [],
        "type": "rest"
      }
    ],
    "order-attachments-bucket": [
      {
        "consumer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["infra/s3-buckets.yaml", "src/storage/attachments.ts"]
          }
        ],
        "extracted_by": "llm",
        "owner": {
          "component": "storage",
          "repo": "panopticon-test-child-b"
        },
        "producer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["infra/s3-buckets.yaml", "src/storage/attachments.ts"]
          }
        ],
        "type": "s3"
      }
    ],
    "order-events": [
      {
        "consumer": [],
        "extracted_by": "llm",
        "owner": {
          "component": "events",
          "repo": "panopticon-test-child-b"
        },
        "producer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["src/events/kafka-topics.yaml", "src/events/producer.ts"]
          }
        ],
        "type": "kafka"
      }
    ],
    "order-processing-queue": [
      {
        "consumer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["infra/sqs-queues.yaml", "src/queue/processor.ts", "src/queue/worker.ts"]
          }
        ],
        "extracted_by": "llm",
        "owner": {
          "component": "worker",
          "repo": "panopticon-test-child-b"
        },
        "producer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["infra/sqs-queues.yaml", "src/queue/processor.ts"]
          }
        ],
        "type": "sqs"
      }
    ],
    "orders-api": [
      {
        "consumer": [],
        "extracted_by": "llm",
        "owner": {
          "component": "api",
          "repo": "panopticon-test-child-b"
        },
        "producer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["src/api/openapi.yaml", "src/api/routes/orders.ts"]
          }
        ],
        "type": "rest"
      }
    ],
    "shipping-provider-api": [
      {
        "consumer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["infra/services.yaml", "src/clients/shipping.ts"]
          }
        ],
        "extracted_by": "llm",
        "owner": null,
        "producer": [],
        "type": "rest"
      },
      {
        "consumer": [],
        "extracted_by": "llm",
        "owner": {
          "component": "api",
          "repo": "panopticon-test-child-b"
        },
        "producer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["src/api/routes/webhooks.ts"]
          }
        ],
        "type": "webhook"
      }
    ],
    "stripe-payments": [
      {
        "consumer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["infra/services.yaml", "src/clients/stripe.ts"]
          }
        ],
        "extracted_by": "llm",
        "owner": null,
        "producer": [],
        "type": "rest"
      },
      {
        "consumer": [],
        "extracted_by": "llm",
        "owner": {
          "component": "api",
          "repo": "panopticon-test-child-b"
        },
        "producer": [
          {
            "repo": "panopticon-test-child-b",
            "source_files": ["src/api/routes/webhooks.ts"]
          }
        ],
        "type": "webhook"
      }
    ]
  },
  "schema_version": 1
}
```

## Panopticon test coverage

| Scenario | Interface | Detail |
|---|---|---|
| Deterministic parser + LLM fallback merge | `orders-api` | `src/api/openapi.yaml` matched by REST parser; `src/api/routes/orders.ts` adds LLM-fallback producer evidence and resolves the owning component to `api` |
| Deterministic parser + LLM fallback merge | `order-events` | `src/events/kafka-topics.yaml` matched by Kafka parser (`partitions:` present → producer); `src/events/producer.ts` adds LLM-fallback producer evidence and resolves the owning component to `events` |
| LLM fallback + hint, config + `.ts` evidence | `order-processing-queue` | `infra/sqs-queues.yaml` hint pins the name; `src/queue/processor.ts` and `src/queue/worker.ts` add matching `.ts` evidence via `ORDER_PROCESSING_QUEUE_URL` |
| LLM fallback + hint, config + `.ts` evidence | `order-attachments-bucket` | `infra/s3-buckets.yaml` hint pins the name; `src/storage/attachments.ts` adds matching `.ts` evidence via `ORDER_ATTACHMENTS_BUCKET` |
| LLM fallback + hint (multi), config + `.ts` evidence | `inventory-api`, `stripe-payments`, `shipping-provider-api` | All three `rest` consumer entries extracted from `infra/services.yaml`; each also picks up matching `.ts` evidence from its own client file |
| LLM fallback, same name reused across type | `stripe-payments`, `shipping-provider-api` | Each also carries a second, `webhook`-type entry owned by this repo (`src/api/routes/webhooks.ts`) — same canonical name as the external `rest` entry, since it's the same external system, just the inbound direction |
| Internal-only | `order-processing-queue`, `order-attachments-bucket` | Owner = this repo; no other repo's index references them; no conflicts possible |
| External / null owner | `stripe-payments`, `shipping-provider-api` | `rest` entries have `owner: null`; compile step never generates ownership conflict for these |
| Cross-repo: this owns, sibling consumes | `orders-api`, `order-events` | Compiled index merges this shard's ownership with `panopticon-test-child-a`'s consumer entries |
| Cross-repo: sibling owns, this consumes | `inventory-api` | `owner: null` locally; compiled index defers ownership to `panopticon-test-child-a`'s shard |
