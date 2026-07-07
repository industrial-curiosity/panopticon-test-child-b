const INVENTORY_BASE = process.env.INVENTORY_API_URL!;

export interface InventoryItem {
  productId: string;
  available: number;
  reserved: number;
}

export async function checkInventory(productId: string): Promise<InventoryItem> {
  const response = await fetch(`${INVENTORY_BASE}/inventory/${productId}`);
  if (!response.ok) throw new Error(`Inventory check failed: ${response.status}`);
  return response.json();
}

export async function reserveInventory(productId: string, quantity: number): Promise<void> {
  const response = await fetch(`${INVENTORY_BASE}/inventory/${productId}/reserve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error(`Reserve failed: ${response.status}`);
}

export async function releaseInventory(productId: string, quantity: number): Promise<void> {
  const response = await fetch(`${INVENTORY_BASE}/inventory/${productId}/release`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error(`Release failed: ${response.status}`);
}
