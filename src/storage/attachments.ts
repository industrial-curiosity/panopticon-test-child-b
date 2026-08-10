const BUCKET = process.env.ORDER_ATTACHMENTS_BUCKET!;

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });

export async function uploadAttachment(orderId: string, fileName: string, body: Buffer, contentType: string): Promise<string> {
  const key = `orders/${orderId}/${fileName}`;
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
  return key;
}

export async function getAttachmentUrl(key: string, expiresIn = 3600): Promise<string> {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn });
}

export async function deleteAttachment(key: string): Promise<void> {
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}
