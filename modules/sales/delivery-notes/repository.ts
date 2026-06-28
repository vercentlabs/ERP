import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type { SalesOrderRecord } from "../sales-orders/types";
import type {
  DeliveryNoteCreateInput,
  DeliveryNoteLineRecord,
  DeliveryNoteListRequest,
  DeliveryNoteRecord,
  DeliveryNoteRepository,
  DeliveryNoteStatus,
  DeliveryNoteStats,
  DeliveryNoteUpdateInput,
  SalesOrderDeliverySummary,
} from "./types";

const noteTable = "sales_delivery_notes";
const lineTable = "sales_delivery_note_lines";

type NoteRow = {
  id: string;
  tenant_id: string;
  company_id: string | null;
  branch_id: string | null;
  delivery_note_number: string;
  sales_order_id: string;
  customer_id: string;
  party_id: string | null;
  delivery_date: Date | string;
  posting_date: Date | string | null;
  status: DeliveryNoteStatus;
  shipping_address_id: string | null;
  warehouse_id: string | null;
  carrier_name: string | null;
  tracking_number: string | null;
  vehicle_number: string | null;
  eway_bill_number: string | null;
  notes: string | null;
  posted_at: Date | string | null;
  cancelled_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
};

type LineRow = {
  id: string;
  tenant_id: string;
  delivery_note_id: string;
  sales_order_line_id: string;
  line_number: number;
  item_id: string;
  item_name: string;
  description: string | null;
  ordered_quantity: string | number;
  previously_delivered_quantity: string | number;
  quantity: string | number;
  remaining_quantity_after_delivery: string | number;
  uom_id: string;
  warehouse_id: string | null;
  bin_id: string | null;
  is_stock_item: boolean;
  stock_ledger_entry_id: string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

const toNullable = <T>(value: T | undefined | null) => value ?? null;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
const toIso = (value: Date | string | null | undefined) => (!value ? undefined : value instanceof Date ? value.toISOString() : value);
const toDateOnly = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const numberWithPrefix = (prefix: string, explicit?: string) => explicit ?? `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;

function mapLineRow(row: LineRow): DeliveryNoteLineRecord {
  return {
    id: row.id,
    deliveryNoteId: row.delivery_note_id,
    salesOrderLineId: row.sales_order_line_id,
    lineNumber: Number(row.line_number),
    itemId: row.item_id,
    itemName: row.item_name,
    description: row.description ?? undefined,
    orderedQuantity: Number(row.ordered_quantity),
    previouslyDeliveredQuantity: Number(row.previously_delivered_quantity),
    quantity: Number(row.quantity),
    remainingQuantityAfterDelivery: Number(row.remaining_quantity_after_delivery),
    uomId: row.uom_id,
    warehouseId: row.warehouse_id ?? undefined,
    binId: row.bin_id ?? undefined,
    isStockItem: row.is_stock_item,
    stockLedgerEntryId: row.stock_ledger_entry_id ?? undefined,
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  };
}

function mapNoteRow(row: NoteRow, lines: DeliveryNoteLineRecord[] = []): DeliveryNoteRecord {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
    deliveryNoteNumber: row.delivery_note_number,
    salesOrderId: row.sales_order_id,
    customerId: row.customer_id,
    partyId: row.party_id ?? undefined,
    deliveryDate: toDateOnly(row.delivery_date) ?? new Date().toISOString().slice(0, 10),
    postingDate: toDateOnly(row.posting_date),
    status: row.status,
    shippingAddressId: row.shipping_address_id ?? undefined,
    warehouseId: row.warehouse_id ?? undefined,
    carrierName: row.carrier_name ?? undefined,
    trackingNumber: row.tracking_number ?? undefined,
    vehicleNumber: row.vehicle_number ?? undefined,
    ewayBillNumber: row.eway_bill_number ?? undefined,
    notes: row.notes ?? undefined,
    postedAt: toIso(row.posted_at),
    cancelledAt: toIso(row.cancelled_at),
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
    deletedAt: toIso(row.deleted_at),
    lines,
  };
}

function applyScope(query: Knex.QueryBuilder, request: Pick<DeliveryNoteListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyFilters(query: Knex.QueryBuilder, request: DeliveryNoteListRequest) {
  applyScope(query, request).whereNull("deleted_at");
  if (request.status) query.where("status", request.status);
  if (request.customerId) query.where("customer_id", request.customerId);
  if (request.salesOrderId) query.where("sales_order_id", request.salesOrderId);
  if (request.warehouseId) query.where("warehouse_id", request.warehouseId);
  if (request.deliveryDateFrom) query.where("delivery_date", ">=", request.deliveryDateFrom);
  if (request.deliveryDateTo) query.where("delivery_date", "<=", request.deliveryDateTo);
  if (request.postingDateFrom) query.where("posting_date", ">=", request.postingDateFrom);
  if (request.postingDateTo) query.where("posting_date", "<=", request.postingDateTo);
  if (request.search) {
    const search = `%${request.search}%`;
    query.andWhere((builder) => {
      builder.whereILike("delivery_note_number", search).orWhereILike("carrier_name", search).orWhereILike("tracking_number", search).orWhereILike("vehicle_number", search).orWhereILike("eway_bill_number", search).orWhereILike("notes", search);
    });
  }
  return query;
}

async function insertLines(connection: Knex, tenantId: string, deliveryNoteId: string, lines: DeliveryNoteLineRecord[]) {
  if (lines.length === 0) return;
  await connection<LineRow>(lineTable).insert(
    lines.map((line) => ({
      id: line.id,
      tenant_id: tenantId,
      delivery_note_id: deliveryNoteId,
      sales_order_line_id: line.salesOrderLineId,
      line_number: line.lineNumber,
      item_id: line.itemId,
      item_name: line.itemName,
      description: toNullable(line.description),
      ordered_quantity: line.orderedQuantity,
      previously_delivered_quantity: line.previouslyDeliveredQuantity,
      quantity: line.quantity,
      remaining_quantity_after_delivery: line.remainingQuantityAfterDelivery,
      uom_id: line.uomId,
      warehouse_id: toNullable(line.warehouseId),
      bin_id: toNullable(line.binId),
      is_stock_item: line.isStockItem,
      stock_ledger_entry_id: toNullable(line.stockLedgerEntryId),
    })),
  );
}

async function attachLines(connection: Knex, rows: NoteRow[]) {
  if (rows.length === 0) return [];
  const lineRows = await connection<LineRow>(lineTable)
    .whereIn(
      "delivery_note_id",
      rows.map((row) => row.id),
    )
    .orderBy("line_number", "asc");
  const byNote = new Map<string, DeliveryNoteLineRecord[]>();
  for (const line of lineRows.map(mapLineRow)) byNote.set(line.deliveryNoteId, [...(byNote.get(line.deliveryNoteId) ?? []), line]);
  return rows.map((row) => mapNoteRow(row, byNote.get(row.id) ?? []));
}

export function createDeliveryNotesRepository(database?: Knex): DeliveryNoteRepository {
  const db = () => database ?? getTenantKnex();

  async function create(input: DeliveryNoteCreateInput, lines: DeliveryNoteLineRecord[]) {
    const connection = db();
    const created = await connection.transaction(async (trx) => {
      const [row] = await trx<NoteRow>(noteTable)
        .insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          delivery_note_number: numberWithPrefix("DN", input.deliveryNoteNumber),
          sales_order_id: input.salesOrderId,
          customer_id: input.customerId!,
          party_id: toNullable(input.partyId),
          delivery_date: input.deliveryDate ?? new Date().toISOString().slice(0, 10),
          status: "DRAFT",
          shipping_address_id: toNullable(input.shippingAddressId),
          warehouse_id: toNullable(input.warehouseId),
          carrier_name: toNullable(input.carrierName),
          tracking_number: toNullable(input.trackingNumber),
          vehicle_number: toNullable(input.vehicleNumber),
          eway_bill_number: toNullable(input.ewayBillNumber),
          notes: toNullable(input.notes),
        })
        .returning("*");
      await insertLines(trx, input.tenantId, row.id, lines.map((line) => ({ ...line, deliveryNoteId: row.id })));
      return row;
    });
    return (await attachLines(connection, [created]))[0];
  }

  return {
    async createDeliveryNote(input, lines) {
      return create(input, lines);
    },
    async createDeliveryNoteFromSalesOrder(input, lines) {
      return create(input, lines);
    },
    async listDeliveryNotes(request) {
      const page = request.page ?? 1;
      const pageSize = request.pageSize ?? 25;
      const connection = db();
      const rowsQuery = applyFilters(connection<NoteRow>(noteTable).select("*"), request)
        .orderBy(request.sortBy ?? "created_at", request.sortDirection ?? "desc")
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const countQuery = applyFilters(connection<NoteRow>(noteTable).count<{ count: string }[]>({ count: "*" }), request);
      const [rows, countRows] = await Promise.all([rowsQuery, countQuery]);
      return { rows: await attachLines(connection, rows), total: Number(countRows[0]?.count ?? 0), page, pageSize };
    },
    async getDeliveryNoteById(tenantId, id) {
      const connection = db();
      const row = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getDeliveryNoteByNumber(tenantId, deliveryNoteNumber, companyId) {
      const query = db()<NoteRow>(noteTable).where({ tenant_id: tenantId, delivery_note_number: deliveryNoteNumber }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? (await attachLines(db(), [row]))[0] : undefined;
    },
    async getDeliveryNotesBySalesOrder(tenantId, salesOrderId) {
      const connection = db();
      const rows = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, sales_order_id: salesOrderId }).whereNull("deleted_at").orderBy("created_at", "desc");
      return attachLines(connection, rows);
    },
    async updateDeliveryNote(tenantId, id, input: DeliveryNoteUpdateInput, lines) {
      const connection = db();
      const updated = await connection.transaction(async (trx) => {
        const [row] = await trx<NoteRow>(noteTable)
          .where({ tenant_id: tenantId, id, status: "DRAFT" })
          .whereNull("deleted_at")
          .update(
            compact({
              company_id: input.companyId,
              branch_id: input.branchId,
              delivery_date: input.deliveryDate,
              shipping_address_id: input.shippingAddressId,
              warehouse_id: input.warehouseId,
              carrier_name: input.carrierName,
              tracking_number: input.trackingNumber,
              vehicle_number: input.vehicleNumber,
              eway_bill_number: input.ewayBillNumber,
              notes: input.notes,
              updated_at: trx.fn.now(),
            }),
          )
          .returning("*");
        if (!row) return undefined;
        if (lines) {
          await trx<LineRow>(lineTable).where({ tenant_id: tenantId, delivery_note_id: id }).delete();
          await insertLines(trx, tenantId, id, lines);
        }
        return row;
      });
      return updated ? (await attachLines(connection, [updated]))[0] : undefined;
    },
    async softDeleteDeliveryNote(tenantId, id) {
      const connection = db();
      const [row] = await connection<NoteRow>(noteTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async postDeliveryNote(tenantId, id, input, stockLedgerEntryIdsByLineId) {
      const connection = db();
      const updated = await connection.transaction(async (trx) => {
        for (const [lineId, entryId] of stockLedgerEntryIdsByLineId.entries()) {
          await trx<LineRow>(lineTable).where({ tenant_id: tenantId, id: lineId, delivery_note_id: id }).update({ stock_ledger_entry_id: entryId, updated_at: trx.fn.now() });
        }
        const [row] = await trx<NoteRow>(noteTable)
          .where({ tenant_id: tenantId, id, status: "DRAFT" })
          .whereNull("deleted_at")
          .update({ status: "POSTED", posting_date: input.postingDate ?? new Date().toISOString().slice(0, 10), posted_at: trx.fn.now(), updated_at: trx.fn.now() })
          .returning("*");
        return row;
      });
      return updated ? (await attachLines(connection, [updated]))[0] : undefined;
    },
    async cancelDraftDeliveryNote(tenantId, id) {
      const connection = db();
      const [row] = await connection<NoteRow>(noteTable)
        .where({ tenant_id: tenantId, id, status: "DRAFT" })
        .whereNull("deleted_at")
        .update({ status: "CANCELLED", cancelled_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? (await attachLines(connection, [row]))[0] : undefined;
    },
    async getDeliveryNoteLines(tenantId, deliveryNoteId) {
      const rows = await db()<LineRow>(lineTable).where({ tenant_id: tenantId, delivery_note_id: deliveryNoteId }).orderBy("line_number", "asc");
      return rows.map(mapLineRow);
    },
    async replaceDraftDeliveryNoteLines(tenantId, deliveryNoteId, lines) {
      const connection = db();
      await connection.transaction(async (trx) => {
        await trx<LineRow>(lineTable).where({ tenant_id: tenantId, delivery_note_id: deliveryNoteId }).delete();
        await insertLines(trx, tenantId, deliveryNoteId, lines);
      });
      return this.getDeliveryNoteLines(tenantId, deliveryNoteId);
    },
    async getSalesOrderLineDeliveredQuantities(tenantId, salesOrderId) {
      const rows = await db()<LineRow>(`${lineTable} as l`)
        .join(`${noteTable} as n`, "n.id", "l.delivery_note_id")
        .where({ "l.tenant_id": tenantId, "n.sales_order_id": salesOrderId, "n.status": "POSTED" })
        .whereNull("n.deleted_at")
        .groupBy("l.sales_order_line_id")
        .select("l.sales_order_line_id")
        .sum<{ sales_order_line_id: string; delivered: string }[]>({ delivered: "l.quantity" });
      return new Map(rows.map((row) => [row.sales_order_line_id, Number(row.delivered)]));
    },
    async getSalesOrderDeliverySummary(tenantId, salesOrder: SalesOrderRecord): Promise<SalesOrderDeliverySummary> {
      const deliveredByLine = await this.getSalesOrderLineDeliveredQuantities(tenantId, salesOrder.id);
      const lines = salesOrder.lines.map((line) => {
        const deliveredQuantity = deliveredByLine.get(line.id) ?? 0;
        return {
          salesOrderLineId: line.id,
          lineNumber: line.lineNumber,
          itemId: line.itemId,
          itemName: line.itemName,
          orderedQuantity: line.quantity,
          deliveredQuantity,
          remainingQuantity: Math.max(0, line.quantity - deliveredQuantity),
          uomId: line.uomId,
        };
      });
      const orderedQuantity = lines.reduce((sum, line) => sum + line.orderedQuantity, 0);
      const deliveredQuantity = lines.reduce((sum, line) => sum + line.deliveredQuantity, 0);
      const remainingQuantity = lines.reduce((sum, line) => sum + line.remainingQuantity, 0);
      const fulfillmentStatus = deliveredQuantity <= 0 ? "NOT_DELIVERED" : remainingQuantity <= 0 ? "DELIVERED" : "PARTIALLY_DELIVERED";
      return { salesOrderId: salesOrder.id, orderNumber: salesOrder.orderNumber, fulfillmentStatus, orderedQuantity, deliveredQuantity, remainingQuantity, lines };
    },
    async getDeliveryStats(tenantId, filters = {}): Promise<DeliveryNoteStats> {
      const rows: NoteRow[] = await applyFilters(db()<NoteRow>(noteTable).select("*"), { tenantId, ...filters }).orderBy("created_at", "desc");
      const byStatus: Record<DeliveryNoteStatus, number> = { DRAFT: 0, POSTED: 0, CANCELLED: 0 };
      for (const row of rows) byStatus[row.status] += 1;
      return {
        total: rows.length,
        draftCount: byStatus.DRAFT,
        postedCount: byStatus.POSTED,
        cancelledCount: byStatus.CANCELLED,
        deliveredOrdersCount: new Set(rows.filter((row) => row.status === "POSTED").map((row) => row.sales_order_id)).size,
        byStatus,
      };
    },
  };
}

export const deliveryNotesRepository = createDeliveryNotesRepository();
