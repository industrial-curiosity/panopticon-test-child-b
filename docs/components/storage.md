# storage

## Responsibility

S3 attachment storage module: uploads order attachments, produces presigned download URLs, and
deletes attachments in the `order-attachments-bucket`. Owns the bucket declaration in
`infra/s3-buckets.yaml`.

## Interfaces

- `order-attachments-bucket` (s3) — **produced** (declared in infra config) and **consumed**
  (attachment operations), owned by this repo (storage component).

See [interfaces.md](../interfaces.md).

## Key modules

- `src/storage/attachments.ts` — S3 client and presigner: `uploadAttachment`,
  `getAttachmentUrl`, `deleteAttachment`; object keys are `orders/{orderId}/{fileName}`.
- `infra/s3-buckets.yaml` — bucket definition (`order-attachments-bucket`, versioning off,
  7-day lifecycle expiration).

## Configuration

- `ORDER_ATTACHMENTS_BUCKET` (required) — the S3 bucket name.
- `AWS_REGION` (optional, default `us-east-1`).

## Failure modes

- Bucket unreachable or missing → attachment upload/download/delete fails.
- Objects expire after 7 days per the lifecycle policy; no replication or versioning is
  configured.
