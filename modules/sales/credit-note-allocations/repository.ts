import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type { CreditNoteAllocationListRequest, CreditNoteAllocationRecord, CreditNoteAllocationRepository, CreditNoteAllocationTargetType } from "./types";

const table = "sales_credit_note_allocations";

type AllocationRow = {
  id: string; tenant_id: string; company_id: string | null; branch_id: string | null; credit_note_id: string; target_type: CreditNoteAllocationTargetType; target_id: string; customer_id: string;
  allocation_date: Date | string; amount: string | number; notes: string | null; created_at: Date | string; updated_at: Date | string;
};

const toNullable = <T>(value: T | undefined | null) => value ?? null;
const toIso = (value: Date | string | null | undefined) => (!value ? undefined : value instanceof Date ? value.toISOString() : value);
const toDate = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const money = (value: unknown) => Number(value ?? 0);

function mapRow(row: AllocationRow): CreditNoteAllocationRecord {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
    creditNoteId: row.credit_note_id,
    targetType: row.target_type,
    targetId: row.target_id,
    customerId: row.customer_id,
    allocationDate: toDate(row.allocation_date)!,
    amount: money(row.amount),
    notes: row.notes ?? undefined,
    createdAt: toIso(row.created_at)!,
    updatedAt: toIso(row.updated_at)!,
  };
}

function applyFilters(query: Knex.QueryBuilder, request: CreditNoteAllocationListRequest) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  if (request.creditNoteId) query.where("credit_note_id", request.creditNoteId);
  if (request.targetType) query.where("target_type", request.targetType);
  if (request.targetId) query.where("target_id", request.targetId);
  if (request.customerId) query.where("customer_id", request.customerId);
  return query;
}

export function createCreditNoteAllocationsRepository(database?: Knex): CreditNoteAllocationRepository {
  const db = () => database ?? getTenantKnex();
  return {
    async createCreditNoteAllocation(input) {
      const [row] = await db()<AllocationRow>(table).insert({
        id: randomUUID(),
        tenant_id: input.tenantId,
        company_id: toNullable(input.companyId),
        branch_id: toNullable(input.branchId),
        credit_note_id: input.creditNoteId,
        target_type: input.targetType,
        target_id: input.targetId,
        customer_id: input.customerId,
        allocation_date: input.allocationDate ?? new Date().toISOString().slice(0, 10),
        amount: input.amount,
        notes: toNullable(input.notes),
      }).returning("*");
      return mapRow(row);
    },
    async listCreditNoteAllocations(request) {
      const page = request.page ?? 1, pageSize = request.pageSize ?? 25, connection = db();
      const [rows, countRows] = await Promise.all([
        applyFilters(connection<AllocationRow>(table).select("*"), request).orderBy("created_at", "desc").limit(pageSize).offset((page - 1) * pageSize),
        applyFilters(connection<AllocationRow>(table).count<{ count: string }[]>({ count: "*" }), request),
      ]);
      return { rows: rows.map(mapRow), total: Number(countRows[0]?.count ?? 0), page, pageSize };
    },
    async getCreditNoteAllocations(tenantId, creditNoteId) {
      return (await db()<AllocationRow>(table).where({ tenant_id: tenantId, credit_note_id: creditNoteId }).orderBy("created_at", "desc")).map(mapRow);
    },
    async getInvoiceCreditAllocations(tenantId, salesInvoiceId) {
      return (await db()<AllocationRow>(table).where({ tenant_id: tenantId, target_type: "SALES_INVOICE", target_id: salesInvoiceId }).orderBy("created_at", "desc")).map(mapRow);
    },
    async getDebitNoteCreditAllocations(tenantId, salesDebitNoteId) {
      return (await db()<AllocationRow>(table).where({ tenant_id: tenantId, target_type: "SALES_DEBIT_NOTE", target_id: salesDebitNoteId }).orderBy("created_at", "desc")).map(mapRow);
    },
  };
}

export const creditNoteAllocationsRepository = createCreditNoteAllocationsRepository();
