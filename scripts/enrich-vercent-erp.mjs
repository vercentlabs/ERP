import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, posix } from "node:path";

const root = process.cwd();

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

const pascalCase = (value) => titleCase(value).replace(/[^a-zA-Z0-9]/g, "") || "Record";

const constantCase = (value) =>
  value
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();

const write = async (filePath, content) => {
  const absolutePath = join(root, filePath);
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, `${content.trimEnd()}\n`, "utf8");
};

const readTree = async () => {
  const doc = await readFile(join(root, "docs", "project-structure.md"), "utf8");
  const codeBlock = doc.match(/```txt\r?\nvercent-erp-platform\/\r?\n([\s\S]*?)```/);
  if (!codeBlock) throw new Error("Project tree code block was not found.");
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

const moduleLeafs = (entries) => {
  const dirs = entries.filter((entry) => entry.isDirectory).map((entry) => entry.path);
  return dirs
    .filter((dir) => dir.startsWith("modules/"))
    .filter((dir) => dir.split("/").length >= 3)
    .filter((dir) => !dirs.some((candidate) => candidate !== dir && candidate.startsWith(`${dir}/`)));
};

const sharedTypes = `export type TenantId = string;
export type UserId = string;
export type CompanyId = string;
export type BranchId = string;
export type ISODateTime = string;

export type TenantScope = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
};

export type ActorContext = TenantScope & {
  actorId: UserId;
  roles: string[];
  permissions: string[];
  attributes?: Record<string, string | number | boolean>;
};

export type AuditFields = {
  createdAt: ISODateTime;
  createdBy: UserId;
  updatedAt: ISODateTime;
  updatedBy: UserId;
};

export type DocumentStatus = "draft" | "submitted" | "approved" | "rejected" | "cancelled" | "closed";

export type ErpRecord<TExtra extends Record<string, unknown> = Record<string, unknown>> = TenantScope &
  AuditFields &
  TExtra & {
    id: string;
    code: string;
    name: string;
    status: DocumentStatus;
    ownerId?: UserId;
    tags: string[];
    customFields: Record<string, unknown>;
  };

export type BusinessEvent<TPayload = Record<string, unknown>> = TenantScope & {
  id: string;
  type: string;
  aggregateId: string;
  aggregateType: string;
  payload: TPayload;
  actorId: UserId;
  occurredAt: ISODateTime;
};

export type PageRequest = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: DocumentStatus;
};

export type PageResult<T> = {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
};`;

const permissionsFiles = {
  "packages/permissions/src/rbac.ts": `export type Role = {
  id: string;
  name: string;
  permissions: string[];
};

export function hasPermission(grants: string[], permission: string) {
  return grants.includes("*") || grants.includes(permission);
}

export function resolveRolePermissions(roles: Role[]) {
  return [...new Set(roles.flatMap((role) => role.permissions))];
}`,
  "packages/permissions/src/abac.ts": `import type { ActorContext, TenantScope } from "@vercent/shared-types";

export type AttributeRule = {
  attribute: string;
  equals: string | number | boolean;
};

export function satisfiesTenantScope(actor: ActorContext, record: TenantScope) {
  if (actor.tenantId !== record.tenantId) return false;
  if (record.companyId && actor.companyId && record.companyId !== actor.companyId) return false;
  if (record.branchId && actor.branchId && record.branchId !== actor.branchId) return false;
  return true;
}

export function satisfiesAttributes(actor: ActorContext, rules: AttributeRule[] = []) {
  return rules.every((rule) => actor.attributes?.[rule.attribute] === rule.equals);
}`,
  "packages/permissions/src/permissionMatrix.ts": `export type PermissionMatrix = Record<string, string[]>;

export const platformPermissionMatrix: PermissionMatrix = {
  owner: ["*"],
  admin: ["platform:*", "crm:*", "sales:*", "finance:*", "inventory:*"],
  manager: ["crm:read", "sales:read", "inventory:read", "finance:report"],
  operator: ["crm:read", "sales:create", "inventory:update"],
};

export function expandModulePermission(module: string, action: string) {
  return \`\${module}:\${action}\`;
}`,
  "packages/permissions/src/policyEvaluator.ts": `import type { ActorContext, TenantScope } from "@vercent/shared-types";
import { satisfiesTenantScope, type AttributeRule, satisfiesAttributes } from "./abac";
import { hasPermission } from "./rbac";

export type PolicyDecision = {
  allowed: boolean;
  reasons: string[];
};

export type PolicyInput = {
  actor: ActorContext;
  permission: string;
  record?: TenantScope;
  rules?: AttributeRule[];
};

export function evaluatePolicy(input: PolicyInput): PolicyDecision {
  const reasons: string[] = [];
  const wildcardPermission = input.permission.replace(/:[^:]+$/, ":*");
  const hasGrant =
    hasPermission(input.actor.permissions, input.permission) ||
    hasPermission(input.actor.permissions, wildcardPermission);

  if (!hasGrant) reasons.push(\`Missing permission \${input.permission}\`);
  if (input.record && !satisfiesTenantScope(input.actor, input.record)) {
    reasons.push("Record is outside actor tenant/company/branch scope");
  }
  if (!satisfiesAttributes(input.actor, input.rules)) {
    reasons.push("Actor attributes do not satisfy policy rules");
  }

  return { allowed: reasons.length === 0, reasons };
}`,
};

const workflowFiles = {
  "packages/workflows/src/workflowDefinition.ts": `import type { DocumentStatus } from "@vercent/shared-types";

export type WorkflowAction = "create" | "update" | "submit" | "approve" | "reject" | "cancel" | "close";

export type WorkflowTransition = {
  action: WorkflowAction;
  from: DocumentStatus[];
  to: DocumentStatus;
  permission: string;
};

export type WorkflowDefinition = {
  id: string;
  module: string;
  transitions: WorkflowTransition[];
};`,
  "packages/workflows/src/ruleEvaluator.ts": `export type RuleContext = Record<string, unknown>;
export type WorkflowRule = {
  field: string;
  equals: unknown;
  message: string;
};

export function evaluateRules(context: RuleContext, rules: WorkflowRule[]) {
  return rules.filter((rule) => context[rule.field] !== rule.equals).map((rule) => rule.message);
}`,
  "packages/workflows/src/approvalMatrix.ts": `export type ApprovalStep = {
  name: string;
  role: string;
  minAmount?: number;
};

export function resolveApprovalSteps(amount: number, steps: ApprovalStep[]) {
  return steps.filter((step) => step.minAmount === undefined || amount >= step.minAmount);
}`,
  "packages/workflows/src/workflowRuntime.ts": `import type { DocumentStatus, ActorContext } from "@vercent/shared-types";
import type { WorkflowDefinition, WorkflowAction } from "./workflowDefinition";

export type WorkflowRecord = {
  id: string;
  status: DocumentStatus;
};

export function transitionWorkflow(
  definition: WorkflowDefinition,
  record: WorkflowRecord,
  action: WorkflowAction,
  actor: ActorContext,
) {
  const transition = definition.transitions.find(
    (candidate) => candidate.action === action && candidate.from.includes(record.status),
  );
  if (!transition) {
    throw new Error(\`Action \${action} is not valid from \${record.status}\`);
  }
  if (!actor.permissions.includes("*") && !actor.permissions.includes(transition.permission)) {
    throw new Error(\`Actor lacks permission \${transition.permission}\`);
  }
  return {
    ...record,
    status: transition.to,
    updatedAt: new Date().toISOString(),
    updatedBy: actor.actorId,
  };
}`,
};

const documentEngineFiles = {
  "packages/document-engine/src/documentStatus.ts": `import type { DocumentStatus } from "@vercent/shared-types";

export const documentStatuses: DocumentStatus[] = [
  "draft",
  "submitted",
  "approved",
  "rejected",
  "cancelled",
  "closed",
];`,
  "packages/document-engine/src/documentActions.ts": `import type { DocumentStatus } from "@vercent/shared-types";

export type DocumentAction = "submit" | "approve" | "reject" | "cancel" | "close";

export const allowedDocumentActions: Record<DocumentStatus, DocumentAction[]> = {
  draft: ["submit", "cancel"],
  submitted: ["approve", "reject", "cancel"],
  approved: ["close", "cancel"],
  rejected: ["submit", "cancel"],
  cancelled: [],
  closed: [],
};`,
  "packages/document-engine/src/documentLifecycle.ts": `import type { DocumentStatus } from "@vercent/shared-types";
import { allowedDocumentActions, type DocumentAction } from "./documentActions";

const nextStatus: Record<DocumentAction, DocumentStatus> = {
  submit: "submitted",
  approve: "approved",
  reject: "rejected",
  cancel: "cancelled",
  close: "closed",
};

export function applyDocumentAction(status: DocumentStatus, action: DocumentAction) {
  if (!allowedDocumentActions[status].includes(action)) {
    throw new Error(\`Cannot \${action} a document in \${status} status\`);
  }
  return nextStatus[action];
}`,
  "packages/document-engine/src/documentNumbering.ts": `export type NumberingInput = {
  prefix: string;
  fiscalYear: string;
  sequence: number;
};

export function generateDocumentNumber(input: NumberingInput) {
  return \`\${input.prefix}-\${input.fiscalYear}-\${String(input.sequence).padStart(6, "0")}\`;
}`,
};

const reportingFiles = {
  "packages/reporting-engine/src/reportDefinition.ts": `export type ReportColumn = {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "currency" | "status";
};

export type ReportDefinition = {
  id: string;
  title: string;
  columns: ReportColumn[];
  tenantScoped: boolean;
};`,
  "packages/reporting-engine/src/queryBuilder.ts": `export type QueryFilter = {
  field: string;
  operator: "=" | "!=" | "in" | "contains";
  value: unknown;
};

export function buildWhereClause(filters: QueryFilter[]) {
  return filters.map((filter, index) => ({
    parameter: \`$\${index + 1}\`,
    sql: \`\${filter.field} \${filter.operator === "contains" ? "ilike" : filter.operator} $\${index + 1}\`,
    value: filter.operator === "contains" ? \`%\${filter.value}%\` : filter.value,
  }));
}`,
  "packages/reporting-engine/src/exportRenderer.ts": `import type { ReportDefinition } from "./reportDefinition";

export function renderCsv(definition: ReportDefinition, rows: Record<string, unknown>[]) {
  const header = definition.columns.map((column) => column.label).join(",");
  const body = rows.map((row) => definition.columns.map((column) => JSON.stringify(row[column.key] ?? "")).join(","));
  return [header, ...body].join("\\n");
}`,
  "packages/reporting-engine/src/scheduledReports.ts": `export type ScheduledReport = {
  reportId: string;
  cron: string;
  recipients: string[];
};

export function nextScheduledReportJob(report: ScheduledReport) {
  return {
    name: \`report.\${report.reportId}\`,
    cron: report.cron,
    payload: { recipients: report.recipients },
  };
}`,
};

const databaseFiles = {
  "packages/database/src/knex.ts": `export type DatabaseConfig = {
  connectionString: string;
  applicationName: string;
  pool: { min: number; max: number };
};

export function createDatabaseConfig(connectionString: string, applicationName = "vercent-erp"): DatabaseConfig {
  if (!connectionString) throw new Error("Database connection string is required");
  return { connectionString, applicationName, pool: { min: 2, max: 20 } };
}`,
  "packages/database/src/transactions.ts": `export type TransactionBoundary = {
  commit(): Promise<void>;
  rollback(): Promise<void>;
};

export async function runInTransaction<T>(boundary: TransactionBoundary, handler: () => Promise<T>) {
  try {
    const result = await handler();
    await boundary.commit();
    return result;
  } catch (error) {
    await boundary.rollback();
    throw error;
  }
}`,
  "packages/database/src/tenantConnection.ts": `import type { TenantId } from "@vercent/shared-types";

export type TenantConnection = {
  tenantId: TenantId;
  databaseUrl: string;
  schema: string;
};

export function resolveTenantConnection(tenantId: TenantId, databaseUrl: string): TenantConnection {
  return {
    tenantId,
    databaseUrl,
    schema: \`tenant_\${tenantId.replace(/[^a-zA-Z0-9]/g, "_")}\`,
  };
}`,
  "packages/database/src/migrations.ts": `export type Migration = {
  id: string;
  name: string;
  database: "control-plane" | "tenant";
  checksum?: string;
};

export function sortMigrations(migrations: Migration[]) {
  return [...migrations].sort((left, right) => left.id.localeCompare(right.id));
}`,
};

const moduleTemplates = (modulePath) => {
  const [, domain, ...leafParts] = modulePath.split("/");
  const leaf = leafParts.join("/");
  const slug = `${domain}/${leaf}`;
  const route = `/api/${slug}`;
  const entity = pascalCase(leaf || domain);
  const variable = camelCase(entity);
  const constant = constantCase(`${domain}_${leaf}`);
  const table = `${domain}_${leaf.replace(/\//g, "_").replace(/-/g, "_")}`;
  const displayName = titleCase(leaf || domain);
  return {
    "index.ts": `export * from "./manifest";
export * from "./permissions";
export * from "./events";
export * from "./types";
export * from "./schemas";
export * from "./repository";
export * from "./service";
export * from "./controller";
export * from "./routes";`,
    "manifest.ts": `export const manifest = {
  domain: "${domain}",
  module: "${leaf}",
  displayName: "${displayName}",
  routeBase: "${route}",
  table: "${table}",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;`,
    "permissions.ts": `export const permissions = {
  read: "${slug}:read",
  create: "${slug}:create",
  update: "${slug}:update",
  submit: "${slug}:submit",
  approve: "${slug}:approve",
  reject: "${slug}:reject",
  cancel: "${slug}:cancel",
  close: "${slug}:close",
  report: "${slug}:report",
} as const;

export type ${entity}Permission = (typeof permissions)[keyof typeof permissions];`,
    "events.ts": `export const events = {
  created: "${slug}.created",
  updated: "${slug}.updated",
  submitted: "${slug}.submitted",
  approved: "${slug}.approved",
  rejected: "${slug}.rejected",
  cancelled: "${slug}.cancelled",
  closed: "${slug}.closed",
  riskDetected: "${slug}.risk-detected",
  nextActionRecommended: "${slug}.next-action-recommended",
} as const;`,
    "constants.ts": `export const ${constant}_MODULE = "${slug}";
export const ${constant}_TABLE = "${table}";
export const ${constant}_DEFAULT_PAGE_SIZE = 50;
export const ${constant}_SEARCH_FIELDS = ["code", "name", "ownerId", "status"] as const;`,
    "types.ts": `import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ${entity}Record = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ${entity}CreateInput = {
  tenantId: string;
  companyId?: string;
  branchId?: string;
  code: string;
  name: string;
  description?: string;
  amount?: number;
  priority?: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  ownerId?: string;
  source?: string;
  customFields?: Record<string, unknown>;
};

export type ${entity}UpdateInput = Partial<Omit<${entity}CreateInput, "tenantId" | "code">>;

export type ${entity}ListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ${entity}Record["priority"];
};

export type ${entity}ActionContext = ActorContext & {
  reason?: string;
};

export type ${entity}Status = DocumentStatus;`,
    "schemas.ts": `import { z } from "zod";

export const ${variable}CreateSchema = z.object({
  tenantId: z.string().min(1),
  companyId: z.string().optional(),
  branchId: z.string().optional(),
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  amount: z.number().nonnegative().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  dueDate: z.string().datetime().optional(),
  ownerId: z.string().optional(),
  source: z.string().optional(),
  customFields: z.record(z.unknown()).default({}),
});

export const ${variable}UpdateSchema = ${variable}CreateSchema.omit({ tenantId: true, code: true }).partial();

export const ${variable}ListSchema = z.object({
  tenantId: z.string().min(1),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(200).default(50),
  search: z.string().optional(),
  status: z.enum(["draft", "submitted", "approved", "rejected", "cancelled", "closed"]).optional(),
  ownerId: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
});`,
    "repository.ts": `import type { PageResult } from "@vercent/shared-types";
import type { ${entity}CreateInput, ${entity}ListRequest, ${entity}Record, ${entity}UpdateInput } from "./types";

const records = new Map<string, ${entity}Record>();

const now = () => new Date().toISOString();
const createId = () => crypto.randomUUID?.() ?? \`\${Date.now()}-\${Math.random().toString(16).slice(2)}\`;

export const ${variable}Repository = {
  async list(request: ${entity}ListRequest): Promise<PageResult<${entity}Record>> {
    const page = request.page ?? 1;
    const pageSize = request.pageSize ?? 50;
    const search = request.search?.toLowerCase();
    const rows = [...records.values()].filter((record) => {
      if (record.tenantId !== request.tenantId) return false;
      if (request.status && record.status !== request.status) return false;
      if (request.ownerId && record.ownerId !== request.ownerId) return false;
      if (request.priority && record.priority !== request.priority) return false;
      if (!search) return true;
      return [record.code, record.name, record.description, record.ownerId]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search));
    });
    const start = (page - 1) * pageSize;
    return { rows: rows.slice(start, start + pageSize), total: rows.length, page, pageSize };
  },

  async getById(tenantId: string, id: string) {
    const record = records.get(id);
    return record?.tenantId === tenantId ? record : undefined;
  },

  async create(input: ${entity}CreateInput, actorId = "system"): Promise<${entity}Record> {
    const timestamp = now();
    const record: ${entity}Record = {
      id: createId(),
      tenantId: input.tenantId,
      companyId: input.companyId,
      branchId: input.branchId,
      code: input.code,
      name: input.name,
      description: input.description,
      amount: input.amount,
      priority: input.priority ?? "medium",
      dueDate: input.dueDate,
      ownerId: input.ownerId,
      source: input.source,
      status: "draft",
      tags: [],
      customFields: input.customFields ?? {},
      createdAt: timestamp,
      createdBy: actorId,
      updatedAt: timestamp,
      updatedBy: actorId,
    };
    records.set(record.id, record);
    return record;
  },

  async update(tenantId: string, id: string, input: ${entity}UpdateInput, actorId = "system") {
    const current = await this.getById(tenantId, id);
    if (!current) return undefined;
    const updated: ${entity}Record = {
      ...current,
      ...input,
      tenantId: current.tenantId,
      code: current.code,
      updatedAt: now(),
      updatedBy: actorId,
    };
    records.set(id, updated);
    return updated;
  },

  async save(record: ${entity}Record) {
    records.set(record.id, record);
    return record;
  },
};`,
    "service.ts": `import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { ${variable}Repository } from "./repository";
import { ${variable}CreateSchema, ${variable}ListSchema, ${variable}UpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ${entity}ActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const ${variable}Service = {
  async list(input: unknown) {
    return ${variable}Repository.list(${variable}ListSchema.parse(input));
  },

  async create(input: unknown, context: ${entity}ActionContext) {
    const parsed = ${variable}CreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return ${variable}Repository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ${entity}ActionContext) {
    const current = await ${variable}Repository.getById(tenantId, id);
    if (!current) throw new Error("${displayName} record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return ${variable}Repository.update(tenantId, id, ${variable}UpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ${entity}ActionContext) {
    const current = await ${variable}Repository.getById(tenantId, id);
    if (!current) throw new Error("${displayName} record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return ${variable}Repository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await ${variable}Repository.getById(tenantId, id);
    if (!record) throw new Error("${displayName} record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};`,
    "controller.ts": `import type { Request, Response } from "express";
import { ${variable}Service } from "./service";

const contextFromRequest = (request: Request) => ({
  tenantId: String(request.header("x-tenant-id") ?? request.body?.tenantId ?? request.query?.tenantId ?? "demo-tenant"),
  actorId: String(request.header("x-actor-id") ?? "system"),
  roles: String(request.header("x-roles") ?? "admin").split(","),
  permissions: String(request.header("x-permissions") ?? "*").split(","),
});

export const ${variable}Controller = {
  async list(request: Request, response: Response) {
    response.json(await ${variable}Service.list({ ...request.query, tenantId: contextFromRequest(request).tenantId }));
  },
  async create(request: Request, response: Response) {
    response.status(201).json(await ${variable}Service.create(request.body, contextFromRequest(request)));
  },
  async update(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await ${variable}Service.update(context.tenantId, request.params.id, request.body, context));
  },
  async transition(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await ${variable}Service.transition(context.tenantId, request.params.id, request.params.action as never, context));
  },
};`,
    "routes.ts": `import type { Router } from "express";
import { ${variable}Controller } from "./controller";
import { manifest } from "./manifest";

export function register${entity}Routes(router: Router) {
  router.get(manifest.routeBase, ${variable}Controller.list);
  router.post(manifest.routeBase, ${variable}Controller.create);
  router.patch(\`\${manifest.routeBase}/:id\`, ${variable}Controller.update);
  router.post(\`\${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)\`, ${variable}Controller.transition);
}`,
    "mapper.ts": `import type { ${entity}Record } from "./types";

export function map${entity}ToCommandCenter(record: ${entity}Record) {
  return {
    id: record.id,
    title: record.name,
    status: record.status,
    priority: record.priority,
    ownerId: record.ownerId,
    risk: record.priority === "critical" || record.status === "rejected",
    nextAction: record.status === "draft" ? "Submit" : record.status === "submitted" ? "Approve or reject" : "Monitor",
  };
}`,
    "policies.ts": `import type { ActorContext, TenantScope } from "@vercent/shared-types";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { permissions } from "./permissions";

export function canRead${entity}(actor: ActorContext, record: TenantScope) {
  return evaluatePolicy({ actor, permission: permissions.read, record }).allowed;
}

export function canApprove${entity}(actor: ActorContext, record: TenantScope) {
  return evaluatePolicy({ actor, permission: permissions.approve, record }).allowed;
}`,
    "validators.ts": `import { ${variable}CreateSchema, ${variable}ListSchema, ${variable}UpdateSchema } from "./schemas";

export const validators = {
  create: (input: unknown) => ${variable}CreateSchema.safeParse(input),
  update: (input: unknown) => ${variable}UpdateSchema.safeParse(input),
  list: (input: unknown) => ${variable}ListSchema.safeParse(input),
};`,
    "audit.ts": `import type { BusinessEvent } from "@vercent/shared-types";
import { events } from "./events";

export function createAuditEvent(
  type: keyof typeof events,
  tenantId: string,
  aggregateId: string,
  actorId: string,
  payload: Record<string, unknown> = {},
): BusinessEvent {
  return {
    id: crypto.randomUUID?.() ?? \`\${Date.now()}\`,
    type: events[type],
    tenantId,
    aggregateId,
    aggregateType: "${slug}",
    actorId,
    payload,
    occurredAt: new Date().toISOString(),
  };
}`,
    "workflows/index.ts": `import type { WorkflowDefinition } from "@vercent/workflows/workflowDefinition";
import { permissions } from "../permissions";

export const workflowDefinition: WorkflowDefinition = {
  id: "${slug}.default",
  module: "${slug}",
  transitions: [
    { action: "submit", from: ["draft", "rejected"], to: "submitted", permission: permissions.submit },
    { action: "approve", from: ["submitted"], to: "approved", permission: permissions.approve },
    { action: "reject", from: ["submitted"], to: "rejected", permission: permissions.reject },
    { action: "cancel", from: ["draft", "submitted", "approved", "rejected"], to: "cancelled", permission: permissions.cancel },
    { action: "close", from: ["approved"], to: "closed", permission: permissions.close },
  ],
};

export * from "./create.workflow";
export * from "./update.workflow";
export * from "./submit.workflow";
export * from "./approve.workflow";
export * from "./reject.workflow";
export * from "./cancel.workflow";
export * from "./close.workflow";`,
    "jobs/index.ts": `export * from "./sync.job";
export * from "./reminder.job";
export * from "./recompute.job";`,
    "reports/index.ts": `export * from "./summary.report";
export * from "./detail.report";
export * from "./export.report";`,
    "integrations/index.ts": `export * from "./inbound.adapter";
export * from "./outbound.adapter";
export * from "./webhook.adapter";`,
    "fixtures/sample.json": JSON.stringify(
      {
        tenantId: "demo-tenant",
        code: `${constant}-001`,
        name: `${displayName} sample`,
        priority: "medium",
        source: "seed",
        customFields: {},
      },
      null,
      2,
    ),
    "fixtures/seed.ts": `import sample from "./sample.json";
import { ${variable}Service } from "../service";

export async function seed${entity}() {
  return ${variable}Service.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}`,
  };
};

const workflowActionFile = (action, entity, slug) => `export const ${camelCase(entity)}${pascalCase(action)}Workflow = {
  module: "${slug}",
  action: "${action}",
  requiresAudit: true,
  ownerVisible: ${["submit", "approve", "reject"].includes(action)},
  describe(recordId: string) {
    return \`${titleCase(action)} workflow for ${slug} record \${recordId}\`;
  },
};`;

const jobFile = (kind, entity, slug) => `export const ${camelCase(entity)}${pascalCase(kind)}Job = {
  name: "${slug}.${kind}",
  queue: "${slug.replace(/\//g, "-")}",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "${kind}",
      completedAt: new Date().toISOString(),
    };
  },
};`;

const reportFile = (kind, entity, slug) => `export const ${camelCase(entity)}${pascalCase(kind)}Report = {
  id: "${slug}.${kind}",
  title: "${titleCase(slug)} ${titleCase(kind)} Report",
  tenantScoped: true,
  columns: [
    { key: "code", label: "Code", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "status", label: "Status", type: "status" },
    { key: "priority", label: "Priority", type: "text" },
    { key: "updatedAt", label: "Updated", type: "date" },
  ],
};`;

const adapterFile = (kind, entity, slug) => `export const ${camelCase(entity)}${pascalCase(kind)}Adapter = {
  name: "${slug}.${kind}",
  direction: "${kind}",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "${slug}",
      adapter: "${kind}",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};`;

const testFile = (kind, entity, slug) => `import { describe, expect, it } from "vitest";
import { manifest } from "../manifest";

describe("${slug} ${kind}", () => {
  it("is tenant-scoped and has a route base", () => {
    expect(manifest.tenantScoped).toBe(true);
    expect(manifest.routeBase).toContain("/api/");
  });
});`;

const enrichModule = async (modulePath) => {
  const [, domain, ...leafParts] = modulePath.split("/");
  const leaf = leafParts.join("/");
  const slug = `${domain}/${leaf}`;
  const entity = pascalCase(leaf || domain);
  const files = moduleTemplates(modulePath);

  for (const [name, content] of Object.entries(files)) await write(`${modulePath}/${name}`, content);
  for (const action of ["create", "update", "submit", "approve", "reject", "cancel", "close"]) {
    await write(`${modulePath}/workflows/${action}.workflow.ts`, workflowActionFile(action, entity, slug));
  }
  for (const kind of ["sync", "reminder", "recompute"]) {
    await write(`${modulePath}/jobs/${kind}.job.ts`, jobFile(kind, entity, slug));
  }
  for (const kind of ["summary", "detail", "export"]) {
    await write(`${modulePath}/reports/${kind}.report.ts`, reportFile(kind, entity, slug));
  }
  for (const kind of ["inbound", "outbound", "webhook"]) {
    await write(`${modulePath}/integrations/${kind}.adapter.ts`, adapterFile(kind, entity, slug));
  }
  for (const kind of ["routes", "service", "repository", "permissions", "workflows", "reports"]) {
    await write(`${modulePath}/tests/${kind}.test.ts`, testFile(kind, entity, slug));
  }
};

const writeCorePackages = async () => {
  await write("packages/shared-types/src/index.ts", sharedTypes);
  for (const [file, content] of Object.entries(permissionsFiles)) await write(file, content);
  for (const [file, content] of Object.entries(workflowFiles)) await write(file, content);
  for (const [file, content] of Object.entries(documentEngineFiles)) await write(file, content);
  for (const [file, content] of Object.entries(reportingFiles)) await write(file, content);
  for (const [file, content] of Object.entries(databaseFiles)) await write(file, content);
};

const writeFocusedFiles = async () => {
  await write(
    "apps/admin-console/src/app/page.tsx",
    `const platformMetrics = [
  { label: "Active tenants", value: "128", detail: "Provisioned companies across plans" },
  { label: "Trials needing action", value: "14", detail: "AI recommends owner follow-up" },
  { label: "Usage alerts", value: "9", detail: "Storage, seats, API, or automation quota pressure" },
  { label: "Failed jobs", value: "3", detail: "Billing, webhook, and import jobs requiring review" },
];

const controlPlaneActions = [
  "Provision tenant database",
  "Apply plan entitlements",
  "Suspend or restore tenant access",
  "Review usage metering and billing events",
  "Audit admin activity",
];

export default function AdminConsolePage() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <header>
        <p style={{ color: "#155eef", fontWeight: 700 }}>Vercent Control Plane</p>
        <h1>SaaS Admin Console</h1>
        <p>
          Manage tenants, plans, entitlements, metering, billing lifecycle, backups, and platform risk
          from one owner-focused operating view.
        </p>
      </header>

      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {platformMetrics.map((metric) => (
          <article key={metric.label} style={{ border: "1px solid #d8dee8", borderRadius: 8, padding: 16 }}>
            <span>{metric.label}</span>
            <strong style={{ display: "block", fontSize: 28 }}>{metric.value}</strong>
            <small>{metric.detail}</small>
          </article>
        ))}
      </section>

      <section>
        <h2>Control plane actions</h2>
        <ul>
          {controlPlaneActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}`,
  );

  await write(
    "scripts/data-migration/migrate-current-crm.ts",
    `type LegacyLead = {
  name: string;
  phone?: string;
  email?: string;
  source?: string;
  ownerId?: string;
};

type MigrationResult = {
  imported: number;
  skipped: number;
  errors: string[];
};

export function normalizeLegacyLead(tenantId: string, lead: LegacyLead, index: number) {
  if (!lead.name?.trim()) throw new Error(\`Lead at row \${index + 1} is missing a name\`);
  return {
    tenantId,
    code: \`LEAD-\${String(index + 1).padStart(6, "0")}\`,
    name: lead.name.trim(),
    ownerId: lead.ownerId,
    source: lead.source ?? "legacy-crm",
    customFields: {
      phone: lead.phone,
      email: lead.email,
    },
  };
}

export async function migrateCurrentCrm(tenantId: string, rows: LegacyLead[]): Promise<MigrationResult> {
  const result: MigrationResult = { imported: 0, skipped: 0, errors: [] };
  rows.forEach((row, index) => {
    try {
      normalizeLegacyLead(tenantId, row, index);
      result.imported += 1;
    } catch (error) {
      result.skipped += 1;
      result.errors.push(error instanceof Error ? error.message : String(error));
    }
  });
  return result;
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  migrateCurrentCrm("demo-tenant", [{ name: "Sample customer", source: "spreadsheet" }]).then((result) =>
    console.log(JSON.stringify(result, null, 2)),
  );
}`,
  );

  await write(
    "scripts/backups/restore-tenant.ts",
    `type RestoreStep = "validate-backup" | "create-restore-database" | "apply-dump" | "verify-checksums" | "swap-tenant-routing";

export type TenantRestorePlan = {
  tenantId: string;
  backupId: string;
  requestedBy: string;
  steps: RestoreStep[];
};

export function createTenantRestorePlan(tenantId: string, backupId: string, requestedBy: string): TenantRestorePlan {
  if (!tenantId) throw new Error("tenantId is required");
  if (!backupId) throw new Error("backupId is required");
  return {
    tenantId,
    backupId,
    requestedBy,
    steps: ["validate-backup", "create-restore-database", "apply-dump", "verify-checksums", "swap-tenant-routing"],
  };
}

export async function restoreTenant(plan: TenantRestorePlan) {
  return {
    ...plan,
    status: "planned",
    warning: "Run this plan through the production deployment pipeline before touching tenant routing.",
    plannedAt: new Date().toISOString(),
  };
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  restoreTenant(createTenantRestorePlan("demo-tenant", "backup-2026-06-19", "platform-admin")).then((result) =>
    console.log(JSON.stringify(result, null, 2)),
  );
}`,
  );
};

const main = async () => {
  const entries = await readTree();
  const leafs = moduleLeafs(entries);
  await writeCorePackages();
  await writeFocusedFiles();
  for (const leaf of leafs) await enrichModule(leaf);
  console.log(JSON.stringify({ status: "enriched", moduleLeafs: leafs.length }, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
