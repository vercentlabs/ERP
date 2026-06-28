import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { catalogRepository } from "./repository";
import { catalogCreateSchema, catalogListSchema, catalogUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CatalogActionContext, CatalogCreateInput, CatalogListRequest, CatalogUpdateInput } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const catalogService = {
  async list(input: unknown) {
    const parsed = catalogListSchema.parse(input) as CatalogListRequest;
    return catalogRepository.list(parsed);
  },

  async create(input: unknown, context: CatalogActionContext) {
    const parsed = catalogCreateSchema.parse(input) as CatalogCreateInput;
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return catalogRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CatalogActionContext) {
    const current = await catalogRepository.getById(tenantId, id);
    if (!current) throw new Error("Catalog record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    const parsed = catalogUpdateSchema.parse(input) as CatalogUpdateInput;
    return catalogRepository.update(tenantId, id, parsed, context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CatalogActionContext) {
    const current = await catalogRepository.getById(tenantId, id);
    if (!current) throw new Error("Catalog record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return catalogRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await catalogRepository.getById(tenantId, id);
    if (!record) throw new Error("Catalog record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
