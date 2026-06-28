import knex, { type Knex } from "knex";

export type DatabaseConfig = {
  connectionString: string;
  applicationName: string;
  pool: { min: number; max: number };
};

export function createDatabaseConfig(connectionString: string, applicationName = "vercent-erp"): DatabaseConfig {
  if (!connectionString) throw new Error("Database connection string is required");
  return { connectionString, applicationName, pool: { min: 2, max: 20 } };
}
let cachedTenantKnex: Knex | undefined;
let cachedControlPlaneKnex: Knex | undefined;

const localTenantDatabaseUrl = "postgresql://vercent:vercent@localhost:5433/vercent_tenant_dev";
const localControlPlaneDatabaseUrl = "postgresql://vercent:vercent@localhost:5433/vercent_control_plane";

export function createKnex(config: DatabaseConfig): Knex {
  return knex({
    client: "pg",
    connection: {
      connectionString: config.connectionString,
      application_name: config.applicationName,
    },
    pool: config.pool,
  });
}

export function getTenantKnex(
  connectionString = process.env.TENANT_DATABASE_URL ?? process.env.DATABASE_URL ?? localTenantDatabaseUrl,
): Knex {
  if (!connectionString) {
    throw new Error("TENANT_DATABASE_URL or DATABASE_URL is required for database-backed repositories");
  }
  cachedTenantKnex ??= createKnex(createDatabaseConfig(connectionString, "vercent-erp-tenant"));
  return cachedTenantKnex;
}

export function getControlPlaneKnex(connectionString = process.env.CONTROL_PLANE_DATABASE_URL ?? localControlPlaneDatabaseUrl): Knex {
  if (!connectionString) {
    throw new Error("CONTROL_PLANE_DATABASE_URL is required for control-plane database access");
  }
  cachedControlPlaneKnex ??= createKnex(createDatabaseConfig(connectionString, "vercent-erp-control-plane"));
  return cachedControlPlaneKnex;
}

export function setTenantKnexForTesting(database: Knex | undefined) {
  cachedTenantKnex = database;
}

export function setControlPlaneKnexForTesting(database: Knex | undefined) {
  cachedControlPlaneKnex = database;
}
