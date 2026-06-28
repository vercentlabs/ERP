import { createMigrationKnex, formatDatabaseError, resolveDatabaseUrl } from "./migration-runner";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const tenantId = process.env.VERCENT_TENANT_ID ?? process.env.TENANT_ID ?? "demo-tenant";

async function hasTable(database: ReturnType<typeof createMigrationKnex>, table: string) {
  return database.schema.hasTable(table);
}

async function upsertGenericRecord(
  database: ReturnType<typeof createMigrationKnex>,
  table: string,
  record: { tenant_id: string | null; code: string; name: string; status?: string },
) {
  const existing = await database(table).where({ code: record.code }).first();
  if (existing) return "skipped";
  await database(table).insert({ status: "active", ...record });
  return "inserted";
}

export async function run() {
  const controlPlaneUrl = resolveDatabaseUrl("control-plane");
  const tenantUrl = resolveDatabaseUrl("tenant");
  const controlPlane = createMigrationKnex(controlPlaneUrl.value);
  const tenant = createMigrationKnex(tenantUrl.value);
  const actions: string[] = [];

  try {
    if (await hasTable(controlPlane, "create_tenants")) {
      const result = await upsertGenericRecord(controlPlane, "create_tenants", {
        tenant_id: tenantId,
        code: tenantId,
        name: "Demo Tenant",
      });
      actions.push(`control-plane create_tenants demo tenant ${result}`);
    }

    if (await hasTable(tenant, "core")) {
      const result = await upsertGenericRecord(tenant, "core", {
        tenant_id: tenantId,
        code: "DEMO-COMPANY",
        name: "Demo Company",
      });
      actions.push(`tenant core demo company ${result}`);
    }

    if (await hasTable(tenant, "platform_identity")) {
      const admin = await upsertGenericRecord(tenant, "platform_identity", {
        tenant_id: tenantId,
        code: "DEV-ADMIN",
        name: "Development Admin",
      });
      const role = await upsertGenericRecord(tenant, "platform_identity", {
        tenant_id: tenantId,
        code: "ROLE-ADMIN",
        name: "Administrator Role",
      });
      actions.push(`tenant platform_identity admin ${admin}`);
      actions.push(`tenant platform_identity role ${role}`);
    }

    return {
      tenantId,
      status: "completed" as const,
      actions,
      executedAt: new Date().toISOString(),
    };
  } finally {
    await Promise.all([controlPlane.destroy(), tenant.destroy()]);
  }
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  run()
    .then((result) => console.log(JSON.stringify(result, null, 2)))
    .catch((error) => {
      const controlPlaneUrl = resolveDatabaseUrl("control-plane");
      console.error(formatDatabaseError(error, controlPlaneUrl.value, "development seed"));
      process.exitCode = 1;
    });
}
