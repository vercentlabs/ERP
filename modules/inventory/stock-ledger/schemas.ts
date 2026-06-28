import { z } from "zod";
import { inventoryStatuses, stockMovementTypes, warehouseTypes } from "./types";

const optionalNumber = z.coerce.number().optional();
const positiveNumber = z.coerce.number().positive();
const scope = {
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
};

export const warehouseCreateSchema = z.object({
  ...scope,
  warehouseNumber: z.string().optional(),
  name: z.string().min(1),
  code: z.string().min(1),
  type: z.enum(warehouseTypes).default("MAIN"),
  status: z.enum(inventoryStatuses).default("ACTIVE"),
  addressId: z.string().uuid().optional(),
  managerUserId: z.string().optional(),
  isDefault: z.coerce.boolean().optional(),
  notes: z.string().optional(),
});

export const warehouseUpdateSchema = warehouseCreateSchema.omit({ tenantId: true, warehouseNumber: true }).partial();

export const warehouseListSchema = z.object({
  ...scope,
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(200).optional(),
  search: z.string().optional(),
  status: z.enum(inventoryStatuses).optional(),
  type: z.enum(warehouseTypes).optional(),
  sortBy: z.enum(["created_at", "updated_at", "name", "code", "warehouse_number"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export const warehouseBinCreateSchema = z.object({
  ...scope,
  warehouseId: z.string().uuid(),
  binNumber: z.string().optional(),
  code: z.string().min(1),
  name: z.string().min(1),
  zone: z.string().optional(),
  aisle: z.string().optional(),
  rack: z.string().optional(),
  shelf: z.string().optional(),
  status: z.enum(inventoryStatuses).default("ACTIVE"),
  isDefault: z.coerce.boolean().optional(),
});

export const warehouseBinUpdateSchema = warehouseBinCreateSchema.omit({ tenantId: true, warehouseId: true, binNumber: true }).partial();

export const warehouseBinListSchema = z.object({
  ...scope,
  warehouseId: z.string().uuid().optional(),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(200).optional(),
  search: z.string().optional(),
  status: z.enum(inventoryStatuses).optional(),
  sortBy: z.enum(["created_at", "updated_at", "name", "code", "bin_number"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export const stockLedgerListSchema = z.object({
  ...scope,
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(200).optional(),
  search: z.string().optional(),
  itemId: z.string().uuid().optional(),
  warehouseId: z.string().uuid().optional(),
  binId: z.string().uuid().optional(),
  movementType: z.enum(stockMovementTypes).optional(),
  referenceType: z.string().optional(),
  referenceId: z.string().optional(),
  postingDateFrom: z.string().optional(),
  postingDateTo: z.string().optional(),
  sortBy: z.enum(["created_at", "posting_date", "movement_type", "quantity"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export const stockBalanceListSchema = z.object({
  ...scope,
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(200).optional(),
  itemId: z.string().uuid().optional(),
  warehouseId: z.string().uuid().optional(),
  binId: z.string().uuid().optional(),
});

export const openingStockSchema = z.object({
  ...scope,
  itemId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  binId: z.string().uuid().optional(),
  postingDate: z.string().optional(),
  postingTime: z.string().optional(),
  quantity: positiveNumber,
  uomId: z.string().uuid().optional(),
  unitCost: optionalNumber,
  stockValue: optionalNumber,
  referenceType: z.string().optional(),
  referenceId: z.string().optional(),
  remarks: z.string().optional(),
});

export const stockAdjustmentSchema = openingStockSchema.extend({
  adjustmentType: z.enum(["IN", "OUT"]),
});

export const stockAvailabilitySchema = z.object({
  ...scope,
  itemId: z.string().uuid(),
  warehouseId: z.string().uuid().optional(),
  binId: z.string().uuid().optional(),
});

export const stockLedgerCreateSchema = openingStockSchema;
export const stockLedgerListSchemaCompat = stockLedgerListSchema;
export const stockLedgerUpdateSchema = z.never();
