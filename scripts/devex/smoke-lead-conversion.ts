import { createLeadsRepository } from "../../modules/crm/leads/repository";
import { createLeadsService } from "../../modules/crm/leads/service";
import { createMasterDataRepository } from "../../modules/master-data/foundation/repository";
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
  const leads = createLeadsService(createLeadsRepository(database));
  const masterData = createMasterDataRepository(database);
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const lead = await leads.create(
      {
        tenantId,
        leadNumber: `CONVERT-${suffix}`,
        firstName: "Conversion",
        lastName: "Smoke",
        companyName: "Vercent Conversion Test",
        email: `convert-${suffix.toLowerCase()}@example.com`,
        phone: "+910000000001",
        source: "smoke",
        expectedValue: 25000,
        currency: "INR",
      },
      context,
    );

    const contacted = await leads.changeStatus(tenantId, lead.id, { status: "CONTACTED" }, context);
    if (contacted.status !== "CONTACTED") throw new Error("Lead did not transition to CONTACTED");

    const qualified = await leads.changeStatus(tenantId, lead.id, { status: "QUALIFIED" }, context);
    if (qualified.status !== "QUALIFIED") throw new Error("Lead did not transition to QUALIFIED");

    const converted = await leads.convertLeadToCustomer(
      tenantId,
      lead.id,
      {
        partyType: "COMPANY",
        displayName: "Vercent Conversion Test",
        customerGroup: "Smoke",
        billingAddress: {
          line1: "Smoke Test Street",
          city: "Bengaluru",
          state: "KA",
          postalCode: "560001",
          country: "IN",
        },
        notes: "Lead conversion smoke test",
      },
      context,
    );

    const party = await masterData.getPartyById(tenantId, converted.party.id);
    if (!party) throw new Error("Converted party was not found");

    const customer = await masterData.getCustomerById(tenantId, converted.customer.id);
    if (!customer) throw new Error("Converted customer was not found");
    if (customer.partyId !== party.id) throw new Error("Converted customer is not linked to converted party");

    const currentLead = await leads.getById(tenantId, lead.id, context);
    if (currentLead.status !== "CONVERTED") throw new Error("Lead was not marked CONVERTED");

    await leads
      .convertLeadToCustomer(tenantId, lead.id, { partyType: "COMPANY", displayName: "Duplicate" }, context)
      .then(() => {
        throw new Error("Second conversion attempt should have failed");
      })
      .catch((error) => {
        if (error instanceof Error && error.message.includes("Second conversion")) throw error;
      });

    return {
      status: "passed" as const,
      tenantId,
      leadId: lead.id,
      partyId: party.id,
      customerId: customer.id,
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
