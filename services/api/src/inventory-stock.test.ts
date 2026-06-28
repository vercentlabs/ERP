import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import type { Item, MasterDataRepository, Uom } from "../../../modules/master-data/foundation/types";
import { createInventoryStockService } from "../../../modules/inventory/stock-ledger/service";
import type {
  InventoryStockRepository,
  StockBalanceRecord,
  StockLedgerEntryRecord,
  StockMovementType,
  WarehouseBinRecord,
  WarehouseRecord,
} from "../../../modules/inventory/stock-ledger/types";
import type { SalesOrderRepository } from "../../../modules/sales/sales-orders/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const now = () => new Date().toISOString();
const ids = {
  item: "00000000-0000-4000-8000-000000000001",
  uom: "00000000-0000-4000-8000-000000000002",
  order: "00000000-0000-4000-8000-000000000003",
};

function item(input: Partial<Item> = {}): Item {
  return {
    id: ids.item,
    tenantId: context.tenantId,
    itemNumber: "ITEM-1",
    name: "Stock Item",
    itemType: "PRODUCT",
    baseUomId: ids.uom,
    isStockItem: true,
    isSalesItem: true,
    isPurchaseItem: true,
    isManufacturingItem: false,
    currency: "INR",
    status: "ACTIVE",
    tags: [],
    customFields: {},
    createdAt: now(),
    updatedAt: now(),
    ...input,
  };
}

function uom(): Uom {
  return { id: ids.uom, tenantId: context.tenantId, code: "PCS", name: "Pieces", precision: 0, isBase: true, status: "ACTIVE", createdAt: now(), updatedAt: now() };
}

function fakeMasterData(rows: Item[] = [item()]): MasterDataRepository {
  return {
    async getItemById(tenantId: string, id: string) {
      return rows.find((row) => row.tenantId === tenantId && row.id === id);
    },
    async getUomById(tenantId: string, id: string) {
      return tenantId === context.tenantId && id === ids.uom ? uom() : undefined;
    },
  } as unknown as MasterDataRepository;
}

function fakeSalesOrders(): SalesOrderRepository {
  return {
    async getSalesOrderById() {
      return {
        id: ids.order,
        tenantId: context.tenantId,
        orderNumber: "SO-1",
        customerId: "customer-1",
        orderDate: "2026-06-21",
        status: "DRAFT",
        currency: "INR",
        exchangeRate: 1,
        subtotalAmount: 0,
        discountAmount: 0,
        taxAmount: 0,
        totalAmount: 0,
        createdAt: now(),
        updatedAt: now(),
        lines: [{ id: "line-1", orderId: ids.order, lineNumber: 1, itemId: ids.item, itemName: "Stock Item", quantity: 6, uomId: ids.uom, unitPrice: 1, discountPercent: 0, discountAmount: 0, taxRate: 0, taxAmount: 0, lineSubtotal: 6, lineTotal: 6, createdAt: now(), updatedAt: now() }],
      };
    },
  } as unknown as SalesOrderRepository;
}

function fakeInventoryRepository(): InventoryStockRepository {
  const warehouses = new Map<string, WarehouseRecord>();
  const bins = new Map<string, WarehouseBinRecord>();
  const ledger = new Map<string, StockLedgerEntryRecord>();
  const balances = new Map<string, StockBalanceRecord>();
  const balanceKey = (itemId: string, warehouseId: string, binId?: string) => `${itemId}:${warehouseId}:${binId ?? ""}`;
  const page = <T>(rows: T[]) => ({ rows, total: rows.length, page: 1, pageSize: 25 });
  return {
    async createWarehouse(input) {
      if ([...warehouses.values()].some((warehouse) => warehouse.tenantId === input.tenantId && warehouse.code === input.code.toUpperCase() && !warehouse.deletedAt)) throw new Error("duplicate warehouse code");
      const record: WarehouseRecord = { id: `00000000-0000-4000-8000-00000000${String(1000 + warehouses.size + 1).slice(-4)}`, tenantId: input.tenantId, warehouseNumber: `WH-${warehouses.size + 1}`, name: input.name, code: input.code.toUpperCase(), type: input.type ?? "MAIN", status: input.status ?? "ACTIVE", isDefault: input.isDefault ?? false, notes: input.notes, createdAt: now(), updatedAt: now() };
      warehouses.set(record.id, record);
      return record;
    },
    async listWarehouses(request) {
      return page([...warehouses.values()].filter((row) => row.tenantId === request.tenantId && !row.deletedAt && (!request.status || row.status === request.status)));
    },
    async getWarehouseById(tenantId, id) {
      const row = warehouses.get(id);
      return row?.tenantId === tenantId && !row.deletedAt ? row : undefined;
    },
    async getWarehouseByCode(tenantId, code) {
      return [...warehouses.values()].find((row) => row.tenantId === tenantId && row.code === code.toUpperCase() && !row.deletedAt);
    },
    async updateWarehouse(tenantId, id, input) {
      const current = await this.getWarehouseById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      warehouses.set(id, updated);
      return updated;
    },
    async softDeleteWarehouse(tenantId, id) {
      return this.updateWarehouse(tenantId, id, { deletedAt: now() } as never);
    },
    async setDefaultWarehouse(tenantId, id) {
      return this.updateWarehouse(tenantId, id, { isDefault: true });
    },
    async createWarehouseBin(input) {
      const record: WarehouseBinRecord = { id: `00000000-0000-4000-8000-00000000${String(2000 + bins.size + 1).slice(-4)}`, tenantId: input.tenantId, warehouseId: input.warehouseId, binNumber: `BIN-${bins.size + 1}`, code: input.code.toUpperCase(), name: input.name, zone: input.zone, status: input.status ?? "ACTIVE", isDefault: input.isDefault ?? false, createdAt: now(), updatedAt: now() };
      bins.set(record.id, record);
      return record;
    },
    async listWarehouseBins(request) {
      return page([...bins.values()].filter((row) => row.tenantId === request.tenantId && !row.deletedAt && (!request.warehouseId || row.warehouseId === request.warehouseId)));
    },
    async getWarehouseBinById(tenantId, id) {
      const row = bins.get(id);
      return row?.tenantId === tenantId && !row.deletedAt ? row : undefined;
    },
    async updateWarehouseBin(tenantId, id, input) {
      const current = await this.getWarehouseBinById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      bins.set(id, updated);
      return updated;
    },
    async softDeleteWarehouseBin(tenantId, id) {
      return this.updateWarehouseBin(tenantId, id, { deletedAt: now() } as never);
    },
    async setDefaultWarehouseBin(tenantId, id) {
      return this.updateWarehouseBin(tenantId, id, { isDefault: true });
    },
    async createStockLedgerEntry(input) {
      const record: StockLedgerEntryRecord = { id: `00000000-0000-4000-8000-00000000${String(3000 + ledger.size + 1).slice(-4)}`, tenantId: input.tenantId, entryNumber: `SLE-${ledger.size + 1}`, itemId: input.itemId, warehouseId: input.warehouseId, binId: input.binId, postingDate: input.postingDate ?? "2026-06-21", postingTime: input.postingTime ?? "10:00:00", movementType: input.movementType as StockMovementType, quantity: input.quantity, uomId: input.uomId!, stockValue: input.stockValue, unitCost: input.unitCost, referenceType: input.referenceType, referenceId: input.referenceId, remarks: input.remarks, createdByUserId: input.createdByUserId, createdAt: now() };
      ledger.set(record.id, record);
      await this.upsertStockBalanceFromLedgerEntry(record);
      return record;
    },
    async listStockLedgerEntries(request) {
      return page([...ledger.values()].filter((row) => row.tenantId === request.tenantId && (!request.itemId || row.itemId === request.itemId) && (!request.movementType || row.movementType === request.movementType)));
    },
    async getStockLedgerEntryById(tenantId, id) {
      const row = ledger.get(id);
      return row?.tenantId === tenantId ? row : undefined;
    },
    async getStockLedgerEntriesByReference(tenantId, referenceType, referenceId) {
      return [...ledger.values()].filter((row) => row.tenantId === tenantId && row.referenceType === referenceType && row.referenceId === referenceId);
    },
    async getItemLedger(request) {
      return this.listStockLedgerEntries(request);
    },
    async getStockBalance(tenantId, itemId, warehouseId, binId) {
      const row = balances.get(balanceKey(itemId, warehouseId, binId));
      return row?.tenantId === tenantId ? row : undefined;
    },
    async getStockBalances(request) {
      return page([...balances.values()].filter((row) => row.tenantId === request.tenantId && (!request.itemId || row.itemId === request.itemId)));
    },
    async getItemStockAvailability(request) {
      const rows = [...balances.values()].filter((row) => row.tenantId === request.tenantId && row.itemId === request.itemId && (!request.warehouseId || row.warehouseId === request.warehouseId));
      return { itemId: request.itemId, warehouseId: request.warehouseId, binId: request.binId, totalOnHand: rows.reduce((sum, row) => sum + row.quantityOnHand, 0), totalReserved: rows.reduce((sum, row) => sum + row.quantityReserved, 0), totalAvailable: rows.reduce((sum, row) => sum + row.quantityAvailable, 0), balances: rows };
    },
    async upsertStockBalanceFromLedgerEntry(entry) {
      const key = balanceKey(entry.itemId, entry.warehouseId, entry.binId);
      const current = balances.get(key);
      const sign = entry.movementType === "ADJUSTMENT_OUT" ? -1 : 1;
      const onHand = (current?.quantityOnHand ?? 0) + entry.quantity * sign;
      const record: StockBalanceRecord = current ? { ...current, quantityOnHand: onHand, quantityAvailable: onHand - current.quantityReserved, updatedAt: now() } : { id: `00000000-0000-4000-8000-00000000${String(4000 + balances.size + 1).slice(-4)}`, tenantId: entry.tenantId, itemId: entry.itemId, warehouseId: entry.warehouseId, binId: entry.binId, quantityOnHand: onHand, quantityReserved: 0, quantityAvailable: onHand, stockValue: entry.stockValue, averageCost: entry.unitCost, updatedAt: now() };
      balances.set(key, record);
      return record;
    },
    async getLowStockSummary() {
      return { lowStockItems: 0 };
    },
  };
}

let server: Server | undefined;
afterEach(async () => {
  await new Promise<void>((resolve, reject) => {
    if (!server) return resolve();
    server.close((error) => (error ? reject(error) : resolve()));
    server = undefined;
  });
});

describe("inventory stock service", () => {
  it("creates warehouses and rejects duplicate codes", async () => {
    const service = createInventoryStockService(fakeInventoryRepository(), fakeMasterData(), fakeSalesOrders());
    await service.createWarehouse({ tenantId: context.tenantId, name: "Main", code: "MAIN" }, context);
    await expect(service.createWarehouse({ tenantId: context.tenantId, name: "Duplicate", code: "MAIN" }, context)).rejects.toThrow("duplicate");
  });

  it("creates bins, opening stock, adjustments, balances, ledger, and blocks negative stock", async () => {
    const service = createInventoryStockService(fakeInventoryRepository(), fakeMasterData(), fakeSalesOrders());
    const warehouse = await service.createWarehouse({ tenantId: context.tenantId, name: "Main", code: "MAIN" }, context);
    const bin = await service.createWarehouseBin({ tenantId: context.tenantId, warehouseId: warehouse.id, name: "A1", code: "A1" }, context);
    await expect(service.createOpeningStock({ tenantId: context.tenantId, itemId: ids.item, warehouseId: warehouse.id, binId: "00000000-0000-4000-8000-000000009999", quantity: 10 }, context)).rejects.toThrow("Warehouse bin");
    await service.createOpeningStock({ tenantId: context.tenantId, itemId: ids.item, warehouseId: warehouse.id, binId: bin.id, quantity: 10, unitCost: 5 }, context);
    await service.createStockAdjustment({ tenantId: context.tenantId, itemId: ids.item, warehouseId: warehouse.id, binId: bin.id, adjustmentType: "IN", quantity: 5 }, context);
    await service.createStockAdjustment({ tenantId: context.tenantId, itemId: ids.item, warehouseId: warehouse.id, binId: bin.id, adjustmentType: "OUT", quantity: 3 }, context);
    await expect(service.createStockAdjustment({ tenantId: context.tenantId, itemId: ids.item, warehouseId: warehouse.id, binId: bin.id, adjustmentType: "OUT", quantity: 100 }, context)).rejects.toThrow("Insufficient");
    expect((await service.getItemStockAvailability({ tenantId: context.tenantId, itemId: ids.item }, context)).totalAvailable).toBe(12);
    expect((await service.listStockLedger({ tenantId: context.tenantId, movementType: "ADJUSTMENT_OUT" }, context)).total).toBe(1);
    await expect(service.createOpeningStock({ tenantId: context.tenantId, itemId: ids.item, warehouseId: warehouse.id, quantity: 1 }, context)).resolves.toMatchObject({ movementType: "OPENING" });
  });

  it("reports sales order availability", async () => {
    const service = createInventoryStockService(fakeInventoryRepository(), fakeMasterData(), fakeSalesOrders());
    const warehouse = await service.createWarehouse({ tenantId: context.tenantId, name: "Main", code: "MAIN" }, context);
    await service.createOpeningStock({ tenantId: context.tenantId, itemId: ids.item, warehouseId: warehouse.id, quantity: 5 }, context);
    const availability = await service.getSalesOrderStockAvailability(context.tenantId, ids.order, context);
    expect(availability[0].availabilityStatus).toBe("PARTIAL");
  });
});

describe("inventory stock API routes", () => {
  it("serves warehouse, bin, stock, ledger, adjustment, and sales order availability endpoints", async () => {
    const service = createInventoryStockService(fakeInventoryRepository(), fakeMasterData(), fakeSalesOrders());
    server = createApiService({ inventoryStock: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    const baseUrl = `http://127.0.0.1:${port}`;
    const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };
    const warehouse = await fetch(`${baseUrl}/api/inventory/warehouses`, { method: "POST", headers, body: JSON.stringify({ name: "Main", code: "MAIN" }) }).then((response) => response.json() as Promise<WarehouseRecord>);
    expect(await fetch(`${baseUrl}/api/inventory/warehouses`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/warehouses/${warehouse.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/warehouses/${warehouse.id}`, { method: "PATCH", headers, body: JSON.stringify({ notes: "Updated" }) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/warehouses/${warehouse.id}/default`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(200);
    const bin = await fetch(`${baseUrl}/api/inventory/warehouses/${warehouse.id}/bins`, { method: "POST", headers, body: JSON.stringify({ name: "A1", code: "A1" }) }).then((response) => response.json() as Promise<WarehouseBinRecord>);
    expect(await fetch(`${baseUrl}/api/inventory/warehouses/${warehouse.id}/bins`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/bins/${bin.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/bins/${bin.id}`, { method: "PATCH", headers, body: JSON.stringify({ zone: "Z1" }) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/bins/${bin.id}/default`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/opening-stock`, { method: "POST", headers, body: JSON.stringify({ itemId: ids.item, warehouseId: warehouse.id, binId: bin.id, quantity: 10 }) }).then((response) => response.status)).toBe(201);
    expect(await fetch(`${baseUrl}/api/inventory/stock-adjustments`, { method: "POST", headers, body: JSON.stringify({ itemId: ids.item, warehouseId: warehouse.id, binId: bin.id, adjustmentType: "OUT", quantity: 2 }) }).then((response) => response.status)).toBe(201);
    expect(await fetch(`${baseUrl}/api/inventory/stock-balances`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/stock-ledger`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/items/${ids.item}/availability`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/items/${ids.item}/ledger`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/${ids.order}/stock-availability`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/bins/${bin.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/inventory/warehouses/${warehouse.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
  });
});
