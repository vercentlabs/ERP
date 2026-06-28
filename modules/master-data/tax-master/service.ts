import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { taxMasterRepository } from "./repository";
import { taxMasterCreateSchema, taxMasterListSchema, taxMasterUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { TaxMasterActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const taxMasterService = {
  async list(input: unknown) {
    return taxMasterRepository.list(taxMasterListSchema.parse(input));
  },

  async create(input: unknown, context: TaxMasterActionContext) {
    const parsed = taxMasterCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return taxMasterRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: TaxMasterActionContext) {
    const current = await taxMasterRepository.getById(tenantId, id);
    if (!current) throw new Error("Tax Master record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return taxMasterRepository.update(tenantId, id, taxMasterUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: TaxMasterActionContext) {
    const current = await taxMasterRepository.getById(tenantId, id);
    if (!current) throw new Error("Tax Master record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return taxMasterRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await taxMasterRepository.getById(tenantId, id);
    if (!record) throw new Error("Tax Master record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
