const SHIPPING_API_URL = process.env.SHIPPING_API_URL!;

export interface ShipmentQuote {
  carrier: string;
  service: string;
  estimatedDays: number;
  price: number;
}

export interface Shipment {
  trackingNumber: string;
  carrier: string;
  labelUrl: string;
}

export async function getQuotes(fromZip: string, toZip: string, weightLbs: number): Promise<ShipmentQuote[]> {
  const response = await fetch(`${SHIPPING_API_URL}/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fromZip, toZip, weightLbs }),
  });
  if (!response.ok) throw new Error(`Quote request failed: ${response.status}`);
  return response.json();
}

export async function createShipment(orderId: string, quote: ShipmentQuote): Promise<Shipment> {
  const response = await fetch(`${SHIPPING_API_URL}/shipments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, carrier: quote.carrier, service: quote.service }),
  });
  if (!response.ok) throw new Error(`Shipment creation failed: ${response.status}`);
  return response.json();
}

export async function trackShipment(trackingNumber: string): Promise<{ status: string; location: string }> {
  const response = await fetch(`${SHIPPING_API_URL}/track/${trackingNumber}`);
  if (!response.ok) throw new Error(`Tracking failed: ${response.status}`);
  return response.json();
}
