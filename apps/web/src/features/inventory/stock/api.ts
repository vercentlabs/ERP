export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };
export type InventoryStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
export type WarehouseType = "MAIN" | "BRANCH" | "TRANSIT" | "VIRTUAL" | "PRODUCTION" | "THIRD_PARTY";

export type WarehouseRecord = {
  id: string;
  warehouseNumber: string;
  name: string;
  code: string;
  type: WarehouseType;
  status: InventoryStatus;
  isDefault: boolean;
  notes?: string;
};

export type WarehouseBinRecord = {
  id: string;
  warehouseId: string;
  binNumber: string;
  code: string;
  name: string;
  zone?: string;
  aisle?: string;
  rack?: string;
  shelf?: string;
  status: InventoryStatus;
  isDefault: boolean;
};

export type StockBalanceRecord = {
  id: string;
  itemId: string;
  warehouseId: string;
  binId?: string;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  stockValue?: number;
  averageCost?: number;
};

export type StockLedgerEntryRecord = {
  id: string;
  entryNumber: string;
  itemId: string;
  warehouseId: string;
  binId?: string;
  postingDate: string;
  movementType: string;
  quantity: number;
  uomId: string;
  unitCost?: number;
  stockValue?: number;
  referenceType?: string;
  referenceId?: string;
  remarks?: string;
};

export type SalesOrderLineAvailability = {
  itemId: string;
  itemName: string;
  orderedQuantity: number;
  totalAvailableQuantity: number;
  availabilityStatus: "AVAILABLE" | "PARTIAL" | "UNAVAILABLE" | "NON_STOCK_ITEM";
};

const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";

function apiUrl(path: string, params?: Record<string, string | undefined>) {
  const url = new URL(path, apiBaseUrl);
  for (const [key, value] of Object.entries(params ?? {})) if (value) url.searchParams.set(key, value);
  return url;
}

async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), {
    ...init,
    cache: "no-store",
    headers: { "content-type": "application/json", "x-tenant-id": tenantId, "x-permissions": "*", ...(init?.headers ?? {}) },
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export function listWarehouses(params: Record<string, string | undefined> = {}) {
  return request<PageResult<WarehouseRecord>>("/api/inventory/warehouses", undefined, params);
}

export function getWarehouse(id: string) {
  return request<WarehouseRecord>(`/api/inventory/warehouses/${id}`);
}

export function createWarehouse(input: Record<string, unknown>) {
  return request<WarehouseRecord>("/api/inventory/warehouses", { method: "POST", body: JSON.stringify(input) });
}

export function updateWarehouse(id: string, input: Record<string, unknown>) {
  return request<WarehouseRecord>(`/api/inventory/warehouses/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function setDefaultWarehouse(id: string) {
  return request<WarehouseRecord>(`/api/inventory/warehouses/${id}/default`, { method: "POST", body: JSON.stringify({}) });
}

export function listWarehouseBins(warehouseId: string, params: Record<string, string | undefined> = {}) {
  return request<PageResult<WarehouseBinRecord>>(`/api/inventory/warehouses/${warehouseId}/bins`, undefined, params);
}

export function createWarehouseBin(warehouseId: string, input: Record<string, unknown>) {
  return request<WarehouseBinRecord>(`/api/inventory/warehouses/${warehouseId}/bins`, { method: "POST", body: JSON.stringify(input) });
}

export function setDefaultBin(id: string) {
  return request<WarehouseBinRecord>(`/api/inventory/bins/${id}/default`, { method: "POST", body: JSON.stringify({}) });
}

export function listStockBalances(params: Record<string, string | undefined> = {}) {
  return request<PageResult<StockBalanceRecord>>("/api/inventory/stock-balances", undefined, params);
}

export function listStockLedger(params: Record<string, string | undefined> = {}) {
  return request<PageResult<StockLedgerEntryRecord>>("/api/inventory/stock-ledger", undefined, params);
}

export function createOpeningStock(input: Record<string, unknown>) {
  return request<StockLedgerEntryRecord>("/api/inventory/opening-stock", { method: "POST", body: JSON.stringify(input) });
}

export function createStockAdjustment(input: Record<string, unknown>) {
  return request<StockLedgerEntryRecord>("/api/inventory/stock-adjustments", { method: "POST", body: JSON.stringify(input) });
}

export function getSalesOrderStockAvailability(orderId: string) {
  return request<SalesOrderLineAvailability[]>(`/api/sales/orders/${orderId}/stock-availability`);
}
