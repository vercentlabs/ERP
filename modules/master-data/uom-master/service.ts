import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { uomMasterRepository } from "./repository";
import { uomMasterCreateSchema, uomMasterListSchema, uomMasterUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { UomMasterActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const uomMasterService = {
  async list(input: unknown) {
    return uomMasterRepository.list(uomMasterListSchema.parse(input));
  },

  async create(input: unknown, context: UomMasterActionContext) {
    const parsed = uomMasterCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return uomMasterRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: UomMasterActionContext) {
    const current = await uomMasterRepository.getById(tenantId, id);
    if (!current) throw new Error("Uom Master record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return uomMasterRepository.update(tenantId, id, uomMasterUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: UomMasterActionContext) {
    const current = await uomMasterRepository.getById(tenantId, id);
    if (!current) throw new Error("Uom Master record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return uomMasterRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await uomMasterRepository.getById(tenantId, id);
    if (!record) throw new Error("Uom Master record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
