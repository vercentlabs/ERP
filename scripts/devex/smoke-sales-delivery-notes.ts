import { createInventoryStockRepository } from "../../modules/inventory/stock-ledger/repository";
import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
import { createMasterDataService } from "../../modules/master-data/foundation/service";
import { createDeliveryNotesRepository } from "../../modules/sales/delivery-notes/repository";
import { createDeliveryNotesService } from "../../modules/sales/delivery-notes/service";
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
  const orderRepo = createSalesOrdersRepository(database);
  const deliveryRepo = createDeliveryNotesRepository(database);
  const masterData = createMasterDataService(masterRepo);
  const salesOrders = createSalesOrdersService(orderRepo, masterRepo);
  const deliveryNotes = createDeliveryNotesService(deliveryRepo, orderRepo, masterRepo, inventoryRepo);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const uom = await masterData.createUom({ tenantId, code: `DN${suffix.slice(-4)}`, name: `Delivery UOM ${suffix}`, isBase: true }, context);
    const item = await masterData.createItem({ tenantId, itemNumber: `DN-ITEM-${suffix}`, sku: `DN-SKU-${suffix}`, name: `Delivery Item ${suffix}`, itemType: "PRODUCT", baseUomId: uom.id, isStockItem: true, sellingPrice: 100 }, context);
    const warehouse = await inventoryRepo.createWarehouse({ tenantId, name: `Delivery Warehouse ${suffix}`, code: `DNWH${suffix.slice(-5)}`, type: "MAIN", isDefault: true });
    await inventoryRepo.createStockLedgerEntry({ tenantId, itemId: item.id, warehouseId: warehouse.id, quantity: 20, uomId: uom.id, movementType: "OPENING", unitCost: 40, remarks: "Delivery smoke opening stock", createdByUserId: context.actorId });

    const party = await masterData.createParty({ tenantId, partyNumber: `DN-PARTY-${suffix}`, partyType: "COMPANY", displayName: `Delivery Customer ${suffix}` }, context);
    const customer = await masterData.createCustomer({ tenantId, partyId: party.id, customerNumber: `DN-CUST-${suffix}`, customerGroup: "Smoke" }, context);
    const order = await salesOrders.create({ tenantId, customerId: customer.id, lines: [{ itemId: item.id, uomId: uom.id, quantity: 10, unitPrice: 100 }] }, context);
    const confirmed = await salesOrders.changeStatus(tenantId, order.id, { status: "CONFIRMED" }, context);
    if (confirmed.status !== "CONFIRMED") throw new Error("Sales order was not confirmed");

    const note = await deliveryNotes.createFromSalesOrder(tenantId, order.id, { warehouseId: warehouse.id, deliveryDate: "2026-06-21" }, context);
    const posted = await deliveryNotes.post(tenantId, note.id, { postingDate: "2026-06-21" }, context);
    if (posted.status !== "POSTED") throw new Error("Delivery note was not posted");
    if (posted.lines.some((line) => line.isStockItem && !line.stockLedgerEntryId)) throw new Error("Stock ledger entry was not linked to posted delivery line");

    const ledger = await inventoryRepo.getStockLedgerEntriesByReference(tenantId, "SALES_DELIVERY_NOTE", note.id);
    if (!ledger.some((entry) => entry.movementType === "SALES_ISSUE")) throw new Error("SALES_ISSUE stock ledger entry was not created");
    const balance = await inventoryRepo.getStockBalance(tenantId, item.id, warehouse.id);
    if (!balance || balance.quantityOnHand !== 10) throw new Error(`Expected stock balance 10 after delivery, got ${balance?.quantityOnHand}`);
    const summary = await deliveryNotes.getSalesOrderDeliverySummary(tenantId, order.id, context);
    if (summary.fulfillmentStatus !== "DELIVERED") throw new Error(`Expected DELIVERED fulfillment status, got ${summary.fulfillmentStatus}`);

    await deliveryNotes.create({ tenantId, salesOrderId: order.id, warehouseId: warehouse.id, lines: [{ salesOrderLineId: order.lines[0].id, quantity: 1 }] }, context).then(
      () => {
        throw new Error("Over-delivery should have failed");
      },
      (error) => {
        if (error instanceof Error && !error.message.includes("exceed")) throw error;
      },
    );

    return {
      status: "passed" as const,
      tenantId,
      orderId: order.id,
      deliveryNoteId: posted.id,
      finalQuantityOnHand: balance.quantityOnHand,
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
