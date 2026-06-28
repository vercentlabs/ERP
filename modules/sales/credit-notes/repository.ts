import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type {
  SalesCreditNoteCreateInput,
  SalesCreditNoteLineRecord,
  SalesCreditNoteListRequest,
  SalesCreditNoteRecord,
  SalesCreditNoteRepository,
  SalesCreditNoteStatus,
  SalesCreditNoteTotals,
  SalesCreditNoteUpdateInput,
} from "./types";

const noteTable = "sales_credit_notes";
const lineTable = "sales_credit_note_lines";

type NoteRow = {
  id: string; tenant_id: string; company_id: string | null; branch_id: string | null; credit_note_number: string; sales_invoice_id: string; customer_id: string; party_id: string | null;
  credit_note_date: Date | string; posting_date: Date | string | null; status: SalesCreditNoteStatus; reason: string | null; return_to_stock: boolean; warehouse_id: string | null;
  currency: string; exchange_rate: string | number; subtotal_amount: string | number; discount_amount: string | number; taxable_amount: string | number; tax_amount: string | number; total_amount: string | number;
  journal_entry_id: string | null; posted_at: Date | string | null; cancelled_at: Date | string | null; notes: string | null; created_at: Date | string; updated_at: Date | string; deleted_at: Date | string | null;
};
type LineRow = {
  id: string; tenant_id: string; credit_note_id: string; sales_invoice_line_id: string | null; line_number: number; item_id: string; item_name: string; description: string | null; quantity: string | number; uom_id: string;
  unit_price: string | number; discount_percent: string | number; discount_amount: string | number; taxable_amount: string | number; tax_rate: string | number; tax_amount: string | number; line_subtotal: string | number; line_total: string | number;
  hsn_sac_code: string | null; created_at: Date | string; updated_at: Date | string;
};

const toNullable = <T>(value: T | undefined | null) => value ?? null;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
const toIso = (value: Date | string | null | undefined) => (!value ? undefined : value instanceof Date ? value.toISOString() : value);
const toDate = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const money = (value: unknown) => Number(value ?? 0);
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const numberWithPrefix = (prefix: string, explicit?: string) => explicit ?? `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;

export function calculateSalesCreditNoteLine(input: Omit<SalesCreditNoteLineRecord, "discountAmount" | "taxableAmount" | "taxAmount" | "lineSubtotal" | "lineTotal">): SalesCreditNoteLineRecord {
  const lineSubtotal = roundMoney(input.quantity * input.unitPrice);
  const discountAmount = roundMoney(lineSubtotal * (input.discountPercent / 100));
  const taxableAmount = roundMoney(lineSubtotal - discountAmount);
  const taxAmount = roundMoney(taxableAmount * (input.taxRate / 100));
  return { ...input, discountAmount, taxableAmount, taxAmount, lineSubtotal, lineTotal: roundMoney(taxableAmount + taxAmount) };
}

export function calculateSalesCreditNoteTotals(lines: SalesCreditNoteLineRecord[]): SalesCreditNoteTotals {
  return {
    subtotalAmount: roundMoney(lines.reduce((sum, line) => sum + line.lineSubtotal, 0)),
    discountAmount: roundMoney(lines.reduce((sum, line) => sum + line.discountAmount, 0)),
    taxableAmount: roundMoney(lines.reduce((sum, line) => sum + line.taxableAmount, 0)),
    taxAmount: roundMoney(lines.reduce((sum, line) => sum + line.taxAmount, 0)),
    totalAmount: roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0)),
  };
}

function mapLine(row: LineRow): SalesCreditNoteLineRecord {
  return {
    id: row.id, creditNoteId: row.credit_note_id, salesInvoiceLineId: row.sales_invoice_line_id ?? undefined, lineNumber: Number(row.line_number), itemId: row.item_id, itemName: row.item_name,
    description: row.description ?? undefined, quantity: Number(row.quantity), uomId: row.uom_id, unitPrice: Number(row.unit_price), discountPercent: Number(row.discount_percent), discountAmount: money(row.discount_amount),
    taxableAmount: money(row.taxable_amount), taxRate: Number(row.tax_rate), taxAmount: money(row.tax_amount), lineSubtotal: money(row.line_subtotal), lineTotal: money(row.line_total), hsnSacCode: row.hsn_sac_code ?? undefined,
    createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!,
  };
}

function mapNote(row: NoteRow, lines: SalesCreditNoteLineRecord[] = []): SalesCreditNoteRecord {
  return {
    id: row.id, tenantId: row.tenant_id, companyId: row.company_id ?? undefined, branchId: row.branch_id ?? undefined, creditNoteNumber: row.credit_note_number, salesInvoiceId: row.sales_invoice_id,
    customerId: row.customer_id, partyId: row.party_id ?? undefined, creditNoteDate: toDate(row.credit_note_date)!, postingDate: toDate(row.posting_date), status: row.status, reason: row.reason ?? undefined,
    returnToStock: row.return_to_stock, warehouseId: row.warehouse_id ?? undefined, currency: row.currency, exchangeRate: money(row.exchange_rate), subtotalAmount: money(row.subtotal_amount), discountAmount: money(row.discount_amount),
    taxableAmount: money(row.taxable_amount), taxAmount: money(row.tax_amount), totalAmount: money(row.total_amount), journalEntryId: row.journal_entry_id ?? undefined, postedAt: toIso(row.posted_at),
    cancelledAt: toIso(row.cancelled_at), notes: row.notes ?? undefined, createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!, deletedAt: toIso(row.deleted_at), lines,
  };
}

function applyScope(query: Knex.QueryBuilder, request: Pick<SalesCreditNoteListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyFilters(query: Knex.QueryBuilder, request: SalesCreditNoteListRequest) {
  applyScope(query, request).whereNull("deleted_at");
  if (request.status) query.where("status", request.status);
  if (request.customerId) query.where("customer_id", request.customerId);
  if (request.salesInvoiceId) query.where("sales_invoice_id", request.salesInvoiceId);
  if (request.creditNoteDateFrom) query.where("credit_note_date", ">=", request.creditNoteDateFrom);
  if (request.creditNoteDateTo) query.where("credit_note_date", "<=", request.creditNoteDateTo);
  if (request.search) query.andWhere((builder) => builder.whereILike("credit_note_number", `%${request.search}%`).orWhereILike("reason", `%${request.search}%`).orWhereILike("notes", `%${request.search}%`));
  return query;
}

async function attachLines(connection: Knex, rows: NoteRow[]) {
  if (rows.length === 0) return [];
  const lines = await connection<LineRow>(lineTable).whereIn("credit_note_id", rows.map((row) => row.id)).orderBy("line_number", "asc");
  const grouped = new Map<string, SalesCreditNoteLineRecord[]>();
  for (const line of lines.map(mapLine)) grouped.set(line.creditNoteId, [...(grouped.get(line.creditNoteId) ?? []), line]);
  return rows.map((row) => mapNote(row, grouped.get(row.id) ?? []));
}

async function insertLines(connection: Knex, tenantId: string, noteId: string, lines: SalesCreditNoteLineRecord[]) {
  if (lines.length === 0) return;
  await connection<LineRow>(lineTable).insert(lines.map((line) => ({
    id: line.id, tenant_id: tenantId, credit_note_id: noteId, sales_invoice_line_id: toNullable(line.salesInvoiceLineId), line_number: line.lineNumber, item_id: line.itemId, item_name: line.itemName,
    description: toNullable(line.description), quantity: line.quantity, uom_id: line.uomId, unit_price: line.unitPrice, discount_percent: line.discountPercent, discount_amount: line.discountAmount,
    taxable_amount: line.taxableAmount, tax_rate: line.taxRate, tax_amount: line.taxAmount, line_subtotal: line.lineSubtotal, line_total: line.lineTotal, hsn_sac_code: toNullable(line.hsnSacCode),
  })));
}

export function createSalesCreditNotesRepository(database?: Knex): SalesCreditNoteRepository {
  const db = () => database ?? getTenantKnex();
  return {
    calculateSalesCreditNoteTotals,
    async createSalesCreditNote(input, lines, totals) {
      const connection = db();
      const created = await connection.transaction(async (trx) => {
        const [row] = await trx<NoteRow>(noteTable).insert({
          id: randomUUID(), tenant_id: input.tenantId, company_id: toNullable(input.companyId), branch_id: toNullable(input.branchId), credit_note_number: numberWithPrefix("SCN", input.creditNoteNumber),
          sales_invoice_id: input.salesInvoiceId, customer_id: input.customerId, party_id: toNullable(input.partyId), credit_note_date: input.creditNoteDate ?? new Date().toISOString().slice(0, 10), posting_date: toNullable(input.postingDate),
          status: "DRAFT", reason: toNullable(input.reason), return_to_stock: input.returnToStock ?? false, warehouse_id: toNullable(input.warehouseId), currency: input.currency, exchange_rate: input.exchangeRate,
          subtotal_amount: totals.subtotalAmount, discount_amount: totals.discountAmount, taxable_amount: totals.taxableAmount, tax_amount: totals.taxAmount, total_amount: totals.totalAmount, notes: toNullable(input.notes),
        }).returning("*");
        await insertLines(trx, input.tenantId, row.id, lines.map((line) => ({ ...line, creditNoteId: row.id })));
        return row;
      });
      return (await attachLines(connection, [created]))[0];
    },
    async listSalesCreditNotes(request) {
      const page = request.page ?? 1, pageSize = request.pageSize ?? 25, connection = db();
      const [rows, countRows] = await Promise.all([
        applyFilters(connection<NoteRow>(noteTable).select("*"), request).orderBy(request.sortBy ?? "created_at", request.sortDirection ?? "desc").limit(pageSize).offset((page - 1) * pageSize),
        applyFilters(connection<NoteRow>(noteTable).count<{ count: string }[]>({ count: "*" }), request),
      ]);
      return { rows: await attachLines(connection, rows), total: Number(countRows[0]?.count ?? 0), page, pageSize };
    },
    async getSalesCreditNoteById(tenantId, id) {
      const connection = db(); const row = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getSalesCreditNoteByNumber(tenantId, creditNoteNumber, companyId) {
      const query = db()<NoteRow>(noteTable).where({ tenant_id: tenantId, credit_note_number: creditNoteNumber }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first(); return row ? (await attachLines(db(), [row]))[0] : undefined;
    },
    async getSalesCreditNotesByInvoice(tenantId, salesInvoiceId) {
      const connection = db(); const rows = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, sales_invoice_id: salesInvoiceId }).whereNull("deleted_at").orderBy("created_at", "desc");
      return attachLines(connection, rows);
    },
    async updateSalesCreditNote(tenantId, id, input, lines, totals) {
      const connection = db();
      const updated = await connection.transaction(async (trx) => {
        const [row] = await trx<NoteRow>(noteTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update(compact({
          company_id: input.companyId, branch_id: input.branchId, credit_note_date: input.creditNoteDate, posting_date: input.postingDate, reason: input.reason, return_to_stock: input.returnToStock,
          warehouse_id: input.warehouseId, subtotal_amount: totals?.subtotalAmount, discount_amount: totals?.discountAmount, taxable_amount: totals?.taxableAmount, tax_amount: totals?.taxAmount, total_amount: totals?.totalAmount,
          notes: input.notes, updated_at: trx.fn.now(),
        })).returning("*");
        if (!row) return undefined;
        if (lines) { await trx<LineRow>(lineTable).where({ tenant_id: tenantId, credit_note_id: id }).delete(); await insertLines(trx, tenantId, id, lines); }
        return row;
      });
      return updated ? (await attachLines(connection, [updated]))[0] : undefined;
    },
    async softDeleteSalesCreditNote(tenantId, id) {
      const connection = db(); const [row] = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async postSalesCreditNote(tenantId, id, journalEntryId, postingDate) {
      const connection = db();
      const [row] = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update(compact({ status: "POSTED", journal_entry_id: journalEntryId, posting_date: postingDate, posted_at: connection.fn.now(), updated_at: connection.fn.now() })).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async cancelDraftSalesCreditNote(tenantId, id) {
      const connection = db(); const [row] = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ status: "CANCELLED", cancelled_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getSalesCreditNoteLines(tenantId, id) {
      return (await db()<LineRow>(lineTable).where({ tenant_id: tenantId, credit_note_id: id }).orderBy("line_number", "asc")).map(mapLine);
    },
    async getSalesCreditNoteStats(tenantId, filters = {}) {
      const rows = await applyFilters(db()<NoteRow>(noteTable).select("*"), { tenantId, ...filters }).orderBy("created_at", "desc");
      const byStatus = { DRAFT: { count: 0, value: 0 }, POSTED: { count: 0, value: 0 }, CANCELLED: { count: 0, value: 0 } };
      for (const row of rows) {
        const status = row.status as SalesCreditNoteStatus;
        byStatus[status].count += 1;
        byStatus[status].value += money(row.total_amount);
      }
      return { total: rows.length, draftValue: byStatus.DRAFT.value, postedValue: byStatus.POSTED.value, cancelledValue: byStatus.CANCELLED.value, byStatus };
    },
  };
}

export const salesCreditNotesRepository = createSalesCreditNotesRepository();
export const creditNotesRepository = salesCreditNotesRepository;
