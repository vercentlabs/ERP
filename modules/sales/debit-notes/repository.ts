import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type {
  SalesDebitNoteCreateInput,
  SalesDebitNoteLineRecord,
  SalesDebitNoteListRequest,
  SalesDebitNoteRecord,
  SalesDebitNoteRepository,
  SalesDebitNoteStatus,
  SalesDebitNoteTotals,
  SalesDebitNoteUpdateInput,
} from "./types";

const noteTable = "sales_debit_notes";
const lineTable = "sales_debit_note_lines";

type NoteRow = {
  id: string; tenant_id: string; company_id: string | null; branch_id: string | null; debit_note_number: string; sales_invoice_id: string; customer_id: string; party_id: string | null;
  debit_note_date: Date | string; posting_date: Date | string | null; status: SalesDebitNoteStatus; accounting_status: SalesDebitNoteRecord["accountingStatus"]; journal_entry_id: string | null;
  subtotal_amount: string | number; taxable_amount: string | number; tax_amount: string | number; total_amount: string | number; reason: string | null; notes: string | null;
  posted_at: Date | string | null; cancelled_at: Date | string | null; created_at: Date | string; updated_at: Date | string; deleted_at: Date | string | null;
};
type LineRow = {
  id: string; tenant_id: string; debit_note_id: string; invoice_line_id: string | null; line_number: number; item_id: string; description: string | null; quantity: string | number; uom_id: string;
  unit_amount: string | number; taxable_amount: string | number; tax_rate: string | number; tax_amount: string | number; line_total: string | number; created_at: Date | string; updated_at: Date | string;
};

const toNullable = <T>(value: T | undefined | null) => value ?? null;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
const toIso = (value: Date | string | null | undefined) => (!value ? undefined : value instanceof Date ? value.toISOString() : value);
const toDate = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const money = (value: unknown) => Number(value ?? 0);
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const numberWithPrefix = (prefix: string, explicit?: string) => explicit ?? `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;

export function calculateSalesDebitNoteLine(input: Omit<SalesDebitNoteLineRecord, "taxableAmount" | "taxAmount" | "lineTotal">): SalesDebitNoteLineRecord {
  const taxableAmount = roundMoney(input.quantity * input.unitAmount);
  const taxAmount = roundMoney(taxableAmount * (input.taxRate / 100));
  return { ...input, taxableAmount, taxAmount, lineTotal: roundMoney(taxableAmount + taxAmount) };
}

export function calculateSalesDebitNoteTotals(lines: SalesDebitNoteLineRecord[]): SalesDebitNoteTotals {
  return {
    subtotalAmount: roundMoney(lines.reduce((sum, line) => sum + line.taxableAmount, 0)),
    taxableAmount: roundMoney(lines.reduce((sum, line) => sum + line.taxableAmount, 0)),
    taxAmount: roundMoney(lines.reduce((sum, line) => sum + line.taxAmount, 0)),
    totalAmount: roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0)),
  };
}

function mapLine(row: LineRow): SalesDebitNoteLineRecord {
  return {
    id: row.id,
    debitNoteId: row.debit_note_id,
    salesInvoiceLineId: row.invoice_line_id ?? undefined,
    lineNumber: Number(row.line_number),
    itemId: row.item_id,
    itemName: "",
    description: row.description ?? undefined,
    quantity: Number(row.quantity),
    uomId: row.uom_id,
    unitAmount: Number(row.unit_amount),
    taxableAmount: money(row.taxable_amount),
    taxRate: Number(row.tax_rate),
    taxAmount: money(row.tax_amount),
    lineTotal: money(row.line_total),
    createdAt: toIso(row.created_at)!,
    updatedAt: toIso(row.updated_at)!,
  };
}

function mapNote(row: NoteRow, lines: SalesDebitNoteLineRecord[] = []): SalesDebitNoteRecord {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
    debitNoteNumber: row.debit_note_number,
    salesInvoiceId: row.sales_invoice_id,
    customerId: row.customer_id,
    partyId: row.party_id ?? undefined,
    debitNoteDate: toDate(row.debit_note_date)!,
    postingDate: toDate(row.posting_date),
    status: row.status,
    accountingStatus: row.accounting_status ?? "NOT_POSTED",
    journalEntryId: row.journal_entry_id ?? undefined,
    subtotalAmount: money(row.subtotal_amount),
    taxableAmount: money(row.taxable_amount),
    taxAmount: money(row.tax_amount),
    totalAmount: money(row.total_amount),
    reason: row.reason ?? undefined,
    notes: row.notes ?? undefined,
    postedAt: toIso(row.posted_at),
    cancelledAt: toIso(row.cancelled_at),
    createdAt: toIso(row.created_at)!,
    updatedAt: toIso(row.updated_at)!,
    deletedAt: toIso(row.deleted_at),
    lines,
  };
}

function applyScope(query: Knex.QueryBuilder, request: Pick<SalesDebitNoteListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyFilters(query: Knex.QueryBuilder, request: SalesDebitNoteListRequest) {
  applyScope(query, request).whereNull("deleted_at");
  if (request.status) query.where("status", request.status);
  if (request.accountingStatus) query.where("accounting_status", request.accountingStatus);
  if (request.customerId) query.where("customer_id", request.customerId);
  if (request.salesInvoiceId) query.where("sales_invoice_id", request.salesInvoiceId);
  if (request.debitNoteDateFrom) query.where("debit_note_date", ">=", request.debitNoteDateFrom);
  if (request.debitNoteDateTo) query.where("debit_note_date", "<=", request.debitNoteDateTo);
  if (request.search) query.andWhere((builder) => builder.whereILike("debit_note_number", `%${request.search}%`).orWhereILike("reason", `%${request.search}%`).orWhereILike("notes", `%${request.search}%`));
  return query;
}

async function attachLines(connection: Knex, rows: NoteRow[]) {
  if (rows.length === 0) return [];
  const lines = await connection<LineRow>(lineTable).whereIn("debit_note_id", rows.map((row) => row.id)).orderBy("line_number", "asc");
  const grouped = new Map<string, SalesDebitNoteLineRecord[]>();
  for (const line of lines.map(mapLine)) grouped.set(line.debitNoteId, [...(grouped.get(line.debitNoteId) ?? []), line]);
  return rows.map((row) => mapNote(row, grouped.get(row.id) ?? []));
}

async function insertLines(connection: Knex, tenantId: string, noteId: string, lines: SalesDebitNoteLineRecord[]) {
  if (lines.length === 0) return;
  await connection<LineRow>(lineTable).insert(lines.map((line) => ({
    id: line.id,
    tenant_id: tenantId,
    debit_note_id: noteId,
    invoice_line_id: toNullable(line.salesInvoiceLineId),
    line_number: line.lineNumber,
    item_id: line.itemId,
    description: toNullable(line.description || line.itemName),
    quantity: line.quantity,
    uom_id: line.uomId,
    unit_amount: line.unitAmount,
    taxable_amount: line.taxableAmount,
    tax_rate: line.taxRate,
    tax_amount: line.taxAmount,
    line_total: line.lineTotal,
  })));
}

export function createSalesDebitNotesRepository(database?: Knex): SalesDebitNoteRepository {
  const db = () => database ?? getTenantKnex();
  return {
    calculateSalesDebitNoteTotals,
    async createSalesDebitNote(input, lines, totals) {
      const connection = db();
      const created = await connection.transaction(async (trx) => {
        const [row] = await trx<NoteRow>(noteTable).insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          debit_note_number: numberWithPrefix("SDN", input.debitNoteNumber),
          sales_invoice_id: input.salesInvoiceId,
          customer_id: input.customerId,
          party_id: toNullable(input.partyId),
          debit_note_date: input.debitNoteDate ?? new Date().toISOString().slice(0, 10),
          posting_date: toNullable(input.postingDate),
          status: "DRAFT",
          accounting_status: "NOT_POSTED",
          subtotal_amount: totals.subtotalAmount,
          taxable_amount: totals.taxableAmount,
          tax_amount: totals.taxAmount,
          total_amount: totals.totalAmount,
          reason: toNullable(input.reason),
          notes: toNullable(input.notes),
        }).returning("*");
        await insertLines(trx, input.tenantId, row.id, lines.map((line) => ({ ...line, debitNoteId: row.id })));
        return row;
      });
      return (await attachLines(connection, [created]))[0];
    },
    async listSalesDebitNotes(request) {
      const page = request.page ?? 1, pageSize = request.pageSize ?? 25, connection = db();
      const [rows, countRows] = await Promise.all([
        applyFilters(connection<NoteRow>(noteTable).select("*"), request).orderBy(request.sortBy ?? "created_at", request.sortDirection ?? "desc").limit(pageSize).offset((page - 1) * pageSize),
        applyFilters(connection<NoteRow>(noteTable).count<{ count: string }[]>({ count: "*" }), request),
      ]);
      return { rows: await attachLines(connection, rows), total: Number(countRows[0]?.count ?? 0), page, pageSize };
    },
    async getSalesDebitNoteById(tenantId, id) {
      const connection = db();
      const row = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getSalesDebitNoteByNumber(tenantId, debitNoteNumber, companyId) {
      const query = db()<NoteRow>(noteTable).where({ tenant_id: tenantId, debit_note_number: debitNoteNumber }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? (await attachLines(db(), [row]))[0] : undefined;
    },
    async getSalesDebitNotesByInvoice(tenantId, salesInvoiceId) {
      const connection = db();
      const rows = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, sales_invoice_id: salesInvoiceId }).whereNull("deleted_at").orderBy("created_at", "desc");
      return attachLines(connection, rows);
    },
    async updateSalesDebitNote(tenantId, id, input, lines, totals) {
      const connection = db();
      const updated = await connection.transaction(async (trx) => {
        const [row] = await trx<NoteRow>(noteTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update(compact({
          company_id: input.companyId,
          branch_id: input.branchId,
          debit_note_date: input.debitNoteDate,
          posting_date: input.postingDate,
          subtotal_amount: totals?.subtotalAmount,
          taxable_amount: totals?.taxableAmount,
          tax_amount: totals?.taxAmount,
          total_amount: totals?.totalAmount,
          reason: input.reason,
          notes: input.notes,
          updated_at: trx.fn.now(),
        })).returning("*");
        if (!row) return undefined;
        if (lines) {
          await trx<LineRow>(lineTable).where({ tenant_id: tenantId, debit_note_id: id }).delete();
          await insertLines(trx, tenantId, id, lines);
        }
        return row;
      });
      return updated ? (await attachLines(connection, [updated]))[0] : undefined;
    },
    async softDeleteSalesDebitNote(tenantId, id) {
      const connection = db();
      const [row] = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async postSalesDebitNote(tenantId, id, journalEntryId, postingDate) {
      const connection = db();
      const [row] = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, id, status: "DRAFT", accounting_status: "NOT_POSTED" }).whereNull("deleted_at").update(compact({ status: "POSTED", accounting_status: "POSTED", journal_entry_id: journalEntryId, posting_date: postingDate, posted_at: connection.fn.now(), updated_at: connection.fn.now() })).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async cancelDraftSalesDebitNote(tenantId, id) {
      const connection = db();
      const [row] = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ status: "CANCELLED", cancelled_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getSalesDebitNoteLines(tenantId, id) {
      return (await db()<LineRow>(lineTable).where({ tenant_id: tenantId, debit_note_id: id }).orderBy("line_number", "asc")).map(mapLine);
    },
    async getSalesDebitNoteStats(tenantId, filters = {}) {
      const rows = await applyFilters(db()<NoteRow>(noteTable).select("*"), { tenantId, ...filters }).orderBy("created_at", "desc");
      const byStatus = { DRAFT: { count: 0, value: 0 }, POSTED: { count: 0, value: 0 }, CANCELLED: { count: 0, value: 0 } };
      for (const row of rows) {
        const status = row.status as SalesDebitNoteStatus;
        byStatus[status].count += 1;
        byStatus[status].value += money(row.total_amount);
      }
      return { total: rows.length, draftValue: byStatus.DRAFT.value, postedValue: byStatus.POSTED.value, cancelledValue: byStatus.CANCELLED.value, byStatus };
    },
  };
}

export const salesDebitNotesRepository = createSalesDebitNotesRepository();
export const debitNotesRepository = salesDebitNotesRepository;
