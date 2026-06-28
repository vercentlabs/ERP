import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import type { InventoryStockRepository, StockBalanceRecord, StockLedgerEntryRecord, WarehouseRecord } from "../../../modules/inventory/stock-ledger/types";
import type { Item, MasterDataRepository } from "../../../modules/master-data/foundation/types";
import { createDeliveryNotesService } from "../../../modules/sales/delivery-notes/service";
import type {
  DeliveryNoteCreateInput,
  DeliveryNoteListRequest,
  DeliveryNoteRecord,
  DeliveryNoteRepository,
  DeliveryNoteStatus,
  DeliveryNoteUpdateInput,
} from "../../../modules/sales/delivery-notes/types";
import type { SalesOrderRecord, SalesOrderRepository } from "../../../modules/sales/sales-orders/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const now = () => new Date().toISOString();
const ids = {
  order: "00000000-0000-4000-8000-000000000001",
  line: "00000000-0000-4000-8000-000000000002",
  customer: "00000000-0000-4000-8000-000000000003",
  item: "00000000-0000-4000-8000-000000000004",
  uom: "00000000-0000-4000-8000-000000000005",
  warehouse: "00000000-0000-4000-8000-000000000006",
};

function order(status: SalesOrderRecord["status"] = "CONFIRMED", quantity = 10): SalesOrderRecord {
  return {
    id: ids.order,
    tenantId: context.tenantId,
    orderNumber: "SO-1",
    customerId: ids.customer,
    partyId: "00000000-0000-4000-8000-000000000013",
    orderDate: "2026-06-21",
    status,
    currency: "INR",
    exchangeRate: 1,
    subtotalAmount: quantity,
    discountAmount: 0,
    taxAmount: 0,
    totalAmount: quantity,
    createdAt: now(),
    updatedAt: now(),
    lines: [{ id: ids.line, orderId: ids.order, lineNumber: 1, itemId: ids.item, itemName: "Stock Item", quantity, uomId: ids.uom, unitPrice: 1, discountPercent: 0, discountAmount: 0, taxRate: 0, taxAmount: 0, lineSubtotal: quantity, lineTotal: quantity, createdAt: now(), updatedAt: now() }],
  };
}

function item(isStockItem = true): Item {
  return { id: ids.item, tenantId: context.tenantId, itemNumber: "ITEM-1", name: "Stock Item", itemType: isStockItem ? "PRODUCT" : "SERVICE", baseUomId: ids.uom, isStockItem, isSalesItem: true, isPurchaseItem: false, isManufacturingItem: false, currency: "INR", status: "ACTIVE", tags: [], customFields: {}, createdAt: now(), updatedAt: now() };
}

function fakeSalesOrders(row = order()): SalesOrderRepository {
  return {
    async getSalesOrderById(tenantId: string, id: string) {
      return row.tenantId === tenantId && row.id === id ? row : undefined;
    },
  } as unknown as SalesOrderRepository;
}

function fakeMasterData(stockItem = true): MasterDataRepository {
  return {
    async getItemById(tenantId: string, id: string) {
      return tenantId === context.tenantId && id === ids.item ? item(stockItem) : undefined;
    },
  } as unknown as MasterDataRepository;
}

function fakeInventory(stock = 100, failOnIssue = false): InventoryStockRepository {
  let available = stock;
  const ledger: StockLedgerEntryRecord[] = [];
  return {
    async getWarehouseById(tenantId: string, id: string) {
      return tenantId === context.tenantId && id === ids.warehouse ? { id, tenantId, warehouseNumber: "WH-1", name: "Main", code: "MAIN", type: "MAIN", status: "ACTIVE", isDefault: true, createdAt: now(), updatedAt: now() } satisfies WarehouseRecord : undefined;
    },
    async getWarehouseBinById() {
      return undefined;
    },
    async getItemStockAvailability() {
      return { itemId: ids.item, totalOnHand: available, totalReserved: 0, totalAvailable: available, balances: [] };
    },
    async createStockLedgerEntry(input: Parameters<InventoryStockRepository["createStockLedgerEntry"]>[0]) {
      if (failOnIssue) throw new Error("stock issue failed");
      available -= input.quantity;
      const entry: StockLedgerEntryRecord = { id: `00000000-0000-4000-8000-00000000${String(7000 + ledger.length + 1).slice(-4)}`, tenantId: input.tenantId, entryNumber: `SLE-${ledger.length + 1}`, itemId: input.itemId, warehouseId: input.warehouseId, binId: input.binId, postingDate: input.postingDate ?? "2026-06-21", postingTime: "10:00:00", movementType: input.movementType, quantity: input.quantity, uomId: input.uomId!, referenceType: input.referenceType, referenceId: input.referenceId, remarks: input.remarks, createdAt: now() };
      ledger.push(entry);
      return entry;
    },
    async getStockBalance(): Promise<StockBalanceRecord | undefined> {
      return { id: "balance-1", tenantId: context.tenantId, itemId: ids.item, warehouseId: ids.warehouse, quantityOnHand: available, quantityReserved: 0, quantityAvailable: available, updatedAt: now() };
    },
  } as unknown as InventoryStockRepository;
}

function fakeDeliveryRepository(): DeliveryNoteRepository {
  const records = new Map<string, DeliveryNoteRecord>();
  const page = (rows: DeliveryNoteRecord[], request: DeliveryNoteListRequest) => ({ rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 });
  const active = (tenantId: string) => [...records.values()].filter((record) => record.tenantId === tenantId && !record.deletedAt);
  return {
    async createDeliveryNote(input: DeliveryNoteCreateInput, lines) {
      const id = `00000000-0000-4000-8000-00000000${String(8000 + records.size + 1).slice(-4)}`;
      const record: DeliveryNoteRecord = { id, tenantId: input.tenantId, deliveryNoteNumber: input.deliveryNoteNumber ?? `DN-${records.size + 1}`, salesOrderId: input.salesOrderId, customerId: input.customerId ?? ids.customer, partyId: input.partyId, deliveryDate: input.deliveryDate ?? "2026-06-21", status: "DRAFT", shippingAddressId: input.shippingAddressId, warehouseId: input.warehouseId, notes: input.notes, createdAt: now(), updatedAt: now(), lines: lines.map((line) => ({ ...line, deliveryNoteId: id })) };
      records.set(id, record);
      return record;
    },
    async createDeliveryNoteFromSalesOrder(input, lines) {
      return this.createDeliveryNote(input, lines);
    },
    async listDeliveryNotes(request) {
      let rows = active(request.tenantId);
      if (request.status) rows = rows.filter((row) => row.status === request.status);
      if (request.salesOrderId) rows = rows.filter((row) => row.salesOrderId === request.salesOrderId);
      return page(rows, request);
    },
    async getDeliveryNoteById(tenantId, id) {
      return active(tenantId).find((row) => row.id === id);
    },
    async getDeliveryNoteByNumber(tenantId, number) {
      return active(tenantId).find((row) => row.deliveryNoteNumber === number);
    },
    async getDeliveryNotesBySalesOrder(tenantId, salesOrderId) {
      return active(tenantId).filter((row) => row.salesOrderId === salesOrderId);
    },
    async updateDeliveryNote(tenantId, id, input: DeliveryNoteUpdateInput, lines) {
      const current = await this.getDeliveryNoteById(tenantId, id);
      if (!current || current.status !== "DRAFT") return undefined;
      const updated = { ...current, ...input, lines: lines?.map((line) => ({ ...line, deliveryNoteId: id })) ?? current.lines, updatedAt: now() };
      records.set(id, updated);
      return updated;
    },
    async softDeleteDeliveryNote(tenantId, id) {
      const current = await this.getDeliveryNoteById(tenantId, id);
      if (!current || current.status !== "DRAFT") return undefined;
      const deleted = { ...current, deletedAt: now(), updatedAt: now() };
      records.set(id, deleted);
      return deleted;
    },
    async postDeliveryNote(tenantId, id, input, stockLedgerEntryIdsByLineId) {
      const current = await this.getDeliveryNoteById(tenantId, id);
      if (!current || current.status !== "DRAFT") return undefined;
      const posted: DeliveryNoteRecord = { ...current, status: "POSTED", postingDate: input.postingDate ?? "2026-06-21", postedAt: now(), lines: current.lines.map((line) => ({ ...line, stockLedgerEntryId: stockLedgerEntryIdsByLineId.get(line.id) ?? line.stockLedgerEntryId })) };
      records.set(id, posted);
      return posted;
    },
    async cancelDraftDeliveryNote(tenantId, id) {
      const current = await this.getDeliveryNoteById(tenantId, id);
      if (!current || current.status !== "DRAFT") return undefined;
      const cancelled: DeliveryNoteRecord = { ...current, status: "CANCELLED", cancelledAt: now() };
      records.set(id, cancelled);
      return cancelled;
    },
    async getDeliveryNoteLines(tenantId, id) {
      return (await this.getDeliveryNoteById(tenantId, id))?.lines ?? [];
    },
    async replaceDraftDeliveryNoteLines(_tenantId, id, lines) {
      return lines.map((line) => ({ ...line, deliveryNoteId: id }));
    },
    async getSalesOrderLineDeliveredQuantities(tenantId, salesOrderId) {
      const posted = active(tenantId).filter((record) => record.salesOrderId === salesOrderId && record.status === "POSTED");
      const result = new Map<string, number>();
      for (const note of posted) for (const line of note.lines) result.set(line.salesOrderLineId, (result.get(line.salesOrderLineId) ?? 0) + line.quantity);
      return result;
    },
    async getSalesOrderDeliverySummary(tenantId, salesOrder) {
      const delivered = await this.getSalesOrderLineDeliveredQuantities(tenantId, salesOrder.id);
      const lines = salesOrder.lines.map((line) => ({ salesOrderLineId: line.id, lineNumber: line.lineNumber, itemId: line.itemId, itemName: line.itemName, orderedQuantity: line.quantity, deliveredQuantity: delivered.get(line.id) ?? 0, remainingQuantity: line.quantity - (delivered.get(line.id) ?? 0), uomId: line.uomId }));
      const deliveredQuantity = lines.reduce((sum, line) => sum + line.deliveredQuantity, 0);
      const remainingQuantity = lines.reduce((sum, line) => sum + line.remainingQuantity, 0);
      return { salesOrderId: salesOrder.id, orderNumber: salesOrder.orderNumber, fulfillmentStatus: deliveredQuantity <= 0 ? "NOT_DELIVERED" : remainingQuantity <= 0 ? "DELIVERED" : "PARTIALLY_DELIVERED", orderedQuantity: lines.reduce((sum, line) => sum + line.orderedQuantity, 0), deliveredQuantity, remainingQuantity, lines };
    },
    async getDeliveryStats(tenantId) {
      const rows = active(tenantId);
      const byStatus = { DRAFT: rows.filter((row) => row.status === "DRAFT").length, POSTED: rows.filter((row) => row.status === "POSTED").length, CANCELLED: rows.filter((row) => row.status === "CANCELLED").length } satisfies Record<DeliveryNoteStatus, number>;
      return { total: rows.length, draftCount: byStatus.DRAFT, postedCount: byStatus.POSTED, cancelledCount: byStatus.CANCELLED, deliveredOrdersCount: new Set(rows.filter((row) => row.status === "POSTED").map((row) => row.salesOrderId)).size, byStatus };
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

describe("sales delivery notes service", () => {
  it("creates delivery notes from confirmed orders and blocks invalid orders or lines", async () => {
    const service = createDeliveryNotesService(fakeDeliveryRepository(), fakeSalesOrders(order("CONFIRMED")), fakeMasterData(), fakeInventory());
    const note = await service.create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 4 }] }, context);
    expect(note.lines[0].remainingQuantityAfterDelivery).toBe(6);
    await expect(createDeliveryNotesService(fakeDeliveryRepository(), fakeSalesOrders(order("DRAFT")), fakeMasterData(), fakeInventory()).create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 1 }] }, context)).rejects.toThrow("CONFIRMED");
    await expect(createDeliveryNotesService(fakeDeliveryRepository(), fakeSalesOrders(order("CANCELLED")), fakeMasterData(), fakeInventory()).create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 1 }] }, context)).rejects.toThrow("CONFIRMED");
    await expect(service.create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: "00000000-0000-4000-8000-000000009999", quantity: 1 }] }, context)).rejects.toThrow("Sales order line");
    await expect(service.create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 11 }] }, context)).rejects.toThrow("exceed");
  });

  it("requires warehouse for stock items, checks availability, posts SALES_ISSUE, blocks posted edits/cancels, and allows draft cancel", async () => {
    await expect(createDeliveryNotesService(fakeDeliveryRepository(), fakeSalesOrders(), fakeMasterData(), fakeInventory()).create({ tenantId: context.tenantId, salesOrderId: ids.order, lines: [{ salesOrderLineId: ids.line, quantity: 1 }] }, context)).rejects.toThrow("Warehouse");
    const service = createDeliveryNotesService(fakeDeliveryRepository(), fakeSalesOrders(), fakeMasterData(), fakeInventory(3));
    const note = await service.create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 3 }] }, context);
    const posted = await service.post(context.tenantId, note.id, {}, context);
    expect(posted.status).toBe("POSTED");
    expect(posted.lines[0].stockLedgerEntryId).toBeDefined();
    await expect(service.update(context.tenantId, note.id, { notes: "blocked" }, context)).rejects.toThrow("DRAFT");
    await expect(service.cancel(context.tenantId, note.id, context)).rejects.toThrow("DRAFT");
    const draft = await service.create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 1 }] }, context);
    expect((await service.cancel(context.tenantId, draft.id, context)).status).toBe("CANCELLED");
    const failService = createDeliveryNotesService(fakeDeliveryRepository(), fakeSalesOrders(), fakeMasterData(), fakeInventory(1, true));
    const failingNote = await failService.create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 1 }] }, context);
    await expect(failService.post(context.tenantId, failingNote.id, {}, context)).rejects.toThrow("stock issue failed");
    expect((await failService.getById(context.tenantId, failingNote.id, context)).status).toBe("DRAFT");
  });

  it("calculates fulfillment summaries and excludes soft-deleted drafts from normal list", async () => {
    const service = createDeliveryNotesService(fakeDeliveryRepository(), fakeSalesOrders(), fakeMasterData(), fakeInventory());
    expect((await service.getSalesOrderDeliverySummary(context.tenantId, ids.order, context)).fulfillmentStatus).toBe("NOT_DELIVERED");
    const partial = await service.create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 4 }] }, context);
    await service.post(context.tenantId, partial.id, {}, context);
    expect((await service.getSalesOrderDeliverySummary(context.tenantId, ids.order, context)).fulfillmentStatus).toBe("PARTIALLY_DELIVERED");
    const rest = await service.create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 6 }] }, context);
    await service.post(context.tenantId, rest.id, {}, context);
    expect((await service.getSalesOrderDeliverySummary(context.tenantId, ids.order, context)).fulfillmentStatus).toBe("DELIVERED");
    const deleteService = createDeliveryNotesService(fakeDeliveryRepository(), fakeSalesOrders(), fakeMasterData(), fakeInventory());
    const deleted = await deleteService.create({ tenantId: context.tenantId, salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 1 }] }, context);
    await deleteService.softDelete(context.tenantId, deleted.id, context);
    expect((await deleteService.list({ tenantId: context.tenantId }, context)).rows.some((row) => row.id === deleted.id)).toBe(false);
  });
});

describe("sales delivery notes API routes", () => {
  it("serves delivery note and sales order fulfillment endpoints", async () => {
    const service = createDeliveryNotesService(fakeDeliveryRepository(), fakeSalesOrders(), fakeMasterData(), fakeInventory());
    server = createApiService({ deliveryNotes: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    const baseUrl = `http://127.0.0.1:${port}`;
    const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };
    const created = await fetch(`${baseUrl}/api/sales/delivery-notes`, { method: "POST", headers, body: JSON.stringify({ salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 2 }] }) }).then((response) => response.json() as Promise<DeliveryNoteRecord>);
    expect(await fetch(`${baseUrl}/api/sales/delivery-notes`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/delivery-notes/stats`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/delivery-notes/${created.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/delivery-notes/${created.id}/lines`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/delivery-notes/${created.id}`, { method: "PATCH", headers, body: JSON.stringify({ notes: "Updated", lines: [{ salesOrderLineId: ids.line, quantity: 2, warehouseId: ids.warehouse }] }) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/delivery-notes/${created.id}/post`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/${ids.order}/delivery-notes`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/${ids.order}/delivery-summary`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/${ids.order}/create-delivery-note`, { method: "POST", headers, body: JSON.stringify({ warehouseId: ids.warehouse }) }).then((response) => response.status)).toBe(201);
    const cancellable = await fetch(`${baseUrl}/api/sales/delivery-notes`, { method: "POST", headers, body: JSON.stringify({ salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 1 }] }) }).then((response) => response.json() as Promise<DeliveryNoteRecord>);
    expect(await fetch(`${baseUrl}/api/sales/delivery-notes/${cancellable.id}/cancel`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(200);
    const deletable = await fetch(`${baseUrl}/api/sales/delivery-notes`, { method: "POST", headers, body: JSON.stringify({ salesOrderId: ids.order, warehouseId: ids.warehouse, lines: [{ salesOrderLineId: ids.line, quantity: 1 }] }) }).then((response) => response.json() as Promise<DeliveryNoteRecord>);
    expect(await fetch(`${baseUrl}/api/sales/delivery-notes/${deletable.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
  });
});
