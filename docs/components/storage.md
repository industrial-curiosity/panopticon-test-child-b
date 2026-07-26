# storage

## Responsibility

The storage component manages order attachment objects in S3. It uploads objects, produces signed read URLs, and deletes objects by key.

## Interfaces

This component consumes `order-attachments-bucket` through S3. The repository does not include bucket-creation configuration, so ownership is unknown in the local index; see [interfaces.md](../interfaces.md).

## Key modules

- `src/storage/attachments.ts` — S3 upload, signed URL, and delete functions.

## Configuration

`ORDER_ATTACHMENTS_BUCKET` is required. `AWS_REGION` selects the S3 region and defaults to `us-east-1`.

## Failure modes

S3 client errors reject attachment operations. Missing bucket or region configuration prevents operations from targeting the intended storage location.
