import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, posix } from "node:path";

const root = process.cwd();
const projectDoc = join(root, "docs", "project-structure.md");

const titleCase = (value) =>
  value
    .replace(/\[[^\]]+\]/g, "detail")
    .split(/[\/\-_ ]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const camelCase = (value) => {
  const titled = titleCase(value).replace(/\s+/g, "");
  return titled.charAt(0).toLowerCase() + titled.slice(1);
};

const constantCase = (value) =>
  value
    .replace(/\[[^\]]+\]/g, "detail")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();

const slugFromPath = (filePath) =>
  filePath
    .replace(/\\/g, "/")
    .replace(/^apps\/web\/src\/app\//, "")
    .replace(/^modules\//, "")
    .replace(/\/page\.tsx$/, "")
    .replace(/\.[^.]+$/, "")
    .replace(/\/index$/, "")
    .replace(/\[[^\]]+\]/g, "detail")
    .replace(/\/$/, "") || "home";

const ensureDir = async (filePath) => {
  await mkdir(dirname(join(root, filePath)), { recursive: true });
};

const writeProjectFile = async (filePath, content, { overwrite = false } = {}) => {
  const absolutePath = join(root, filePath);
  await mkdir(dirname(absolutePath), { recursive: true });
  if (!overwrite) {
    try {
      await readFile(absolutePath, "utf8");
      return false;
    } catch {
      // create below
    }
  }
  await writeFile(absolutePath, content.endsWith("\n") ? content : `${content}\n`, "utf8");
  return true;
};

const readProjectTree = async () => {
  const doc = await readFile(projectDoc, "utf8");
  const codeBlock = doc.match(/```txt\r?\nvercent-erp-platform\/\r?\n([\s\S]*?)```/);
  if (!codeBlock) {
    throw new Error("Could not find the project tree in docs/project-structure.md");
  }

  const entries = [];
  const stack = [];
  for (const line of codeBlock[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const markerIndex = line.indexOf("|-") >= 0 ? line.indexOf("|-") : line.indexOf("`-");
    if (markerIndex < 0) continue;
    const depth = markerIndex / 3;
    const rawName = line.slice(markerIndex + 2).trim();
    const isDirectory = rawName.endsWith("/");
    const name = rawName.replace(/\/$/, "");
    stack.length = depth;
    const fullPath = posix.join(...stack, name);
    entries.push({ path: fullPath, isDirectory });
    if (isDirectory) stack[depth] = name;
  }
  return entries;
};

const packageJson = (name, extra = {}) =>
  JSON.stringify(
    {
      name,
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: {
        build: "tsc --noEmit",
        lint: "eslint .",
        test: "vitest run",
        ...extra.scripts,
      },
      dependencies: extra.dependencies ?? {},
      devDependencies: extra.devDependencies ?? {},
    },
    null,
    2,
  );

const rootFiles = {
  ".dockerignore": `node_modules
.next
dist
coverage
.turbo
.env
.env.*
!.env.example`,
  ".editorconfig": `root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true`,
  ".env.example": `NODE_ENV=development
PORT=4000
WEB_ORIGIN=http://localhost:3000
DATABASE_URL=postgres://vercent:vercent@localhost:5432/vercent_control_plane
TENANT_DATABASE_URL=postgres://vercent:vercent@localhost:5432/vercent_tenant_template
REDIS_URL=redis://localhost:6379
JWT_SECRET=change-me
S3_BUCKET=vercent-local-documents
AWS_REGION=ap-south-1`,
  ".gitattributes": `* text=auto eol=lf
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary`,
  ".gitignore": `node_modules/
.next/
dist/
coverage/
.turbo/
.env
.env.*
!.env.example
*.log`,
  ".prettierignore": `node_modules
dist
coverage
.next
pnpm-lock.yaml`,
  ".prettierrc.json": JSON.stringify({ semi: true, singleQuote: false, trailingComma: "all", printWidth: 100 }, null, 2),
  "eslint.config.mjs": `export default [
  {
    ignores: ["node_modules/**", "dist/**", ".next/**", "coverage/**"],
  },
  {
    files: ["**/*.{ts,tsx,js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];`,
  "package.json": JSON.stringify(
    {
      name: "vercent-erp-platform",
      version: "0.1.0",
      private: true,
      packageManager: "pnpm@9.12.0",
      scripts: {
        build: "turbo run build",
        lint: "turbo run lint",
        test: "turbo run test",
        typecheck: "turbo run build",
        dev: "turbo run dev --parallel",
        "db:migrate:control-plane": "tsx scripts/db/migrate-control-plane.ts",
        "db:migrate:tenants": "tsx scripts/db/migrate-all-tenants.ts",
        "standards:check": "tsx scripts/devex/workspace-standards.ts",
      },
      devDependencies: {
        "@types/node": "^20.14.0",
        eslint: "^9.0.0",
        knip: "^5.0.0",
        prettier: "^3.3.0",
        tsx: "^4.16.0",
        turbo: "^2.0.0",
        typescript: "^5.5.0",
        vitest: "^2.0.0",
      },
    },
    null,
    2,
  ),
  "pnpm-lock.yaml": `lockfileVersion: '9.0'

settings:
  autoInstallPeers: true
  excludeLinksFromLockfile: false
`,
  "pnpm-workspace.yaml": `packages:
  - "apps/*"
  - "services/*"
  - "packages/*"
  - "modules/**"
`,
  "turbo.json": JSON.stringify(
    {
      $schema: "https://turbo.build/schema.json",
      tasks: {
        build: { dependsOn: ["^build"], outputs: ["dist/**", ".next/**"] },
        lint: {},
        test: { dependsOn: ["build"], outputs: ["coverage/**"] },
        dev: { cache: false, persistent: true },
      },
    },
    null,
    2,
  ),
  "tsconfig.base.json": JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        lib: ["ES2022", "DOM"],
        module: "ESNext",
        moduleResolution: "Bundler",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
        noEmit: true,
        jsx: "preserve",
        baseUrl: ".",
        paths: {
          "@vercent/shared-types": ["packages/shared-types/src/index.ts"],
          "@vercent/observability": ["packages/observability/src/index.ts"],
          "@vercent/database/*": ["packages/database/src/*"],
          "@vercent/permissions/*": ["packages/permissions/src/*"],
          "@vercent/workflows/*": ["packages/workflows/src/*"],
        },
      },
    },
    null,
    2,
  ),
  "knip.json": JSON.stringify(
    {
      entry: ["apps/*/src/**/*.{ts,tsx}", "services/*/src/**/*.ts", "packages/*/src/**/*.ts"],
      project: ["**/*.{ts,tsx}"],
      ignore: ["docs/**", "database/**/*.sql", "infrastructure/**"],
    },
    null,
    2,
  ),
  "README.md": `# Vercent ERP Platform

Vercent ERP is an AI-native business operating system for growing Indian companies.

This monorepo follows the documented platform plan in \`docs/\`: Next.js web apps, React Native mobile, Express services, PostgreSQL tenant databases, Redis queues, module-driven ERP domains, and AWS-ready infrastructure.

## Workspace

\`\`\`txt
apps/          User-facing web, mobile, portal, and admin applications
services/      Runtime services for APIs, workers, realtime, billing, AI, files, and integrations
modules/       ERP domain modules using the standard module leaf pattern
packages/      Shared libraries for types, database, permissions, workflows, documents, and reporting
database/      Control-plane and tenant SQL migrations, seeds, views, functions, and RLS policies
infrastructure Docker, Kubernetes, Terraform, and AWS support files
scripts/       Migration, generation, deployment, backup, and devex automation
docs/          Product, architecture, module, API, security, and deployment documentation
\`\`\`

## Local Development

\`\`\`bash
pnpm install
pnpm build
pnpm test
\`\`\`
`,
};

const webPackage = () =>
  packageJson("@vercent/web", {
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
    },
    dependencies: {
      "@emotion/react": "^11.11.0",
      "@emotion/styled": "^11.11.0",
      "@mui/material": "^5.15.0",
      "@tanstack/react-query": "^5.51.0",
      "@tanstack/react-table": "^8.20.0",
      axios: "^1.7.0",
      next: "^14.2.0",
      react: "^18.3.0",
      "react-dom": "^18.3.0",
      "react-hook-form": "^7.52.0",
      recharts: "^2.12.0",
      zod: "^3.23.0",
    },
    devDependencies: {
      "@types/react": "^18.3.0",
      "@types/react-dom": "^18.3.0",
      tailwindcss: "^3.4.0",
      typescript: "^5.5.0",
    },
  });

const webFiles = {
  "apps/web/Dockerfile": `FROM node:20-alpine AS runner
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile && pnpm --filter @vercent/web build
CMD ["pnpm", "--filter", "@vercent/web", "start"]`,
  "apps/web/README.md": `# Vercent ERP Web

Main Next.js ERP application for dashboards, modules, command center, AI assistant, settings, and extension studio.`,
  "apps/web/package.json": webPackage(),
  "apps/web/next.config.mjs": `const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@vercent/shared-types", "@vercent/shared-ui"],
};

export default nextConfig;`,
  "apps/web/eslint.config.mjs": `import baseConfig from "../../eslint.config.mjs";

export default baseConfig;`,
  "apps/web/postcss.config.mjs": `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
  "apps/web/tailwind.config.ts": `import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          600: "#155eef",
          900: "#102a56",
        },
      },
    },
  },
  plugins: [],
};

export default config;`,
  "apps/web/tsconfig.json": JSON.stringify(
    {
      extends: "../../tsconfig.base.json",
      compilerOptions: { plugins: [{ name: "next" }] },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    },
    null,
    2,
  ),
  "apps/web/components.json": JSON.stringify(
    {
      style: "default",
      rsc: true,
      tsx: true,
      tailwind: { config: "tailwind.config.ts", css: "src/app/globals.css", baseColor: "slate" },
      aliases: { components: "@/components", utils: "@/lib" },
    },
    null,
    2,
  ),
  "apps/web/src/app/layout.tsx": `import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "../components/layout/AppShell";

export const metadata: Metadata = {
  title: "Vercent ERP",
  description: "AI-native business operating system for growing companies.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}`,
  "apps/web/src/app/globals.css": `:root {
  color-scheme: light;
  --background: #f8fafc;
  --foreground: #0f172a;
  --muted: #64748b;
  --border: #e2e8f0;
  --brand: #155eef;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}`,
  "apps/web/src/app/loading.tsx": `export default function Loading() {
  return <main className="page-shell">Loading Vercent ERP...</main>;
}`,
  "apps/web/src/app/error.tsx": `"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="page-shell">
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </main>
  );
}`,
  "apps/web/src/app/not-found.tsx": `export default function NotFound() {
  return (
    <main className="page-shell">
      <h1>Page not found</h1>
      <p>The requested Vercent ERP workspace route does not exist.</p>
    </main>
  );
}`,
};

const pageTemplate = (filePath) => {
  const slug = slugFromPath(filePath);
  const title = slug === "home" ? "Vercent Command Center" : titleCase(slug);
  return `import { ModuleHeader } from "${"../".repeat(filePath.split("/").length - 4)}components/layout/ModuleHeader";

const metrics = [
  { label: "Open work", value: "24" },
  { label: "Needs approval", value: "7" },
  { label: "AI recommendations", value: "3" },
];

export default function ${title.replace(/[^a-zA-Z0-9]/g, "") || "Workspace"}Page() {
  return (
    <main className="page-shell">
      <ModuleHeader
        title="${title}"
        eyebrow="Vercent ERP"
        description="Operational workspace for ${title.toLowerCase()} with tenant-aware records, approvals, analytics, and AI-assisted next actions."
      />
      <section className="grid-panel">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>
    </main>
  );
}`;
};

const componentTemplate = (filePath) => {
  const name = titleCase(filePath.split("/").pop().replace(/\.[^.]+$/, "")).replace(/[^a-zA-Z0-9]/g, "");
  return `export type ${name}Props = {
  title?: string;
  children?: React.ReactNode;
};

export function ${name}({ title = "${titleCase(name)}", children }: ${name}Props) {
  return (
    <section data-component="${name}" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}`;
};

const libTemplate = (filePath) => {
  const name = camelCase(filePath.split("/").pop().replace(/\.[^.]+$/, ""));
  return `export const ${name}Config = {
  scope: "${slugFromPath(filePath)}",
  tenantAware: true,
  auditEnabled: true,
} as const;

export function describe${titleCase(name).replace(/[^a-zA-Z0-9]/g, "")}() {
  return \`Vercent ERP helper for \${${name}Config.scope}\`;
}`;
};

const packageIndexTemplates = {
  "packages/shared-types/src/index.ts": `export type TenantId = string;
export type UserId = string;
export type ISODateTime = string;

export type TenantScoped = {
  tenantId: TenantId;
  companyId?: string;
  branchId?: string;
};

export type AuditFields = {
  createdAt: ISODateTime;
  createdBy: UserId;
  updatedAt: ISODateTime;
  updatedBy: UserId;
};

export type DocumentStatus = "draft" | "submitted" | "approved" | "rejected" | "cancelled" | "closed";

export type BusinessEvent<TPayload = Record<string, unknown>> = TenantScoped & {
  id: string;
  type: string;
  payload: TPayload;
  occurredAt: ISODateTime;
};`,
  "packages/shared-ui/src/index.ts": `export type UiTone = "neutral" | "success" | "warning" | "danger" | "info";

export function getStatusTone(status: string): UiTone {
  const normalized = status.toLowerCase();
  if (["approved", "paid", "complete", "active"].includes(normalized)) return "success";
  if (["pending", "submitted", "open"].includes(normalized)) return "warning";
  if (["rejected", "failed", "cancelled", "overdue"].includes(normalized)) return "danger";
  return "neutral";
}`,
  "packages/shared-sdk/src/index.ts": `export type ApiClientOptions = {
  baseUrl: string;
  tenantId: string;
  accessToken?: string;
};

export class VercentSdk {
  constructor(private readonly options: ApiClientOptions) {}

  async health() {
    const response = await fetch(new URL("/health", this.options.baseUrl), {
      headers: this.headers(),
    });
    return response.json() as Promise<{ status: string }>;
  }

  private headers() {
    return {
      "x-tenant-id": this.options.tenantId,
      ...(this.options.accessToken ? { authorization: \`Bearer \${this.options.accessToken}\` } : {}),
    };
  }
}`,
  "packages/observability/src/index.ts": `export type LogContext = {
  tenantId?: string;
  userId?: string;
  requestId?: string;
  module?: string;
};

export function createLogger(baseContext: LogContext = {}) {
  return {
    info(message: string, context: LogContext = {}) {
      console.info(JSON.stringify({ level: "info", message, ...baseContext, ...context }));
    },
    error(message: string, error?: unknown, context: LogContext = {}) {
      console.error(JSON.stringify({ level: "error", message, error: String(error), ...baseContext, ...context }));
    },
  };
}`,
};

const genericTs = (filePath) => {
  const name = camelCase(filePath.split("/").pop().replace(/\.[^.]+$/, ""));
  const title = titleCase(slugFromPath(filePath));
  return `export const ${name} = {
  name: "${title}",
  path: "${filePath}",
  tenantAware: true,
  auditRequired: true,
} as const;

export type ${title.replace(/[^a-zA-Z0-9]/g, "") || "Generated"}Context = {
  tenantId: string;
  actorId: string;
};
`;
};

const packageSourceTemplate = (filePath) => {
  if (packageIndexTemplates[filePath]) return packageIndexTemplates[filePath];
  if (filePath.endsWith("knex.ts")) {
    return `export type DatabaseConfig = {
  connectionString: string;
  poolMin?: number;
  poolMax?: number;
};

export function createDatabaseConfig(connectionString: string): DatabaseConfig {
  return { connectionString, poolMin: 2, poolMax: 10 };
}`;
  }
  if (filePath.endsWith("transactions.ts")) {
    return `export type TransactionHandler<T> = () => Promise<T>;

export async function withTransaction<T>(handler: TransactionHandler<T>): Promise<T> {
  return handler();
}`;
  }
  if (filePath.endsWith("tenantConnection.ts")) {
    return `export type TenantConnection = {
  tenantId: string;
  databaseUrl: string;
};

export function resolveTenantConnection(tenantId: string, databaseUrl: string): TenantConnection {
  return { tenantId, databaseUrl };
}`;
  }
  if (filePath.endsWith("migrations.ts")) {
    return `export type MigrationPlan = {
  database: "control-plane" | "tenant";
  migrations: string[];
};

export function createMigrationPlan(database: MigrationPlan["database"], migrations: string[]): MigrationPlan {
  return { database, migrations };
}`;
  }
  return genericTs(filePath);
};

const packageJsonForPath = (filePath) => {
  const packageName = filePath.split("/")[1];
  return packageJson(`@vercent/${packageName}`, {
    dependencies: {},
    devDependencies: { typescript: "^5.5.0", vitest: "^2.0.0" },
  });
};

const serviceTemplate = (serviceName) => `import { createServer } from "node:http";

export type ServiceConfig = {
  name: string;
  port: number;
};

export const config: ServiceConfig = {
  name: "${serviceName}",
  port: Number(process.env.PORT ?? 4000),
};

export function create${titleCase(serviceName).replace(/[^a-zA-Z0-9]/g, "")}Service() {
  return createServer((request, response) => {
    if (request.url === "/health") {
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify({ status: "ok", service: config.name }));
      return;
    }
    response.statusCode = 404;
    response.end("Not found");
  });
}

if (process.env.NODE_ENV !== "test") {
  create${titleCase(serviceName).replace(/[^a-zA-Z0-9]/g, "")}Service().listen(config.port);
}`;

const moduleFiles = (modulePath) => {
  const parts = modulePath.split("/");
  const domain = parts[1];
  const leaf = parts.slice(2).join("/");
  const slug = `${domain}/${leaf}`;
  const entity = titleCase(leaf || domain);
  const constName = constantCase(`${domain}_${leaf}`);
  const className = entity.replace(/[^a-zA-Z0-9]/g, "");
  const routeBase = `/api/${slug}`;
  return {
    "index.ts": `export * from "./manifest";
export * from "./permissions";
export * from "./events";
export * from "./schemas";
export * from "./service";
export * from "./repository";
`,
    "manifest.ts": `export const manifest = {
  domain: "${domain}",
  module: "${leaf}",
  displayName: "${entity}",
  routeBase: "${routeBase}",
  capabilities: ["read", "create", "update", "submit", "approve", "report"],
  tenantScoped: true,
} as const;
`,
    "permissions.ts": `export const permissions = {
  read: "${slug}:read",
  create: "${slug}:create",
  update: "${slug}:update",
  submit: "${slug}:submit",
  approve: "${slug}:approve",
  report: "${slug}:report",
} as const;

export type Permission = (typeof permissions)[keyof typeof permissions];
`,
    "events.ts": `export const events = {
  created: "${slug}.created",
  updated: "${slug}.updated",
  submitted: "${slug}.submitted",
  approved: "${slug}.approved",
  rejected: "${slug}.rejected",
  closed: "${slug}.closed",
} as const;
`,
    "constants.ts": `export const ${constName}_MODULE = "${slug}";
export const ${constName}_TABLE = "${domain}_${leaf.replace(/\//g, "_").replace(/-/g, "_")}";
export const ${constName}_DEFAULT_PAGE_SIZE = 50;
`,
    "types.ts": `export type ${className}Status = "draft" | "submitted" | "approved" | "rejected" | "cancelled" | "closed";

export type ${className}Record = {
  id: string;
  tenantId: string;
  code: string;
  name: string;
  status: ${className}Status;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
};
`,
    "schemas.ts": `import { z } from "zod";

export const ${camelCase(className)}Schema = z.object({
  id: z.string().uuid().optional(),
  tenantId: z.string().min(1),
  code: z.string().min(1),
  name: z.string().min(1),
  status: z.enum(["draft", "submitted", "approved", "rejected", "cancelled", "closed"]).default("draft"),
  ownerId: z.string().optional(),
});

export type ${className}Input = z.infer<typeof ${camelCase(className)}Schema>;
`,
    "routes.ts": `import type { Request, Response, Router } from "express";
import { ${camelCase(className)}Service } from "./service";

export function register${className}Routes(router: Router) {
  router.get("${routeBase}", async (_request: Request, response: Response) => {
    response.json(await ${camelCase(className)}Service.list());
  });
  router.post("${routeBase}", async (request: Request, response: Response) => {
    response.status(201).json(await ${camelCase(className)}Service.create(request.body));
  });
}
`,
    "controller.ts": `import { ${camelCase(className)}Service } from "./service";

export const ${camelCase(className)}Controller = {
  list: () => ${camelCase(className)}Service.list(),
  create: (input: unknown) => ${camelCase(className)}Service.create(input),
};
`,
    "service.ts": `import { ${camelCase(className)}Repository } from "./repository";
import { ${camelCase(className)}Schema } from "./schemas";

export const ${camelCase(className)}Service = {
  async list() {
    return ${camelCase(className)}Repository.list();
  },
  async create(input: unknown) {
    const parsed = ${camelCase(className)}Schema.parse(input);
    return ${camelCase(className)}Repository.create(parsed);
  },
};
`,
    "repository.ts": `import type { ${className}Input } from "./schemas";

const records: ${className}Input[] = [];

export const ${camelCase(className)}Repository = {
  async list() {
    return records;
  },
  async create(input: ${className}Input) {
    records.push(input);
    return input;
  },
};
`,
    "mapper.ts": `import type { ${className}Record } from "./types";

export function map${className}ToSummary(record: ${className}Record) {
  return {
    id: record.id,
    code: record.code,
    name: record.name,
    status: record.status,
  };
}
`,
    "policies.ts": `import { permissions } from "./permissions";

export function canManage${className}(grants: string[]) {
  return grants.includes(permissions.update) || grants.includes(permissions.approve);
}
`,
    "validators.ts": `import { ${camelCase(className)}Schema } from "./schemas";

export function validate${className}(input: unknown) {
  return ${camelCase(className)}Schema.safeParse(input);
}
`,
    "audit.ts": `import { events } from "./events";

export function audit${className}Action(action: keyof typeof events, actorId: string) {
  return {
    event: events[action],
    actorId,
    occurredAt: new Date().toISOString(),
  };
}
`,
    "workflows/index.ts": `export * from "./create.workflow";
export * from "./update.workflow";
export * from "./submit.workflow";
export * from "./approve.workflow";
export * from "./reject.workflow";
export * from "./cancel.workflow";
export * from "./close.workflow";
`,
    "workflows/create.workflow.ts": workflowTemplate("create", className),
    "workflows/update.workflow.ts": workflowTemplate("update", className),
    "workflows/submit.workflow.ts": workflowTemplate("submit", className),
    "workflows/approve.workflow.ts": workflowTemplate("approve", className),
    "workflows/reject.workflow.ts": workflowTemplate("reject", className),
    "workflows/cancel.workflow.ts": workflowTemplate("cancel", className),
    "workflows/close.workflow.ts": workflowTemplate("close", className),
    "jobs/index.ts": `export * from "./sync.job";
export * from "./reminder.job";
export * from "./recompute.job";
`,
    "jobs/sync.job.ts": jobTemplate("sync", className, slug),
    "jobs/reminder.job.ts": jobTemplate("reminder", className, slug),
    "jobs/recompute.job.ts": jobTemplate("recompute", className, slug),
    "reports/index.ts": `export * from "./summary.report";
export * from "./detail.report";
export * from "./export.report";
`,
    "reports/summary.report.ts": reportTemplate("summary", className, slug),
    "reports/detail.report.ts": reportTemplate("detail", className, slug),
    "reports/export.report.ts": reportTemplate("export", className, slug),
    "integrations/index.ts": `export * from "./inbound.adapter";
export * from "./outbound.adapter";
export * from "./webhook.adapter";
`,
    "integrations/inbound.adapter.ts": adapterTemplate("inbound", className, slug),
    "integrations/outbound.adapter.ts": adapterTemplate("outbound", className, slug),
    "integrations/webhook.adapter.ts": adapterTemplate("webhook", className, slug),
    "fixtures/sample.json": JSON.stringify(
      {
        tenantId: "demo-tenant",
        code: `${constName}-001`,
        name: `${entity} sample`,
        status: "draft",
      },
      null,
      2,
    ),
    "fixtures/seed.ts": `import sample from "./sample.json";
import { ${camelCase(className)}Service } from "../service";

export async function seed${className}() {
  return ${camelCase(className)}Service.create(sample);
}
`,
    "tests/routes.test.ts": testTemplate("routes", className),
    "tests/service.test.ts": testTemplate("service", className),
    "tests/repository.test.ts": testTemplate("repository", className),
    "tests/permissions.test.ts": testTemplate("permissions", className),
    "tests/workflows.test.ts": testTemplate("workflows", className),
    "tests/reports.test.ts": testTemplate("reports", className),
  };
};

function workflowTemplate(action, className) {
  return `export const ${camelCase(className)}${titleCase(action)}Workflow = {
  action: "${action}",
  requiresAudit: true,
  run(recordId: string, actorId: string) {
    return {
      recordId,
      actorId,
      action: "${action}",
      status: "${action}d",
      completedAt: new Date().toISOString(),
    };
  },
};
`;
}

function jobTemplate(kind, className, slug) {
  return `export const ${camelCase(className)}${titleCase(kind)}Job = {
  name: "${slug}.${kind}",
  queue: "${slug.replace(/\//g, "-")}",
  async run(tenantId: string) {
    return { tenantId, job: "${kind}", processedAt: new Date().toISOString() };
  },
};
`;
}

function reportTemplate(kind, className, slug) {
  return `export const ${camelCase(className)}${titleCase(kind)}Report = {
  id: "${slug}.${kind}",
  title: "${titleCase(slug)} ${titleCase(kind)} Report",
  columns: ["code", "name", "status", "ownerId", "updatedAt"],
  buildFilters(tenantId: string) {
    return { tenantId, report: "${kind}" };
  },
};
`;
}

function adapterTemplate(kind, className, slug) {
  return `export const ${camelCase(className)}${titleCase(kind)}Adapter = {
  name: "${slug}.${kind}",
  normalize(payload: Record<string, unknown>) {
    return {
      source: "${kind}",
      module: "${slug}",
      payload,
    };
  },
};
`;
}

function testTemplate(kind, className) {
  return `import { describe, expect, it } from "vitest";

describe("${className} ${kind}", () => {
  it("has a generated starter contract", () => {
    expect("${className}").toBeTruthy();
    expect("${kind}").toMatch(/^[a-z-]+$/);
  });
});
`;
}

const sqlTemplate = (filePath) => {
  const base = filePath.split("/").pop().replace(/^\d+_/, "").replace(/\.sql$/, "");
  const table = base.replace(/-/g, "_");
  if (filePath.includes("/views/")) {
    return `create or replace view ${table} as
select
  current_setting('app.tenant_id', true) as tenant_id,
  '${table}'::text as report_name,
  now() as generated_at;
`;
  }
  if (filePath.includes("/functions/")) {
    return `create or replace function ${table}()
returns jsonb
language plpgsql
as $$
begin
  return jsonb_build_object('function', '${table}', 'executed_at', now());
end;
$$;
`;
  }
  if (filePath.includes("/policies/")) {
    return `alter table if exists tenant_documents enable row level security;

drop policy if exists ${table} on tenant_documents;
create policy ${table} on tenant_documents
  using (tenant_id = current_setting('app.tenant_id', true));
`;
  }
  if (filePath.includes("/seeds/")) {
    return `insert into seed_registry (seed_key, description)
values ('${table}', 'Default seed data for ${titleCase(table)}')
on conflict (seed_key) do update set description = excluded.description;
`;
  }
  return `create table if not exists ${table} (
  id uuid primary key default gen_random_uuid(),
  tenant_id text,
  code text not null,
  name text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ${table}_tenant_idx on ${table} (tenant_id);
`;
};

const yamlTemplate = (filePath) => {
  const name = filePath.split("/").pop().replace(/\.[^.]+$/, "");
  if (filePath.includes(".github/workflows")) {
    return `name: ${titleCase(name)}

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
`;
  }
  if (filePath.endsWith("dependabot.yml")) {
    return `version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
`;
  }
  return `apiVersion: v1
kind: ConfigMap
metadata:
  name: vercent-${name}
  namespace: vercent
data:
  component: "${name}"
  managed-by: "vercent-platform"
`;
};

const terraformTemplate = (filePath) => {
  const name = filePath.split("/").pop().replace(/\.tf$/, "");
  if (name === "providers") {
    return `terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
`;
  }
  if (name === "variables") {
    return `variable "aws_region" {
  type    = string
  default = "ap-south-1"
}

variable "environment" {
  type    = string
  default = "dev"
}
`;
  }
  if (name === "outputs") {
    return `output "environment" {
  value = var.environment
}
`;
  }
  return `locals {
  ${name.replace(/-/g, "_")}_name = "vercent-\${var.environment}-${name}"
}
`;
};

const scriptTemplate = (filePath) => {
  const name = filePath.split("/").pop().replace(/\.ts$/, "");
  return `type ScriptResult = {
  script: string;
  status: "ready";
  executedAt: string;
};

export async function run(): Promise<ScriptResult> {
  return {
    script: "${name}",
    status: "ready",
    executedAt: new Date().toISOString(),
  };
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  run().then((result) => console.log(JSON.stringify(result, null, 2)));
}
`;
};

const docTemplate = (filePath) => {
  const title = titleCase(filePath.split("/").pop().replace(/\.md$/, ""));
  return `# ${title}

This document defines the Vercent ERP ${title.toLowerCase()} plan for the SaaS platform.

## Scope

- Tenant-aware operation across companies and branches.
- Auditability for sensitive business activity.
- Integration with the module runtime, workflows, reporting, and AI recommendations.

## Implementation Notes

Use the shared TypeScript packages, SQL-first migrations, role and attribute based permissions, and structured observability described in the core docs.
`;
};

const mobileFiles = (filePath) => {
  if (filePath.endsWith("package.json")) {
    return packageJson("@vercent/mobile", {
      scripts: { dev: "expo start", build: "expo export" },
      dependencies: { expo: "^51.0.0", react: "^18.3.0", "react-native": "^0.74.0" },
    });
  }
  if (filePath.endsWith("app.json")) {
    return JSON.stringify({ expo: { name: "Vercent ERP", slug: "vercent-erp", scheme: "vercent" } }, null, 2);
  }
  if (filePath.endsWith("eas.json")) {
    return JSON.stringify({ cli: { version: ">= 10.0.0" }, build: { development: { developmentClient: true }, production: {} } }, null, 2);
  }
  if (filePath.endsWith("App.tsx")) {
    return `import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  return <RootNavigator />;
}`;
  }
  if (filePath.endsWith("index.ts")) {
    return `import App from "./App";

export default App;`;
  }
  if (filePath.endsWith(".tsx")) {
    const name = titleCase(filePath.split("/").pop().replace(/\.[^.]+$/, "")).replace(/[^a-zA-Z0-9]/g, "");
    return `import { Text, View } from "react-native";

export function ${name}() {
  return (
    <View>
      <Text>${titleCase(slugFromPath(filePath))}</Text>
    </View>
  );
}

export default ${name};`;
  }
  if (filePath.endsWith(".ts")) return genericTs(filePath);
  return genericText(filePath);
};

const genericText = (filePath) => `Vercent ERP project artifact for ${filePath}.

This file is intentionally documented so every project artifact has a clear purpose in the SaaS ERP workspace.`;

const binaryPngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=";

const createListedFileContent = (filePath) => {
  if (rootFiles[filePath]) return rootFiles[filePath];
  if (webFiles[filePath]) return webFiles[filePath];
  if (filePath.startsWith("apps/web/src/app/") && filePath.endsWith("page.tsx")) return pageTemplate(filePath);
  if (filePath.startsWith("apps/web/src/components/") && filePath.endsWith(".tsx")) return componentTemplate(filePath);
  if (filePath.startsWith("apps/web/src/features/") && filePath.endsWith("index.ts")) return genericTs(filePath);
  if (filePath.startsWith("apps/web/src/") && /\.(ts|tsx)$/.test(filePath)) return libTemplate(filePath);
  if (filePath.startsWith("apps/mobile/")) return mobileFiles(filePath);
  if (filePath.startsWith("packages/") && filePath.endsWith("package.json")) return packageJsonForPath(filePath);
  if (filePath.startsWith("packages/") && filePath.endsWith(".ts")) return packageSourceTemplate(filePath);
  if (filePath.startsWith("database/") && filePath.endsWith(".sql")) return sqlTemplate(filePath);
  if (filePath.startsWith(".github/") || filePath.startsWith("infrastructure/kubernetes/")) return yamlTemplate(filePath);
  if (filePath.startsWith("infrastructure/terraform/") && filePath.endsWith(".tf")) return terraformTemplate(filePath);
  if (filePath.endsWith("terraform.tfvars.example")) return `aws_region  = "ap-south-1"
environment = "dev"
`;
  if (filePath.startsWith("infrastructure/docker/") && filePath.endsWith(".yml")) {
    return `services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: vercent
      POSTGRES_PASSWORD: vercent
      POSTGRES_DB: vercent_control_plane
    ports:
      - "5432:5432"
  redis:
    image: redis:7
    ports:
      - "6379:6379"
`;
  }
  if (filePath.endsWith("01-create-databases.sh")) {
    return `#!/usr/bin/env sh
set -eu
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<SQL
create database vercent_tenant_template;
SQL
`;
  }
  if (filePath.endsWith("redis.conf")) return `appendonly yes
maxmemory-policy allkeys-lru
`;
  if (filePath.startsWith("infrastructure/aws/") && filePath.endsWith(".json")) {
    return JSON.stringify({ Version: "2012-10-17", Statement: [{ Effect: "Allow", Action: ["s3:GetObject"], Resource: "*" }] }, null, 2);
  }
  if (filePath.startsWith("infrastructure/aws/") && filePath.endsWith(".md")) return docTemplate(filePath);
  if (filePath.startsWith("scripts/") && filePath.endsWith(".ts")) return scriptTemplate(filePath);
  if (filePath.startsWith("docs/") && filePath.endsWith(".md")) return docTemplate(filePath);
  if (filePath.endsWith(".json")) return JSON.stringify({ name: titleCase(filePath), generated: true }, null, 2);
  if (filePath.endsWith(".mjs") || filePath.endsWith(".js")) return `export default ${JSON.stringify({ generatedFor: filePath }, null, 2)};`;
  if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) return genericTs(filePath);
  if (filePath.endsWith(".png")) return null;
  return genericText(filePath);
};

const discoverModuleLeafs = (entries) => {
  const directories = entries.filter((entry) => entry.isDirectory).map((entry) => entry.path);
  const dirSet = new Set(directories);
  return directories
    .filter((dir) => dir.startsWith("modules/") && dir !== "modules")
    .filter((dir) => !directories.some((candidate) => candidate !== dir && candidate.startsWith(`${dir}/`)))
    .filter((dir) => dir.split("/").length >= 3)
    .filter((dir) => dirSet.has(dir));
};

const createServices = async (entries) => {
  const services = entries
    .filter((entry) => entry.isDirectory && entry.path.startsWith("services/") && entry.path.split("/").length === 2)
    .map((entry) => entry.path.split("/")[1]);

  for (const serviceName of services) {
    await writeProjectFile(`services/${serviceName}/package.json`, packageJson(`@vercent/${serviceName}-service`, {
      scripts: { dev: "tsx src/index.ts", build: "tsc --noEmit" },
      dependencies: {},
      devDependencies: { typescript: "^5.5.0", tsx: "^4.16.0" },
    }));
    await writeProjectFile(`services/${serviceName}/src/index.ts`, serviceTemplate(serviceName));
    await writeProjectFile(`services/${serviceName}/src/health.ts`, `export function health() {
  return { status: "ok", service: "${serviceName}", checkedAt: new Date().toISOString() };
}
`);
  }
};

const createPortalApps = async (entries) => {
  const appDirs = entries
    .filter((entry) => entry.isDirectory && entry.path.startsWith("apps/") && entry.path.split("/").length === 2)
    .map((entry) => entry.path.split("/")[1])
    .filter((name) => !["web", "mobile"].includes(name));

  for (const appName of appDirs) {
    await writeProjectFile(`apps/${appName}/package.json`, packageJson(`@vercent/${appName}`, {
      scripts: { dev: "next dev", build: "next build", start: "next start" },
      dependencies: { next: "^14.2.0", react: "^18.3.0", "react-dom": "^18.3.0" },
    }));
    await writeProjectFile(`apps/${appName}/src/app/page.tsx`, `export default function ${titleCase(appName).replace(/[^a-zA-Z0-9]/g, "")}Page() {
  return (
    <main>
      <h1>${titleCase(appName)}</h1>
      <p>Vercent ERP ${titleCase(appName).toLowerCase()} experience for tenant-aware workflows.</p>
    </main>
  );
}
`);
    await writeProjectFile(`apps/${appName}/README.md`, `# ${titleCase(appName)}

Next.js application for the Vercent ERP ${titleCase(appName).toLowerCase()} surface.
`);
  }
};

const createSupportIndexes = async (entries) => {
  const webFeatureDirs = entries
    .filter((entry) => entry.isDirectory && entry.path.startsWith("apps/web/src/features/") && entry.path.split("/").length === 4)
    .map((entry) => entry.path);
  for (const dir of webFeatureDirs) {
    await writeProjectFile(`${dir}/index.ts`, `export const feature = {
  name: "${titleCase(dir.split("/").pop())}",
  enabled: true,
  tenantAware: true,
} as const;
`);
  }

  const testDirs = entries.filter((entry) => entry.isDirectory && entry.path.startsWith("tests/")).map((entry) => entry.path);
  for (const dir of testDirs) {
    await writeProjectFile(`${dir}/README.md`, `# ${titleCase(dir)}

Test workspace for Vercent ERP ${titleCase(dir.split("/").pop())} scenarios.
`);
  }
};

const createListedFiles = async (entries) => {
  for (const [filePath, content] of Object.entries(rootFiles)) {
    await writeProjectFile(filePath, content);
  }
  for (const entry of entries) {
    if (entry.isDirectory) {
      await mkdir(join(root, entry.path), { recursive: true });
      continue;
    }
    const content = createListedFileContent(entry.path);
    await ensureDir(entry.path);
    if (content === null && entry.path.endsWith(".png")) {
      const absolutePath = join(root, entry.path);
      await mkdir(dirname(absolutePath), { recursive: true });
      try {
        await readFile(absolutePath);
      } catch {
        await writeFile(absolutePath, Buffer.from(binaryPngBase64, "base64"));
      }
    } else {
      await writeProjectFile(entry.path, content);
    }
  }
};

const createModuleLeafs = async (entries) => {
  const leafs = discoverModuleLeafs(entries);
  for (const leaf of leafs) {
    const files = moduleFiles(leaf);
    for (const [relativeFile, content] of Object.entries(files)) {
      await writeProjectFile(`${leaf}/${relativeFile}`, content);
    }
  }
  await writeProjectFile("modules/index.ts", `${leafs
    .map((leaf) => `export * as ${camelCase(leaf.replace(/^modules\//, "").replace(/\//g, "-"))} from "./${leaf.replace(/^modules\//, "")}/index";`)
    .join("\n")}
`);
};

const main = async () => {
  const entries = await readProjectTree();
  await createListedFiles(entries);
  await createPortalApps(entries);
  await createServices(entries);
  await createSupportIndexes(entries);
  await createModuleLeafs(entries);
  console.log(JSON.stringify({ status: "created", listedEntries: entries.length, moduleLeafs: discoverModuleLeafs(entries).length }, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
