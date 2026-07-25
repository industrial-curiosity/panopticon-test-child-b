# storage

## Responsibility

The storage component manages order attachment objects in S3. It uploads objects, produces signed read URLs, and deletes objects by key.

## Interfaces

This component produces and consumes the owned `order-attachments-bucket` S3 interface. See [interfaces.md](../interfaces.md) for the index entry.

## Key modules

- `infra/s3-buckets.yaml` — bucket declaration and seven-day lifecycle expiration.
- `src/storage/attachments.ts` — S3 upload, signed URL, and delete functions.

## Configuration

`ORDER_ATTACHMENTS_BUCKET` is required. `AWS_REGION` selects the S3 region and defaults to `us-east-1`.

## Failure modes

S3 client errors reject attachment operations. Missing bucket or region configuration prevents operations from targeting the intended storage location.
