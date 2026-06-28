import { createInventoryStockRepository } from "../../modules/inventory/stock-ledger/repository";
import { createInventoryStockService } from "../../modules/inventory/stock-ledger/service";
import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
import { createMasterDataService } from "../../modules/master-data/foundation/service";
import { createSalesOrdersRepository } from "../../modules/sales/sales-orders/repository";
import { createSalesOrdersService } from "../../modules/sales/sales-orders/service";
import { createMigrationKnex, resolveDatabaseUrl } from "../db/migration-runner";
import { run as runTenantMigrations } from "../db/migrate-tenant";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const tenantId = process.env.VERCENT_TENANT_ID ?? process.env.TENANT_ID ?? "demo-tenant";
const context = { tenantId, actorId: "smoke-test", roles: ["admin"], permissions: ["*"] };

export async function run() {
  await runTenantMigrations();
  const tenantUrl = resolveDatabaseUrl("tenant");
  const database = createMigrationKnex(tenantUrl.value);
  const masterRepo = createMasterDataRepository(database);
  const inventoryRepo = createInventoryStockRepository(database);
  const salesOrderRepo = createSalesOrdersRepository(database);
  const masterData = createMasterDataService(masterRepo);
  const salesOrders = createSalesOrdersService(salesOrderRepo, masterRepo);
  const inventory = createInventoryStockService(inventoryRepo, masterRepo, salesOrderRepo);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const uom = await masterData.createUom({ tenantId, code: `INV${suffix.slice(-4)}`, name: `Inventory UOM ${suffix}`, isBase: true }, context);
    const item = await masterData.createItem({ tenantId, itemNumber: `INV-ITEM-${suffix}`, sku: `INV-SKU-${suffix}`, name: `Inventory Item ${suffix}`, itemType: "PRODUCT", baseUomId: uom.id, isStockItem: true, sellingPrice: 100 }, context);
    const warehouse = await inventory.createWarehouse({ tenantId, name: `Inventory Warehouse ${suffix}`, code: `WH${suffix.slice(-6)}`, type: "MAIN", isDefault: true }, context);
    const bin = await inventory.createWarehouseBin({ tenantId, warehouseId: warehouse.id, code: `BIN${suffix.slice(-6)}`, name: `Bin ${suffix}`, isDefault: true }, context);
    await inventory.createOpeningStock({ tenantId, itemId: item.id, warehouseId: warehouse.id, binId: bin.id, quantity: 20, unitCost: 40, remarks: "Smoke opening stock" }, context);
    await inventory.createStockAdjustment({ tenantId, itemId: item.id, warehouseId: warehouse.id, binId: bin.id, adjustmentType: "IN", quantity: 5, remarks: "Smoke adjustment in" }, context);
    await inventory.createStockAdjustment({ tenantId, itemId: item.id, warehouseId: warehouse.id, binId: bin.id, adjustmentType: "OUT", quantity: 3, remarks: "Smoke adjustment out" }, context);
    const availability = await inventory.getItemStockAvailability({ tenantId, itemId: item.id, warehouseId: warehouse.id, binId: bin.id }, context);
    if (availability.totalAvailable !== 22) throw new Error(`Expected final available stock 22, got ${availability.totalAvailable}`);

    const party = await masterData.createParty({ tenantId, partyNumber: `INV-PARTY-${suffix}`, partyType: "COMPANY", displayName: `Inventory Customer ${suffix}` }, context);
    const customer = await masterData.createCustomer({ tenantId, partyId: party.id, customerNumber: `INV-CUST-${suffix}`, customerGroup: "Smoke" }, context);
    const order = await salesOrders.create({ tenantId, customerId: customer.id, lines: [{ itemId: item.id, uomId: uom.id, quantity: 10, unitPrice: 100 }] }, context);
    const orderAvailability = await inventory.getSalesOrderStockAvailability(tenantId, order.id, context);
    if (orderAvailability[0]?.availabilityStatus !== "AVAILABLE") throw new Error("Sales order stock availability was not AVAILABLE");
    const ledger = await inventory.listStockLedger({ tenantId, itemId: item.id }, context);
    if (ledger.total < 3) throw new Error("Expected stock ledger entries were not created");

    return {
      status: "passed" as const,
      tenantId,
      itemId: item.id,
      warehouseId: warehouse.id,
      binId: bin.id,
      orderId: order.id,
      finalAvailable: availability.totalAvailable,
      databaseUrlVariable: tenantUrl.variable,
      checkedAt: new Date().toISOString(),
    };
  } finally {
    await database.destroy();
  }
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  run()
    .then((result) => console.log(JSON.stringify(result, null, 2)))
    .catch((error) => {
      console.error(error instanceof Error ? error.stack : error);
      process.exitCode = 1;
    });
}
