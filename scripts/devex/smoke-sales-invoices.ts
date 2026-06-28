import { createInventoryStockRepository } from "../../modules/inventory/stock-ledger/repository";
import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
import { createMasterDataService } from "../../modules/master-data/foundation/service";
import { createDeliveryNotesRepository } from "../../modules/sales/delivery-notes/repository";
import { createDeliveryNotesService } from "../../modules/sales/delivery-notes/service";
import { createSalesInvoicesRepository } from "../../modules/sales/invoices/repository";
import { createSalesInvoicesService } from "../../modules/sales/invoices/service";
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
  const invoiceRepo = createSalesInvoicesRepository(database);
  const masterData = createMasterDataService(masterRepo);
  const salesOrders = createSalesOrdersService(orderRepo, masterRepo);
  const deliveryNotes = createDeliveryNotesService(deliveryRepo, orderRepo, masterRepo, inventoryRepo);
  const invoices = createSalesInvoicesService(invoiceRepo, masterRepo, orderRepo, deliveryRepo);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const uom = await masterData.createUom({ tenantId, code: `SI${suffix.slice(-4)}`, name: `Invoice UOM ${suffix}`, isBase: true }, context);
    const stockItem = await masterData.createItem({ tenantId, itemNumber: `SI-STOCK-${suffix}`, sku: `SI-STOCK-${suffix}`, name: `Invoice Stock ${suffix}`, itemType: "PRODUCT", baseUomId: uom.id, isStockItem: true, sellingPrice: 100 }, context);
    const serviceItem = await masterData.createItem({ tenantId, itemNumber: `SI-SVC-${suffix}`, sku: `SI-SVC-${suffix}`, name: `Invoice Service ${suffix}`, itemType: "SERVICE", baseUomId: uom.id, isStockItem: false, sellingPrice: 200 }, context);
    const warehouse = await inventoryRepo.createWarehouse({ tenantId, name: `Invoice Warehouse ${suffix}`, code: `SIWH${suffix.slice(-5)}`, type: "MAIN", isDefault: true });
    await inventoryRepo.createStockLedgerEntry({ tenantId, itemId: stockItem.id, warehouseId: warehouse.id, quantity: 20, uomId: uom.id, movementType: "OPENING", unitCost: 40, remarks: "Invoice smoke opening stock", createdByUserId: context.actorId });
    const party = await masterData.createParty({ tenantId, partyNumber: `SI-PARTY-${suffix}`, partyType: "COMPANY", displayName: `Invoice Customer ${suffix}` }, context);
    const customer = await masterData.createCustomer({ tenantId, partyId: party.id, customerNumber: `SI-CUST-${suffix}`, customerGroup: "Smoke" }, context);

    const stockOrder = await salesOrders.create({ tenantId, customerId: customer.id, lines: [{ itemId: stockItem.id, uomId: uom.id, quantity: 4, unitPrice: 100, taxRate: 18 }] }, context);
    await salesOrders.changeStatus(tenantId, stockOrder.id, { status: "CONFIRMED" }, context);
    const deliveryNote = await deliveryNotes.createFromSalesOrder(tenantId, stockOrder.id, { warehouseId: warehouse.id }, context);
    const postedDelivery = await deliveryNotes.post(tenantId, deliveryNote.id, {}, context);
    const deliveryInvoice = await invoices.createFromDeliveryNote(tenantId, postedDelivery.id, { dueDate: "2026-12-31" }, context);
    const issued = await invoices.issue(tenantId, deliveryInvoice.id, {}, context);
    if (issued.status !== "ISSUED") throw new Error("Delivery invoice was not issued");
    if (issued.amountDue !== issued.totalAmount) throw new Error("Amount due should equal total amount while payments are not implemented");
    await invoices.createFromDeliveryNote(tenantId, postedDelivery.id, {}, context).then(
      () => {
        throw new Error("Duplicate invoice from delivery note should have failed");
      },
      (error) => {
        if (error instanceof Error && !error.message.includes("already")) throw error;
      },
    );

    const serviceOrder = await salesOrders.create({ tenantId, customerId: customer.id, lines: [{ itemId: serviceItem.id, uomId: uom.id, quantity: 2, unitPrice: 200, taxRate: 18 }] }, context);
    await salesOrders.changeStatus(tenantId, serviceOrder.id, { status: "CONFIRMED" }, context);
    const serviceInvoice = await invoices.createFromSalesOrder(tenantId, serviceOrder.id, {}, context);
    if (serviceInvoice.amountDue !== serviceInvoice.totalAmount) throw new Error("Service invoice amount due should equal total amount");

    return {
      status: "passed" as const,
      tenantId,
      deliveryInvoiceId: issued.id,
      serviceInvoiceId: serviceInvoice.id,
      amountDue: serviceInvoice.amountDue,
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
