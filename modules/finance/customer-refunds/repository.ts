import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type {
  CustomerRefundAllocationRecord,
  CustomerRefundCreateInput,
  CustomerRefundListRequest,
  CustomerRefundRecord,
  CustomerRefundRepository,
  CustomerRefundStats,
  CustomerRefundStatus,
  CustomerRefundUpdateInput,
} from "./types";

const refundTable = "finance_customer_refunds";
const allocationTable = "finance_customer_refund_allocations";

type RefundRow = {
  id: string; tenant_id: string; company_id: string | null; branch_id: string | null; refund_number: string; customer_id: string; party_id: string | null;
  refund_date: Date | string; posting_date: Date | string | null; status: CustomerRefundStatus; payment_method: CustomerRefundRecord["paymentMethod"]; deposit_account_id: string;
  total_amount: string | number; reference_number: string | null; journal_entry_id: string | null; posted_at: Date | string | null; cancelled_at: Date | string | null;
  notes: string | null; created_at: Date | string; updated_at: Date | string; deleted_at: Date | string | null;
};
type AllocationRow = {
  id: string; tenant_id: string; refund_id: string; credit_note_id: string; amount: string | number; created_at: Date | string; updated_at: Date | string;
};

const toNullable = <T>(value: T | undefined | null) => value ?? null;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
const toIso = (value: Date | string | null | undefined) => (!value ? undefined : value instanceof Date ? value.toISOString() : value);
const toDate = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const money = (value: unknown) => Number(value ?? 0);
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const numberWithPrefix = (prefix: string, explicit?: string) => explicit ?? `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;

function mapAllocation(row: AllocationRow): CustomerRefundAllocationRecord {
  return { id: row.id, refundId: row.refund_id, creditNoteId: row.credit_note_id, amount: money(row.amount), createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)! };
}

function mapRefund(row: RefundRow, allocations: CustomerRefundAllocationRecord[] = []): CustomerRefundRecord {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
    refundNumber: row.refund_number,
    customerId: row.customer_id,
    partyId: row.party_id ?? undefined,
    refundDate: toDate(row.refund_date)!,
    postingDate: toDate(row.posting_date),
    status: row.status,
    paymentMethod: row.payment_method,
    depositAccountId: row.deposit_account_id,
    totalAmount: money(row.total_amount),
    referenceNumber: row.reference_number ?? undefined,
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

function applyScope(query: Knex.QueryBuilder, request: Pick<CustomerRefundListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyFilters(query: Knex.QueryBuilder, request: CustomerRefundListRequest) {
  applyScope(query, request).whereNull("deleted_at");
  if (request.status) query.where("status", request.status);
  if (request.customerId) query.where("customer_id", request.customerId);
  if (request.paymentMethod) query.where("payment_method", request.paymentMethod);
  if (request.refundDateFrom) query.where("refund_date", ">=", request.refundDateFrom);
  if (request.refundDateTo) query.where("refund_date", "<=", request.refundDateTo);
  if (request.postingDateFrom) query.where("posting_date", ">=", request.postingDateFrom);
  if (request.postingDateTo) query.where("posting_date", "<=", request.postingDateTo);
  if (request.search) query.andWhere((builder) => builder.whereILike("refund_number", `%${request.search}%`).orWhereILike("reference_number", `%${request.search}%`).orWhereILike("notes", `%${request.search}%`));
  return query;
}

async function attachAllocations(connection: Knex, rows: RefundRow[]) {
  if (rows.length === 0) return [];
  const allocations = await connection<AllocationRow>(allocationTable).whereIn("refund_id", rows.map((row) => row.id)).orderBy("created_at", "asc");
  const grouped = new Map<string, CustomerRefundAllocationRecord[]>();
  for (const allocation of allocations.map(mapAllocation)) grouped.set(allocation.refundId, [...(grouped.get(allocation.refundId) ?? []), allocation]);
  return rows.map((row) => mapRefund(row, grouped.get(row.id) ?? []));
}

async function insertAllocations(connection: Knex, tenantId: string, refundId: string, allocations: CustomerRefundAllocationRecord[]) {
  if (allocations.length === 0) return;
  await connection<AllocationRow>(allocationTable).insert(allocations.map((allocation) => ({ id: allocation.id, tenant_id: tenantId, refund_id: refundId, credit_note_id: allocation.creditNoteId, amount: allocation.amount })));
}

export function createCustomerRefundsRepository(database?: Knex): CustomerRefundRepository {
  const db = () => database ?? getTenantKnex();
  return {
    async createCustomerRefund(input, allocations) {
      const connection = db();
      const created = await connection.transaction(async (trx) => {
        const [row] = await trx<RefundRow>(refundTable).insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          refund_number: numberWithPrefix("REF", input.refundNumber),
          customer_id: input.customerId,
          party_id: toNullable(input.partyId),
          refund_date: input.refundDate ?? new Date().toISOString().slice(0, 10),
          posting_date: toNullable(input.postingDate),
          status: "DRAFT",
          payment_method: input.paymentMethod,
          deposit_account_id: input.depositAccountId,
          total_amount: input.totalAmount,
          reference_number: toNullable(input.referenceNumber),
          notes: toNullable(input.notes),
        }).returning("*");
        await insertAllocations(trx, input.tenantId, row.id, allocations.map((allocation) => ({ ...allocation, refundId: row.id })));
        return row;
      });
      return (await attachAllocations(connection, [created]))[0];
    },
    async listCustomerRefunds(request) {
      const page = request.page ?? 1, pageSize = request.pageSize ?? 25, connection = db();
      const [rows, countRows] = await Promise.all([
        applyFilters(connection<RefundRow>(refundTable).select("*"), request).orderBy(request.sortBy ?? "created_at", request.sortDirection ?? "desc").limit(pageSize).offset((page - 1) * pageSize),
        applyFilters(connection<RefundRow>(refundTable).count<{ count: string }[]>({ count: "*" }), request),
      ]);
      return { rows: await attachAllocations(connection, rows), total: Number(countRows[0]?.count ?? 0), page, pageSize };
    },
    async getCustomerRefundById(tenantId, id) {
      const connection = db();
      const row = await connection<RefundRow>(refundTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? (await attachAllocations(connection, [row]))[0] : undefined;
    },
    async getCustomerRefundByNumber(tenantId, refundNumber, companyId) {
      const connection = db();
      const query = connection<RefundRow>(refundTable).where({ tenant_id: tenantId, refund_number: refundNumber }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? (await attachAllocations(connection, [row]))[0] : undefined;
    },
    async updateCustomerRefund(tenantId, id, input, allocations) {
      const connection = db();
      const updated = await connection.transaction(async (trx) => {
        const [row] = await trx<RefundRow>(refundTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update(compact({
          company_id: input.companyId,
          branch_id: input.branchId,
          customer_id: input.customerId,
          party_id: input.partyId,
          refund_date: input.refundDate,
          posting_date: input.postingDate,
          payment_method: input.paymentMethod,
          deposit_account_id: input.depositAccountId,
          total_amount: input.totalAmount,
          reference_number: input.referenceNumber,
          notes: input.notes,
          updated_at: trx.fn.now(),
        })).returning("*");
        if (!row) return undefined;
        if (allocations) {
          await trx<AllocationRow>(allocationTable).where({ tenant_id: tenantId, refund_id: id }).delete();
          await insertAllocations(trx, tenantId, id, allocations);
        }
        return row;
      });
      return updated ? (await attachAllocations(connection, [updated]))[0] : undefined;
    },
    async softDeleteCustomerRefund(tenantId, id) {
      const connection = db();
      const [row] = await connection<RefundRow>(refundTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachAllocations(connection, [row]))[0] : undefined;
    },
    async postCustomerRefund(tenantId, id, journalEntryId, postingDate) {
      const connection = db();
      const [row] = await connection<RefundRow>(refundTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update(compact({ status: "POSTED", journal_entry_id: journalEntryId, posting_date: postingDate, posted_at: connection.fn.now(), updated_at: connection.fn.now() })).returning("*");
      return row ? (await attachAllocations(connection, [row]))[0] : undefined;
    },
    async cancelDraftCustomerRefund(tenantId, id) {
      const connection = db();
      const [row] = await connection<RefundRow>(refundTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ status: "CANCELLED", cancelled_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachAllocations(connection, [row]))[0] : undefined;
    },
    async getCustomerRefundAllocations(tenantId, id) {
      return (await db()<AllocationRow>(allocationTable).where({ tenant_id: tenantId, refund_id: id }).orderBy("created_at", "asc")).map(mapAllocation);
    },
    async getCustomerRefundsByCreditNote(tenantId, creditNoteId) {
      const connection = db();
      const rows = await connection<RefundRow>(`${refundTable} as r`).join(`${allocationTable} as a`, "a.refund_id", "r.id").where("r.tenant_id", tenantId).where("a.credit_note_id", creditNoteId).whereNull("r.deleted_at").select("r.*").orderBy("r.created_at", "desc");
      return attachAllocations(connection, rows);
    },
    async getCustomerRefundStats(tenantId, filters = {}): Promise<CustomerRefundStats> {
      const rows: RefundRow[] = await applyFilters(db()<RefundRow>(refundTable).select("*"), { tenantId, ...filters }).orderBy("created_at", "desc");
      const byStatus: CustomerRefundStats["byStatus"] = { DRAFT: { count: 0, value: 0 }, POSTED: { count: 0, value: 0 }, CANCELLED: { count: 0, value: 0 } };
      for (const row of rows) { byStatus[row.status].count += 1; byStatus[row.status].value += money(row.total_amount); }
      return { total: rows.length, draftValue: byStatus.DRAFT.value, postedValue: byStatus.POSTED.value, cancelledValue: byStatus.CANCELLED.value, refundedValue: byStatus.POSTED.value, byStatus };
    },
  };
}

export const customerRefundsRepository = createCustomerRefundsRepository();
