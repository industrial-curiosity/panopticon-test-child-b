# storage

## Responsibility

Owns storage of order attachments (e.g. receipts, uploads) in S3: upload, generate a
time-limited signed URL, and delete. Out of scope: nothing in this repo currently calls
`uploadAttachment`, `getAttachmentUrl`, or `deleteAttachment` — no route handler wires this in.

## Interfaces

Not present in the local interface index: the S3 bucket is configured entirely through the
`ORDER_ATTACHMENTS_BUCKET` environment variable in `src/storage/attachments.ts`, with no bucket
declaration/config file for a deterministic parser or LLM-fallback pass to extract a name from.

## Key modules

- `src/storage/attachments.ts` — `uploadAttachment(orderId, fileName, body, contentType)` (key
  pattern `orders/{orderId}/{fileName}`), `getAttachmentUrl(key, expiresIn = 3600)` (signed URL
  via `@aws-sdk/s3-request-presigner`), `deleteAttachment(key)`. Wraps `@aws-sdk/client-s3`.

## Configuration

- `ORDER_ATTACHMENTS_BUCKET` — required (non-null-asserted); the S3 bucket name.
- `AWS_REGION` — defaults to `us-east-1` when unset.

## Failure modes

None of the three functions catch or wrap S3 client errors — an `S3Client.send` failure (e.g.
missing bucket, permission denial, network error) propagates directly to the caller as whatever
error the AWS SDK throws. `uploadAttachment` and `deleteAttachment` have no retry logic.
