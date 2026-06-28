import { createOpportunitiesRepository } from "../../modules/crm/opportunities/repository";
import { createOpportunitiesService } from "../../modules/crm/opportunities/service";
import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
import { createMasterDataService } from "../../modules/master-data/foundation/service";
import { createQuotationsRepository } from "../../modules/sales/quotations/repository";
import { createQuotationsService } from "../../modules/sales/quotations/service";
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
  const opportunityRepo = createOpportunitiesRepository(database);
  const quotationRepo = createQuotationsRepository(database);
  const orderRepo = createSalesOrdersRepository(database);
  const masterData = createMasterDataService(masterRepo);
  const opportunities = createOpportunitiesService(opportunityRepo, masterRepo);
  const quotations = createQuotationsService(quotationRepo, masterRepo, opportunityRepo);
  const orders = createSalesOrdersService(orderRepo, masterRepo, opportunityRepo, quotationRepo);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const party = await masterData.createParty({ tenantId, partyNumber: `SO-PARTY-${suffix}`, partyType: "COMPANY", displayName: `Order Smoke ${suffix}` }, context);
    const customer = await masterData.createCustomer({ tenantId, partyId: party.id, customerNumber: `SO-CUST-${suffix}`, customerGroup: "Smoke" }, context);
    const uom = await masterData.createUom({ tenantId, code: `S${suffix.slice(-5)}`, name: `Order UOM ${suffix}`, isBase: true }, context);
    const item = await masterData.createItem({
      tenantId,
      itemNumber: `SO-ITEM-${suffix}`,
      sku: `SO-SKU-${suffix}`,
      name: `Order Item ${suffix}`,
      itemType: "PRODUCT",
      baseUomId: uom.id,
      sellingPrice: 1000,
    }, context);
    const opportunity = await opportunities.create({ tenantId, name: `Order opportunity ${suffix}`, customerId: customer.id, expectedValue: 25000, currency: "INR" }, context);
    const quotation = await quotations.create({
      tenantId,
      customerId: customer.id,
      opportunityId: opportunity.id,
      validUntil: "2026-12-31",
      currency: "INR",
      lines: [{ itemId: item.id, uomId: uom.id, quantity: 2, unitPrice: 1000, discountPercent: 10, taxRate: 18 }],
    }, context);
    await quotations.changeStatus(tenantId, quotation.id, { status: "SENT" }, context);
    await quotations.changeStatus(tenantId, quotation.id, { status: "ACCEPTED" }, context);

    const order = await orders.createFromQuotation(tenantId, quotation.id, { expectedDeliveryDate: "2026-12-31" }, context);
    if (order.lines.length !== quotation.lines.length) throw new Error("Order lines were not copied from quotation");
    if (order.totalAmount !== quotation.totalAmount) throw new Error("Order total does not match accepted quotation total");
    const confirmed = await orders.changeStatus(tenantId, order.id, { status: "CONFIRMED" }, context);
    if (!confirmed.confirmedAt) throw new Error("Confirmed order did not set confirmed_at");
    const closed = await orders.changeStatus(tenantId, order.id, { status: "CLOSED" }, context);
    if (!closed.closedAt) throw new Error("Closed order did not set closed_at");

    await orders.createFromQuotation(tenantId, quotation.id, {}, context).then(
      () => {
        throw new Error("Duplicate quotation conversion should have failed");
      },
      (error) => {
        if (error instanceof Error && error.message.includes("Duplicate quotation")) throw error;
      },
    );

    return {
      status: "passed" as const,
      tenantId,
      customerId: customer.id,
      quotationId: quotation.id,
      orderId: order.id,
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
