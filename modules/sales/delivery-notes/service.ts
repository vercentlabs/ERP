import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { inventoryStockRepository } from "../../inventory/stock-ledger/repository";
import type { InventoryStockRepository } from "../../inventory/stock-ledger/types";
import { masterDataRepository } from "../../master-data/foundation/repository";
import type { MasterDataRepository } from "../../master-data/foundation/types";
import { salesOrdersRepository } from "../sales-orders/repository";
import type { SalesOrderLineRecord, SalesOrderRecord, SalesOrderRepository } from "../sales-orders/types";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { deliveryNotesRepository } from "./repository";
import {
  createDeliveryNoteFromSalesOrderSchema,
  deliveryNoteCreateSchema,
  deliveryNoteListSchema,
  deliveryNoteUpdateSchema,
  postDeliveryNoteSchema,
} from "./schemas";
import type {
  CreateDeliveryNoteFromSalesOrderInput,
  DeliveryNoteActionContext,
  DeliveryNoteCreateInput,
  DeliveryNoteLineInput,
  DeliveryNoteLineRecord,
  DeliveryNoteListRequest,
  DeliveryNoteRecord,
  DeliveryNoteRepository,
  DeliveryNoteUpdateInput,
} from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

const assertPermission = (context: DeliveryNoteActionContext, permission: string, record?: unknown) => {
  assertAllowed(evaluatePolicy({ actor: context, permission, record: record as never }));
};

const assertFound = <T>(record: T | undefined, label: string) => {
  if (!record) throw new Error(`${label} was not found`);
  return record;
};

function assertOrderDeliverable(order: SalesOrderRecord) {
  if (order.status !== "CONFIRMED") throw new Error("Delivery note can only be created for CONFIRMED sales orders");
}

function assertDraft(note: DeliveryNoteRecord) {
  if (note.status !== "DRAFT") throw new Error("Only DRAFT delivery notes can be edited, posted, cancelled, or deleted");
}

export function createDeliveryNotesService(
  repository: DeliveryNoteRepository = deliveryNotesRepository,
  salesOrders: SalesOrderRepository = salesOrdersRepository,
  masterData: MasterDataRepository = masterDataRepository,
  inventory: InventoryStockRepository = inventoryStockRepository,
) {
  async function buildLines(tenantId: string, order: SalesOrderRecord, inputLines: DeliveryNoteLineInput[], headerWarehouseId?: string): Promise<DeliveryNoteLineRecord[]> {
    const deliveredByLine = await repository.getSalesOrderLineDeliveredQuantities(tenantId, order.id);
    const lines: DeliveryNoteLineRecord[] = [];
    const used = new Set<string>();

    for (const [index, input] of inputLines.entries()) {
      if (used.has(input.salesOrderLineId)) throw new Error("Delivery note cannot contain duplicate sales order lines");
      used.add(input.salesOrderLineId);
      const orderLine = assertFound(order.lines.find((line) => line.id === input.salesOrderLineId), "Sales order line");
      const item = assertFound(await masterData.getItemById(tenantId, orderLine.itemId), "Item");
      const deliveredQuantity = deliveredByLine.get(orderLine.id) ?? 0;
      const remainingQuantity = orderLine.quantity - deliveredQuantity;
      if (input.quantity <= 0) throw new Error("Delivered quantity must be greater than zero");
      if (input.quantity > remainingQuantity) throw new Error("Delivery quantity cannot exceed remaining sales order quantity");
      const warehouseId = input.warehouseId ?? headerWarehouseId;
      if (item.isStockItem) {
        if (!warehouseId) throw new Error("Warehouse is required for stock item delivery lines");
        const warehouse = assertFound(await inventory.getWarehouseById(tenantId, warehouseId), "Warehouse");
        if (warehouse.status !== "ACTIVE") throw new Error("Warehouse must be ACTIVE for delivery posting");
        if (input.binId) {
          const bin = assertFound(await inventory.getWarehouseBinById(tenantId, input.binId), "Warehouse bin");
          if (bin.warehouseId !== warehouseId) throw new Error("Warehouse bin must belong to the selected warehouse");
          if (bin.status !== "ACTIVE") throw new Error("Warehouse bin must be ACTIVE for delivery posting");
        }
      }
      lines.push({
        id: crypto.randomUUID(),
        deliveryNoteId: "",
        salesOrderLineId: input.salesOrderLineId,
        lineNumber: index + 1,
        itemId: orderLine.itemId,
        itemName: orderLine.itemName,
        description: orderLine.description,
        orderedQuantity: orderLine.quantity,
        previouslyDeliveredQuantity: deliveredQuantity,
        quantity: input.quantity,
        remainingQuantityAfterDelivery: Math.max(0, remainingQuantity - input.quantity),
        uomId: orderLine.uomId,
        warehouseId,
        binId: input.binId,
        isStockItem: item.isStockItem,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    return lines;
  }

  function defaultLinesFromOrder(order: SalesOrderRecord): DeliveryNoteLineInput[] {
    return order.lines.map((line: SalesOrderLineRecord) => ({ salesOrderLineId: line.id, quantity: line.quantity }));
  }

  async function assertPostableStock(note: DeliveryNoteRecord) {
    const ledgerIdsByLineId = new Map<string, string>();
    for (const line of note.lines) {
      if (!line.isStockItem) continue;
      const availability = await inventory.getItemStockAvailability({
        tenantId: note.tenantId,
        companyId: note.companyId,
        branchId: note.branchId,
        itemId: line.itemId,
        warehouseId: line.warehouseId,
        binId: line.binId,
      });
      if (availability.totalAvailable < line.quantity) throw new Error("Insufficient available stock for delivery posting");
    }
    for (const line of note.lines) {
      if (!line.isStockItem) continue;
      const ledger = await inventory.createStockLedgerEntry({
        tenantId: note.tenantId,
        companyId: note.companyId,
        branchId: note.branchId,
        itemId: line.itemId,
        warehouseId: line.warehouseId!,
        binId: line.binId,
        quantity: line.quantity,
        uomId: line.uomId,
        movementType: "SALES_ISSUE",
        referenceType: "SALES_DELIVERY_NOTE",
        referenceId: note.id,
        remarks: `Delivery note ${note.deliveryNoteNumber}`,
        createdByUserId: "system",
      });
      ledgerIdsByLineId.set(line.id, ledger.id);
      createAuditEvent("stockSalesIssued", note.tenantId, note.id, "system", { event: events.stockSalesIssued, stockLedgerEntryId: ledger.id });
    }
    return ledgerIdsByLineId;
  }

  return {
    async list(input: unknown, context?: DeliveryNoteActionContext) {
      const parsed = deliveryNoteListSchema.parse(input) as DeliveryNoteListRequest;
      if (context) assertPermission(context, permissions.view);
      return repository.listDeliveryNotes(parsed);
    },

    async stats(input: unknown, context: DeliveryNoteActionContext) {
      const parsed = deliveryNoteListSchema.pick({ tenantId: true, companyId: true, branchId: true, warehouseId: true }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getDeliveryStats(parsed.tenantId, parsed);
    },

    async getById(tenantId: string, id: string, context: DeliveryNoteActionContext) {
      const note = assertFound(await repository.getDeliveryNoteById(tenantId, id), "Delivery note");
      assertPermission(context, permissions.view, note);
      return note;
    },

    async getByNumber(tenantId: string, number: string, context: DeliveryNoteActionContext, companyId?: string) {
      const note = assertFound(await repository.getDeliveryNoteByNumber(tenantId, number, companyId), "Delivery note");
      assertPermission(context, permissions.view, note);
      return note;
    },

    async create(input: unknown, context: DeliveryNoteActionContext) {
      const parsed = deliveryNoteCreateSchema.parse(input) as DeliveryNoteCreateInput;
      assertPermission(context, permissions.create);
      const order = assertFound(await salesOrders.getSalesOrderById(parsed.tenantId, parsed.salesOrderId), "Sales order");
      assertOrderDeliverable(order);
      const lines = await buildLines(parsed.tenantId, order, parsed.lines, parsed.warehouseId);
      const created = await repository.createDeliveryNote({ ...parsed, companyId: parsed.companyId ?? order.companyId, branchId: parsed.branchId ?? order.branchId, customerId: order.customerId, partyId: order.partyId, shippingAddressId: parsed.shippingAddressId ?? order.shippingAddressId }, lines, context.actorId);
      createAuditEvent("created", created.tenantId, created.id, context.actorId, { event: events.created });
      return created;
    },

    async createFromSalesOrder(tenantId: string, salesOrderId: string, input: unknown, context: DeliveryNoteActionContext) {
      const parsed = createDeliveryNoteFromSalesOrderSchema.parse({ tenantId, ...(input as object) }) as CreateDeliveryNoteFromSalesOrderInput;
      assertPermission(context, permissions.create);
      const order = assertFound(await salesOrders.getSalesOrderById(tenantId, salesOrderId), "Sales order");
      assertOrderDeliverable(order);
      const summary = await repository.getSalesOrderDeliverySummary(tenantId, order);
      if (summary.fulfillmentStatus === "DELIVERED") throw new Error("Sales order is already fully delivered");
      const lines = await buildLines(
        tenantId,
        order,
        summary.lines.filter((line) => line.remainingQuantity > 0).map((line) => ({ salesOrderLineId: line.salesOrderLineId, quantity: line.remainingQuantity })),
        parsed.warehouseId,
      );
      const created = await repository.createDeliveryNoteFromSalesOrder({ ...parsed, salesOrderId, companyId: order.companyId, branchId: order.branchId, customerId: order.customerId, partyId: order.partyId, shippingAddressId: parsed.shippingAddressId ?? order.shippingAddressId, lines: defaultLinesFromOrder(order) }, lines, context.actorId);
      createAuditEvent("createdFromOrder", created.tenantId, created.id, context.actorId, { event: events.createdFromOrder, salesOrderId });
      return created;
    },

    async update(tenantId: string, id: string, input: unknown, context: DeliveryNoteActionContext) {
      const current = assertFound(await repository.getDeliveryNoteById(tenantId, id), "Delivery note");
      assertPermission(context, permissions.update, current);
      assertDraft(current);
      const parsed = deliveryNoteUpdateSchema.parse(input) as DeliveryNoteUpdateInput;
      const order = assertFound(await salesOrders.getSalesOrderById(tenantId, current.salesOrderId), "Sales order");
      assertOrderDeliverable(order);
      const lines = parsed.lines ? await buildLines(tenantId, order, parsed.lines, parsed.warehouseId ?? current.warehouseId) : undefined;
      const updated = assertFound(await repository.updateDeliveryNote(tenantId, id, parsed, lines, context.actorId), "Delivery note");
      createAuditEvent("updated", tenantId, id, context.actorId, { event: events.updated });
      return updated;
    },

    async softDelete(tenantId: string, id: string, context: DeliveryNoteActionContext) {
      const current = assertFound(await repository.getDeliveryNoteById(tenantId, id), "Delivery note");
      assertPermission(context, permissions.delete, current);
      assertDraft(current);
      const deleted = assertFound(await repository.softDeleteDeliveryNote(tenantId, id, context.actorId), "Delivery note");
      createAuditEvent("deleted", tenantId, id, context.actorId, { event: events.deleted });
      return deleted;
    },

    async post(tenantId: string, id: string, input: unknown, context: DeliveryNoteActionContext) {
      const current = assertFound(await repository.getDeliveryNoteById(tenantId, id), "Delivery note");
      assertPermission(context, permissions.post, current);
      assertDraft(current);
      const order = assertFound(await salesOrders.getSalesOrderById(tenantId, current.salesOrderId), "Sales order");
      assertOrderDeliverable(order);
      const parsed = postDeliveryNoteSchema.parse(input);
      const ledgerIdsByLineId = await assertPostableStock(current);
      const posted = assertFound(await repository.postDeliveryNote(tenantId, id, parsed, ledgerIdsByLineId, context.actorId), "Delivery note");
      createAuditEvent("posted", tenantId, id, context.actorId, { event: events.posted });
      return posted;
    },

    async cancel(tenantId: string, id: string, context: DeliveryNoteActionContext) {
      const current = assertFound(await repository.getDeliveryNoteById(tenantId, id), "Delivery note");
      assertPermission(context, permissions.cancel, current);
      assertDraft(current);
      const cancelled = assertFound(await repository.cancelDraftDeliveryNote(tenantId, id, context.actorId), "Delivery note");
      createAuditEvent("cancelled", tenantId, id, context.actorId, { event: events.cancelled });
      return cancelled;
    },

    async getLines(tenantId: string, id: string, context: DeliveryNoteActionContext) {
      const current = assertFound(await repository.getDeliveryNoteById(tenantId, id), "Delivery note");
      assertPermission(context, permissions.view, current);
      return repository.getDeliveryNoteLines(tenantId, id);
    },

    async getBySalesOrder(tenantId: string, salesOrderId: string, context: DeliveryNoteActionContext) {
      assertPermission(context, permissions.view);
      return repository.getDeliveryNotesBySalesOrder(tenantId, salesOrderId);
    },

    async getSalesOrderDeliverySummary(tenantId: string, salesOrderId: string, context: DeliveryNoteActionContext) {
      assertPermission(context, permissions.view);
      const order = assertFound(await salesOrders.getSalesOrderById(tenantId, salesOrderId), "Sales order");
      return repository.getSalesOrderDeliverySummary(tenantId, order);
    },
  };
}

export const deliveryNotesService = createDeliveryNotesService();
