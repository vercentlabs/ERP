import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import type { OpportunityRecord, OpportunityRepository } from "../../../modules/crm/opportunities/types";
import type { Customer, Item, MasterDataRepository, Uom } from "../../../modules/master-data/foundation/types";
import type { QuotationRecord, QuotationRepository } from "../../../modules/sales/quotations/types";
import { createSalesOrdersService } from "../../../modules/sales/sales-orders/service";
import type {
  SalesOrderCreateInput,
  SalesOrderLineRecord,
  SalesOrderListRequest,
  SalesOrderRecord,
  SalesOrderRepository,
  SalesOrderStatus,
  SalesOrderStatusChangeInput,
  SalesOrderStats,
  SalesOrderTotals,
  SalesOrderUpdateInput,
} from "../../../modules/sales/sales-orders/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const now = () => new Date().toISOString();
const statuses: SalesOrderStatus[] = ["DRAFT", "CONFIRMED", "CANCELLED", "CLOSED"];

function customer(id = "customer-1"): Customer {
  return { id, tenantId: context.tenantId, partyId: `party-${id}`, customerNumber: `CUST-${id}`, creditLimit: 0, currency: "INR", status: "ACTIVE", createdAt: now(), updatedAt: now() };
}

function item(id = "item-1"): Item {
  return {
    id,
    tenantId: context.tenantId,
    itemNumber: `ITEM-${id}`,
    name: `Item ${id}`,
    itemType: "PRODUCT",
    baseUomId: "uom-1",
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
  };
}

function uom(id = "uom-1"): Uom {
  return { id, tenantId: context.tenantId, code: "PCS", name: "Pieces", precision: 0, isBase: true, status: "ACTIVE", createdAt: now(), updatedAt: now() };
}

function fakeMasterData(options: { customers?: Customer[]; items?: Item[]; uoms?: Uom[] } = {}): MasterDataRepository {
  const customers = options.customers ?? [customer()];
  const items = options.items ?? [item()];
  const uoms = options.uoms ?? [uom()];
  return {
    async getCustomerById(tenantId: string, id: string) {
      return customers.find((row) => row.tenantId === tenantId && row.id === id);
    },
    async getItemById(tenantId: string, id: string) {
      return items.find((row) => row.tenantId === tenantId && row.id === id);
    },
    async getUomById(tenantId: string, id: string) {
      return uoms.find((row) => row.tenantId === tenantId && row.id === id);
    },
  } as unknown as MasterDataRepository;
}

function fakeOpportunities(rows: Pick<OpportunityRecord, "id" | "tenantId" | "customerId">[] = []): OpportunityRepository {
  return {
    async getOpportunityById(tenantId: string, id: string) {
      return rows.find((row) => row.tenantId === tenantId && row.id === id) as OpportunityRecord | undefined;
    },
  } as unknown as OpportunityRepository;
}

function quotation(status: QuotationRecord["status"] = "ACCEPTED", customerId = "customer-1"): QuotationRecord {
  return {
    id: "quotation-1",
    tenantId: context.tenantId,
    quotationNumber: "QUO-1",
    customerId,
    partyId: `party-${customerId}`,
    opportunityId: "opportunity-1",
    quoteDate: "2026-06-20",
    validUntil: "2026-12-31",
    status,
    currency: "INR",
    exchangeRate: 1,
    subtotalAmount: 200,
    discountAmount: 20,
    taxAmount: 32.4,
    totalAmount: 212.4,
    createdAt: now(),
    updatedAt: now(),
    lines: [
      {
        id: "quotation-line-1",
        quotationId: "quotation-1",
        lineNumber: 1,
        itemId: "item-1",
        itemName: "Item 1",
        quantity: 2,
        uomId: "uom-1",
        unitPrice: 100,
        discountPercent: 10,
        discountAmount: 20,
        taxRate: 18,
        taxAmount: 32.4,
        lineSubtotal: 200,
        lineTotal: 212.4,
        createdAt: now(),
        updatedAt: now(),
      },
    ],
  };
}

function fakeQuotations(rows: QuotationRecord[] = [quotation()]): QuotationRepository {
  return {
    async getQuotationById(tenantId: string, id: string) {
      return rows.find((row) => row.tenantId === tenantId && row.id === id);
    },
  } as unknown as QuotationRepository;
}

function totals(lines: SalesOrderLineRecord[]): SalesOrderTotals {
  return {
    subtotalAmount: lines.reduce((sum, line) => sum + line.lineSubtotal, 0),
    discountAmount: lines.reduce((sum, line) => sum + line.discountAmount, 0),
    taxAmount: lines.reduce((sum, line) => sum + line.taxAmount, 0),
    totalAmount: lines.reduce((sum, line) => sum + line.lineTotal, 0),
  };
}

function fakeOrderRepository(): SalesOrderRepository {
  const records = new Map<string, SalesOrderRecord>();
  const active = (tenantId: string) => [...records.values()].filter((record) => record.tenantId === tenantId && !record.deletedAt);
  const page = (rows: SalesOrderRecord[], request: SalesOrderListRequest) => ({ rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 });
  return {
    calculateSalesOrderTotals: totals,
    async createSalesOrder(input: SalesOrderCreateInput, lines, calculatedTotals) {
      const id = `order-${records.size + 1}`;
      const record: SalesOrderRecord = {
        id,
        tenantId: input.tenantId,
        orderNumber: input.orderNumber ?? `SO-${records.size + 1}`,
        quotationId: input.quotationId,
        opportunityId: input.opportunityId,
        customerId: input.customerId,
        partyId: input.partyId,
        orderDate: input.orderDate ?? now().slice(0, 10),
        expectedDeliveryDate: input.expectedDeliveryDate,
        status: input.status ?? "DRAFT",
        currency: input.currency ?? "INR",
        exchangeRate: input.exchangeRate ?? 1,
        subtotalAmount: calculatedTotals.subtotalAmount,
        discountAmount: calculatedTotals.discountAmount,
        taxAmount: calculatedTotals.taxAmount,
        totalAmount: calculatedTotals.totalAmount,
        terms: input.terms,
        notes: input.notes,
        createdAt: now(),
        updatedAt: now(),
        lines: lines.map((line) => ({ ...line, orderId: id })),
      };
      records.set(id, record);
      return record;
    },
    async createSalesOrderFromQuotation(input, lines, calculatedTotals) {
      return this.createSalesOrder(input, lines, calculatedTotals);
    },
    async listSalesOrders(request) {
      let rows = active(request.tenantId);
      if (request.status) rows = rows.filter((row) => row.status === request.status);
      if (request.customerId) rows = rows.filter((row) => row.customerId === request.customerId);
      if (request.quotationId) rows = rows.filter((row) => row.quotationId === request.quotationId);
      if (request.search) rows = rows.filter((row) => row.orderNumber.toLowerCase().includes(request.search!.toLowerCase()) || row.notes?.toLowerCase().includes(request.search!.toLowerCase()));
      return page(rows, request);
    },
    async getSalesOrderById(tenantId, id) {
      return active(tenantId).find((row) => row.id === id);
    },
    async getSalesOrderByNumber(tenantId, orderNumber) {
      return active(tenantId).find((row) => row.orderNumber === orderNumber);
    },
    async getSalesOrderByQuotationId(tenantId, quotationId) {
      return active(tenantId).find((row) => row.quotationId === quotationId);
    },
    async updateSalesOrder(tenantId, id, input: SalesOrderUpdateInput, lines, calculatedTotals) {
      const current = await this.getSalesOrderById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, lines: lines?.map((line) => ({ ...line, orderId: id })) ?? current.lines, totalAmount: calculatedTotals?.totalAmount ?? current.totalAmount, updatedAt: now() };
      records.set(id, updated);
      return updated;
    },
    async softDeleteSalesOrder(tenantId, id) {
      const current = await this.getSalesOrderById(tenantId, id);
      if (!current) return undefined;
      const deleted = { ...current, deletedAt: now(), updatedAt: now() };
      records.set(id, deleted);
      return deleted;
    },
    async changeSalesOrderStatus(tenantId, id, input: SalesOrderStatusChangeInput) {
      const current = await this.getSalesOrderById(tenantId, id);
      if (!current) return undefined;
      const timestamp = now();
      const updated = { ...current, status: input.status, confirmedAt: input.status === "CONFIRMED" ? timestamp : undefined, cancelledAt: input.status === "CANCELLED" ? timestamp : undefined, closedAt: input.status === "CLOSED" ? timestamp : undefined, updatedAt: timestamp };
      records.set(id, updated);
      return updated;
    },
    async getSalesOrderStats(tenantId): Promise<SalesOrderStats> {
      const rows = active(tenantId);
      const byStatus = Object.fromEntries(statuses.map((status) => [status, { count: rows.filter((row) => row.status === status).length, value: rows.filter((row) => row.status === status).reduce((sum, row) => sum + row.totalAmount, 0) }])) as SalesOrderStats["byStatus"];
      return { total: rows.length, draftValue: byStatus.DRAFT.value, confirmedValue: byStatus.CONFIRMED.value, closedValue: byStatus.CLOSED.value, cancelledValue: byStatus.CANCELLED.value, byStatus };
    },
    async getSalesOrderLines(tenantId, orderId) {
      return (await this.getSalesOrderById(tenantId, orderId))?.lines ?? [];
    },
    async replaceSalesOrderLines(_tenantId, orderId, lines) {
      return lines.map((line) => ({ ...line, orderId }));
    },
  };
}

const validInput = {
  tenantId: context.tenantId,
  customerId: "customer-1",
  lines: [{ itemId: "item-1", uomId: "uom-1", quantity: 2, unitPrice: 100, discountPercent: 10, taxRate: 18 }],
};

let server: Server | undefined;
afterEach(async () => {
  await new Promise<void>((resolve, reject) => {
    if (!server) return resolve();
    server.close((error) => (error ? reject(error) : resolve()));
    server = undefined;
  });
});

describe("sales orders service", () => {
  it("creates orders and calculates totals", async () => {
    const service = createSalesOrdersService(fakeOrderRepository(), fakeMasterData(), fakeOpportunities(), fakeQuotations());
    const order = await service.create(validInput, context);
    expect(order.partyId).toBe("party-customer-1");
    expect(order.totalAmount).toBe(212.4);
  });

  it("rejects missing lines, invalid customer, invalid item, and opportunity mismatch", async () => {
    await expect(createSalesOrdersService(fakeOrderRepository(), fakeMasterData(), fakeOpportunities(), fakeQuotations()).create({ ...validInput, lines: [] }, context)).rejects.toThrow();
    await expect(createSalesOrdersService(fakeOrderRepository(), fakeMasterData({ customers: [] }), fakeOpportunities(), fakeQuotations()).create(validInput, context)).rejects.toThrow("Customer");
    await expect(createSalesOrdersService(fakeOrderRepository(), fakeMasterData({ items: [] }), fakeOpportunities(), fakeQuotations()).create(validInput, context)).rejects.toThrow("Item");
    await expect(createSalesOrdersService(fakeOrderRepository(), fakeMasterData(), fakeOpportunities([{ id: "opportunity-1", tenantId: context.tenantId, customerId: "other" }]), fakeQuotations()).create({ ...validInput, opportunityId: "opportunity-1" }, context)).rejects.toThrow("must match");
  });

  it("converts accepted quotations and blocks non-accepted or duplicate conversions", async () => {
    const service = createSalesOrdersService(fakeOrderRepository(), fakeMasterData(), fakeOpportunities(), fakeQuotations([quotation("ACCEPTED")]));
    const order = await service.createFromQuotation(context.tenantId, "quotation-1", {}, context);
    expect(order.quotationId).toBe("quotation-1");
    expect(order.lines[0].quotationLineId).toBe("quotation-line-1");
    await expect(service.createFromQuotation(context.tenantId, "quotation-1", {}, context)).rejects.toThrow("already");
    await expect(createSalesOrdersService(fakeOrderRepository(), fakeMasterData(), fakeOpportunities(), fakeQuotations([quotation("SENT")])).createFromQuotation(context.tenantId, "quotation-1", {}, context)).rejects.toThrow("ACCEPTED");
  });

  it("lists, filters, changes statuses, blocks invalid transitions, terminal edits, and soft deletes", async () => {
    const service = createSalesOrdersService(fakeOrderRepository(), fakeMasterData(), fakeOpportunities(), fakeQuotations());
    const draft = await service.create({ ...validInput, notes: "Enterprise order" }, context);
    expect((await service.list({ tenantId: context.tenantId, search: "Enterprise" }, context)).total).toBe(1);
    expect((await service.list({ tenantId: context.tenantId, status: "DRAFT" }, context)).total).toBe(1);
    const confirmed = await service.changeStatus(context.tenantId, draft.id, { status: "CONFIRMED" }, context);
    expect(confirmed.confirmedAt).toBeDefined();
    await expect(service.update(context.tenantId, draft.id, { notes: "blocked" }, context)).rejects.toThrow("cannot be edited");
    const closed = await service.changeStatus(context.tenantId, draft.id, { status: "CLOSED" }, context);
    expect(closed.closedAt).toBeDefined();
    await expect(service.changeStatus(context.tenantId, draft.id, { status: "CANCELLED" }, context)).rejects.toThrow("not allowed");
    const cancelDraft = await service.create(validInput, context);
    expect((await service.changeStatus(context.tenantId, cancelDraft.id, { status: "CANCELLED" }, context)).cancelledAt).toBeDefined();
    expect((await service.stats({ tenantId: context.tenantId }, context)).closedValue).toBeGreaterThan(0);
    const deleted = await service.create(validInput, context);
    await service.softDelete(context.tenantId, deleted.id, context);
    await expect(service.getById(context.tenantId, deleted.id, context)).rejects.toThrow("not found");
  });
});

describe("sales orders API routes", () => {
  it("serves all order endpoints, sales-orders alias, and quotation conversion endpoint", async () => {
    const orderService = createSalesOrdersService(fakeOrderRepository(), fakeMasterData(), fakeOpportunities(), fakeQuotations());
    server = createApiService({ salesOrders: orderService });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    const baseUrl = `http://127.0.0.1:${port}`;
    const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };
    const created = await fetch(`${baseUrl}/api/sales/orders`, { method: "POST", headers, body: JSON.stringify({ customerId: "customer-1", lines: validInput.lines }) }).then((response) => response.json() as Promise<SalesOrderRecord>);
    expect(created.orderNumber).toContain("SO");
    expect(await fetch(`${baseUrl}/api/sales/orders`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/sales-orders`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/stats`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/${created.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/${created.id}/lines`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/${created.id}`, { method: "PATCH", headers, body: JSON.stringify({ notes: "Updated" }) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/${created.id}/status`, { method: "POST", headers, body: JSON.stringify({ status: "CONFIRMED" }) }).then((response) => response.status)).toBe(200);
    const deletable = await fetch(`${baseUrl}/api/sales/orders`, { method: "POST", headers, body: JSON.stringify({ customerId: "customer-1", lines: validInput.lines }) }).then((response) => response.json() as Promise<SalesOrderRecord>);
    expect(await fetch(`${baseUrl}/api/sales/orders/${deletable.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/quotations/quotation-1/convert-to-order`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(201);
    expect(await fetch(`${baseUrl}/api/sales/quotations/quotation-1/linked-order`, { headers }).then((response) => response.status)).toBe(200);
  });
});
