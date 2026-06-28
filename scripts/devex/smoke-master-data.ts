import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
import { createMasterDataService } from "../../modules/master-data/foundation/service";
import { createMigrationKnex, resolveDatabaseUrl } from "../db/migration-runner";
import { run as runTenantMigrations } from "../db/migrate-tenant";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const tenantId = process.env.VERCENT_TENANT_ID ?? process.env.TENANT_ID ?? "demo-tenant";

const context = {
  tenantId,
  actorId: "smoke-test",
  roles: ["admin"],
  permissions: ["*"],
};

export async function run() {
  await runTenantMigrations();
  const tenantUrl = resolveDatabaseUrl("tenant");
  const database = createMigrationKnex(tenantUrl.value);
  const service = createMasterDataService(createMasterDataRepository(database));
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const party = await service.createParty(
      {
        tenantId,
        partyNumber: `SMOKE-PARTY-${suffix}`,
        partyType: "COMPANY",
        displayName: `Smoke Party ${suffix}`,
        email: `master-data-${suffix.toLowerCase()}@example.com`,
      },
      context,
    );

    await service.createAddress(
      {
        tenantId,
        partyId: party.id,
        addressType: "REGISTERED",
        line1: "Smoke Test Road",
        city: "Bengaluru",
        state: "KA",
        postalCode: "560001",
        country: "IN",
        isDefaultBilling: true,
        isDefaultShipping: true,
      },
      context,
    );

    const customer = await service.createCustomer(
      { tenantId, partyId: party.id, customerNumber: `SMOKE-CUST-${suffix}`, customerGroup: "Smoke", creditLimit: 1000 },
      context,
    );
    const supplier = await service.createSupplier(
      { tenantId, partyId: party.id, supplierNumber: `SMOKE-SUP-${suffix}`, supplierGroup: "Smoke", rating: 4 },
      context,
    );
    const uom = await service.createUom({ tenantId, code: `SMK${suffix.slice(-4)}`, name: `Smoke UOM ${suffix}`, isBase: true }, context);
    const item = await service.createItem(
      {
        tenantId,
        itemNumber: `SMOKE-ITEM-${suffix}`,
        sku: `SMOKE-SKU-${suffix}`,
        name: `Smoke Item ${suffix}`,
        itemType: "PRODUCT",
        baseUomId: uom.id,
        sellingPrice: 250,
      },
      context,
    );

    const listedItems = await service.listItems({ tenantId, search: item.itemNumber }, context);
    if (listedItems.total < 1) throw new Error("Created item was not returned by list");

    await service.deleteItem(tenantId, item.id, context);
    const afterDelete = await service.listItems({ tenantId, search: item.itemNumber }, context);
    if (afterDelete.total !== 0) throw new Error("Soft-deleted item was returned by normal list");

    return {
      status: "passed" as const,
      tenantId,
      partyId: party.id,
      customerId: customer.id,
      supplierId: supplier.id,
      uomId: uom.id,
      itemId: item.id,
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
