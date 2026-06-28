import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId, UserId } from "@vercent/shared-types";

export const warehouseTypes = ["MAIN", "BRANCH", "TRANSIT", "VIRTUAL", "PRODUCTION", "THIRD_PARTY"] as const;
export const inventoryStatuses = ["ACTIVE", "INACTIVE", "BLOCKED"] as const;
export const stockMovementTypes = [
  "OPENING",
  "ADJUSTMENT_IN",
  "ADJUSTMENT_OUT",
  "TRANSFER_IN",
  "TRANSFER_OUT",
  "SALES_HOLD",
  "SALES_RELEASE",
  "SALES_ISSUE",
  "SALES_RETURN",
  "PURCHASE_RECEIPT",
  "MANUFACTURING_RECEIPT",
  "MANUFACTURING_ISSUE",
] as const;
export const availabilityStatuses = ["AVAILABLE", "PARTIAL", "UNAVAILABLE", "NON_STOCK_ITEM"] as const;

export type WarehouseType = (typeof warehouseTypes)[number];
export type InventoryStatus = (typeof inventoryStatuses)[number];
export type StockMovementType = (typeof stockMovementTypes)[number];
export type AvailabilityStatus = (typeof availabilityStatuses)[number];
export type SortDirection = "asc" | "desc";

export type InventoryScope = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
};

export type WarehouseRecord = InventoryScope & {
  id: string;
  warehouseNumber: string;
  name: string;
  code: string;
  type: WarehouseType;
  status: InventoryStatus;
  addressId?: string;
  managerUserId?: UserId;
  isDefault: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type WarehouseBinRecord = InventoryScope & {
  id: string;
  warehouseId: string;
  binNumber: string;
  code: string;
  name: string;
  zone?: string;
  aisle?: string;
  rack?: string;
  shelf?: string;
  status: InventoryStatus;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type StockLedgerEntryRecord = InventoryScope & {
  id: string;
  entryNumber: string;
  itemId: string;
  warehouseId: string;
  binId?: string;
  postingDate: string;
  postingTime: string;
  movementType: StockMovementType;
  quantity: number;
  uomId: string;
  stockValue?: number;
  unitCost?: number;
  referenceType?: string;
  referenceId?: string;
  remarks?: string;
  createdByUserId?: UserId;
  createdAt: string;
};

export type StockBalanceRecord = InventoryScope & {
  id: string;
  itemId: string;
  warehouseId: string;
  binId?: string;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  stockValue?: number;
  averageCost?: number;
  updatedAt: string;
};

export type WarehouseCreateInput = InventoryScope & {
  warehouseNumber?: string;
  name: string;
  code: string;
  type?: WarehouseType;
  status?: InventoryStatus;
  addressId?: string;
  managerUserId?: UserId;
  isDefault?: boolean;
  notes?: string;
};

export type WarehouseUpdateInput = Partial<Omit<WarehouseCreateInput, "tenantId" | "warehouseNumber" | "code">> & { code?: string };

export type WarehouseBinCreateInput = InventoryScope & {
  warehouseId: string;
  binNumber?: string;
  code: string;
  name: string;
  zone?: string;
  aisle?: string;
  rack?: string;
  shelf?: string;
  status?: InventoryStatus;
  isDefault?: boolean;
};

export type WarehouseBinUpdateInput = Partial<Omit<WarehouseBinCreateInput, "tenantId" | "warehouseId" | "binNumber" | "code">> & { code?: string };

type InventoryPageRequest = Omit<PageRequest, "status">;

export type WarehouseListRequest = InventoryPageRequest & InventoryScope & {
  status?: InventoryStatus;
  type?: WarehouseType;
  sortBy?: "created_at" | "updated_at" | "name" | "code" | "warehouse_number";
  sortDirection?: SortDirection;
};

export type WarehouseBinListRequest = InventoryPageRequest & InventoryScope & {
  warehouseId?: string;
  status?: InventoryStatus;
  sortBy?: "created_at" | "updated_at" | "name" | "code" | "bin_number";
  sortDirection?: SortDirection;
};

export type StockLedgerListRequest = InventoryPageRequest & InventoryScope & {
  itemId?: string;
  warehouseId?: string;
  binId?: string;
  movementType?: StockMovementType;
  referenceType?: string;
  referenceId?: string;
  postingDateFrom?: string;
  postingDateTo?: string;
  sortBy?: "created_at" | "posting_date" | "movement_type" | "quantity";
  sortDirection?: SortDirection;
};

export type StockBalanceListRequest = InventoryPageRequest & InventoryScope & {
  itemId?: string;
  warehouseId?: string;
  binId?: string;
};

export type StockMovementInput = InventoryScope & {
  itemId: string;
  warehouseId: string;
  binId?: string;
  postingDate?: string;
  postingTime?: string;
  quantity: number;
  uomId?: string;
  unitCost?: number;
  stockValue?: number;
  referenceType?: string;
  referenceId?: string;
  remarks?: string;
};

export type StockAdjustmentInput = StockMovementInput & {
  adjustmentType: "IN" | "OUT";
};

export type StockAvailabilityRequest = InventoryScope & {
  itemId: string;
  warehouseId?: string;
  binId?: string;
};

export type ItemStockAvailability = {
  itemId: string;
  warehouseId?: string;
  binId?: string;
  totalOnHand: number;
  totalReserved: number;
  totalAvailable: number;
  balances: StockBalanceRecord[];
};

export type SalesOrderLineAvailability = {
  itemId: string;
  itemName: string;
  orderedQuantity: number;
  totalAvailableQuantity: number;
  availabilityStatus: AvailabilityStatus;
};

export type InventoryActionContext = ActorContext & {
  reason?: string;
};

export type InventoryStockRepository = {
  createWarehouse(input: WarehouseCreateInput, actorId?: string): Promise<WarehouseRecord>;
  listWarehouses(request: WarehouseListRequest): Promise<PageResult<WarehouseRecord>>;
  getWarehouseById(tenantId: string, id: string): Promise<WarehouseRecord | undefined>;
  getWarehouseByCode(tenantId: string, code: string, companyId?: string): Promise<WarehouseRecord | undefined>;
  updateWarehouse(tenantId: string, id: string, input: WarehouseUpdateInput, actorId?: string): Promise<WarehouseRecord | undefined>;
  softDeleteWarehouse(tenantId: string, id: string, actorId?: string): Promise<WarehouseRecord | undefined>;
  setDefaultWarehouse(tenantId: string, id: string, actorId?: string): Promise<WarehouseRecord | undefined>;
  createWarehouseBin(input: WarehouseBinCreateInput, actorId?: string): Promise<WarehouseBinRecord>;
  listWarehouseBins(request: WarehouseBinListRequest): Promise<PageResult<WarehouseBinRecord>>;
  getWarehouseBinById(tenantId: string, id: string): Promise<WarehouseBinRecord | undefined>;
  updateWarehouseBin(tenantId: string, id: string, input: WarehouseBinUpdateInput, actorId?: string): Promise<WarehouseBinRecord | undefined>;
  softDeleteWarehouseBin(tenantId: string, id: string, actorId?: string): Promise<WarehouseBinRecord | undefined>;
  setDefaultWarehouseBin(tenantId: string, id: string, actorId?: string): Promise<WarehouseBinRecord | undefined>;
  createStockLedgerEntry(input: StockMovementInput & { entryNumber?: string; movementType: StockMovementType; createdByUserId?: string }): Promise<StockLedgerEntryRecord>;
  listStockLedgerEntries(request: StockLedgerListRequest): Promise<PageResult<StockLedgerEntryRecord>>;
  getStockLedgerEntryById(tenantId: string, id: string): Promise<StockLedgerEntryRecord | undefined>;
  getStockLedgerEntriesByReference(tenantId: string, referenceType: string, referenceId: string): Promise<StockLedgerEntryRecord[]>;
  getItemLedger(request: StockLedgerListRequest & { itemId: string }): Promise<PageResult<StockLedgerEntryRecord>>;
  getStockBalance(tenantId: string, itemId: string, warehouseId: string, binId?: string): Promise<StockBalanceRecord | undefined>;
  getStockBalances(request: StockBalanceListRequest): Promise<PageResult<StockBalanceRecord>>;
  getItemStockAvailability(request: StockAvailabilityRequest): Promise<ItemStockAvailability>;
  upsertStockBalanceFromLedgerEntry(entry: StockLedgerEntryRecord): Promise<StockBalanceRecord>;
  getLowStockSummary(tenantId: string): Promise<{ lowStockItems: number }>;
};

export type StockLedgerRecord = StockLedgerEntryRecord;
export type StockLedgerCreateInput = StockMovementInput;
export type StockLedgerUpdateInput = never;
export type StockLedgerActionContext = InventoryActionContext;
export type StockLedgerStatus = StockMovementType;
