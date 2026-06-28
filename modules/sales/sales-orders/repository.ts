import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
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
} from "./types";

const orderTable = "sales_orders";
const lineTable = "sales_order_lines";

type OrderRow = {
  id: string;
  tenant_id: string;
  company_id: string | null;
  branch_id: string | null;
  order_number: string;
  quotation_id: string | null;
  opportunity_id: string | null;
  customer_id: string;
  party_id: string | null;
  order_date: Date | string;
  expected_delivery_date: Date | string | null;
  status: SalesOrderStatus;
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
  owner_user_id: string | null;
  assigned_team_id: string | null;
  confirmed_at: Date | string | null;
  cancelled_at: Date | string | null;
  closed_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
};

type LineRow = {
  id: string;
  tenant_id: string;
  order_id: string;
  quotation_line_id: string | null;
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

const statuses: SalesOrderStatus[] = ["DRAFT", "CONFIRMED", "CANCELLED", "CLOSED"];
const toIso = (value: Date | string | null | undefined) => (!value ? undefined : value instanceof Date ? value.toISOString() : value);
const toDateOnly = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const toNullable = <T>(value: T | undefined | null) => value ?? null;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

function orderNumber(input: SalesOrderCreateInput) {
  return input.orderNumber ?? `SO-${randomUUID().slice(0, 8).toUpperCase()}`;
}

export function calculateSalesOrderTotals(lines: SalesOrderLineRecord[]): SalesOrderTotals {
  return {
    subtotalAmount: roundMoney(lines.reduce((sum, line) => sum + line.lineSubtotal, 0)),
    discountAmount: roundMoney(lines.reduce((sum, line) => sum + line.discountAmount, 0)),
    taxAmount: roundMoney(lines.reduce((sum, line) => sum + line.taxAmount, 0)),
    totalAmount: roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0)),
  };
}

export function calculateLine(input: Omit<SalesOrderLineRecord, "discountAmount" | "taxAmount" | "lineSubtotal" | "lineTotal">): SalesOrderLineRecord {
  const lineSubtotal = roundMoney(input.quantity * input.unitPrice);
  const discountAmount = roundMoney(lineSubtotal * (input.discountPercent / 100));
  const taxableAmount = roundMoney(lineSubtotal - discountAmount);
  const taxAmount = roundMoney(taxableAmount * (input.taxRate / 100));
  return { ...input, discountAmount, taxAmount, lineSubtotal, lineTotal: roundMoney(taxableAmount + taxAmount) };
}

function mapLineRow(row: LineRow): SalesOrderLineRecord {
  return {
    id: row.id,
    orderId: row.order_id,
    quotationLineId: row.quotation_line_id ?? undefined,
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

function mapOrderRow(row: OrderRow, lines: SalesOrderLineRecord[] = []): SalesOrderRecord {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
    orderNumber: row.order_number,
    quotationId: row.quotation_id ?? undefined,
    opportunityId: row.opportunity_id ?? undefined,
    customerId: row.customer_id,
    partyId: row.party_id ?? undefined,
    orderDate: toDateOnly(row.order_date) ?? new Date().toISOString().slice(0, 10),
    expectedDeliveryDate: toDateOnly(row.expected_delivery_date),
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
    ownerUserId: row.owner_user_id ?? undefined,
    assignedTeamId: row.assigned_team_id ?? undefined,
    confirmedAt: toIso(row.confirmed_at),
    cancelledAt: toIso(row.cancelled_at),
    closedAt: toIso(row.closed_at),
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
    deletedAt: toIso(row.deleted_at),
    lines,
  };
}

function applyScope(query: Knex.QueryBuilder, request: Pick<SalesOrderListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyFilters(query: Knex.QueryBuilder, request: SalesOrderListRequest) {
  applyScope(query, request).whereNull("deleted_at");
  if (request.status) query.where("status", request.status);
  if (request.customerId) query.where("customer_id", request.customerId);
  if (request.quotationId) query.where("quotation_id", request.quotationId);
  if (request.opportunityId) query.where("opportunity_id", request.opportunityId);
  if (request.ownerUserId) query.where("owner_user_id", request.ownerUserId);
  if (request.orderDateFrom) query.where("order_date", ">=", request.orderDateFrom);
  if (request.orderDateTo) query.where("order_date", "<=", request.orderDateTo);
  if (request.expectedDeliveryFrom) query.where("expected_delivery_date", ">=", request.expectedDeliveryFrom);
  if (request.expectedDeliveryTo) query.where("expected_delivery_date", "<=", request.expectedDeliveryTo);
  if (request.search) {
    const search = `%${request.search}%`;
    query.andWhere((builder) => builder.whereILike("order_number", search).orWhereILike("terms", search).orWhereILike("notes", search));
  }
  return query;
}

async function attachLines(connection: Knex, rows: OrderRow[]) {
  if (rows.length === 0) return [];
  const lineRows = await connection<LineRow>(lineTable)
    .whereIn(
      "order_id",
      rows.map((row) => row.id),
    )
    .orderBy("line_number", "asc");
  const byOrder = new Map<string, SalesOrderLineRecord[]>();
  for (const line of lineRows.map(mapLineRow)) byOrder.set(line.orderId, [...(byOrder.get(line.orderId) ?? []), line]);
  return rows.map((row) => mapOrderRow(row, byOrder.get(row.id) ?? []));
}

async function insertLines(connection: Knex, tenantId: string, orderId: string, lines: SalesOrderLineRecord[]) {
  if (lines.length === 0) return;
  await connection<LineRow>(lineTable).insert(
    lines.map((line) => ({
      id: line.id,
      tenant_id: tenantId,
      order_id: orderId,
      quotation_line_id: toNullable(line.quotationLineId),
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

export function createSalesOrdersRepository(database?: Knex): SalesOrderRepository {
  const db = () => database ?? getTenantKnex();

  async function create(input: SalesOrderCreateInput, lines: SalesOrderLineRecord[], totals: SalesOrderTotals) {
    const connection = db();
    const created = await connection.transaction(async (trx) => {
      const [row] = await trx<OrderRow>(orderTable)
        .insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          order_number: orderNumber(input),
          quotation_id: toNullable(input.quotationId),
          opportunity_id: toNullable(input.opportunityId),
          customer_id: input.customerId,
          party_id: toNullable(input.partyId),
          order_date: input.orderDate ?? new Date().toISOString().slice(0, 10),
          expected_delivery_date: toNullable(input.expectedDeliveryDate),
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
      await insertLines(trx, input.tenantId, row.id, lines.map((line) => ({ ...line, orderId: row.id })));
      return row;
    });
    return (await attachLines(connection, [created]))[0];
  }

  return {
    calculateSalesOrderTotals,
    async createSalesOrder(input, lines, totals) {
      return create(input, lines, totals);
    },
    async createSalesOrderFromQuotation(input, lines, totals) {
      return create(input, lines, totals);
    },
    async listSalesOrders(request) {
      const page = request.page ?? 1;
      const pageSize = request.pageSize ?? 25;
      const connection = db();
      const rowsQuery = applyFilters(connection<OrderRow>(orderTable).select("*"), request)
        .orderBy(request.sortBy ?? "created_at", request.sortDirection ?? "desc")
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const countQuery = applyFilters(connection<OrderRow>(orderTable).count<{ count: string }[]>({ count: "*" }), request);
      const [rows, countRows] = await Promise.all([rowsQuery, countQuery]);
      return { rows: await attachLines(connection, rows), total: Number(countRows[0]?.count ?? 0), page, pageSize };
    },
    async getSalesOrderById(tenantId, id) {
      const connection = db();
      const row = await connection<OrderRow>(orderTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getSalesOrderByNumber(tenantId, orderNumberValue, companyId) {
      const connection = db();
      const query = connection<OrderRow>(orderTable).where({ tenant_id: tenantId, order_number: orderNumberValue }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getSalesOrderByQuotationId(tenantId, quotationId) {
      const connection = db();
      const row = await connection<OrderRow>(orderTable).where({ tenant_id: tenantId, quotation_id: quotationId }).whereNull("deleted_at").first();
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async updateSalesOrder(tenantId, id, input: SalesOrderUpdateInput, lines, totals) {
      const connection = db();
      const updated = await connection.transaction(async (trx) => {
        const [row] = await trx<OrderRow>(orderTable)
          .where({ tenant_id: tenantId, id })
          .whereNull("deleted_at")
          .update(
            compact({
              company_id: input.companyId,
              branch_id: input.branchId,
              quotation_id: input.quotationId,
              opportunity_id: input.opportunityId,
              customer_id: input.customerId,
              party_id: input.partyId,
              order_date: input.orderDate,
              expected_delivery_date: input.expectedDeliveryDate,
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
            }),
          )
          .returning("*");
        if (!row) return undefined;
        if (lines) {
          await trx<LineRow>(lineTable).where({ tenant_id: tenantId, order_id: id }).delete();
          await insertLines(trx, tenantId, id, lines);
        }
        return row;
      });
      return updated ? (await attachLines(connection, [updated]))[0] : undefined;
    },
    async softDeleteSalesOrder(tenantId, id) {
      const connection = db();
      const [row] = await connection<OrderRow>(orderTable)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async changeSalesOrderStatus(tenantId, id, input: SalesOrderStatusChangeInput) {
      const connection = db();
      const [row] = await connection<OrderRow>(orderTable)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({
          status: input.status,
          confirmed_at: input.status === "CONFIRMED" ? connection.fn.now() : null,
          cancelled_at: input.status === "CANCELLED" ? connection.fn.now() : null,
          closed_at: input.status === "CLOSED" ? connection.fn.now() : null,
          updated_at: connection.fn.now(),
        })
        .returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getSalesOrderStats(tenantId, filters = {}): Promise<SalesOrderStats> {
      const rows: OrderRow[] = await applyFilters(db()<OrderRow>(orderTable).select("*"), { tenantId, ...filters }).orderBy("created_at", "desc");
      const byStatus = Object.fromEntries(statuses.map((status) => [status, { count: 0, value: 0 }])) as SalesOrderStats["byStatus"];
      for (const row of rows) {
        byStatus[row.status].count += 1;
        byStatus[row.status].value += Number(row.total_amount);
      }
      return {
        total: rows.length,
        draftValue: byStatus.DRAFT.value,
        confirmedValue: byStatus.CONFIRMED.value,
        closedValue: byStatus.CLOSED.value,
        cancelledValue: byStatus.CANCELLED.value,
        byStatus,
      };
    },
    async getSalesOrderLines(tenantId, orderId) {
      const rows = await db()<LineRow>(lineTable).where({ tenant_id: tenantId, order_id: orderId }).orderBy("line_number", "asc");
      return rows.map(mapLineRow);
    },
    async replaceSalesOrderLines(tenantId, orderId, lines) {
      const connection = db();
      await connection.transaction(async (trx) => {
        await trx<LineRow>(lineTable).where({ tenant_id: tenantId, order_id: orderId }).delete();
        await insertLines(trx, tenantId, orderId, lines);
      });
      return this.getSalesOrderLines(tenantId, orderId);
    },
  };
}

export const salesOrdersRepository = createSalesOrdersRepository();
