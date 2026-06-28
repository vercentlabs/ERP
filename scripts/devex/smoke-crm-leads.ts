import { createLeadsRepository } from "../../modules/crm/leads/repository";
import { createLeadsService } from "../../modules/crm/leads/service";
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
  const service = createLeadsService(createLeadsRepository(database));
  const suffix = Date.now().toString(36).toUpperCase();

  try {
    const created = await service.create(
      {
        tenantId,
        leadNumber: `SMOKE-${suffix}`,
        firstName: "Smoke",
        lastName: "Lead",
        companyName: "Vercent Local Test",
        email: `smoke-${suffix.toLowerCase()}@example.com`,
        phone: "+910000000000",
        source: "smoke",
        expectedValue: 1000,
        currency: "INR",
        notes: "Local PostgreSQL smoke fixture",
      },
      context,
    );

    const listed = await service.list({ tenantId, search: created.leadNumber }, context);
    if (listed.total < 1) throw new Error("Created lead was not returned by list");

    const fetched = await service.getById(tenantId, created.id, context);
    if (fetched.id !== created.id) throw new Error("Created lead could not be fetched by id");

    const contacted = await service.changeStatus(tenantId, created.id, { status: "CONTACTED" }, context);
    if (contacted.status !== "CONTACTED") throw new Error("Lead status did not update to CONTACTED");

    await service.softDelete(tenantId, created.id, context);
    const afterDelete = await service.list({ tenantId, search: created.leadNumber }, context);
    if (afterDelete.total !== 0) throw new Error("Soft-deleted lead was returned by normal list");

    return {
      status: "passed" as const,
      tenantId,
      leadId: created.id,
      leadNumber: created.leadNumber,
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
