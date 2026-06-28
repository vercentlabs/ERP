import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { masterDataRepository } from "../../master-data/foundation/repository";
import type { MasterDataRepository } from "../../master-data/foundation/types";
import { salesOrdersRepository } from "../../sales/sales-orders/repository";
import type { SalesOrderRepository } from "../../sales/sales-orders/types";
import { permissions } from "./permissions";
import { inventoryStockRepository } from "./repository";
import {
  openingStockSchema,
  stockAdjustmentSchema,
  stockAvailabilitySchema,
  stockBalanceListSchema,
  stockLedgerListSchema,
  warehouseBinCreateSchema,
  warehouseBinListSchema,
  warehouseBinUpdateSchema,
  warehouseCreateSchema,
  warehouseListSchema,
  warehouseUpdateSchema,
} from "./schemas";
import type {
  InventoryActionContext,
  InventoryStockRepository,
  SalesOrderLineAvailability,
  StockAdjustmentInput,
  StockMovementInput,
  StockMovementType,
  WarehouseBinCreateInput,
  WarehouseCreateInput,
} from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

const assertPermission = (context: InventoryActionContext, permission: string, record?: unknown) => {
  assertAllowed(evaluatePolicy({ actor: context, permission, record: record as never }));
};

const assertFound = <T>(record: T | undefined, label: string) => {
  if (!record) throw new Error(`${label} was not found`);
  return record;
};

const outboundMovements: StockMovementType[] = ["ADJUSTMENT_OUT", "TRANSFER_OUT", "SALES_HOLD", "SALES_ISSUE", "MANUFACTURING_ISSUE"];

export function createInventoryStockService(
  repository: InventoryStockRepository = inventoryStockRepository,
  masterData: MasterDataRepository = masterDataRepository,
  salesOrders: SalesOrderRepository = salesOrdersRepository,
) {
  async function assertWarehouseActive(tenantId: string, warehouseId: string) {
    const warehouse = assertFound(await repository.getWarehouseById(tenantId, warehouseId), "Warehouse");
    if (warehouse.status !== "ACTIVE") throw new Error("Warehouse must be ACTIVE for stock movement");
    return warehouse;
  }

  async function assertBinValid(tenantId: string, warehouseId: string, binId?: string) {
    if (!binId) return undefined;
    const bin = assertFound(await repository.getWarehouseBinById(tenantId, binId), "Warehouse bin");
    if (bin.warehouseId !== warehouseId) throw new Error("Warehouse bin must belong to the selected warehouse");
    if (bin.status !== "ACTIVE") throw new Error("Warehouse bin must be ACTIVE for stock movement");
    return bin;
  }

  async function normalizeMovement(input: StockMovementInput, movementType: StockMovementType, context: InventoryActionContext) {
    const item = assertFound(await masterData.getItemById(input.tenantId, input.itemId), "Item");
    if (!item.isStockItem) throw new Error("Only stock items can have stock movements");
    if (item.status !== "ACTIVE") throw new Error("Item must be ACTIVE for stock movement");
    await assertWarehouseActive(input.tenantId, input.warehouseId);
    await assertBinValid(input.tenantId, input.warehouseId, input.binId);
    const uomId = input.uomId ?? item.baseUomId;
    assertFound(await masterData.getUomById(input.tenantId, uomId), "UOM");
    if (outboundMovements.includes(movementType)) {
      const availability = await repository.getItemStockAvailability({ tenantId: input.tenantId, companyId: input.companyId, branchId: input.branchId, itemId: input.itemId, warehouseId: input.warehouseId, binId: input.binId });
      if (availability.totalAvailable < input.quantity) throw new Error("Insufficient available stock for adjustment out");
    }
    const stockValue = input.stockValue ?? (input.unitCost == null ? undefined : input.unitCost * input.quantity);
    return { ...input, uomId, stockValue, movementType, createdByUserId: context.actorId };
  }

  return {
    async listWarehouses(input: unknown, context: InventoryActionContext) {
      const parsed = warehouseListSchema.parse(input);
      assertPermission(context, permissions.viewWarehouses);
      return repository.listWarehouses(parsed);
    },
    async createWarehouse(input: unknown, context: InventoryActionContext) {
      const parsed = warehouseCreateSchema.parse(input) as WarehouseCreateInput;
      assertPermission(context, permissions.createWarehouses);
      return repository.createWarehouse(parsed, context.actorId);
    },
    async getWarehouseById(tenantId: string, id: string, context: InventoryActionContext) {
      const record = assertFound(await repository.getWarehouseById(tenantId, id), "Warehouse");
      assertPermission(context, permissions.viewWarehouses, record);
      return record;
    },
    async updateWarehouse(tenantId: string, id: string, input: unknown, context: InventoryActionContext) {
      const current = assertFound(await repository.getWarehouseById(tenantId, id), "Warehouse");
      assertPermission(context, permissions.updateWarehouses, current);
      return assertFound(await repository.updateWarehouse(tenantId, id, warehouseUpdateSchema.parse(input), context.actorId), "Warehouse");
    },
    async softDeleteWarehouse(tenantId: string, id: string, context: InventoryActionContext) {
      const current = assertFound(await repository.getWarehouseById(tenantId, id), "Warehouse");
      assertPermission(context, permissions.deleteWarehouses, current);
      return assertFound(await repository.softDeleteWarehouse(tenantId, id, context.actorId), "Warehouse");
    },
    async setDefaultWarehouse(tenantId: string, id: string, context: InventoryActionContext) {
      const current = assertFound(await repository.getWarehouseById(tenantId, id), "Warehouse");
      assertPermission(context, permissions.updateWarehouses, current);
      return assertFound(await repository.setDefaultWarehouse(tenantId, id, context.actorId), "Warehouse");
    },
    async listWarehouseBins(input: unknown, context: InventoryActionContext) {
      const parsed = warehouseBinListSchema.parse(input);
      assertPermission(context, permissions.viewBins);
      return repository.listWarehouseBins(parsed);
    },
    async createWarehouseBin(input: unknown, context: InventoryActionContext) {
      const parsed = warehouseBinCreateSchema.parse(input) as WarehouseBinCreateInput;
      assertPermission(context, permissions.createBins);
      await assertWarehouseActive(parsed.tenantId, parsed.warehouseId);
      return repository.createWarehouseBin(parsed, context.actorId);
    },
    async getWarehouseBinById(tenantId: string, id: string, context: InventoryActionContext) {
      const record = assertFound(await repository.getWarehouseBinById(tenantId, id), "Warehouse bin");
      assertPermission(context, permissions.viewBins, record);
      return record;
    },
    async updateWarehouseBin(tenantId: string, id: string, input: unknown, context: InventoryActionContext) {
      const current = assertFound(await repository.getWarehouseBinById(tenantId, id), "Warehouse bin");
      assertPermission(context, permissions.updateBins, current);
      return assertFound(await repository.updateWarehouseBin(tenantId, id, warehouseBinUpdateSchema.parse(input), context.actorId), "Warehouse bin");
    },
    async softDeleteWarehouseBin(tenantId: string, id: string, context: InventoryActionContext) {
      const current = assertFound(await repository.getWarehouseBinById(tenantId, id), "Warehouse bin");
      assertPermission(context, permissions.deleteBins, current);
      return assertFound(await repository.softDeleteWarehouseBin(tenantId, id, context.actorId), "Warehouse bin");
    },
    async setDefaultWarehouseBin(tenantId: string, id: string, context: InventoryActionContext) {
      const current = assertFound(await repository.getWarehouseBinById(tenantId, id), "Warehouse bin");
      assertPermission(context, permissions.updateBins, current);
      return assertFound(await repository.setDefaultWarehouseBin(tenantId, id, context.actorId), "Warehouse bin");
    },
    async listStockLedger(input: unknown, context: InventoryActionContext) {
      const parsed = stockLedgerListSchema.parse(input);
      assertPermission(context, permissions.viewLedger);
      return repository.listStockLedgerEntries(parsed);
    },
    async getItemLedger(input: unknown, context: InventoryActionContext) {
      const parsed = stockLedgerListSchema.required({ itemId: true }).parse(input);
      assertPermission(context, permissions.viewLedger);
      return repository.getItemLedger(parsed);
    },
    async listStockBalances(input: unknown, context: InventoryActionContext) {
      const parsed = stockBalanceListSchema.parse(input);
      assertPermission(context, permissions.viewStock);
      return repository.getStockBalances(parsed);
    },
    async getItemStockAvailability(input: unknown, context: InventoryActionContext) {
      const parsed = stockAvailabilitySchema.parse(input);
      assertPermission(context, permissions.viewAvailability);
      return repository.getItemStockAvailability(parsed);
    },
    async createOpeningStock(input: unknown, context: InventoryActionContext) {
      const parsed = openingStockSchema.parse(input) as StockMovementInput;
      assertPermission(context, permissions.openingStock);
      const normalized = await normalizeMovement(parsed, "OPENING", context);
      return repository.createStockLedgerEntry(normalized);
    },
    async createStockAdjustment(input: unknown, context: InventoryActionContext) {
      const parsed = stockAdjustmentSchema.parse(input) as StockAdjustmentInput;
      assertPermission(context, permissions.adjustStock);
      const movementType: StockMovementType = parsed.adjustmentType === "IN" ? "ADJUSTMENT_IN" : "ADJUSTMENT_OUT";
      const normalized = await normalizeMovement(parsed, movementType, context);
      return repository.createStockLedgerEntry(normalized);
    },
    async getSalesOrderStockAvailability(tenantId: string, orderId: string, context: InventoryActionContext) {
      assertPermission(context, permissions.viewAvailability);
      const order = assertFound(await salesOrders.getSalesOrderById(tenantId, orderId), "Sales order");
      const result: SalesOrderLineAvailability[] = [];
      for (const line of order.lines) {
        const item = assertFound(await masterData.getItemById(tenantId, line.itemId), "Item");
        if (!item.isStockItem) {
          result.push({ itemId: line.itemId, itemName: line.itemName, orderedQuantity: line.quantity, totalAvailableQuantity: 0, availabilityStatus: "NON_STOCK_ITEM" });
          continue;
        }
        const availability = await repository.getItemStockAvailability({ tenantId, companyId: order.companyId, branchId: order.branchId, itemId: line.itemId });
        const status = availability.totalAvailable >= line.quantity ? "AVAILABLE" : availability.totalAvailable > 0 ? "PARTIAL" : "UNAVAILABLE";
        result.push({ itemId: line.itemId, itemName: line.itemName, orderedQuantity: line.quantity, totalAvailableQuantity: availability.totalAvailable, availabilityStatus: status });
      }
      return result;
    },
    async getLowStockSummary(tenantId: string, context: InventoryActionContext) {
      assertPermission(context, permissions.viewStock);
      return repository.getLowStockSummary(tenantId);
    },
  };
}

export const inventoryStockService = createInventoryStockService();
export const stockLedgerService = inventoryStockService;
