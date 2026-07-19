# storage

## Responsibility

The storage component uploads order attachments to S3, creates signed download URLs, and deletes
objects. It does not expose routes or call sites; no current module imports these helpers.

## Interfaces

- Owns, produces, and consumes `order-attachments-bucket` (`s3`). Infrastructure declares the
  bucket, while the source writes, reads, and deletes its objects.

See [interfaces.md](../interfaces.md) for source evidence and ownership.

## Key modules

- `infra/s3-buckets.yaml` — declares an unversioned bucket with seven-day lifecycle expiration.
- `src/storage/attachments.ts` — uploads under `orders/{orderId}/{fileName}`, creates signed URLs,
  and deletes objects with the AWS SDK.

## Configuration

- `ORDER_ATTACHMENTS_BUCKET` — required S3 bucket name.
- `AWS_REGION` — optional AWS region; defaults to `us-east-1`.

Signed URLs default to a 3,600-second lifetime unless the caller supplies another value.

## Failure modes

AWS SDK upload, signing, and deletion failures propagate unchanged to callers. The component has
no retries, error logging, metrics, or fallback storage. Object versioning is disabled and the
declared seven-day lifecycle can permanently expire stored attachments.
