import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type {
  InventoryStockRepository,
  ItemStockAvailability,
  StockBalanceListRequest,
  StockBalanceRecord,
  StockLedgerEntryRecord,
  StockMovementType,
  WarehouseBinRecord,
  WarehouseRecord,
} from "./types";

const tables = {
  warehouses: "inventory_warehouses",
  bins: "inventory_warehouse_bins",
  ledger: "inventory_stock_ledger_entries",
  balances: "inventory_stock_balances",
} as const;

const nowIso = () => new Date().toISOString();
const toNullable = <T>(value: T | undefined | null) => value ?? null;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
const numberWithPrefix = (prefix: string, explicit?: string) => explicit ?? `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;
const toIso = (value: Date | string | undefined | null) => (value instanceof Date ? value.toISOString() : value || undefined);
const toDate = (value: Date | string | undefined | null) => (value instanceof Date ? value.toISOString().slice(0, 10) : value || new Date().toISOString().slice(0, 10));
const toTime = (value: Date | string | undefined | null) => (value instanceof Date ? value.toISOString().slice(11, 19) : value || new Date().toISOString().slice(11, 19));

type BaseRow = {
  id: string;
  tenant_id: string;
  company_id: string | null;
  branch_id: string | null;
};

type WarehouseRow = BaseRow & {
  warehouse_number: string;
  name: string;
  code: string;
  type: WarehouseRecord["type"];
  status: WarehouseRecord["status"];
  address_id: string | null;
  manager_user_id: string | null;
  is_default: boolean;
  notes: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
};

type BinRow = BaseRow & {
  warehouse_id: string;
  bin_number: string;
  code: string;
  name: string;
  zone: string | null;
  aisle: string | null;
  rack: string | null;
  shelf: string | null;
  status: WarehouseBinRecord["status"];
  is_default: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
};

type LedgerRow = BaseRow & {
  entry_number: string;
  item_id: string;
  warehouse_id: string;
  bin_id: string | null;
  posting_date: Date | string;
  posting_time: string;
  movement_type: StockMovementType;
  quantity: number | string;
  uom_id: string;
  stock_value: number | string | null;
  unit_cost: number | string | null;
  reference_type: string | null;
  reference_id: string | null;
  remarks: string | null;
  created_by_user_id: string | null;
  created_at: Date | string;
};

type BalanceRow = BaseRow & {
  item_id: string;
  warehouse_id: string;
  bin_id: string | null;
  quantity_on_hand: number | string;
  quantity_reserved: number | string;
  quantity_available: number | string;
  stock_value: number | string | null;
  average_cost: number | string | null;
  updated_at: Date | string;
};

function scope(row: BaseRow) {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
  };
}

export const mapWarehouseRow = (row: WarehouseRow): WarehouseRecord => ({
  ...scope(row),
  warehouseNumber: row.warehouse_number,
  name: row.name,
  code: row.code,
  type: row.type,
  status: row.status,
  addressId: row.address_id ?? undefined,
  managerUserId: row.manager_user_id ?? undefined,
  isDefault: row.is_default,
  notes: row.notes ?? undefined,
  createdAt: toIso(row.created_at) ?? nowIso(),
  updatedAt: toIso(row.updated_at) ?? nowIso(),
  deletedAt: toIso(row.deleted_at),
});

export const mapBinRow = (row: BinRow): WarehouseBinRecord => ({
  ...scope(row),
  warehouseId: row.warehouse_id,
  binNumber: row.bin_number,
  code: row.code,
  name: row.name,
  zone: row.zone ?? undefined,
  aisle: row.aisle ?? undefined,
  rack: row.rack ?? undefined,
  shelf: row.shelf ?? undefined,
  status: row.status,
  isDefault: row.is_default,
  createdAt: toIso(row.created_at) ?? nowIso(),
  updatedAt: toIso(row.updated_at) ?? nowIso(),
  deletedAt: toIso(row.deleted_at),
});

export const mapLedgerRow = (row: LedgerRow): StockLedgerEntryRecord => ({
  ...scope(row),
  entryNumber: row.entry_number,
  itemId: row.item_id,
  warehouseId: row.warehouse_id,
  binId: row.bin_id ?? undefined,
  postingDate: toDate(row.posting_date),
  postingTime: toTime(row.posting_time),
  movementType: row.movement_type,
  quantity: Number(row.quantity),
  uomId: row.uom_id,
  stockValue: row.stock_value == null ? undefined : Number(row.stock_value),
  unitCost: row.unit_cost == null ? undefined : Number(row.unit_cost),
  referenceType: row.reference_type ?? undefined,
  referenceId: row.reference_id ?? undefined,
  remarks: row.remarks ?? undefined,
  createdByUserId: row.created_by_user_id ?? undefined,
  createdAt: toIso(row.created_at) ?? nowIso(),
});

export const mapBalanceRow = (row: BalanceRow): StockBalanceRecord => ({
  ...scope(row),
  itemId: row.item_id,
  warehouseId: row.warehouse_id,
  binId: row.bin_id ?? undefined,
  quantityOnHand: Number(row.quantity_on_hand),
  quantityReserved: Number(row.quantity_reserved),
  quantityAvailable: Number(row.quantity_available),
  stockValue: row.stock_value == null ? undefined : Number(row.stock_value),
  averageCost: row.average_cost == null ? undefined : Number(row.average_cost),
  updatedAt: toIso(row.updated_at) ?? nowIso(),
});

function applyScope(query: Knex.QueryBuilder, request: { tenantId: string; companyId?: string; branchId?: string }) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applySearch(query: Knex.QueryBuilder, search: string | undefined, fields: string[]) {
  if (!search) return query;
  query.andWhere((builder) => {
    for (const [index, field] of fields.entries()) {
      const method = index === 0 ? "whereILike" : "orWhereILike";
      builder[method](field, `%${search}%`);
    }
  });
  return query;
}

async function listRows<Row extends {}, Model>(
  connection: Knex,
  table: string,
  request: { page?: number; pageSize?: number; sortBy?: string; sortDirection?: "asc" | "desc"; search?: string; tenantId: string; companyId?: string; branchId?: string },
  mapper: (row: Row) => Model,
  options: { searchFields?: string[]; defaultSort?: string; filter?: (query: Knex.QueryBuilder) => void },
) {
  const page = request.page ?? 1;
  const pageSize = request.pageSize ?? 25;
  const offset = (page - 1) * pageSize;
  const build = (query: Knex.QueryBuilder) => {
    applyScope(query, request);
    options.filter?.(query);
    applySearch(query, request.search, options.searchFields ?? []);
    return query;
  };
  const rowsQuery = build(connection<Row>(table).select("*")).orderBy(request.sortBy ?? options.defaultSort ?? "created_at", request.sortDirection ?? "desc").limit(pageSize).offset(offset);
  const countQuery = build(connection<Row>(table).count<{ count: string }[]>({ count: "*" }));
  const [rows, countRows] = await Promise.all([rowsQuery, countQuery]);
  return { rows: rows.map(mapper), total: Number(countRows[0]?.count ?? 0), page, pageSize };
}

const movementSign = (movementType: StockMovementType) => (["ADJUSTMENT_OUT", "TRANSFER_OUT", "SALES_HOLD", "SALES_ISSUE", "MANUFACTURING_ISSUE"].includes(movementType) ? -1 : 1);

export function createInventoryStockRepository(database?: Knex): InventoryStockRepository {
  const db = () => database ?? getTenantKnex();

  async function upsertBalance(connection: Knex, entry: StockLedgerEntryRecord) {
    const sign = movementSign(entry.movementType);
    const delta = entry.quantity * sign;
    const existing = await connection<BalanceRow>(tables.balances)
      .where({ tenant_id: entry.tenantId, item_id: entry.itemId, warehouse_id: entry.warehouseId })
      .where(entry.binId ? { bin_id: entry.binId } : {})
      .modify((query) => {
        if (!entry.binId) query.whereNull("bin_id");
      })
      .first();
    const currentOnHand = existing ? Number(existing.quantity_on_hand) : 0;
    const nextOnHand = currentOnHand + delta;
    const nextStockValue = entry.stockValue ?? (existing?.stock_value == null ? undefined : Number(existing.stock_value));
    const nextAverageCost = nextOnHand > 0 && nextStockValue != null ? nextStockValue / nextOnHand : existing?.average_cost == null ? entry.unitCost : Number(existing.average_cost);

    if (existing) {
      const [row] = await connection<BalanceRow>(tables.balances)
        .where({ id: existing.id })
        .update({ quantity_on_hand: nextOnHand, stock_value: toNullable(nextStockValue), average_cost: toNullable(nextAverageCost), updated_at: connection.fn.now() })
        .returning("*");
      return mapBalanceRow(row);
    }

    const [row] = await connection<BalanceRow>(tables.balances)
      .insert({
        id: randomUUID(),
        tenant_id: entry.tenantId,
        company_id: toNullable(entry.companyId),
        branch_id: toNullable(entry.branchId),
        item_id: entry.itemId,
        warehouse_id: entry.warehouseId,
        bin_id: toNullable(entry.binId),
        quantity_on_hand: nextOnHand,
        quantity_reserved: 0,
        stock_value: toNullable(nextStockValue),
        average_cost: toNullable(nextAverageCost),
      })
      .returning("*");
    return mapBalanceRow(row);
  }

  return {
    async createWarehouse(input, actorId) {
      const connection = db();
      const row = await connection.transaction(async (trx) => {
        if (input.isDefault) await trx<WarehouseRow>(tables.warehouses).where({ tenant_id: input.tenantId }).whereNull("deleted_at").update({ is_default: false, updated_at: trx.fn.now() });
        const [created] = await trx<WarehouseRow>(tables.warehouses)
          .insert({
            id: randomUUID(),
            tenant_id: input.tenantId,
            company_id: toNullable(input.companyId),
            branch_id: toNullable(input.branchId),
            warehouse_number: numberWithPrefix("WH", input.warehouseNumber),
            name: input.name,
            code: input.code.toUpperCase(),
            type: input.type ?? "MAIN",
            status: input.status ?? "ACTIVE",
            address_id: toNullable(input.addressId),
            manager_user_id: toNullable(input.managerUserId),
            is_default: input.isDefault ?? false,
            notes: toNullable(input.notes),
          })
          .returning("*");
        return created;
      });
      void actorId;
      return mapWarehouseRow(row);
    },
    async listWarehouses(request) {
      return listRows<WarehouseRow, WarehouseRecord>(db(), tables.warehouses, request, mapWarehouseRow, {
        searchFields: ["warehouse_number", "name", "code"],
        filter: (query) => {
          query.whereNull("deleted_at");
          if (request.status) query.where("status", request.status);
          if (request.type) query.where("type", request.type);
        },
      });
    },
    async getWarehouseById(tenantId, id) {
      const row = await db()<WarehouseRow>(tables.warehouses).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? mapWarehouseRow(row) : undefined;
    },
    async getWarehouseByCode(tenantId, code, companyId) {
      const query = db()<WarehouseRow>(tables.warehouses).where({ tenant_id: tenantId, code: code.toUpperCase() }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? mapWarehouseRow(row) : undefined;
    },
    async updateWarehouse(tenantId, id, input) {
      const connection = db();
      const row = await connection.transaction(async (trx) => {
        if (input.isDefault) await trx<WarehouseRow>(tables.warehouses).where({ tenant_id: tenantId }).whereNull("deleted_at").update({ is_default: false, updated_at: trx.fn.now() });
        const [updated] = await trx<WarehouseRow>(tables.warehouses)
          .where({ tenant_id: tenantId, id })
          .whereNull("deleted_at")
          .update(compact({ company_id: input.companyId, branch_id: input.branchId, name: input.name, code: input.code?.toUpperCase(), type: input.type, status: input.status, address_id: input.addressId, manager_user_id: input.managerUserId, is_default: input.isDefault, notes: input.notes, updated_at: trx.fn.now() }))
          .returning("*");
        return updated;
      });
      return row ? mapWarehouseRow(row) : undefined;
    },
    async softDeleteWarehouse(tenantId, id) {
      const connection = db();
      const [row] = await connection<WarehouseRow>(tables.warehouses).where({ tenant_id: tenantId, id }).whereNull("deleted_at").update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? mapWarehouseRow(row) : undefined;
    },
    async setDefaultWarehouse(tenantId, id) {
      return this.updateWarehouse(tenantId, id, { isDefault: true });
    },
    async createWarehouseBin(input) {
      const connection = db();
      const row = await connection.transaction(async (trx) => {
        if (input.isDefault) await trx<BinRow>(tables.bins).where({ tenant_id: input.tenantId, warehouse_id: input.warehouseId }).whereNull("deleted_at").update({ is_default: false, updated_at: trx.fn.now() });
        const [created] = await trx<BinRow>(tables.bins)
          .insert({
            id: randomUUID(),
            tenant_id: input.tenantId,
            company_id: toNullable(input.companyId),
            branch_id: toNullable(input.branchId),
            warehouse_id: input.warehouseId,
            bin_number: numberWithPrefix("BIN", input.binNumber),
            code: input.code.toUpperCase(),
            name: input.name,
            zone: toNullable(input.zone),
            aisle: toNullable(input.aisle),
            rack: toNullable(input.rack),
            shelf: toNullable(input.shelf),
            status: input.status ?? "ACTIVE",
            is_default: input.isDefault ?? false,
          })
          .returning("*");
        return created;
      });
      return mapBinRow(row);
    },
    async listWarehouseBins(request) {
      return listRows<BinRow, WarehouseBinRecord>(db(), tables.bins, request, mapBinRow, {
        searchFields: ["bin_number", "name", "code", "zone", "aisle", "rack", "shelf"],
        filter: (query) => {
          query.whereNull("deleted_at");
          if (request.warehouseId) query.where("warehouse_id", request.warehouseId);
          if (request.status) query.where("status", request.status);
        },
      });
    },
    async getWarehouseBinById(tenantId, id) {
      const row = await db()<BinRow>(tables.bins).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? mapBinRow(row) : undefined;
    },
    async updateWarehouseBin(tenantId, id, input) {
      const connection = db();
      const row = await connection.transaction(async (trx) => {
        const current = await trx<BinRow>(tables.bins).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
        if (!current) return undefined;
        if (input.isDefault) await trx<BinRow>(tables.bins).where({ tenant_id: tenantId, warehouse_id: current.warehouse_id }).whereNull("deleted_at").update({ is_default: false, updated_at: trx.fn.now() });
        const [updated] = await trx<BinRow>(tables.bins)
          .where({ tenant_id: tenantId, id })
          .whereNull("deleted_at")
          .update(compact({ company_id: input.companyId, branch_id: input.branchId, code: input.code?.toUpperCase(), name: input.name, zone: input.zone, aisle: input.aisle, rack: input.rack, shelf: input.shelf, status: input.status, is_default: input.isDefault, updated_at: trx.fn.now() }))
          .returning("*");
        return updated;
      });
      return row ? mapBinRow(row) : undefined;
    },
    async softDeleteWarehouseBin(tenantId, id) {
      const connection = db();
      const [row] = await connection<BinRow>(tables.bins).where({ tenant_id: tenantId, id }).whereNull("deleted_at").update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() }).returning("*");
      return row ? mapBinRow(row) : undefined;
    },
    async setDefaultWarehouseBin(tenantId, id) {
      return this.updateWarehouseBin(tenantId, id, { isDefault: true });
    },
    async createStockLedgerEntry(input) {
      const connection = db();
      const row = await connection.transaction(async (trx) => {
        const [created] = await trx<LedgerRow>(tables.ledger)
          .insert({
            id: randomUUID(),
            tenant_id: input.tenantId,
            company_id: toNullable(input.companyId),
            branch_id: toNullable(input.branchId),
            entry_number: numberWithPrefix("SLE", input.entryNumber),
            item_id: input.itemId,
            warehouse_id: input.warehouseId,
            bin_id: toNullable(input.binId),
            posting_date: input.postingDate ?? new Date().toISOString().slice(0, 10),
            posting_time: input.postingTime ?? new Date().toISOString().slice(11, 19),
            movement_type: input.movementType,
            quantity: input.quantity,
            uom_id: input.uomId!,
            stock_value: toNullable(input.stockValue),
            unit_cost: toNullable(input.unitCost),
            reference_type: toNullable(input.referenceType),
            reference_id: toNullable(input.referenceId),
            remarks: toNullable(input.remarks),
            created_by_user_id: toNullable(input.createdByUserId),
          })
          .returning("*");
        const entry = mapLedgerRow(created);
        await upsertBalance(trx, entry);
        return created;
      });
      return mapLedgerRow(row);
    },
    async listStockLedgerEntries(request) {
      return listRows<LedgerRow, StockLedgerEntryRecord>(db(), tables.ledger, request, mapLedgerRow, {
        searchFields: ["entry_number", "reference_type", "reference_id", "remarks"],
        defaultSort: "posting_date",
        filter: (query) => {
          if (request.itemId) query.where("item_id", request.itemId);
          if (request.warehouseId) query.where("warehouse_id", request.warehouseId);
          if (request.binId) query.where("bin_id", request.binId);
          if (request.movementType) query.where("movement_type", request.movementType);
          if (request.referenceType) query.where("reference_type", request.referenceType);
          if (request.referenceId) query.where("reference_id", request.referenceId);
          if (request.postingDateFrom) query.where("posting_date", ">=", request.postingDateFrom);
          if (request.postingDateTo) query.where("posting_date", "<=", request.postingDateTo);
        },
      });
    },
    async getStockLedgerEntryById(tenantId, id) {
      const row = await db()<LedgerRow>(tables.ledger).where({ tenant_id: tenantId, id }).first();
      return row ? mapLedgerRow(row) : undefined;
    },
    async getStockLedgerEntriesByReference(tenantId, referenceType, referenceId) {
      const rows = await db()<LedgerRow>(tables.ledger).where({ tenant_id: tenantId, reference_type: referenceType, reference_id: referenceId }).orderBy("created_at", "desc");
      return rows.map(mapLedgerRow);
    },
    async getItemLedger(request) {
      return this.listStockLedgerEntries(request);
    },
    async getStockBalance(tenantId, itemId, warehouseId, binId) {
      const query = db()<BalanceRow>(tables.balances).where({ tenant_id: tenantId, item_id: itemId, warehouse_id: warehouseId });
      if (binId) query.where("bin_id", binId);
      else query.whereNull("bin_id");
      const row = await query.first();
      return row ? mapBalanceRow(row) : undefined;
    },
    async getStockBalances(request: StockBalanceListRequest) {
      return listRows<BalanceRow, StockBalanceRecord>(db(), tables.balances, request, mapBalanceRow, {
        defaultSort: "updated_at",
        filter: (query) => {
          if (request.itemId) query.where("item_id", request.itemId);
          if (request.warehouseId) query.where("warehouse_id", request.warehouseId);
          if (request.binId) query.where("bin_id", request.binId);
        },
      });
    },
    async getItemStockAvailability(request) {
      const result = await this.getStockBalances({ tenantId: request.tenantId, companyId: request.companyId, branchId: request.branchId, itemId: request.itemId, warehouseId: request.warehouseId, binId: request.binId, pageSize: 500 });
      return {
        itemId: request.itemId,
        warehouseId: request.warehouseId,
        binId: request.binId,
        totalOnHand: result.rows.reduce((sum, row) => sum + row.quantityOnHand, 0),
        totalReserved: result.rows.reduce((sum, row) => sum + row.quantityReserved, 0),
        totalAvailable: result.rows.reduce((sum, row) => sum + row.quantityAvailable, 0),
        balances: result.rows,
      } satisfies ItemStockAvailability;
    },
    async upsertStockBalanceFromLedgerEntry(entry) {
      return db().transaction((trx) => upsertBalance(trx, entry));
    },
    async getLowStockSummary(tenantId) {
      const rows = await db()<BalanceRow>(tables.balances).where({ tenant_id: tenantId }).where("quantity_available", "<=", 0);
      return { lowStockItems: rows.length };
    },
  };
}

export const inventoryStockRepository = createInventoryStockRepository();
export const stockLedgerRepository = inventoryStockRepository;
