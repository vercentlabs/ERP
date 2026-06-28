import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type {
  CustomerReceiptAllocationRecord,
  CustomerReceiptCreateInput,
  CustomerReceiptListRequest,
  CustomerReceiptRecord,
  CustomerReceiptRepository,
  CustomerReceiptStats,
  CustomerReceiptStatus,
  CustomerReceiptUpdateInput,
} from "./types";

const receiptTable = "finance_customer_receipts";
const allocationTable = "finance_customer_receipt_allocations";

type ReceiptRow = {
  id: string; tenant_id: string; company_id: string | null; branch_id: string | null; receipt_number: string; customer_id: string; party_id: string | null;
  receipt_date: Date | string; posting_date: Date | string | null; status: CustomerReceiptStatus; payment_method: CustomerReceiptRecord["paymentMethod"]; deposit_account_id: string;
  reference_number: string | null; reference_date: Date | string | null; amount_received: string | number; allocated_amount: string | number; currency: string; exchange_rate: string | number;
  journal_entry_id: string | null; posted_at: Date | string | null; cancelled_at: Date | string | null; notes: string | null; created_at: Date | string; updated_at: Date | string; deleted_at: Date | string | null;
};
type AllocationRow = {
  id: string; tenant_id: string; receipt_id: string; sales_invoice_id: string; invoice_number: string; invoice_total_amount: string | number;
  invoice_amount_due_before: string | number; allocated_amount: string | number; invoice_amount_due_after: string | number; created_at: Date | string; updated_at: Date | string;
};

const toNullable = <T>(value: T | undefined | null) => value ?? null;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
const toIso = (value: Date | string | null | undefined) => (!value ? undefined : value instanceof Date ? value.toISOString() : value);
const toDate = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const money = (value: unknown) => Number(value ?? 0);
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const numberWithPrefix = (prefix: string, explicit?: string) => explicit ?? `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;

function mapAllocation(row: AllocationRow): CustomerReceiptAllocationRecord {
  return {
    id: row.id,
    receiptId: row.receipt_id,
    salesInvoiceId: row.sales_invoice_id,
    invoiceNumber: row.invoice_number,
    invoiceTotalAmount: money(row.invoice_total_amount),
    invoiceAmountDueBefore: money(row.invoice_amount_due_before),
    allocatedAmount: money(row.allocated_amount),
    invoiceAmountDueAfter: money(row.invoice_amount_due_after),
    createdAt: toIso(row.created_at)!,
    updatedAt: toIso(row.updated_at)!,
  };
}

function mapReceipt(row: ReceiptRow, allocations: CustomerReceiptAllocationRecord[] = []): CustomerReceiptRecord {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
    receiptNumber: row.receipt_number,
    customerId: row.customer_id,
    partyId: row.party_id ?? undefined,
    receiptDate: toDate(row.receipt_date)!,
    postingDate: toDate(row.posting_date),
    status: row.status,
    paymentMethod: row.payment_method,
    depositAccountId: row.deposit_account_id,
    referenceNumber: row.reference_number ?? undefined,
    referenceDate: toDate(row.reference_date),
    amountReceived: money(row.amount_received),
    allocatedAmount: money(row.allocated_amount),
    currency: row.currency,
    exchangeRate: money(row.exchange_rate),
    journalEntryId: row.journal_entry_id ?? undefined,
    postedAt: toIso(row.posted_at),
    cancelledAt: toIso(row.cancelled_at),
    notes: row.notes ?? undefined,
    createdAt: toIso(row.created_at)!,
    updatedAt: toIso(row.updated_at)!,
    deletedAt: toIso(row.deleted_at),
    allocations,
  };
}

function applyScope(query: Knex.QueryBuilder, request: Pick<CustomerReceiptListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyFilters(query: Knex.QueryBuilder, request: CustomerReceiptListRequest) {
  applyScope(query, request).whereNull("deleted_at");
  if (request.status) query.where("status", request.status);
  if (request.customerId) query.where("customer_id", request.customerId);
  if (request.paymentMethod) query.where("payment_method", request.paymentMethod);
  if (request.receiptDateFrom) query.where("receipt_date", ">=", request.receiptDateFrom);
  if (request.receiptDateTo) query.where("receipt_date", "<=", request.receiptDateTo);
  if (request.postingDateFrom) query.where("posting_date", ">=", request.postingDateFrom);
  if (request.postingDateTo) query.where("posting_date", "<=", request.postingDateTo);
  if (request.search) query.andWhere((builder) => builder.whereILike("receipt_number", `%${request.search}%`).orWhereILike("reference_number", `%${request.search}%`).orWhereILike("notes", `%${request.search}%`));
  return query;
}

async function attachAllocations(connection: Knex, rows: ReceiptRow[]) {
  if (rows.length === 0) return [];
  const allocations = await connection<AllocationRow>(allocationTable).whereIn("receipt_id", rows.map((row) => row.id)).orderBy("created_at", "asc");
  const grouped = new Map<string, CustomerReceiptAllocationRecord[]>();
  for (const allocation of allocations.map(mapAllocation)) grouped.set(allocation.receiptId, [...(grouped.get(allocation.receiptId) ?? []), allocation]);
  return rows.map((row) => mapReceipt(row, grouped.get(row.id) ?? []));
}

async function insertAllocations(connection: Knex, tenantId: string, receiptId: string, allocations: CustomerReceiptAllocationRecord[]) {
  if (allocations.length === 0) return;
  await connection<AllocationRow>(allocationTable).insert(allocations.map((allocation) => ({
    id: allocation.id,
    tenant_id: tenantId,
    receipt_id: receiptId,
    sales_invoice_id: allocation.salesInvoiceId,
    invoice_number: allocation.invoiceNumber,
    invoice_total_amount: allocation.invoiceTotalAmount,
    invoice_amount_due_before: allocation.invoiceAmountDueBefore,
    allocated_amount: allocation.allocatedAmount,
    invoice_amount_due_after: allocation.invoiceAmountDueAfter,
  })));
}

export function createCustomerReceiptsRepository(database?: Knex): CustomerReceiptRepository {
  const db = () => database ?? getTenantKnex();
  return {
    async createCustomerReceipt(input, allocations) {
      const connection = db();
      const allocatedAmount = roundMoney(allocations.reduce((sum, allocation) => sum + allocation.allocatedAmount, 0));
      const created = await connection.transaction(async (trx) => {
        const [row] = await trx<ReceiptRow>(receiptTable).insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          receipt_number: numberWithPrefix("RCPT", input.receiptNumber),
          customer_id: input.customerId,
          party_id: toNullable(input.partyId),
          receipt_date: input.receiptDate ?? new Date().toISOString().slice(0, 10),
          posting_date: toNullable(input.postingDate),
          status: "DRAFT",
          payment_method: input.paymentMethod,
          deposit_account_id: input.depositAccountId,
          reference_number: toNullable(input.referenceNumber),
          reference_date: toNullable(input.referenceDate),
          amount_received: input.amountReceived,
          allocated_amount: allocatedAmount,
          currency: input.currency ?? "INR",
          exchange_rate: input.exchangeRate ?? 1,
          notes: toNullable(input.notes),
        }).returning("*");
        await insertAllocations(trx, input.tenantId, row.id, allocations.map((allocation) => ({ ...allocation, receiptId: row.id })));
        return row;
      });
      return (await attachAllocations(connection, [created]))[0];
    },
    async listCustomerReceipts(request) {
      const page = request.page ?? 1, pageSize = request.pageSize ?? 25, connection = db();
      const [rows, countRows] = await Promise.all([
        applyFilters(connection<ReceiptRow>(receiptTable).select("*"), request).orderBy(request.sortBy ?? "created_at", request.sortDirection ?? "desc").limit(pageSize).offset((page - 1) * pageSize),
        applyFilters(connection<ReceiptRow>(receiptTable).count<{ count: string }[]>({ count: "*" }), request),
      ]);
      return { rows: await attachAllocations(connection, rows), total: Number(countRows[0]?.count ?? 0), page, pageSize };
    },
    async getCustomerReceiptById(tenantId, id) {
      const connection = db(); const row = await connection<ReceiptRow>(receiptTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? (await attachAllocations(connection, [row]))[0] : undefined;
    },
    async getCustomerReceiptByNumber(tenantId, receiptNumber, companyId) {
      const connection = db(); const query = connection<ReceiptRow>(receiptTable).where({ tenant_id: tenantId, receipt_number: receiptNumber }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? (await attachAllocations(connection, [row]))[0] : undefined;
    },
    async updateCustomerReceipt(tenantId, id, input, allocations) {
      const connection = db();
      const updated = await connection.transaction(async (trx) => {
        const [row] = await trx<ReceiptRow>(receiptTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update(compact({
          company_id: input.companyId,
          branch_id: input.branchId,
          customer_id: input.customerId,
          party_id: input.partyId,
          receipt_date: input.receiptDate,
          posting_date: input.postingDate,
          payment_method: input.paymentMethod,
          deposit_account_id: input.depositAccountId,
          reference_number: input.referenceNumber,
          reference_date: input.referenceDate,
          amount_received: input.amountReceived,
          allocated_amount: allocations ? roundMoney(allocations.reduce((sum, allocation) => sum + allocation.allocatedAmount, 0)) : undefined,
          currency: input.currency,
          exchange_rate: input.exchangeRate,
          notes: input.notes,
          updated_at: trx.fn.now(),
        })).returning("*");
        if (!row) return undefined;
        if (allocations) {
          await trx<AllocationRow>(allocationTable).where({ tenant_id: tenantId, receipt_id: id }).delete();
          await insertAllocations(trx, tenantId, id, allocations);
        }
        return row;
      });
      return updated ? (await attachAllocations(connection, [updated]))[0] : undefined;
    },
    async softDeleteCustomerReceipt(tenantId, id) {
      const connection = db(); const [row] = await connection<ReceiptRow>(receiptTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachAllocations(connection, [row]))[0] : undefined;
    },
    async postCustomerReceipt(tenantId, id, journalEntryId, postingDate) {
      const connection = db();
      const update = compact({ status: "POSTED", journal_entry_id: journalEntryId, posting_date: postingDate, posted_at: connection.fn.now(), updated_at: connection.fn.now() });
      const [row] = await connection<ReceiptRow>(receiptTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update(update).returning("*");
      return row ? (await attachAllocations(connection, [row]))[0] : undefined;
    },
    async cancelDraftCustomerReceipt(tenantId, id) {
      const connection = db(); const [row] = await connection<ReceiptRow>(receiptTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ status: "CANCELLED", cancelled_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachAllocations(connection, [row]))[0] : undefined;
    },
    async getCustomerReceiptAllocations(tenantId, id) {
      return (await db()<AllocationRow>(allocationTable).where({ tenant_id: tenantId, receipt_id: id }).orderBy("created_at", "asc")).map(mapAllocation);
    },
    async replaceDraftCustomerReceiptAllocations(tenantId, receiptId, allocations) {
      const connection = db();
      await connection.transaction(async (trx) => {
        await trx<AllocationRow>(allocationTable).where({ tenant_id: tenantId, receipt_id: receiptId }).delete();
        await insertAllocations(trx, tenantId, receiptId, allocations);
      });
      return this.getCustomerReceiptAllocations(tenantId, receiptId);
    },
    async getCustomerReceiptsByInvoice(tenantId, salesInvoiceId) {
      const connection = db();
      const rows = await connection<ReceiptRow>(`${receiptTable} as r`).join(`${allocationTable} as a`, "a.receipt_id", "r.id").where("r.tenant_id", tenantId).where("a.sales_invoice_id", salesInvoiceId).whereNull("r.deleted_at").select("r.*").orderBy("r.created_at", "desc");
      return attachAllocations(connection, rows);
    },
    async getCustomerReceiptsByCustomer(tenantId, customerId) {
      const connection = db(); const rows = await connection<ReceiptRow>(receiptTable).where({ tenant_id: tenantId, customer_id: customerId }).whereNull("deleted_at").orderBy("created_at", "desc");
      return attachAllocations(connection, rows);
    },
    async getCustomerReceiptStats(tenantId, filters = {}): Promise<CustomerReceiptStats> {
      const rows: ReceiptRow[] = await applyFilters(db()<ReceiptRow>(receiptTable).select("*"), { tenantId, ...filters }).orderBy("created_at", "desc");
      const byStatus: CustomerReceiptStats["byStatus"] = { DRAFT: { count: 0, value: 0 }, POSTED: { count: 0, value: 0 }, CANCELLED: { count: 0, value: 0 } };
      for (const row of rows) { byStatus[row.status].count += 1; byStatus[row.status].value += money(row.amount_received); }
      return { total: rows.length, draftValue: byStatus.DRAFT.value, postedValue: byStatus.POSTED.value, cancelledValue: byStatus.CANCELLED.value, byStatus };
    },
  };
}

export const customerReceiptsRepository = createCustomerReceiptsRepository();
