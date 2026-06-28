import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type {
  IssueSalesInvoiceInput,
  SalesInvoiceCreateInput,
  SalesInvoiceLineRecord,
  SalesInvoiceListRequest,
  SalesInvoicePaymentStatus,
  SalesInvoiceRecord,
  SalesInvoiceRepository,
  SalesInvoiceStatus,
  SalesInvoiceStats,
  SalesInvoiceTotals,
  SalesInvoiceUpdateInput,
} from "./types";

const invoiceTable = "sales_invoices";
const lineTable = "sales_invoice_lines";

type InvoiceRow = {
  id: string; tenant_id: string; company_id: string | null; branch_id: string | null; invoice_number: string;
  customer_id: string; party_id: string | null; sales_order_id: string | null; delivery_note_id: string | null; opportunity_id: string | null; quotation_id: string | null;
  invoice_date: Date | string; due_date: Date | string | null; status: SalesInvoiceStatus; payment_status: SalesInvoicePaymentStatus; accounting_status: SalesInvoiceRecord["accountingStatus"]; journal_entry_id: string | null; accounting_posted_at: Date | string | null;
  currency: string; exchange_rate: string | number; billing_address_id: string | null; shipping_address_id: string | null; place_of_supply: string | null; gst_treatment: string | null;
  subtotal_amount: string | number; discount_amount: string | number; taxable_amount: string | number; tax_amount: string | number; total_amount: string | number; rounded_total_amount: string | number | null; amount_paid: string | number; credited_amount: string | number; debited_amount: string | number; amount_due: string | number;
  terms: string | null; notes: string | null; owner_user_id: string | null; assigned_team_id: string | null; issued_at: Date | string | null; cancelled_at: Date | string | null; created_at: Date | string; updated_at: Date | string; deleted_at: Date | string | null;
};

type LineRow = {
  id: string; tenant_id: string; invoice_id: string; sales_order_line_id: string | null; delivery_note_line_id: string | null; line_number: number;
  item_id: string; item_name: string; description: string | null; quantity: string | number; uom_id: string; unit_price: string | number; discount_percent: string | number; discount_amount: string | number;
  taxable_amount: string | number; tax_rate: string | number; tax_amount: string | number; line_subtotal: string | number; line_total: string | number; hsn_sac_code: string | null; created_at: Date | string; updated_at: Date | string;
};

const toNullable = <T>(value: T | undefined | null) => value ?? null;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
const toIso = (value: Date | string | null | undefined) => (!value ? undefined : value instanceof Date ? value.toISOString() : value);
const toDateOnly = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const numberWithPrefix = (prefix: string, explicit?: string) => explicit ?? `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function calculateSalesInvoiceLine(input: Omit<SalesInvoiceLineRecord, "discountAmount" | "taxableAmount" | "taxAmount" | "lineSubtotal" | "lineTotal">): SalesInvoiceLineRecord {
  const lineSubtotal = roundMoney(input.quantity * input.unitPrice);
  const discountAmount = roundMoney(lineSubtotal * (input.discountPercent / 100));
  const taxableAmount = roundMoney(lineSubtotal - discountAmount);
  const taxAmount = roundMoney(taxableAmount * (input.taxRate / 100));
  return { ...input, discountAmount, taxableAmount, taxAmount, lineSubtotal, lineTotal: roundMoney(taxableAmount + taxAmount) };
}

export function calculateSalesInvoiceTotals(lines: SalesInvoiceLineRecord[]): SalesInvoiceTotals {
  const totalAmount = roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0));
  return {
    subtotalAmount: roundMoney(lines.reduce((sum, line) => sum + line.lineSubtotal, 0)),
    discountAmount: roundMoney(lines.reduce((sum, line) => sum + line.discountAmount, 0)),
    taxableAmount: roundMoney(lines.reduce((sum, line) => sum + line.taxableAmount, 0)),
    taxAmount: roundMoney(lines.reduce((sum, line) => sum + line.taxAmount, 0)),
    totalAmount,
    amountPaid: 0,
    amountDue: totalAmount,
  };
}

function mapLineRow(row: LineRow): SalesInvoiceLineRecord {
  return {
    id: row.id, invoiceId: row.invoice_id, salesOrderLineId: row.sales_order_line_id ?? undefined, deliveryNoteLineId: row.delivery_note_line_id ?? undefined, lineNumber: Number(row.line_number),
    itemId: row.item_id, itemName: row.item_name, description: row.description ?? undefined, quantity: Number(row.quantity), uomId: row.uom_id, unitPrice: Number(row.unit_price),
    discountPercent: Number(row.discount_percent), discountAmount: Number(row.discount_amount), taxableAmount: Number(row.taxable_amount), taxRate: Number(row.tax_rate), taxAmount: Number(row.tax_amount),
    lineSubtotal: Number(row.line_subtotal), lineTotal: Number(row.line_total), hsnSacCode: row.hsn_sac_code ?? undefined, createdAt: toIso(row.created_at) ?? new Date().toISOString(), updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  };
}

function mapInvoiceRow(row: InvoiceRow, lines: SalesInvoiceLineRecord[] = []): SalesInvoiceRecord {
  return {
    id: row.id, tenantId: row.tenant_id, companyId: row.company_id ?? undefined, branchId: row.branch_id ?? undefined, invoiceNumber: row.invoice_number, customerId: row.customer_id, partyId: row.party_id ?? undefined,
    salesOrderId: row.sales_order_id ?? undefined, deliveryNoteId: row.delivery_note_id ?? undefined, opportunityId: row.opportunity_id ?? undefined, quotationId: row.quotation_id ?? undefined,
    invoiceDate: toDateOnly(row.invoice_date) ?? new Date().toISOString().slice(0, 10), dueDate: toDateOnly(row.due_date), status: row.status, paymentStatus: row.payment_status, accountingStatus: row.accounting_status ?? "NOT_POSTED", journalEntryId: row.journal_entry_id ?? undefined, accountingPostedAt: toIso(row.accounting_posted_at), currency: row.currency, exchangeRate: Number(row.exchange_rate),
    billingAddressId: row.billing_address_id ?? undefined, shippingAddressId: row.shipping_address_id ?? undefined, placeOfSupply: row.place_of_supply ?? undefined, gstTreatment: row.gst_treatment ?? undefined,
    subtotalAmount: Number(row.subtotal_amount), discountAmount: Number(row.discount_amount), taxableAmount: Number(row.taxable_amount), taxAmount: Number(row.tax_amount), totalAmount: Number(row.total_amount),
    roundedTotalAmount: row.rounded_total_amount == null ? undefined : Number(row.rounded_total_amount), amountPaid: Number(row.amount_paid), creditedAmount: Number(row.credited_amount ?? 0), debitedAmount: Number(row.debited_amount ?? 0), amountDue: Number(row.amount_due), terms: row.terms ?? undefined, notes: row.notes ?? undefined,
    ownerUserId: row.owner_user_id ?? undefined, assignedTeamId: row.assigned_team_id ?? undefined, issuedAt: toIso(row.issued_at), cancelledAt: toIso(row.cancelled_at), createdAt: toIso(row.created_at) ?? new Date().toISOString(), updatedAt: toIso(row.updated_at) ?? new Date().toISOString(), deletedAt: toIso(row.deleted_at), lines,
  };
}

async function attachLines(connection: Knex, rows: InvoiceRow[]) {
  if (rows.length === 0) return [];
  const lineRows = await connection<LineRow>(lineTable).whereIn("invoice_id", rows.map((row) => row.id)).orderBy("line_number", "asc");
  const byInvoice = new Map<string, SalesInvoiceLineRecord[]>();
  for (const line of lineRows.map(mapLineRow)) byInvoice.set(line.invoiceId, [...(byInvoice.get(line.invoiceId) ?? []), line]);
  return rows.map((row) => mapInvoiceRow(row, byInvoice.get(row.id) ?? []));
}

function applyScope(query: Knex.QueryBuilder, request: Pick<SalesInvoiceListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyFilters(query: Knex.QueryBuilder, request: SalesInvoiceListRequest) {
  applyScope(query, request).whereNull("deleted_at");
  if (request.status) query.where("status", request.status);
  if (request.paymentStatus) query.where("payment_status", request.paymentStatus);
  if (request.customerId) query.where("customer_id", request.customerId);
  if (request.salesOrderId) query.where("sales_order_id", request.salesOrderId);
  if (request.deliveryNoteId) query.where("delivery_note_id", request.deliveryNoteId);
  if (request.invoiceDateFrom) query.where("invoice_date", ">=", request.invoiceDateFrom);
  if (request.invoiceDateTo) query.where("invoice_date", "<=", request.invoiceDateTo);
  if (request.dueDateFrom) query.where("due_date", ">=", request.dueDateFrom);
  if (request.dueDateTo) query.where("due_date", "<=", request.dueDateTo);
  if (request.search) query.andWhere((builder) => builder.whereILike("invoice_number", `%${request.search}%`).orWhereILike("notes", `%${request.search}%`));
  return query;
}

async function insertLines(connection: Knex, tenantId: string, invoiceId: string, lines: SalesInvoiceLineRecord[]) {
  if (lines.length === 0) return;
  await connection<LineRow>(lineTable).insert(lines.map((line) => ({
    id: line.id, tenant_id: tenantId, invoice_id: invoiceId, sales_order_line_id: toNullable(line.salesOrderLineId), delivery_note_line_id: toNullable(line.deliveryNoteLineId), line_number: line.lineNumber,
    item_id: line.itemId, item_name: line.itemName, description: toNullable(line.description), quantity: line.quantity, uom_id: line.uomId, unit_price: line.unitPrice, discount_percent: line.discountPercent,
    discount_amount: line.discountAmount, taxable_amount: line.taxableAmount, tax_rate: line.taxRate, tax_amount: line.taxAmount, line_subtotal: line.lineSubtotal, line_total: line.lineTotal, hsn_sac_code: toNullable(line.hsnSacCode),
  })));
}

export function createSalesInvoicesRepository(database?: Knex): SalesInvoiceRepository {
  const db = () => database ?? getTenantKnex();
  async function create(input: SalesInvoiceCreateInput, lines: SalesInvoiceLineRecord[], totals: SalesInvoiceTotals) {
    const connection = db();
    const created = await connection.transaction(async (trx) => {
      const [row] = await trx<InvoiceRow>(invoiceTable).insert({
        id: randomUUID(), tenant_id: input.tenantId, company_id: toNullable(input.companyId), branch_id: toNullable(input.branchId), invoice_number: numberWithPrefix("SINV", input.invoiceNumber),
        customer_id: input.customerId, party_id: toNullable(input.partyId), sales_order_id: toNullable(input.salesOrderId), delivery_note_id: toNullable(input.deliveryNoteId), opportunity_id: toNullable(input.opportunityId), quotation_id: toNullable(input.quotationId),
        invoice_date: input.invoiceDate ?? new Date().toISOString().slice(0, 10), due_date: toNullable(input.dueDate), status: "DRAFT", payment_status: "UNPAID", currency: input.currency ?? "INR", exchange_rate: input.exchangeRate ?? 1,
        billing_address_id: toNullable(input.billingAddressId), shipping_address_id: toNullable(input.shippingAddressId), place_of_supply: toNullable(input.placeOfSupply), gst_treatment: toNullable(input.gstTreatment),
        subtotal_amount: totals.subtotalAmount, discount_amount: totals.discountAmount, taxable_amount: totals.taxableAmount, tax_amount: totals.taxAmount, total_amount: totals.totalAmount, amount_paid: totals.amountPaid, credited_amount: 0, debited_amount: 0, amount_due: totals.amountDue,
        terms: toNullable(input.terms), notes: toNullable(input.notes), owner_user_id: toNullable(input.ownerUserId), assigned_team_id: toNullable(input.assignedTeamId),
      }).returning("*");
      await insertLines(trx, input.tenantId, row.id, lines.map((line) => ({ ...line, invoiceId: row.id })));
      return row;
    });
    return (await attachLines(connection, [created]))[0];
  }
  return {
    calculateSalesInvoiceTotals,
    createSalesInvoice: create,
    createSalesInvoiceFromDeliveryNote: create,
    createSalesInvoiceFromSalesOrder: create,
    async listSalesInvoices(request) {
      const page = request.page ?? 1, pageSize = request.pageSize ?? 25, connection = db();
      const [rows, countRows] = await Promise.all([
        applyFilters(connection<InvoiceRow>(invoiceTable).select("*"), request).orderBy(request.sortBy ?? "created_at", request.sortDirection ?? "desc").limit(pageSize).offset((page - 1) * pageSize),
        applyFilters(connection<InvoiceRow>(invoiceTable).count<{ count: string }[]>({ count: "*" }), request),
      ]);
      return { rows: await attachLines(connection, rows), total: Number(countRows[0]?.count ?? 0), page, pageSize };
    },
    async getSalesInvoiceById(tenantId, id) {
      const connection = db(); const row = await connection<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getSalesInvoiceByNumber(tenantId, invoiceNumber, companyId) {
      const query = db()<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, invoice_number: invoiceNumber }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first(); return row ? (await attachLines(db(), [row]))[0] : undefined;
    },
    async getSalesInvoicesBySalesOrder(tenantId, salesOrderId) {
      const connection = db(); const rows = await connection<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, sales_order_id: salesOrderId }).whereNull("deleted_at").orderBy("created_at", "desc");
      return attachLines(connection, rows);
    },
    async getSalesInvoiceByDeliveryNote(tenantId, deliveryNoteId) {
      const connection = db(); const row = await connection<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, delivery_note_id: deliveryNoteId }).whereNull("deleted_at").first();
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async updateSalesInvoice(tenantId, id, input: SalesInvoiceUpdateInput, lines, totals) {
      const connection = db();
      const updated = await connection.transaction(async (trx) => {
        const [row] = await trx<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update(compact({
          customer_id: input.customerId, party_id: input.partyId, sales_order_id: input.salesOrderId, delivery_note_id: input.deliveryNoteId, opportunity_id: input.opportunityId, quotation_id: input.quotationId,
          invoice_date: input.invoiceDate, due_date: input.dueDate, currency: input.currency, exchange_rate: input.exchangeRate, billing_address_id: input.billingAddressId, shipping_address_id: input.shippingAddressId,
          place_of_supply: input.placeOfSupply, gst_treatment: input.gstTreatment, subtotal_amount: totals?.subtotalAmount, discount_amount: totals?.discountAmount, taxable_amount: totals?.taxableAmount, tax_amount: totals?.taxAmount,
          total_amount: totals?.totalAmount, amount_paid: totals?.amountPaid, credited_amount: totals ? 0 : undefined, debited_amount: totals ? 0 : undefined, amount_due: totals?.amountDue, terms: input.terms, notes: input.notes, owner_user_id: input.ownerUserId, assigned_team_id: input.assignedTeamId, updated_at: trx.fn.now(),
        })).returning("*");
        if (!row) return undefined;
        if (lines) { await trx<LineRow>(lineTable).where({ tenant_id: tenantId, invoice_id: id }).delete(); await insertLines(trx, tenantId, id, lines); }
        return row;
      });
      return updated ? (await attachLines(connection, [updated]))[0] : undefined;
    },
    async softDeleteSalesInvoice(tenantId, id) {
      const connection = db(); const [row] = await connection<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async issueSalesInvoice(tenantId, id, input: IssueSalesInvoiceInput) {
      const connection = db(); const [row] = await connection<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ status: "ISSUED", invoice_date: input.invoiceDate ?? connection.raw("invoice_date"), issued_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async cancelDraftSalesInvoice(tenantId, id) {
      const connection = db(); const [row] = await connection<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ status: "CANCELLED", cancelled_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async postSalesInvoiceToAccounting(tenantId, id, journalEntryId) {
      const connection = db(); const [row] = await connection<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, id, status: "ISSUED", accounting_status: "NOT_POSTED" }).whereNull("deleted_at").update({ accounting_status: "POSTED", journal_entry_id: journalEntryId, accounting_posted_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async applySalesInvoicePayment(tenantId, id, allocatedAmount) {
      const connection = db();
      const amount = roundMoney(allocatedAmount);
      const [row] = await connection<InvoiceRow>(invoiceTable)
        .where({ tenant_id: tenantId, id, status: "ISSUED", accounting_status: "POSTED" })
        .whereNull("deleted_at")
        .where("amount_due", ">=", amount)
        .update({
          amount_paid: connection.raw("round((amount_paid + ?)::numeric, 2)", [amount]),
          amount_due: connection.raw("round((amount_due - ?)::numeric, 2)", [amount]),
          payment_status: connection.raw("case when round((amount_due - ?)::numeric, 2) = 0 then 'PAID' when round((amount_paid + ?)::numeric, 2) > 0 then 'PARTIALLY_PAID' else 'UNPAID' end", [amount, amount]),
          updated_at: connection.fn.now(),
        })
        .returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async applySalesInvoiceCredit(tenantId, id, creditedAmount) {
      const connection = db();
      const amount = roundMoney(creditedAmount);
      const [row] = await connection<InvoiceRow>(invoiceTable)
        .where({ tenant_id: tenantId, id, status: "ISSUED", accounting_status: "POSTED" })
        .whereNull("deleted_at")
        .where("amount_due", ">=", amount)
        .update({
          credited_amount: connection.raw("round((credited_amount + ?)::numeric, 2)", [amount]),
          amount_due: connection.raw("round((amount_due - ?)::numeric, 2)", [amount]),
          payment_status: connection.raw("case when round((amount_due - ?)::numeric, 2) = 0 then 'PAID' when amount_paid > 0 then 'PARTIALLY_PAID' else 'UNPAID' end", [amount]),
          updated_at: connection.fn.now(),
        })
        .returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async applySalesInvoiceDebit(tenantId, id, debitedAmount) {
      const connection = db();
      const amount = roundMoney(debitedAmount);
      const [row] = await connection<InvoiceRow>(invoiceTable)
        .where({ tenant_id: tenantId, id, status: "ISSUED", accounting_status: "POSTED" })
        .whereNull("deleted_at")
        .update({
          debited_amount: connection.raw("round((debited_amount + ?)::numeric, 2)", [amount]),
          amount_due: connection.raw("round((amount_due + ?)::numeric, 2)", [amount]),
          payment_status: connection.raw("case when round((amount_due + ?)::numeric, 2) = 0 then 'PAID' when amount_paid > 0 and round((amount_due + ?)::numeric, 2) > 0 then 'PARTIALLY_PAID' else 'UNPAID' end", [amount, amount]),
          updated_at: connection.fn.now(),
        })
        .returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async applySalesInvoiceCreditAllocation(tenantId, id, allocatedAmount) {
      const connection = db();
      const amount = roundMoney(allocatedAmount);
      const [row] = await connection<InvoiceRow>(invoiceTable)
        .where({ tenant_id: tenantId, id, status: "ISSUED", accounting_status: "POSTED" })
        .whereNull("deleted_at")
        .where("amount_due", ">=", amount)
        .update({
          amount_due: connection.raw("round((amount_due - ?)::numeric, 2)", [amount]),
          payment_status: connection.raw("case when round((amount_due - ?)::numeric, 2) = 0 then 'PAID' when amount_paid > 0 then 'PARTIALLY_PAID' else 'UNPAID' end", [amount]),
          updated_at: connection.fn.now(),
        })
        .returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getSalesInvoiceLines(tenantId, invoiceId) { return (await db()<LineRow>(lineTable).where({ tenant_id: tenantId, invoice_id: invoiceId }).orderBy("line_number", "asc")).map(mapLineRow); },
    async getSalesInvoiceAccountingStatus(tenantId, id) {
      const row = await db()<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? { id: row.id, tenantId: row.tenant_id, companyId: row.company_id ?? undefined, branchId: row.branch_id ?? undefined, invoiceNumber: row.invoice_number, accountingStatus: row.accounting_status ?? "NOT_POSTED", journalEntryId: row.journal_entry_id ?? undefined, accountingPostedAt: toIso(row.accounting_posted_at) } : undefined;
    },
    async getSalesInvoiceJournalEntry(tenantId, id) {
      const row = await db()<InvoiceRow>(invoiceTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row?.journal_entry_id ?? undefined;
    },
    async replaceDraftSalesInvoiceLines(tenantId, invoiceId, lines) { const connection = db(); await connection.transaction(async (trx) => { await trx<LineRow>(lineTable).where({ tenant_id: tenantId, invoice_id: invoiceId }).delete(); await insertLines(trx, tenantId, invoiceId, lines); }); return this.getSalesInvoiceLines(tenantId, invoiceId); },
    async getSalesInvoiceStats(tenantId, filters = {}): Promise<SalesInvoiceStats> {
      const rows: InvoiceRow[] = await applyFilters(db()<InvoiceRow>(invoiceTable).select("*"), { tenantId, ...filters }).orderBy("created_at", "desc");
      const byStatus: SalesInvoiceStats["byStatus"] = { DRAFT: { count: 0, value: 0 }, ISSUED: { count: 0, value: 0 }, CANCELLED: { count: 0, value: 0 } };
      const today = new Date().toISOString().slice(0, 10);
      for (const row of rows) { byStatus[row.status].count += 1; byStatus[row.status].value += Number(row.total_amount); }
      return { total: rows.length, draftValue: byStatus.DRAFT.value, issuedValue: byStatus.ISSUED.value, unpaidValue: rows.filter((row) => row.payment_status === "UNPAID").reduce((sum, row) => sum + Number(row.amount_due), 0), overdueValue: rows.filter((row) => row.payment_status === "UNPAID" && row.due_date && String(row.due_date).slice(0, 10) < today).reduce((sum, row) => sum + Number(row.amount_due), 0), byStatus };
    },
  };
}

export const salesInvoicesRepository = createSalesInvoicesRepository();
export const invoicesRepository = salesInvoicesRepository;
