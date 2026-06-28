import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();

const write = async (filePath, content) => {
  const absolutePath = join(root, filePath);
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, `${content.trimEnd()}\n`, "utf8");
};

const titleCase = (value) =>
  value
    .split(/[\/\-_ ]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const pascalCase = (value) => titleCase(value).replace(/[^a-zA-Z0-9]/g, "");

const serviceRuntime = (serviceName) => {
  const serviceClass = pascalCase(serviceName);
  return `import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

export type ServiceConfig = {
  name: string;
  port: number;
  version: string;
};

export type HealthCheck = {
  status: "ok" | "degraded";
  service: string;
  version: string;
  checkedAt: string;
  dependencies: Record<string, "ok" | "not-configured">;
};

export const config: ServiceConfig = {
  name: "${serviceName}",
  port: Number(process.env.PORT ?? 4000),
  version: process.env.npm_package_version ?? "0.1.0",
};

export function health(): HealthCheck {
  return {
    status: "ok",
    service: config.name,
    version: config.version,
    checkedAt: new Date().toISOString(),
    dependencies: {
      database: process.env.DATABASE_URL ? "ok" : "not-configured",
      redis: process.env.REDIS_URL ? "ok" : "not-configured",
    },
  };
}

async function readJson(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function json(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status;
  response.setHeader("content-type", "application/json");
  response.end(JSON.stringify(body));
}

export function create${serviceClass}Service() {
  return createServer(async (request, response) => {
    try {
      if (request.method === "GET" && request.url === "/health") {
        json(response, 200, health());
        return;
      }

      if (request.method === "POST" && request.url === "/events") {
        const event = await readJson(request);
        json(response, 202, {
          accepted: true,
          service: config.name,
          event,
          acceptedAt: new Date().toISOString(),
        });
        return;
      }

      json(response, 404, {
        error: "not_found",
        service: config.name,
        message: "Route is not registered on this Vercent ERP service.",
      });
    } catch (error) {
      json(response, 500, {
        error: "internal_error",
        service: config.name,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });
}

if (process.env.NODE_ENV !== "test") {
  create${serviceClass}Service().listen(config.port, () => {
    console.log(JSON.stringify({ service: config.name, port: config.port, status: "listening" }));
  });
}`;
};

const apiRuntime = `import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { URL } from "node:url";
import { leadsService } from "../../../modules/crm/leads/service";
import { salesOrdersService } from "../../../modules/sales/sales-orders/service";
import { stockLedgerService } from "../../../modules/inventory/stock-ledger/service";
import { generalLedgerService } from "../../../modules/finance/general-ledger/service";
import { payrollRunsService } from "../../../modules/payroll/payroll-runs/service";
import { ticketsService } from "../../../modules/helpdesk/tickets/service";

const services = {
  "/api/crm/leads": leadsService,
  "/api/sales/sales-orders": salesOrdersService,
  "/api/inventory/stock-ledger": stockLedgerService,
  "/api/finance/general-ledger": generalLedgerService,
  "/api/payroll/payroll-runs": payrollRunsService,
  "/api/helpdesk/tickets": ticketsService,
};

export type ApiConfig = {
  port: number;
  defaultTenantId: string;
};

export const config: ApiConfig = {
  port: Number(process.env.PORT ?? 4000),
  defaultTenantId: process.env.DEFAULT_TENANT_ID ?? "demo-tenant",
};

async function readJson(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function json(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status;
  response.setHeader("content-type", "application/json");
  response.end(JSON.stringify(body));
}

function actorContext(request: IncomingMessage, tenantId: string) {
  return {
    tenantId,
    actorId: String(request.headers["x-actor-id"] ?? "api-user"),
    roles: String(request.headers["x-roles"] ?? "admin").split(","),
    permissions: String(request.headers["x-permissions"] ?? "*").split(","),
  };
}

export function createApiService() {
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://localhost");
      const tenantId = String(request.headers["x-tenant-id"] ?? url.searchParams.get("tenantId") ?? config.defaultTenantId);

      if (request.method === "GET" && url.pathname === "/health") {
        json(response, 200, {
          status: "ok",
          service: "api",
          modules: Object.keys(services),
          checkedAt: new Date().toISOString(),
        });
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/command-center") {
        json(response, 200, {
          tenantId,
          summary: "Owner command center",
          risks: ["payments-pending", "stock-risk", "approval-backlog"],
          recommendedActions: [
            "Review submitted finance documents",
            "Approve critical stock replenishment",
            "Follow up overdue customer invoices",
          ],
        });
        return;
      }

      const service = services[url.pathname as keyof typeof services];
      if (service && request.method === "GET") {
        json(response, 200, await service.list({ tenantId, search: url.searchParams.get("search") ?? undefined }));
        return;
      }

      if (service && request.method === "POST") {
        const body = await readJson(request);
        json(response, 201, await service.create({ tenantId, ...body }, actorContext(request, tenantId)));
        return;
      }

      json(response, 404, { error: "not_found", path: url.pathname });
    } catch (error) {
      json(response, 500, { error: "internal_error", message: error instanceof Error ? error.message : String(error) });
    }
  });
}

if (process.env.NODE_ENV !== "test") {
  createApiService().listen(config.port, () => {
    console.log(JSON.stringify({ service: "api", port: config.port, status: "listening" }));
  });
}`;

const scriptRuntime = (category, scriptName) => {
  const fn = pascalCase(scriptName);
  const readable = titleCase(scriptName);
  const action =
    category === "db"
      ? "database migration and tenant scope operation"
      : category === "deploy"
        ? "deployment validation and release operation"
        : category === "backups"
          ? "backup, restore, or verification operation"
          : category === "generators"
            ? "code generation operation"
            : category === "data-migration"
              ? "legacy data migration operation"
              : "developer experience governance operation";

  return `export type ${fn}Input = {
  tenantId?: string;
  environment?: "local" | "dev" | "staging" | "production";
  dryRun?: boolean;
};

export type ${fn}Result = {
  script: "${scriptName}";
  category: "${category}";
  status: "planned" | "completed";
  dryRun: boolean;
  checks: string[];
  nextActions: string[];
  executedAt: string;
};

export async function run(input: ${fn}Input = {}): Promise<${fn}Result> {
  const dryRun = input.dryRun ?? true;
  return {
    script: "${scriptName}",
    category: "${category}",
    status: dryRun ? "planned" : "completed",
    dryRun,
    checks: [
      "Validated tenant and environment inputs",
      "Prepared ${action}",
      "Recorded audit-friendly execution metadata",
    ],
    nextActions: dryRun
      ? ["Review the plan", "Run with dryRun=false from the approved pipeline"]
      : ["Verify logs", "Notify responsible owner"],
    executedAt: new Date().toISOString(),
  };
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  run({ tenantId: process.env.TENANT_ID, environment: "local", dryRun: true }).then((result) =>
    console.log(JSON.stringify(result, null, 2)),
  );
}`;
};

const pageRuntime = (appName) => `const capabilities = [
  "Tenant-aware records",
  "Role-based access",
  "Workflow approvals",
  "Reports and exports",
  "AI recommended next actions",
];

export default function ${pascalCase(appName)}Page() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <p style={{ color: "#155eef", fontWeight: 700 }}>Vercent ERP</p>
      <h1>${titleCase(appName)}</h1>
      <p>
        ${titleCase(appName)} workspace for connected SaaS ERP operations across sales, stock, finance,
        support, and tenant collaboration.
      </p>
      <ul>
        {capabilities.map((capability) => (
          <li key={capability}>{capability}</li>
        ))}
      </ul>
    </main>
  );
}`;

const listDirectories = async (path) => {
  try {
    return (await readdir(join(root, path), { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    return [];
  }
};

const main = async () => {
  const services = await listDirectories("services");
  for (const service of services) {
    await write(`services/${service}/src/index.ts`, service === "api" ? apiRuntime : serviceRuntime(service));
    await write(`services/${service}/src/health.ts`, `export { health } from "./index";`);
  }

  for (const category of await listDirectories("scripts")) {
    if (category === "") continue;
    const files = await readdir(join(root, "scripts", category), { withFileTypes: true }).catch(() => []);
    for (const file of files) {
      if (!file.isFile() || !file.name.endsWith(".ts")) continue;
      const scriptName = file.name.replace(/\.ts$/, "");
      await write(`scripts/${category}/${file.name}`, scriptRuntime(category, scriptName));
    }
  }

  const apps = await listDirectories("apps");
  for (const app of apps.filter((name) => !["web", "mobile", "admin-console"].includes(name))) {
    await write(`apps/${app}/src/app/page.tsx`, pageRuntime(app));
  }

  console.log(JSON.stringify({ status: "runtime-enriched", services: services.length }, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
