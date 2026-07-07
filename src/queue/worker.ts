import { receiveOrders, deleteMessage, OrderJob } from './processor';

async function processJob(job: OrderJob): Promise<void> {
  switch (job.action) {
    case 'process':
      console.log(`Processing order ${job.orderId}`);
      break;
    case 'fulfill':
      console.log(`Fulfilling order ${job.orderId}`);
      break;
    case 'cancel':
      console.log(`Cancelling order ${job.orderId}`);
      break;
  }
}

export async function runWorker(): Promise<void> {
  console.log('Order processing worker started');
  while (true) {
    const messages = await receiveOrders();
    for (const { job, receiptHandle } of messages) {
      try {
        await processJob(job);
        await deleteMessage(receiptHandle);
      } catch (err) {
        console.error(`Failed to process job for order ${job.orderId}:`, err);
      }
    }
  }
}
