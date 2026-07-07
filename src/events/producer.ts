import { Kafka } from 'kafkajs';

const kafka = new Kafka({ brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',') });
const producer = kafka.producer();

export type OrderEventType = 'order.created' | 'order.updated' | 'order.cancelled' | 'order.shipped' | 'order.delivered';

export interface OrderEvent {
  eventType: OrderEventType;
  orderId: string;
  timestamp: string;
  payload: Record<string, unknown>;
}

export async function publishOrderEvent(event: OrderEvent): Promise<void> {
  await producer.connect();
  await producer.send({
    topic: 'order-events',
    messages: [{ key: event.orderId, value: JSON.stringify(event) }],
  });
}
