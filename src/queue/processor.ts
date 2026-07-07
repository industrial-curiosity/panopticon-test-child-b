const QUEUE_URL = process.env.ORDER_PROCESSING_QUEUE_URL!;

import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';

const sqs = new SQSClient({ region: process.env.AWS_REGION || 'us-east-1' });

export interface OrderJob {
  orderId: string;
  action: 'process' | 'fulfill' | 'cancel';
  payload: Record<string, unknown>;
}

export async function enqueueOrder(job: OrderJob): Promise<void> {
  await sqs.send(new SendMessageCommand({
    QueueUrl: QUEUE_URL,
    MessageBody: JSON.stringify(job),
    MessageGroupId: job.orderId,
  }));
}

export async function receiveOrders(maxMessages = 10): Promise<Array<{ job: OrderJob; receiptHandle: string }>> {
  const response = await sqs.send(new ReceiveMessageCommand({
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: maxMessages,
    WaitTimeSeconds: 20,
  }));
  return (response.Messages || []).map(msg => ({
    job: JSON.parse(msg.Body!) as OrderJob,
    receiptHandle: msg.ReceiptHandle!,
  }));
}

export async function deleteMessage(receiptHandle: string): Promise<void> {
  await sqs.send(new DeleteMessageCommand({ QueueUrl: QUEUE_URL, ReceiptHandle: receiptHandle }));
}
