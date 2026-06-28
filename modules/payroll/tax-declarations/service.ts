import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { taxDeclarationsRepository } from "./repository";
import { taxDeclarationsCreateSchema, taxDeclarationsListSchema, taxDeclarationsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { TaxDeclarationsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const taxDeclarationsService = {
  async list(input: unknown) {
    return taxDeclarationsRepository.list(taxDeclarationsListSchema.parse(input));
  },

  async create(input: unknown, context: TaxDeclarationsActionContext) {
    const parsed = taxDeclarationsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return taxDeclarationsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: TaxDeclarationsActionContext) {
    const current = await taxDeclarationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Tax Declarations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return taxDeclarationsRepository.update(tenantId, id, taxDeclarationsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: TaxDeclarationsActionContext) {
    const current = await taxDeclarationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Tax Declarations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return taxDeclarationsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await taxDeclarationsRepository.getById(tenantId, id);
    if (!record) throw new Error("Tax Declarations record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
