import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
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
} from "./types";

const quotationTable = "sales_quotations";
const lineTable = "sales_quotation_lines";

type QuotationRow = {
  id: string;
  tenant_id: string;
  company_id: string | null;
  branch_id: string | null;
  quotation_number: string;
  customer_id: string;
  party_id: string | null;
  opportunity_id: string | null;
  quote_date: Date | string;
  valid_until: Date | string;
  status: QuotationStatus;
  currency: string;
  exchange_rate: string | number;
  price_list_id: string | null;
  billing_address_id: string | null;
  shipping_address_id: string | null;
  subtotal_amount: string | number;
  discount_amount: string | number;
  tax_amount: string | number;
  total_amount: string | number;
  terms: string | null;
  notes: string | null;
  rejection_reason: string | null;
  owner_user_id: string | null;
  assigned_team_id: string | null;
  accepted_at: Date | string | null;
  rejected_at: Date | string | null;
  cancelled_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
};

type LineRow = {
  id: string;
  tenant_id: string;
  quotation_id: string;
  line_number: number;
  item_id: string;
  item_name: string;
  description: string | null;
  quantity: string | number;
  uom_id: string;
  unit_price: string | number;
  discount_percent: string | number;
  discount_amount: string | number;
  tax_rate: string | number;
  tax_amount: string | number;
  line_subtotal: string | number;
  line_total: string | number;
  created_at: Date | string;
  updated_at: Date | string;
};

const statuses: QuotationStatus[] = ["DRAFT", "SENT", "ACCEPTED", "REJECTED", "EXPIRED", "CANCELLED"];

const toIso = (value: Date | string | null | undefined) => {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : value;
};

const toDateOnly = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const toNullable = <T>(value: T | undefined | null) => value ?? null;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

function quotationNumber(input: QuotationCreateInput) {
  return input.quotationNumber ?? `QUO-${randomUUID().slice(0, 8).toUpperCase()}`;
}

export function calculateQuotationTotals(lines: QuotationLineRecord[]): QuotationTotals {
  return {
    subtotalAmount: roundMoney(lines.reduce((sum, line) => sum + line.lineSubtotal, 0)),
    discountAmount: roundMoney(lines.reduce((sum, line) => sum + line.discountAmount, 0)),
    taxAmount: roundMoney(lines.reduce((sum, line) => sum + line.taxAmount, 0)),
    totalAmount: roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0)),
  };
}

export function calculateLine(input: Omit<QuotationLineRecord, "discountAmount" | "taxAmount" | "lineSubtotal" | "lineTotal">): QuotationLineRecord {
  const lineSubtotal = roundMoney(input.quantity * input.unitPrice);
  const discountAmount = roundMoney(lineSubtotal * (input.discountPercent / 100));
  const taxableAmount = roundMoney(lineSubtotal - discountAmount);
  const taxAmount = roundMoney(taxableAmount * (input.taxRate / 100));
  return {
    ...input,
    discountAmount,
    taxAmount,
    lineSubtotal,
    lineTotal: roundMoney(taxableAmount + taxAmount),
  };
}

function mapLineRow(row: LineRow): QuotationLineRecord {
  return {
    id: row.id,
    quotationId: row.quotation_id,
    lineNumber: Number(row.line_number),
    itemId: row.item_id,
    itemName: row.item_name,
    description: row.description ?? undefined,
    quantity: Number(row.quantity),
    uomId: row.uom_id,
    unitPrice: Number(row.unit_price),
    discountPercent: Number(row.discount_percent),
    discountAmount: Number(row.discount_amount),
    taxRate: Number(row.tax_rate),
    taxAmount: Number(row.tax_amount),
    lineSubtotal: Number(row.line_subtotal),
    lineTotal: Number(row.line_total),
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  };
}

function mapQuotationRow(row: QuotationRow, lines: QuotationLineRecord[] = []): QuotationRecord {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
    quotationNumber: row.quotation_number,
    customerId: row.customer_id,
    partyId: row.party_id ?? undefined,
    opportunityId: row.opportunity_id ?? undefined,
    quoteDate: toDateOnly(row.quote_date) ?? new Date().toISOString().slice(0, 10),
    validUntil: toDateOnly(row.valid_until) ?? new Date().toISOString().slice(0, 10),
    status: row.status,
    currency: row.currency,
    exchangeRate: Number(row.exchange_rate),
    priceListId: row.price_list_id ?? undefined,
    billingAddressId: row.billing_address_id ?? undefined,
    shippingAddressId: row.shipping_address_id ?? undefined,
    subtotalAmount: Number(row.subtotal_amount),
    discountAmount: Number(row.discount_amount),
    taxAmount: Number(row.tax_amount),
    totalAmount: Number(row.total_amount),
    terms: row.terms ?? undefined,
    notes: row.notes ?? undefined,
    rejectionReason: row.rejection_reason ?? undefined,
    ownerUserId: row.owner_user_id ?? undefined,
    assignedTeamId: row.assigned_team_id ?? undefined,
    acceptedAt: toIso(row.accepted_at),
    rejectedAt: toIso(row.rejected_at),
    cancelledAt: toIso(row.cancelled_at),
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
    deletedAt: toIso(row.deleted_at),
    lines,
  };
}

function applyScope(query: Knex.QueryBuilder, request: Pick<QuotationListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyFilters(query: Knex.QueryBuilder, request: QuotationListRequest) {
  applyScope(query, request).whereNull("deleted_at");
  if (request.status) query.where("status", request.status);
  if (request.customerId) query.where("customer_id", request.customerId);
  if (request.opportunityId) query.where("opportunity_id", request.opportunityId);
  if (request.ownerUserId) query.where("owner_user_id", request.ownerUserId);
  if (request.quoteDateFrom) query.where("quote_date", ">=", request.quoteDateFrom);
  if (request.quoteDateTo) query.where("quote_date", "<=", request.quoteDateTo);
  if (request.validUntilFrom) query.where("valid_until", ">=", request.validUntilFrom);
  if (request.validUntilTo) query.where("valid_until", "<=", request.validUntilTo);
  if (request.search) {
    const search = `%${request.search}%`;
    query.andWhere((builder) => {
      builder.whereILike("quotation_number", search).orWhereILike("terms", search).orWhereILike("notes", search);
    });
  }
  return query;
}

async function attachLines(connection: Knex, rows: QuotationRow[]) {
  if (rows.length === 0) return [];
  const lineRows = await connection<LineRow>(lineTable)
    .whereIn(
      "quotation_id",
      rows.map((row) => row.id),
    )
    .orderBy("line_number", "asc");
  const byQuotation = new Map<string, QuotationLineRecord[]>();
  for (const line of lineRows.map(mapLineRow)) {
    byQuotation.set(line.quotationId, [...(byQuotation.get(line.quotationId) ?? []), line]);
  }
  return rows.map((row) => mapQuotationRow(row, byQuotation.get(row.id) ?? []));
}

async function insertLines(connection: Knex, tenantId: string, quotationId: string, lines: QuotationLineRecord[]) {
  if (lines.length === 0) return;
  await connection<LineRow>(lineTable).insert(
    lines.map((line) => ({
      id: line.id,
      tenant_id: tenantId,
      quotation_id: quotationId,
      line_number: line.lineNumber,
      item_id: line.itemId,
      item_name: line.itemName,
      description: toNullable(line.description),
      quantity: line.quantity,
      uom_id: line.uomId,
      unit_price: line.unitPrice,
      discount_percent: line.discountPercent,
      discount_amount: line.discountAmount,
      tax_rate: line.taxRate,
      tax_amount: line.taxAmount,
      line_subtotal: line.lineSubtotal,
      line_total: line.lineTotal,
    })),
  );
}

export function createQuotationsRepository(database?: Knex): QuotationRepository {
  const db = () => database ?? getTenantKnex();

  return {
    calculateQuotationTotals,

    async createQuotation(input, lines, totals) {
      const connection = db();
      const created = await connection.transaction(async (trx) => {
        const [row] = await trx<QuotationRow>(quotationTable)
          .insert({
            id: randomUUID(),
            tenant_id: input.tenantId,
            company_id: toNullable(input.companyId),
            branch_id: toNullable(input.branchId),
            quotation_number: quotationNumber(input),
            customer_id: input.customerId,
            party_id: toNullable(input.partyId),
            opportunity_id: toNullable(input.opportunityId),
            quote_date: input.quoteDate ?? new Date().toISOString().slice(0, 10),
            valid_until: input.validUntil,
            status: input.status ?? "DRAFT",
            currency: input.currency ?? "INR",
            exchange_rate: input.exchangeRate ?? 1,
            price_list_id: toNullable(input.priceListId),
            billing_address_id: toNullable(input.billingAddressId),
            shipping_address_id: toNullable(input.shippingAddressId),
            subtotal_amount: totals.subtotalAmount,
            discount_amount: totals.discountAmount,
            tax_amount: totals.taxAmount,
            total_amount: totals.totalAmount,
            terms: toNullable(input.terms),
            notes: toNullable(input.notes),
            owner_user_id: toNullable(input.ownerUserId),
            assigned_team_id: toNullable(input.assignedTeamId),
          })
          .returning("*");
        await insertLines(trx, input.tenantId, row.id, lines.map((line) => ({ ...line, quotationId: row.id })));
        return row;
      });
      return (await attachLines(connection, [created]))[0];
    },

    async listQuotations(request) {
      const page = request.page ?? 1;
      const pageSize = request.pageSize ?? 25;
      const offset = (page - 1) * pageSize;
      const connection = db();
      const sortBy = request.sortBy ?? "created_at";
      const sortDirection = request.sortDirection ?? "desc";
      const rowsQuery = applyFilters(connection<QuotationRow>(quotationTable).select("*"), request)
        .orderBy(sortBy, sortDirection)
        .limit(pageSize)
        .offset(offset);
      const countQuery = applyFilters(connection<QuotationRow>(quotationTable).count<{ count: string }[]>({ count: "*" }), request);
      const [rows, countRows] = await Promise.all([rowsQuery, countQuery]);
      return { rows: await attachLines(connection, rows), total: Number(countRows[0]?.count ?? 0), page, pageSize };
    },

    async getQuotationById(tenantId, id) {
      const connection = db();
      const row = await connection<QuotationRow>(quotationTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },

    async getQuotationByNumber(tenantId, number, companyId) {
      const connection = db();
      const query = connection<QuotationRow>(quotationTable)
        .where({ tenant_id: tenantId, quotation_number: number })
        .whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },

    async updateQuotation(tenantId, id, input, lines, totals) {
      const connection = db();
      const updated = await connection.transaction(async (trx) => {
        const patch = compact({
          company_id: input.companyId,
          branch_id: input.branchId,
          customer_id: input.customerId,
          party_id: input.partyId,
          opportunity_id: input.opportunityId,
          quote_date: input.quoteDate,
          valid_until: input.validUntil,
          currency: input.currency,
          exchange_rate: input.exchangeRate,
          price_list_id: input.priceListId,
          billing_address_id: input.billingAddressId,
          shipping_address_id: input.shippingAddressId,
          subtotal_amount: totals?.subtotalAmount,
          discount_amount: totals?.discountAmount,
          tax_amount: totals?.taxAmount,
          total_amount: totals?.totalAmount,
          terms: input.terms,
          notes: input.notes,
          owner_user_id: input.ownerUserId,
          assigned_team_id: input.assignedTeamId,
          updated_at: trx.fn.now(),
        });
        const [row] = await trx<QuotationRow>(quotationTable)
          .where({ tenant_id: tenantId, id })
          .whereNull("deleted_at")
          .update(patch)
          .returning("*");
        if (!row) return undefined;
        if (lines) {
          await trx<LineRow>(lineTable).where({ tenant_id: tenantId, quotation_id: id }).delete();
          await insertLines(trx, tenantId, id, lines);
        }
        return row;
      });
      return updated ? (await attachLines(connection, [updated]))[0] : undefined;
    },

    async softDeleteQuotation(tenantId, id) {
      const connection = db();
      const [row] = await connection<QuotationRow>(quotationTable)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },

    async changeQuotationStatus(tenantId, id, input) {
      const connection = db();
      const patch = {
        status: input.status,
        rejection_reason: input.status === "REJECTED" ? (input.rejectionReason ?? null) : null,
        accepted_at: input.status === "ACCEPTED" ? connection.fn.now() : null,
        rejected_at: input.status === "REJECTED" ? connection.fn.now() : null,
        cancelled_at: input.status === "CANCELLED" ? connection.fn.now() : null,
        updated_at: connection.fn.now(),
      };
      const [row] = await connection<QuotationRow>(quotationTable)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update(patch)
        .returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },

    async getQuotationStats(tenantId, filters = {}): Promise<QuotationStats> {
      const rows: QuotationRow[] = await applyFilters(db()<QuotationRow>(quotationTable).select("*"), { tenantId, ...filters }).orderBy("created_at", "desc");
      const byStatus = Object.fromEntries(statuses.map((status) => [status, { count: 0, value: 0 }])) as QuotationStats["byStatus"];
      for (const row of rows) {
        byStatus[row.status].count += 1;
        byStatus[row.status].value += Number(row.total_amount);
      }
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
      const rows = await db()<LineRow>(lineTable).where({ tenant_id: tenantId, quotation_id: quotationId }).orderBy("line_number", "asc");
      return rows.map(mapLineRow);
    },

    async replaceQuotationLines(tenantId, quotationId, lines) {
      const connection = db();
      await connection.transaction(async (trx) => {
        await trx<LineRow>(lineTable).where({ tenant_id: tenantId, quotation_id: quotationId }).delete();
        await insertLines(trx, tenantId, quotationId, lines);
      });
      return this.getQuotationLines(tenantId, quotationId);
    },
  };
}

export const quotationsRepository = createQuotationsRepository();
