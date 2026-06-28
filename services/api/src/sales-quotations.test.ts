import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import type { OpportunityRecord, OpportunityRepository } from "../../../modules/crm/opportunities/types";
import type { Customer, Item, MasterDataRepository, Uom } from "../../../modules/master-data/foundation/types";
import { createQuotationsService } from "../../../modules/sales/quotations/service";
import type {
  QuotationCreateInput,
  QuotationLineRecord,
  QuotationListRequest,
  QuotationRecord,
  QuotationRepository,
  QuotationStatus,
  QuotationStatusChangeInput,
  QuotationStats,
  QuotationTotals,
  QuotationUpdateInput,
} from "../../../modules/sales/quotations/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const timestamp = () => new Date().toISOString();
const statuses: QuotationStatus[] = ["DRAFT", "SENT", "ACCEPTED", "REJECTED", "EXPIRED", "CANCELLED"];

function customer(id = "customer-1"): Customer {
  return {
    id,
    tenantId: context.tenantId,
    partyId: `party-${id}`,
    customerNumber: `CUST-${id}`,
    creditLimit: 0,
    currency: "INR",
    status: "ACTIVE",
    createdAt: timestamp(),
    updatedAt: timestamp(),
  };
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
    sellingPrice: 100,
    currency: "INR",
    status: "ACTIVE",
    tags: [],
    customFields: {},
    createdAt: timestamp(),
    updatedAt: timestamp(),
  };
}

function uom(id = "uom-1"): Uom {
  return { id, tenantId: context.tenantId, code: "PCS", name: "Pieces", precision: 0, isBase: true, status: "ACTIVE", createdAt: timestamp(), updatedAt: timestamp() };
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

function totals(lines: QuotationLineRecord[]): QuotationTotals {
  return {
    subtotalAmount: lines.reduce((sum, line) => sum + line.lineSubtotal, 0),
    discountAmount: lines.reduce((sum, line) => sum + line.discountAmount, 0),
    taxAmount: lines.reduce((sum, line) => sum + line.taxAmount, 0),
    totalAmount: lines.reduce((sum, line) => sum + line.lineTotal, 0),
  };
}

function fakeQuotationRepository(): QuotationRepository {
  const records = new Map<string, QuotationRecord>();
  const active = (tenantId: string) => [...records.values()].filter((record) => record.tenantId === tenantId && !record.deletedAt);
  const page = (rows: QuotationRecord[], request: QuotationListRequest) => ({
    rows: rows.slice(((request.page ?? 1) - 1) * (request.pageSize ?? 25), (request.page ?? 1) * (request.pageSize ?? 25)),
    total: rows.length,
    page: request.page ?? 1,
    pageSize: request.pageSize ?? 25,
  });

  return {
    calculateQuotationTotals: totals,
    async createQuotation(input: QuotationCreateInput, lines, calculatedTotals) {
      const now = timestamp();
      const id = `quotation-${records.size + 1}`;
      const record: QuotationRecord = {
        id,
        tenantId: input.tenantId,
        companyId: input.companyId,
        branchId: input.branchId,
        quotationNumber: input.quotationNumber ?? `QUO-${records.size + 1}`,
        customerId: input.customerId,
        partyId: input.partyId,
        opportunityId: input.opportunityId,
        quoteDate: input.quoteDate ?? now.slice(0, 10),
        validUntil: input.validUntil,
        status: input.status ?? "DRAFT",
        currency: input.currency ?? "INR",
        exchangeRate: input.exchangeRate ?? 1,
        billingAddressId: input.billingAddressId,
        shippingAddressId: input.shippingAddressId,
        subtotalAmount: calculatedTotals.subtotalAmount,
        discountAmount: calculatedTotals.discountAmount,
        taxAmount: calculatedTotals.taxAmount,
        totalAmount: calculatedTotals.totalAmount,
        terms: input.terms,
        notes: input.notes,
        ownerUserId: input.ownerUserId,
        assignedTeamId: input.assignedTeamId,
        createdAt: now,
        updatedAt: now,
        lines: lines.map((line) => ({ ...line, quotationId: id })),
      };
      records.set(id, record);
      return record;
    },
    async listQuotations(request) {
      let rows = active(request.tenantId);
      if (request.status) rows = rows.filter((row) => row.status === request.status);
      if (request.customerId) rows = rows.filter((row) => row.customerId === request.customerId);
      if (request.opportunityId) rows = rows.filter((row) => row.opportunityId === request.opportunityId);
      if (request.search) rows = rows.filter((row) => row.quotationNumber.toLowerCase().includes(request.search!.toLowerCase()) || row.notes?.toLowerCase().includes(request.search!.toLowerCase()));
      return page(rows, request);
    },
    async getQuotationById(tenantId, id) {
      return active(tenantId).find((row) => row.id === id);
    },
    async getQuotationByNumber(tenantId, quotationNumber) {
      return active(tenantId).find((row) => row.quotationNumber === quotationNumber);
    },
    async updateQuotation(tenantId, id, input: QuotationUpdateInput, lines, calculatedTotals) {
      const current = await this.getQuotationById(tenantId, id);
      if (!current) return undefined;
      const updated = {
        ...current,
        ...input,
        lines: lines?.map((line) => ({ ...line, quotationId: id })) ?? current.lines,
        subtotalAmount: calculatedTotals?.subtotalAmount ?? current.subtotalAmount,
        discountAmount: calculatedTotals?.discountAmount ?? current.discountAmount,
        taxAmount: calculatedTotals?.taxAmount ?? current.taxAmount,
        totalAmount: calculatedTotals?.totalAmount ?? current.totalAmount,
        updatedAt: timestamp(),
      };
      records.set(id, updated);
      return updated;
    },
    async softDeleteQuotation(tenantId, id) {
      const current = await this.getQuotationById(tenantId, id);
      if (!current) return undefined;
      const deleted = { ...current, deletedAt: timestamp(), updatedAt: timestamp() };
      records.set(id, deleted);
      return deleted;
    },
    async changeQuotationStatus(tenantId, id, input: QuotationStatusChangeInput) {
      const current = await this.getQuotationById(tenantId, id);
      if (!current) return undefined;
      const now = timestamp();
      const updated = {
        ...current,
        status: input.status,
        rejectionReason: input.status === "REJECTED" ? input.rejectionReason : undefined,
        acceptedAt: input.status === "ACCEPTED" ? now : undefined,
        rejectedAt: input.status === "REJECTED" ? now : undefined,
        cancelledAt: input.status === "CANCELLED" ? now : undefined,
        updatedAt: now,
      };
      records.set(id, updated);
      return updated;
    },
    async getQuotationStats(tenantId): Promise<QuotationStats> {
      const rows = active(tenantId);
      const byStatus = Object.fromEntries(
        statuses.map((status) => [status, { count: rows.filter((row) => row.status === status).length, value: rows.filter((row) => row.status === status).reduce((sum, row) => sum + row.totalAmount, 0) }]),
      ) as QuotationStats["byStatus"];
      return {
        total: rows.length,
        draftValue: byStatus.DRAFT.value,
        sentValue: byStatus.SENT.value,
        acceptedValue: byStatus.ACCEPTED.value,
        rejectedExpiredValue: byStatus.REJECTED.value + byStatus.EXPIRED.value,
        byStatus,
      };
    },
    async getQuotationLines(tenantId, quotationId) {
      return (await this.getQuotationById(tenantId, quotationId))?.lines ?? [];
    },
    async replaceQuotationLines(_tenantId, quotationId, lines) {
      return lines.map((line) => ({ ...line, quotationId }));
    },
  };
}

const validInput = {
  tenantId: context.tenantId,
  customerId: "customer-1",
  validUntil: "2026-12-31",
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

describe("sales quotations service", () => {
  it("creates quotations with valid customer, item, UOM, and server-calculated totals", async () => {
    const service = createQuotationsService(fakeQuotationRepository(), fakeMasterData(), fakeOpportunities());
    const quotation = await service.create(validInput, context);
    expect(quotation.partyId).toBe("party-customer-1");
    expect(quotation.subtotalAmount).toBe(200);
    expect(quotation.discountAmount).toBe(20);
    expect(quotation.taxAmount).toBe(32.4);
    expect(quotation.totalAmount).toBe(212.4);
  });

  it("rejects missing lines, invalid customer, invalid item, and opportunity customer mismatch", async () => {
    await expect(createQuotationsService(fakeQuotationRepository(), fakeMasterData(), fakeOpportunities()).create({ ...validInput, lines: [] }, context)).rejects.toThrow();
    await expect(createQuotationsService(fakeQuotationRepository(), fakeMasterData({ customers: [] }), fakeOpportunities()).create(validInput, context)).rejects.toThrow("Customer");
    await expect(createQuotationsService(fakeQuotationRepository(), fakeMasterData({ items: [] }), fakeOpportunities()).create(validInput, context)).rejects.toThrow("Item");
    await expect(
      createQuotationsService(fakeQuotationRepository(), fakeMasterData(), fakeOpportunities([{ id: "opportunity-1", tenantId: context.tenantId, customerId: "other-customer" }])).create(
        { ...validInput, opportunityId: "opportunity-1" },
        context,
      ),
    ).rejects.toThrow("must match");
  });

  it("lists, searches, filters, changes statuses, blocks invalid transitions and terminal edits, and soft deletes", async () => {
    const service = createQuotationsService(fakeQuotationRepository(), fakeMasterData(), fakeOpportunities());
    const draft = await service.create({ ...validInput, notes: "Enterprise quote" }, context);
    expect((await service.list({ tenantId: context.tenantId, search: "Enterprise" }, context)).total).toBe(1);
    expect((await service.list({ tenantId: context.tenantId, status: "DRAFT" }, context)).total).toBe(1);
    const sent = await service.changeStatus(context.tenantId, draft.id, { status: "SENT" }, context);
    expect(sent.status).toBe("SENT");
    await expect(service.changeStatus(context.tenantId, sent.id, { status: "CANCELLED" }, context)).resolves.toMatchObject({ status: "CANCELLED" });
    await expect(service.update(context.tenantId, sent.id, { notes: "blocked" }, context)).rejects.toThrow("Terminal");

    const acceptedCandidate = await service.create(validInput, context);
    await service.changeStatus(context.tenantId, acceptedCandidate.id, { status: "SENT" }, context);
    const accepted = await service.changeStatus(context.tenantId, acceptedCandidate.id, { status: "ACCEPTED" }, context);
    expect(accepted.acceptedAt).toBeDefined();
    await expect(service.changeStatus(context.tenantId, accepted.id, { status: "REJECTED" }, context)).rejects.toThrow("not allowed");

    const rejectedCandidate = await service.create(validInput, context);
    await service.changeStatus(context.tenantId, rejectedCandidate.id, { status: "SENT" }, context);
    expect((await service.changeStatus(context.tenantId, rejectedCandidate.id, { status: "REJECTED", rejectionReason: "Price" }, context)).rejectionReason).toBe("Price");

    const expiredCandidate = await service.create(validInput, context);
    await service.changeStatus(context.tenantId, expiredCandidate.id, { status: "SENT" }, context);
    expect((await service.changeStatus(context.tenantId, expiredCandidate.id, { status: "EXPIRED" }, context)).status).toBe("EXPIRED");
    expect((await service.stats({ tenantId: context.tenantId }, context)).acceptedValue).toBeGreaterThan(0);

    const deletedCandidate = await service.create(validInput, context);
    await service.softDelete(context.tenantId, deletedCandidate.id, context);
    expect((await service.getLines(context.tenantId, accepted.id, context)).length).toBe(1);
  });
});

describe("sales quotations API routes", () => {
  it("serves all quotation endpoints and quotes alias", async () => {
    const service = createQuotationsService(fakeQuotationRepository(), fakeMasterData(), fakeOpportunities());
    server = createApiService({ quotations: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    const baseUrl = `http://127.0.0.1:${port}`;
    const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };

    const created = await fetch(`${baseUrl}/api/sales/quotations`, {
      method: "POST",
      headers,
      body: JSON.stringify({ customerId: "customer-1", validUntil: "2026-12-31", lines: validInput.lines }),
    }).then((response) => response.json() as Promise<QuotationRecord>);

    expect(created.quotationNumber).toContain("QUO");
    expect(await fetch(`${baseUrl}/api/sales/quotations`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/quotes`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/quotations/stats`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/quotations/${created.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/quotations/${created.id}/lines`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/quotations/${created.id}`, { method: "PATCH", headers, body: JSON.stringify({ notes: "Updated" }) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/quotations/${created.id}/status`, { method: "POST", headers, body: JSON.stringify({ status: "SENT" }) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/quotations/${created.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
  });
});
