import { createOpportunitiesRepository } from "../../modules/crm/opportunities/repository";
import { createOpportunitiesService } from "../../modules/crm/opportunities/service";
import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
import { createMasterDataService } from "../../modules/master-data/foundation/service";
import { createQuotationsRepository } from "../../modules/sales/quotations/repository";
import { createQuotationsService } from "../../modules/sales/quotations/service";
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
  const masterDataRepository = createMasterDataRepository(database);
  const masterData = createMasterDataService(masterDataRepository);
  const opportunities = createOpportunitiesService(createOpportunitiesRepository(database), masterDataRepository);
  const quotations = createQuotationsService(createQuotationsRepository(database), masterDataRepository, createOpportunitiesRepository(database));
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const party = await masterData.createParty(
      {
        tenantId,
        partyNumber: `QUO-PARTY-${suffix}`,
        partyType: "COMPANY",
        displayName: `Quotation Smoke ${suffix}`,
        email: `quotation-${suffix.toLowerCase()}@example.com`,
      },
      context,
    );
    const customer = await masterData.createCustomer({ tenantId, partyId: party.id, customerNumber: `QUO-CUST-${suffix}`, customerGroup: "Smoke" }, context);
    const uom = await masterData.createUom({ tenantId, code: `Q${suffix.slice(-5)}`, name: `Quotation UOM ${suffix}`, isBase: true }, context);
    const item = await masterData.createItem(
      {
        tenantId,
        itemNumber: `QUO-ITEM-${suffix}`,
        sku: `QUO-SKU-${suffix}`,
        name: `Quotation Item ${suffix}`,
        itemType: "PRODUCT",
        baseUomId: uom.id,
        sellingPrice: 1000,
      },
      context,
    );
    const opportunity = await opportunities.create(
      {
        tenantId,
        name: `Quotation opportunity ${suffix}`,
        customerId: customer.id,
        expectedValue: 25000,
        currency: "INR",
        source: "quotation-smoke",
      },
      context,
    );
    const quotation = await quotations.create(
      {
        tenantId,
        customerId: customer.id,
        opportunityId: opportunity.id,
        quoteDate: "2026-06-20",
        validUntil: "2026-12-31",
        currency: "INR",
        lines: [{ itemId: item.id, uomId: uom.id, quantity: 2, unitPrice: 1000, discountPercent: 10, taxRate: 18 }],
      },
      context,
    );

    if (quotation.totalAmount !== 2124) throw new Error(`Expected quotation total 2124, got ${quotation.totalAmount}`);
    const sent = await quotations.changeStatus(tenantId, quotation.id, { status: "SENT" }, context);
    if (sent.status !== "SENT") throw new Error("Quotation was not sent");
    const accepted = await quotations.changeStatus(tenantId, quotation.id, { status: "ACCEPTED" }, context);
    if (!accepted.acceptedAt) throw new Error("Accepted quotation did not set accepted_at");
    await quotations
      .update(tenantId, quotation.id, { notes: "Should fail" }, context)
      .then(() => {
        throw new Error("Terminal quotation edit should have failed");
      })
      .catch((error) => {
        if (error instanceof Error && error.message.includes("Terminal quotation edit")) throw error;
      });

    return {
      status: "passed" as const,
      tenantId,
      customerId: customer.id,
      opportunityId: opportunity.id,
      quotationId: quotation.id,
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
