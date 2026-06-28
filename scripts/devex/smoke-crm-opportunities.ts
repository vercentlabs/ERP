import { createLeadsRepository } from "../../modules/crm/leads/repository";
import { createLeadsService } from "../../modules/crm/leads/service";
import { createOpportunitiesRepository } from "../../modules/crm/opportunities/repository";
import { createOpportunitiesService } from "../../modules/crm/opportunities/service";
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
  const masterData = createMasterDataService(createMasterDataRepository(database));
  const opportunities = createOpportunitiesService(createOpportunitiesRepository(database));
  const leads = createLeadsService(createLeadsRepository(database));
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const party = await masterData.createParty(
      {
        tenantId,
        partyNumber: `OPP-PARTY-${suffix}`,
        partyType: "COMPANY",
        displayName: `Opportunity Smoke ${suffix}`,
        email: `opportunity-${suffix.toLowerCase()}@example.com`,
      },
      context,
    );

    const customer = await masterData.createCustomer(
      {
        tenantId,
        partyId: party.id,
        customerNumber: `OPP-CUST-${suffix}`,
        customerGroup: "Smoke",
        creditLimit: 500000,
      },
      context,
    );

    const opportunity = await opportunities.create(
      {
        tenantId,
        name: `ERP rollout ${suffix}`,
        customerId: customer.id,
        expectedValue: 125000,
        currency: "INR",
        expectedCloseDate: "2026-09-30",
        source: "smoke",
        notes: "CRM opportunities smoke test",
        tags: ["smoke", "pipeline"],
      },
      context,
    );

    if (opportunity.partyId !== party.id) throw new Error("Opportunity party_id was not derived from customer");

    await opportunities.changeStage(tenantId, opportunity.id, { stage: "QUALIFICATION" }, context);
    await opportunities.changeStage(tenantId, opportunity.id, { stage: "PROPOSAL" }, context);
    await opportunities.changeStage(tenantId, opportunity.id, { stage: "NEGOTIATION" }, context);
    const won = await opportunities.changeStage(tenantId, opportunity.id, { stage: "WON" }, context);

    if (won.probability !== 100) throw new Error("WON opportunity probability was not set to 100");
    if (!won.closedAt) throw new Error("WON opportunity closed_at was not set");

    const stats = await opportunities.stats({ tenantId }, context);
    if (stats.total < 1) throw new Error("Opportunity stats did not include created opportunity");

    const pipeline = await opportunities.pipelineSummary({ tenantId }, context);
    if (pipeline.wonValue < 125000) throw new Error("Pipeline summary did not include won value");

    const lead = await leads.create(
      {
        tenantId,
        leadNumber: `OPP-CONVERT-${suffix}`,
        firstName: "Pipeline",
        lastName: "Lead",
        companyName: `Pipeline Lead ${suffix}`,
        email: `pipeline-lead-${suffix.toLowerCase()}@example.com`,
        phone: "+910000000002",
        source: "smoke",
        expectedValue: 75000,
        currency: "INR",
      },
      context,
    );

    await leads.changeStatus(tenantId, lead.id, { status: "CONTACTED" }, context);
    await leads.changeStatus(tenantId, lead.id, { status: "QUALIFIED" }, context);

    const converted = await leads.convertLeadToCustomer(
      tenantId,
      lead.id,
      {
        partyType: "COMPANY",
        displayName: `Pipeline Converted ${suffix}`,
        customerGroup: "Smoke",
        createOpportunity: true,
        opportunityName: `Converted pipeline ${suffix}`,
        expectedValue: 75000,
        expectedCloseDate: "2026-10-31",
        opportunitySource: "lead-conversion-smoke",
      },
      context,
    );

    if (!converted.opportunity) throw new Error("Lead conversion did not create an opportunity");

    const currentLead = await leads.getById(tenantId, lead.id, context);
    if (currentLead.convertedCustomerId !== converted.customer.id) {
      throw new Error("Converted lead did not store converted_customer_id");
    }
    if (currentLead.convertedOpportunityId !== converted.opportunity.id) {
      throw new Error("Converted lead did not store converted_opportunity_id");
    }

    return {
      status: "passed" as const,
      tenantId,
      opportunityId: won.id,
      convertedLeadId: currentLead.id,
      convertedCustomerId: converted.customer.id,
      convertedOpportunityId: converted.opportunity.id,
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
