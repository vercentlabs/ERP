import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import knex, { type Knex } from "knex";

export type MigrationTarget = "control-plane" | "tenant";

export type MigrationResult = {
  target: MigrationTarget;
  databaseUrlVariable: string;
  directory: string;
  applied: string[];
  skipped: string[];
};

const rootDir = fileURLToPath(new URL("../..", import.meta.url));
const localControlPlaneDatabaseUrl = "postgresql://vercent:vercent@localhost:5433/vercent_control_plane";
const localTenantDatabaseUrl = "postgresql://vercent:vercent@localhost:5433/vercent_tenant_dev";

export function loadDotEnv(path = resolve(rootDir, ".env")) {
  if (!existsSync(path)) return;
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
    process.env[key] ??= value;
  }
}

export function resolveDatabaseUrl(target: MigrationTarget) {
  loadDotEnv();
  if (target === "control-plane") {
    const value = process.env.CONTROL_PLANE_DATABASE_URL ?? localControlPlaneDatabaseUrl;
    return { variable: "CONTROL_PLANE_DATABASE_URL", value };
  }
  const value = process.env.TENANT_DATABASE_URL ?? process.env.DATABASE_URL ?? localTenantDatabaseUrl;
  const variable = process.env.TENANT_DATABASE_URL ? "TENANT_DATABASE_URL" : process.env.DATABASE_URL ? "DATABASE_URL" : "local default";
  return { variable, value };
}

export function createMigrationKnex(connectionString: string): Knex {
  return knex({
    client: "pg",
    connection: { connectionString },
    pool: { min: 0, max: 5 },
  });
}

export function describeDatabaseUrl(connectionString: string) {
  try {
    const url = new URL(connectionString);
    return {
      protocol: url.protocol.replace(":", ""),
      host: url.hostname,
      port: url.port || "5432",
      database: url.pathname.replace(/^\//, ""),
      username: decodeURIComponent(url.username),
      safeUrl: `${url.protocol}//${url.username ? `${decodeURIComponent(url.username)}:***@` : ""}${url.hostname}:${url.port || "5432"}${url.pathname}`,
    };
  } catch {
    return {
      protocol: "unknown",
      host: "unknown",
      port: "unknown",
      database: "unknown",
      username: "unknown",
      safeUrl: "<invalid database url>",
    };
  }
}

export function formatDatabaseError(error: unknown, connectionString: string, action = "database operation") {
  const nested = error instanceof AggregateError ? error.errors.map((entry) => (entry instanceof Error ? entry.message : String(entry))).filter(Boolean).join("; ") : "";
  const code = error instanceof Error && "code" in error && typeof error.code === "string" ? ` [${error.code}]` : "";
  const message = error instanceof Error ? `${error.message || error.name || "unknown error"}${code}${nested ? `: ${nested}` : ""}` : String(error);
  const details = describeDatabaseUrl(connectionString);
  const lines = [
    `${action} failed: ${message}`,
    `Database target: ${details.safeUrl}`,
  ];

  if (message.includes('role "vercent" does not exist')) {
    lines.push(
      'Likely cause: your env points at a PostgreSQL server that was not created by the Vercent local Docker setup.',
      "Suggested fix: run `pnpm db:doctor`; if using Docker, run `pnpm db:local:reset` or set URLs to localhost:5433.",
    );
  } else if (message.includes("database") && message.includes("does not exist")) {
    lines.push("Likely cause: the expected Vercent database has not been created on this PostgreSQL server.");
    lines.push("Suggested fix: run `pnpm db:local:reset` or verify the Docker init script ran on a fresh volume.");
  } else if (message.includes("ECONNREFUSED") || message.includes("connect ECONNREFUSED")) {
    lines.push("Likely cause: PostgreSQL is not running at the configured host/port.");
    lines.push("Suggested fix: start Docker Desktop, then run `pnpm db:local:up`, or update your database URLs.");
  } else if (message.toLowerCase().includes("password authentication failed")) {
    lines.push("Likely cause: the configured username/password does not match the active PostgreSQL server.");
    lines.push("Suggested fix: use vercent/vercent for local Docker or update `.env` for your own PostgreSQL instance.");
  } else if (message.includes("Migration checksum changed after apply")) {
    lines.push("Likely cause: an already-applied SQL migration file was edited.");
    lines.push("Suggested fix: add a new migration instead of editing applied migrations, or reset only the local dev DB.");
  } else if (message.includes("syntax error at or near")) {
    lines.push("Likely cause: a SQL migration contains invalid PostgreSQL syntax.");
    lines.push("Suggested fix: inspect the migration named immediately before this error.");
  }

  return lines.join("\n");
}

function checksum(sql: string) {
  return createHash("sha256").update(sql).digest("hex");
}

function migrationDirectory(target: MigrationTarget) {
  return resolve(rootDir, target === "control-plane" ? "database/control-plane/migrations" : "database/tenant/migrations");
}

async function ensureHistory(database: Knex) {
  await database.raw("create extension if not exists pgcrypto");
  await database.schema.createTableIfNotExists("vercent_migration_history", (table) => {
    table.text("target").notNullable();
    table.text("name").notNullable();
    table.text("checksum").notNullable();
    table.timestamp("applied_at", { useTz: true }).notNullable().defaultTo(database.fn.now());
    table.primary(["target", "name"]);
  });
}

export async function runSqlMigrations(target: MigrationTarget): Promise<MigrationResult> {
  const databaseUrl = resolveDatabaseUrl(target);
  const directory = migrationDirectory(target);
  const database = createMigrationKnex(databaseUrl.value);
  const applied: string[] = [];
  const skipped: string[] = [];

  try {
    await ensureHistory(database);
    const files = readdirSync(directory)
      .filter((file) => file.endsWith(".sql"))
      .sort((left, right) => left.localeCompare(right));

    for (const file of files) {
      const sql = readFileSync(resolve(directory, file), "utf8");
      const hash = checksum(sql);
      const existing = await database("vercent_migration_history").where({ target, name: file }).first();
      if (existing) {
        if (existing.checksum !== hash) {
          throw new Error(`Migration checksum changed after apply: ${file}`);
        }
        skipped.push(file);
        continue;
      }

      await database.transaction(async (trx) => {
        await trx.raw(sql);
        await trx("vercent_migration_history").insert({ target, name: file, checksum: hash });
      });
      applied.push(file);
      console.log(`[${target}] applied ${file}`);
    }

    if (applied.length === 0) console.log(`[${target}] no new migrations`);
    return { target, databaseUrlVariable: databaseUrl.variable, directory, applied, skipped };
  } catch (error) {
    throw new Error(formatDatabaseError(error, databaseUrl.value, `[${target}] migrations`), { cause: error });
  } finally {
    await database.destroy();
  }
}
