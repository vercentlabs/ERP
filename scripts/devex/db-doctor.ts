import { existsSync, readdirSync } from "node:fs";
import { connect } from "node:net";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createMigrationKnex, describeDatabaseUrl, loadDotEnv, resolveDatabaseUrl } from "../db/migration-runner";

const execFileAsync = promisify(execFile);
const rootDir = fileURLToPath(new URL("../..", import.meta.url));

type Check = {
  name: string;
  ok: boolean;
  message: string;
  hint?: string;
};

function line(check: Check) {
  const status = check.ok ? "OK" : "FAIL";
  console.log(`[${status}] ${check.name}: ${check.message}`);
  if (check.hint) console.log(`      ${check.hint}`);
}

function errorMessage(error: unknown) {
  if (error instanceof Error) {
    const cause = "cause" in error && error.cause instanceof Error ? `; cause: ${error.cause.message}` : "";
    const code = "code" in error && typeof error.code === "string" ? ` [${error.code}]` : "";
    return `${error.message || error.name || "unknown error"}${code}${cause}`;
  }
  return String(error);
}

async function commandAvailable(command: string, args: string[]) {
  try {
    const result = await execFileAsync(command, args, { timeout: 5000 });
    return { ok: true, output: `${result.stdout}${result.stderr}`.trim() };
  } catch (error) {
    return { ok: false, output: errorMessage(error) };
  }
}

function checkPort(port: number) {
  return new Promise<boolean>((resolveCheck) => {
    const socket = connect({ host: "127.0.0.1", port });
    const done = (open: boolean) => {
      socket.destroy();
      resolveCheck(open);
    };
    socket.setTimeout(1000);
    socket.once("connect", () => done(true));
    socket.once("timeout", () => done(false));
    socket.once("error", () => done(false));
  });
}

async function checkConnection(name: "control-plane" | "tenant") {
  const databaseUrl = resolveDatabaseUrl(name);
  const details = describeDatabaseUrl(databaseUrl.value);
  const database = createMigrationKnex(databaseUrl.value);
  try {
    await database.raw("select 1");
    const role = await database("pg_roles").where({ rolname: "vercent" }).first();
    const databases = await database("pg_database").select("datname").whereIn("datname", ["vercent_control_plane", "vercent_tenant_dev"]);
    const hasHistory = await database.schema.hasTable("vercent_migration_history");
    let migrationMessage = "migration history table is not present";

    if (hasHistory) {
      const historyRows = await database("vercent_migration_history").where({ target: name === "control-plane" ? "control-plane" : "tenant" }).select("name");
      const migrationDir = resolve(rootDir, name === "control-plane" ? "database/control-plane/migrations" : "database/tenant/migrations");
      const migrationFiles = existsSync(migrationDir) ? readdirSync(migrationDir).filter((file) => file.endsWith(".sql")).sort() : [];
      const applied = new Set(historyRows.map((row: { name: string }) => row.name));
      const missing = migrationFiles.filter((file) => !applied.has(file));
      migrationMessage = missing.length === 0 ? `all ${migrationFiles.length} migrations are applied` : `${missing.length} migrations are pending`;
    }

    return [
      { name: `${name} connection`, ok: true, message: `connected to ${details.safeUrl}` },
      { name: "role vercent", ok: Boolean(role), message: role ? "role exists" : "role is missing", hint: role ? undefined : "Run `pnpm db:local:reset` against the Vercent Docker DB." },
      {
        name: "required databases",
        ok: databases.length === 2,
        message: `found ${databases.map((row: { datname: string }) => row.datname).join(", ") || "none"}`,
        hint: databases.length === 2 ? undefined : "The Docker init script may not have run. Reset the local Vercent compose volume.",
      },
      { name: `${name} migrations`, ok: true, message: migrationMessage, hint: migrationMessage.startsWith("all ") ? undefined : "Run `pnpm db:migrate:all`." },
    ] satisfies Check[];
  } catch (error) {
    const message = errorMessage(error);
    const hint = message.includes('role "vercent" does not exist')
      ? "Your env is reaching a PostgreSQL server without the Vercent role. Use localhost:5433 with Docker, or run `pnpm db:local:reset`."
      : message.includes("ECONNREFUSED")
        ? "PostgreSQL is not listening on this host/port. Start Docker Desktop and run `pnpm db:local:up`."
        : "Run `pnpm db:doctor` after checking `.env` and Docker Desktop.";
    return [{ name: `${name} connection`, ok: false, message: `${details.safeUrl} failed: ${message}`, hint }] satisfies Check[];
  } finally {
    await database.destroy();
  }
}

export async function run() {
  loadDotEnv();
  const checks: Check[] = [];
  const docker = await commandAvailable("docker", ["--version"]);
  checks.push({ name: "Docker CLI", ok: docker.ok, message: docker.ok ? docker.output : "Docker CLI is not available", hint: docker.ok ? undefined : "Install/start Docker Desktop, or point .env to your own PostgreSQL server." });

  const compose = await commandAvailable("docker", ["compose", "version"]);
  checks.push({ name: "Docker Compose", ok: compose.ok, message: compose.ok ? compose.output : "Docker Compose is not available", hint: compose.ok ? undefined : "Docker Desktop includes the compose plugin." });

  const port5432 = await checkPort(5432);
  const port5433 = await checkPort(5433);
  checks.push({ name: "localhost:5432", ok: true, message: port5432 ? "port is open; this may be another local PostgreSQL" : "port is not open" });
  checks.push({ name: "localhost:5433", ok: true, message: port5433 ? "port is open; expected for Vercent Docker DB" : "port is not open", hint: port5433 ? undefined : "Run `pnpm db:local:up`." });

  const controlUrl = describeDatabaseUrl(resolveDatabaseUrl("control-plane").value);
  const tenantUrl = describeDatabaseUrl(resolveDatabaseUrl("tenant").value);
  checks.push({ name: "CONTROL_PLANE_DATABASE_URL", ok: controlUrl.port === "5433", message: controlUrl.safeUrl, hint: controlUrl.port === "5433" ? undefined : "Recommended local Docker port is 5433." });
  checks.push({ name: "TENANT_DATABASE_URL", ok: tenantUrl.port === "5433", message: tenantUrl.safeUrl, hint: tenantUrl.port === "5433" ? undefined : "Recommended local Docker port is 5433." });
  checks.push(...(await checkConnection("control-plane")));
  checks.push(...(await checkConnection("tenant")));

  for (const check of checks) line(check);
  const failed = checks.filter((check) => !check.ok);
  if (failed.length > 0) {
    console.log(`\nDB doctor found ${failed.length} issue(s).`);
    process.exitCode = 1;
  } else {
    console.log("\nDB doctor passed.");
  }
  return checks;
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exitCode = 1;
  });
}
